import { NextResponse } from 'next/server';
import { generateGeminiContent } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { goal, format } = body || {};

    if (!goal || !format) {
      return NextResponse.json({ status: 'error', message: 'Faltan parámetros (goal o format)' }, { status: 400 });
    }

    const prompt = `
Eres el Director Creativo Principal de Architect.Sys. Tu misión es fabricar contenido publicitario altamente persuasivo de nivel premium para captar hosteleros de ticket medio y alto.

[PERFIL COMERCIAL Y SERVICIOS DE ARCHITECT.SYS]
- Identidad: No somos una agencia convencional de marketing; somos el Socio Operativo y Tecnológico que implementa infraestructura de conversión para hostelería.
- Pilares de Venta/Servicios:
  1. Infraestructura Base (Pago Único): Carta digital interactiva propia (sin comisiones del 30% de apps de delivery). El hostelero es 100% dueño de su sistema.
  2. Socio Growth (Suscripción): Acceso completo a la biblioteca de 7 Eventos Universales de Alta Afluencia (catas, flamenco, comedia, juegos, dating) para llenar mesas en días muertos (martes a jueves), informes financieros y acompañamiento estratégico.
  3. Agente Autónomo IA (Arqui V2): Un bot autónomo en WhatsApp que actúa como un cerrador de ventas senior. Tiene memoria persistente de 10 mensajes, detecta intenciones y pausa automáticamente al detectar conversaciones personales para que intervenga un humano.

[OBJETIVO DE LA CAMPAÑA ACTUAL]
- "${goal}"

[FORMATO SOLICITADO]
- Formato: "${format}" (debe ser "static" o "carousel").

[INSTRUCCIONES DE RESPUESTA]
Si es "static":
Genera un post publicitario directo y de alto impacto con un gancho visual para la imagen, el copy del cuerpo y un prompt en inglés para Imagen 4.

Si es "carousel":
Genera una estructura de 5 diapositivas secuenciales. Cada diapositiva debe tener un gancho claro, una breve descripción y un prompt de imagen específico en inglés para Imagen 4 que continúe el hilo estético.

Devuelve OBLIGATORIAMENTE un JSON puro con la estructura correspondiente. No envíes markdown de bloque (\`\`\`json), solo JSON plano.

Estructura para static:
{
  "type": "static",
  "hook": "GANCHO EN MAYÚSCULAS PARA LA IMAGEN",
  "body": "Copy principal en español enfocado al dolor/ROI del hostelero. Usa viñetas y tono premium B2B.",
  "imagePrompt": "Un prompt de Imagen 4 detallado en inglés para representar el concepto."
}

Estructura para carousel:
{
  "type": "carousel",
  "slides": [
    {
      "slideNumber": 1,
      "hook": "TEXTO CORTO Y CONTUNDENTE",
      "description": "Texto explicativo de la slide 1 en español.",
      "imagePrompt": "Prompt de Imagen 4 detallado en inglés para la slide 1."
    },
    ...
    {
      "slideNumber": 5,
      "hook": "LLAMADA A LA ACCIÓN (CTA)",
      "description": "Cómo contactar y cerrar con Architect.Sys.",
      "imagePrompt": "Prompt de Imagen 4 detallado en inglés para la slide 5."
    }
  ]
}
`;

    let rawText = await generateGeminiContent(prompt, true);
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      let cleanedText = rawText.trim();
      const firstCurly = cleanedText.indexOf('{');
      const lastCurly = cleanedText.lastIndexOf('}');
      if (firstCurly !== -1 && lastCurly !== -1) {
        cleanedText = cleanedText.substring(firstCurly, lastCurly + 1);
      }
      const parsed = JSON.parse(cleanedText);
      return NextResponse.json({ status: 'ok', data: parsed });
    } catch (parseError) {
      console.error('JSON Parse Error in Architect Promo Generator, attempting repair:', parseError);
      try {
        let repairedText = rawText.trim();
        // Si falta el cierre del JSON (común si la IA se queda sin tokens)
        if (!repairedText.endsWith('}')) {
          if (repairedText.includes('"slides"')) {
            // Intentar cerrar el último slide del carrusel y el objeto principal
            if (!repairedText.includes(']')) {
              repairedText = repairedText + '}]}]}';
            } else {
              repairedText = repairedText + ']}';
            }
          } else {
            repairedText = repairedText + '"}';
          }
        }
        const firstCurly = repairedText.indexOf('{');
        const lastCurly = repairedText.lastIndexOf('}');
        if (firstCurly !== -1 && lastCurly !== -1) {
          repairedText = repairedText.substring(firstCurly, lastCurly + 1);
        }
        const parsed = JSON.parse(repairedText);
        return NextResponse.json({ status: 'ok', data: parsed });
      } catch (repairError) {
        console.error('Could not repair JSON:', repairError);
        return NextResponse.json({ status: 'error', message: 'La IA devolvió un formato no válido y no pudo ser reparado.' }, { status: 500 });
      }
    }

  } catch (err: any) {
    console.error('[creative-factory/architect-promo] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
