'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HubVIPPage() {
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  // Sketches publicitarios con imágenes 4K animadas (efecto vídeo Ken Burns continuo y real)
  const sketches = [
    {
      title: "Servicio de Sala 5 Estrellas",
      subtitle: "Sincronización perfecta y atención milimétrica",
      image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&q=85",
      tag: "SPOT VIP #01 // SALA",
      metric: "+45% ROTACIÓN DE MESAS"
    },
    {
      title: "Alta Cocina & Emplatado IA",
      subtitle: "El estándar gastronómico de máxima rentabilidad",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85",
      tag: "SPOT VIP #02 // COCINA",
      metric: "0% COMISIONES RESERVA"
    },
    {
      title: "Maridaje & Experiencia Premium",
      subtitle: "Fidelización automática de comensales de alto ticket",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&q=85",
      tag: "SPOT VIP #03 // NEGOCIO",
      metric: "+38% TICKET MEDIO"
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
      
      {/* Estilo CSS en vivo para garantizar movimiento real, continuo y dramático (Ken Burns Video Effect) */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes kenburnsLive {
          0% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.16) translate(-2%, -2%); }
          100% { transform: scale(1.04) translate(1.5%, 1.5%); }
        }
        .animate-live-motion {
          animation: kenburnsLive 12s cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite alternate;
        }
      `}} />

      {/* Background Architectural Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0" 
        style={{
          backgroundImage: `linear-gradient(to right, #0A0A0A 1px, transparent 1px), linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Top Executive Ribbon */}
      <div className="w-full bg-[#0A0A0A] text-white py-3 px-4 text-center border-b border-black/10 relative z-20 shadow-lg flex items-center justify-center gap-2.5 sm:gap-3">
        <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-ping shrink-0" />
        <span className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.22em] sm:tracking-[0.28em] font-black text-white truncate">
          LÍNEA DIRECTA EJECUTIVA // ARCHITECT.SYS GROWTH
        </span>
      </div>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-14 relative z-10 flex-1 flex flex-col justify-center">
        
        {/* Header Section */}
        <div className="text-center space-y-3.5 mb-7 sm:mb-9">
          <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-3xl bg-[#0A0A0A] text-white mx-auto flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.18)] border border-white/20 transition-transform duration-500 hover:scale-105 p-4">
            <span className="font-display font-black text-3xl sm:text-4xl tracking-tighter">
              A<span className="text-[#FF4500]">.</span>
            </span>
          </div>

          <div>
            <div className="inline-block bg-[#0A0A0A] text-white px-3.5 py-1 rounded-full shadow-md mb-2">
              <span className="font-mono text-[9px] sm:text-[10px] font-extrabold text-[#FF4500] uppercase tracking-widest">
                ACCESO CONFIDENCIAL PASE VIP
              </span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-4xl md:text-5xl text-[#0A0A0A] tracking-tight leading-none">
              HUB EJECUTIVO <span className="text-[#FF4500]">GROWTH</span>
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#0A0A0A]/75 max-w-md mx-auto mt-2 leading-relaxed">
              Consola privada de ARCHITECT.SYS. Conecta sin intermediarios con Alex o reserva tu sesión estratégica de escalado.
            </p>
          </div>
        </div>

        {/* WOW Effect: Reel Móvil Vertical Animado con Movimiento Real */}
        <div className="mb-9 w-full">
          <div className="mx-auto max-w-[290px] sm:max-w-full rounded-3xl overflow-hidden border-2 border-[#0A0A0A] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative group aspect-[9/13] sm:aspect-[21/9] transition-all duration-500">
            
            {sketches.map((sketch, idx) => (
              <div
                key={sketch.title}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                  idx === activeReelIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Imagen 4K con animación cinemática Ken Burns en vivo garantizada */}
                <img
                  src={sketch.image}
                  alt={sketch.title}
                  className="w-full h-full object-cover animate-live-motion"
                />

                {/* Oscurecimiento degradado de lujo para perfecta legibilidad */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              </div>
            ))}

            {/* Reel Header Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <span className="bg-black/80 backdrop-blur-md text-white font-mono text-[8px] sm:text-[9px] font-black px-2.5 py-1 rounded-full border border-white/20 tracking-widest uppercase flex items-center gap-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                {sketches[activeReelIndex].tag}
              </span>
              <span className="bg-[#FF4500] text-white font-mono text-[8px] sm:text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider shadow-lg">
                REEL EN VIVO
              </span>
            </div>
            
            {/* Reel Bottom Text & Metric */}
            <div className="absolute bottom-4 left-4 right-4 z-20 text-white">
              <div className="bg-[#0A0A0A]/90 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/15 shadow-xl">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-mono text-[9px] font-black text-[#FF4500] uppercase tracking-wider">
                    {sketches[activeReelIndex].metric}
                  </span>
                  
                  {/* Dots Indicator */}
                  <div className="flex gap-1">
                    {sketches.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveReelIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === activeReelIndex ? 'w-5 bg-[#FF4500]' : 'w-1.5 bg-white/30 hover:bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <h3 className="font-display font-black text-sm sm:text-lg text-white tracking-tight leading-tight">
                  {sketches[activeReelIndex].title}
                </h3>
                <p className="text-[10px] sm:text-xs text-white/80 font-sans mt-0.5 leading-snug">
                  {sketches[activeReelIndex].subtitle}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons Hub */}
        <div className="space-y-3.5 sm:space-y-4 w-full">
          
          {/* Card 1: WhatsApp Alex Directo */}
          <a 
            href="https://wa.me/34622652659?text=Hola%20Alex%2C%20he%20escaneado%20el%20Pase%20VIP%20en%20mi%20restaurante%20y%20quiero%20conocer%20el%20Plan%20Growth%20360%C2%BA." 
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-[#0A0A0A] hover:bg-[#10B981] text-white p-5 sm:p-6 rounded-2xl border-2 border-[#0A0A0A] shadow-[0_12px_30px_rgba(0,0,0,0.12)] hover:shadow-[0_20px_45px_rgba(16,185,129,0.28)] transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4 relative z-10">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#10B981] group-hover:bg-white text-white group-hover:text-[#10B981] flex items-center justify-center shrink-0 transition-colors shadow-lg font-mono font-black text-base sm:text-lg">
                  WA
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-black text-base sm:text-xl tracking-tight text-white">
                      Hablar por WhatsApp con Alex
                    </span>
                    <span className="bg-[#10B981] group-hover:bg-white group-hover:text-[#10B981] text-white font-mono text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors">
                      ATENCIÓN DIRECTA
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-white/80 group-hover:text-white font-normal mt-1 leading-relaxed">
                    Conexión prioritaria al <strong className="text-white font-mono">+34 622 652 659</strong>. Sin secretarias ni filtros.
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white group-hover:text-[#10B981] flex items-center justify-center shrink-0 transition-all font-mono font-bold text-base sm:text-lg">
                →
              </div>
            </div>
          </a>

          {/* Card 2: Agendar Sesión de Márgenes en Calendly */}
          <a 
            href="https://calendly.com/dkitchencorporate/pase-vip" 
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white p-5 sm:p-6 rounded-2xl border-2 border-[#0A0A0A] shadow-[0_8px_25px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.22)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#C98A00]/10 group-hover:bg-white/15 text-[#C98A00] group-hover:text-[#FBA919] flex items-center justify-center shrink-0 transition-colors font-mono font-black text-base sm:text-lg">
                  VIP
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-black text-base sm:text-xl tracking-tight">
                      Agendar Sesión Privada 360º
                    </span>
                    <span className="bg-[#C98A00]/15 group-hover:bg-[#FBA919] group-hover:text-[#0A0A0A] text-[#C98A00] font-mono text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors">
                      CALENDLY OFICIAL
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#0A0A0A]/70 group-hover:text-white/85 font-normal mt-1 leading-relaxed">
                    Reserva en 1 clic tu auditoría milimétrica de rotación y rentabilidad de sala con el equipo directivo.
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full border border-black/20 group-hover:border-white/40 flex items-center justify-center shrink-0 group-hover:bg-[#C98A00] group-hover:border-transparent transition-all font-mono font-bold text-base sm:text-lg">
                →
              </div>
            </div>
          </a>

          {/* Card 3: Web Oficial Corporativa */}
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
                    Portal Oficial ARCHITECT.SYS
                  </span>
                  <span className="text-[11px] sm:text-xs text-[#0A0A0A]/60 font-normal block mt-0.5">
                    Descubre nuestra ingeniería digital gastronómica, casos de éxito y ecosistema de software.
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#0A0A0A]/30 group-hover:text-[#0A0A0A]">↗</span>
            </div>
          </Link>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-black/10 py-6 px-5 text-center bg-white/80 backdrop-blur-md relative z-20 mt-6">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[9px] sm:text-[10px] font-extrabold text-[#0A0A0A]/70 uppercase tracking-widest">
            © {new Date().getFullYear()} ARCHITECT.SYS // HIGH PERFORMANCE GASTRONOMY
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-[#FF4500] uppercase font-black tracking-wider bg-[#FF4500]/10 px-2.5 py-1 rounded-full">
              +34 622 652 659
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
