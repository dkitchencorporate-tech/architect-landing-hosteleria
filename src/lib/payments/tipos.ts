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

/**
 * Order-bump de Auditoría+Escandallo en la pantalla de confirmación de QR
 * (Parte 8, Sección 3.1-b): pago único de 47€, sin cuenta que aprovisionar —
 * el webhook solo tiene que avisar para que se agende la reunión 1 a 1.
 */
export interface DatosCheckoutAuditoria {
  email: string;
  nombreContacto: string;
  restauranteNombre?: string;
  /** Origen de la petición (para construir redirect_url). */
  origen: string;
}

/**
 * Núcleo Operativo — Nivel B (Parte 8, Sección 1): pago único de 700€ al
 * precio fijo publicado, sin negociar nada antes. Dispara la tubería común
 * de post-pago (Sección 8): pedido en `pedidos_nivel_b`, intake, contrato,
 * factura, ticket de ejecución.
 */
export interface DatosCheckoutNucleoOperativo {
  email: string;
  nombreContacto: string;
  restauranteNombre: string;
  /** Origen de la petición (para construir redirect_url). */
  origen: string;
}
