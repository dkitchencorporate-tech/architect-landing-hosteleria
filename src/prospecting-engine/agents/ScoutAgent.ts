import { Lead } from '../types';
import { supabase } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

/**
 * SCOUT AGENT (El Descubridor & Escudo Anti-Duplicados)
 * Responsable de buscar nuevos restaurantes en Google Maps / Redes y validar contra Supabase
 * que nunca se prospecte ni contacte dos veces al mismo negocio.
 */

export class ScoutAgent {
  private localDiscoveredPhones: Set<string> = new Set();
  private localDiscoveredWebsites: Set<string> = new Set();

  /**
   * Verifica en Supabase (y memoria local) si el lead ya fue descubierto o contactado previamente.
   */
  async isDuplicate(phone: string, websiteUrl?: string): Promise<boolean> {
    const cleanPhone = phone.replace(/\s+/g, '').trim();
    if (this.localDiscoveredPhones.has(cleanPhone)) return true;
    if (websiteUrl && this.localDiscoveredWebsites.has(websiteUrl.trim())) return true;

    if (!supabase) {
      // Si Supabase no está conectado, confiar en set local de la sesión
      this.localDiscoveredPhones.add(cleanPhone);
      if (websiteUrl) this.localDiscoveredWebsites.add(websiteUrl.trim());
      return false;
    }

    try {
      // Consulta por teléfono
      const { data: phoneMatch, error: phoneErr } = await supabase
        .from('prospects')
        .select('id, status')
        .eq('phone', cleanPhone)
        .maybeSingle();

      if (phoneErr && phoneErr.code !== 'PGRST116') {
        console.warn(`[ScoutAgent] Advertencia consultando teléfono en Supabase:`, phoneErr.message);
      }
      if (phoneMatch) {
        console.log(`🛡️ [ScoutAgent Anti-Dedup] Bloqueado lead duplicado por teléfono: ${cleanPhone} (Estado: ${phoneMatch.status})`);
        return true;
      }

      // Consulta por web si existe
      if (websiteUrl) {
        const { data: webMatch, error: webErr } = await supabase
          .from('prospects')
          .select('id, status')
          .eq('website_url', websiteUrl.trim())
          .maybeSingle();

        if (webErr && webErr.code !== 'PGRST116') {
          console.warn(`[ScoutAgent] Advertencia consultando web en Supabase:`, webErr.message);
        }
        if (webMatch) {
          console.log(`🛡️ [ScoutAgent Anti-Dedup] Bloqueado lead duplicado por web: ${websiteUrl} (Estado: ${webMatch.status})`);
          return true;
        }
      }

      this.localDiscoveredPhones.add(cleanPhone);
      if (websiteUrl) this.localDiscoveredWebsites.add(websiteUrl.trim());
      return false;
    } catch (err) {
      console.warn(`[ScoutAgent] Excepción en comprobación anti-duplicados:`, err);
      // Ante duda en fallo de red, registrar en memoria y permitir si es nuevo en sesión
      this.localDiscoveredPhones.add(cleanPhone);
      return false;
    }
  }

  /**
   * Guarda un lote de leads descubiertos en Supabase para persistencia y auditoría de Alex.
   */
  async saveProspectsToDb(leads: Lead[]): Promise<number> {
    if (!supabase || leads.length === 0) return leads.length;

    try {
      const records = leads.map(l => ({
        id: l.id || uuidv4(),
        restaurant_name: l.restaurantName,
        city: l.city,
        phone: l.phone.replace(/\s+/g, '').trim(),
        website_url: l.websiteUrl,
        instagram_handle: l.instagramHandle,
        business_model: l.businessModel,
        google_rating: l.googleRating,
        review_count: l.reviewCount,
        has_pdf_menu: l.hasPdfMenu,
        uses_el_tenedor: l.usesElTenedor,
        estimated_lost_margin_monthly: l.estimatedLostMarginMonthly || 0,
        priority_score: l.priorityScore || 50,
        status: l.status || 'DISCOVERED',
        diagnostic_summary: l.diagnosticSummary,
        whatsapp_hook: l.outreachCopy?.whatsappHook,
        instagram_hook: l.outreachCopy?.instagramHook,
        email_subject: l.outreachCopy?.emailSubject,
        email_body: l.outreachCopy?.emailBody,
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase
        .from('prospects')
        .upsert(records, { onConflict: 'phone', ignoreDuplicates: false });

      if (error) {
        console.error(`❌ [ScoutAgent] Error guardando leads en Supabase:`, error.message);
        return 0;
      }

      console.log(`💾 [ScoutAgent] ${records.length} leads sincronizados en la tabla 'prospects' de Supabase.`);
      return records.length;
    } catch (err) {
      console.error(`❌ [ScoutAgent] Excepción al escribir en base de datos:`, err);
      return 0;
    }
  }
}

export const scoutAgent = new ScoutAgent();
