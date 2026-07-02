'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HubVIPPage() {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);

  const videoSketches = [
    {
      title: "Alta Gastronomía & Servicio de Sala",
      subtitle: "Precisión milimétrica en cada entrega",
      url: "https://assets.mixkit.co/videos/preview/mixkit-serving-dinner-in-a-luxury-restaurant-42860-large.mp4",
      tag: "EXPERIENCIA 5 ESTRELLAS"
    },
    {
      title: "Arquitectura Operativa & Control",
      subtitle: "Sistemas IA de rotación al 0% comisiones",
      url: "https://assets.mixkit.co/videos/preview/mixkit-chef-plating-a-dish-in-a-professional-kitchen-42861-large.mp4",
      tag: "INGENIERÍA GASTRONÓMICA"
    },
    {
      title: "Maridaje & Rentabilidad VIP",
      subtitle: "Fidelización de comensales de alto ticket",
      url: "https://assets.mixkit.co/videos/preview/mixkit-pouring-wine-into-a-glass-in-a-restaurant-42858-large.mp4",
      tag: "TICKET MEDIO +40%"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVideoIndex((prev) => (prev + 1) % videoSketches.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [videoSketches.length]);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#0A0A0A] font-sans selection:bg-[#FF4500] selection:text-white relative overflow-hidden flex flex-col justify-between">
      
      {/* Background Architectural Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0" 
        style={{
          backgroundImage: `linear-gradient(to right, #0A0A0A 1px, transparent 1px), linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Top Executive Ribbon */}
      <div className="w-full bg-[#0A0A0A] text-white py-3 px-4 text-center border-b border-black/10 relative z-20 shadow-lg flex items-center justify-center gap-3">
        <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-ping" />
        <span className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.28em] font-black text-white">
          LÍNEA DIRECTA EJECUTIVA // ARCHITECT.SYS GROWTH DIVISION
        </span>
      </div>

      {/* Main Container */}
      <main className="max-w-3xl w-full mx-auto px-5 py-10 sm:py-14 relative z-10 flex-1 flex flex-col justify-center">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-8">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#0A0A0A] text-white mx-auto flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 transition-transform duration-500 hover:scale-105">
            <span className="font-display font-black text-3xl sm:text-4xl tracking-tighter">
              A<span className="text-[#FF4500]">.</span>
            </span>
          </div>

          <div>
            <div className="inline-block bg-[#0A0A0A] text-white px-3.5 py-1 rounded-full shadow-md mb-2">
              <span className="font-mono text-[10px] font-extrabold text-[#FF4500] uppercase tracking-widest">
                ACCESO CONFIDENCIAL PASE VIP
              </span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#0A0A0A] tracking-tight leading-none">
              HUB EJECUTIVO <span className="text-[#FF4500]">GROWTH</span>
            </h1>
            <p className="text-xs sm:text-sm font-medium text-[#0A0A0A]/75 max-w-lg mx-auto mt-2.5 leading-relaxed">
              Bienvenido a la consola privada de ARCHITECT.SYS. Conecta sin intermediarios con Alex o reserva tu sesión estratégica de escalado.
            </p>
          </div>
        </div>

        {/* WOW Effect: Cinematic TV Commercial Sketch Reel */}
        <div className="mb-10 w-full rounded-3xl overflow-hidden border-2 border-[#0A0A0A] bg-black shadow-[0_25px_60px_rgba(0,0,0,0.18)] relative group">
          <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden">
            {videoSketches.map((vid, idx) => (
              <video
                key={vid.url}
                src={vid.url}
                autoPlay
                muted
                loop
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  idx === activeVideoIndex ? 'opacity-90 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                } duration-1000 transform`}
              />
            ))}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80" />
            
            {/* Overlay Info */}
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between text-white z-10">
              <div>
                <span className="bg-[#FF4500] text-white font-mono text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest block w-fit mb-1">
                  {videoSketches[activeVideoIndex].tag}
                </span>
                <h3 className="font-display font-black text-base sm:text-xl text-white tracking-tight leading-tight">
                  {videoSketches[activeVideoIndex].title}
                </h3>
                <p className="text-[11px] text-white/80 font-sans mt-0.5">
                  {videoSketches[activeVideoIndex].subtitle}
                </p>
              </div>

              {/* Selector Dots */}
              <div className="flex gap-1.5">
                {videoSketches.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveVideoIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      i === activeVideoIndex ? 'w-6 bg-[#FF4500]' : 'w-1.5 bg-white/40 hover:bg-white'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Hub (EXACTAMENTE LOS SOLICITADOS) */}
        <div className="space-y-4 w-full">
          
          {/* Card 1: WhatsApp Alex Directo */}
          <a 
            href="https://wa.me/34622652659?text=Hola%20Alex%2C%20he%20escaneado%20el%20Pase%20VIP%20en%20mi%20restaurante%20y%20quiero%20conocer%20el%20Plan%20Growth%20360%C2%BA." 
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-[#0A0A0A] hover:bg-[#10B981] text-white p-6 sm:p-7 rounded-2xl border-2 border-[#0A0A0A] shadow-[0_15px_35px_rgba(0,0,0,0.15)] hover:shadow-[0_25px_50px_rgba(16,185,129,0.3)] transition-all duration-300 transform hover:-translate-y-1.5 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 pointer-events-none group-hover:scale-150 transition-transform duration-500" />
            <div className="flex items-center justify-between gap-4 relative z-10">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#10B981] group-hover:bg-white text-white group-hover:text-[#10B981] flex items-center justify-center shrink-0 transition-colors shadow-lg font-mono font-black text-lg">
                  WA
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white">
                      Hablar por WhatsApp con Alex
                    </span>
                    <span className="bg-[#10B981] group-hover:bg-white group-hover:text-[#10B981] text-white font-mono text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider transition-colors">
                      ATENCIÓN DIRECTA
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-white/75 group-hover:text-white font-normal mt-1 leading-relaxed">
                    Conexión prioritaria al <strong className="text-white font-mono">+34 622 652 659</strong>. Sin secretarias ni filtros.
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white group-hover:text-[#10B981] flex items-center justify-center shrink-0 transition-all font-mono font-bold text-lg">
                →
              </div>
            </div>
          </a>

          {/* Card 2: Agendar Sesión de Márgenes en Calendly */}
          <a 
            href="https://calendly.com/dkitchencorporate/pase-vip" 
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white p-6 sm:p-7 rounded-2xl border-2 border-[#0A0A0A] shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.25)] transition-all duration-300 transform hover:-translate-y-1.5"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4 sm:gap-5">
                <div className="w-14 h-14 rounded-2xl bg-[#C98A00]/10 group-hover:bg-white/15 text-[#C98A00] group-hover:text-[#FBA919] flex items-center justify-center shrink-0 transition-colors font-mono font-black text-lg">
                  VIP
                </div>
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-display font-black text-lg sm:text-xl tracking-tight">
                      Agendar Sesión Privada 360º
                    </span>
                    <span className="bg-[#C98A00]/15 group-hover:bg-[#FBA919] group-hover:text-[#0A0A0A] text-[#C98A00] font-mono text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider transition-colors">
                      CALENDLY OFICIAL
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0A0A0A]/70 group-hover:text-white/85 font-normal mt-1 leading-relaxed">
                    Reserva en 1 clic tu auditoría milimétrica de rotación y rentabilidad de sala con el equipo directivo.
                  </p>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full border border-black/20 group-hover:border-white/40 flex items-center justify-center shrink-0 group-hover:bg-[#C98A00] group-hover:border-transparent transition-all font-mono font-bold text-lg">
                →
              </div>
            </div>
          </a>

          {/* Card 3: Web Oficial Corporativa */}
          <Link 
            href="/" 
            className="group block w-full bg-white/80 hover:bg-white text-[#0A0A0A] p-5 sm:p-6 rounded-2xl border border-black/15 hover:border-[#0A0A0A] transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-black/5 group-hover:bg-[#0A0A0A] group-hover:text-white flex items-center justify-center shrink-0 transition-colors font-mono font-bold text-xs">
                  HQ
                </div>
                <div>
                  <span className="font-display font-black text-base tracking-tight block group-hover:text-[#FF4500] transition-colors">
                    Portal Oficial ARCHITECT.SYS
                  </span>
                  <span className="text-xs text-[#0A0A0A]/60 font-normal block mt-0.5">
                    Descubre nuestra ingeniería digital gastronómica, casos de éxito y ecosistema de software.
                  </span>
                </div>
              </div>
              <span className="font-mono text-sm font-bold text-[#0A0A0A]/30 group-hover:text-[#0A0A0A]">↗</span>
            </div>
          </Link>

        </div>

      </main>

      {/* Footer */}
      <footer className="w-full border-t border-black/10 py-7 px-5 text-center bg-white/70 backdrop-blur-md relative z-20">
        <div className="max-w-xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-[10px] font-extrabold text-[#0A0A0A]/70 uppercase tracking-widest">
            © {new Date().getFullYear()} ARCHITECT.SYS // HIGH PERFORMANCE GASTRONOMY
          </p>
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-[#FF4500] uppercase font-black tracking-wider bg-[#FF4500]/10 px-2 py-0.5 rounded">
              +34 622 652 659
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
