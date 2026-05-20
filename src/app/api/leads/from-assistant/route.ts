import { supabase } from '@/lib/supabase';
import type { LeadAnalyticsInsert } from '@/lib/types';

interface AssistantLeadRequest {
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  session_id?: string | null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AssistantLeadRequest;
    const { name, phone, email, message, session_id } = body || {};

    if (!name || (!(phone && phone.trim()) && !(email && email.trim()))) {
      return new Response(JSON.stringify({ status: 'error', message: 'Missing required fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!supabase) {
      console.error('[/api/leads/from-assistant] Supabase client not initialized');
      return new Response(JSON.stringify({ status: 'error', message: 'supabase_not_configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const leadInsert: LeadAnalyticsInsert = {
      phone: phone && phone.trim() ? phone.trim() : null,
      email: email && email.trim() ? email.trim() : null,
      source: 'assistant_web',
      payload: { name, phone, email, message, session_id },
      created_at: new Date().toISOString(),
    };

    const { error: supabaseError } = await supabase.from('leads_analytics').insert([leadInsert]);
    if (supabaseError) {
      console.error('Supabase insert error:', supabaseError);
      return new Response(JSON.stringify({ status: 'error', message: 'supabase_insert_failed' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Build Kommo payload
    // Using /api/v4/leads/complex for now. TODO: adapt to /api/v4/leads if preferred.
    const kommoBase = process.env.KOMMO_BASE_URL || '';
    const kommoToken = process.env.KOMMO_ACCESS_TOKEN || '';

    const kommoUrl = `${kommoBase.replace(/\/$/, '')}/api/v4/leads`;

    // Kommo pipeline: 13589223 ("Pipeline")
    // Initial API status: 104896687 ("Contactos privados")
    const kommoBody = [
      {
        name,
        pipeline_id: 13589223,
        status_id: 104896687,
        // Mantener nota si el endpoint lo acepta; si no, se quitará tras probar.
        notes: [
          {
            note_type: 'common',
            text: `Phone: ${phone || ''}\nEmail: ${email || ''}\nMessage: ${message || ''}`,
          },
        ],
      },
    ] as unknown;

    let kommoResponseOk = true;
    try {
      const resp = await fetch(kommoUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${kommoToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(kommoBody),
      });

      if (!resp.ok) {
        kommoResponseOk = false;
        const text = await resp.text().catch(() => 'no body');
        console.error('Kommo API error', resp.status, text);
      }
    } catch (err) {
      kommoResponseOk = false;
      console.error('Kommo request failed', err);
    }

    if (!kommoResponseOk) {
      return new Response(JSON.stringify({ status: 'partial_success', kommo: 'failed' }), {
        status: 207,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ status: 'ok' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Unhandled error in /api/leads/from-assistant:', err);
    return new Response(JSON.stringify({ status: 'error', message: 'internal_error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
