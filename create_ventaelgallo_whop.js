const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());

async function createVentaElGalloCheckout() {
  console.log('--- GENERANDO CHECKOUT EN WHOP PARA VENTA EL GALLO ---');
  const basePrice = 700; // 700 EUR

  try {
    const response = await fetch('https://api.whop.com/v1/checkout_configurations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHOP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plan: {
          initial_price: basePrice,
          currency: 'eur',
          plan_type: "one_time",
          company_id: process.env.WHOP_COMPANY_ID,
        },
        metadata: {
          client: 'Venta El Gallo',
          service: 'Desarrollo PWA y Reserva'
        }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Whop API Error: ${err}`);
    }

    const data = await response.json();
    const checkoutLink = `https://whop.com/checkout/${data.plan?.id || data.id}`;
    console.log('✅ ¡ENLACE REAL DE 700€ (+21% IVA = 847€) GENERADO EN WHOP!');
    console.log('👉 CHECKOUT URL:', checkoutLink);
  } catch (err) {
    console.error('❌ Error generando checkout:', err);
  }
}

createVentaElGalloCheckout();
