import { verifyAdmin } from '@/lib/auth-helpers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const auth = await verifyAdmin();
    if (auth.error) {
      return NextResponse.json({ status: 'error', message: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const { prompt } = body || {};

    if (!prompt) {
      return NextResponse.json({ status: 'error', message: 'Falta el prompt de imagen' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ status: 'error', message: 'No hay GEMINI_API_KEY configurada en .env.local' }, { status: 500 });
    }

    // Usaremos la versión estable de Imagen en AI Studio: imagen-4.0-generate-001
    const url = `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          outputMimeType: 'image/png',
          aspectRatio: '1:1'
        }
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMsg = data.error?.message || 'Error desconocido al invocar Imagen';
      
      // Capturamos el error típico de facturación y le damos formato amigable
      if (errorMsg.includes('paid plans') || errorMsg.includes('BILLING_DISABLED')) {
        return NextResponse.json({ 
          status: 'billing_required', 
          message: 'Tu API Key de Gemini está en el plan gratuito de Google AI Studio. Imagen requiere activar la facturación (Pay-as-you-go). Entra en https://aistudio.google.com/ app -> Settings -> Billing y haz clic en "Upgrade to paid plan" para habilitar la generación de imágenes.' 
        }, { status: 402 });
      }

      return NextResponse.json({ status: 'error', message: errorMsg }, { status: response.status });
    }

    const prediction = data.predictions?.[0];
    if (!prediction || !prediction.bytesBase64Encoded) {
      return NextResponse.json({ status: 'error', message: 'El modelo no devolvió ninguna imagen en la respuesta.' }, { status: 500 });
    }

    return NextResponse.json({ 
      status: 'ok', 
      image: `data:image/png;base64,${prediction.bytesBase64Encoded}` 
    });

  } catch (err: any) {
    console.error('[creative-factory/generate-image] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
