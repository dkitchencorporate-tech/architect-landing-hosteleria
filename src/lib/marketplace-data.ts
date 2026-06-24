export interface MarketplaceService {
  id: string;
  title: string;
  category: string;
  shortDescription: string;
  features: string[];
  priceEst: string;
  roiEst: string;
  iconType: "whatsapp" | "ads" | "content" | "audit";
  deliverables?: {
    contract: string;
    proposal: string;
    dossier: string;
  };
}

export const marketplaceServices: MarketplaceService[] = [
  {
    id: "ads-management",
    title: "Gestión Avanzada de Meta Ads",
    category: "Tráfico y Captación",
    shortDescription: "Llenamos tus mesas los días flojos. Creamos, gestionamos y optimizamos campañas publicitarias hiper-locales.",
    features: [
      "Creación de creatividades (Imágenes/Textos)",
      "Segmentación hiper-local (1-5km)",
      "Retargeting a visitantes de tu web",
      "Reporte mensual de ROAS (Retorno de inversión)"
    ],
    priceEst: "Desde 299€/mes + Inversión",
    roiEst: "Atraer entre 50 y 200 nuevos clientes mensuales.",
    iconType: "ads",
    deliverables: {
      contract: "Gestión de campaña en ecosistema Meta (Instagram/Facebook)",
      proposal: "Diseño de 3 ángulos creativos y segmentación de alcance",
      dossier: "Dashboards en tiempo real y optimización de presupuesto"
    }
  },
  {
    id: "content-creation",
    title: "Community Manager & Creador UGC",
    category: "Branding",
    shortDescription: "Grabación de vídeos cortos formato TikTok/Reels en tu local, editados con ganchos virales para disparar tu alcance orgánico.",
    features: [
      "1 Sesión de grabación mensual (2-3 horas)",
      "Edición de 8-12 vídeos cortos (Reels/TikTok)",
      "Planificación y publicación estratégica",
      "Interacción con tu comunidad"
    ],
    priceEst: "Desde 350€/mes",
    roiEst: "Aumento drástico del alcance local y posicionamiento de marca.",
    iconType: "content",
    deliverables: {
      contract: "1 Grabación mensual y entrega de 12 Reels",
      proposal: "Estrategia de ganchos visuales y guiones TikTok",
      dossier: "Calendario editorial y gestión de la comunidad"
    }
  },
  {
    id: "business-audit",
    title: "Auditoría Operativa y de Rentabilidad",
    category: "Consultoría",
    shortDescription: "Analizamos tus números y operaciones para maximizar el beneficio. Detectamos fugas de capital ocultas en el servicio diario.",
    features: [
      "Análisis de capacidad productiva",
      "Revisión de turnos y cuellos de botella",
      "Detección de mermas y despilfarro",
      "Plan de optimización de costes"
    ],
    priceEst: "Pago único (Consultar)",
    roiEst: "Aumento del margen de beneficio neto general.",
    iconType: "audit",
    deliverables: {
      contract: "NDA de confidencialidad y auditoría in-situ de procesos",
      proposal: "Mapeo de flujos operativos en cocina y sala",
      dossier: "Reporte con plan de reducción de costes"
    }
  },
  {
    id: "menu-engineering",
    title: "Ingeniería de Menú y Escandallos",
    category: "Gastronomía Estratégica",
    shortDescription: "Diseñamos una matriz de rentabilidad plato a plato para asegurar que cada comanda maximiza tu ganancia.",
    features: [
      "Análisis de precios de proveedores",
      "Creación de fichas técnicas de cada plato",
      "Posicionamiento de platos estrella",
      "Ajustes de precio basados en psicología visual"
    ],
    priceEst: "Pago único (Consultar)",
    roiEst: "Aumento del ticket medio y de la rotación de stock.",
    iconType: "audit",
    deliverables: {
      contract: "Revisión completa de la carta técnica",
      proposal: "Metodología de neuromarketing en el menú",
      dossier: "Nuevas fichas de escandallos y precios sugeridos"
    }
  }
];
