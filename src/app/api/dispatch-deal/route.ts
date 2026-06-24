import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

const decodeTokenPayload = (fullToken: string) => {
  try {
    const parts = fullToken.split('::');
    if (parts.length > 1) {
      return JSON.parse(decodeURIComponent(atob(parts[1])));
    }
  } catch(e) {
    console.error('Error decoding token payload:', e);
  }
  return null;
};

export async function POST(req: Request) {
  try {
    // Aceptamos el formato antiguo (deal, lead) para no romper CRM anterior,
    // y el formato nuevo (token, payload)
    const { token, payload: rawPayload, deal, lead } = await req.json();

    let clientName = lead?.name || 'Cliente';
    let clientEmail = lead?.email;
    let restaurantName = lead?.restaurant_name || 'tu negocio';
    let checkoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/deal`;

    if (token) {
      const payload = decodeTokenPayload(token) || rawPayload;
      if (!payload) {
         return NextResponse.json({ error: 'Token inválido o sin payload' }, { status: 400 });
      }
      clientName = payload.name;
      clientEmail = payload.email;
      restaurantName = payload.name; // En la versión rápida, usamos el mismo nombre
      checkoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/deal?token=${token}`;
    } else if (deal && lead) {
      checkoutUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/deal?token=${deal.magic_token}`;
    } else {
      return NextResponse.json({ error: 'Datos insuficientes. Se requiere token o deal+lead' }, { status: 400 });
    }

    if (!clientEmail) {
      return NextResponse.json({ error: 'Email destino es requerido' }, { status: 400 });
    }

    const htmlContent = `
      <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-w-xl; margin: 0 auto; color: #111;">
        <div style="text-align: center; padding: 20px 0; border-bottom: 2px solid #111;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 900; letter-spacing: 1px;">ARCHITECT<span style="color: #B8862A;">.SYS</span></h1>
          <p style="margin: 5px 0 0; font-size: 10px; letter-spacing: 3px; text-transform: uppercase; color: #888;">Digital Solutions</p>
        </div>
        
        <div style="padding: 40px 20px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 20px;">Hola, ${clientName}</h2>
          <p style="font-size: 14px; line-height: 1.6; color: #444;">
            Ha sido un placer reunirnos contigo. Como conversamos, hemos preparado todo el plan de acción para llevar la presencia digital de <strong>${restaurantName}</strong> al siguiente nivel.
          </p>
          <p style="font-size: 14px; line-height: 1.6; color: #444;">
            En el siguiente enlace privado encontrarás tu <strong>Propuesta Formal</strong>, el <strong>Contrato de Nivel de Servicio (SLA)</strong> y el <strong>Dossier de Onboarding</strong> de los primeros 30 días.
          </p>
          
          <div style="text-align: center; margin: 40px 0;">
            <a href="${checkoutUrl}" style="background-color: #B8862A; color: white; padding: 16px 32px; text-decoration: none; font-weight: bold; font-size: 16px; border-radius: 8px; display: inline-block;">
              Acceder a la Sala de Cierre
            </a>
          </div>

          <p style="font-size: 14px; line-height: 1.6; color: #444;">
            El enlace es único, privado y tiene una validez de 7 días. Desde allí podrás revisar todos los acuerdos y proceder con la formalización para que nuestro equipo comience a trabajar de inmediato.
          </p>
          
          <p style="font-size: 14px; line-height: 1.6; color: #444; margin-top: 40px;">
            Atentamente,<br>
            <strong>El equipo de Architect.Sys</strong>
          </p>
        </div>
        
        <div style="background-color: #FAFAFA; padding: 20px; text-align: center; font-size: 11px; color: #888; border-top: 1px solid #E0E0E0;">
          © ${new Date().getFullYear()} Architect.Sys. Todos los derechos reservados.<br>
          Este correo contiene información confidencial.
        </div>
      </div>
    `;

    // Remover la simulación: Si no hay credenciales, arrojar error real
    if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
      return NextResponse.json({ error: 'Faltan credenciales SMTP (SMTP_EMAIL, SMTP_PASSWORD) en el servidor. Imposible despachar el correo formal.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD?.replace(/\s/g, ''),
      },
    });

    const mailOptions = {
      from: `"Architect.Sys" <${process.env.SMTP_EMAIL}>`,
      to: clientEmail,
      subject: `Acuerdo Comercial de Architect.Sys: ${restaurantName}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, url: checkoutUrl });
  } catch (error: any) {
    console.error('Error enviando protocolo:', error);
    return NextResponse.json({ error: error.message || 'Error procesando la solicitud de correo' }, { status: 500 });
  }
}
