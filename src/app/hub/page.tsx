'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HubVIPPage() {
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  // Spots publicitarios en calidad ultra-realista 4K con movimiento continuo (Ken Burns Live)
  const sketches = [
    {
      title: "Sincronización de Sala 5 Estrellas",
      subtitle: "Servicio milimétrico, atención personalizada y máxima fluidez en cada mesa.",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1400&q=85",
      tag: "SPOT VIP #01 // ALTA SALA",
      metric: "+45% ROTACIÓN SIN ESPERAS"
    },
    {
      title: "Estándar Gastronómico & Emplatado IA",
      subtitle: "La perfección visual y operativa que justifica tickets medios superiores.",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1400&q=85",
      tag: "SPOT VIP #02 // ALTA COCINA",
      metric: "0% COMISIONES A TERCEROS"
    },
    {
      title: "Maridaje & Experiencia de Alto Ticket",
      subtitle: "Sistemas automáticos que convierten comensales ocasionales en clientes habituales.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=85",
      tag: "SPOT VIP #03 // EXPAND BUSINESS",
      metric: "+38% RENTABILIDAD NETA"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReelIndex((prev) => (prev + 1) % sketches.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [sketches.length]);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#0A0A0A] font-sans selection:bg-[#FF4500] selection:text-white relative overflow-hidden flex flex-col justify-between">
      
      {/* Animación continua garantizada para el reproductor cinemático */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes kenburnsLive {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.15) translate(-1.5%, -1.5%); }
          100% { transform: scale(1.05) translate(1%, 1%); }
        }
        .animate-live-motion {
          animation: kenburnsLive 12s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite alternate;
        }
      `}} />

      {/* Grid de fondo arquitectónico sutil */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0" 
        style={{
          backgroundImage: `linear-gradient(to right, #0A0A0A 1px, transparent 1px), linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Barra de Estado Ejecutiva */}
      <header className="w-full bg-[#0A0A0A] text-white py-3 px-4 text-center border-b border-white/10 relative z-20 shadow-md flex items-center justify-center gap-2.5">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping shrink-0" />
        <span className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.25em] font-black text-white">
          SESIÓN PRIVADA ACTIVA // CONEXIÓN ENCRIPTADA ARCHITECT.SYS
        </span>
      </header>

      {/* Contenedor Principal */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10 flex-1 flex flex-col justify-center space-y-8 sm:space-y-11">
        
        {/* TARJETA VIP DE BIENVENIDA (Reemplaza el recuadro negro superior por un diseño de altísimo nivel) */}
        <section className="bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#1C1C1C] text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.22)] border border-white/15 relative overflow-hidden">
          
          {/* Brillo decorativo */}
          <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#FF4500]/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#C98A00]/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-white/15 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#FF4500] to-[#D93800] text-white flex items-center justify-center font-display font-black text-2xl sm:text-3xl shadow-lg shrink-0 border border-white/20">
                A+
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 px-2.5 py-0.5 rounded-full font-mono text-[9px] font-black uppercase tracking-wider">
                    INVITACIÓN VIP CONFIRMADA
                  </span>
                  <span className="text-white/50 font-mono text-[9px]">ID: PASE-GROWTH-2026</span>
                </div>
                <h1 className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-tight text-white mt-1">
                  CONSOLA DE EXPANSIÓN <span className="text-[#FF4500]">360º</span>
                </h1>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-left md:text-right shrink-0">
              <span className="block font-mono text-[8px] text-white/60 uppercase tracking-widest">ACCESO PRIVilegiado</span>
              <strong className="font-display font-bold text-sm text-[#FBA919]">ESTADO: SELECCIONADO</strong>
            </div>
          </div>

          {/* Mensaje Ejecutivo de Bienvenida */}
          <div className="relative z-10 space-y-3 text-white/90 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
            <p className="font-semibold text-white">
              Has llegado a esta consola reservada de forma exclusiva gracias a la invitación VIP que se te ha asignado personalmente.
            </p>
            <p className="text-white/80">
              Estás a punto de iniciar el proceso de acceso al ecosistema de alta tecnología y dirección estratégica de <strong className="text-white font-mono">ARCHITECT.SYS</strong>, diseñado específicamente para marcar un <strong className="text-[#FF4500] underline decoration-white/40">antes y un después definitivo</strong> en la rentabilidad, automatización y prestigio de tu negocio.
            </p>
          </div>
        </section>

        {/* REPRODUCTOR CINEMÁTICO WOW (Sin recuadro negro que tape la imagen) */}
        <section className="w-full space-y-3">
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[10px] sm:text-xs font-black text-[#0A0A0A] uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF4500]" />
              VISUALIZACIÓN DE ESTÁNDARES VIP // REEL CINEMÁTICO
            </span>
            <span className="text-[10px] font-mono text-[#0A0A0A]/60 font-bold uppercase">
              SPOT {activeReelIndex + 1} DE {sketches.length}
            </span>
          </div>

          <div className="w-full rounded-3xl overflow-hidden border-2 border-[#0A0A0A] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.18)] relative aspect-[16/9] sm:aspect-[21/9] transition-all duration-500">
            
            {sketches.map((sketch, idx) => (
              <div
                key={sketch.title}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  idx === activeReelIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Imagen 4K animada sin bloques oscuros que la tapen */}
                <img
                  src={sketch.image}
                  alt={sketch.title}
                  className="w-full h-full object-cover animate-live-motion"
                />

                {/* Sutilísimo degradado inferior sólo para legibilidad de las letras, sin recuadro opaco */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />
              </div>
            ))}

            {/* Badges superiores limpios */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <span className="bg-black/75 backdrop-blur-md text-white font-mono text-[8px] sm:text-[9px] font-black px-3 py-1 rounded-full border border-white/20 tracking-widest uppercase flex items-center gap-1.5 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse" />
                {sketches[activeReelIndex].tag}
              </span>
              <span className="bg-[#FF4500] text-white font-mono text-[8px] sm:text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                {sketches[activeReelIndex].metric}
              </span>
            </div>
            
            {/* Texto Flotante en la parte inferior (Sin recuadro negro tapando la imagen) */}
            <div className="absolute bottom-4 left-5 right-5 z-20 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 text-white pointer-events-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              <div>
                <h3 className="font-display font-black text-lg sm:text-2xl text-white tracking-tight leading-tight">
                  {sketches[activeReelIndex].title}
                </h3>
                <p className="text-xs sm:text-sm text-white/95 font-medium mt-0.5 max-w-xl leading-snug">
                  {sketches[activeReelIndex].subtitle}
                </p>
              </div>

              {/* Selector de diapositivas interactivo */}
              <div className="flex gap-1.5 pointer-events-auto shrink-0 pb-1">
                {sketches.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveReelIndex(i)}
                    aria-label={`Ver spot ${i + 1}`}
                    className={`h-2 rounded-full transition-all duration-300 shadow-md ${
                      i === activeReelIndex ? 'w-6 bg-[#FF4500]' : 'w-2 bg-white/50 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* ACCIONES EJECUTIVAS INMEDIATAS */}
        <section className="space-y-4 w-full pt-2">
          
          {/* Opción 1: WhatsApp Alex Directo */}
          <a 
            href="https://wa.me/34622652659?text=Hola%20Alex%2C%20he%20accedido%20a%20mi%20invitaci%C3%B3n%20VIP%20en%20el%20Hub%20y%20quiero%20iniciar%20el%20proceso%20de%20acceso%20al%20ecosistema%20Architect%20Sys." 
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-[#0A0A0A] hover:bg-[#10B981] text-white p-5 sm:p-7 rounded-3xl border-2 border-[#0A0A0A] shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:shadow-[0_22px_50px_rgba(16,185,129,0.32)] transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#10B981] group-hover:bg-white text-white group-hover:text-[#10B981] flex items-center justify-center shrink-0 transition-colors shadow-lg font-mono font-black text-lg sm:text-xl">
                  WA
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-display font-black text-lg sm:text-2xl tracking-tight text-white">
                      Iniciar Comunicación Directa por WhatsApp
                    </span>
                    <span className="bg-[#10B981] group-hover:bg-white group-hover:text-[#10B981] text-white font-mono text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider transition-colors">
                      ATENCIÓN PRIORITARIA
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/85 group-hover:text-white font-medium mt-1 leading-relaxed">
                    Habla sin intermediarios con Alex al <strong className="text-white font-mono underline">+34 622 652 659</strong> para activar tu plan de crecimiento.
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white group-hover:text-[#10B981] flex items-center justify-center shrink-0 transition-all font-mono font-bold text-lg">
                →
              </div>
            </div>
          </a>

          {/* Opción 2: Agendar Sesión de Márgenes en Calendly */}
          <a 
            href="https://calendly.com/dkitchencorporate/pase-vip" 
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white p-5 sm:p-7 rounded-3xl border-2 border-[#0A0A0A] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_22px_50px_rgba(0,0,0,0.25)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#C98A00]/10 group-hover:bg-white/15 text-[#C98A00] group-hover:text-[#FBA919] flex items-center justify-center shrink-0 transition-colors font-mono font-black text-lg sm:text-xl">
                  VIP
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-display font-black text-lg sm:text-2xl tracking-tight">
                      Agendar Sesión Privada de Estrategia 360º
                    </span>
                    <span className="bg-[#C98A00]/15 group-hover:bg-[#FBA919] group-hover:text-[#0A0A0A] text-[#C98A00] font-mono text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider transition-colors">
                      CALENDLY OFICIAL
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0A0A0A]/75 group-hover:text-white/85 font-medium mt-1 leading-relaxed">
                    Selecciona en el calendario ejecutivo el día y hora para analizar tu carta, sala y márgenes de rentabilidad.
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-black/20 group-hover:border-white/40 flex items-center justify-center shrink-0 group-hover:bg-[#C98A00] group-hover:border-transparent transition-all font-mono font-bold text-lg">
                →
              </div>
            </div>
          </a>

          {/* Opción 3: Web Oficial Corporativa */}
          <Link 
            href="/" 
            className="group block w-full bg-white/80 hover:bg-white text-[#0A0A0A] p-4 sm:p-5 rounded-2xl border border-black/15 hover:border-[#0A0A0A] transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-black/5 group-hover:bg-[#0A0A0A] group-hover:text-white flex items-center justify-center shrink-0 transition-colors font-mono font-bold text-xs">
                  HQ
                </div>
                <div>
                  <span className="font-display font-black text-sm sm:text-base tracking-tight block group-hover:text-[#FF4500] transition-colors">
                    Volver a la Portada Corporativa ARCHITECT.SYS
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#0A0A0A]/60 font-normal block mt-0.5">
                    Explora nuestra arquitectura de software, casos prácticos y ecosistema tecnológico para hostelería.
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#0A0A0A]/30 group-hover:text-[#0A0A0A]">↗</span>
            </div>
          </Link>

        </section>

      </main>

      {/* Pie de página */}
      <footer className="w-full border-t border-black/10 py-6 px-5 text-center bg-white/90 backdrop-blur-md relative z-20 mt-8">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] sm:text-[10px] font-extrabold text-[#0A0A0A]/70 uppercase tracking-widest">
            © {new Date().getFullYear()} ARCHITECT.SYS // GROWTH & HIGH PERFORMANCE GASTRONOMY
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-[#FF4500] uppercase font-black tracking-wider bg-[#FF4500]/10 px-3 py-1 rounded-full border border-[#FF4500]/20">
              LÍNEA DIRECTA: +34 622 652 659
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
