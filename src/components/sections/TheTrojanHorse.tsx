&quot;use client&quot;;
import React, { useState } from 'react';
import ConsultingModal from './ConsultingModal';

export default function TheTrojanHorse() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className=&quot;bg-white py-24 border-t border-gray-100 relative overflow-hidden&quot;>
      {/* Elementos decorativos */}
      <div className=&quot;absolute top-0 right-0 w-[500px] h-[500px] bg-orange-50 rounded-full blur-[100px] opacity-50 -z-10 pointer-events-none&quot;></div>
      
      <div className=&quot;max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10&quot;>
        <div className=&quot;text-center max-w-4xl mx-auto mb-16 space-y-6&quot;>
          <div className=&quot;inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-[#FF4500] text-sm font-bold tracking-widest uppercase&quot;>
            <span className=&quot;w-2 h-2 rounded-full bg-[#FF4500] animate-pulse&quot;></span>
            🔥 FUNDACIÓN DIGITAL
          </div>
          <h2 className=&quot;text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-gray-900 text-balance&quot;>
            Moderniza tu local y dispara tu rentabilidad hoy.<br/>
            <span className=&quot;text-[#FF4500]&quot;>Recupera el control de tu negocio.</span>
          </h2>
          <p className=&quot;text-xl text-gray-700 max-w-2xl mx-auto font-medium&quot;>
            La infraestructura tecnológica premium que necesitas para que tus clientes pidan más rápido, reserven directamente en tu web y tu equipo trabaje sin estrés. Todo el control, bajo tu propia marca y sin depender de terceros.
          </p>
        </div>

        {/* Sección de Bonus &quot;El Pack de Arranque&quot; */}
        <div className=&quot;max-w-6xl mx-auto mb-20 relative&quot;>
          <div className=&quot;absolute -inset-1 bg-gradient-to-r from-[#FF4500] to-orange-300 rounded-[2.5rem] blur-xl opacity-20&quot;></div>
          <div className=&quot;relative bg-[#FDFCF8] rounded-[2.5rem] p-8 sm:p-10 lg:p-16 border border-orange-200 shadow-2xl&quot;>
            <div className=&quot;text-center mb-16&quot;>
              <div className=&quot;inline-block bg-red-100 text-red-600 px-6 py-2.5 rounded-full text-sm font-black tracking-widest uppercase mb-6 border border-red-200 shadow-sm&quot;>
                PROMOCIÓN DE LANZAMIENTO (POR TIEMPO LIMITADO)
              </div>
              <h3 className=&quot;text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight text-balance&quot;>
                Tu Pack de Arranque Exclusivo,<br/>
                <span className=&quot;text-[#FF4500]&quot;>incluido en tu activación.</span>
              </h3>
              <p className=&quot;text-gray-800 text-xl max-w-4xl mx-auto font-medium leading-relaxed&quot;>
                Nuestros clientes no empiezan desde cero. Activando hoy nuestra Base Operativa, te incluimos <strong className=&quot;bg-[#FF4500] text-white px-3 py-1 rounded-md mx-1 shadow-md&quot;>consultorías y activos premium</strong> que normalmente solo están al alcance de grandes cadenas. Queremos que la imagen de tu negocio brille con luz propia desde el primer día. Sin costes ocultos.
              </p>
            </div>

            <div className=&quot;grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10&quot;>
              
              {/* Bonus 1 */}
              <div className=&quot;bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group&quot;>
                <div className=&quot;absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform&quot;></div>
                <div className=&quot;w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm&quot;>📍</div>
                <h4 className=&quot;text-gray-900 font-black text-2xl mb-4&quot;>Auditoría de Fuga de Clientes (Google Maps)</h4>
                <p className=&quot;text-gray-700 text-lg mb-8 flex-grow leading-relaxed font-medium&quot;>
                  ¿Por qué el bar de la competencia sale primero cuando alguien busca &quot;dónde cenar&quot;? Analizamos tu ficha de negocio y te entregamos un <strong>informe médico en PDF</strong> con las acciones exactas que tú o tu encargado debéis aplicar hoy mismo para robarle ese tráfico a tu competencia.
                </p>
                <div className=&quot;mt-auto border-t border-gray-100 pt-6&quot;>
                  <div className=&quot;text-sm text-gray-500 font-bold uppercase tracking-wider mb-1&quot;>Precio habitual en agencia:</div>
                  <div className=&quot;flex items-center gap-4&quot;>
                    <span className=&quot;line-through decoration-red-500/50 decoration-4 text-gray-400 font-black text-3xl&quot;>350€</span>
                    <span className=&quot;text-[#FF4500] font-black text-4xl&quot;>GRATIS</span>
                  </div>
                </div>
              </div>

              {/* Bonus 2 */}
              <div className=&quot;bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group&quot;>
                <div className=&quot;absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform&quot;></div>
                <div className=&quot;w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm&quot;>📄</div>
                <h4 className=&quot;text-gray-900 font-black text-2xl mb-4&quot;>Ingeniería de Carta Física (Neuromarketing)</h4>
                <p className=&quot;text-gray-700 text-lg mb-8 flex-grow leading-relaxed font-medium&quot;>
                  Una carta fea en un PDF no vende. Trasladamos tu menú a un diseño físico elegante, ubicando estratégicamente tus <strong>platos de mayor margen de beneficio</strong> en los puntos donde la vista del cliente va primero. Te lo entregamos en alta resolución, listo para la imprenta.
                </p>
                <div className=&quot;mt-auto border-t border-gray-100 pt-6&quot;>
                  <div className=&quot;text-sm text-gray-500 font-bold uppercase tracking-wider mb-1&quot;>Valor de diseño estratégico:</div>
                  <div className=&quot;flex items-center gap-4&quot;>
                    <span className=&quot;line-through decoration-red-500/50 decoration-4 text-gray-400 font-black text-3xl&quot;>250€</span>
                    <span className=&quot;text-[#FF4500] font-black text-4xl&quot;>GRATIS</span>
                  </div>
                </div>
              </div>

              {/* Bonus 3 */}
              <div className=&quot;bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group&quot;>
                <div className=&quot;absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform&quot;></div>
                <div className=&quot;w-16 h-16 bg-orange-100 text-[#FF4500] rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm&quot;>🔥</div>
                <h4 className=&quot;text-gray-900 font-black text-2xl mb-4&quot;>Estrategia de Inyección de Tráfico (Días Valle)</h4>
                <p className=&quot;text-gray-700 text-lg mb-8 flex-grow leading-relaxed font-medium&quot;>
                  Los martes vacíos matan la rentabilidad. Te diseñamos un gancho irresistible (ej. un menú maridaje o tardeo) y la táctica paso a paso para promocionarlo en tu local usando tu nueva carta digital. <strong>El objetivo: llenar mesas el día más flojo de tu semana.</strong>
                </p>
                <div className=&quot;mt-auto border-t border-gray-100 pt-6&quot;>
                  <div className=&quot;text-sm text-gray-500 font-bold uppercase tracking-wider mb-1&quot;>Consultoría de negocio:</div>
                  <div className=&quot;flex items-center gap-4&quot;>
                    <span className=&quot;line-through decoration-red-500/50 decoration-4 text-gray-400 font-black text-3xl&quot;>300€</span>
                    <span className=&quot;text-[#FF4500] font-black text-4xl&quot;>GRATIS</span>
                  </div>
                </div>
              </div>

              {/* Bonus 4 */}
              <div className=&quot;bg-white border-2 border-gray-100 rounded-3xl p-8 sm:p-10 hover:border-orange-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full relative overflow-hidden group&quot;>
                <div className=&quot;absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform&quot;></div>
                <div className=&quot;w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-sm&quot;>📱</div>
                <h4 className=&quot;text-gray-900 font-black text-2xl mb-4&quot;>Kit de Anuncios y Lanzamiento en Redes</h4>
                <p className=&quot;text-gray-700 text-lg mb-8 flex-grow leading-relaxed font-medium&quot;>
                  Tu modernización debe hacer ruido. Para quitarte el &quot;síndrome de la página en blanco&quot;, te entregamos <strong>12 publicaciones profesionales</strong> (imágenes y textos persuasivos generados por IA). Solo tienes que copiar, pegar en tu Instagram y empezar a atraer miradas.
                </p>
                <div className=&quot;mt-auto border-t border-gray-100 pt-6&quot;>
                  <div className=&quot;text-sm text-gray-500 font-bold uppercase tracking-wider mb-1&quot;>Valor de agencia de contenidos:</div>
                  <div className=&quot;flex items-center gap-4&quot;>
                    <span className=&quot;line-through decoration-red-500/50 decoration-4 text-gray-400 font-black text-3xl&quot;>250€</span>
                    <span className=&quot;text-[#FF4500] font-black text-4xl&quot;>GRATIS</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Pricing Card Unica: Base Operativa Digital (Luminosa/Confiable) */}
        <div className=&quot;max-w-4xl mx-auto mt-16 animate-fade-in-up&quot;>
          <div className=&quot;bg-[#FDFCF8] rounded-[2.5rem] shadow-2xl relative flex flex-col overflow-hidden border-2 border-[#FF4500]&quot;>
            
            {/* Header del Servicio */}
            <div className=&quot;bg-[#FF4500] p-6 text-center&quot;>
              <h3 className=&quot;text-3xl md:text-4xl font-black text-white mb-2&quot;>Base Operativa Digital</h3>
              <p className=&quot;text-orange-100 font-bold text-lg&quot;>La infraestructura indispensable para recuperar el control de tu local.</p>
            </div>
            
            <div className=&quot;p-8 md:p-12&quot;>
              <div className=&quot;text-center mb-10&quot;>
                <div className=&quot;flex justify-center items-baseline gap-2 text-gray-900 mb-2&quot;>
                  <span className=&quot;text-7xl font-black&quot;>700€</span>
                </div>
                <div className=&quot;inline-block bg-orange-50 text-[#FF4500] font-black px-4 py-2 rounded-full text-sm mt-2 border border-orange-200 shadow-sm&quot;>
                  PAGO FRACCIONADO DISPONIBLE: 2 cuotas de 350€
                </div>
                <p className=&quot;text-gray-600 font-medium mt-4 max-w-lg mx-auto text-lg&quot;>
                  Servicio <strong className=&quot;text-gray-900 font-black&quot;>100% Llave en Mano</strong>. Nosotros diseñamos, programamos y publicamos todo el ecosistema. Tú solo dedícate a atender mesas. Sin alquileres abusivos: una vez activado, el sistema es tuyo.
                </p>
              </div>

              {/* Qué problemas soluciona (Sin Glovo, Enfoque en Visibilidad y Control) */}
              <div className=&quot;space-y-6 text-gray-700 mb-10&quot;>
                <div className=&quot;flex items-start gap-4&quot;>
                  <span className=&quot;flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 shrink-0 text-xl font-bold mt-1 shadow-sm&quot;>✓</span>
                  <div>
                    <span className=&quot;font-black text-gray-900 text-xl block mb-1&quot;>Control Total de tu Imagen.</span>
                    <p className=&quot;text-gray-600 font-medium leading-relaxed&quot;>Tu propia Web Profesional. Dejas de depender de directorios genéricos de internet y controlas exactamente qué ve tu cliente antes de visitarte.</p>
                  </div>
                </div>
                
                <div className=&quot;flex items-start gap-4&quot;>
                  <span className=&quot;flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 shrink-0 text-xl font-bold mt-1 shadow-sm&quot;>✓</span>
                  <div>
                    <span className=&quot;font-black text-gray-900 text-xl block mb-1&quot;>Mesas veloces, camareros sin estrés.</span>
                    <p className=&quot;text-gray-600 font-medium leading-relaxed&quot;>Carta Digital Interactiva ultra-rápida. El cliente se sienta, escanea y sabe lo que quiere. Aumenta el ticket medio y la rotación de mesas los fines de semana.</p>
                  </div>
                </div>

                <div className=&quot;flex items-start gap-4&quot;>
                  <span className=&quot;flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 shrink-0 text-xl font-bold mt-1 shadow-sm&quot;>✓</span>
                  <div>
                    <span className=&quot;font-black text-gray-900 text-xl block mb-1&quot;>Dejas de ser invisible.</span>
                    <p className=&quot;text-gray-600 font-medium leading-relaxed&quot;>Incluye la creación y optimización de tu entorno digital para captar a los turistas y vecinos que buscan dónde cenar en Google Maps antes que tu competencia.</p>
                  </div>
                </div>

                <div className=&quot;flex items-start gap-4&quot;>
                  <span className=&quot;flex items-center justify-center w-8 h-8 rounded-full bg-green-100 text-green-600 shrink-0 text-xl font-bold mt-1 shadow-sm&quot;>✓</span>
                  <div>
                    <span className=&quot;font-black text-gray-900 text-xl block mb-1&quot;>Base de Datos Propia.</span>
                    <p className=&quot;text-gray-600 font-medium leading-relaxed&quot;>Cada reserva en tu sistema es un contacto que te guardas. Empiezas a conocer quién te visita para poder fidelizarlo en el futuro.</p>
                  </div>
                </div>

                <div className=&quot;flex items-start gap-4 bg-orange-50 p-4 rounded-2xl border border-orange-100&quot;>
                  <span className=&quot;flex items-center justify-center w-8 h-8 rounded-full bg-orange-200 text-[#FF4500] shrink-0 text-xl font-bold mt-1 shadow-sm&quot;>🎁</span>
                  <div>
                    <span className=&quot;font-black text-[#FF4500] text-xl block mb-1&quot;>Los 4 Bonos Consultivos Incluidos.</span>
                    <p className=&quot;text-gray-700 font-medium leading-relaxed&quot;>Al reservar tu activación hoy, te llevas los más de 1.150€ en valor de los bonos estratégicos sin ningún tipo de coste adicional.</p>
                  </div>
                </div>
              </div>

              {/* Soporte continuo y Bono 2 meses */}
              <div className=&quot;bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200/50 rounded-2xl p-6 mb-10 text-center shadow-sm relative overflow-hidden&quot;>
                <div className=&quot;absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FF4500] to-orange-400&quot;></div>
                <h4 className=&quot;text-[#FF4500] font-black text-lg mb-2&quot;>🎁 Bono Especial: 2 Meses de Mantenimiento GRATIS</h4>
                <p className=&quot;text-gray-700 font-medium leading-relaxed&quot;>
                  Queremos que tu única preocupación sea atender mesas. Como regalo extra, cubrimos los primeros 2 meses de alojamiento en servidores ultrarrápidos a coste cero. Tiempo de sobra para afinar el sistema juntos. Después, el soporte premium será de solo <strong className=&quot;text-gray-900 font-black&quot;>69€/mes</strong>, cubriendo el servidor, protección anti-caídas y actualizaciones de seguridad. Sin permanencia.
                </p>
              </div>

              <div className=&quot;flex flex-col items-center gap-4&quot;>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className=&quot;w-full sm:w-auto bg-[#FF4500] text-white px-10 py-5 rounded-full font-black text-xl md:text-2xl hover:bg-orange-600 transition-colors shadow-[0_10px_30px_rgba(255,69,0,0.4)] hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(255,69,0,0.6)] flex items-center justify-center gap-3&quot;
                >
                  Agendar Consultoría y Activar
                  <svg className=&quot;w-6 h-6&quot; fill=&quot;none&quot; stroke=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;><path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth=&quot;2&quot; d=&quot;M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z&quot;></path></svg>
                </button>
                <a href=&quot;https://wa.me/34611499674?text=Hola,%20tengo%20dudas%20urgentes%20sobre%20la%20Base%20Operativa.&quot; className=&quot;text-gray-500 font-bold hover:text-[#25D366] transition-colors underline decoration-transparent hover:decoration-[#25D366] underline-offset-4 text-sm mt-2&quot;>
                  ¿Tienes dudas urgentes? Habla con un asesor por WhatsApp
                </a>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Modal de Agendamiento */}
      <ConsultingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

    </section>
  );
}
