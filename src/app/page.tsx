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
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans selection:bg-[#FF4500] selection:text-white overflow-x-hidden">
      
      {/* CAPTURA DE SALIDA IA */}
      <ExitIntent />
      
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10 shadow-xl transition-all">
        <div className="flex flex-col md:flex-row justify-between items-center py-3 md:py-4 px-4 md:px-8 max-w-7xl mx-auto gap-3 md:gap-0">
          <div className="flex justify-between items-center w-full md:w-auto">
            <div className="text-xl md:text-2xl font-black tracking-tighter text-white hover:scale-105 transition-transform cursor-pointer">
              Architect<span className="text-[#FF4500]">.Sys</span>
            </div>
            <a href="https://wa.me/34611499674?text=Hola,%20quiero%20solicitar%20la%20Auditoría%20Gratuita." className="md:hidden inline-flex bg-[#FF4500] text-white px-4 py-2 rounded-full font-bold text-[10px] sm:text-xs hover:bg-orange-600 transition-all shadow-lg">
              Auditoría Gratuita
            </a>
          </div>
          
          <div className="flex items-center bg-[#1A1A1A]/90 border border-white/10 rounded-full p-1.5 shadow-[0_4px_30px_rgba(255,69,0,0.2)] backdrop-blur-md w-full md:w-auto overflow-x-auto justify-start md:justify-center animate-pulse" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            <a href="#suscripciones" className="whitespace-nowrap px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold text-gray-300 hover:text-white hover:bg-[#FF4500] hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] focus:bg-[#FF4500] focus:text-white transition-all">
              Suscripciones
            </a>
            <div className="w-px h-4 bg-white/20 shrink-0 mx-1"></div>
            <a href="#eventos" className="whitespace-nowrap px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold text-gray-300 hover:text-white hover:bg-[#FF4500] hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] focus:bg-[#FF4500] focus:text-white transition-all">
              Eventos
            </a>
            <div className="w-px h-4 bg-white/20 shrink-0 mx-1"></div>
            <a href="#automatizacion" className="whitespace-nowrap px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold text-gray-300 hover:text-white hover:bg-[#FF4500] hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] focus:bg-[#FF4500] focus:text-white transition-all">
              Automatización
            </a>
            <div className="w-px h-4 bg-white/20 shrink-0 mx-1"></div>
            <a href="#dark-kitchen" className="whitespace-nowrap px-4 py-1.5 md:px-5 md:py-2 rounded-full text-[10px] md:text-xs font-bold text-gray-300 hover:text-white hover:bg-[#FF4500] hover:shadow-[0_0_15px_rgba(255,69,0,0.5)] focus:bg-[#FF4500] focus:text-white transition-all">
              Dark Kitchen
            </a>
          </div>

          <a href="https://wa.me/34611499674?text=Hola,%20quiero%20solicitar%20la%20Auditoría%20Gratuita." className="hidden md:inline-flex bg-[#FF4500] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/50 hover:-translate-y-1 items-center gap-2">
            <span>Auditoría Gratuita</span>
          </a>
        </div>
      </nav>

      {/* NEW SECTION 1: AGGRESSIVE HERO (TRAFICO FRIO) */}
      <AggressiveHero />

      {/* NEW SECTION 2: VISION AND EMPATHY (Replaces the Pain 3-cards) */}
      <VisionAndEmpathy />

      {/* CORE FUNNEL */}
      <div id="suscripciones">
        <DigitalPresenceValue />
        <div id="solucion-base">
          <TheTrojanHorse />
        </div>
      </div>

      <div id="eventos">
        <EventLibraryHook />
      </div>

      {/* SUCCESS STORY 2: EVENT LIBRARY */}
      <section className="py-12 bg-[#FF4500] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-8 relative z-10">
           <div className="w-24 h-24 bg-white text-[#FF4500] rounded-full flex items-center justify-center text-5xl shrink-0 font-black shadow-2xl">🍻</div>
           <div>
              <h4 className="text-3xl font-black mb-3">"Taberna Los Arcos" facturó <span className="text-yellow-300">900€ extra en solo 2 horas</span> un jueves por la tarde.</h4>
              <p className="text-white/90 text-lg italic">"Los jueves de 18h a 20h solían ser horas de pura angustia, con el local casi vacío y el personal parado. Activamos una 'Cata Premium' de la Biblioteca de Eventos y en 48 horas agotamos plazas. Transformó un turno muerto en una experiencia sensorial ultra-premium que nos hizo facturar en dos horas lo que a veces nos costaba un día entero de trabajo."</p>
           </div>
        </div>
      </section>

      {/* SECTION: STEP-BY-STEP SYSTEM */}
      <section className="py-16 md:py-24 bg-[#FDFCF8]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-balance">No somos informáticos. Somos tu socio comercial.</h2>
            <p className="text-lg md:text-xl text-gray-600 text-pretty">Así convertimos tu restaurante en una máquina bien engrasada.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-16">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gradient-to-r from-gray-200 via-[#FF4500] to-gray-900 z-0 opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-4 border-[#FF4500] rounded-full flex items-center justify-center text-3xl font-black text-[#FF4500] shadow-lg mb-6 group-hover:scale-110 group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-500">1</div>
              <h3 className="text-2xl font-bold mb-4">Atracción Incesante</h3>
              <p className="text-gray-600 text-lg">Te inyectamos tráfico real. Cuando alguien busque dónde cenar, tú serás su única opción lógica.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-[#FF4500] rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg mb-6 group-hover:scale-110 transition-all duration-500 shadow-orange-500/40">2</div>
              <h3 className="text-2xl font-bold mb-1">Cierre Automático</h3>
              <span className="block text-[10px] text-[#FF4500] font-black uppercase tracking-widest mb-4 border border-[#FF4500]/30 rounded-full px-3 py-1">(Fase Avanzada)</span>
              <p className="text-gray-600 text-lg">Tu propio CRM con Agente IA atiende el WhatsApp en segundos, gestiona el flujo y cierra reservas sin que toques el móvil.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg mb-6 group-hover:scale-110 group-hover:bg-black transition-all duration-500">3</div>
              <h3 className="text-2xl font-bold mb-4">Ticket Multiplicado</h3>
              <p className="text-gray-600 text-lg">En el local, piden más rápido gracias a cartas interactivas. Mesas veloces, camareros sin estrés y cajas que cuadran.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRANSITION TO HIGH TICKET */}
      <WhatsAppHero />
      <div id="automatizacion">
        <HighTicketEcosystem />
      </div>

      {/* TRANSICIÓN DE DOLOR AL MODELO DARK KITCHEN */}
      <section className="py-20 bg-[#050505] text-white relative overflow-hidden border-t border-white/10">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF4500] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
        
        <div className="max-w-5xl mx-auto px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            El precio de improvisar
          </div>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-8 text-balance">
            Si tu sistema es un caos, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-orange-400 border-b-4 border-[#FF4500]/50 pb-1">más clientes significará tu ruina.</span>
          </h2>
          <p className="text-lg md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium text-pretty mb-12">
            Muchos negocios intentan escalar abriendo canales en 5 apps de delivery a la vez. ¿El resultado? Pierden hasta el 30% de rentabilidad en comisiones, colapsan los fogones y queman al equipo. El verdadero crecimiento exige una infraestructura quirúrgica.
          </p>
          <div className="w-px h-24 bg-gradient-to-b from-[#FF4500] to-transparent mx-auto"></div>
        </div>
      </section>

      {/* SECCIÓN DARK KITCHEN */}
      <div id="dark-kitchen">
        <DarkKitchen />
      </div>

      {/* NUESTRO PROCESO */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-balance">Sin reuniones interminables. <br className="hidden sm:block"/>Así de rápido trabajamos.</h2>
            <p className="text-lg md:text-xl text-gray-600 text-pretty">
              Sabemos que no tienes tiempo que perder. Nuestro proceso es claro, directo y sin letra pequeña.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors">1</div>
              <div className="text-4xl mb-4 relative z-10">📊</div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Auditoría de Viabilidad</h3>
              <p className="text-gray-600 relative z-10">Analizamos tus números, capacidad operativa y fugas de capital para diseñar un plan exacto.</p>
            </div>
            <div className="bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors">2</div>
              <div className="text-4xl mb-4 relative z-10">🏗️</div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Fundación Digital</h3>
              <p className="text-gray-600 relative z-10">Desplegamos tu ecosistema propio: carta interactiva, PWA y base de datos sin comisiones.</p>
            </div>
            <div className="bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors">3</div>
              <div className="text-4xl mb-4 relative z-10">🔥</div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Inyección de Tráfico</h3>
              <p className="text-gray-600 relative z-10">Activamos el Plan Growth. Llenamos tus mesas los días valle y recuperamos tu inversión inicial.</p>
            </div>
            <div className="bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors">4</div>
              <div className="text-4xl mb-4 relative z-10">🤖</div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Escalado Autónomo</h3>
              <p className="text-gray-600 relative z-10">Implementamos el Agente IA en WhatsApp o KDS multimarca cuando necesites absorber más volumen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="bg-[#1A1A1A] py-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-6">Funciona con las herramientas que ya usas a diario</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <div className="text-2xl font-black flex items-center gap-2"><span className="text-green-500">WhatsApp</span></div>
            <div className="text-2xl font-black flex items-center gap-2"><span className="text-blue-600">Facebook</span> / Instagram</div>
            <div className="text-2xl font-black flex items-center gap-2"><span className="text-red-500">Google</span> Maps</div>
            <div className="text-2xl font-black flex items-center gap-2"><span className="text-purple-600">Tarjetas</span> / Bizum</div>
          </div>
        </div>
      </section>

      <FAQ />

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 md:py-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="text-2xl font-black tracking-tighter hover:scale-105 transition-transform cursor-pointer">
              Architect<span className="text-[#FF4500]">.Sys</span>
            </div>
            <div className="text-gray-400 text-sm font-medium">
              © {new Date().getFullYear()} Architect.Sys. Tu equipo para llenar tu restaurante.
            </div>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-4">
              <a href="https://wa.me/34611499674" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF4500] hover:-translate-y-1 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.437-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              </a>
            </div>
            <div className="flex gap-4 text-sm text-gray-500 font-medium">
              <a href="/privacy" className="hover:text-[#FF4500] transition-colors">Política de Privacidad</a>
              <span>|</span>
              <a href="/terms" className="hover:text-[#FF4500] transition-colors">Términos y Condiciones</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
