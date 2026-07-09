import { Lead } from './types';
import { SYSTEM_PROMPT_COPYWRITER } from './knowledge-base';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * AI OUTREACH COPYWRITER (100% COMERCIAL, HUMANO, REALISTA Y DIRECTO)
 * CERO falsa empatía, CERO tecnicismos académicos, CERO adulación ni alarmismo.
 * Enfocado en venta real: qué hemos visto, qué solución aportamos y con quién hablar.
 */

export async function generateOutreachForLead(lead: Lead): Promise<Lead> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const modelName = process.env.GEMINI_MODEL || 'gemini-3.0-pro';
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
      Genera los 3 mensajes de prospección comercial directa y realista para este restaurante:
      - Nombre: ${lead.restaurantName}
      - Ciudad: ${lead.city}
      - Modelo de Negocio: ${lead.businessModel}
      - ¿Tiene carta PDF?: ${lead.hasPdfMenu ? 'SÍ' : 'NO'}
      - ¿Usa El Tenedor?: ${lead.usesElTenedor ? 'SÍ' : 'NO'}

      REGLAS ESTRICTAS DE VENTAS:
      1. SÉ DIRECTO Y COMERCIAL: Cero falsa empatía ("qué tal por el local", "seguimos vuestro recorrido"). Cero tecnicismos ("auditoría operativa", "flujo de sala", "ingeniería gastronómica").
      2. NADA DE ADULACIÓN NI ALARMISMO: No digas "enhorabuena por vuestra nota" ni inventes cifras de pérdidas.
      3. ESTRUCTURA DIRECTA (WhatsApp e IG DM - Máx 50 palabras, 0 enlaces):
         - Di qué has visto (carta PDF o reservas por El Tenedor).
         - Di qué hacemos (cartas interactivas móviles sin PDF o motor de reservas propio sin comisiones).
         - Pregunta con quién hablar para enseñar un ejemplo rápido en el móvil.
      `;

      const result = await model.generateContent([
        { text: SYSTEM_PROMPT_COPYWRITER },
        { text: prompt }
      ]);

      const responseText = result.response.text();
      const cleanedJson = responseText.replace(/```json\n?|\n?```/g, '').trim();
      const parsed = JSON.parse(cleanedJson);

      if (parsed.whatsappHook && parsed.emailSubject) {
        lead.outreachCopy = {
          whatsappHook: parsed.whatsappHook,
          instagramHook: parsed.instagramHook || parsed.whatsappHook,
          emailSubject: parsed.emailSubject,
          emailBody: parsed.emailBody
        };
        lead.status = 'ANALYZED';
        return lead;
      }
    } catch (error) {
      console.warn(`[AI Copywriter] Fallback comercial directo para ${lead.restaurantName}:`, error);
    }
  }

  // FALLBACK COMERCIAL DE VENTAS REAL (Humano, directo, sin falsa empatía ni tecnicismos)
  let whatsappHook = '';
  let instagramHook = '';
  let emailSubject = '';
  let emailBody = '';

  // Segmentación directa por necesidad real detectada
  if (lead.usesElTenedor) {
    // Caso 1: Usa El Tenedor / Reservas externas -> Venta de motor de reservas propio sin comisiones
    whatsappHook = `Hola, buenas. He visto en vuestra web que cogéis reservas por El Tenedor. Te escribo porque montamos sistemas de reserva propios para restaurantes que eliminan las comisiones por cubierto y se integran directo en la web y el móvil. ¿Quién lleva este tema en el local para enseñarle un ejemplo rápido?`;
    
    instagramHook = `Hola, buenas. He visto que cogéis reservas por El Tenedor. Te escribo porque montamos sistemas de reserva propios para restaurantes que eliminan las comisiones por cubierto. ¿Con quién puedo hablar para enviaros un ejemplo rápido de cómo queda en el móvil?`;
    
    emailSubject = `Sistema de reservas propio sin comisiones para ${lead.restaurantName}`;
    emailBody = `Hola equipo de ${lead.restaurantName},\n\n` +
      `He estado revisando vuestra página web y he visto que canalizáis las reservas a través de plataformas de terceros como El Tenedor.\n\n` +
      `Os escribo directamente porque desarrollamos motores de reserva propios para restaurantes. Al instalar un sistema de reservas directo en vuestra web y redes sociales, elimináis las comisiones por cubierto de las plataformas externas, especialmente con vuestros clientes habituales y recurrentes.\n\n` +
      `Podéis ver una demostración rápida de 45 segundos de cómo funciona en el móvil y en web aquí:\n` +
      `👉 https://hosteleria.architectsys.com/hub\n\n` +
      `¿Con quién podría agendar una llamada rápida de 5 minutos esta semana para comentarlo?\n\n` +
      `Un saludo,\n` +
      `Alex\n` +
      `Architect.Sys Hospitality`;

  } else if (lead.hasPdfMenu || lead.businessModel === 'Bar / Tapas / Gastrobar') {
    // Caso 2: Carta PDF o Bar/Gastrobar -> Venta de carta digital interactiva PWA
    whatsappHook = `Hola, buenas. He entrado en la web desde el móvil para ver la carta y he visto el formato PDF. Te escribo porque montamos cartas digitales interactivas que cargan al instante y suben el ticket medio con fotos reales y sugerencias de maridaje. ¿Con quién puedo hablar para enseñaros un ejemplo rápido?`;
    
    instagramHook = `Hola, buenas. He visto vuestra carta en el móvil y os escribo porque montamos cartas digitales interactivas que cargan al instante y suben el ticket medio mostrando fotos reales de los platos. ¿Quién lleva este tema en el local para enseñarle un ejemplo rápido?`;
    
    emailSubject = `Carta digital interactiva para el móvil en ${lead.restaurantName}`;
    emailBody = `Hola equipo de ${lead.restaurantName},\n\n` +
      `He estado revisando vuestra web desde el teléfono móvil para ver la carta y he visto el formato actual en PDF.\n\n` +
      `Os escribo directamente porque desarrollamos cartas digitales interactivas (PWA) para hostelería que resuelven varios problemas diarios:\n` +
      `1. Cargan al instante (0.2 segundos) sin obligar al cliente a descargar archivos pesados en su móvil.\n` +
      `2. Aumentan hasta un 25% el ticket medio por mesa al mostrar fotografías reales de los platos y sugerencias automáticas de vinos, postres o guarniciones.\n` +
      `3. Permiten cambiar precios, modificar platos o marcar productos agotados en 1 segundo desde el móvil, sin tener que reimprimir papel ni códigos QR.\n\n` +
      `Podéis ver un ejemplo rápido de 45 segundos de cómo queda en el móvil aquí:\n` +
      `👉 https://hosteleria.architectsys.com/hub\n\n` +
      `¿Con quién podría agendar una llamada rápida de 5 minutos esta semana para enseñaros una demo?\n\n` +
      `Un saludo,\n` +
      `Alex\n` +
      `Architect.Sys Hospitality`;

  } else {
    // Caso 3: Alta Cocina / Gourmet o General -> Venta de ecosistema completo (Reservas + Carta interactiva multi-idioma)
    whatsappHook = `Hola, buenas. Estaba revisando vuestra web y la carta en el móvil. Os escribo porque desarrollamos cartas digitales interactivas y sistemas de reserva propios para restaurantes gourmet (con maridajes de vino y carta en varios idiomas sin formato PDF). ¿Con quién podría hablar un momento para enseñaros un demo rápido en el móvil?`;
    
    instagramHook = `Hola, buenas. Estaba viendo vuestra web y la carta en el móvil. Os escribo porque desarrollamos cartas digitales interactivas multi-idioma y sistemas de reserva propios sin comisiones para restaurantes. ¿Con quién puedo hablar para enviaros un ejemplo rápido?`;
    
    emailSubject = `Carta interactiva y sistema de reservas para ${lead.restaurantName}`;
    emailBody = `Hola equipo de ${lead.restaurantName},\n\n` +
      `He estado revisando vuestra página web y la presentación de la carta desde el teléfono móvil.\n\n` +
      `Os escribo directamente porque desarrollamos ecosistemas digitales nativos para restaurantes que mejoran la experiencia del comensal y optimizan la rentabilidad del local:\n` +
      `1. Instalamos un motor de reservas propio sin comisiones por cubierto, integrado directamente en vuestra web y redes sociales.\n` +
      `2. Sustituimos el formato PDF por una carta digital interactiva multi-idioma que carga al instante, con fotografías de alta definición y sugerencias automáticas de maridaje de vinos y sugerencias del chef.\n\n` +
      `Podéis ver una demostración rápida de 45 segundos de cómo funciona en el móvil aquí:\n` +
      `👉 https://hosteleria.architectsys.com/hub\n\n` +
      `¿Con quién podría agendar una llamada rápida de 5 minutos esta semana para comentarlo?\n\n` +
      `Un saludo,\n` +
      `Alex\n` +
      `Architect.Sys Hospitality`;
  }

  lead.outreachCopy = {
    whatsappHook,
    instagramHook,
    emailSubject,
    emailBody
  };
  lead.status = 'ANALYZED';

  return lead;
}

export async function generateOutreachForBatch(leads: Lead[]): Promise<Lead[]> {
  const analyzedLeads: Lead[] = [];
  for (const lead of leads) {
    const updated = await generateOutreachForLead(lead);
    analyzedLeads.push(updated);
  }
  return analyzedLeads;
}

/**
 * Alias de compatibilidad para la ruta API de Telegram / Webhook
 */
export async function generateOutreachPack(lead: Lead): Promise<Lead['outreachCopy']> {
  const updated = await generateOutreachForLead(lead);
  return updated.outreachCopy;
}
