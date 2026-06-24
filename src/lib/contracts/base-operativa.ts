export const baseOperativaContract = {
  id: 'base',
  title: 'Base Operativa Digital',
  proposal: {
    infrastructure: 'Configuración de servidor en Vercel, despliegue de PWA (Progressive Web App) y base de datos Supabase en alta disponibilidad.',
    modules: 'Motor de reservas propio integrado sin comisiones a terceros y Carta Digital Interactiva con psicología visual.',
    revisions: 'Límite máximo de 2 rondas de revisiones integrales de la carta digital tras la primera entrega funcional.',
    slaTimeline: 'Entrega del MVP operativo en un plazo máximo de 14 días hábiles, contabilizados EXCLUSIVAMENTE tras la recepción total del material por parte del cliente.'
  },
  dossier: {
    phases: [
      { day: 'Día 1-3', title: 'Fase 1: Recolección', description: 'Recepción de matriz de precios, carta, fotos y branding (logo, colores).' },
      { day: 'Día 4-10', title: 'Fase 2: Arquitectura', description: 'Configuración de base de datos, despliegue de servidores y maquetación de PWA.' },
      { day: 'Día 11-14', title: 'Fase 3: Revisiones y Entrega', description: 'Presentación del prototipo funcional, ejecución de hasta 2 rondas de revisión y paso a producción.' }
    ],
    ghostingClause: 'El Cliente dispone de un plazo máximo de 15 días naturales para entregar todos los recursos requeridos (carta, precios, activos gráficos). Si se supera este plazo, el proyecto entrará en estado de "Pausa Comercial". Tras 30 días naturales sin respuesta o inactividad por parte del Cliente, el proyecto se considerará ABANDONADO. La infraestructura será dada de baja y el proyecto será derivado a la papelera de inactividad, NO PROCEDIENDO REEMBOLSO ALGUNO bajo ninguna circunstancia.'
  },
  legal: {
    clause1_object: 'El presente contrato rige la prestación del servicio "Base Operativa Digital" por parte de Architect.Sys a favor del Cliente, enfocado en la construcción y despliegue de una infraestructura tecnológica de reservas y carta digital en formato PWA.',
    clause2_refunds: 'Architect.Sys emitirá un reembolso del 100% de la cuota inicial única y exclusivamente si: (a) Existe un incumplimiento demostrable del plazo de entrega de 14 días hábiles ESTANDO EN POSESIÓN de la totalidad del material requerido del Cliente, o (b) Existe imposibilidad técnica por parte de Architect.Sys para ejecutar el despliegue del servidor. Debido a la asignación inmediata de recursos humanos y técnicos, no existirá derecho a devolución bajo escenarios de arrepentimiento, demoras causadas por el Cliente, o Abandono del Proyecto (según la Cláusula de Ghosting estipulada en el Dossier).',
    clause3_technology: 'El Cliente reconoce expresamente que la infraestructura tecnológica se apoya en modelos de Inteligencia Artificial y en proveedores de nube de terceros (Vercel, Supabase, Whop). Architect.Sys está exento de toda responsabilidad penal, civil o comercial por lucro cesante, pérdida de ventas o daños indirectos derivados de caídas masivas en los servicios primarios de estos proveedores o latencias imprevistas en los modelos de IA.',
    clause4_property: 'El Cliente alquila una licencia de uso de software en la nube bajo el modelo Software as a Service. El código fuente nativo y propietario pertenece en su totalidad a Architect.Sys. No obstante, el dominio web y la totalidad de los datos generados por los consumidores (Data de Clientes) son propiedad absoluta del Cliente.'
  }
};
