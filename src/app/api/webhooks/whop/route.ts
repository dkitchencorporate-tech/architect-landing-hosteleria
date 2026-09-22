import { NextResponse } from 'next/server';
import { createHmac, timingSafeEqual } from 'node:crypto';
import {
  aprovisionarClienteQr,
  esClienteExistente,
  registrarPagoRecuperado,
  registrarPagoFallido,
} from '@/lib/payments/aprovisionar';

export const runtime = 'nodejs';

const CINCO_MINUTOS_MS = 5 * 60 * 1000;

/**
 * Verificación de firma de Whop (docs.whop.com/developer/guides/webhooks,
 * comprobado el 2026-09-21): HMAC-SHA256 sobre `{webhook-id}.{webhook-
 * timestamp}.{cuerpo sin procesar}`, con el secreto `ws_...` usado tal cual
 * (nunca decodificado de base64). La cabecera trae el resultado como
 * `v1,<firma en base64>`.
 */
function firmaValida(idWebhook: string, timestamp: string, cuerpo: string, cabeceraFirma: string): boolean {
  const secreto = process.env.WHOP_WEBHOOK_SECRET;
  if (!secreto) return false;

  const firmaEsperada = createHmac('sha256', secreto)
    .update(`${idWebhook}.${timestamp}.${cuerpo}`)
    .digest('base64');

  // La cabecera puede traer varias firmas separadas por espacio (rotación de
  // secreto): basta con que una coincida.
  const bufEsperado = Buffer.from(firmaEsperada);
  const candidatos = cabeceraFirma.split(' ').map((parte) => parte.split(',')[1]).filter(Boolean);

  return candidatos.some((candidato) => {
    const bufRecibido = Buffer.from(candidato);
    return bufEsperado.length === bufRecibido.length && timingSafeEqual(bufEsperado, bufRecibido);
  });
}

interface EventoWhop {
  id: string;
  type: string;
  data: {
    id: string;
    status?: string;
    member?: { id: string };
    metadata?: Record<string, string>;
  };
}

/**
 * Cierra el círculo del checkout de QR Menú cuando el proveedor activo es
 * Whop (`PAYMENT_PROVIDER=whop`). Mismo contrato común que
 * `/api/webhooks/stripe` — ver `aprovisionarClienteQr`.
 *
 * PENDIENTE DE PROBAR EN VIVO: escrito contra la documentación pública de
 * Whop, sin ejecutar todavía un pago real (falta WHOP_API_KEY /
 * WHOP_COMPANY_ID / WHOP_WEBHOOK_SECRET en este proyecto).
 */
export async function POST(request: Request) {
  const idWebhook = request.headers.get('webhook-id');
  const timestamp = request.headers.get('webhook-timestamp');
  const cabeceraFirma = request.headers.get('webhook-signature');

  if (!process.env.WHOP_WEBHOOK_SECRET) {
    console.error('Falta WHOP_WEBHOOK_SECRET.');
    return NextResponse.json({ error: 'No configurado' }, { status: 500 });
  }
  if (!idWebhook || !timestamp || !cabeceraFirma) {
    return NextResponse.json({ error: 'Faltan cabeceras de firma de Whop' }, { status: 400 });
  }

  // Una marca de tiempo fuera de ventana es una señal de repetición/ataque,
  // no un evento legítimo tardío.
  const edadMs = Math.abs(Date.now() - Number(timestamp) * 1000);
  if (!Number.isFinite(edadMs) || edadMs > CINCO_MINUTOS_MS) {
    return NextResponse.json({ error: 'Marca de tiempo fuera de rango' }, { status: 400 });
  }

  const cuerpo = await request.text();

  if (!firmaValida(idWebhook, timestamp, cuerpo, cabeceraFirma)) {
    console.error('Firma de webhook de Whop inválida.');
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
  }

  let evento: EventoWhop;
  try {
    evento = JSON.parse(cuerpo);
  } catch {
    return NextResponse.json({ error: 'Cuerpo inválido' }, { status: 400 });
  }

  // Gracia/impago propia (migración 0012): Whop cancela nativamente a los 5
  // días, pero el calendario ya aprobado con el cliente es de 30 — un cobro
  // fallido solo abre el ciclo de gracia en nuestra propia base de datos,
  // nunca cancela nada por sí mismo.
  if (evento.type === 'payment.failed') {
    const miembroIdFallido = evento.data.member?.id;
    if (miembroIdFallido) {
      await registrarPagoFallido(miembroIdFallido);
    }
    return NextResponse.json({ recibido: true });
  }

  if (evento.type !== 'payment.succeeded') {
    return NextResponse.json({ recibido: true });
  }

  const miembroId = evento.data.member?.id;
  if (!miembroId) {
    console.error(`Webhook de Whop: pago ${evento.data.id} sin member.id, no se procesa.`);
    return NextResponse.json({ recibido: true });
  }

  // Cobro del mes 4 de un cliente que ya existe, no un alta nueva: solo
  // cierra un ciclo de gracia si lo había, nunca vuelve a crear la cuenta de
  // Neon Auth ni el restaurante (aprovisionarClienteQr es para el alta).
  if (await esClienteExistente(miembroId)) {
    await registrarPagoRecuperado(miembroId);
    return NextResponse.json({ recibido: true, renovacion: true });
  }

  const meta = evento.data.metadata ?? {};
  const plan = meta.plan;
  const restauranteNombre = meta.restauranteNombre;
  const slugBase = meta.slugBase;
  const nombreContacto = meta.nombreContacto;
  const email = meta.email;

  if (plan !== 'basico' && plan !== 'ampliado') {
    console.error(`Webhook de Whop: pago ${evento.data.id} sin plan válido en metadata.`);
    return NextResponse.json({ recibido: true });
  }
  if (!restauranteNombre || !slugBase || !nombreContacto || !email || !miembroId) {
    console.error(`Webhook de Whop: pago ${evento.data.id} incompleto, no se aprovisiona.`, {
      restauranteNombre: !!restauranteNombre,
      slugBase: !!slugBase,
      nombreContacto: !!nombreContacto,
      email: !!email,
      miembroId: !!miembroId,
    });
    return NextResponse.json({ recibido: true });
  }

  const resultado = await aprovisionarClienteQr({
    idEvento: evento.id,
    email,
    nombreContacto,
    plan,
    restauranteNombre,
    slugBase,
    referenciaCliente: miembroId,
    // Whop no distingue cliente de suscripción como Stripe: el id de
    // membresía cumple ambos roles en este esquema.
    referenciaSuscripcion: miembroId,
  });

  if (!resultado.ok) {
    if (resultado.motivo === 'db_fallo') {
      return NextResponse.json({ error: 'Fallo aprovisionando' }, { status: 500 });
    }
    return NextResponse.json({ recibido: true, aprovisionado: false });
  }

  return NextResponse.json({ recibido: true, aprovisionado: true });
}
