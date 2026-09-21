import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { obtenerStripe } from '@/lib/payments/stripe';
import { aprovisionarClienteQr } from '@/lib/payments/aprovisionar';

export const runtime = 'nodejs';

/**
 * Cierra el círculo del checkout de QR Menú cuando el proveedor activo es
 * Stripe (`PAYMENT_PROVIDER=stripe`, ver `lib/payments/provider.ts`). La
 * lógica de negocio (cuenta Neon Auth + enlace de contraseña +
 * aprovisionamiento) vive en `aprovisionarClienteQr` — este archivo solo
 * verifica la firma y traduce el evento de Stripe a ese contrato común.
 *
 * El cuerpo se lee como texto sin procesar a propósito: la verificación de
 * firma de Stripe necesita los bytes exactos que Stripe firmó.
 */
export async function POST(request: Request) {
  const firma = request.headers.get('stripe-signature');
  const secreto = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secreto) {
    console.error('Falta STRIPE_WEBHOOK_SECRET.');
    return NextResponse.json({ error: 'No configurado' }, { status: 500 });
  }
  if (!firma) {
    return NextResponse.json({ error: 'Falta la firma de Stripe' }, { status: 400 });
  }

  const cuerpo = await request.text();

  let evento: Stripe.Event;
  try {
    evento = obtenerStripe().webhooks.constructEvent(cuerpo, firma, secreto);
  } catch (error) {
    console.error('Firma de webhook de Stripe inválida:', error);
    return NextResponse.json({ error: 'Firma inválida' }, { status: 400 });
  }

  if (evento.type !== 'checkout.session.completed') {
    return NextResponse.json({ recibido: true });
  }

  const session = evento.data.object as Stripe.Checkout.Session;

  if (session.mode !== 'subscription' || session.payment_status !== 'paid') {
    return NextResponse.json({ recibido: true });
  }

  const plan = session.metadata?.plan;
  const restauranteNombre = session.metadata?.restauranteNombre;
  const slugBase = session.metadata?.slugBase;
  const nombreContacto = session.metadata?.nombreContacto;
  const email = session.customer_details?.email ?? session.customer_email;

  const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
  const subscriptionId =
    typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;

  if (plan !== 'basico' && plan !== 'ampliado') {
    console.error(`Webhook de Stripe: sesión ${session.id} sin plan válido en metadata.`);
    return NextResponse.json({ recibido: true });
  }
  if (!restauranteNombre || !slugBase || !nombreContacto || !email || !customerId || !subscriptionId) {
    console.error(`Webhook de Stripe: sesión ${session.id} incompleta, no se aprovisiona.`, {
      restauranteNombre: !!restauranteNombre,
      slugBase: !!slugBase,
      nombreContacto: !!nombreContacto,
      email: !!email,
      customerId: !!customerId,
      subscriptionId: !!subscriptionId,
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
    referenciaCliente: customerId,
    referenciaSuscripcion: subscriptionId,
  });

  if (!resultado.ok) {
    // Un fallo de Neon Auth (correo ya existente) no se reintenta: el error
    // sería idéntico en cada reentrega. Un fallo de base de datos sí puede
    // ser transitorio, y la idempotencia de dk.aprovisionar_cliente_qr hace
    // que el reintento de Stripe sea seguro.
    if (resultado.motivo === 'db_fallo') {
      return NextResponse.json({ error: 'Fallo aprovisionando' }, { status: 500 });
    }
    return NextResponse.json({ recibido: true, aprovisionado: false });
  }

  return NextResponse.json({ recibido: true, aprovisionado: true });
}
