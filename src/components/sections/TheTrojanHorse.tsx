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

        {/* Pricing Cards - AHORA ABAJO DE LOS BONOS */}
        <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 max-w-6xl mx-auto">
          
          {/* Tarjeta 1: Suscripción */}
          <div className="flex-[3] bg-[#FDFCF8] rounded-[2rem] border-2 border-[#FF4500] shadow-2xl relative transform lg:scale-105 z-10 flex flex-col overflow-hidden">
            <div className="bg-[#FF4500] text-white text-center py-3 text-sm font-black uppercase tracking-widest">
              Recomendado para empezar
            </div>
            <div className="p-8 lg:p-10 flex flex-col flex-1">
              <h3 className="text-3xl font-black text-gray-900 mb-2">Suscripción Base</h3>
              <p className="text-gray-600 mb-6 font-medium text-lg">Despliegue rápido. Digitaliza tu local hoy.</p>
              
              <div className="flex items-baseline gap-1 text-[#FF4500] mb-8">
                <span className="text-7xl font-black">49€</span>
                <span className="text-2xl font-bold opacity-80">/mes</span>
              </div>

              {/* Contenido Ampliado (Fusión Copys) */}
              <ul className="space-y-6 text-gray-800 font-medium flex-1 mb-8">
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#FF4500] shrink-0 mt-0.5">1</span>
                  <div>
                    <span className="font-bold text-lg block text-gray-900">Tu Menú Siempre Perfecto</span>
                    <span className="text-base text-gray-700 leading-relaxed block mt-1">Olvídate de tachar precios con bolígrafo. ¿Sube la cerveza? ¿Se acaba un plato? Lo cambias tú mismo desde el móvil en dos toques. Sin depender de nadie.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#FF4500] shrink-0 mt-0.5">2</span>
                  <div>
                    <span className="font-bold text-lg block text-gray-900">Recepcionista Inteligente (Web)</span>
                    <span className="text-base text-gray-700 leading-relaxed block mt-1">Un asistente 24/7 integrado en tu carta digital que responde si hay opciones sin gluten o atrapa los datos del cliente mientras tú sacas el servicio.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#FF4500] shrink-0 mt-0.5">3</span>
                  <div>
                    <span className="font-bold text-lg block text-gray-900">Soporte Técnico Real</span>
                    <span className="text-base text-gray-700 leading-relaxed block mt-1">Si la plataforma se cae, nosotros respondemos. Mantenimiento y actualizaciones incluidas para que tu negocio nunca pare.</span>
                  </div>
                </li>
              </ul>

              {/* Add-ons integrados en la tarjeta */}
              <div className="bg-white border border-orange-100 rounded-xl p-6 mb-8">
                <h4 className="text-sm font-black uppercase text-gray-500 tracking-wider mb-4">Opciones para personalizar tu arranque:</h4>
                <div className="space-y-3 text-base">
                  <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-700">+ Dominio Propio (.com o .es)</span> <span className="font-bold text-gray-900">15€/año</span></div>
                  <div className="flex justify-between border-b border-gray-100 pb-2"><span className="text-gray-700">+ Diseño Web a Medida</span> <span className="font-bold text-gray-900">99€ (Pago único)</span></div>
                  <div className="flex justify-between"><span className="text-gray-700">+ QRs Físicos en Metacrilato</span> <span className="font-bold text-gray-900">35€ (Instalación)</span></div>
                </div>
              </div>

              <a 
                href="#" 
                className="w-full bg-[#FF4500] text-white px-8 py-5 rounded-full font-black text-xl hover:bg-orange-600 transition-colors shadow-[0_10px_30px_rgba(255,69,0,0.3)] hover:shadow-[0_10px_40px_rgba(255,69,0,0.5)] flex items-center justify-center gap-2"
              >
                Empezar ahora por 49€
              </a>
            </div>
          </div>

          {/* Tarjeta 2: Pago Único (Licencia) */}
          <div className="flex-[2] bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[2rem] border border-gray-700 shadow-2xl relative transform transition-transform duration-500 flex flex-col mt-8 lg:mt-4">
            <div className="p-8 lg:p-10 flex flex-col flex-1">
              <div className="inline-block bg-white/10 text-gray-300 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-wider mb-8 self-start border border-white/10">
                PARA LOS QUE LO QUIEREN TODO
              </div>
              <h3 className="text-2xl font-black mb-3">Licencia Completa</h3>
              <p className="text-gray-400 mb-8 font-medium text-lg">Pagas una vez. Es tuyo para siempre. Cero cuotas mensuales.</p>
              
              <div className="flex items-baseline gap-1 mb-10">
                <span className="text-6xl font-black text-white">450€</span>
              </div>

              <ul className="space-y-6 text-gray-300 font-medium flex-1 mb-10 text-base">
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 shrink-0 mt-1">✓</span>
                  <div><span className="font-bold text-white block">Tu Web a Medida Incluida.</span> No usamos plantillas, diseñamos tu carta desde cero con tu marca.</div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 shrink-0 mt-1">✓</span>
                  <div><span className="font-bold text-white block">Dominio Propio Incluido (1er año).</span> La dirección profesional de tu local en internet.</div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 shrink-0 mt-1">✓</span>
                  <div><span className="font-bold text-white block">Sin Ataduras.</span> El código y la plataforma son 100% tuyos. Ideal si no quieres gastos fijos.</div>
                </li>
                <li className="flex items-start gap-4">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 shrink-0 mt-1">✓</span>
                  <div><span className="font-bold text-white block">Mismas Ventajas Base.</span> Carta interactiva y Asistente IA, pero sin pagar mes a mes.</div>
                </li>
                <li className="flex items-start gap-4 mt-6 pt-6 border-t border-white/10">
                  <span className="flex items-center justify-center w-6 h-6 rounded-full bg-transparent border border-gray-600 text-gray-500 shrink-0 mt-0.5">ℹ</span>
                  <div className="text-sm text-gray-400">Los QRs físicos en metacrilato se pueden añadir en el paso siguiente por 35€.</div>
                </li>
              </ul>

              <a 
                href="#" 
                className="w-full bg-white text-gray-900 px-8 py-5 rounded-full font-black text-xl hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Comprar Licencia (450€)
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
