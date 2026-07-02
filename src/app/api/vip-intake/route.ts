import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      restaurantName,
      ownerName,
      city,
      businessType,
      volume,
      digitalizationLevel,
      mainChallenge,
      phone
    } = body;

    if (!restaurantName || !phone) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL || 'arquitectodeempresas@gmail.com',
        pass: process.env.SMTP_PASSWORD?.replace(/\s/g, ''),
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL || 'arquitectodeempresas@gmail.com',
      to: process.env.SMTP_EMAIL || 'arquitectodeempresas@gmail.com',
      subject: `👑 NUEVO PROTOCOLO VIP HOSTELERÍA: ${restaurantName} (${ownerName || 'Propietario'})`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 650px; margin: 0 auto; padding: 25px; border: 2px solid #0A0A0A; border-radius: 16px; background-color: #FDFCF8;">
          <div style="background-color: #0A0A0A; padding: 15px 20px; border-radius: 10px; text-align: center; margin-bottom: 25px;">
            <span style="color: #10B981; font-weight: 900; letter-spacing: 2px; font-size: 12px; text-transform: uppercase;">⚡ EXPEDIENTE DE AUDITORÍA ALTO NIVEL</span>
            <h1 style="color: #FFFFFF; margin: 5px 0 0 0; font-size: 22px;">${restaurantName}</h1>
          </div>

          <p style="color: #374151; font-size: 15px; line-height: 1.6;">
            Un comensal/propietario VIP acaba de completar el <strong>Protocolo Guiado de Acceso</strong> desde la consola de expansión <code>/hub</code> y ha sido redirigido a tu WhatsApp.
          </p>

          <div style="background-color: #FFFFFF; padding: 20px; border-radius: 12px; border: 1px solid #E5E7EB; margin: 20px 0;">
            <h3 style="color: #FF4500; margin-top: 0; border-bottom: 2px solid #FF4500; padding-bottom: 8px;">PERFIL DE NEGOCIO</h3>
            <p style="margin: 8px 0;"><strong>🏢 Restaurante / Grupo:</strong> ${restaurantName}</p>
            <p style="margin: 8px 0;"><strong>👤 Propietario / Decisor:</strong> ${ownerName || 'No especificado'}</p>
            <p style="margin: 8px 0;"><strong>📍 Ciudad / Ubicación:</strong> ${city || 'No especificada'}</p>
            <p style="margin: 8px 0;"><strong>📞 WhatsApp:</strong> <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" style="color: #10B981; font-weight: bold;">${phone}</a></p>
          </div>

          <div style="background-color: #FFFFFF; padding: 20px; border-radius: 12px; border: 1px solid #E5E7EB; margin: 20px 0;">
            <h3 style="color: #0A0A0A; margin-top: 0; border-bottom: 2px solid #0A0A0A; padding-bottom: 8px;">RADIOGRAFÍA OPERATIVA</h3>
            <p style="margin: 8px 0;"><strong>🍽️ Tipo de Negocio:</strong> ${businessType || 'No especificado'}</p>
            <p style="margin: 8px 0;"><strong>📈 Afluencia Estimada:</strong> ${volume || 'No especificado'}</p>
            <p style="margin: 8px 0;"><strong>⚡ Nivel de Digitalización:</strong> ${digitalizationLevel || 'No especificado'}</p>
            <p style="margin: 8px 0;"><strong>🎯 Principal Reto / Cuello de Botella:</strong> <span style="background-color: #FEF3C7; padding: 2px 6px; border-radius: 4px; font-weight: bold; color: #92400E;">${mainChallenge || 'No especificado'}</span></p>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(ownerName || restaurantName)},%20soy%20Alex%20de%20Architect.Sys.%20He%20recibido%20tu%20expediente%20VIP..." style="background-color: #10B981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: 900; font-size: 14px; letter-spacing: 1px; display: inline-block; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
              💬 ABRIR CHAT EN WHATSAPP
            </a>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error enviando correo VIP Intake:', error);
    // Aunque falle SMTP por configuración local, devolvemos success para que la redirección a WhatsApp siempre funcione
    return NextResponse.json({ success: true, warning: 'SMTP fallback' });
  }
}
