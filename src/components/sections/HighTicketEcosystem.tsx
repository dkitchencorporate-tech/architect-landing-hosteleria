import React from 'react';

export default function HighTicketEcosystem() {
  return (
    <section className="bg-[#FDFCF8] py-24 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-8">
        <div className="text-center mb-16">
          <p className="text-[#FF4500] font-bold tracking-widest uppercase text-sm mb-4">Para restaurantes consolidados</p>
          <h2 className="text-4xl font-black text-gray-900 mb-6">El Ecosistema 24/7</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Cuando tu problema ya no es atraer clientes, sino gestionar el volumen sin quemar a tu equipo.</p>
        </div>

        <div className="bg-[#FF4500] rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-[0_20px_50px_rgba(255,69,0,0.3)] text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-[50px] pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <h3 className="text-3xl font-black">El Recepcionista IA Integrado</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Un agente conectado a tu WhatsApp real que responde a los clientes en 2 segundos, consulta disponibilidad y anota reservas 24 horas al día, 7 días a la semana.
              </p>
              
              <ul className="space-y-4 font-medium">
                <li className="flex items-center gap-3"><span className="text-2xl">🤖</span> Integración Meta Cloud API (WhatsApp)</li>
                <li className="flex items-center gap-3"><span className="text-2xl">⚡</span> Motor de Reservas Inteligente</li>
                <li className="flex items-center gap-3"><span className="text-2xl">🌐</span> Web Premium de Alta Conversión incluida</li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-3xl flex flex-col items-center justify-center text-center transform md:rotate-2 shadow-2xl">
              <div className="text-gray-400 font-bold uppercase tracking-widest text-xs mb-2">Pago Único (Setup)</div>
              <div className="text-6xl font-black mb-1">650€</div>
              <div className="text-gray-400 font-medium mb-6 text-sm">+ 99€/mes mantenimiento de servidor IA</div>
              
              <a href="https://wa.me/34611499674?text=Hola,%20tengo%20volumen%20y%20necesito%20el%20Recepcionista%2024/7." className="w-full bg-white text-gray-900 px-6 py-4 rounded-full font-black text-lg hover:bg-gray-200 transition-colors">
                Auditar mi restaurante
              </a>
              <p className="text-[10px] text-gray-500 mt-4">*Requiere aprobación previa. Solo instalamos este ecosistema si tu volumen de reservas justifica la inversión.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
