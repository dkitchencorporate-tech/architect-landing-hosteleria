import { NextResponse } from 'next/server';
import { telegramSyncerAgent } from '@/prospecting-engine/agents/TelegramSyncerAgent';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const text = `🤖 🦅 <b>[ARCHITECT.SYS SCOUT] PRUEBA DE CONEXIÓN EXITOSA</b>\n\n` +
      `¡Hola Alex! Tu canal de Telegram está perfectamente conectado con el <b>Command Center Visual PWA</b>.\n\n` +
      `⚡ <b>Motor IA:</b> Gemini 3 Pro (Online)\n` +
      `🛡️ <b>Escudo Anti-Duplicados:</b> Supabase Activo\n` +
      `🎯 <b>Objetivo MRR:</b> 5 Clientes High-Ticket / Mes\n\n` +
      `A partir de ahora recibirás en este chat las rondas diarias de prospección con las tarjetas VIP para copiar y enviar los ganchos de WhatsApp con 1 solo toque.`;

    const ok = await telegramSyncerAgent.sendMessage(text, 'HTML');

    if (ok) {
      return NextResponse.json({ success: true, message: 'Mensaje de prueba enviado a Telegram.' });
    } else {
      return NextResponse.json({ success: false, error: 'Revisa tus claves en .env.local' }, { status: 400 });
    }
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
