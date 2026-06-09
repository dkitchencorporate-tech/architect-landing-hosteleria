export interface EventDossier {
  id: string;
  title: string;
  category: string;
  description: string;
  targetAudience: string;
  preparationTime: string;
  kpis: string[];
  logistics: string[];
  adsStrategy: string;
  isUnlockedForBase: boolean;
  imagePlaceholder?: string; // e.g. standard descriptive string if no image available
}

export const eventsLibrary: EventDossier[] = [
  {
    id: "cata-guiada",
    title: "Cata Guiada Especial",
    category: "Catas Guiadas",
    description: "Una experiencia inmersiva para los amantes de los detalles. Organiza una cata de cervezas artesanales, vinos selectos, aceites o quesos, acompañada de un sommelier o experto que guíe a los clientes.",
    targetAudience: "Parejas, grupos de amigos, foodies, y clientes que buscan experiencias de valor.",
    preparationTime: "2-3 Semanas",
    kpis: [
      "Venta de tickets anticipados (Aforo controlado)",
      "Ticket medio de la cata",
      "Conversión de asistentes a clientes recurrentes"
    ],
    logistics: [
      "Contactar proveedor para precios especiales de producto a catar",
      "Seleccionar fecha de baja afluencia (ej. martes/miércoles noche)",
      "Preparar material de cata (fichas, copas, mantel individual)",
      "Contratar o designar a un experto/comunicador"
    ],
    adsStrategy: "Campaña de Meta Ads geolocalizada a 5km a la redonda, dirigida a intereses como 'Gastronomía', 'Vinos' o 'Experiencias'. Uso de vídeos cortos (Reels/TikTok) del experto explicando lo que se va a probar.",
    isUnlockedForBase: true // El evento de regalo para Plan Base
  },
  {
    id: "maridaje-exclusivo",
    title: "Noche de Maridaje Exclusivo",
    category: "Maridajes Exclusivos",
    description: "Una cena degustación de varios pases donde cada plato está diseñado para complementar una bebida específica (vinos, licores, o cócteles de autor). Ideal para posicionar tu local en un segmento premium.",
    targetAudience: "Clientes dispuestos a pagar un ticket alto por experiencias gastronómicas completas.",
    preparationTime: "3-4 Semanas",
    kpis: [
      "Ingreso total por evento (Alto ticket)",
      "Menciones en redes sociales (UGC)",
      "Beneficio por asiento ocupado"
    ],
    logistics: [
      "Diseño de menú cerrado (4-6 pases)",
      "Selección de maridaje con proveedor",
      "Impresión de minutas premium",
      "Formación extra al personal de sala sobre los platos y vinos"
    ],
    adsStrategy: "Campañas de retargeting a clientes previos + campañas de búsqueda (Google Ads) para 'cenas exclusivas' o 'menú degustación'. Imágenes de muy alta calidad y estética dark/premium.",
    isUnlockedForBase: false
  },
  {
    id: "musica-directo",
    title: "Veladas de Música en Directo",
    category: "Eventos Musicales",
    description: "Transforma tu local con sesiones de jazz, acústicos o bandas en directo. Aumenta la duración de la estancia y el consumo de bebidas/copas de sobremesa.",
    targetAudience: "Público general, grupos, y clientes que buscan ocio nocturno relajado.",
    preparationTime: "1-2 Semanas",
    kpis: [
      "Aumento de facturación en barra/bebidas",
      "Tiempo de permanencia del cliente",
      "Afluencia total vs día normal"
    ],
    logistics: [
      "Obtener/verificar licencias de música en directo",
      "Contratar artistas (agencias locales o contacto directo)",
      "Preparar espacio y acústica (evitar molestar mesas cercanas si es cena)",
      "Menú de bebidas especiales/cócteles"
    ],
    adsStrategy: "Promoción orgánica intensa en Instagram 1 semana antes. Ads en Meta enfocados en 'Ocio y entretenimiento' con vídeos del grupo tocando en directo.",
    isUnlockedForBase: false
  },
  {
    id: "espectaculo-flamenco",
    title: "Cena y Espectáculo Flamenco",
    category: "Espectáculo Flamenco",
    description: "Combina la fuerza del arte flamenco en vivo con una cena de tapas o raciones tradicionales. Un imán para turismo y celebraciones especiales.",
    targetAudience: "Turistas, celebraciones de empresa, y residentes buscando cultura y gastronomía.",
    preparationTime: "3 Semanas",
    kpis: [
      "Venta de paquetes (Cena + Espectáculo)",
      "Reseñas en TripAdvisor/Google",
      "Porcentaje de ocupación del local"
    ],
    logistics: [
      "Contratación de cuadro flamenco (cante, toque y baile si el espacio lo permite)",
      "Adaptación del salón (escenario/tablao visible para todos)",
      "Menú cerrado o de raciones fáciles de servir durante el show",
      "Gestión estricta de reservas"
    ],
    adsStrategy: "Campañas orientadas a turistas (TripAdvisor, Google Ads por ubicación) y Meta Ads mostrando vídeos impactantes del baile/cante.",
    isUnlockedForBase: false
  },
  {
    id: "noches-comedia",
    title: "Noches de Comedia / Monólogos",
    category: "Noches de Comedia",
    description: "Llena tu local los días más flojos (lunes a miércoles) ofreciendo un escenario a monologuistas locales o reconocidos. Risas, cervezas y comida rápida de calidad.",
    targetAudience: "Jóvenes y adultos jóvenes (18-40 años), grupos de amigos.",
    preparationTime: "2 Semanas",
    kpis: [
      "Venta de entradas (si aplica) o cubiertos",
      "Consumo promedio por persona",
      "Retorno de inversión del comediante"
    ],
    logistics: [
      "Contratar monologuista",
      "Adecuar iluminación y sonido (micrófono y altavoces indispensables)",
      "Promoción 'Combo' (Entrada + Consumición + Plato)",
      "Disposición del local estilo 'teatro' o mesas compartidas"
    ],
    adsStrategy: "Anuncios en TikTok e Instagram Reels usando clips graciosos del comediante. Llamado a la acción directo: 'Sal de la rutina este martes'.",
    isUnlockedForBase: false
  },
  {
    id: "trivia-interactiva",
    title: "Noche de Trivia Interactiva",
    category: "Juegos / Trivia",
    description: "Gamifica la experiencia. Los clientes compiten por mesas en un juego de preguntas y respuestas usando sus móviles, con premios (descuentos, rondas gratis) para los ganadores.",
    targetAudience: "Millennials, Gen Z, grupos de amigos y afterworks.",
    preparationTime: "1 Semana",
    kpis: [
      "Número de equipos inscritos",
      "Venta de comida para compartir (raciones, pizzas, burgers)",
      "Fidelización (repetidores semanales)"
    ],
    logistics: [
      "Suscripción a plataforma de Trivia (Kahoot u otras)",
      "Pantallas/proyectores visibles en todo el local",
      "Definir premios atractivos",
      "Un 'Host' o presentador animado (puede ser un empleado con carisma)"
    ],
    adsStrategy: "Campañas en Instagram/TikTok mostrando a gente divirtiéndose y compitiendo. Promocionar el premio como gancho principal.",
    isUnlockedForBase: false
  },
  {
    id: "speed-dating",
    title: "Speed Dating & Mixology",
    category: "Citas Rápidas",
    description: "Organiza un evento de citas rápidas estructurado, por rangos de edad, acompañado de cócteles o picoteo. Excelente para atraer gente nueva a tu bar o restaurante.",
    targetAudience: "Solteros (segmentados por edad, ej. 25-35, 35-45).",
    preparationTime: "3 Semanas",
    kpis: [
      "Balance de inscripciones (ratio equitativo de participantes)",
      "Venta de cócteles/bebidas post-evento",
      "Captación de nuevos clientes"
    ],
    logistics: [
      "Formulario de inscripción estricto para balancear perfiles",
      "Organización del espacio (mesas para 2, numeradas)",
      "Cronómetro y campana/señal para rotación (ej. cada 5-7 mins)",
      "Tarjetas de 'Match' para que los clientes anoten quién les gustó"
    ],
    adsStrategy: "Meta Ads altamente segmentados por estado civil y edad. Mensajes sutiles y elegantes ('Conoce gente nueva de forma divertida en un ambiente seguro').",
    isUnlockedForBase: false
  }
];
