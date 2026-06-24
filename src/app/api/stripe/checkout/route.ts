import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_dummy', {
  apiVersion: '2026-05-27.dahlia',
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const deal_id = formData.get('deal_id') as string;

    if (!deal_id) {
      return NextResponse.json({ error: 'Deal ID missing' }, { status: 400 });
    }

    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get(name: string) { return cookieStore.get(name)?.value } } }
    );

    // Fetch the deal
    const { data: deal, error: dealError } = await supabase
      .from('deals')
      .select('*, leads(*)')
      .eq('id', deal_id)
      .single();

    if (dealError || !deal) {
      return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
    }

    const lead = deal.leads;
    const totalDiscount = (deal.discounts || []).reduce((acc: number, curr: any) => acc + curr.amount, 0);
    const finalPrice = deal.base_price + deal.setup_fee - totalDiscount;

    // Si ya está pagado, no dejar pagar de nuevo
    if (deal.status === 'paid') {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/deal/${deal.magic_token}?error=already_paid`, 303);
    }

    // Actualizar el estado a 'signed' (porque hicieron clic en Firmar y Pagar)
    await supabase.from('deals').update({ status: 'signed' }).eq('id', deal.id);

    // Enviar a Stripe Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: lead.email, // Autocompleta el email en Stripe
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: `Architect.Sys - ${deal.plan_type === 'growth' ? 'Growth Partner' : 'Plan Base'}`,
              description: `Servicios Digitales para ${lead.restaurant_name}`,
            },
            unit_amount: Math.round(finalPrice * 100), // Stripe usa céntimos
          },
          quantity: 1,
        },
      ],
      mode: 'payment', // Pago único por ahora (el Growth podría ser setup inicial + suscripción luego)
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/deal/${deal.magic_token}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/deal/${deal.magic_token}`,
      metadata: {
        deal_id: deal.id,
        lead_id: lead.id,
      },
    });

    // Guardar el session ID en el deal
    await supabase.from('deals').update({ stripe_session_id: session.id }).eq('id', deal.id);

    return NextResponse.redirect(session.url!, 303);

  } catch (error: any) {
    console.error('Stripe Checkout Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
