/**
 * Contrato común de "crear checkout" para cualquier pasarela. La ruta
 * `/api/checkout/qr` no sabe si detrás hay Stripe o Whop — solo llama a la
 * función que exponga el proveedor activo (ver `provider.ts`) y redirige a
 * la URL que devuelva.
 */
export interface DatosCheckoutQr {
  plan: 'basico' | 'ampliado';
  restauranteNombre: string;
  slugBase: string;
  email: string;
  nombreContacto: string;
  /** Origen de la petición (para construir success_url/redirect_url). */
  origen: string;
}

export interface ProveedorPagoQr {
  nombre: string;
  crearCheckout(datos: DatosCheckoutQr): Promise<{ url: string }>;
}
