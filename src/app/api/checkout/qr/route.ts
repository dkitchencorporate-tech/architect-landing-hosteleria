import { NextResponse } from 'next/server';
import { proveedorActivo } from '@/lib/payments/provider';
import { claveDeLimite, ipDeLaPeticion, limiteSuperado } from '@/lib/limite-frecuencia';

export const runtime = 'nodejs';

const LIMITE_POR_IP = 5;
const VENTANA_SEGUNDOS = 10 * 60;

const CORREO_VALIDO = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

function normalizarSlug(nombre: string): string {
  return (
    nombre
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '') // acentos
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 36) || 'restaurante'
  );
}

/**
 * Crea el checkout para activar QR Menú (Parte 6, Sección 3 — CONFIRMADO por
 * Alex). Deliberadamente agnóstica de proveedor: `proveedorActivo()` decide
 * si esto llama a Stripe o a Whop según `PAYMENT_PROVIDER`. El webhook de
 * cada proveedor (`/api/webhooks/stripe` o `/api/webhooks/whop`) es quien
 * aprovisiona de verdad tras el pago — esta ruta nunca toca la base de datos.
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

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Cuerpo de la petición inválido.' }, { status: 400 });
  }

  const plan = (body as { plan?: unknown })?.plan;
  const restauranteNombre = String((body as { restauranteNombre?: unknown })?.restauranteNombre ?? '').trim();
  const nombreContacto = String((body as { nombreContacto?: unknown })?.nombreContacto ?? '').trim();
  const email = String((body as { email?: unknown })?.email ?? '').trim();

  if (plan !== 'basico' && plan !== 'ampliado') {
    return NextResponse.json({ error: 'Plan desconocido.' }, { status: 400 });
  }
  if (!restauranteNombre || restauranteNombre.length > 80) {
    return NextResponse.json({ error: 'El nombre del restaurante no es válido.' }, { status: 400 });
  }
  if (!nombreContacto || nombreContacto.length > 80) {
    return NextResponse.json({ error: 'Tu nombre no es válido.' }, { status: 400 });
  }
  if (!CORREO_VALIDO.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'El correo no es válido.' }, { status: 400 });
  }

  const slugBase = normalizarSlug(restauranteNombre);
  const origen = new URL(request.url).origin;

  try {
    const proveedor = proveedorActivo();
    const { url } = await proveedor.crearCheckout({
      plan,
      restauranteNombre,
      nombreContacto,
      email,
      slugBase,
      origen,
    });
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error creando el checkout de QR Menú:', error);
    return NextResponse.json({ error: 'No se pudo iniciar el pago.' }, { status: 500 });
  }
}
