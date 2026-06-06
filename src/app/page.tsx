import React from 'react';
import ExitIntent from '@/components/ExitIntent';
import DarkKitchen from '@/components/DarkKitchen';
import DigitalPresenceValue from '@/components/sections/DigitalPresenceValue';
import TheTrojanHorse from '@/components/sections/TheTrojanHorse';
import EventLibraryHook from '@/components/sections/EventLibraryHook';
import HighTicketEcosystem from '@/components/sections/HighTicketEcosystem';
import AggressiveHero from '@/components/sections/AggressiveHero';
import WhatsAppHero from '@/components/sections/WhatsAppHero';
import FAQ from '@/components/sections/FAQ';
import VisionAndEmpathy from '@/components/sections/VisionAndEmpathy';

export default function Home() {
  return (
    <div className=&quot;min-h-screen bg-[#FDFCF8] text-gray-900 font-sans selection:bg-[#FF4500] selection:text-white overflow-x-hidden&quot;>
      
      {/* CAPTURA DE SALIDA IA */}
      <ExitIntent />
      
      {/* NAVBAR */}
      <nav className=&quot;fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-xl transition-all&quot;>
        <div className=&quot;flex flex-col md:flex-row justify-between items-center py-3 md:py-4 px-4 md:px-8 max-w-7xl mx-auto gap-3 md:gap-0&quot;>
          <div className=&quot;flex justify-between items-center w-full md:w-auto&quot;>
            <div className=&quot;text-xl md:text-2xl font-black tracking-tighter text-white hover:scale-105 transition-transform cursor-pointer&quot;>
              Architect<span className=&quot;text-[#FF4500]&quot;>.Sys</span>
            </div>
            <a href=&quot;https://wa.me/34611499674?text=Hola,%20quiero%20solicitar%20la%20Auditoría%20Gratuita.&quot; className=&quot;md:hidden inline-flex bg-[#FF4500] text-white px-4 py-2 rounded-full font-bold text-[10px] sm:text-xs hover:bg-orange-600 transition-all shadow-lg&quot;>
              Auditoría Gratuita
            </a>
          </div>
          
          <div className=&quot;flex items-center bg-[#1A1A1A]/90 border border-white/10 rounded-full p-1.5 shadow-[0_4px_30px_rgba(255,69,0,0.2)] backdrop-blur-md w-full md:w-auto overflow-x-auto justify-start md:justify-center animate-pulse&quot; style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <a href=&quot;#suscripciones&quot; className=&quot;whitespace-nowrap px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold text-gray-300 hover:text-white hover:bg-[#FF4500] hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] focus:bg-[#FF4500] focus:text-white transition-all&quot;>
              Suscripciones
            </a>
            <div className=&quot;w-px h-4 bg-white/20 shrink-0 mx-1&quot;></div>
            <a href=&quot;#eventos&quot; className=&quot;whitespace-nowrap px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold text-gray-300 hover:text-white hover:bg-[#FF4500] hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] focus:bg-[#FF4500] focus:text-white transition-all&quot;>
              Eventos
            </a>
            <div className=&quot;w-px h-4 bg-white/20 shrink-0 mx-1&quot;></div>
            <a href=&quot;#automatizacion&quot; className=&quot;whitespace-nowrap px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold text-gray-300 hover:text-white hover:bg-[#FF4500] hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] focus:bg-[#FF4500] focus:text-white transition-all&quot;>
              Automatización
            </a>
            <div className=&quot;w-px h-4 bg-white/20 shrink-0 mx-1&quot;></div>
            <a href=&quot;#dark-kitchen&quot; className=&quot;whitespace-nowrap px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold text-gray-300 hover:text-white hover:bg-[#FF4500] hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] focus:bg-[#FF4500] focus:text-white transition-all&quot;>
              Dark Kitchen
            </a>
          </div>

          <a href=&quot;https://wa.me/34611499674?text=Hola,%20quiero%20solicitar%20la%20Auditoría%20Gratuita.&quot; className=&quot;hidden md:inline-flex bg-[#FF4500] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/50 hover:-translate-y-1 items-center gap-2&quot;>
            <span>Auditoría Gratuita</span>
          </a>
        </div>
      </nav>

      {/* NEW SECTION 1: AGGRESSIVE HERO (TRAFICO FRIO) */}
      <AggressiveHero />

      {/* NEW SECTION 2: VISION AND EMPATHY (Replaces the Pain 3-cards) */}
      <VisionAndEmpathy />

      {/* CORE FUNNEL */}
      <div id=&quot;suscripciones&quot;>
        <DigitalPresenceValue />
        <div id=&quot;solucion-base&quot;>
          <TheTrojanHorse />
        </div>
      </div>

      <div id=&quot;eventos&quot;>
        <EventLibraryHook />
      </div>

      {/* SUCCESS STORY 2: EVENT LIBRARY */}
      <section className=&quot;py-12 bg-[#FF4500] text-white relative overflow-hidden&quot;>
        <div className=&quot;absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay&quot;></div>
        <div className=&quot;max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-8 relative z-10&quot;>
           <div className=&quot;w-24 h-24 bg-white text-[#FF4500] rounded-full flex items-center justify-center text-5xl shrink-0 font-black shadow-2xl&quot;>🍻</div>
           <div>
              <h4 className=&quot;text-3xl font-black mb-3&quot;>&quot;Taberna Los Arcos&quot; facturó <span className=&quot;text-yellow-300&quot;>900€ extra en solo 2 horas</span> un jueves por la tarde.</h4>
              <p className=&quot;text-white/90 text-lg italic&quot;>&quot;Los jueves de 18h a 20h solían ser horas de pura angustia, con el local casi vacío y el personal parado. Activamos una 'Cata Premium' de la Biblioteca de Eventos y en 48 horas agotamos plazas. Transformó un turno muerto en una experiencia sensorial ultra-premium que nos hizo facturar en dos horas lo que a veces nos costaba un día entero de trabajo.&quot;</p>
           </div>
        </div>
      </section>

      {/* SECTION: STEP-BY-STEP SYSTEM */}
      <section className=&quot;py-16 md:py-24 bg-[#FDFCF8]&quot;>
        <div className=&quot;max-w-7xl mx-auto px-6 md:px-8&quot;>
          <div className=&quot;text-center max-w-3xl mx-auto mb-16 md:mb-20&quot;>
            <h2 className=&quot;text-3xl sm:text-4xl font-black mb-6 text-balance&quot;>No somos informáticos. Somos tu socio comercial.</h2>
            <p className=&quot;text-lg md:text-xl text-gray-600 text-pretty&quot;>Así convertimos tu restaurante en una máquina bien engrasada.</p>
          </div>
          <div className=&quot;grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-16&quot;>
            <div className=&quot;hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gradient-to-r from-gray-200 via-[#FF4500] to-gray-900 z-0 opacity-50&quot;></div>
            <div className=&quot;relative z-10 flex flex-col items-center text-center group&quot;>
              <div className=&quot;w-24 h-24 bg-white border-4 border-[#FF4500] rounded-full flex items-center justify-center text-3xl font-black text-[#FF4500] shadow-lg mb-6 group-hover:scale-110 group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-500&quot;>1</div>
              <h3 className=&quot;text-2xl font-bold mb-4&quot;>Atracción Incesante</h3>
              <p className=&quot;text-gray-600 text-lg&quot;>Te inyectamos tráfico real. Cuando alguien busque dónde cenar, tú serás su única opción lógica.</p>
            </div>
            <div className=&quot;relative z-10 flex flex-col items-center text-center group&quot;>
              <div className=&quot;w-24 h-24 bg-[#FF4500] rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg mb-6 group-hover:scale-110 transition-all duration-500 shadow-orange-500/40&quot;>2</div>
              <h3 className=&quot;text-2xl font-bold mb-1&quot;>Cierre Automático</h3>
              <span className=&quot;block text-[10px] text-[#FF4500] font-black uppercase tracking-widest mb-4 border border-[#FF4500]/30 rounded-full px-3 py-1&quot;>(Fase Avanzada)</span>
              <p className=&quot;text-gray-600 text-lg&quot;>Tu propio CRM con Agente IA atiende el WhatsApp en segundos, gestiona el flujo y cierra reservas sin que toques el móvil.</p>
            </div>
            <div className=&quot;relative z-10 flex flex-col items-center text-center group&quot;>
              <div className=&quot;w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg mb-6 group-hover:scale-110 group-hover:bg-black transition-all duration-500&quot;>3</div>
              <h3 className=&quot;text-2xl font-bold mb-4&quot;>Ticket Multiplicado</h3>
              <p className=&quot;text-gray-600 text-lg&quot;>En el local, piden más rápido gracias a cartas interactivas. Mesas veloces, camareros sin estrés y cajas que cuadran.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSITION TO HIGH TICKET */}
      <WhatsAppHero />
      <div id=&quot;automatizacion&quot;>
        <HighTicketEcosystem />
      </div>

      {/* TRANSICIÓN DE DOLOR AL MODELO DARK KITCHEN */}
      <section className=&quot;py-20 bg-[#050505] text-white relative overflow-hidden border-t border-white/10&quot;>
        {/* Glow Effects */}
        <div className=&quot;absolute top-0 right-1/4 w-96 h-96 bg-[#FF4500] rounded-full blur-[120px] opacity-20 pointer-events-none&quot;></div>
        <div className=&quot;absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[150px] opacity-10 pointer-events-none&quot;></div>
        <div className=&quot;absolute inset-0 opacity-20&quot; style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className=&quot;max-w-5xl mx-auto px-8 relative z-10 text-center&quot;>
          <div className=&quot;inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md&quot;>
            <span className=&quot;w-2 h-2 rounded-full bg-red-500 animate-pulse&quot;></span>
            El precio de improvisar
          </div>
          <h2 className=&quot;text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-8 text-balance&quot;>
            Si tu sistema es un caos, <span className=&quot;text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-orange-400 border-b-4 border-[#FF4500]/50 pb-1&quot;>más clientes significará tu ruina.</span>
          </h2>
          <p className=&quot;text-lg md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium text-pretty mb-12&quot;>
            Muchos negocios intentan escalar abriendo canales en 5 apps de delivery a la vez. ¿El resultado? Pierden hasta el 30% de rentabilidad en comisiones, colapsan los fogones y queman al equipo. El verdadero crecimiento exige una infraestructura quirúrgica.
          </p>
          <div className=&quot;w-px h-24 bg-gradient-to-b from-[#FF4500] to-transparent mx-auto&quot;></div>
        </div>
      </section>

      {/* SECCIÓN DARK KITCHEN */}
      <div id=&quot;dark-kitchen&quot;>
        <DarkKitchen />
      </div>

      {/* NUESTRO PROCESO */}
      <section className=&quot;py-16 md:py-24 bg-white&quot;>
        <div className=&quot;max-w-7xl mx-auto px-6 md:px-8&quot;>
          <div className=&quot;text-center max-w-4xl mx-auto mb-16 md:mb-20 space-y-6&quot;>
            <h2 className=&quot;text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-balance&quot;>Sin reuniones interminables. <br className=&quot;hidden sm:block&quot;/>Así de rápido trabajamos.</h2>
            <p className=&quot;text-lg md:text-xl text-gray-600 text-pretty&quot;>
              Sabemos que no tienes tiempo que perder. Nuestro proceso es claro, directo y sin letra pequeña.
            </p>
          </div>
          <div className=&quot;grid grid-cols-1 md:grid-cols-4 gap-6&quot;>
            <div className=&quot;bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300&quot;>
              <div className=&quot;text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors&quot;>1</div>
              <div className=&quot;text-4xl mb-4 relative z-10&quot;>📊</div>
              <h3 className=&quot;text-xl font-bold mb-2 relative z-10&quot;>Auditoría de Viabilidad</h3>
              <p className=&quot;text-gray-600 relative z-10&quot;>Analizamos tus números, capacidad operativa y fugas de capital para diseñar un plan exacto.</p>
            </div>
            <div className=&quot;bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300&quot;>
              <div className=&quot;text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors&quot;>2</div>
              <div className=&quot;text-4xl mb-4 relative z-10&quot;>🏗️</div>
              <h3 className=&quot;text-xl font-bold mb-2 relative z-10&quot;>Fundación Digital</h3>
              <p className=&quot;text-gray-600 relative z-10&quot;>Desplegamos tu ecosistema propio: carta interactiva, PWA y base de datos sin comisiones.</p>
            </div>
            <div className=&quot;bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300&quot;>
              <div className=&quot;text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors&quot;>3</div>
              <div className=&quot;text-4xl mb-4 relative z-10&quot;>🔥</div>
              <h3 className=&quot;text-xl font-bold mb-2 relative z-10&quot;>Inyección de Tráfico</h3>
              <p className=&quot;text-gray-600 relative z-10&quot;>Activamos el Plan Growth. Llenamos tus mesas los días valle y recuperamos tu inversión inicial.</p>
            </div>
            <div className=&quot;bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300&quot;>
              <div className=&quot;text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors&quot;>4</div>
              <div className=&quot;text-4xl mb-4 relative z-10&quot;>🤖</div>
              <h3 className=&quot;text-xl font-bold mb-2 relative z-10&quot;>Escalado Autónomo</h3>
              <p className=&quot;text-gray-600 relative z-10&quot;>Implementamos el Agente IA en WhatsApp o KDS multimarca cuando necesites absorber más volumen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className=&quot;bg-[#1A1A1A] py-12 border-t border-white/10&quot;>
        <div className=&quot;max-w-7xl mx-auto px-8 text-center&quot;>
          <p className=&quot;text-sm font-bold text-gray-500 uppercase tracking-widest mb-6&quot;>Funciona con las herramientas que ya usas a diario</p>
          <div className=&quot;flex flex-wrap justify-center items-center gap-8 md:gap-16&quot;>
            <div className=&quot;text-2xl font-black flex items-center gap-2&quot;><span className=&quot;text-green-500&quot;>WhatsApp</span></div>
            <div className=&quot;text-2xl font-black flex items-center gap-2&quot;><span className=&quot;text-blue-600&quot;>Facebook</span> / Instagram</div>
            <div className=&quot;text-2xl font-black flex items-center gap-2&quot;><span className=&quot;text-red-500&quot;>Google</span> Maps</div>
            <div className=&quot;text-2xl font-black flex items-center gap-2&quot;><span className=&quot;text-purple-600&quot;>Tarjetas</span> / Bizum</div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* FOOTER */}
      <footer className=&quot;bg-gray-900 text-white py-12 md:py-16 border-t border-gray-800&quot;>
        <div className=&quot;max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left&quot;>
          <div className=&quot;flex flex-col items-center md:items-start gap-4&quot;>
            <div className=&quot;text-2xl font-black tracking-tighter hover:scale-105 transition-transform cursor-pointer&quot;>
              Architect<span className=&quot;text-[#FF4500]&quot;>.Sys</span>
            </div>
            <div className=&quot;text-gray-400 text-sm font-medium&quot;>
              © {new Date().getFullYear()} Architect.Sys. Tu equipo para llenar tu restaurante.
            </div>
          </div>
          
          <div className=&quot;flex flex-col items-center md:items-end gap-6&quot;>
            <div className=&quot;flex gap-4&quot;>
              <a href=&quot;https://wa.me/34611499674&quot; className=&quot;w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF4500] hover:-translate-y-1 transition-all&quot;>
                <svg className=&quot;w-5 h-5&quot; fill=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;><path d=&quot;M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.437-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z&quot;/></svg>
              </a>
            </div>
            <div className=&quot;flex gap-4 text-sm text-gray-500 font-medium&quot;>
              <a href=&quot;/privacy&quot; className=&quot;hover:text-[#FF4500] transition-colors&quot;>Política de Privacidad</a>
              <span>|</span>
              <a href=&quot;/terms&quot; className=&quot;hover:text-[#FF4500] transition-colors&quot;>Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
