import { Lead } from './types';
import { SYSTEM_PROMPT_COPYWRITER } from './knowledge-base';
import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * AI OUTREACH COPYWRITER (ULTRA-HUMANIZED & CONSULTATIVE)
 * Genera ganchos de prospección aplicando psicología de ventas de alto nivel (Sandler / Chris Voss).
 * CERO alarmismo financiero, CERO adulación extrema, CERO fricción de entrada.
 */

export async function generateOutreachForLead(lead: Lead): Promise<Lead> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const modelName = process.env.GEMINI_MODEL || 'gemini-3.0-pro';
      const model = genAI.getGenerativeModel({ model: modelName });

      const prompt = `
      Analiza los datos de este local y genera los 3 ganchos de prospección hiper-humanizada:
      - Nombre: ${lead.restaurantName}
      - Ciudad: ${lead.city}
      - Modelo de Negocio: ${lead.businessModel}
      - Calificación Google: ${lead.googleRating}⭐ (${lead.reviewCount} reseñas)
      - ¿Tiene carta PDF?: ${lead.hasPdfMenu ? 'SÍ' : 'NO'}
      - ¿Usa El Tenedor?: ${lead.usesElTenedor ? 'SÍ' : 'NO'}

      REGLAS DE ORO:
      1. NO pongas ninguna cifra de dinero o pérdida financiera en los mensajes.
      2. NO pongas halagos exagerados ni "enhorabuena por vuestra nota".
      3. Aplica el bypass del recepcionista: haz una pregunta sencilla de compañerismo pidiendo dirección hacia el responsable de sala o carta digital.
      4. En WhatsApp y DM de Instagram: ESTRICTAMENTE 0 ENLACES.
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
      console.warn(`[AI Copywriter] Fallback consultivo para ${lead.restaurantName}:`, error);
    }
  }

  // FALLBACK CONSULTIVO DE ELITE (Humanizado, sin fricción, sin alarmismo ni adulación)
  let whatsappHook = '';
  let instagramHook = '';
  let emailSubject = '';
  let emailBody = '';

  // Segmentación por nivel/estilo de negocio (Tiering)
  if (lead.businessModel === 'Alta Cocina / Gourmet' || lead.businessModel === 'Grupo Hostélero / Multi-local') {
    // Tier 1: Alta Gastronomía / Grupos (Enfoque en experiencia de sala, maridaje y elegancia visual)
    whatsappHook = `Hola equipo de ${lead.restaurantName}, buenas tardes. Os escribo una consulta rápida de operativa y sala. Al revisar vuestra carta en web tenía una pregunta técnica sobre la presentación visual de maridajes y sugerencias fuera de carta en mesa. ¿Quién suele llevar la gestión del menú digital en el restaurante?`;
    
    instagramHook = `Hola equipo, buenas tardes. Una duda rápida de sala: al revisar el menú en web teníamos una consulta técnica sobre la presentación de maridajes y carta en mesa. ¿Con quién podríamos comentarlo 1 minuto?`;
    
    emailSubject = `Consulta operativa de sala en ${lead.restaurantName}`;
    emailBody = `Hola equipo de ${lead.restaurantName},\n\n` +
      `Seguimos con atención vuestro recorrido gastronómico en ${lead.city}. Les escribo brevemente desde el área de ingeniería operativa de Architect.Sys.\n\n` +
      `Al revisar la estructura visual de su carta y la gestión del flujo en sala, nos ha surgido una consulta técnica respecto a cómo están abordando la presentación multi-idioma y la sugerencia de maridajes en mesa para evitar la fricción del formato PDF tradicional.\n\n` +
      `Hemos desarrollado una breve comparativa técnica visual sobre cómo las salas de alta gastronomía están agilizando el pedido sin alterar la atención del personal en nuestro espacio de diagnóstico:\n` +
      `👉 https://hosteleria.architectsys.com/hub\n\n` +
      `¿Quién es la persona responsable de la dirección de sala o innovación para comentarle un detalle en una llamada breve de 5 minutos?\n\n` +
      `Un cordial saludo,\n` +
      `Alex - Consultoría Operativa\n` +
      `Architect.Sys Hospitality`;

  } else if (lead.usesElTenedor) {
    // Tier 2: Restaurante Tradicional / Medio estanding con El Tenedor (Enfoque en fidelización directa)
    whatsappHook = `Hola buenas, qué tal por ${lead.restaurantName}. Os escribo una duda rápida de operativa. He visto vuestro sistema de reservas online y tenía una consulta técnica sobre cómo gestionáis las mesas de clientes habituales sin intermediarios. ¿Con quién podría comentarlo un momento?`;
    
    instagramHook = `Hola equipo, qué tal. Una consulta rápida de operativa: viendo vuestro sistema de reservas en web tenía una duda sobre la gestión de mesas habituales en directo. ¿Quién suele llevar ese tema en el local?`;
    
    emailSubject = `Consulta sobre gestión de reservas en ${lead.restaurantName}`;
    emailBody = `Hola equipo de ${lead.restaurantName},\n\n` +
      `Les escribo una breve consulta técnica de operativa y sala. Seguimos la actividad gastronómica en ${lead.city} y nos ha parecido muy interesante su propuesta.\n\n` +
      `Al revisar sus canales de entrada, notamos el uso intensivo de plataformas de reserva externas. Queríamos consultarles si actualmente disponen de un ecosistema nativo para canalizar a los comensales habituales de forma directa, optimizando la rotación sin coste por cubierto.\n\n` +
      `Hemos preparado un breve diagnóstico interactivo sobre la autonomía en gestión de mesas en nuestro portal técnico:\n` +
      `👉 https://hosteleria.architectsys.com/hub\n\n` +
      `¿Con qué responsable o encargado de sala podríamos cruzar dos ideas en una llamada de 5 minutos esta semana?\n\n` +
      `Un saludo cordialmente,\n` +
      `Alex - Consultoría Operativa\n` +
      `Architect.Sys Hospitality`;

  } else {
    // Tier 3: Bar / Gastrobar / Digitalmente Pobre o PDF (Enfoque en agilidad y carta móvil)
    whatsappHook = `Hola equipo de ${lead.restaurantName}, qué tal. Os escribo una consulta rápida de sala. Al entrar desde el móvil a ver la carta vi el formato actual en PDF y tenía una pregunta técnica sobre cómo gestionáis los cambios diarios de platos y precios en mesa. ¿Quién suele llevar ese tema en el local?`;
    
    instagramHook = `Hola equipo, qué tal por el local. Una pregunta rápida de sala: al abrir la carta en el móvil vimos el formato actual y teníamos una duda técnica sobre la actualización de platos del día en mesa. ¿Quién lleva ese tema?`;
    
    emailSubject = `Consulta técnica sobre menú digital en ${lead.restaurantName}`;
    emailBody = `Hola equipo de ${lead.restaurantName},\n\n` +
      `Les escribo una breve nota entre profesionales del sector en ${lead.city}. Al consultar su carta desde el teléfono móvil, notamos el uso del formato PDF tradicional.\n\n` +
      `Como saben, en el servicio diario de sala, tener que recargar documentos pesados o reimprimir códigos QR cuando cambia un precio o se agota un plato suele generar tiempos muertos para el camarero y el cliente.\n\n` +
      `En Architect.Sys implementamos interfaces visuales instantáneas que permiten al equipo de cocina ocultar un plato agotado en 1 segundo y mostrar fotografía real de cada recomendación en el móvil del cliente sin comisiones.\n\n` +
      `Pueden ver una muestra de cómo funciona esta agilidad en sala en nuestro espacio interactivo:\n` +
      `👉 https://hosteleria.architectsys.com/hub\n\n` +
      `¿Quién es el encargado de sala o gerente con el que podríamos comentarlo brevemente?\n\n` +
      `Saludos cordiales,\n` +
      `Alex - Consultoría Operativa\n` +
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
