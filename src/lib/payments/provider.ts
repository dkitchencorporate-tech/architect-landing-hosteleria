import 'server-only';
import type { ProveedorPagoQr } from './tipos';
import { proveedorStripe } from './stripe';
import { proveedorWhop } from './whop';

/**
 * Selector de pasarela activa. Cambiar de Stripe a Whop es cambiar
 * `PAYMENT_PROVIDER=whop` en Vercel — nada más en este archivo, y nada en
 * `/api/checkout/qr` (que solo llama a `proveedorActivo().crearCheckout`).
 *
 * El webhook, en cambio, SÍ tiene una ruta por proveedor
 * (`/api/webhooks/stripe`, `/api/webhooks/whop`): cada plataforma firma sus
 * eventos de forma distinta y se registra contra una URL propia en su propio
 * panel, así que no hay ganancia en fusionarlas — solo lógica de
 * verificación de firma frágil mezclada. Ambas llaman a la misma
 * `aprovisionarClienteQr()` (ver `aprovisionar.ts`).
 */
export function proveedorActivo(): ProveedorPagoQr {
  const nombre = (process.env.PAYMENT_PROVIDER || 'stripe').toLowerCase();
  if (nombre === 'whop') return proveedorWhop;
  if (nombre === 'stripe') return proveedorStripe;
  throw new Error(`PAYMENT_PROVIDER desconocido: "${nombre}". Usa "stripe" o "whop".`);
}
