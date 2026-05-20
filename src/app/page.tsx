import React from 'react';
import ExitIntent from '@/components/ExitIntent';
import DarkKitchen from '@/components/DarkKitchen';
import DigitalPresenceValue from '@/components/sections/DigitalPresenceValue';
import TheTrojanHorse from '@/components/sections/TheTrojanHorse';
import EventLibraryHook from '@/components/sections/EventLibraryHook';
import HighTicketEcosystem from '@/components/sections/HighTicketEcosystem';
import AggressiveHero from '@/components/sections/AggressiveHero';
import WhatsAppHero from '@/components/sections/WhatsAppHero';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans selection:bg-[#FF4500] selection:text-white overflow-x-hidden">
      
      {/* CAPTURA DE SALIDA IA */}
      <ExitIntent />
      
      {/* NAVBAR */}
      <nav className="absolute top-0 w-full z-50 border-b border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="flex justify-between items-center py-5 px-8 max-w-7xl mx-auto">
          <div className="text-2xl font-black tracking-tighter text-white hover:scale-105 transition-transform cursor-pointer">
            Architect<span className="text-[#FF4500]">.Sys</span>
          </div>
          <a href="https://wa.me/34611499674?text=Hola,%20quiero%20solicitar%20la%20Auditoría%20Gratuita." className="hidden md:inline-flex bg-[#FF4500] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/50 hover:-translate-y-1 items-center gap-2">
            <span>Auditoría Gratuita</span>
          </a>
        </div>
      </nav>

      {/* NEW SECTION 1: AGGRESSIVE HERO (TRAFICO FRIO) */}
      <AggressiveHero />

      {/* SECTION 2: THE PAIN */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-4xl lg:text-5xl font-black text-center mb-20 max-w-4xl mx-auto">¿Te suena familiar esta <span className="text-red-500">pesadilla?</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="group bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-100 hover:border-red-200 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
              <div className="text-4xl mb-6 transform group-hover:scale-125 transition-transform duration-500">📉</div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">El Martes Vacío</h3>
              <p className="text-gray-600 leading-relaxed text-lg text-pretty">Gastas luz y pagas nóminas, pero el local está a la mitad. Necesitas que tus clientes vuelvan sin tener que rogarles.</p>
            </div>
            <div className="group bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-100 hover:border-red-200 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
              <div className="text-4xl mb-6 transform group-hover:scale-125 transition-transform duration-500">👻</div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">El Teléfono Fantasma</h3>
              <p className="text-gray-600 leading-relaxed text-lg text-pretty">Viernes, 21:00h. El teléfono suena y nadie lo coge. Acabas de perder dinero porque tu personal solo tiene dos manos.</p>
            </div>
            <div className="group bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-100 hover:border-red-200 hover:shadow-2xl hover:-translate-y-3 transition-all duration-500">
              <div className="text-4xl mb-6 transform group-hover:scale-125 transition-transform duration-500">🛵</div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-red-500 transition-colors">El Peaje de Glovo</h3>
              <p className="text-gray-600 leading-relaxed text-lg text-pretty">Las apps de delivery te roban el 30%. Trabajas para ellos, corres para ellos, pero el riesgo y el sudor lo pones tú.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FUNNEL */}
      <DigitalPresenceValue />
      
      <div id="solucion-base">
        <TheTrojanHorse />
      </div>

      <EventLibraryHook />

      {/* SUCCESS STORY 2: QR MENUS */}
      <section className="py-12 bg-[#FF4500] text-white">
        <div className="max-w-5xl mx-auto px-8 flex flex-col md:flex-row items-center gap-8">
           <div className="w-24 h-24 bg-white text-[#FF4500] rounded-full flex items-center justify-center text-4xl shrink-0 font-black shadow-2xl">⚡</div>
           <div>
              <h4 className="text-3xl font-black mb-3">"La Cervecería del Puerto" rota sus mesas un <span className="text-yellow-300">20% más rápido</span>.</h4>
              <p className="text-white/90 text-lg italic">"En la terraza perdíamos mucho tiempo tomando nota de las bebidas. Instalamos la Carta Interactiva con fotos que dan hambre. Ahora, el cliente se sienta, escanea y sabe qué quiere antes de que lleguemos a la mesa. Servimos más rápido y el ticket medio ha subido un 15%."</p>
           </div>
        </div>
      </section>

      {/* SECTION: STEP-BY-STEP SYSTEM */}
      <section className="py-24 bg-[#FDFCF8]">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-black mb-6">No somos informáticos. Somos tu socio comercial.</h2>
            <p className="text-xl text-gray-600">Así convertimos tu restaurante en una máquina bien engrasada.</p>
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
              <h3 className="text-2xl font-bold mb-4">Cierre Automático</h3>
              <p className="text-gray-600 text-lg">Tu Agente de IA atiende el WhatsApp en segundos, enamora al cliente y cierra la reserva o el pedido.</p>
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
      <HighTicketEcosystem />

      {/* SECCIÓN DARK KITCHEN */}
      <DarkKitchen />

      {/* NUESTRO PROCESO */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black leading-tight">Sin reuniones interminables. <br/>Así de rápido trabajamos.</h2>
            <p className="text-xl text-gray-600">
              Sabemos que no tienes tiempo que perder. Nuestro proceso es claro, directo y sin letra pequeña.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors">1</div>
              <div className="text-4xl mb-4 relative z-10">🤝</div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Acuerdo Claro</h3>
              <p className="text-gray-600 relative z-10">Hablamos por WhatsApp. Confirmamos los detalles y el plan que necesitas.</p>
            </div>
            <div className="bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors">2</div>
              <div className="text-4xl mb-4 relative z-10">🚀</div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Despliegue</h3>
              <p className="text-gray-600 relative z-10">Activamos tu entorno web, los menús digitales y tu agente de captación en 48h.</p>
            </div>
            <div className="bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors">3</div>
              <div className="text-4xl mb-4 relative z-10">📈</div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Crecimiento</h3>
              <p className="text-gray-600 relative z-10">Iniciamos las estrategias de atracción para llenar tu restaurante (Plan Growth).</p>
            </div>
            <div className="bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors">4</div>
              <div className="text-4xl mb-4 relative z-10">✅</div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Escalabilidad</h3>
              <p className="text-gray-600 relative z-10">Cuando no des abasto, implementamos el Recepcionista 24/7 en WhatsApp.</p>
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

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-2xl font-black tracking-tighter hover:scale-105 transition-transform cursor-pointer">
            Architect<span className="text-[#FF4500]">.Sys</span>
          </div>
          <div className="text-gray-400 text-sm font-medium">
            © {new Date().getFullYear()} Architect.Sys. Tu equipo para llenar tu restaurante.
          </div>
          <div className="flex gap-4">
            <a href="https://wa.me/34611499674" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FF4500] hover:-translate-y-1 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
