/**
 * Datos para crear un checkout de QR Menú. Whop es el único proveedor de
 * pago de este proyecto — decisión explícita de Alex (2026-09-21), Stripe
 * queda fuera por completo, no como opción de repuesto.
 */
export interface DatosCheckoutQr {
  plan: 'basico' | 'ampliado';
  restauranteNombre: string;
  slugBase: string;
  email: string;
  nombreContacto: string;
  /** Origen de la petición (para construir redirect_url). */
  origen: string;
}
