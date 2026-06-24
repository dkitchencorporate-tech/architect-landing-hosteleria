import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Inicializar Supabase Admin
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key'
);

export async function POST(req: Request) {
  try {
    const { dealId } = await req.json();

    if (!dealId) {
      return NextResponse.json({ error: 'Deal ID is required' }, { status: 400 });
    }

    // 1. Buscar el Deal para obtener el precio real
    const { data: deal, error: dealError } = await supabaseAdmin
      .from('deals')
      .select('*, leads(*)')
      .eq('id', dealId)
      .single();

    if (dealError || !deal) {
      return NextResponse.json({ error: 'Deal no encontrado' }, { status: 404 });
    }

    const totalDiscount = (deal.discounts || []).reduce((acc: number, curr: any) => acc + curr.amount, 0);
    const finalPrice = deal.base_price + deal.setup_fee - totalDiscount;

    // 2. Comunicarse con la API de Whop para generar un Checkout dinámico
    const whopApiKey = process.env.WHOP_API_KEY;
    const whopCompanyId = process.env.WHOP_COMPANY_ID;

    if (!whopApiKey || !whopCompanyId) {
      // MODO DESARROLLO / DEMO (Faltan variables de Whop)
      console.warn(' Faltan credenciales de Whop. Simulando checkout exitoso.');
      
      // Simularemos un webhok llamando directamente a nuestra propia ruta
      const fakeWebhookUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/whop/webhook`;
      
      return NextResponse.json({ 
        url: `/deal/success?deal_id=${dealId}`, // Redirigir a success (Simulación)
        simulated: true 
      });
    }

    // AQUI IRA LA LLAMADA REAL A WHOP CUANDO TENGAMOS LA KEY
    /*
    const response = await fetch('https://api.whop.com/v1/checkout_configurations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whopApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        company_id: whopCompanyId,
        currency: 'eur',
        plan: {
          initial_price: finalPrice,
          plan_type: "one_time", // o "renewal" si implementas suscripción
          company_id: whopCompanyId,
        },
        metadata: {
          deal_id: deal.id,
          lead_id: deal.leads.id
        }
      })
    });

    const data = await response.json();
    const checkoutLink = \`https://whop.com/checkout/\${data.plan.id}\`;
    return NextResponse.json({ url: checkoutLink });
    */
    
    return NextResponse.json({ error: 'API Whop Endpoint Pendiente de Confirmación' }, { status: 501 });

  } catch (error: any) {
    console.error('Create Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
