import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'dummy_key'
);

export async function POST(req: Request) {
  try {
    const { dealId } = await req.json();

    if (!dealId) {
      return NextResponse.json({ error: 'Deal ID is required' }, { status: 400 });
    }

    const { data: deal } = await supabaseAdmin
      .from('deals')
      .select('*, leads(*)')
      .eq('id', dealId)
      .single();

    if (!deal || !deal.leads) {
      return NextResponse.json({ error: 'Deal or Lead not found' }, { status: 404 });
    }

    const lead = deal.leads;
    const dashboardUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/portal`;
    // For MVP, just a magic link or generic instruction
    const magicToken = deal.magic_token; 

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-w-xl; margin: 0 auto; color: #111;">
        <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #111;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px;">ARCHITECT<span style="color: #B8862A;">.SYS</span></h1>
          <p style="margin: 5px 0 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #888;">Operaciones y Despliegue</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">¡Bienvenido a bordo, ${lead.name}!</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #444;">
            Hemos recibido confirmación de tu pago y el contrato ha sido archivado legalmente. El equipo de Architect.Sys ha comenzado la asignación de recursos para tu proyecto.
          </p>
          
          <div style="background-color: #FAFAFA; border: 1px solid #E0E0E0; border-left: 4px solid #B8862A; padding: 15px; margin: 25px 0;">
            <p style="margin: 0; font-size: 13px; color: #444;">
              <strong>Siguiente Paso Obligatorio:</strong> Para no incurrir en pausas comerciales o abandono (según cláusula de ghosting), debes subir tu menú y material gráfico en el portal de cliente.
            </p>
          </div>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${dashboardUrl}?token=${magicToken}" style="background-color: #111111; color: white; padding: 16px 32px; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 8px; display: inline-block;">
              Entrar al Portal de Autogestión
            </a>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #444;">
            Desde este portal centralizado podrás ver el cronograma en tiempo real, comunicarte con el equipo técnico y solicitar futuros servicios o integraciones Upsell con un solo clic.
          </p>
          
          <p style="font-size: 14px; line-height: 1.6; color: #444; margin-top: 40px;">
            Atentamente,<br>
            <strong>Departamento de Operaciones | Architect.Sys</strong>
          </p>
        </div>
        
        <div style="background-color: #FAFAFA; padding: 20px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #E0E0E0;">
          © ${new Date().getFullYear()} Architect.Sys. Todos los derechos reservados.<br>
          Este correo se genera de forma automática tras validación de pasarela.
        </div>
      </div>
    `;

    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      console.log('--- SIMULANDO CORREO DE ONBOARDING ---');
      console.log('To:', lead.email);
      console.log('Link:', dashboardUrl);
      return NextResponse.json({ success: true, simulated: true });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD?.replace(/\s/g, ''),
      },
    });

    const mailOptions = {
      from: `"Architect Sys Operaciones" <${process.env.SMTP_EMAIL}>`,
      to: lead.email,
      subject: `Accesos y Arranque de Proyecto: ${lead.restaurant_name}`,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true, data: info });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
