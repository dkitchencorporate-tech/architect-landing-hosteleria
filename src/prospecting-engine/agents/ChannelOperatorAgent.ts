import { Lead } from '../types';
import { supabase } from '@/lib/supabase';

export type ChannelType = 'whatsapp' | 'instagram' | 'email' | 'linkedin' | 'facebook' | 'phone_call';
export type ActionType = 'hook_copied' | 'message_sent' | 'reply_received' | 'meeting_booked' | 'closed_won' | 'rejected';

export interface ChannelEvent {
  channel: ChannelType;
  action: ActionType;
  actor: 'ALEX' | 'AGENT';
  timestamp: string;
  notes?: string;
}

/**
 * CHANNEL OPERATOR AGENT (El Gestor Multi-Canal & Estado CRM)
 * Administra el estado de cada prospecto y mapea todas las acciones (sea por email automático
 * o cuando Alex entra personalmente en WhatsApp, Instagram, LinkedIn, etc.).
 */

export class ChannelOperatorAgent {
  /**
   * Registra una acción sobre un prospecto y actualiza su estado en Supabase.
   */
  async logChannelAction(
    leadId: string,
    channel: ChannelType,
    action: ActionType,
    actor: 'ALEX' | 'AGENT' = 'ALEX',
    notes?: string
  ): Promise<boolean> {
    const event: ChannelEvent = {
      channel,
      action,
      actor,
      timestamp: new Date().toISOString(),
      notes
    };

    console.log(`📲 [ChannelOperator] Acción registrada en ${channel.toUpperCase()} (${action}) por ${actor} para Lead ID: ${leadId}`);

    if (!supabase) return true;

    try {
      // 1. Obtener historial actual
      const { data: current, error: fetchErr } = await supabase
        .from('prospects')
        .select('channel_history, status')
        .eq('id', leadId)
        .maybeSingle();

      if (fetchErr) {
        console.warn(`[ChannelOperator] Error consultando lead en Supabase:`, fetchErr.message);
      }

      const history: ChannelEvent[] = current?.channel_history || [];
      history.push(event);

      // 2. Determinar nuevo estado CRM
      let newStatus = current?.status || 'APPROVED';
      if (action === 'message_sent' || action === 'hook_copied') {
        if (channel === 'whatsapp') newStatus = 'WHATSAPP_SENT';
        else if (channel === 'email') newStatus = 'EMAIL_SENT';
        else if (channel === 'instagram' || channel === 'linkedin' || channel === 'facebook') newStatus = 'IG_DM_SENT';
      } else if (action === 'reply_received') {
        newStatus = 'REPLIED';
      } else if (action === 'meeting_booked') {
        newStatus = 'MEETING_BOOKED';
      } else if (action === 'closed_won') {
        newStatus = 'CLOSED_WON';
      } else if (action === 'rejected') {
        newStatus = 'REJECTED';
      }

      // 3. Guardar actualización en Supabase
      const { error: updateErr } = await supabase
        .from('prospects')
        .update({
          channel_history: history as any,
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', leadId);

      if (updateErr) {
        console.error(`❌ [ChannelOperator] Error actualizando Supabase:`, updateErr.message);
        return false;
      }

      return true;
    } catch (err) {
      console.error(`❌ [ChannelOperator] Excepción en logChannelAction:`, err);
      return false;
    }
  }

  /**
   * Cambia el estado masivo de una tanda (ej. de PENDING_APPROVAL a APPROVED tras autorización de Alex).
   */
  async approveBatch(leadIds: string[]): Promise<number> {
    if (!supabase || leadIds.length === 0) return leadIds.length;

    try {
      const { error, count } = await supabase
        .from('prospects')
        .update({ status: 'APPROVED', updated_at: new Date().toISOString() })
        .in('id', leadIds);

      if (error) {
        console.error(`❌ [ChannelOperator] Error autorizando tanda en Supabase:`, error.message);
        return 0;
      }

      console.log(`✅ [ChannelOperator] ${leadIds.length} leads autorizados para inicio de prospección.`);
      return leadIds.length;
    } catch (err) {
      console.error(`❌ [ChannelOperator] Excepción al autorizar tanda:`, err);
      return 0;
    }
  }
}

export const channelOperatorAgent = new ChannelOperatorAgent();
