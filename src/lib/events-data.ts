export interface EventDossier {
  id: string;
  title: string;
  category: string;
  description: string;
  targetAudience: string;
  preparationTime: string;
  clientRole: string[];
  agencyRole: string[];
  deliverables: string[];
  preEventProtocol: string;
  isUnlockedForBase: boolean;
  imagePlaceholder?: string;
}

export const eventsLibrary: EventDossier[] = [
  {
    id: "cata-guiada",
    title: "Cata Guiada Especial",
    category: "Catas Guiadas",
    description: "Una experiencia inmersiva para los amantes de los detalles. Organiza una cata de cervezas artesanales, vinos selectos, aceites o quesos, acompañada de un sommelier o experto que guíe a los clientes.",
    targetAudience: "Parejas, grupos de amigos, foodies, y clientes que buscan experiencias de valor.",
    preparationTime: "2-3 Semanas",
    clientRole: [
      "Fijar fecha de baja afluencia (martes/miércoles noche).",
      "Seleccionar el producto a catar con proveedores locales.",
      "Asegurar el stock y disponer la sala/mesas."
    ],
    agencyRole: [
      "Configuración de la campaña de Ads geolocalizada a 5km.",
      "Creación de la landing page de venta de tickets anticipados.",
      "Automatización de recordatorios por WhatsApp a los inscritos."
    ],
    deliverables: [
      "Embudo de Venta de Tickets (Landing + Pasarela de Pago)",
      "Creatividades para Ads (Imágenes/Textos)",
      "Guión de ventas para el personal de sala"
    ],
    preEventProtocol: "Reunión de 30 mins para definir precios, aforo máximo y producto central. Nosotros conectamos la pasarela de pago 24h después.",
    isUnlockedForBase: true
  },
  {
    id: "maridaje-exclusivo",
    title: "Noche de Maridaje Exclusivo",
    category: "Maridajes Exclusivos",
    description: "Una cena degustación de varios pases donde cada plato está diseñado para complementar una bebida específica (vinos, licores, o cócteles de autor). Ideal para posicionar tu local en un segmento premium.",
    targetAudience: "Clientes dispuestos a pagar un ticket alto por experiencias gastronómicas completas.",
    preparationTime: "3-4 Semanas",
    clientRole: [
      "Diseño de menú cerrado (4-6 pases).",
      "Formación extra al personal de sala sobre los platos y vinos."
    ],
    agencyRole: [
      "Campañas de retargeting a clientes previos.",
      "Diseño estético de la minuta premium digital e impresa."
    ],
    deliverables: [
      "Sistema de Reservas Exclusivo (Pago por adelantado)",
      "Campaña de Google Ads ('Cenas exclusivas')",
      "Minuta digital interactiva"
    ],
    preEventProtocol: "Validación del menú y maridaje con el chef. Definición del ticket medio objetivo y el margen de beneficio por cubierto.",
    isUnlockedForBase: false
  },
  {
    id: "musica-directo",
    title: "Veladas de Música en Directo",
    category: "Eventos Musicales",
    description: "Transforma tu local con sesiones de jazz, acústicos o bandas en directo. Aumenta la duración de la estancia y el consumo de bebidas/copas de sobremesa.",
    targetAudience: "Público general, grupos, y clientes que buscan ocio nocturno relajado.",
    preparationTime: "1-2 Semanas",
    clientRole: [
      "Contratar artistas (agencias locales o contacto directo).",
      "Preparar espacio y acústica (evitar molestar mesas cercanas)."
    ],
    agencyRole: [
      "Promoción orgánica intensa en Instagram 1 semana antes.",
      "Campaña Meta Ads de 'Ocio y entretenimiento' con vídeos del grupo."
    ],
    deliverables: [
      "Campaña publicitaria hiper-local",
      "Cartelería digital",
      "Base de datos de leads interesados en música en directo"
    ],
    preEventProtocol: "Verificación de licencias de música en directo y configuración de la fecha límite de promoción.",
    isUnlockedForBase: false
  },
  {
    id: "espectaculo-flamenco",
    title: "Cena y Espectáculo Flamenco",
    category: "Espectáculo Flamenco",
    description: "Combina la fuerza del arte flamenco en vivo con una cena de tapas o raciones tradicionales. Un imán para turismo y celebraciones especiales.",
    targetAudience: "Turistas, celebraciones de empresa, y residentes buscando cultura y gastronomía.",
    preparationTime: "3 Semanas",
    clientRole: [
      "Contratación de cuadro flamenco.",
      "Adaptación del salón (escenario/tablao visible para todos)."
    ],
    agencyRole: [
      "Campañas orientadas a turistas (Google Ads por ubicación).",
      "Activación de Ads mostrando vídeos impactantes del baile/cante."
    ],
    deliverables: [
      "Landing page multi-idioma para turistas",
      "Sistema de reservas con depósito previo",
      "Guión de remarketing por WhatsApp"
    ],
    preEventProtocol: "Definir menú cerrado rápido (tapas frías) para no interrumpir el espectáculo. Revisión de aforo y visibilidad.",
    isUnlockedForBase: false
  },
  {
    id: "noches-comedia",
    title: "Noches de Comedia / Monólogos",
    category: "Noches de Comedia",
    description: "Llena tu local los días más flojos (lunes a miércoles) ofreciendo un escenario a monologuistas locales o reconocidos. Risas, cervezas y comida rápida de calidad.",
    targetAudience: "Jóvenes y adultos jóvenes (18-40 años), grupos de amigos.",
    preparationTime: "2 Semanas",
    clientRole: [
      "Contratar monologuista y adecuar micrófono/sonido.",
      "Diseñar promoción 'Combo' (Entrada + Consumición + Plato)."
    ],
    agencyRole: [
      "Anuncios en TikTok e Instagram Reels usando clips graciosos del comediante.",
      "Automatización de reservas vía DM de Instagram."
    ],
    deliverables: [
      "Bot de reservas integrado en Instagram/WhatsApp",
      "Creatividades de alto impacto en formato Reel",
      "Seguimiento automatizado post-evento"
    ],
    preEventProtocol: "Definir la oferta gastronómica 'rápida' para la noche. Setup del Bot de reservas asociado a la palabra clave 'RISAS'.",
    isUnlockedForBase: false
  },
  {
    id: "trivia-interactiva",
    title: "Noche de Trivia Interactiva",
    category: "Juegos / Trivia",
    description: "Gamifica la experiencia. Los clientes compiten por mesas en un juego de preguntas y respuestas usando sus móviles, con premios (descuentos, rondas gratis) para los ganadores.",
    targetAudience: "Millennials, Gen Z, grupos de amigos y afterworks.",
    preparationTime: "1 Semana",
    clientRole: [
      "Suscripción a plataforma de Trivia (Kahoot u otras).",
      "Pantallas/proyectores visibles en todo el local y definir premio."
    ],
    agencyRole: [
      "Campañas de captación mostrando el lado lúdico.",
      "Gestión de inscripciones de equipos."
    ],
    deliverables: [
      "Landing de inscripción por equipos",
      "Estrategia de retención (descuentos para la próxima semana)",
      "Campaña Ads 'Jueves Universitarios/Afterwork'"
    ],
    preEventProtocol: "Designación del presentador o animador del local. Setup del formulario de inscripción para capturar nombres de equipos.",
    isUnlockedForBase: false
  },
  {
    id: "speed-dating",
    title: "Speed Dating & Mixology",
    category: "Citas Rápidas",
    description: "Organiza un evento de citas rápidas estructurado, por rangos de edad, acompañado de cócteles o picoteo. Excelente para atraer gente nueva a tu bar o restaurante.",
    targetAudience: "Solteros (segmentados por edad, ej. 25-35, 35-45).",
    preparationTime: "3 Semanas",
    clientRole: [
      "Organización del espacio (mesas para 2, numeradas).",
      "Cronómetro y dinámica de rotación."
    ],
    agencyRole: [
      "Meta Ads altamente segmentados por estado civil y edad.",
      "Balanceo y filtro de perfiles en la base de datos."
    ],
    deliverables: [
      "Formulario de cualificación avanzado",
      "Sistema automatizado de Matching y notificaciones",
      "Campañas publicitarias ultrasegmentadas"
    ],
    preEventProtocol: "Definición del filtro de perfiles, diseño del cóctel de bienvenida y reglas de privacidad.",
    isUnlockedForBase: false
  }
];
