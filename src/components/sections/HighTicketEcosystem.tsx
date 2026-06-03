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
              <h3 className="text-3xl font-black">Recepcionista IA + CRM de Reservas</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                Un agente híbrido (vía Kommo) conectado a tu WhatsApp. Responde en segundos, califica al cliente y lo mueve por un embudo visual de reservas 24/7.
              </p>
              
              <ul className="space-y-4 font-medium">
                <li className="flex items-center gap-3"><span className="text-2xl">🤖</span> <strong>Integración Meta API + Kommo CRM</strong></li>
                <li className="flex items-center gap-3"><span className="text-2xl">👀</span> <strong>Modo Híbrido:</strong> Observa o intercede en tiempo real.</li>
                <li className="flex items-center gap-3"><span className="text-2xl">📊</span> <strong>Pipeline Visual:</strong> Control total del flujo de cada mesa.</li>
              </ul>
            </div>
            
            <div className="bg-gray-900 p-8 rounded-3xl flex flex-col items-center justify-center text-center transform md:rotate-2 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-12 top-6 bg-yellow-400 text-black text-[10px] font-black px-12 py-1 rotate-45 tracking-widest shadow-xl z-20">SETUP EXPRESS</div>
              
              {/* Detailed Breakdown */}
              <div className="w-full text-left mb-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-3">
                  <div>
                    <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Pago Único (Setup)</div>
                    <div className="text-4xl font-black text-white">450€</div>
                  </div>
                </div>
                <ul className="text-xs text-gray-400 space-y-2 mb-6">
                  <li className="flex gap-2 items-start"><span className="text-green-400">✓</span> <span>Conexión de tu cuenta a Meta API</span></li>
                  <li className="flex gap-2 items-start"><span className="text-green-400">✓</span> <span>Diseño del Pipeline en Kommo CRM</span></li>
                  <li className="flex gap-2 items-start"><span className="text-green-400">✓</span> <span>Entrenamiento del Prompt con tu marca</span></li>
                </ul>

                <div className="flex justify-between items-end border-b border-white/10 pb-2 mb-3">
                  <div>
                    <div className="text-gray-400 font-bold uppercase tracking-widest text-xs">Mantenimiento</div>
                    <div className="text-4xl font-black text-white">69€<span className="text-sm font-normal text-gray-500">/mes</span></div>
                  </div>
                </div>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li className="flex gap-2 items-start"><span className="text-green-400">✓</span> <span>Licencia oficial de Kommo CRM incluida</span></li>
                  <li className="flex gap-2 items-start"><span className="text-green-400">✓</span> <span>Consumo de Tokens IA (hasta 1.500 chats)</span></li>
                  <li className="flex gap-2 items-start"><span className="text-green-400">✓</span> <span>Soporte técnico ante actualizaciones de Meta</span></li>
                </ul>
              </div>
              
              <div className="w-full bg-white/5 border border-white/10 rounded-xl p-3 mb-6 text-left relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF4500]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="block text-[#FF4500] font-black text-xs mb-1 uppercase tracking-wider text-center relative z-10">🌟 Ventaja Socio Growth</span>
                <span className="text-xs text-gray-400 block text-center relative z-10">Si estás suscrito al plan Growth (299€/mes), tu cuota de mantenimiento de IA es <strong className="text-white">0€/mes</strong> para siempre.</span>
              </div>

              {/* ROI BOX */}
              <div className="w-full bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 text-left transform transition-transform hover:scale-105">
                <h4 className="text-green-400 font-black text-[10px] uppercase tracking-wider mb-2 flex items-center gap-2"><span>📊</span> Las matemáticas del finde</h4>
                <p className="text-xs text-green-100/80 leading-relaxed">
                  Perder 4 llamadas un viernes son 250€ perdidos. Salvando <strong>solo 1 mesa de 4 personas al mes</strong>, el sistema se paga solo. El resto es beneficio limpio a tu caja.
                </p>
              </div>
              
              <a href="https://wa.me/34611499674?text=Hola,%20quiero%20instalar%20el%20Recepcionista%20IA%20y%20el%20CRM." className="w-full bg-white text-gray-900 px-6 py-4 rounded-full font-black text-lg hover:bg-gray-200 transition-colors shadow-xl">
                Solicitar Instalación
              </a>
              <p className="text-[10px] text-gray-500 mt-4">*Requiere infraestructura digital previa o validación de volumen de negocio.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
