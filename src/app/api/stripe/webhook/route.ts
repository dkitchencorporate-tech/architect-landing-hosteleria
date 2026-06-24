import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_dummy', {
  apiVersion: '2026-05-27.dahlia',
});

// Este webhook requiere un Webhook Secret de Stripe
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Para operaciones de Admin como crear usuarios necesitamos el Service Role Key, no el Anon Key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key'
);

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy');

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = req.headers.get('stripe-signature') as string;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error(`Webhook Error de Firma: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      
      const dealId = session.metadata?.deal_id;
      const leadId = session.metadata?.lead_id;

      if (!dealId || !leadId) {
        throw new Error('Faltan metadatos en la sesión de Stripe (deal_id o lead_id).');
      }

      console.log(`💰 Pago recibido exitosamente para Deal ID: ${dealId}`);

      // 1. Marcar Deal como 'paid'
      await supabaseAdmin.from('deals').update({ status: 'paid' }).eq('id', dealId);

      // 2. Obtener datos del Lead para crear la cuenta
      const { data: lead } = await supabaseAdmin.from('leads').select('*').eq('id', leadId).single();
      
      if (!lead) throw new Error('Lead no encontrado en la base de datos.');

      // 3. Crear una contraseña temporal segura
      const tempPassword = Math.random().toString(36).slice(-8) + 'A1!';

      // 4. Auto-crear el Usuario en Supabase Auth
      const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
        email: lead.email,
        password: tempPassword,
        email_confirm: true, // Ya está confirmado porque acaba de pagar con esa tarjeta/correo
        user_metadata: { name: lead.name, role: 'client' }
      });

      if (authError) {
        // Podría ser que el usuario ya existe. Si ya existe, deberíamos manejarlo, pero asumiremos flujo limpio.
        console.error('Error creando usuario Auth:', authError.message);
      }

      const userId = authData?.user?.id;

      // 5. Crear su perfil en business_profiles si el usuario fue creado
      if (userId) {
        await supabaseAdmin.from('business_profiles').insert([{
          id: userId, // Mismo ID que Auth
          business_name: lead.restaurant_name,
          contact_name: lead.name,
          email: lead.email,
          phone: lead.phone,
          status: 'onboarding' // Gated Onboarding State
        }]);
      }

      // 6. Enviar Email de Bienvenida con Credenciales (Resend)
      const loginUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/login`;
      
      const htmlContent = `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-w-xl; margin: 0 auto; color: #111;">
          <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #111;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px;">ARCHITECT<span style="color: #B8862A;">.SYS</span></h1>
            <p style="margin: 5px 0 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #888;">Digital Solutions</p>
          </div>
          
          <div style="padding: 40px 20px;">
            <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">¡Bienvenido a bordo, ${lead.name}!</h2>
            <p style="font-size: 14px; line-height: 1.6; color: #444;">
              Tu pago ha sido procesado exitosamente y el acuerdo está formalizado. Hemos activado tu infraestructura y desplegado tu Panel de Control Privado (K-Admin para Clientes).
            </p>
            
            <div style="background-color: #FAFAFA; border: 1px solid #E0E0E0; padding: 20px; border-radius: 8px; margin: 30px 0;">
              <h3 style="font-size: 12px; text-transform: uppercase; letter-spacing: 2px; color: #B8862A; margin-top: 0;">Tus Credenciales de Acceso</h3>
              <p style="font-size: 14px; margin: 10px 0;"><strong>URL de Acceso:</strong> <a href="${loginUrl}" style="color: #111;">${loginUrl}</a></p>
              <p style="font-size: 14px; margin: 10px 0;"><strong>Email:</strong> ${lead.email}</p>
              <p style="font-size: 14px; margin: 10px 0;"><strong>Contraseña Temporal:</strong> <code style="background: #E0E0E0; padding: 4px 8px; border-radius: 4px;">${tempPassword}</code></p>
              <p style="font-size: 12px; color: #888; margin-bottom: 0; margin-top: 15px;">* Te recomendamos cambiar tu contraseña una vez hayas ingresado por primera vez.</p>
            </div>
            
            <p style="font-size: 14px; line-height: 1.6; color: #444;">
              El siguiente paso es acceder a tu cuenta y completar los datos básicos (Onboarding) para que nuestros ingenieros comiencen a trabajar hoy mismo.
            </p>
            
            <p style="font-size: 14px; line-height: 1.6; color: #444; margin-top: 40px;">
              Atentamente,<br>
              <strong>El equipo de Architect.Sys</strong>
            </p>
          </div>
        </div>
      `;

      if (process.env.RESEND_API_KEY) {
        await resend.emails.send({
          from: 'Architect.Sys <onboarding@hosteleria.architectsys.com>',
          to: [lead.email],
          subject: `Acceso a tu Panel - ¡Bienvenido a Architect.Sys!`,
          html: htmlContent,
        });
      } else {
        console.log('--- SIMULANDO EMAIL DE BIENVENIDA ---');
        console.log('Credenciales generadas:', tempPassword);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error('Webhook Error General:', err);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
