import React from 'react';

export default function AggressiveHero() {
  return (
    <header className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505] pt-20">
      {/* Patrón de fondo sutil (Grid) para dar aspecto tecnológico pero limpio */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]"></div>
      
      {/* Resplandor central naranja */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF4500] rounded-full blur-[150px] opacity-[0.15] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 w-full text-center flex flex-col items-center">
        
        {/* Etiqueta de Autoridad */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold tracking-widest uppercase mb-8 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          Digitalización Profesional para Hostelería
        </div>

        {/* Titular Agresivo (El Dolor Financiero) */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight text-white mb-8 animate-fade-in-up text-balance" style={{animationDelay: '0.1s'}}>
          Atrae más clientes, agiliza tu servicio y <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-orange-400 border-b-4 border-[#FF4500]">domina</span><br className="hidden md:block"/>
          tu presencia digital.
        </h1>

        {/* Subtítulo Orientado a Beneficio Rápido */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 max-w-2xl leading-relaxed font-medium mb-12 animate-fade-in-up text-pretty px-4 sm:px-0" style={{animationDelay: '0.2s'}}>
          Desde Cartas QR interactivas hasta Fichas de Google optimizadas y Redes Sociales impulsadas por IA. Te damos el sistema completo para modernizar tu negocio paso a paso.
        </p>

        {/* Call To Actions de Alta Fricción y Baja Fricción */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-2xl animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <a href="#solucion-base" className="flex-1 bg-[#FF4500] text-white px-8 py-5 rounded-full font-black text-xl hover:bg-orange-600 transition-all shadow-[0_0_40px_rgba(255,69,0,0.4)] hover:shadow-[0_0_60px_rgba(255,69,0,0.6)] hover:-translate-y-1 flex items-center justify-center gap-3">
            Ver Sistema Base
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
          </a>
          
          <a href="https://wa.me/34611499674?text=Hola,%20quiero%20una%20auditoría%20gratuita%20de%20mis%20tiempos%20de%20mesa." className="flex-1 bg-white/10 text-white border border-white/20 px-8 py-5 rounded-full font-bold text-xl hover:bg-white/20 transition-all backdrop-blur-sm flex items-center justify-center gap-2">
            Auditoría Gratuita
          </a>
        </div>
        
        {/* Prueba Social Minimalista */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center gap-6 opacity-60 hover:opacity-100 transition-opacity animate-fade-in-up" style={{animationDelay: '0.4s'}}>
           <div className="flex -space-x-4">
              <img className="w-12 h-12 rounded-full border-2 border-black" src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=100&h=100&fit=crop" alt="Hostelero 1"/>
              <img className="w-12 h-12 rounded-full border-2 border-black" src="https://images.unsplash.com/photo-1556740758-90de374c12ad?w=100&h=100&fit=crop" alt="Hostelero 2"/>
              <img className="w-12 h-12 rounded-full border-2 border-black" src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop" alt="Hostelero 3"/>
           </div>
           <div className="text-left text-sm text-gray-400">
              <span className="text-white font-bold block">+50 Hosteleros locales</span>
              ya han bajado sus tiempos de espera.
           </div>
        </div>

      </div>
    </header>
  );
}
