import 'server-only';
import nodemailer from 'nodemailer';

/** Convierte texto en texto seguro para HTML — sin esto, un nombre puede ser HTML. */
export function escaparHtml(valor: unknown): string {
  return String(valor ?? '')
    .slice(0, 200)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Transporte compartido de correo interno (mismas credenciales que ya usa
 * /api/lead) — evita duplicar la configuración de nodemailer en cada sitio
 * que necesita avisar a Alex de algo.
 */
export async function enviarCorreoInterno(asunto: string, html: string): Promise<void> {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.error('Correo interno no configurado (falta SMTP_EMAIL/SMTP_PASSWORD).');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD.replace(/\s/g, ''),
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: process.env.SMTP_EMAIL,
    subject: asunto.replace(/[\r\n]/g, ' ').slice(0, 120),
    html,
  });
}

/** Igual que `enviarCorreoInterno`, pero a un destinatario externo (un cliente), no al buzón de Alex. */
export async function enviarCorreoCliente(destinatario: string, asunto: string, html: string): Promise<void> {
  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    console.error('Correo a cliente no configurado (falta SMTP_EMAIL/SMTP_PASSWORD).');
    return;
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD.replace(/\s/g, ''),
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: destinatario,
    subject: asunto.replace(/[\r\n]/g, ' ').slice(0, 120),
    html,
  });
}
