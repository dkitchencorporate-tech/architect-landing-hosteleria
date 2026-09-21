import 'server-only';
import { QR_MENU } from '@/lib/pricing-config';
import type { DatosCheckoutQr } from './tipos';

/**
 * Implementación contra la API real de Whop (docs.whop.com, verificado el
 * 2026-09-21 — no se ha adivinado ningún endpoint ni forma de payload).
 * Único proveedor de pago del proyecto — decisión de Alex, no hay Stripe ni
 * selector de proveedor.
 *
 * Whop soporta un precio de primer cobro distinto del recurrente de forma
 * nativa (`initial_price` vs `renewal_price` en el mismo plan) — no hace
 * falta ningún cupón para el "primer mes a 1€".
 *
 * Pendiente de probar en vivo: código completo contra la documentación
 * pública, pero sin ejecutar todavía un pago real — eso exige
 * WHOP_API_KEY / WHOP_COMPANY_ID / WHOP_WEBHOOK_SECRET, que aún no existen en
 * este proyecto.
 */

const BASE = 'https://api.whop.com/api/v1';

function requerirEnv(nombre: string): string {
  const valor = process.env[nombre];
  if (!valor) throw new Error(`Falta ${nombre}.`);
  return valor;
}

interface RespuestaCheckoutConfiguration {
  id: string;
  purchase_url: string;
}

export async function crearCheckoutQr(datos: DatosCheckoutQr): Promise<{ url: string }> {
  const apiKey = requerirEnv('WHOP_API_KEY');
  const companyId = requerirEnv('WHOP_COMPANY_ID');

  const planConfig = QR_MENU.planes[datos.plan];

  const cuerpo = {
    mode: 'payment',
    plan: {
      company_id: companyId,
      currency: 'eur',
      plan_type: 'renewal',
      initial_price: QR_MENU.primerMes,
      renewal_price: planConfig.mensual,
      billing_period: 30,
      product: {
        title: `QR Menú — Plan ${planConfig.nombre}`,
        // Determinista por plan: reutiliza el mismo producto en vez de crear
        // uno nuevo en cada checkout.
        external_identifier: `dk-qr-menu-${datos.plan}`,
      },
    },
    // Todo lo que el webhook necesita para aprovisionar viaja aquí — el
    // payload de payment.succeeded documentado no trae email ni nombre.
    metadata: {
      plan: datos.plan,
      restauranteNombre: datos.restauranteNombre,
      slugBase: datos.slugBase,
      email: datos.email,
      nombreContacto: datos.nombreContacto,
    },
    redirect_url: `${datos.origen}/qr/bienvenida`,
  };

  const respuesta = await fetch(`${BASE}/checkout_configurations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(cuerpo),
  });

  const json = await respuesta.json().catch(() => null);
  if (!respuesta.ok) {
    throw new Error(`Whop respondió ${respuesta.status}: ${json?.message ?? 'sin detalle'}`);
  }

  const datosRespuesta = json as RespuestaCheckoutConfiguration;
  if (!datosRespuesta.purchase_url) {
    throw new Error('Whop no devolvió purchase_url en la configuración de checkout.');
  }

  return { url: datosRespuesta.purchase_url };
}
