const { loadEnvConfig } = require('@next/env');
loadEnvConfig(process.cwd());
const { createClient } = require('@supabase/supabase-js');
const crypto = require('crypto');

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

async function testWhopCheckout() {
  console.log('--- TEST DE CREACIÓN DE CONTRATO Y WHOP CHECKOUT ---');
  
  const testEmail = 'klarx94@gmail.com';
  
  try {
    // 1. Crear un Lead de prueba
    console.log('[1] Buscando o Creando Lead para:', testEmail);
    let lead;
    const { data: existingLead } = await supabaseAdmin
      .from('leads')
      .select('*')
      .eq('email', testEmail)
      .single();

    if (existingLead) {
      lead = existingLead;
      console.log('✅ Lead existente encontrado:', lead.id);
    } else {
      const { data: newLead, error: leadError } = await supabaseAdmin
        .from('leads')
        .insert({
          name: 'Klarx Test',
          restaurant_name: 'Restaurante Whop Test',
          email: testEmail,
          phone: '+34 600 000 000',
          status: 'new'
        })
        .select()
        .single();
      if (leadError) throw leadError;
      lead = newLead;
      console.log('✅ Lead creado con ID:', lead.id);
    }

    // 2. Crear un Deal con 99% de descuento (Precio base 1000, desc 990 -> final 10)
    console.log('\n[2] Creando Deal / Contrato (99% Descuento)...');
    const magicToken = crypto.randomBytes(16).toString('hex');
    const { data: deal, error: dealError } = await supabaseAdmin
      .from('deals')
      .insert({
        lead_id: lead.id,
        plan_type: 'base',
        base_price: 1000,
        setup_fee: 0,
        discounts: [{ description: 'Test 99%', amount: 990 }], // 10 EUR final
        deal_notes: 'Prueba de checkout Whop dinámico',
        status: 'draft',
        magic_token: magicToken
      })
      .select()
      .single();

    if (dealError) throw dealError;
    console.log('✅ Deal creado con ID:', deal.id);
    console.log('✅ Magic Link:', `http://localhost:3000/deal/${magicToken}`);

    // 3. Simular llamada a la API de Whop (el mismo código que tu backend)
    console.log('\n[3] Generando enlace de pago dinámico con Whop...');
    const finalPrice = 10; // 1000 - 990 = 10 EUR
    
    const response = await fetch('https://api.whop.com/v1/checkout_configurations', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.WHOP_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        plan: {
          initial_price: finalPrice,
          currency: 'eur',
          plan_type: "one_time",
          company_id: process.env.WHOP_COMPANY_ID,
        },
        metadata: {
          deal_id: deal.id,
          lead_id: lead.id
        }
      })
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Whop API Error: ${err}`);
    }

    const data = await response.json();
    const checkoutLink = `https://whop.com/checkout/${data.plan?.id || data.id}`;
    console.log('✅ ¡ENLACE DE WHOP GENERADO CON ÉXITO!');
    console.log('👉 URL de Pago:', checkoutLink);

    // Guardar URL en el deal
    await supabaseAdmin
      .from('deals')
      .update({ whop_payment_url: checkoutLink })
      .eq('id', deal.id);

    console.log('\n--- RESULTADOS DEL TEST ---');
    if (!process.env.RESEND_API_KEY) {
      console.log('⚠️ AVISO: No tienes RESEND_API_KEY en tu .env.local, por lo que el correo NO se enviará realmente. Puedes simularlo abriendo este enlace directamente en tu navegador:');
    } else {
      console.log('✅ El correo se enviaría automáticamente a', testEmail, 'con este enlace:');
    }
    console.log(`🔗 http://localhost:3000/deal/${magicToken}`);

  } catch (error) {
    console.error('\n❌ ERROR DURANTE EL TEST:', error);
  }
}

testWhopCheckout();
