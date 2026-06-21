import { verifyAdmin } from '@/lib/auth-helpers';
import { NextResponse } from 'next/server';
import { generateGeminiContent } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const auth = await verifyAdmin();
    if (auth.error) {
      return NextResponse.json({ status: 'error', message: auth.error }, { status: auth.status });
    }

    const body = await req.json();
    const { pain, angle, clientName, clientCuisine, clientTier } = body || {};

    if (!pain || !angle) {
      return NextResponse.json({ status: 'error', message: 'Falta pain o angle' }, { status: 400 });
    }

    // Contexto predeterminado si no se envían datos del cliente
    const name = clientName || 'un restaurante local';
    const cuisine = clientCuisine || 'comida tradicional';
    const tier = clientTier || 'Casual';

    const prompt = `
Eres un redactor creativo B2B de altísimo nivel especializado en marketing gastronómico e ingeniería de menús para restaurantes.
Tu trabajo es construir un anuncio publicitario altamente persuasivo para captar hosteleros, basándote en un Dolor, un Ángulo de Ataque y adaptado al perfil del restaurante de nuestro cliente activo.

[INFORMACIÓN DEL RESTAURANTE CLIENTE]
- Nombre del local: "${name}"
- Especialidad/Cocina: "${cuisine}"
- Categoría/Estilo: "${tier}" (Ej: Gourmet, Barrio, Casual, Copas, Familiar)

[DOLOR DEL RESTAURANTE]
${pain}

[ÁNGULO DE ATAQUE PUBLICITARIO]
${angle}

[INSTRUCCIONES DE TONO DE LA IA]
- Si el estilo es "Gourmet", usa un lenguaje sofisticado, exclusivo y de alto valor técnico culinario.
- Si el estilo es "Barrio", usa un tono cercano, campechano, humilde, familiar, centrado en la comunidad y precios honestos.
- Si el estilo es "Casual" o cualquier otro, usa un tono moderno, dinámico, asertivo y fresco.
- El copy principal DEBE hacer referencia sutil al tipo de cocina ("${cuisine}") y el nombre del restaurante ("${name}") para demostrar cómo nuestra estrategia se adapta a su negocio y no es una plantilla genérica.

Debes devolver obligatoriamente un objeto JSON con la siguiente estructura:
{
  "hook": "Un gancho de texto ultra corto (máximo 8 palabras) para poner sobre la imagen en fuentes gigantes. Debe ser impactante y doler inmediatamente al leerlo.",
  "primaryText": "El texto principal del post del anuncio (copy de lectura fluida, usando párrafos cortos, emojis y copywriting adaptado al tono correspondiente). Explica la solución y termina con una llamada a la acción clara.",
  "visualPrompt": "Un prompt altamente descriptivo en inglés para un modelo de generación de imágenes como Imagen 4. Debe detallar una composición fotográfica gastronómica real de altísimo nivel, iluminación de estudio, fondo elegante, contraste extremo, sin texto en la imagen. La composición debe estar inspirada en la especialidad: ${cuisine}."
}

NUNCA respondas con markdown tipo \`\`\`json. Devuelve ÚNICAMENTE el JSON puro.
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
      console.error('JSON Parse Error in Creative Generator, attempting repair:', parseError);
      try {
        let repairedText = rawText.trim();
        if (!repairedText.endsWith('}')) {
          repairedText = repairedText + '"}';
        }
        const firstCurly = repairedText.indexOf('{');
        const lastCurly = repairedText.lastIndexOf('}');
        if (firstCurly !== -1 && lastCurly !== -1) {
          repairedText = repairedText.substring(firstCurly, lastCurly + 1);
        }
        const parsed = JSON.parse(repairedText);
        return NextResponse.json({ status: 'ok', data: parsed });
      } catch (repairError) {
        console.error('Could not repair JSON in Creative Generator:', repairError);
        return NextResponse.json({ status: 'error', message: 'La IA devolvió un formato no válido y no pudo ser reparado.' }, { status: 500 });
      }
    }

  } catch (err: any) {
    console.error('[creative-factory/generate] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
