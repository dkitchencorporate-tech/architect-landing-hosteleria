import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'No messages provided' }, { status: 400 });
    }

    // Extraer correo electrónico de los mensajes del usuario usando regex
    let userEmail = '';
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
    
    // Buscar en los mensajes del usuario (del más reciente al más antiguo)
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === 'user') {
        const match = messages[i].content.match(emailRegex);
        if (match && match[1]) {
          userEmail = match[1];
          break;
        }
      }
    }

    // Configurar transporte SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD?.replace(/\s/g, ''),
      },
    });

    // 1. Enviar transcripción al equipo comercial (Admin)
    const transcriptHtml = messages.map(m => {
      const isUser = m.role === 'user';
      return `
        <div style="margin-bottom: 15px; padding: 10px; border-radius: 8px; background-color: ${isUser ? '#fef3c7' : '#f3f4f6'}; border-left: 4px solid ${isUser ? '#f59e0b' : '#3b82f6'};">
          <strong>${isUser ? '👤 Usuario' : '🤖 Arqui'}:</strong><br/>
          <span style="white-space: pre-wrap;">${m.content}</span>
        </div>
      `;
    }).join('');

    const adminMailOptions = {
      from: `"Architect.Sys Bot" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      subject: `🚨 ${userEmail ? 'LEAD COMPLETADO' : 'LEAD ABANDONADO'} - Chat Hostelería`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px;">
          <h2 style="color: ${userEmail ? '#10b981' : '#f59e0b'};">
            ${userEmail ? '✅ Chat Finalizado con Datos' : '⚠️ Chat Abandonado (Posible Lead Frío)'}
          </h2>
          ${userEmail ? `<p><strong>Correo capturado:</strong> <a href="mailto:${userEmail}">${userEmail}</a></p>` : ''}
          <hr style="border: 1px solid #e5e7eb; margin: 20px 0;" />
          <h3>Transcripción de la Conversación:</h3>
          ${transcriptHtml}
        </div>
      `,
    };

    await transporter.sendMail(adminMailOptions);

    // 2. Enviar correo de agradecimiento al usuario (Si dejó su email)
    if (userEmail) {
      const userMailOptions = {
        from: `"Architect.Sys" <${process.env.SMTP_EMAIL}>`,
        to: userEmail,
        subject: `Tu Estudio de Viabilidad - Architect.Sys`,
        html: `
          <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 0;">
            <!-- Header -->
            <div style="background-color: #111827; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0;">
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">Architect.Sys</h1>
              <p style="color: #9ca3af; margin-top: 10px; font-size: 14px;">Digitalización Estratégica para Hostelería</p>
            </div>
            
            <!-- Body -->
            <div style="padding: 40px 30px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
              <h2 style="color: #1f2937; font-size: 20px; margin-top: 0;">¡Hola! Gracias por hablar con Arqui.</h2>
              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                Hemos registrado correctamente tus datos de contacto y la información sobre tu restaurante. Nuestro equipo de consultoría ya está analizando tu caso para preparar tu <strong>Estudio de Viabilidad Personalizado</strong>.
              </p>
              
              <div style="background-color: #fff7ed; border-left: 4px solid #ea580c; padding: 20px; margin: 30px 0; border-radius: 0 8px 8px 0;">
                <h3 style="color: #9a3412; margin-top: 0; font-size: 16px;">🎁 Tus Bonos Exclusivos (620€) están reservados</h3>
                <p style="color: #9a3412; font-size: 14px; margin-bottom: 0;">
                  Si decides activar tu plan tras ver el estudio, se aplicarán automáticamente estos bonos 100% gratuitos a tu cuenta.
                </p>
              </div>

              <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                En las próximas 24 horas laborables nos pondremos en contacto contigo por WhatsApp o por este mismo medio para entregarte el análisis y resolver cualquier duda técnica sin ningún compromiso.
              </p>
              
              <div style="text-align: center; margin-top: 40px;">
                <p style="color: #6b7280; font-size: 14px; margin-bottom: 20px;">Si prefieres no esperar, puedes agendar tu sesión directa ahora mismo:</p>
                <a href="https://calendar.google.com/" style="background-color: #ea580c; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block;">Agendar Sesión de 10 min</a>
              </div>
            </div>
            
            <!-- Footer -->
            <div style="background-color: #f3f4f6; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb; border-top: none;">
              <p style="color: #6b7280; font-size: 12px; margin: 0;">
                © ${new Date().getFullYear()} Architect.Sys. Todos los derechos reservados.<br/>
                Este correo ha sido generado automáticamente por tu interacción con nuestro asistente virtual.
              </p>
            </div>
          </div>
        `,
      };

      await transporter.sendMail(userMailOptions);
    }

    return NextResponse.json({ success: true, emailDetected: !!userEmail });
  } catch (error) {
    console.error('[transcript route] Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
