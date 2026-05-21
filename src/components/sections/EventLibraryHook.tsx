"use client";
import React from 'react';

export default function EventLibraryHook() {
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
                  Nuestra ventaja competitiva. Usamos sistemas propietarios de IA para analizar datos, crear creatividades hiper-optimizadas y responder a tus clientes en segundos. Personalización masiva que una agencia tradicional tardaría semanas en lograr.
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
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-gray-900 to-[#111] p-10 rounded-[2rem] border border-orange-500/30 shadow-[0_20px_50px_rgba(255,69,0,0.15)] relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#FF4500] text-white text-xs font-black px-6 py-2 rounded-bl-2xl uppercase tracking-wider">EL SALTO DEFINITIVO</div>
          
          <div className="flex flex-col md:flex-row gap-10 items-center">
            
            {/* Left side: Price */}
            <div className="md:w-1/3 text-center md:text-left border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 md:pr-8">
              <div className="text-orange-400 text-sm font-bold uppercase tracking-widest mb-3">Suscripción Growth</div>
              <div className="flex items-baseline justify-center md:justify-start gap-1 mb-4">
                <span className="text-7xl font-black text-white">99€</span>
                <span className="text-xl text-gray-500">/mes total</span>
              </div>
              <p className="text-sm text-gray-400 mb-8">
                El precio fijo para mantener todo el ecosistema tecnológico y estratégico funcionando a máxima potencia.
              </p>
              <a href="https://wa.me/34611499674?text=Hola,%20quiero%20empezar%20con%20el%20Plan%20Growth%20de%2099%E2%82%AC" className="inline-block w-full bg-[#FF4500] text-white text-center py-4 px-6 rounded-full font-black text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/50 hover:-translate-y-1">
                Convertirme en Partner
              </a>
            </div>

            {/* Right side: Features Grid */}
            <div className="md:w-2/3">
              <div className="text-white font-bold mb-6 text-lg">Todo lo que incluye esta suscripción:</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                
                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <span className="font-bold text-white block">Toda la Suscripción Base</span>
                    <span className="text-xs text-gray-400">Carta QR y Widget IA incluidos sin coste extra.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-green-400 mt-1">✓</span>
                  <div>
                    <span className="font-bold text-white block">Estrategia de 1 Evento / mes</span>
                    <span className="text-xs text-gray-400">Planificación profunda de hasta un (1) evento mensual.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#FF4500] mt-1">✓</span>
                  <div>
                    <span className="font-bold text-white block">Gestión de Ads</span>
                    <span className="text-xs text-gray-400">Control total de tus campañas (tú decides el presupuesto).</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#FF4500] mt-1">✓</span>
                  <div>
                    <span className="font-bold text-white block">Biblioteca de Eventos</span>
                    <span className="text-xs text-gray-400">Acceso a conceptos probados que funcionan en hostelería.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">✓</span>
                  <div>
                    <span className="font-bold text-gray-300 block">Creatividades Dinámicas</span>
                    <span className="text-xs text-gray-500">Material gráfico generado por nuestra IA.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">✓</span>
                  <div>
                    <span className="font-bold text-gray-300 block">Análisis de Afluencia</span>
                    <span className="text-xs text-gray-500">Métricas claras del retorno de la inversión.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-gray-400 mt-1">✓</span>
                  <div>
                    <span className="font-bold text-gray-300 block">Soporte Estratégico</span>
                    <span className="text-xs text-gray-500">Comunicación directa para ajustar la táctica.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-purple-400 mt-1">★</span>
                  <div>
                    <span className="font-bold text-purple-300 block">Modelo a Éxito (Variable)</span>
                    <span className="text-xs text-gray-400">Porcentaje adicional solo si generamos afluencia real.</span>
                  </div>
                </div>

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
                    <p className="text-gray-400 text-sm leading-relaxed">Tú eliges el evento; nosotros generamos las creatividades, montamos la campaña y el Agente toma las reservas por WhatsApp.</p>
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
