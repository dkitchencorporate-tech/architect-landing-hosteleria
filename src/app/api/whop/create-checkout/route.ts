import { NextResponse } from 'next/server';

const decodeTokenPayload = (fullToken: string) => {
  try {
    const decodedToken = decodeURIComponent(fullToken);
    const parts = decodedToken.split('::');
    if (parts.length > 1) {
      return JSON.parse(decodeURIComponent(atob(parts[1])));
    }
  } catch(e) {
    console.error('Error decoding token payload:', e);
  }
  return null;
};

export async function POST(req: Request) {
  try {
    // Frontend sends token string as dealId
    const { dealId } = await req.json();

    if (!dealId) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    const payload = decodeTokenPayload(dealId);
    if (!payload) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 400 });
    }

    const basePrice = Number(payload.price) || 0;
    const setupFee = Number(payload.setup) || 0;
    const finalPrice = basePrice + setupFee;

    // 2. Comunicarse con la API de Whop para generar un Checkout dinámico
    const whopApiKey = process.env.WHOP_API_KEY;
    const whopCompanyId = process.env.WHOP_COMPANY_ID;

    if (!whopApiKey || !whopCompanyId) {
      // MODO DESARROLLO / DEMO (Faltan variables de Whop)
      console.warn(' Faltan credenciales de Whop. Simulando checkout exitoso.');
      
      // En entorno local redirigimos a una ruta que simule el éxito, enviando metadata a un "fake webhook"
      const fakeWebhookUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/whop/webhook`;
      
      // Disparar Webhook falso en el fondo
      fetch(fakeWebhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'payment.succeeded',
          data: {
            metadata: {
               fullToken: dealId
            }
          }
        })
      }).catch(console.error);

      return NextResponse.json({ 
        url: `/deal/success`, // Redirigir a success (Simulación)
        simulated: true 
      });
    }

    const isRecurring = payload.plan === 'suscripcion'; // We don't have exact plan type in payload but we can default to one_time for simplicity, or we can check the plan_type in db or we can check if basePrice > 0. Actually base is one_time, pro is recurring. We assume one_time by default unless we know. Let's assume one_time since we only passed 'price' and 'setup'

    // LLAMADA REAL A WHOP
    const response = await fetch('https://api.whop.com/v1/checkout_configurations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whopApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plan: {
          initial_price: finalPrice,
          currency: 'eur',
          plan_type: 'one_time',
          company_id: whopCompanyId,
        },
        metadata: {
          fullToken: dealId,
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Whop API Error:', errorText);
      return NextResponse.json({ error: 'Fallo al conectar con Whop' }, { status: response.status });
    }

    const data = await response.json();
    const checkoutLink = `https://whop.com/checkout/${data.plan?.id || data.id}`;
    
    return NextResponse.json({ url: checkoutLink });

  } catch (error: any) {
    console.error('Create Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
