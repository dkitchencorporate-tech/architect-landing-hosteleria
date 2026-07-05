import { Lead, ProspectingBatchReport } from '../types';

/**
 * TELEGRAM SYNCER AGENT (El Enlace de Mando y Autorización)
 * Gestiona las notificaciones push en tiempo real hacia Telegram y permite que Alex
 * autorice cada ronda de prospección antes de iniciar el contacto agresivo.
 */

export class TelegramSyncerAgent {
  private botToken: string | undefined;
  private chatId: string | undefined;
  private enabled: boolean;

  constructor() {
    this.botToken = process.env.TELEGRAM_BOT_TOKEN;
    this.chatId = process.env.TELEGRAM_CHAT_ID;
    this.enabled = Boolean(this.botToken && this.chatId);
  }

  /**
   * Envía mensaje a Telegram vía API oficial.
   */
  async sendMessage(text: string, parseMode: 'HTML' | 'Markdown' = 'HTML'): Promise<boolean> {
    if (!this.enabled || !this.botToken || !this.chatId) {
      console.log(`\n[💬 TELEGRAM SYNC AGENT SIMULATION]\n${text}\n--------------------------------------------------\n`);
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
        console.error(`[TelegramSyncer] Error enviando mensaje:`, data);
        return false;
      }
      return true;
    } catch (error) {
      console.error(`[TelegramSyncer] Excepción llamando a Telegram API:`, error);
      return false;
    }
  }

  /**
   * Envía el reporte de la tanda con instrucciones de aprobación.
   */
  async sendBatchApprovalRequest(report: ProspectingBatchReport): Promise<boolean> {
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://hosteleria.architectsys.com';
    const commandCenterUrl = `${appUrl}/admin/scout`;

    const text = `🤖 🦅 <b>NUEVA RONDA DE PROSPECCIÓN ARCHITECT.SYS</b>\n` +
      `📅 <b>Fecha:</b> ${new Date(report.date).toLocaleDateString('es-ES', { dateStyle: 'full' })}\n\n` +
      `🎯 <b>Leads Evaluados:</b> ${report.totalDiscovered}\n` +
      `⭐ <b>Top ICPs Cualificados (Score > 70):</b> ${report.topIcpCount}\n` +
      `💸 <b>Fuga de Margen Detectada:</b> ~${report.averageLostMargin.toLocaleString('es-ES')} €/mes de media\n` +
      `⏱️ <b>Tiempo de análisis IA (Gemini 3 Pro):</b> ${(report.executionTimeMs / 1000).toFixed(2)}s\n\n` +
      `⚠️ <b>ESTADO: PENDIENTE DE TU AUTORIZACIÓN</b>\n` +
      `Para revisar y autorizar esta tanda, entra en tu Command Center Visual (PWA):\n` +
      `👉 <a href="${commandCenterUrl}"><b>ABRIR ARCHITECT SCOUT COMMAND CENTER</b></a>\n\n` +
      `<i>Ningún mensaje se enviará hasta que autorices los leads en la PWA. A continuación tienes la vista previa de los Top 3 ICPs:</i>`;

    return await this.sendMessage(text, 'HTML');
  }

  /**
   * Envía la ficha VIP de un lead para su copia y envío rápido.
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
      `• Carta PDF: ${lead.hasPdfMenu ? '❌ SÍ (Pierde 40% ventas visuales)' : '✔️ Menú digital'}\n` +
      `• Reservas El Tenedor: ${lead.usesElTenedor ? '❌ SÍ (Paga 12-15% comisiones)' : '✔️ Directo'}\n` +
      `💸 <b>Pérdida Estimada: ~${lead.estimatedLostMarginMonthly.toLocaleString('es-ES')} €/mes</b>\n\n` +
      `💬 <b>HOOK WHATSAPP (Toca para copiar y enviar desde tu móvil):</b>\n` +
      `<code>${lead.outreachCopy.whatsappHook}</code>\n\n` +
      `✉️ <b>ASUNTO EMAIL:</b> <i>${lead.outreachCopy.emailSubject}</i>\n` +
      `🎯 <b>Link Aterrizaje VIP:</b> https://hosteleria.architectsys.com/hub`;

    return await this.sendMessage(text, 'HTML');
  }
}

export const telegramSyncerAgent = new TelegramSyncerAgent();
