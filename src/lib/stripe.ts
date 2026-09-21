import 'server-only';
import Stripe from 'stripe';

/**
 * Cliente de Stripe del checkout de QR Menú — el único cobro propio que hace
 * DKitchen (REGLAS_COMERCIALES.unicoCheckoutPropio, pricing-config.ts).
 */
export function obtenerStripe(): Stripe {
  const clave = process.env.STRIPE_SECRET_KEY;
  if (!clave) throw new Error('Falta STRIPE_SECRET_KEY.');
  return new Stripe(clave);
}

/**
 * "Primer mes a 1€ simbólico... a partir del segundo mes se factura el precio
 * completo" (QrMenuPricing.tsx, y Parte 6 Sección 3). El mecanismo estándar de
 * Stripe para esto es un cupón `duration: 'once'` que descuenta la primera
 * factura de la suscripción hasta dejarla en el importe simbólico — la
 * suscripción se crea siempre al precio completo, así que el cobro automático
 * del segundo mes no depende de ninguna acción posterior.
 *
 * Se crea con un id determinista por plan para que sea idempotente: si ya
 * existe (751 llamadas anteriores, o un despliegue distinto), se reutiliza en
 * vez de fallar o duplicar.
 */
export async function cuponPrimerMes(stripe: Stripe, plan: 'basico' | 'ampliado', precioMensualCentimos: number, primerMesCentimos: number): Promise<string> {
  const id = `dk-primer-mes-${plan}`;
  const importeDescontado = precioMensualCentimos - primerMesCentimos;

  try {
    const existente = await stripe.coupons.retrieve(id);
    if (existente.amount_off === importeDescontado) return existente.id;
    // El descuento cambió (revisión de precios): el cupón antiguo ya no vale,
    // se borra y se recrea con el importe correcto en vez de servir uno viejo.
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
