import React from 'react';

export default function VisionAndEmpathy() {
  return (
    <section className=&quot;bg-white py-20 md:py-32 border-y border-gray-100 relative overflow-hidden&quot;>
      {/* Elementos decorativos sutiles */}
      <div className=&quot;absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none&quot; style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className=&quot;absolute -top-40 -right-40 w-96 h-96 bg-orange-50 rounded-full blur-[100px] pointer-events-none&quot;></div>
      
      <div className=&quot;max-w-4xl mx-auto px-6 md:px-8 relative z-10&quot;>
        
        {/* Etiqueta de Visión */}
        <div className=&quot;flex justify-center mb-10&quot;>
          <div className=&quot;inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-[#FF4500] text-sm font-bold tracking-widest uppercase border border-orange-100 shadow-sm&quot;>
            <span className=&quot;text-xl&quot;>🤝</span> Nuestro Enfoque
          </div>
        </div>

        {/* Titular Principal */}
        <h2 className=&quot;text-4xl md:text-5xl lg:text-6xl font-black text-center mb-10 text-gray-900 leading-[1.1] text-balance&quot;>
          La hostelería ha cambiado.<br />
          <span className=&quot;text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-orange-400 border-b-4 border-orange-100&quot;>Ya no basta con dar bien de comer.</span>
        </h2>

        {/* Cuerpo del Mensaje (El Manifiesto) */}
        <div className=&quot;bg-[#FDFCF8] p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-xl shadow-gray-100/50 mb-12 relative&quot;>
          {/* Comilla decorativa */}
          <div className=&quot;absolute -top-6 -left-6 text-8xl text-orange-200 font-serif leading-none opacity-50 select-none&quot;>&quot;</div>
          
          <div className=&quot;space-y-6 text-lg md:text-xl text-gray-700 leading-relaxed font-medium relative z-10&quot;>
            <p>
              Sabemos lo frustrante que es pagar nóminas en un martes vacío, o ver cómo las apps de delivery se llevan el 30% de tu margen de beneficio mientras tú pones todo el sudor.
            </p>
            <p>
              La mayoría de &quot;agencias de marketing&quot; te venderán <span className=&quot;line-through text-gray-400&quot;>likes</span>, fotos bonitas y promesas vacías que no pagan las facturas de fin de mes. Nosotros operamos de forma diferente.
            </p>
            <p className=&quot;text-gray-900 font-bold text-xl md:text-2xl pt-6 border-t border-gray-200 mt-8&quot;>
              En Architect.Sys no somos informáticos ni community managers. Somos tu Socio de Crecimiento (Growth Partner).
            </p>
            <p>
              Nuestro único objetivo es construirte un ecosistema digital propio para que atraigas más clientes, sirvas más rápido y recuperes el control total de tu facturación. Sin depender de terceros.
            </p>
          </div>
        </div>

        {/* Botones (CTAs) */}
        <div className=&quot;flex flex-col sm:flex-row gap-5 justify-center items-center&quot;>
          <a href=&quot;#solucion-base&quot; className=&quot;w-full sm:w-auto bg-[#FF4500] text-white px-8 py-4 rounded-full font-black text-lg hover:bg-orange-600 transition-all shadow-[0_10px_30px_rgba(255,69,0,0.2)] hover:-translate-y-1 text-center flex items-center justify-center gap-2&quot;>
            Ver Soluciones de Digitalización
            <svg className=&quot;w-5 h-5&quot; fill=&quot;none&quot; viewBox=&quot;0 0 24 24&quot; stroke=&quot;currentColor&quot;><path strokeLinecap=&quot;round&quot; strokeLinejoin=&quot;round&quot; strokeWidth={2} d=&quot;M19 14l-7 7m0 0l-7-7m7 7V3&quot; /></svg>
          </a>
          
          <a href=&quot;https://wa.me/34611499674?text=Hola,%20quiero%20iniciar%20mi%20asesoría%20gratuita.&quot; className=&quot;w-full sm:w-auto bg-white border-2 border-gray-200 text-gray-800 px-8 py-4 rounded-full font-bold text-lg hover:border-[#25D366] hover:text-[#25D366] hover:bg-green-50 transition-all flex items-center justify-center gap-2&quot;>
            <svg className=&quot;w-5 h-5&quot; fill=&quot;currentColor&quot; viewBox=&quot;0 0 24 24&quot;><path d=&quot;M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.437-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z&quot;/></svg>
            Hablar con un Asesor
          </a>
        </div>

        {/* Mensaje de cercanía y profesionalidad */}
        <div className=&quot;mt-8 text-center flex flex-col items-center justify-center animate-fade-in-up&quot;>
          <div className=&quot;inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full border border-gray-100 text-sm font-medium text-gray-500 shadow-sm&quot;>
            <span className=&quot;w-2 h-2 rounded-full bg-green-500 animate-pulse&quot;></span>
            Todos nuestros clientes reciben asesoría 1-a-1 personalizada
          </div>
        </div>

      </div>
    </section>
  );
}
