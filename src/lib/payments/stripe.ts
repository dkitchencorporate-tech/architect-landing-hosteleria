import 'server-only';
import Stripe from 'stripe';
import { QR_MENU } from '@/lib/pricing-config';
import type { DatosCheckoutQr, ProveedorPagoQr } from './tipos';

export function obtenerStripe(): Stripe {
  const clave = process.env.STRIPE_SECRET_KEY;
  if (!clave) throw new Error('Falta STRIPE_SECRET_KEY.');
  return new Stripe(clave);
}

/**
 * Stripe no soporta un "precio del primer periodo" distinto del recurrente
 * dentro de la propia sesión de checkout: el mecanismo estándar es un cupón
 * `duration: 'once'` que descuenta la primera factura hasta el importe
 * simbólico. Se crea con un id determinista por plan para que sea
 * idempotente: si ya existe, se reutiliza en vez de fallar o duplicar.
 */
async function cuponPrimerMes(
  stripe: Stripe,
  plan: 'basico' | 'ampliado',
  precioMensualCentimos: number,
  primerMesCentimos: number
): Promise<string> {
  const id = `dk-primer-mes-${plan}`;
  const importeDescontado = precioMensualCentimos - primerMesCentimos;

  try {
    const existente = await stripe.coupons.retrieve(id);
    if (existente.amount_off === importeDescontado) return existente.id;
    await stripe.coupons.del(id);
  } catch (error) {
    if (!(error instanceof Stripe.errors.StripeError && error.code === 'resource_missing')) {
      throw error;
    }
  }

  const creado = await stripe.coupons.create({
    id,
    duration: 'once',
    amount_off: importeDescontado,
    currency: 'eur',
    name: `Primer mes a ${(primerMesCentimos / 100).toFixed(2)}€ — plan ${plan}`,
  });

  return creado.id;
}

async function crearCheckout(datos: DatosCheckoutQr): Promise<{ url: string }> {
  const stripe = obtenerStripe();
  const planConfig = QR_MENU.planes[datos.plan];
  const precioMensualCentimos = Math.round(planConfig.mensual * 100);
  const primerMesCentimos = Math.round(QR_MENU.primerMes * 100);
  const cupon = await cuponPrimerMes(stripe, datos.plan, precioMensualCentimos, primerMesCentimos);

  const sesion = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: datos.email,
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
    subscription_data: {
      metadata: {
        plan: datos.plan,
        restauranteNombre: datos.restauranteNombre,
        slugBase: datos.slugBase,
        nombreContacto: datos.nombreContacto,
      },
    },
    metadata: {
      plan: datos.plan,
      restauranteNombre: datos.restauranteNombre,
      slugBase: datos.slugBase,
      nombreContacto: datos.nombreContacto,
    },
    success_url: `${datos.origen}/qr/bienvenida?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${datos.origen}/qr`,
  });

  if (!sesion.url) throw new Error('Stripe no devolvió una URL de checkout.');
  return { url: sesion.url };
}

export const proveedorStripe: ProveedorPagoQr = {
  nombre: 'stripe',
  crearCheckout,
};
