import { supabase } from './supabase';

if (!supabase) {
  console.warn('[analytics] Supabase server client not initialized. Ensure SUPABASE_SERVICE_KEY is set.');
}

export function parseDate(d: Date) {
  return d.toISOString();
}

export async function getWebAnalytics(fromIso: string, toIso: string) {
  if (!supabase) return { sessions: 0, events: 0, utms: {} };

  const { data, error } = await supabase
    .from('web_analytics')
    .select('session_id,event,utm_source,utm_medium,utm_campaign,utm_term,utm_content,created_at')
    .gte('created_at', fromIso)
    .lte('created_at', toIso);

  if (error) {
    console.error('[getWebAnalytics] error', error.message);
    return { sessions: 0, events: 0, utms: {} };
  }

  const sessionsSet = new Set<string>();
  const utms: Record<string, number> = {};
  const events = (data || []).length;

  (data || []).forEach((r: any) => {
    if (r.session_id) sessionsSet.add(r.session_id);
    const src = r.utm_source || 'other';
    utms[src] = (utms[src] || 0) + 1;
  });

  return { sessions: sessionsSet.size, events, utms };
}

export async function getLeadAnalytics(fromIso: string, toIso: string) {
  if (!supabase) return { total: 0, bySource: {}, leads: [] };

  const { data, error } = await supabase
    .from('leads_analytics')
    .select('id,phone,email,payload,source,created_at')
    .gte('created_at', fromIso)
    .lte('created_at', toIso)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('[getLeadAnalytics] error', error.message);
    return { total: 0, bySource: {}, leads: [] };
  }

  const bySource: Record<string, number> = {};
  const leads: any[] = [];

  (data || []).forEach((r: any) => {
    const src = r.source || 'unknown';
    bySource[src] = (bySource[src] || 0) + 1;

    const payload = r.payload || {};
    leads.push({
      id: r.id,
      created_at: r.created_at,
      source: src,
      name: payload.name || '',
      phone: payload.phone || '',
      email: payload.email || '',
      message: payload.message || '',
      session_id: payload.session_id || null,
      utm_source: payload.utm_source || null,
      utm_medium: payload.utm_medium || null,
      utm_campaign: payload.utm_campaign || null,
      utm_term: payload.utm_term || null,
      utm_content: payload.utm_content || null,
    });
  });

  return { total: (data || []).length, bySource, leads };
}
