import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { LeadAnalyticsInsert } from '@/lib/types';

/**
 * Interfaces para el Webhook de Woztell
 */
interface WoztellContact {
  phone?: string;
  email?: string;
  [key: string]: any;
}

interface WoztellWebhookPayload {
  contact?: WoztellContact;
  message?: {
     from?: string; // Suele ser el número de teléfono
     [key: string]: any;
  };
  event?: string;
  [key: string]: any;
}

/**
 * ENDPOINT: /api/webhooks/woztell
 *
 * Diseñado para recibir webhooks oficiales de Woztell.
 * Seguridad: header `x-webhook-secret` comparado con env `WEBHOOK_SECRET_WOZTELL`.
 * Normalización: Extrae `phone` y `email` del payload.
 */

export async function POST(req: Request) {
  try {
    const providedSecret = req.headers.get('x-webhook-secret');
    const webhookSecret = process.env.WEBHOOK_SECRET_WOZTELL;

    if (!webhookSecret || providedSecret !== webhookSecret) {
      console.warn('[Webhook Woztell] Unauthorized access attempt.');
      return NextResponse.json({ status: 'unauthorized' }, { status: 401 });
    }

    const body = (await req.json()) as WoztellWebhookPayload;

    // Lógica de extracción de teléfono y correo
    let phone: string | null = null;
    let email: string | null = null;

    if (body.contact) {
        if (body.contact.phone) phone = body.contact.phone;
        if (body.contact.email) email = body.contact.email;
    }

    if (!phone && body.message && body.message.from) {
        phone = body.message.from;
    }

    const leadInsert: LeadAnalyticsInsert = {
      phone: phone,
      email: email,
      source: 'woztell',
      payload: body,
      created_at: new Date().toISOString(),
    };

    if (!supabase) {
      throw new Error('Supabase server client not initialized. Check SUPABASE_SERVICE_KEY.');
    }

    const { error } = await supabase.from('leads_analytics').insert([leadInsert]);

    if (error) {
      console.error('[Webhook Woztell] Error inserting lead:', error.message);
      return NextResponse.json({ status: 'error', message: 'Database insertion failed' }, { status: 500 });
    }

    console.log('[Webhook Woztell] Lead recorded (woztell)');
    return NextResponse.json({ status: 'ok' });
  } catch (err: any) {
    console.error('[Webhook Woztell] Critical Error:', err?.message ?? String(err));
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'method_not_allowed' }, { status: 405 });
}
