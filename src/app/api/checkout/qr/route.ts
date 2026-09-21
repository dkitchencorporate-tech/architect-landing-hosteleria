import { NextResponse } from 'next/server';
import { QR_MENU } from '@/lib/pricing-config';
import { obtenerStripe, cuponPrimerMes } from '@/lib/stripe';
import { claveDeLimite, ipDeLaPeticion, limiteSuperado } from '@/lib/limite-frecuencia';

export const runtime = 'nodejs';

const LIMITE_POR_IP = 5;
const VENTANA_SEGUNDOS = 10 * 60;

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function normalizarSlug(nombre: string): string {
  return nombre
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // acentos
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 36) || 'restaurante';
}

/**
 * Crea la sesión de checkout de Stripe para activar QR Menú (Parte 6, Sección
 * 3 — CONFIRMADO por Alex, se construye en esta misma fase). El webhook
 * (`/api/webhooks/stripe`) es quien aprovisiona de verdad tras el pago: esta
 * ruta solo abre la sesión, nunca toca la base de datos.
 */
export async function POST(request: Request) {
  try {
    const clave = claveDeLimite('checkout-qr', ipDeLaPeticion(request));
    if (await limiteSuperado(clave, LIMITE_POR_IP, VENTANA_SEGUNDOS)) {
      return NextResponse.json(
        { error: 'Demasiadas solicitudes seguidas. Inténtalo en unos minutos.' },
        { status: 429 }
      );
    }
  } catch (error) {
    console.error('No se pudo comprobar el freno de frecuencia:', error);
  }

  if (!process.env.STRIPE_SECRET_KEY) {
    console.error('Falta STRIPE_SECRET_KEY: el checkout de QR Menú no está operativo.');
    return NextResponse.json({ error: 'El pago no está disponible ahora mismo.' }, { status: 503 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo de la petición inválido.' }, { status: 400 });
  }

  const plan = (body as { plan?: unknown })?.plan;
  const restauranteNombre = String((body as { restauranteNombre?: unknown })?.restauranteNombre ?? '').trim();
  const email = String((body as { email?: unknown })?.email ?? '').trim();

  if (plan !== 'basico' && plan !== 'ampliado') {
    return NextResponse.json({ error: 'Plan desconocido.' }, { status: 400 });
  }
  if (!restauranteNombre || restauranteNombre.length > 80) {
    return NextResponse.json({ error: 'El nombre del restaurante no es válido.' }, { status: 400 });
  }
  if (!CORREO_VALIDO.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'El correo no es válido.' }, { status: 400 });
  }

  const planConfig = QR_MENU.planes[plan];
  const precioMensualCentimos = Math.round(planConfig.mensual * 100);
  const primerMesCentimos = Math.round(QR_MENU.primerMes * 100);
  const slugBase = normalizarSlug(restauranteNombre);

  try {
    const stripe = obtenerStripe();
    const cupon = await cuponPrimerMes(stripe, plan, precioMensualCentimos, primerMesCentimos);

    const origen = new URL(request.url).origin;

    const sesion = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: 'eur',
            unit_amount: precioMensualCentimos,
            recurring: { interval: 'month' },
            product_data: {
              name: `QR Menú — Plan ${planConfig.nombre}`,
              description: `Hasta ${planConfig.topeProductos} productos. Primer mes a ${QR_MENU.primerMes}€, después ${planConfig.mensual}€/mes.`,
            },
          },
        },
      ],
      discounts: [{ coupon: cupon }],
      custom_fields: [
        {
          key: 'nombre_contacto',
          label: { type: 'custom', custom: 'Tu nombre' },
          type: 'text',
          text: { minimum_length: 2, maximum_length: 80 },
        },
      ],
      subscription_data: {
        metadata: { plan, restauranteNombre, slugBase },
      },
      metadata: { plan, restauranteNombre, slugBase },
      success_url: `${origen}/qr/bienvenida?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origen}/qr`,
    });

    if (!sesion.url) {
      throw new Error('Stripe no devolvió una URL de checkout.');
    }

    return NextResponse.json({ url: sesion.url });
  } catch (error) {
    console.error('Error creando la sesión de checkout de QR Menú:', error);
    return NextResponse.json({ error: 'No se pudo iniciar el pago.' }, { status: 500 });
  }
}
