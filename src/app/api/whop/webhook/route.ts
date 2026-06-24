import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Aquí irá la lógica para verificar el webhook usando WHOP_WEBHOOK_SECRET
    // y para disparar el correo de Onboarding al cliente cuando pague.
    
    console.log('Webhook recibido de Whop:', body.action || 'Test Ping');

    // Respondemos rápido con 200 OK para que Whop sepa que existimos y no nos dé error
    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('Webhook Error:', error.message);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 400 });
  }
}

// Algunos webhooks hacen un ping GET para verificar el endpoint
export async function GET() {
  return NextResponse.json({ status: 'Whop Webhook Endpoint Alive' }, { status: 200 });
}
