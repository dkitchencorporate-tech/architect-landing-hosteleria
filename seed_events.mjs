import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase URL or Service Key");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

const events = [
  {
    id: 'cata-guiada',
    title: 'Cata Guiada Especial',
    category: 'Catas Guiadas',
    description: 'Una experiencia inmersiva para los amantes de los detalles. Organiza una cata de cervezas artesanales, vinos selectos, aceites o quesos, acompañada de un sommelier o experto que guíe a los clientes.',
    target_audience: 'Parejas, grupos de amigos, foodies, y clientes que buscan experiencias de valor.',
    preparation_time: '2-3 Semanas',
    client_role: ["Fijar fecha de baja afluencia (martes/miércoles noche).", "Seleccionar el producto a catar con proveedores locales.", "Asegurar el stock y disponer la sala/mesas."],
    agency_role: ["Configuración de la campaña de Ads geolocalizada a 5km.", "Creación de la landing page de venta de tickets anticipados.", "Automatización de recordatorios por WhatsApp a los inscritos."],
    deliverables: ["Embudo de Venta de Tickets (Landing + Pasarela de Pago)", "Creatividades para Ads (Imágenes/Textos)", "Guión de ventas para el personal de sala"],
    pre_event_protocol: 'Reunión de 30 mins para definir precios, aforo máximo y producto central. Nosotros conectamos la pasarela de pago 24h después.',
    is_unlocked_for_base: true
  },
  {
    id: 'maridaje-exclusivo',
    title: 'Noche de Maridaje Exclusivo',
    category: 'Maridajes Exclusivos',
    description: 'Una cena degustación de varios pases donde cada plato está diseñado para complementar una bebida específica (vinos, licores, o cócteles de autor). Ideal para posicionar tu local en un segmento premium.',
    target_audience: 'Clientes dispuestos a pagar un ticket alto por experiencias gastronómicas completas.',
    preparation_time: '3-4 Semanas',
    client_role: ["Diseño de menú cerrado (4-6 pases).", "Formación extra al personal de sala sobre los platos y vinos."],
    agency_role: ["Campañas de retargeting a clientes previos.", "Diseño estético de la minuta premium digital e impresa."],
    deliverables: ["Sistema de Reservas Exclusivo (Pago por adelantado)", "Campaña de Google Ads ('Cenas exclusivas')", "Minuta digital interactiva"],
    pre_event_protocol: 'Validación del menú y maridaje con el chef. Definición del ticket medio objetivo y el margen de beneficio por cubierto.',
    is_unlocked_for_base: false
  },
  {
    id: 'musica-directo',
    title: 'Veladas de Música en Directo',
    category: 'Eventos Musicales',
    description: 'Transforma tu local con sesiones de jazz, acústicos o bandas en directo. Aumenta la duración de la estancia y el consumo de bebidas/copas de sobremesa.',
    target_audience: 'Público general, grupos, y clientes que buscan ocio nocturno relajado.',
    preparation_time: '1-2 Semanas',
    client_role: ["Contratar artistas (agencias locales o contacto directo).", "Preparar espacio y acústica (evitar molestar mesas cercanas)."],
    agency_role: ["Promoción orgánica intensa en Instagram 1 semana antes.", "Campaña Meta Ads de 'Ocio y entretenimiento' con vídeos del grupo."],
    deliverables: ["Campaña publicitaria hiper-local", "Cartelería digital", "Base de datos de leads interesados en música en directo"],
    pre_event_protocol: 'Verificación de licencias de música en directo y configuración de la fecha límite de promoción.',
    is_unlocked_for_base: false
  },
  {
    id: 'espectaculo-flamenco',
    title: 'Cena y Espectáculo Flamenco',
    category: 'Espectáculo Flamenco',
    description: 'Combina la fuerza del arte flamenco en vivo con una cena de tapas o raciones tradicionales. Un imán para turismo y celebraciones especiales.',
    target_audience: 'Turistas, celebraciones de empresa, y residentes buscando cultura y gastronomía.',
    preparation_time: '3 Semanas',
    client_role: ["Contratación de cuadro flamenco.", "Adaptación del salón (escenario/tablao visible para todos)."],
    agency_role: ["Campañas orientadas a turistas (Google Ads por ubicación).", "Activación de Ads mostrando vídeos impactantes del baile/cante."],
    deliverables: ["Landing page multi-idioma para turistas", "Sistema de reservas con depósito previo", "Guión de remarketing por WhatsApp"],
    pre_event_protocol: 'Definir menú cerrado rápido (tapas frías) para no interrumpir el espectáculo. Revisión de aforo y visibilidad.',
    is_unlocked_for_base: false
  },
  {
    id: 'noches-comedia',
    title: 'Noches de Comedia / Monólogos',
    category: 'Noches de Comedia',
    description: 'Llena tu local los días más flojos (lunes a miércoles) ofreciendo un escenario a monologuistas locales o reconocidos. Risas, cervezas y comida rápida de calidad.',
    target_audience: 'Jóvenes y adultos jóvenes (18-40 años), grupos de amigos.',
    preparation_time: '2 Semanas',
    client_role: ["Contratar monologuista y adecuar micrófono/sonido.", "Diseñar promoción 'Combo' (Entrada + Consumición + Plato)."],
    agency_role: ["Anuncios en TikTok e Instagram Reels usando clips graciosos del comediante.", "Automatización de reservas vía DM de Instagram."],
    deliverables: ["Bot de reservas integrado en Instagram/WhatsApp", "Creatividades de alto impacto en formato Reel", "Seguimiento automatizado post-evento"],
    pre_event_protocol: 'Definir la oferta gastronómica rápida para la noche. Setup del Bot de reservas asociado a la palabra clave RISAS.',
    is_unlocked_for_base: false
  },
  {
    id: 'trivia-interactiva',
    title: 'Noche de Trivia Interactiva',
    category: 'Juegos / Trivia',
    description: 'Gamifica la experiencia. Los clientes compiten por mesas en un juego de preguntas y respuestas usando sus móviles, con premios (descuentos, rondas gratis) para los ganadores.',
    target_audience: 'Millennials, Gen Z, grupos de amigos y afterworks.',
    preparation_time: '1 Semana',
    client_role: ["Suscripción a plataforma de Trivia (Kahoot u otras).", "Pantallas/proyectores visibles en todo el local y definir premio."],
    agency_role: ["Campañas de captación mostrando el lado lúdico.", "Gestión de inscripciones de equipos."],
    deliverables: ["Landing de inscripción por equipos", "Estrategia de retención (descuentos para la próxima semana)", "Campaña Ads 'Jueves Universitarios/Afterwork'"],
    pre_event_protocol: 'Designación del presentador o animador del local. Setup del formulario de inscripción para capturar nombres de equipos.',
    is_unlocked_for_base: false
  },
  {
    id: 'speed-dating',
    title: 'Speed Dating & Mixology',
    category: 'Citas Rápidas',
    description: 'Organiza un evento de citas rápidas estructurado, por rangos de edad, acompañado de cócteles o picoteo. Excelente para atraer gente nueva a tu bar o restaurante.',
    target_audience: 'Solteros (segmentados por edad, ej. 25-35, 35-45).',
    preparation_time: '3 Semanas',
    client_role: ["Organización del espacio (mesas para 2, numeradas).", "Cronómetro y dinámica de rotación."],
    agency_role: ["Meta Ads altamente segmentados por estado civil y edad.", "Balanceo y filtro de perfiles en la base de datos."],
    deliverables: ["Formulario de cualificación avanzado", "Sistema automatizado de Matching y notificaciones", "Campañas publicitarias ultrasegmentadas"],
    pre_event_protocol: 'Definición del filtro de perfiles, diseño del cóctel de bienvenida y reglas de privacidad.',
    is_unlocked_for_base: false
  }
];

async function seed() {
  console.log("Seeding master_events...");
  const { data, error } = await supabase.from('master_events').upsert(events, { onConflict: 'id' });
  
  if (error) {
    console.error("Error seeding events:", error);
  } else {
    console.log("Successfully seeded", events.length, "events!");
  }
}

seed();
