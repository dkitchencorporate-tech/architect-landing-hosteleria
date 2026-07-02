'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HubVIPPage() {
  const [activeReelIndex, setActiveReelIndex] = useState(0);

  // Vídeos MP4 reales de alta velocidad (Coverr & Cloudinary CDN) para rotación cada 8 segundos
  const spots = [
    {
      tag: "SPOT VIP #01 // SALA EN PLENO RENDIMIENTO",
      metric: "+140% AFLUENCIA Y ROTACIÓN",
      videoUrl: "https://cdn.coverr.co/videos/coverr-cheers-with-wine-glasses-in-a-restaurant-5244/1080p.mp4",
      backupUrl: "https://cdn.coverr.co/videos/coverr-people-dining-at-a-restaurant-5248/1080p.mp4",
      title: "Sala Llena & Experiencia 5 Estrellas",
      description: "Demostración en vivo de un restaurante operando a máxima capacidad en días flojos. Nuestro sistema de captación segmenta comensales VIP locales para asegurar mesas reservadas los 7 días de la semana."
    },
    {
      tag: "SPOT VIP #02 // BAR & COCINA AGILIZADOS",
      metric: "0% COMISIONES DE RESERVA",
      videoUrl: "https://cdn.coverr.co/videos/coverr-bartender-making-a-cocktail-4389/1080p.mp4",
      backupUrl: "https://cdn.coverr.co/videos/coverr-chef-preparing-a-dish-in-a-restaurant-kitchen-5231/1080p.mp4",
      title: "Recepción de Pedidos & Precisión Operativa",
      description: "Agiliza la comanda en barra y cocina eliminando cuellos de botella. El personal reduce el tiempo de toma de pedidos en un 60%, concentrándose en el maridaje y en elevar el ticket medio por comensal."
    },
    {
      tag: "SPOT VIP #03 // SCROLL EN CARTA DIGITAL IA",
      metric: "+38% INCREMENTO DE TICKET",
      videoUrl: "https://cdn.coverr.co/videos/coverr-using-a-smartphone-in-a-coffee-shop-4348/1080p.mp4",
      backupUrl: "https://cdn.coverr.co/videos/coverr-holding-a-smartphone-with-green-screen-in-a-cafe-9346/1080p.mp4",
      title: "Interacción Digital Inteligente en Mesa",
      description: "Experiencia de navegación hiper-rápida y sugerencias algorítmicas al estilo de las grandes cadenas mundiales, diseñada para aumentar la rentabilidad neta de cada servicio en tu local."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReelIndex((prev) => (prev + 1) % spots.length);
    }, 8000); // 8 segundos exactos por vídeo
    return () => clearInterval(interval);
  }, [spots.length]);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#0A0A0A] font-sans selection:bg-[#FF4500] selection:text-white relative overflow-hidden flex flex-col justify-between">
      
      {/* Grid de fondo arquitectónico */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035] z-0" 
        style={{
          backgroundImage: `linear-gradient(to right, #0A0A0A 1px, transparent 1px), linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Barra superior de seguridad */}
      <header className="w-full bg-[#0A0A0A] text-white py-2.5 px-4 text-center border-b border-white/10 relative z-20 shadow-md flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping shrink-0" />
        <span className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-black text-white truncate">
          CONSOLA PRIVADA DE EXPANSIÓN // ARCHITECT.SYS GROWTH
        </span>
      </header>

      {/* Contenedor Principal Adaptado y 100% Responsivo */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 relative z-10 flex-1 flex flex-col justify-center space-y-8">
        
        {/* TARJETA VIP DE BIENVENIDA (Totalmente adaptada a móviles sin desbordes) */}
        <section className="bg-gradient-to-br from-[#0A0A0A] via-[#141414] to-[#1E1E1E] text-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-white/15 relative overflow-hidden">
          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/15 pb-5 mb-5">
            <div className="flex items-center gap-3.5 sm:gap-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#FF4500] to-[#D93800] text-white flex items-center justify-center font-display font-black text-xl sm:text-3xl shadow-lg shrink-0 border border-white/20">
                A+
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/40 px-2 py-0.5 rounded-full font-mono text-[8px] sm:text-[9px] font-black uppercase tracking-wider">
                    INVITADO VIP CONFIRMADO
                  </span>
                  <span className="text-white/50 font-mono text-[8px] sm:text-[9px]">PASE GROWTH</span>
                </div>
                <h1 className="font-display font-black text-xl sm:text-3xl md:text-4xl tracking-tight text-white mt-1">
                  HUB EJECUTIVO <span className="text-[#FF4500]">360º</span>
                </h1>
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 text-left sm:text-right w-full sm:w-auto">
              <span className="block font-mono text-[7px] sm:text-[8px] text-white/60 uppercase tracking-widest">NIVEL DE ACCESO</span>
              <strong className="font-display font-bold text-xs sm:text-sm text-[#FBA919]">DIRECCIÓN CORPORATIVA</strong>
            </div>
          </div>

          <div className="relative z-10 space-y-2.5 text-white/90 font-sans text-xs sm:text-sm md:text-base leading-relaxed">
            <p className="font-semibold text-white">
              Has sido seleccionado para acceder a esta consola privada a través de tu invitación personal de imprenta VIP.
            </p>
            <p className="text-white/80">
              Estás a un paso de integrar en tu restaurante la ingeniería digital gastronómica de <strong className="text-white font-mono">ARCHITECT.SYS</strong>. Prepárate para un antes y un después definitivo en la automatización, rentabilidad y prestigio de tu negocio.
            </p>
          </div>
        </section>

        {/* SECCIÓN REEL VERTICAL EN VIVO (100% Despejado, Formato Vertical Puro y Leyenda Abajo) */}
        <section className="w-full max-w-md mx-auto space-y-4">
          
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[10px] sm:text-xs font-black text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
              SPOT COMERCIAL EN VIVO
            </span>
            <span className="bg-[#0A0A0A] text-white font-mono text-[8px] sm:text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">
              REEL {activeReelIndex + 1} / {spots.length}
            </span>
          </div>

          {/* Marco Vertical del Reel (Formato móvil 9:16 sin elementos que tapen el video) */}
          <div className="w-full aspect-[9/15] sm:aspect-[9/14] rounded-[32px] overflow-hidden border-4 border-[#0A0A0A] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.25)] relative">
            {spots.map((spot, idx) => (
              <div
                key={spot.title}
                className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
                  idx === activeReelIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                }`}
              >
                {/* Vídeo MP4 real en reproducción continua */}
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={spot.videoUrl} type="video/mp4" />
                  <source src={spot.backupUrl} type="video/mp4" />
                  Su navegador no soporta reproducción de vídeo MP4.
                </video>
              </div>
            ))}

            {/* Etiqueta superior limpia y discreta que NO tapa la escena principal */}
            <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
              <span className="bg-black/80 backdrop-blur-md text-white font-mono text-[8px] sm:text-[9px] font-black px-3 py-1 rounded-full border border-white/20 tracking-wider uppercase shadow-lg truncate max-w-[65%]">
                {spots[activeReelIndex].tag}
              </span>
              <span className="bg-[#FF4500] text-white font-mono text-[8px] sm:text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-tight shadow-lg shrink-0">
                {spots[activeReelIndex].metric}
              </span>
            </div>
          </div>

          {/* LEYENDA Y EXPLICACIÓN DEBAJO DEL VÍDEO (Sin solaparse ni tapar la imagen) */}
          <div className="bg-white rounded-2xl p-5 border-2 border-[#0A0A0A] shadow-lg space-y-3 transition-all duration-500">
            <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-2">
              <h3 className="font-display font-black text-base sm:text-lg text-[#0A0A0A] leading-tight">
                {spots[activeReelIndex].title}
              </h3>

              {/* Puntos selectores interactivos */}
              <div className="flex gap-1.5 shrink-0">
                {spots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveReelIndex(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeReelIndex ? 'w-6 bg-[#FF4500]' : 'w-2 bg-black/20 hover:bg-black/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#0A0A0A]/80 font-normal leading-relaxed">
              {spots[activeReelIndex].description}
            </p>
          </div>

        </section>

        {/* BOTONES EJECUTIVOS DE ACCIÓN INMEDIATA (Cierre de venta al 75%) */}
        <section className="space-y-3.5 w-full pt-2">
          
          {/* Opción 1: WhatsApp Directo con Alex */}
          <a 
            href="https://wa.me/34622652659?text=Hola%20Alex%2C%20he%20visto%20los%20spots%20en%20el%20Hub%20VIP%20y%20quiero%20activar%20el%20Plan%20Growth%20360%C2%BA%20en%20mi%20restaurante." 
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-[#0A0A0A] hover:bg-[#10B981] text-white p-5 sm:p-6 rounded-3xl border-2 border-[#0A0A0A] shadow-xl hover:shadow-[0_20px_45px_rgba(16,185,129,0.3)] transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden"
          >
            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#10B981] group-hover:bg-white text-white group-hover:text-[#10B981] flex items-center justify-center shrink-0 transition-colors shadow-md font-mono font-black text-base sm:text-lg">
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
                  <p className="text-[11px] sm:text-xs text-white/85 group-hover:text-white font-normal mt-1 leading-relaxed">
                    Línea prioritaria al <strong className="text-white font-mono underline">+34 622 652 659</strong>. Resuelvo dudas y preparamos el despliegue.
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 group-hover:bg-white group-hover:text-[#10B981] flex items-center justify-center shrink-0 transition-all font-mono font-bold text-base sm:text-lg">
                →
              </div>
            </div>
          </a>

          {/* Opción 2: Calendly Oficial */}
          <a 
            href="https://calendly.com/dkitchencorporate/pase-vip" 
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-white hover:bg-[#0A0A0A] text-[#0A0A0A] hover:text-white p-5 sm:p-6 rounded-3xl border-2 border-[#0A0A0A] shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#C98A00]/10 group-hover:bg-white/15 text-[#C98A00] group-hover:text-[#FBA919] flex items-center justify-center shrink-0 transition-colors font-mono font-black text-base sm:text-lg">
                  VIP
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-black text-base sm:text-xl tracking-tight">
                      Agendar Sesión de Estrategia 360º
                    </span>
                    <span className="bg-[#C98A00]/15 group-hover:bg-[#FBA919] group-hover:text-[#0A0A0A] text-[#C98A00] font-mono text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors">
                      CALENDLY OFICIAL
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#0A0A0A]/75 group-hover:text-white/85 font-normal mt-1 leading-relaxed">
                    Reserva tu cita en 1 clic para auditar la rotación y rentabilidad de tu sala antes de nuestra reunión.
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-black/20 group-hover:border-white/40 flex items-center justify-center shrink-0 group-hover:bg-[#C98A00] group-hover:border-transparent transition-all font-mono font-bold text-base sm:text-lg">
                →
              </div>
            </div>
          </a>

          {/* Opción 3: Web Oficial Corporativa */}
          <Link 
            href="/" 
            className="group block w-full bg-white/80 hover:bg-white text-[#0A0A0A] p-4 sm:p-5 rounded-2xl border border-black/15 hover:border-[#0A0A0A] transition-all duration-300 shadow-sm"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-black/5 group-hover:bg-[#0A0A0A] group-hover:text-white flex items-center justify-center shrink-0 transition-colors font-mono font-bold text-xs">
                  HQ
                </div>
                <div>
                  <span className="font-display font-black text-xs sm:text-sm tracking-tight block group-hover:text-[#FF4500] transition-colors">
                    Explorar la Portada Corporativa ARCHITECT.SYS
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-[#0A0A0A]/60 font-normal block mt-0.5">
                    Descubre toda nuestra ingeniería de software, demos interactivas y casos prácticos.
                  </span>
                </div>
              </div>
              <span className="font-mono text-xs font-bold text-[#0A0A0A]/30 group-hover:text-[#0A0A0A]">↗</span>
            </div>
          </Link>

        </section>

      </main>

      {/* Pie de página */}
      <footer className="w-full border-t border-black/10 py-5 px-4 text-center bg-white/90 backdrop-blur-md relative z-20 mt-6">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <p className="font-mono text-[8px] sm:text-[9px] font-extrabold text-[#0A0A0A]/70 uppercase tracking-widest">
            © {new Date().getFullYear()} ARCHITECT.SYS // HIGH PERFORMANCE GASTRONOMY
          </p>
          <span className="text-[8px] sm:text-[9px] font-mono text-[#FF4500] uppercase font-black tracking-wider bg-[#FF4500]/10 px-3 py-1 rounded-full border border-[#FF4500]/20">
            LÍNEA DIRECTA: +34 622 652 659
          </span>
        </div>
      </footer>

    </div>
  );
}
