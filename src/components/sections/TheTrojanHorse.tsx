import React from 'react';

export default function TheTrojanHorse() {
  return (
    <section className="bg-white py-24 border-t border-gray-100 relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] opacity-50 -z-10 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-[#FF4500] text-sm font-bold tracking-widest uppercase">
            <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse"></span>
            El Primer Paso Lógico
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-gray-900 text-balance">
            Tapa la fuga de dinero hoy.<br/>
            <span className="text-[#FF4500]">Por lo que te cuesta invitar a una ronda.</span>
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto font-medium">
            El sistema para que los clientes pidan más, paguen más rápido y el camarero no pierda la cabeza. Elige el modelo que mejor se adapte a tu flujo de caja.
          </p>
        </div>

        {/* Sección de Bonus "El Pack de Arranque" - MOVIDA ARRIBA */}
        <div className="max-w-6xl mx-auto mb-24 relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF4500] to-orange-300 rounded-[2.5rem] blur-xl opacity-20"></div>
          <div className="relative bg-[#FDFCF8] rounded-[2.5rem] p-8 sm:p-10 lg:p-16 border border-orange-200 shadow-2xl">
            <div className="text-center mb-16">
              <div className="inline-block bg-red-100 text-red-600 px-6 py-2.5 rounded-full text-sm font-black tracking-widest uppercase mb-6 border border-red-200 shadow-sm">
                PROMOCIÓN DE LANZAMIENTO (POR TIEMPO LIMITADO)
              </div>
              <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight text-balance">
                Tu Pack de Arranque Exclusivo,<br/>
                <span className="text-[#FF4500]">incluido en tu activación.</span>
              </h3>
              <p className="text-gray-800 text-xl max-w-4xl mx-auto font-medium leading-relaxed">
                Activando hoy cualquiera de nuestros planes, te incluimos <strong className="bg-[#FF4500] text-white px-3 py-1 rounded-md mx-1 shadow-md">bonos exclusivos</strong> valorados en 620€ para que la imagen de tu negocio brille con luz propia desde el primer día. Sin costes ocultos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              
              {/* Bonus 1 */}
              <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10"></div>
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm">📍</div>
                <h4 className="text-gray-900 font-black text-2xl mb-4">Auditoría 1 a 1 de Google Maps & Redes</h4>
                <p className="text-gray-700 text-lg mb-8 flex-grow leading-relaxed font-medium">
                  Analizamos tu ficha de negocio y tus perfiles sociales para detectar por qué tus clientes eligen a la competencia. Te entregamos un informe detallado en PDF con el paso a paso exacto para corregirlo, y lo revisamos contigo en una <strong className="text-gray-900 font-black">consultoría privada de 20 minutos</strong> para garantizar que apliques los cambios correctamente.
                </p>
                <div className="mt-auto border-t border-gray-100 pt-6">
                  <div className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Valor real del servicio:</div>
                  <div className="flex items-center gap-4">
                    <span className="line-through decoration-red-500/50 decoration-4 text-gray-400 font-black text-3xl">150€</span>
                    <span className="text-[#FF4500] font-black text-4xl">GRATIS</span>
                  </div>
                </div>
              </div>

              {/* Bonus 2 */}
              <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -z-10"></div>
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm">📄</div>
                <h4 className="text-gray-900 font-black text-2xl mb-4">Diseño de Carta Física Premium</h4>
                <p className="text-gray-700 text-lg mb-8 flex-grow leading-relaxed font-medium">
                  Tu digitalización debe ser coherente en el mundo físico. Tomamos el menú digital que te hemos creado y lo maquetamos en un PDF de alta resolución. Un diseño minimalista y elegante, con los márgenes de sangrado exactos, preparado para que solo tengas que enviarlo a tu imprenta de confianza.
                </p>
                <div className="mt-auto border-t border-gray-100 pt-6">
                  <div className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Valor real del servicio:</div>
                  <div className="flex items-center gap-4">
                    <span className="line-through decoration-red-500/50 decoration-4 text-gray-400 font-black text-3xl">150€</span>
                    <span className="text-[#FF4500] font-black text-4xl">GRATIS</span>
                  </div>
                </div>
              </div>

              {/* Bonus 3 */}
              <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10"></div>
                <div className="w-16 h-16 bg-orange-100 text-[#FF4500] rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm">🔥</div>
                <h4 className="text-gray-900 font-black text-2xl mb-4">Estrategia de Venta Irresistible Local</h4>
                <p className="text-gray-700 text-lg mb-8 flex-grow leading-relaxed font-medium">
                  Diseñamos una promoción específica y muy atractiva para tu local (por ejemplo, un descuento cruzado en horas valle o un menú maridaje) y la destacamos estratégicamente en tu nueva carta digital. El objetivo: disparar las ventas de un plato concreto con alto margen de beneficio en los días más lentos.
                </p>
                <div className="mt-auto border-t border-gray-100 pt-6">
                  <div className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Valor real del servicio:</div>
                  <div className="flex items-center gap-4">
                    <span className="line-through decoration-red-500/50 decoration-4 text-gray-400 font-black text-3xl">120€</span>
                    <span className="text-[#FF4500] font-black text-4xl">GRATIS</span>
                  </div>
                </div>
              </div>

              {/* Bonus 4 */}
              <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10"></div>
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm">📱</div>
                <h4 className="text-gray-900 font-black text-2xl mb-4">Pack de Lanzamiento Redes Sociales</h4>
                <p className="text-gray-700 text-lg mb-8 flex-grow leading-relaxed font-medium">
                  Para que la modernización de tu local no pase desapercibida, te entregamos un pack de <strong className="text-gray-900 font-black">12 publicaciones profesionales</strong> diseñadas mediante Inteligencia Artificial. Textos persuasivos e imágenes de alta calidad listas para subir a tu Instagram o Facebook, generando expectación y atrayendo nuevas reservas.
                </p>
                <div className="mt-auto border-t border-gray-100 pt-6">
                  <div className="text-sm text-gray-500 font-bold uppercase tracking-wider mb-1">Valor real del servicio:</div>
                  <div className="flex items-center gap-4">
                    <span className="line-through decoration-red-500/50 decoration-4 text-gray-400 font-black text-3xl">200€</span>
                    <span className="text-[#FF4500] font-black text-4xl">GRATIS</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-6xl mx-auto">
          
          {/* Tarjeta 1: Sistema en Propiedad */}
          <div className="flex-[3] bg-[#FDFCF8] rounded-[2rem] border-2 border-gray-200 shadow-xl relative flex flex-col overflow-hidden hover:border-[#FF4500] transition-colors duration-300">
            <div className="p-8 lg:p-10 flex flex-col flex-1">
              <div className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-6 self-start border border-gray-200">
                PAGO FRACCIONADO DISPONIBLE
              </div>
              <h3 className="text-3xl font-black text-gray-900 mb-2">Sistema en Propiedad</h3>
              <p className="text-gray-600 mb-6 font-medium text-lg">Tu web, tu carta y tu base de datos. Sin alquileres.</p>
              
              <div className="flex items-baseline gap-1 text-gray-900 mb-2">
                <span className="text-6xl font-black">700€</span>
              </div>
              <p className="text-gray-500 font-medium mb-8">Pago único de configuración inicial.</p>

              <ul className="space-y-6 text-gray-800 font-medium flex-1 mb-8">
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 shrink-0 mt-1">✓</span>
                  <div><span className="font-bold text-gray-900 block">Ecosistema Tuyo al 100%.</span> Te montamos la Web Premium, la Carta Digital Interactiva y te damos acceso total al sistema.</div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 shrink-0 mt-1">✓</span>
                  <div><span className="font-bold text-gray-900 block">Facilidades de Pago.</span> Puedes dividirlo en 2 pagos cómodos de 350€ (Al iniciar y al entregarte el sistema).</div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 text-green-600 shrink-0 mt-1">✓</span>
                  <div><span className="font-bold text-gray-900 block">Mantenimiento y Servidores.</span> Cuota reducida de 69€/mes a partir del tercer mes para mantener todo online.</div>
                </li>
              </ul>

              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8 text-center">
                <span className="text-[#FF4500] font-black uppercase text-sm block mb-1">🎁 REGALO DE BIENVENIDA</span>
                <span className="text-gray-700 text-sm font-medium">Te regalamos los 2 primeros meses de mantenimiento (Ahorro de 138€).</span>
              </div>

              <a 
                href="https://wa.me/34611499674?text=Hola,%20quiero%20empezar%20con%20el%20Sistema%20en%20Propiedad" 
                className="w-full bg-gray-900 text-white px-8 py-5 rounded-full font-black text-xl hover:bg-[#FF4500] transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Comprar Sistema Propio
              </a>
            </div>
          </div>

          {/* Tarjeta 2: Suscripción Growth All-in-One */}
          <div className="flex-[3] bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[2rem] border-2 border-[#FF4500] shadow-2xl relative transform lg:scale-105 z-10 flex flex-col overflow-hidden">
            <div className="bg-[#FF4500] text-white text-center py-3 text-sm font-black uppercase tracking-widest">
              NUESTRO SERVICIO ESTRELLA
            </div>
            <div className="p-8 lg:p-10 flex flex-col flex-1">
              <h3 className="text-3xl font-black mb-2">Suscripción "All-in-One"</h3>
              <p className="text-gray-400 mb-6 font-medium text-lg">Nosotros nos encargamos de llenarte el restaurante.</p>
              
              <div className="flex items-baseline gap-1 text-[#FF4500] mb-2">
                <span className="text-6xl font-black text-white">249€</span>
                <span className="text-2xl font-bold text-gray-400">/mes</span>
              </div>
              <p className="text-gray-400 font-medium mb-8">Sin coste de setup inicial.</p>

              <ul className="space-y-6 text-gray-300 font-medium flex-1 mb-8 text-base">
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FF4500]/20 text-[#FF4500] shrink-0 mt-1">✓</span>
                  <div><span className="font-bold text-white block">Todo lo del Sistema Propio.</span> Web, carta interactiva y servidores incluidos.</div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FF4500]/20 text-[#FF4500] shrink-0 mt-1">✓</span>
                  <div><span className="font-bold text-white block">Acceso a la Biblioteca de Eventos.</span> Eliges un evento ganador y nosotros te montamos la campaña de Ads gratis (tú solo pagas la publicidad a Meta).</div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FF4500]/20 text-[#FF4500] shrink-0 mt-1">✓</span>
                  <div><span className="font-bold text-white block">Comisión a Éxito.</span> Si el evento te revienta la caja de facturación, nos llevamos un 20% del beneficio neto. Si no ganas, no ganamos.</div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#FF4500]/20 text-[#FF4500] shrink-0 mt-1">✓</span>
                  <div><span className="font-bold text-white block">Agente IA WhatsApp Incluido.</span> El mantenimiento mensual de la IA (39€/mes) está cubierto en esta cuota.</div>
                </li>
              </ul>

              <a 
                href="https://wa.me/34611499674?text=Hola,%20quiero%20solicitar%20el%20plan%20All-in-One" 
                className="w-full bg-[#FF4500] text-white px-8 py-5 rounded-full font-black text-xl hover:bg-orange-600 transition-colors shadow-[0_10px_30px_rgba(255,69,0,0.3)] flex items-center justify-center gap-2"
              >
                Solicitar Plan All-in-One
              </a>
            </div>
          </div>

        </div>

        {/* Add-on: Agente Recepcionista IA */}
        <div className="max-w-4xl mx-auto mt-16 bg-white border border-gray-200 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="text-lg">🤖</span> Add-on Opcional
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">Instalación Agente IA en WhatsApp</h3>
            <p className="text-gray-600 font-medium text-pretty">Entrenamos a un recepcionista virtual inteligente que atiende a tus clientes 24/7 en tu propio número de WhatsApp. Cierra reservas mientras duermes.</p>
          </div>
          <div className="text-center md:text-right shrink-0 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="text-3xl font-black text-gray-900 mb-1">290€ <span className="text-lg text-gray-500 font-medium">Setup</span></div>
            <div className="text-sm text-gray-500 font-bold mb-4">+ 39€/mes (Operativa IA)</div>
            <p className="text-xs text-gray-400 italic max-w-[200px] mx-auto">*La cuota mensual ya está incluida si tienes el plan All-in-One.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
