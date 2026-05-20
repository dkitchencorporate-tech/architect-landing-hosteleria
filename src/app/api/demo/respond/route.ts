import { NextResponse } from 'next/server';
import { generateGeminiContent } from '@/lib/gemini';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { mode, messages, leadContext } = body || {};

    if (!mode) return NextResponse.json({ status: 'error', message: 'missing mode' }, { status: 400 });

    // Build system instruction based on mode with Arqui persona
    let systemInstruction = `Eres Arqui, el asistente de Architect.Sys. Eres empático, útil y experto en hostelería. Responde en un tono profesional, limpio y orientado a negocio. Evita muletillas y texto redundante. Usa texto plano (no HTML) y limita las respuestas a 1–3 párrafos. Si formulas varias preguntas en un mismo turno en modo CONSULTING, preséntalas como lista numerada (1., 2., 3.) en líneas separadas. Usa frases cortas y separa preguntas con saltos de línea.`;
    if (mode === 'CONSULTING') {
      systemInstruction += `\nMODO CONSULTING: Recopila datos básicos del negocio con preguntas claras y breves. Prioriza: nombre del contacto, nombre del negocio, tipo de negocio (restaurante, bar, delivery, hotel, dark_kitchen, otro), ubicación, modelo de servicio (solo_reservas, solo_delivery, mixto), capacidad aproximada y canales (web/social/whatsapp/deliveryApps). No ofrezcas la demo hasta tener los datos básicos; cuando los tengas, sugiere una demo personalizada. Mantén preguntas cortas y, si hay varias, preséntalas numeradas en líneas separadas (1., 2., ...).`;
    } else if (mode === 'BOOKING_DEMO') {
      systemInstruction += `\nMODO BOOKING_DEMO: Actúa como agente operativo que simula una interacción real (reserva o pedido). Usa la información en leadContext para personalizar. Simula preguntas de confirmación, solicita fecha/hora/nº de personas o detalles del pedido, y realiza confirmaciones claras. Mantén respuestas breves y orientadas a la acción.`;
    } else if (mode === 'CLOSING') {
      systemInstruction += `\nMODO CLOSING: Actúa como agente comercial. Resume beneficios concretos, muestra la oferta especial: 650€ + 120€/mes. Invita a agendar una llamada con un enlace placeholder. Cierra la conversación con un CTA claro. Usa lenguaje persuasivo pero profesional, evitando párrafos largos.`;
    }

    // Build conversation history for the prompt
    const historyText = Array.isArray(messages) ? messages.map((m: any) => `${m.role === 'user' ? 'Usuario' : 'Asistente'}: ${m.content}`).join('\n') : '';
    // Build a human-readable lead summary (no JSON) to provide context to the model
    let leadText = '';
    if (leadContext && typeof leadContext === 'object') {
      const parts: string[] = [];
      if (leadContext.leadName) parts.push(`Nombre del contacto: ${leadContext.leadName}`);
      if (leadContext.businessName) parts.push(`Nombre del negocio: ${leadContext.businessName}`);
      if (leadContext.businessType) parts.push(`Tipo de negocio: ${leadContext.businessType}`);
      if (leadContext.location) parts.push(`Ubicación: ${leadContext.location}`);
      if (leadContext.serviceModel) parts.push(`Modelo de servicio: ${leadContext.serviceModel}`);
      if (leadContext.capacity) parts.push(`Capacidad aproximada: ${leadContext.capacity}`);
      if (leadContext.channels && Array.isArray(leadContext.channels)) parts.push(`Canales: ${leadContext.channels.join(', ')}`);
      if (parts.length > 0) leadText = `Información del lead:\n- ${parts.join('\n- ')}`;
    }

    // Ask the model to respond in plain text. Also ask (optionally) to append a JSON object with detected leadContext when available.
    const prompt = `${systemInstruction}\n\n${leadText}\n\nConversación previa:\n${historyText}\n\nResponde como asistente. No incluyas objetos JSON ni llaves ({, }) en la respuesta visible al usuario. Si puedes extraer datos estructurados sobre el lead, devuelve SOLO el texto natural para el usuario y, de forma separada (solo para el API), puedes incluir un objeto JSON con la clave \"leadContext\". En la respuesta visible al usuario, cuando hagas varias preguntas en modo CONSULTING, preséntalas como lista numerada (1., 2., ...), una pregunta por línea. Mantén respuestas de 1–3 párrafos cortos, separa bloques con saltos de línea.`;

    let text = await generateGeminiContent(prompt, false);

    // Try to extract JSON leadContext from the model output (but remove JSON from visible text)
    let parsedLeadContext: any = undefined;
    try {
      const jsonStart = text.indexOf('{');
      if (jsonStart !== -1) {
        const possible = text.slice(jsonStart);
        // Try to find the last closing brace that balances
        let depth = 0;
        let endIdx = -1;
        for (let i = 0; i < possible.length; i++) {
          if (possible[i] === '{') depth++;
          else if (possible[i] === '}') {
            depth--;
            if (depth === 0) { endIdx = i; break; }
          }
        }
        if (endIdx !== -1) {
          const jsonStr = possible.slice(0, endIdx + 1);
          const maybe = JSON.parse(jsonStr);
          if (maybe && typeof maybe === 'object' && maybe.leadContext) {
            parsedLeadContext = maybe.leadContext;
            // remove the JSON block from the visible text
            text = text.slice(0, jsonStart).trim();
          } else if (maybe && typeof maybe === 'object' && (maybe.leadName || maybe.businessName || maybe.businessType)) {
            parsedLeadContext = maybe;
            text = text.slice(0, jsonStart).trim();
          }
        }
      }
    } catch (err) {
      // ignore parse errors
      parsedLeadContext = undefined;
    }

    const response: any = { status: 'ok', text };
    if (parsedLeadContext) response.leadContext = parsedLeadContext;

    return NextResponse.json(response);
  } catch (err: any) {
    console.error('[demo/respond] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
