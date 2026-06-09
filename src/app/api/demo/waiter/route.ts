import { NextResponse } from 'next/server';
import { generateGeminiContent } from '@/lib/gemini';
import { DEMO_MENU_SUSHI, DEMO_MENU_TAPAS, DEMO_MENU_BURGER } from '@/lib/demo-data';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, language = 'es', contextDish = null, template = 'sushi' } = body || {};

    let menu = DEMO_MENU_SUSHI;
    let persona = "Eres un sumiller/asistente virtual B2B de un restaurante de alta gastronomía asiática.";
    
    if (template === 'tapas') {
      menu = DEMO_MENU_TAPAS;
      persona = "Eres un camarero virtual B2B de un bar granadino tradicional premium, experto en tapas, raciones, vinos y cervezas tiradas.";
    } else if (template === 'burger') {
      menu = DEMO_MENU_BURGER;
      persona = "Eres un cajero virtual B2B de un restaurante fast-food premium de hamburguesas y pizzas. Rápido y eficiente.";
    }

    const menuContext = menu.map(item => 
      `- ID:[${item.id}] ${item.name[language as 'es'|'en'|'fr']}: ${item.price}€. Alérgenos: ${item.allergens.length ? item.allergens.join(', ') : 'Ninguno'}`
    ).join('\n');

    const contextualInstruction = contextDish ? `\n[CONTEXTO ACTUAL DEL USUARIO: ESTÁ VIENDO EL PLATO "${contextDish}"]` : '';

    const systemInstruction = `
[IDENTIDAD]
${persona}
Tu objetivo es ayudar a los comensales a elegir platos de la carta y AÑADIRLOS A SU COMANDA si lo piden.
Debes responder en este idioma: ${language === 'es' ? 'Español' : language === 'en' ? 'Inglés' : 'Francés'}.${contextualInstruction}

[LA CARTA ACTUAL Y ALÉRGENOS]
${menuContext}

[REGLAS CRÍTICAS DE RESPUESTA]
1. Tu respuesta DEBE ser SIEMPRE un objeto JSON válido, NUNCA texto plano.
2. Si el cliente pregunta por un plato o lo va a pedir, y el plato tiene alérgenos (ej. Gluten, Lácteos), HAZ UNA BREVE ADVERTENCIA de forma elegante (ej. "Tenga en cuenta que este plato contiene lácteos").
Estructura del JSON:
{
  "text": "Tu respuesta conversacional y concisa adaptada a tu rol.",
  "action": null // O un objeto de acción si el cliente pide añadir algo.
}

Si el cliente te pide añadir platos o bebidas a la cuenta (ej. "ponme dos de estos", "quiero la smash burger y una coca cola"), debes identificar el ID del menú y devolver la acción así:
{
  "text": "¡Marchando! He añadido 1 Smash Burger y 1 Cola Zero a la cuenta.",
  "action": {
    "type": "ADD_MULTIPLE",
    "items": [
      { "itemId": "b_s1", "qty": 1 },
      { "itemId": "b_be2", "qty": 1 }
    ]
  }
}

Si el cliente solo hace una pregunta, "action" debe ser null.
JAMÁS respondas con formato markdown tipo \`\`\`json. Devuelve ÚNICAMENTE el JSON puro.
`;

    const historyText = Array.isArray(messages) ? messages.map((m: any) => `${m.role === 'user' ? 'Comensal' : 'Asistente'}: ${m.content}`).join('\n') : '';
    
    const prompt = `${systemInstruction}\n\nConversación actual:\n${historyText}\n\nDevuelve el JSON puro sin bloques de código:`;

    let rawText = await generateGeminiContent(prompt, false);
    
    // Clean potential markdown blocks
    rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
      const parsed = JSON.parse(rawText);
      return NextResponse.json({ status: 'ok', data: parsed });
    } catch (parseError) {
      console.error('JSON Parse Error from AI:', rawText);
      return NextResponse.json({ 
        status: 'ok', 
        data: { text: rawText, action: null } 
      });
    }

  } catch (err: any) {
    console.error('[demo/waiter] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
