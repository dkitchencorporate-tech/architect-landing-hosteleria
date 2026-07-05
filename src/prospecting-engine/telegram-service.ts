import { Lead, ProspectingBatchReport } from './types';

/**
 * TELEGRAM COMMUNICATION SERVICE
 * Canal directo de comunicación y sinergia entre los Agentes IA y Alex.
 * Envia notificaciones en tiempo real con resúmenes ejecutivos y hooks de WhatsApp listos para copiar.
 */

export class TelegramService {
  private botToken: string | undefined;
  private chatId: string | undefined;
  private enabled: boolean;

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN;
    this.chatId = process.env.TELEGRAM_CHAT_ID;
    this.enabled = Boolean(this.botToken && this.chatId);

    if (!this.enabled) {
      console.log(`\n==================================================================================`);
      console.log(`🤖 [Telegram Service] MODO SIMULACIÓN ACTIVADO (Credenciales no detectadas en .env.local)`);
      console.log(`Para activar la notificación directa en tu móvil por Telegram:`);
      console.log(`1. Abre Telegram y busca a @BotFather -> escribe /newbot y copia el TELEGRAM_BOT_TOKEN.`);
      console.log(`2. Busca a @userinfobot o @myidbot en Telegram para ver tu TELEGRAM_CHAT_ID.`);
      console.log(`3. Añádelos a tu archivo .env.local:`);
      console.log(`   TELEGRAM_BOT_TOKEN="tu_token_aqui"`);
      console.log(`   TELEGRAM_CHAT_ID="tu_chat_id_aqui"`);
      console.log(`==================================================================================\n`);
    }
  }

  /**
   * Envía un mensaje formateado a Telegram usando la API oficial vía fetch nativo.
   */
  async sendMessage(text: string, parseMode: 'HTML' | 'Markdown' = 'HTML'): Promise<boolean> {
    if (!this.enabled || !this.botToken || !this.chatId) {
      console.log(`\n[💬 TELEGRAM SIMULATION OUTPUT]\n${text}\n--------------------------------------------------\n`);
      return true;
    }

    try {
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: this.chatId,
          text: text,
          parse_mode: parseMode,
          disable_web_page_preview: true
        })
      });

      const data = await response.json();
      if (!data.ok) {
        console.error(`[Telegram Service] Error enviando mensaje a Telegram:`, data);
        return false;
      }
      return true;
    } catch (error) {
      console.error(`[Telegram Service] Excepción al llamar a Telegram API:`, error);
      return false;
    }
  }

  /**
   * Envía el reporte general de la tanda diaria de 100 leads.
   */
  async sendBatchSummary(report: ProspectingBatchReport): Promise<boolean> {
    const text = `🤖 📊 <b>REPORTE DIARIO DE PROSPECCIÓN ARCHITECT.SYS</b>\n` +
      `📅 <b>Fecha:</b> ${new Date(report.date).toLocaleDateString('es-ES', { dateStyle: 'full' })}\n\n` +
      `🎯 <b>Leads Prospectados hoy:</b> ${report.totalDiscovered}\n` +
      `⭐ <b>ICPs Top Prioridad (Score > 75):</b> ${report.topIcpCount}\n` +
      `💸 <b>Fuga de margen media detectada:</b> ~${report.averageLostMargin.toLocaleString('es-ES')} €/mes\n` +
      `⏱️ <b>Tiempo de análisis IA:</b> ${(report.executionTimeMs / 1000).toFixed(2)} segundos\n\n` +
      `👉 <i>A continuación se envían las fichas individuales de los mejores restaurantes cualificados con los ganchos listos para copiar en WhatsApp.</i>`;

    return await this.sendMessage(text, 'HTML');
  }

  /**
   * Envía la ficha VIP de un lead altamente cualificado con los hooks de prospección.
   */
  async sendLeadCard(lead: Lead): Promise<boolean> {
    const text = `🔥 <b>[TOP ICP #${lead.priorityScore}/100] - ${lead.city.toUpperCase()}</b>\n\n` +
      `🍽️ <b>Restaurante:</b> ${lead.restaurantName}\n` +
      `📈 <b>Modelo:</b> ${lead.businessModel}\n` +
      `⭐ <b>Rating Google:</b> ${lead.googleRating}⭐ (<i>${lead.reviewCount} reseñas</i>)\n` +
      `📞 <b>Teléfono:</b> <code>${lead.phone}</code>\n` +
      `🌐 <b>Web:</b> <a href="${lead.websiteUrl}">${lead.websiteUrl}</a>\n` +
      `📸 <b>IG:</b> ${lead.instagramHandle}\n\n` +
      `⚠️ <b>DIAGNÓSTICO Y DOLOR OPERATIVO:</b>\n` +
      `• Carta PDF: ${lead.hasPdfMenu ? '❌ SÍ (40% menos ventas visuales)' : '✔️ Menú digital'}\n` +
      `• Reservas El Tenedor: ${lead.usesElTenedor ? '❌ SÍ (Paga 12-15% comisiones)' : '✔️ Directo'}\n` +
      `💸 <b>Pérdida Estimada: ~${lead.estimatedLostMarginMonthly.toLocaleString('es-ES')} €/mes</b>\n\n` +
      `💬 <b>HOOK WHATSAPP (Toca para copiar y enviar a mano):</b>\n` +
      `<code>${lead.outreachCopy.whatsappHook}</code>\n\n` +
      `✉️ <b>ASUNTO EMAIL:</b> <i>${lead.outreachCopy.emailSubject}</i>\n` +
      `🎯 <b>Link Aterrizaje VIP:</b> https://hosteleria.architectsys.com/hub`;

    return await this.sendMessage(text, 'HTML');
  }
}

export const telegramService = new TelegramService();
