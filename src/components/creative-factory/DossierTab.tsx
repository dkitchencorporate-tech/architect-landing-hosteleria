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

      </div>
    </div>
  );
}
