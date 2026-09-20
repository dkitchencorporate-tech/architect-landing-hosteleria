import { verifyAdmin } from '@/lib/auth-helpers';
import { NextResponse } from 'next/server';
import { generateGeminiContent } from '@/lib/gemini';
import { QR_MENU, EXPERIENCE, BASE_OPERATIVA } from '@/lib/pricing-config';

export async function POST(req: Request) {
  try {
    const auth = await verifyAdmin();
    if (auth.error) {
      return NextResponse.json({ status: 'error', message: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const { goal, format } = body || {};

    if (!goal || !format) {
      return NextResponse.json({ status: 'error', message: 'Faltan parámetros (goal o format)' }, { status: 400 });
    }

    const prompt = `
Eres el Director Creativo Principal de DKitchen. Tu misión es fabricar contenido publicitario altamente persuasivo de nivel premium para captar hosteleros.

[PERFIL COMERCIAL Y SERVICIOS DE DKITCHEN]
- Identidad: DKitchen Corporate SL, socio tecnológico que implementa infraestructura de conversión para hostelería.
- Reglas innegociables que ningún copy puede contradecir: nunca uses la palabra "agencia" para describirnos; nunca prometas un porcentaje de resultados ni una garantía de facturación; DKitchen no cobra comisión y no toca el dinero del cliente. Todas las tarifas son fijas.
- Escalera de servicios, de menor a mayor compromiso:
  1. QR Menú: carta digital propia con URL estable — el QR impreso no deja de funcionar nunca aunque cambie la carta, así que no hay que reimprimirlo. ${QR_MENU.setup.precio}€ de montaje (habitualmente regalado en promoción) + ${QR_MENU.planes.basico.mensual}€/mes Básico o ${QR_MENU.planes.ampliado.mensual}€/mes Ampliado, con el primer mes a ${QR_MENU.primerMes}€ simbólico.
  2. DKitchen Experience: un evento gastronómico ya definido, entregado llave en mano, desde ${EXPERIENCE.tarifas.primeraVez.precio}€ de tarifa fija. Las entradas se cobran en la cuenta del propio local: el hostelero se queda el 100% de la taquilla.
  3. Auditoría de canales externos: diagnóstico pagado de Google Business Profile y redes sociales. Todavía sin precio público — no inventes ninguna cifra.
  4. Base Operativa: la PWA completa como sistema operativo del negocio (todos los canales de pedido, impresora de cocina, fidelización propia, cierre de día hacia el POS fiscal que ya tiene). ${BASE_OPERATIVA.pagoUnico}€ de pago único fraccionable.
  5. Dark Kitchen Multimarca: sumar marcas virtuales ya probadas a una cocina infrautilizada, o construir la operación completa desde cero.

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
