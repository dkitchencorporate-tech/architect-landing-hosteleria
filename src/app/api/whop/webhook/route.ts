import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inicializar Supabase Admin
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_KEY || 'dummy_key'
);

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // 1. Verificar qué evento estamos recibiendo
    const action = body.action || body.type || 'unknown_event';
    console.log(`[WHOP WEBHOOK] Recibido evento: ${action}`);

    // 2. Extraer metadatos (donde pasamos el deal_id al crear el checkout)
    const metadata = body.data?.metadata || {};
    const dealId = metadata.deal_id;

    if (action === 'payment.succeeded' || action === 'invoice_created') {
      console.log(`[WHOP WEBHOOK] ¡Pago exitoso detectado! Deal ID: ${dealId}`);
      
      if (dealId) {
        // 1. Obtener el Deal para saber a qué lead pertenece
        const { data: deal } = await supabaseAdmin.from('deals').select('lead_id, plan_type').eq('id', dealId).single();
        
        if (deal) {
          // 2. Actualizar Deal a PAGADO
          await supabaseAdmin.from('deals').update({ status: 'paid' }).eq('id', dealId);
          
          // 3. Actualizar Lead a CERRADO
          await supabaseAdmin.from('leads').update({ status: 'closed' }).eq('id', deal.lead_id);
          
          // 4. Disparar Correo de Onboarding (Dashboard Credentials)
          const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
          fetch(`${baseUrl}/api/dispatch-onboarding`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ dealId })
          }).catch(err => console.error('[WHOP WEBHOOK] Error disparando onboarding:', err));
        }
      } else {
        console.warn(`[WHOP WEBHOOK] Pago recibido pero no se encontró deal_id en los metadatos.`);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('[WHOP WEBHOOK] Error crítico:', error.message);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
}

export async function GET() {
  return NextResponse.json({ status: 'Whop Webhook Endpoint Alive' }, { status: 200 });
}
