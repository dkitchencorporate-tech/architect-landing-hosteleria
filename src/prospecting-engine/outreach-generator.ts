import { Lead } from './types';
import { SYSTEM_PROMPT_COPYWRITER, ARCHITECT_SYS_KNOWLEDGE_BASE } from './knowledge-base';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * AI OUTREACH COPYWRITER
 * Generates humanized, consultative sales hooks (WhatsApp, IG, Email) for each lead.
 * Uses Gemini API if available, with a state-of-the-art consultative template fallback.
 */

export async function generateOutreachForLead(lead: Lead): Promise<Lead> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const modelName = process.env.GEMINI_MODEL || 'gemini-3.0-pro';
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
      Analiza los datos de este restaurante y genera los 3 ganchos de prospección:
      - Nombre: ${lead.restaurantName}
      - Ciudad: ${lead.city}
      - Modelo de Negocio: ${lead.businessModel}
      - Calificación Google: ${lead.googleRating}⭐ (${lead.reviewCount} reseñas)
      - ¿Tiene carta PDF?: ${lead.hasPdfMenu ? 'SÍ (Pierde ventas visuales)' : 'NO'}
      - ¿Usa El Tenedor?: ${lead.usesElTenedor ? 'SÍ (Paga comisiones del 12-15%)' : 'NO'}
      - Fuga de margen mensual estimada: ${lead.estimatedLostMarginMonthly.toLocaleString('es-ES')} €/mes
      - Resumen Diagnóstico: ${lead.diagnosticSummary}

      RECUERDA: El mensaje de WhatsApp debe ser sin enlaces, corto, educado, empático con el dueño y terminar en una pregunta para abrir la conversación.
      `;

      const result = await model.generateContent([
        { text: SYSTEM_PROMPT_COPYWRITER },
        { text: prompt }
      ]);

      const responseText = result.response.text();
      // Limpiar markdown si el modelo envolvió en ```json
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
      console.warn(`[AI Copywriter] Fallback para lead ${lead.restaurantName} debido a error o cuota:`, error);
    }
  }

  // FALLBACK CONSULTIVO DE ALTO NIVEL (Humanizado y testeado en conversión)
  const lostMarginFormatted = lead.estimatedLostMarginMonthly.toLocaleString('es-ES');
  
  // Hook de WhatsApp: Corto, directo, SIN enlaces, diseñado para que Alex lo envíe a mano
  const whatsappHook = `Hola equipo de ${lead.restaurantName}, qué tal. Enhorabuena por ese ${lead.googleRating}⭐ en Google en ${lead.city}. Hemos estado auditando vuestro canal operativo y calculamos una pérdida silenciosa de ~${lostMarginFormatted}€/mes en comisiones e interacciones de carta. ¿Tenéis 1 minuto esta tarde para comentar un detalle técnico de cocina que os ayudaría a subir un 25% el ticket por mesa?`;

  // Hook de Instagram DM: Corto y visual
  const instagramHook = `¡Hola! Gran trabajo con la cocina en ${lead.city} 🍽️. Auditando vuestra carta vimos una fuga de margen de aprox. ${lostMarginFormatted}€/mes por dependencia de terceros y formato PDF. Hemos preparado un informe técnico para eliminar comisiones y subir el ticket un 25%. ¿Os lo pasamos por aquí?`;

  // Email de Prospección VIP
  const emailSubject = `Auditoría operativa y fuga de margen en ${lead.restaurantName}`;
  const emailBody = `Hola equipo directivo de ${lead.restaurantName},\n\n` +
    `Seguimos muy de cerca la alta gastronomía en ${lead.city} y queremos felicitarles por la excelente valoración de ${lead.googleRating}⭐ que mantienen con más de ${lead.reviewCount} comensales. Eso demuestra un nivel de cocina sobresaliente.\n\n` +
    `Sin embargo, al realizar nuestra auditoría técnica externa sobre sus canales de pedido y reserva, hemos identificado dos cuellos de botella operativos que están comprimiendo sus beneficios:\n` +
    `1. ${lead.usesElTenedor ? 'Dependencia de motores de reserva de terceros (El Tenedor), lo que supone un coste oculto del 12% al 15% por comensal.' : 'Canal de reserva digital con potencial de automatización.'}\n` +
    `2. ${lead.hasPdfMenu ? 'Uso de carta en formato PDF descargable. Según estudios de neurociencia visual en hostelería, un plato en PDF vende un 40% menos que en una interfaz PWA retina.' : 'Oportunidad de integrar venta cruzada algorítmica para vinos y guarniciones.'}\n\n` +
    `En total, estimamos una fuga de margen mensual de aproximadamente **${lostMarginFormatted} €/mes** que podrían estar reteniendo en su EBITDA directo.\n\n` +
    `En **Architect.Sys** instalamos ecosistemas PWA + KDS (Sincronización Cocina-Sala en 0.2s) que eliminan el 100% de las comisiones y aumentan un 25% el gasto medio por mesa mediante Inteligencia Artificial de venta cruzada.\n\n` +
    `Hemos preparado un test diagnóstico interactivo de 45 segundos exclusivo para la alta dirección en nuestro Hub VIP:\n` +
    `👉 **https://hosteleria.architectsys.com/hub**\n\n` +
    `¿Les gustaría que revisemos los números y la simulación en una breve reunión por videoconferencia esta semana?\n\n` +
    `Atentamente,\n` +
    `**Alex - Arquitecto Principal y Consultor Gastronómico**\n` +
    `Architect.Sys Hospitality Systems`;

  lead.outreachCopy = {
    whatsappHook,
    instagramHook,
    emailSubject,
    emailBody
  };
  lead.status = 'ANALYZED';

  return lead;
}

/**
 * Procesa un lote de leads para generar su copy de prospección.
 */
export async function generateOutreachForBatch(leads: Lead[]): Promise<Lead[]> {
  const analyzedLeads: Lead[] = [];
  for (const lead of leads) {
    const updated = await generateOutreachForLead(lead);
    analyzedLeads.push(updated);
  }
  return analyzedLeads;
}
