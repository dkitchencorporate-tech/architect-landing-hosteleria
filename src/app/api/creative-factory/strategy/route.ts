import { NextResponse } from 'next/server';
import { generateGeminiContent } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { clientName, clientCuisine, clientTier } = body || {};

    if (!clientName || !clientCuisine || !clientTier) {
      return NextResponse.json({ status: 'error', message: 'Faltan datos del cliente' }, { status: 400 });
    }

    const prompt = `
Eres el Director de Estrategia Gastronómica de Architect.Sys. Tu especialidad es diseñar planes de guerrilla de 30 días de captación y retención para hostelería de alto ticket.
Diseña un plan de marketing y optimización detallado para nuestro cliente activo:

[DATOS DEL CLIENTE]
- Nombre del restaurante: "${clientName}"
- Especialidad culinaria: "${clientCuisine}"
- Categoría/Nivel de ticket: "${clientTier}" (Barrio, Gourmet, Casual, etc.)

El plan de 30 días debe estar estructurado en 3 fases clave y redactado en formato Markdown elegante:
1. **Fase 1: Ingeniería de Menú y Auditoría Visual (Días 1-10)**: Cómo estructurar su carta para maximizar rentabilidad e identificar los platos rentables que necesitan fotos profesionales de IA.
2. **Fase 2: Campañas de Atracción e Imán de Prospectos (Días 11-20)**: Copys y ganchos publicitarios locales recomendados para Ads enfocados en su target particular.
3. **Fase 3: Evento de Afluencia y Retención (Días 21-30)**: Qué tipo de evento universal (maridaje, cata, música acústica, flamenco, monólogo, citas rápidas) se adapta a su estilo ("${clientTier}") y cómo ejecutar el embudo para llenar el restaurante.

[REGLAS DE TONO]
- Si es Gourmet: Sofisticado, elegante, enfocado en exclusividad y ticket alto.
- Si es Barrio: Cercano, familiar, enfocado en volumen local, comunidad y rentabilidad rápida.
- Si es Casual: Moderno, de vanguardia, dinámico y tecnológico.

Devuelve OBLIGATORIAMENTE un JSON puro con la siguiente estructura (no envíes markdown de bloque tipo \`\`\`json, solo JSON plano):
{
  "strategy": "Contenido detallado en formato Markdown..."
}
`;

    let rawText = await generateGeminiContent(prompt, true);
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    let strategyText = '';
    try {
      const parsed = JSON.parse(rawText);
      strategyText = parsed.strategy || '';
    } catch (parseError) {
      console.error('JSON Parse Error in Strategy Generator, attempting fallback extraction:', parseError);
      
      // Fallback: Extraer el contenido de "strategy" manualmente si el JSON está mal formado o truncado
      const strategyKeyIndex = rawText.indexOf('"strategy"');
      if (strategyKeyIndex !== -1) {
        const searchStr = rawText.substring(strategyKeyIndex);
        const firstColon = searchStr.indexOf(':');
        if (firstColon !== -1) {
          let valueStr = searchStr.substring(firstColon + 1).trim();
          if (valueStr.startsWith('"')) {
            valueStr = valueStr.substring(1);
            // Intentar quitar el cierre del JSON si existe
            if (valueStr.endsWith('"}')) {
              valueStr = valueStr.substring(0, valueStr.length - 2);
            } else if (valueStr.endsWith('"')) {
              valueStr = valueStr.substring(0, valueStr.length - 1);
            }
            strategyText = valueStr
              .replace(/\\n/g, '\n')
              .replace(/\\"/g, '"')
              .replace(/\\'/g, "'")
              .replace(/\\t/g, '\t');
          }
        }
      }
      
      if (!strategyText) {
        strategyText = rawText; // Fallback definitivo
      }
    }

    return NextResponse.json({ status: 'ok', data: { strategy: strategyText } });

  } catch (err: any) {
    console.error('[creative-factory/strategy] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
