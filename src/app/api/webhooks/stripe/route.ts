import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { obtenerStripe } from '@/lib/stripe';
import { crearCuentaCliente, enviarEnlaceDeContrasena, ErrorNeonAuth } from '@/lib/neon-auth';
import { comoAprovisionamiento } from '@/lib/db';

export const runtime = 'nodejs';

/**
 * Cierra el círculo del checkout de QR Menú (Parte 6, Sección 3, ampliado por
 * Alex): pago confirmado → cuenta real en Neon Auth → enlace para fijar
 * contraseña → restaurante + menú vacío + QR aprovisionados, todo en una sola
 * llamada a `dk.aprovisionar_cliente_qr` (migración 0010/0011).
 *
 * El cuerpo se lee como texto sin procesar a propósito: la verificación de
 * firma de Stripe necesita los bytes exactos que Stripe firmó, y un
 * `request.json()` previo ya los habría reformateado.
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
  const email = session.customer_details?.email ?? session.customer_email;
  const nombreContacto =
    session.custom_fields?.find((c) => c.key === 'nombre_contacto')?.text?.value || restauranteNombre;

  const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id;
  const subscriptionId =
    typeof session.subscription === 'string' ? session.subscription : session.subscription?.id;

  if (plan !== 'basico' && plan !== 'ampliado') {
    console.error(`Webhook de Stripe: sesión ${session.id} sin plan válido en metadata.`);
    return NextResponse.json({ recibido: true });
  }
  if (!restauranteNombre || !slugBase || !email || !customerId || !subscriptionId) {
    console.error(`Webhook de Stripe: sesión ${session.id} incompleta, no se aprovisiona.`, {
      restauranteNombre: !!restauranteNombre,
      slugBase: !!slugBase,
      email: !!email,
      customerId: !!customerId,
      subscriptionId: !!subscriptionId,
    });
    return NextResponse.json({ recibido: true });
  }

  let identidadId: string;
  try {
    const cuenta = await crearCuentaCliente({ email, nombre: nombreContacto! });
    identidadId = cuenta.id;
  } catch (error) {
    // Caso no cubierto por autoservicio: un cliente que ya tiene cuenta en
    // Neon Auth por otro peldaño (p. ej. el panel interno) intentando activar
    // QR Menú con el mismo correo. El login de cliente sigue aplazado (tarea
    // #15), así que no hay forma automática de recuperar su identidad real
    // aquí sin arriesgar una suplantación. Se registra con detalle para
    // resolución manual en vez de reintentar indefinidamente contra el mismo
    // error o adivinar un uuid.
    console.error(
      `No se pudo crear la cuenta de Neon Auth para ${email} (evento ${evento.id}, sesión ${session.id}):`,
      error instanceof ErrorNeonAuth ? `${error.codigo ?? ''} ${error.message}` : error
    );
    return NextResponse.json({ recibido: true, aprovisionado: false });
  }

  try {
    await enviarEnlaceDeContrasena(email);
  } catch (error) {
    // No se aborta el aprovisionamiento por esto: el cliente puede pedir el
    // enlace de nuevo desde /panel/nueva-contrasena; quedarse sin restaurante
    // aprovisionado tras haber pagado sería el fallo peor.
    console.error(`No se pudo enviar el enlace de contraseña a ${email}:`, error);
  }

  try {
    const { rows } = await comoAprovisionamiento((c) =>
      c.query<{ restaurante_id: string; slug: string }>(
        `SELECT * FROM dk.aprovisionar_cliente_qr($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [evento.id, identidadId, email, nombreContacto, plan, restauranteNombre, slugBase, customerId, subscriptionId]
      )
    );
    console.log(`Aprovisionado: restaurante ${rows[0]?.slug} (${rows[0]?.restaurante_id}) para ${email}.`);
  } catch (error) {
    console.error(`Fallo aprovisionando el restaurante para ${email} (evento ${evento.id}):`, error);
    // Se devuelve 500 aquí sí: a diferencia del fallo de Neon Auth (donde
    // reintentar repetiría el mismo error de forma determinista), un fallo de
    // base de datos puede ser transitorio, y Stripe reintenta la entrega del
    // mismo evento — la idempotencia de dk.aprovisionar_cliente_qr hace que
    // ese reintento sea seguro.
    return NextResponse.json({ error: 'Fallo aprovisionando' }, { status: 500 });
  }

  return NextResponse.json({ recibido: true, aprovisionado: true });
}
