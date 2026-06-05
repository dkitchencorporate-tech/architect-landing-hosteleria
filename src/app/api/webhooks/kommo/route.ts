import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { LeadAnalyticsInsert } from '@/lib/types';

/**
 * Interfaces para el Webhook de Kommo
 */
interface KommoContact {
  id?: number;
  phone?: string;
  email?: string;
  custom_fields?: Array<{
    name: string;
    values: Array<{ value: string }>;
  }>;
}

interface KommoWebhookPayload {
  leads?: {
    add?: Array<{
      id: number;
      name?: string;
      price?: number;
    }>;
  };
  contacts?: {
    add?: Array<KommoContact>;
    update?: Array<KommoContact>;
  };
  contact?: KommoContact; // Variación posible en el payload
  [key: string]: any;
}

/**
 * ENDPOINT: /api/webhooks/kommo
 *
 * Diseñado para recibir webhooks oficiales de Kommo.
 * Seguridad: header `x-webhook-secret` comparado con env `WEBHOOK_SECRET_KOMMO`.
 * Normalización: Extrae `phone` y `email` del payload.
 */

export async function POST(req: Request) {
  try {
    const providedSecret = req.headers.get('x-webhook-secret');
    const webhookSecret = process.env.WEBHOOK_SECRET_KOMMO;

    if (!webhookSecret || providedSecret !== webhookSecret) {
      console.warn('[Webhook Kommo] Unauthorized access attempt.');
      return NextResponse.json({ status: 'unauthorized' }, { status: 401 });
    }

    const body = (await req.json()) as KommoWebhookPayload;

    // Lógica de extracción de teléfono y correo
    let phone: string | null = null;
    let email: string | null = null;

    // Buscar en la raíz de contact (si viene así)
    if (body.contact) {
        if (body.contact.phone) phone = body.contact.phone;
        if (body.contact.email) email = body.contact.email;
    }

    // Buscar en contacts.add o contacts.update
    const contacts = body.contacts?.add || body.contacts?.update;
    if (!phone && !email && contacts && contacts.length > 0) {
      const contact = contacts[0];
      if (contact.phone) phone = contact.phone;
      if (contact.email) email = contact.email;

      // Intentar buscar en custom_fields si no están directamente
      if ((!phone || !email) && contact.custom_fields) {
         for (const field of contact.custom_fields) {
             const fieldName = field.name.toLowerCase();
             if (fieldName.includes('phone') || fieldName.includes('telefono') || fieldName.includes('teléfono')) {
                 if (!phone && field.values && field.values.length > 0) {
                     phone = field.values[0].value;
                 }
             }
             if (fieldName.includes('email') || fieldName.includes('correo')) {
                 if (!email && field.values && field.values.length > 0) {
                     email = field.values[0].value;
                 }
             }
         }
      }
    }

    const leadInsert: LeadAnalyticsInsert = {
      phone: phone,
      email: email,
      source: 'kommo',
      payload: body,
      created_at: new Date().toISOString(),
    };

    if (!supabase) {
      throw new Error('Supabase server client not initialized. Check SUPABASE_SERVICE_KEY.');
    }

    const { error } = await supabase.from('leads_analytics').insert([leadInsert]);

    if (error) {
      console.error('[Webhook Kommo] Error inserting lead:', error.message);
      return NextResponse.json({ status: 'error', message: 'Database insertion failed' }, { status: 500 });
    }

    console.log('[Webhook Kommo] Lead recorded (kommo)');
    return NextResponse.json({ status: 'ok' });
  } catch (err: any) {
    console.error('[Webhook Kommo] Critical Error:', err?.message ?? String(err));
    return NextResponse.json({ status: 'error', message: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'method_not_allowed' }, { status: 405 });
}
