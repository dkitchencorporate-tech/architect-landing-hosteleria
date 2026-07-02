"use client";
import React, { useState } from 'react';

export default function EventLibraryHook() {
  const [isAnnual, setIsAnnual] = useState(false);
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-b from-[#111] to-[#0a0a0a] text-white">
      {/* Glow effects para darle vida y no ser un bloque negro plano */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#FF4500] rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        
        {/* El Puente / Contexto que conecta los servicios */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            El Salto Estratégico: Growth Partner
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-black leading-tight text-balance">
            Pasa a la ofensiva.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-orange-400">Multiplica tu facturación.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-400 leading-relaxed text-pretty">
            Pasar al nivel Growth significa tener a un <strong className="text-white">Socio Estratégico</strong> trabajando en la sombra. 
            No somos una agencia tradicional; utilizamos nuestra propia tecnología impulsada por IA para ser más ágiles, dinámicos y precisos. 
            Tú ejecutas en tu local, nosotros desplegamos el ecosistema digital para duplicar la facturación de un viernes o reventar un martes aburrido.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          
          <div className="space-y-10">
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#FF4500] to-orange-600 flex items-center justify-center text-2xl shadow-lg shadow-orange-500/20 shrink-0">🎯</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Ecosistema de Eventos</h3>
                <p className="text-gray-400 leading-relaxed">
                  Accedes a nuestra plataforma de eventos. Nosotros nos encargamos de la estrategia, la planificación y el ecosistema digital. Tú pones el presupuesto publicitario y nosotros gestionamos las campañas para garantizar la afluencia.
                </p>
              </div>
            </div>
            
            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">🤝</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Riesgo Compartido</h3>
                <p className="text-gray-400 leading-relaxed">
                  Nuestro éxito depende del tuyo. Nos llevamos un porcentaje basado en la afluencia concertada y el impacto real de nuestra estrategia. Si nuestra planificación no repercute en tus ventas, nuestro porcentaje queda anulado.
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0">🤖</div>
              <div>
                <h3 className="text-2xl font-bold mb-2">Tecnología IA Autónoma</h3>
                <p className="text-gray-400 leading-relaxed">
                  Nuestra ventaja competitiva. Usamos sistemas propietarios de IA para analizar datos, crear anuncios hiperoptimizados y responder a tus clientes en segundos. Personalización masiva que una agencia tradicional tardaría semanas en lograr.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Efecto decorativo de fondo */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#FF4500]/20 to-purple-500/20 rounded-[3rem] blur-3xl"></div>
            
            <div className="relative grid grid-cols-2 gap-6 transform rotate-2 hover:rotate-0 transition-transform duration-700">
              
              {/* Event Card 1 (Imagen Local Generada por IA) */}
              <div className="bg-[#1A1A1A] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="/cata_cerveza.png" 
                    alt="Cata de Cerveza Premium" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent"></div>
                </div>
                <div className="p-6 -mt-8 relative z-10">
                  <div className="inline-block bg-orange-500/20 text-orange-400 text-[10px] font-black px-2 py-1 rounded mb-3">LISTO PARA LANZAR</div>
                  <div className="font-bold text-white text-lg leading-tight mb-2">Cata Maridaje Artesanal</div>
                  <div className="text-sm text-gray-400">Atrae público premium y eleva el ticket medio.</div>
                </div>
              </div>

              {/* Event Card 2 */}
              <div className="bg-[#1A1A1A] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group mt-12">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=600&q=80" 
                    alt="Evento Comida" 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent"></div>
                </div>
                <div className="p-6 -mt-8 relative z-10">
                  <div className="inline-block bg-orange-500/20 text-orange-400 text-[10px] font-black px-2 py-1 rounded mb-3">LISTO PARA LANZAR</div>
                  <div className="font-bold text-white text-lg leading-tight mb-2">Noche de Burgers & Trivial</div>
                  <div className="text-sm text-gray-400">Multiplica la facturación en grupos grandes.</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Full-width Pricing Card */}
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-[#111] p-10 rounded-[2rem] border border-orange-500/30 shadow-[0_30px_60px_rgba(255,69,0,0.15)] relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 bg-[#FF4500] text-white text-xs font-black px-6 py-2 rounded-bl-2xl uppercase tracking-wider">EL SALTO DEFINITIVO</div>
          
          <div className="flex flex-col md:flex-row gap-10 items-center">
            
            {/* Left side: Price & Toggle */}
            <div className="md:w-1/3 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8 flex flex-col items-center md:items-start">
              <div className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-3">Socio Operativo Growth</div>
              
              <div className="flex bg-black/50 p-1 rounded-full border border-white/10 mb-6 w-full max-w-[250px] relative">
                <button 
                  onClick={() => setIsAnnual(false)}
                  className={`flex-1 py-2 text-xs font-bold rounded-full transition-all relative z-10 ${!isAnnual ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-white'}`}
                >
                  MENSUAL
                </button>
                <button 
                  onClick={() => setIsAnnual(true)}
                  className={`flex-1 py-2 text-xs font-bold rounded-full transition-all relative z-10 flex flex-col items-center justify-center leading-tight ${isAnnual ? 'bg-white/10 text-white shadow-sm' : 'text-gray-500 hover:text-white'}`}
                >
                  ANUAL
                  <span className="text-[9px] text-[#FF4500] uppercase block">-2 Meses</span>
                </button>
              </div>

              <div className="flex items-baseline justify-center md:justify-start gap-1 mb-2">
                <span className="text-6xl lg:text-7xl font-black text-white">{isAnnual ? '2990€' : '299€'}</span>
                <span className="text-xl text-gray-500">{isAnnual ? '/año' : '/mes'}</span>
              </div>
              
              {isAnnual && (
                <div className="animate-fade-in w-full bg-white/5 border border-white/10 rounded-xl p-3 mb-6 text-center">
                  <div className="text-xs text-gray-400 mb-1">Pago anual disponible con:</div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="font-black text-white tracking-wider text-sm">Klarna.</span>
                    <span className="text-[10px] bg-pink-500/20 text-pink-400 px-2 py-0.5 rounded font-bold">PRÓXIMAMENTE</span>
                  </div>
                  <div className="text-[10px] text-gray-500 mt-1">3 cuotas sin intereses</div>
                </div>
              )}

              <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                El precio fijo para mantener a todo un departamento tecnológico y estratégico funcionando a máxima potencia.
              </p>
              
              <a href={`https://wa.me/34622652659?text=Hola,%20quiero%20empezar%20con%20el%20Plan%20Growth%20${isAnnual ? 'Anual (2990€)' : 'Mensual (299€)'}`} className="inline-block w-full bg-[#FF4500] text-white text-center py-4 px-6 rounded-xl font-black text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/50 hover:-translate-y-1">
                Activar Ecosistema
              </a>
            </div>

            {/* Right side: Features Grid */}
            <div className="md:w-2/3">
              <div className="text-white font-bold mb-6 text-lg">Todo lo que incluye la suscripción:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-8">
                
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <span className="font-bold text-white block">Toda la Suscripción Base</span>
                    <span className="text-xs text-gray-400 leading-snug block mt-1">Carta QR interactiva y Widget IA incluidos sin coste extra de mantenimiento.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <span className="font-bold text-white block">Estrategia de Eventos</span>
                    <span className="text-xs text-gray-400 leading-snug block mt-1">Planificación profunda de hasta un (1) evento mensual de alto impacto.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#FF4500] mt-1">✓</span>
                  <div>
                    <span className="font-bold text-white block">Gestión Total de Ads</span>
                    <span className="text-xs text-gray-400 leading-snug block mt-1">Nosotros creamos y optimizamos las campañas (tú decides tu presupuesto).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#FF4500] mt-1">✓</span>
                  <div>
                    <span className="font-bold text-white block">Biblioteca de Eventos</span>
                    <span className="text-xs text-gray-400 leading-snug block mt-1">Acceso a conceptos rentables probados que ya funcionan en hostelería.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">✓</span>
                  <div>
                    <span className="font-bold text-gray-300 block">Creatividades de Alto Impacto</span>
                    <span className="text-xs text-gray-500 leading-snug block mt-1">Material gráfico y textos optimizados mediante algoritmos de conversión.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">✓</span>
                  <div>
                    <span className="font-bold text-gray-300 block">Soporte Estratégico</span>
                    <span className="text-xs text-gray-500 leading-snug block mt-1">Comunicación directa con tu Consultor Senior asignado.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:col-span-2 bg-white/5 border border-white/10 p-4 rounded-xl relative overflow-hidden group mt-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <span className="text-purple-400 mt-1 text-xl">🤝</span>
                  <div>
                    <span className="font-black text-purple-300 block text-sm mb-1">GARANTÍA DE ÉXITO (Variable del 20%)</span>
                    <span className="text-xs text-gray-300 leading-relaxed block">
                      Nos encargamos de toda la gestión y asumimos el riesgo. Cobramos un <strong>20% del ticket</strong> generado en el evento, PERO solo si cumplimos el objetivo de afluencia. 
                      <em>(Ej: Si calculamos 30 personas y logramos 25, nuestro variable es 0€).</em>
                    </span>
                    <span className="text-[10px] text-gray-400 block mt-3 border-t border-white/10 pt-2">
                      *<strong>Taquilla Transparente:</strong> La entrada se vende a través de una pasarela online propia. El comensal paga por adelantado y recibe un código QR. Tú solo escaneas en puerta. Cero descontrol sobre tu caja física.
                    </span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* MATRIX DE RESPONSABILIDADES */}
        <div className="max-w-5xl mx-auto mb-16 relative z-10">
          <div className="text-center mb-10">
            <h3 className="text-2xl font-black text-white">¿Cómo nos dividimos el trabajo?</h3>
            <p className="text-gray-400 text-sm mt-2">Nuestro ecosistema asume la carga administrativa para que tu equipo se centre al 100% en la sala.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 hover:border-orange-500/30 transition-colors shadow-2xl">
              <div className="w-14 h-14 bg-gradient-to-br from-[#FF4500] to-orange-600 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-orange-500/20">⚡</div>
              <h4 className="text-xl font-bold text-white mb-5">Ingeniería de Datos y Alta Velocidad</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3"><span className="text-[#FF4500] mt-0.5">✓</span> <span>Diseño del concepto estratégico del evento.</span></li>
                <li className="flex items-start gap-3"><span className="text-[#FF4500] mt-0.5">✓</span> <span>Generación de anuncios de alta conversión.</span></li>
                <li className="flex items-start gap-3"><span className="text-[#FF4500] mt-0.5">✓</span> <span>Configuración y optimización de Meta Ads.</span></li>
                <li className="flex items-start gap-3"><span className="text-[#FF4500] mt-0.5">✓</span> <span>Soporte automatizado para incidencias de reservas.</span></li>
                <li className="flex items-start gap-3"><span className="text-[#FF4500] mt-0.5">✓</span> <span>Gestión de reservas y cobro de taquilla anticipada.</span></li>
              </ul>
            </div>
            <div className="bg-[#1A1A1A] border border-white/5 rounded-3xl p-8 hover:border-white/20 transition-colors shadow-2xl">
              <div className="w-14 h-14 bg-white/10 text-white rounded-2xl flex items-center justify-center text-3xl mb-6 border border-white/10">👨‍🍳</div>
              <h4 className="text-xl font-bold text-white mb-5">Lo que haces tú (El Local)</h4>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-start gap-3"><span className="text-white mt-0.5">✓</span> <span>Aprobar la idea propuesta por tu Consultor.</span></li>
                <li className="flex items-start gap-3"><span className="text-white mt-0.5">✓</span> <span>Definir y pagar directamente el presupuesto de Meta Ads.</span></li>
                <li className="flex items-start gap-3"><span className="text-white mt-0.5">✓</span> <span>Recibir a los clientes con una experiencia top.</span></li>
                <li className="flex items-start gap-3"><span className="text-white mt-0.5">✓</span> <span>Cocinar y servir la comida / bebida.</span></li>
                <li className="flex items-start gap-3"><span className="text-white mt-0.5">✓</span> <span>Cobrar el ticket final masivo en tu caja.</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* MATRIZ DE DECISION */}
        <div className="max-w-5xl mx-auto mb-32 relative z-10">
          <div className="bg-gradient-to-r from-[#1A1A1A] to-black border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl">
            <div className="text-center mb-10">
               <h3 className="text-2xl md:text-3xl font-black text-white">¿Cuál es tu ruta ideal?</h3>
               <p className="text-sm md:text-base text-gray-400 mt-2">Dos modelos pensados para dos etapas diferentes. No compiten entre sí.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-colors">
                 <div className="text-gray-300 font-black text-sm mb-2 tracking-widest">RUTA A: INDEPENDENCIA</div>
                 <h4 className="text-xl font-bold text-white mb-3">Infraestructura Base (700€)</h4>
                 <p className="text-sm text-gray-400 leading-relaxed mb-6">Para el hostelero que quiere digitalizarse, tener su propia carta interactiva y reservas web sin pagar cuotas mensuales. Pago único y el sistema es tuyo.</p>
                 <a href="#solucion-base" className="text-white text-sm font-bold border-b border-white hover:text-gray-300 transition-colors">Ver Detalles del Plan Base</a>
               </div>
               <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/30 p-8 rounded-2xl relative overflow-hidden hover:border-orange-500/50 transition-colors">
                 <div className="absolute top-0 right-0 bg-[#FF4500] text-white text-[10px] font-black px-3 py-1 rounded-bl-xl">RECOMENDADO</div>
                 <div className="text-orange-400 font-black text-sm mb-2 tracking-widest">RUTA B: CRECIMIENTO</div>
                 <h4 className="text-xl font-bold text-white mb-3">Socio Growth (299€/mes)</h4>
                 <p className="text-sm text-gray-400 leading-relaxed mb-6">Para el hostelero que quiere delegar el marketing y llenar el local cada mes con eventos de alto impacto. Todo el software base está incluido gratis.</p>
                 <a href="https://wa.me/34622652659?text=Hola,%20quiero%20agendar%20una%20Consultoría%20sobre%20el%20Socio%20Growth" className="inline-block bg-[#FF4500] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 transition-colors">Agendar Consultoría</a>
               </div>
            </div>
          </div>
        </div>

        {/* SEPARADOR/TÍTULO CENTRAL: BIBLIOTECA DE EVENTOS */}
        <div className="text-center max-w-4xl mx-auto mt-32 mb-16 space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-black px-4 py-2 rounded-full uppercase tracking-wider mb-2 shadow-lg shadow-orange-500/5">
            <span className="w-2 h-2 rounded-full bg-orange-400 animate-pulse"></span>
            Arma Secreta: Plan Growth
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] text-balance">
            La <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-orange-400 border-b-4 border-[#FF4500]/50 pb-1">Biblioteca de Eventos</span>.<br className="hidden md:block"/>
            Así es como llenamos tu local.
          </h2>
          <p className="text-gray-400 leading-relaxed text-lg md:text-xl text-pretty max-w-2xl mx-auto">
            Se acabaron los martes vacíos. Hemos documentado decenas de estrategias, dinámicas y promociones <strong>que ya sabemos que funcionan</strong> para que las ejecutes con un clic.
          </p>
        </div>

        {/* TARJETA DEL DASHBOARD Y CARACTERÍSTICAS */}
        <div className="max-w-5xl mx-auto p-10 md:p-14 bg-[#1A1A1A] rounded-[2rem] border border-white/10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#FF4500] opacity-[0.03] rounded-full blur-[80px] pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-12 items-center relative z-10">
            <div className="md:w-1/2 space-y-8">
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-xl shrink-0 text-[#FF4500]">💡</div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Ideas listas para usar</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Desde catas maridaje exclusivas hasta noches temáticas de alto margen. No tienes que inventar nada, solo replicar el éxito.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-xl shrink-0 text-[#FF4500]">🚀</div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Ejecución Automatizada</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Tú eliges el evento; nosotros generamos las creatividades, montamos la campaña y gestionamos las reservas de principio a fin.</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-xl shrink-0 text-[#FF4500]">📈</div>
                  <div>
                    <h4 className="text-white font-bold text-lg mb-1">Picos de Facturación</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Transformamos un día flojo de 300€ en un día de 1.500€ con solo encender la maquinaria digital de nuestro sistema.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="md:w-1/2 w-full">
              {/* Premium Dashboard Mockup */}
              <div className="bg-[#0A0A0A] border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col h-full relative group">
                {/* Efecto hover luminoso */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                
                {/* Window Header */}
                <div className="bg-[#111] border-b border-white/5 px-4 py-3 flex items-center gap-2 relative z-10">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/80"></div>
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono tracking-widest ml-4">ARCHITECT.SYS // EVENT_ENGINE_V2.0</div>
                </div>
                
                {/* Platform Content */}
                <div className="p-6 flex flex-col gap-4 flex-1 relative z-10">
                  
                  {/* Event Item 1 */}
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/30 transition-all cursor-default">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-white font-bold text-sm">Experiencias de Alto Margen</h4>
                        <span className="text-green-400 text-[10px] font-bold px-2 py-0.5 rounded bg-green-400/10">PREMIUM</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">Catas, maridajes y menús degustación pre-diseñados para atraer al segmento poblacional con mayor poder adquisitivo de tu zona.</p>
                    </div>
                  </div>

                  {/* Event Item 2 */}
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/30 transition-all cursor-default">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-white font-bold text-sm">Aceleradores de Sobremesa</h4>
                        <span className="text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded bg-blue-400/10">VOLUMEN</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">Formatos de entretenimiento en vivo y dinámicas de grupo optimizadas para extender la estancia y triplicar el consumo de bebidas.</p>
                    </div>
                  </div>

                  {/* Event Item 3 */}
                  <div className="flex items-start gap-4 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-orange-500/30 transition-all cursor-default">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center shrink-0">
                      <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="text-white font-bold text-sm">Desestacionalización Táctica</h4>
                        <span className="text-purple-400 text-[10px] font-bold px-2 py-0.5 rounded bg-purple-400/10">PERFORMANCE</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed">Sistemas pre-configurados para inyectar tráfico masivo en días valle mediante micro-campañas de segmentación hiper-local en redes.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
