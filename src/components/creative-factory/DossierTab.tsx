import React, { useState } from 'react';

export default function DossierTab() {
  const [dossierSubTab, setDossierSubTab] = useState('laws');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-black text-white mb-2">Dossier de Protocolos Operativos</h3>
        <p className="text-zinc-400 text-sm">Biblioteca estratégica y de procedimientos estándar de la agencia **Architect.Sys**.</p>
      </div>

      <div className="flex border-b border-zinc-900 gap-6">
        <button 
          onClick={() => setDossierSubTab('laws')}
          className={`pb-3 text-xs font-black uppercase tracking-wider ${dossierSubTab === 'laws' ? 'border-b-2 border-orange-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Las 10 Leyes Operativas
        </button>
        <button 
          onClick={() => setDossierSubTab('funnel')}
          className={`pb-3 text-xs font-black uppercase tracking-wider ${dossierSubTab === 'funnel' ? 'border-b-2 border-orange-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Protocolo de Captación
        </button>
        <button 
          onClick={() => setDossierSubTab('events')}
          className={`pb-3 text-xs font-black uppercase tracking-wider ${dossierSubTab === 'events' ? 'border-b-2 border-orange-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Ecosistema de Eventos
        </button>
        <button 
          onClick={() => setDossierSubTab('core_protocols')}
          className={`pb-3 text-xs font-black uppercase tracking-wider ${dossierSubTab === 'core_protocols' ? 'border-b-2 border-orange-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Protocolos Core
        </button>
        <button 
          onClick={() => setDossierSubTab('deliverables')}
          className={`pb-3 text-xs font-black uppercase tracking-wider ${dossierSubTab === 'deliverables' ? 'border-b-2 border-orange-500 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
        >
          Protocolos Upsell
        </button>
      </div>

      <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-3xl space-y-6 leading-relaxed text-sm text-zinc-300 font-mono">
        
        {dossierSubTab === 'laws' && (
          <div className="space-y-6">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-zinc-900 pb-2">Leyes Operativas del Consultor Gastronómico B2B</h4>
            <ol className="list-decimal pl-5 space-y-4 text-xs">
              <li><strong>Ley del Apalancamiento del Dolor:</strong> Nunca vendas "más ventas". Vende detener el sangrado de las comisiones del 30% del delivery o rentabilizar mesas vacías de martes a jueves.</li>
              <li><strong>Ley del Variable sin Riesgo:</strong> La entrada inicial debe ser libre de fricción, garantizando un porcentaje por afluencia (20% variable) para anular el escepticismo.</li>
              <li><strong>Ley de la Exclusividad Local:</strong> No captes a dos restaurantes de la misma categoría en un radio menor a 3 km. La exclusividad multiplica la lealtad del cliente.</li>
              <li><strong>Ley del Anclaje Inesperado:</strong> Utiliza fotografías gastronómicas de impacto extremo en Ads (formato 4:5 vertical) para romper el scroll del móvil.</li>
              <li><strong>Ley del Dossier Explicativo:</strong> Cada evento o propuesta debe ir respaldada por un dossier financiero detallado con costos fijos y retorno neto proyectado.</li>
              <li><strong>Ley del Control de la Base de Datos:</strong> El restaurante debe poseer el 100% de la propiedad de sus leads y reservas; nosotros controlamos la infraestructura que los genera.</li>
              <li><strong>Ley de la Auditoría Gratuita:</strong> Inicia la venta ofreciendo una auditoría de márgenes o una simulación visual de su nueva carta.</li>
              <li><strong>Ley de la Fidelización Post-Evento:</strong> Los clientes captados en eventos gastronómicos deben recibir una secuencia de seguimiento automatizada en 48 horas.</li>
              <li><strong>Ley de la Integridad de Marca:</strong> No reduzcas los precios; incrementa el valor de la oferta agregando consultoría estratégica.</li>
              <li><strong>Ley de la Ley de Pareto Culinaria:</strong> El 80% del beneficio proviene del 20% de los platos. Enfoca tus creativos e imágenes profesionales en esos platos estrella.</li>
            </ol>
          </div>
        )}

        {dossierSubTab === 'funnel' && (
          <div className="space-y-4 text-xs">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-zinc-900 pb-2">Flujo Estándar de Captación de Hostelería</h4>
            <p>Protocolo paso a paso del consultor gastronómico para onboarding de nuevos clientes:</p>
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-white block mb-1">Paso 1: Auditoría de Márgenes (Onboarding)</strong>
                El cliente rellena el formulario inicial describiendo su local, menú, ticket medio y porcentaje de delivery. El sistema genera su base de datos.
              </div>
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-white block mb-1">Paso 2: Sesión de Control de la Carta</strong>
                Abrimos la "Especialidades de la Carta" en la Sala de Control. Detectamos los platos estrella sin foto o con fotos deficientes y usamos Imagen 4 para producir las imágenes que irán en el menú digital interactivo.
              </div>
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-white block mb-1">Paso 3: Lanzamiento del Embudo B2B</strong>
                Estructuramos las campañas locales con neuromarketing para detener comisiones o llenar días muertos. Desplegamos creativos aprobados desde la Matriz a Meta Ads.
              </div>
            </div>
          </div>
        )}

        {dossierSubTab === 'events' && (
          <div className="space-y-4 text-xs">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-zinc-900 pb-2">Ecosistema de Eventos Universales de Alta Afluencia</h4>
            <p>Eventos probados para activar la afluencia física según la categoría comercial del restaurante:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-orange-500 block mb-1">Maridaje y Catas (Gourmet)</strong>
                Dirigido a restaurantes de ticket alto. Selección de vinos de autor y maridaje de platos exclusivos. Genera tickets muy elevados y posicionamiento de estatus.
              </div>
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-orange-500 block mb-1">Cenas con Espectáculo o Música (Casual)</strong>
                Ideal para restaurantes modernos. Conciertos acústicos, espectáculos de flamenco o monólogos de humor de martes a jueves.
              </div>
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-orange-500 block mb-1">Citas Rápidas y Trivias (Barrio)</strong>
                Juegos de preguntas por equipos o speed dating enfocados en jóvenes adultos locales. Garantiza afluencia masiva recurrente.
              </div>
            </div>
          </div>
        )}

        {dossierSubTab === 'core_protocols' && (
          <div className="space-y-4 text-xs">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-zinc-900 pb-2">Protocolos de Entrega: Servicios Core (Captación Inicial)</h4>
            <p>Estructura de entregables para los 3 pilares principales de la Landing Page (Evitar el "Scope Creep"):</p>
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-orange-500 block mb-1">Fundación Digital (700€ / Fraccionado 2x350€)</strong>
                <ul className="list-disc pl-4 mt-2 space-y-1 text-zinc-400">
                  <li><span className="text-white font-bold">Contrato SLA:</span> Propiedad 100% para el cliente. Entrega en 14 días laborables. 2 meses de mantenimiento incluidos (luego 69€/mes).</li>
                  <li><span className="text-white font-bold">Derecho a Eventos:</span> Acceso limitado a <strong>1 Evento</strong> de la Biblioteca para activar su caja.</li>
                  <li><span className="text-white font-bold">Propuesta Visual (Bonos Influidos):</span> Wireframe web, mockup de neuromarketing de carta física, reporte de 8 páginas de auditoría en Maps y táctica de días valle.</li>
                  <li><span className="text-white font-bold">Dossier de Setup:</span> Recolección de carta, fotos del local, despliegue de PWA, Base de Datos Propia, motor de reservas directo, y Kit de 12 posts para redes (IA).</li>
                </ul>
              </div>
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-orange-500 block mb-1">Recepcionista IA / Ecosistema 24/7 (450€ + 69€/m)</strong>
                <ul className="list-disc pl-4 mt-2 space-y-1 text-zinc-400">
                  <li><span className="text-white font-bold">Contrato SLA:</span> Límite mensual de 1.500 chats. Resolución de caídas en menos de 12h. Licencia de Kommo incluida.</li>
                  <li><span className="text-white font-bold">Dossier de Setup:</span> Conexión de Meta API, diseño de Pipeline Visual y entrenamiento del Prompt de la marca.</li>
                </ul>
              </div>
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-orange-500 block mb-1">Socio Growth (299€/mes) - El Salto Estratégico</strong>
                <ul className="list-disc pl-4 mt-2 space-y-1 text-zinc-400">
                  <li><span className="text-white font-bold">Derecho a Eventos:</span> Acceso a <strong>más de 1 evento al mes</strong> con planificación profunda de alto impacto.</li>
                  <li><span className="text-white font-bold">Contrato SLA (Garantía de Éxito):</span> Cobramos un <strong>20% de la taquilla generada</strong> en el evento, PERO <em>solo</em> si cumplimos el objetivo de afluencia pactado.</li>
                  <li><span className="text-white font-bold">Beneficio Cruzado:</span> Cuota de mantenimiento de IA (69€) bonificada a 0€.</li>
                  <li><span className="text-white font-bold">Dossier de Setup:</span> Gestión integral de Meta Ads y despliegue del ecosistema de eventos con pasarela propia de taquilla.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {dossierSubTab === 'deliverables' && (
          <div className="space-y-4 text-xs">
            <h4 className="text-sm font-black text-white uppercase tracking-wider border-b border-zinc-900 pb-2">Estructura de Servicios Upsell y Entregables</h4>
            <p>Define exactamente la responsabilidad contractual para evitar el "scope creep" tras el cobro del servicio:</p>
            <div className="space-y-3 pt-2">
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-orange-500 block mb-1">Gestión Avanzada de Meta Ads - Desde 299€/mes</strong>
                <ul className="list-disc pl-4 mt-2 space-y-1 text-zinc-400">
                  <li><span className="text-white font-bold">Contrato SLA:</span> Gestión de campaña en ecosistema Meta (Instagram/Facebook).</li>
                  <li><span className="text-white font-bold">Entregable:</span> Diseño de 3 ángulos creativos, segmentación de alcance y dashboards en tiempo real.</li>
                </ul>
              </div>
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-orange-500 block mb-1">Community Manager & Creador UGC - Desde 350€/mes</strong>
                <ul className="list-disc pl-4 mt-2 space-y-1 text-zinc-400">
                  <li><span className="text-white font-bold">Contrato SLA:</span> 1 Grabación mensual y entrega de 12 Reels.</li>
                  <li><span className="text-white font-bold">Entregable:</span> Estrategia de ganchos visuales, guiones TikTok y gestión de comunidad.</li>
                </ul>
              </div>
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-orange-500 block mb-1">Auditoría Operativa y de Rentabilidad - Pago único</strong>
                <ul className="list-disc pl-4 mt-2 space-y-1 text-zinc-400">
                  <li><span className="text-white font-bold">Contrato SLA:</span> NDA de confidencialidad y revisión in-situ de procesos operativos.</li>
                  <li><span className="text-white font-bold">Entregable:</span> Reporte PDF con plan de optimización de costes y turnos.</li>
                </ul>
              </div>
              <div className="p-4 bg-black rounded-xl border border-zinc-900">
                <strong className="text-orange-500 block mb-1">Ingeniería de Menú y Escandallos - Pago único</strong>
                <ul className="list-disc pl-4 mt-2 space-y-1 text-zinc-400">
                  <li><span className="text-white font-bold">Contrato SLA:</span> Revisión exhaustiva de platos y costes de proveedores.</li>
                  <li><span className="text-white font-bold">Entregable:</span> Nuevas fichas técnicas y reestructuración de la carta.</li>
                </ul>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
