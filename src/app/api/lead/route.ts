import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, consent } = body;

    if (!name || !phone || !email || !consent) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD?.replace(/\s/g, ''), // Eliminar espacios si los hay
      },
    });

    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: process.env.SMTP_EMAIL, // Te lo envías a ti mismo
      subject: `🚨 NUEVO LEAD HOSTELERÍA: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 10px;">
          <h2 style="color: #FF4500; text-align: center;">🔥 Nuevo Lead Captado</h2>
          <p style="text-align: center; color: #6b7280;">Alguien acaba de solicitar la Consultoría y los Bonos desde el Popup de Salida.</p>
          
          <div style="background-color: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p><strong>👤 Nombre:</strong> ${name}</p>
            <p><strong>📞 WhatsApp:</strong> <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}">${phone}</a></p>
            <p><strong>✉️ Correo:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>✅ Consentimiento:</strong> Aceptado</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=Hola%20${encodeURIComponent(name)},%20soy%20de%20Architect.Sys.%20He%20visto%20que%20has%20solicitado%20nuestros%20bonos%20de%20digitalizaci%C3%B3n..." style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">
              Abrir chat de WhatsApp
            </a>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error enviando correo:', error);
    return NextResponse.json({ error: 'Error procesando la solicitud' }, { status: 500 });
  }
}
