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
    const { messages, clientName, clientCuisine, clientTier } = body || {};

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ status: 'error', message: 'Faltan los mensajes de la conversación' }, { status: 400 });
    }

    const name = clientName || 'un restaurante local';
    const cuisine = clientCuisine || 'comida tradicional';
    const tier = clientTier || 'Casual';

    // Construir la conversación histórica
    let chatHistoryPrompt = `
Eres Arqui, el Coordinador de Ejecución IA de Architect.Sys. Tu función es ser el copiloto consultor de marketing gastronómico para la agencia, ayudándole a crear copys, refinar estrategias y coordinar la ejecución del contenido del cliente activo.

[DATOS DEL CLIENTE ACTIVO]
- Nombre: "${name}"
- Tipo de Cocina: "${cuisine}"
- Categoría/Ticket: "${tier}"

[INSTRUCCIONES DE COMPORTAMIENTO]
- Debes responder siempre teniendo en cuenta este cliente. Si te piden copys, sugerencias de eventos o ideas, adáptalas específicamente a la especialidad del restaurante ("${cuisine}") y su nivel ("${tier}").
- Utiliza un tono directo, profesional, enérgico y comercial.
- Responde de forma clara usando viñetas, negritas y listas de tareas para facilitar la lectura.
- Si te piden ideas para anuncios, escribe variantes de ganchos rápidos y textos cortos listos para copiar.
- Tienes conocimientos profundos de neuromarketing y de las 10 leyes operativas de la prospección gastronómica de Architect.Sys.

[HISTORIAL DE LA CONVERSACIÓN]
`;

    // Añadir los últimos 6 mensajes para conservar contexto sin saturar la ventana de contexto
    const recentMessages = messages.slice(-6);
    recentMessages.forEach((msg: any) => {
      const roleName = msg.role === 'user' ? 'Consultor' : 'Arqui (IA)';
      chatHistoryPrompt += `\n- ${roleName}: "${msg.content}"`;
    });

    chatHistoryPrompt += `\n\nResponde ahora al último mensaje del Consultor en español.`;

    const reply = await generateGeminiContent(chatHistoryPrompt, false);

    return NextResponse.json({ 
      status: 'ok', 
      reply: reply.trim() 
    });

  } catch (err: any) {
    console.error('[creative-factory/agent-chat] error', err);
    return NextResponse.json({ status: 'error', message: String(err) }, { status: 500 });
  }
}
