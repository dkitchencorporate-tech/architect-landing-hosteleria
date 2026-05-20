import React from 'react';
import DemoLauncher from '@/components/DemoLauncher';

export default function WhatsAppHero() {
  return (
    <section className="relative w-full py-24 flex items-center justify-center overflow-hidden bg-black group border-t border-white/10">
        <div className="absolute inset-0 w-full h-full">
          <img src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1920" alt="Restaurante lleno" className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-[10s] ease-out opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-white space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-[#FF4500] text-sm font-bold tracking-widest uppercase cursor-default">
              <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse"></span>
              Paso 2: Automatización Total
            </div>
            <h2 className="text-4xl lg:text-6xl font-black leading-[1.1] tracking-tight">
              Tú cocina. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-orange-400">La IA llena el local.</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-lg leading-relaxed font-medium">
              El teléfono suena, tú estás sirviendo platos y pierdes reservas de mesas grandes. El Recepcionista IA atiende WhatsApp, cierra reservas e integra los pagos.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <DemoLauncher />
            </div>
          </div>
          <div className="hidden lg:flex justify-end relative">
            <div className="relative w-[320px] h-[650px] bg-white rounded-[3rem] border-[12px] border-gray-900 shadow-[0_0_50px_rgba(255,69,0,0.3)] overflow-hidden flex flex-col transform rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-700 ease-out">
              <div className="absolute top-0 inset-x-0 h-6 bg-gray-900 rounded-b-3xl w-40 mx-auto z-20"></div>
              <div className="bg-[#075E54] pt-12 pb-4 px-4 text-white flex items-center gap-3 shadow-md z-10">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl animate-pulse">🤖</div>
                <div>
                  <div className="font-bold">Recepcionista IA</div>
                  <div className="text-xs text-white/70">Escribiendo...</div>
                </div>
              </div>
              <div className="flex-1 bg-[#E5DDD5] p-4 flex flex-col gap-4 overflow-hidden relative">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                <div className="relative bg-white p-3 rounded-xl rounded-tl-none self-start shadow-sm text-sm max-w-[85%]">
                  Hola, ¿tenéis mesa para 4 esta noche a las 21:30?
                  <div className="text-[10px] text-gray-400 text-right mt-1">20:15</div>
                </div>
                <div className="relative bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none self-end shadow-sm text-sm max-w-[85%] mt-2">
                  ¡Hola! Sí, tengo una mesa libre para 4 personas a las 21:30. ¿A qué nombre la reservo? 🍽️
                </div>
                <div className="relative bg-white p-3 rounded-xl rounded-tl-none self-start shadow-sm text-sm max-w-[85%] mt-2 animate-fade-in-up" style={{animationDelay: '1.5s'}}>
                  A nombre de Carlos.
                  <div className="text-[10px] text-gray-400 text-right mt-1">20:16</div>
                </div>
                <div className="relative bg-[#DCF8C6] p-3 rounded-xl rounded-tr-none self-end shadow-sm text-sm max-w-[85%] mt-2 animate-fade-in-up" style={{animationDelay: '2.5s'}}>
                  Reserva confirmada. ¡Os esperamos! ✅
                  <div className="text-[10px] text-gray-500 text-right mt-1">20:16</div>
                </div>
              </div>
            </div>
            <div className="absolute -left-10 bottom-20 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-4 animate-bounce z-20">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">💰</div>
              <div>
                <div className="text-sm text-gray-500 font-bold">Reserva Cerrada</div>
                <div className="text-lg font-black text-gray-900">+ 120€</div>
              </div>
            </div>
          </div>
        </div>
      </section>
  );
}
