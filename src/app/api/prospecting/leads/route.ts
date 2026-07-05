import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { discoverAndAnalyzeLeads } from '@/prospecting-engine/lead-scanner';
import { channelOperatorAgent } from '@/prospecting-engine/agents/ChannelOperatorAgent';
import { Lead } from '@/prospecting-engine/types';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('prospects')
        .select('*')
        .order('priority_score', { ascending: false })
        .limit(200);

      if (!error && data && data.length > 0) {
        const leads: Lead[] = data.map(item => ({
          id: item.id,
          restaurantName: item.restaurant_name,
          city: item.city,
          phone: item.phone,
          email: item.email,
          websiteUrl: item.website_url,
          instagramHandle: item.instagram_handle,
          businessModel: item.business_model,
          googleRating: item.google_rating,
          reviewCount: item.review_count,
          hasPdfMenu: item.has_pdf_menu,
          usesElTenedor: item.uses_el_tenedor,
          hasOnlineOrdering: item.has_online_ordering || false,
          estimatedLostMarginMonthly: item.estimated_lost_margin_monthly,
          estimatedMonthlyRevenue: item.estimated_monthly_revenue,
          priorityScore: item.priority_score,
          status: item.status,
          diagnosticSummary: item.diagnostic_summary,
          outreachCopy: {
            whatsappHook: item.whatsapp_hook || '',
            instagramHook: item.instagram_hook || '',
            emailSubject: item.email_subject || '',
            emailBody: item.email_body || ''
          },
          createdAt: item.created_at || new Date().toISOString(),
          updatedAt: item.updated_at || new Date().toISOString()
        }));

        return NextResponse.json({ success: true, leads, source: 'supabase' });
      }
    }

    // Fallback: Si Supabase no está conectado o está vacío, generamos leads de prueba en vivo
    console.log('[API Leads] Supabase vacío u offline, escaneando leads en vivo para demostración...');
    const fallbackLeads = await discoverAndAnalyzeLeads(25);
    return NextResponse.json({ success: true, leads: fallbackLeads, source: 'live_fallback' });

  } catch (err: any) {
    console.error('[API Leads] Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action, leadId, status, channel, actionType, notes } = body;

    if (action === 'update_status' && leadId && status) {
      if (supabase) {
        await supabase.from('prospects').update({ status, updated_at: new Date().toISOString() }).eq('id', leadId);
      }
      return NextResponse.json({ success: true, leadId, status });
    }

    if (action === 'log_channel_action' && leadId && channel && actionType) {
      const ok = await channelOperatorAgent.logChannelAction(leadId, channel, actionType, 'ALEX', notes);
      return NextResponse.json({ success: ok });
    }

    return NextResponse.json({ success: false, error: 'Acción no válida' }, { status: 400 });
  } catch (err: any) {
    console.error('[API Leads POST] Error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
