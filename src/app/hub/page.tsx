'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HubVIPPage() {
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [mediaPhase, setMediaPhase] = useState<'video' | 'image'>('video');

  // Estado para el Formulario Guiado de Acceso VIP
  const [showVipForm, setShowVipForm] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    restaurantName: '',
    ownerName: '',
    city: '',
    businessType: 'Alta Cocina / Restaurante Gourmet',
    volume: '1.000 - 3.000 comensales / mes',
    digitalizationLevel: 'Intermedio (TPV + Reservas Web básicas)',
    mainChallenge: 'Eliminar comisiones por reserva y automatizar sala con IA',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const spots = [
    {
      id: 1,
      tag: "SPOT VIP #01 // SALA EN VIVO & AMBIENTE 5 ESTRELLAS",
      metric: "+140% AFLUENCIA",
      title: "Sala Llena & Experiencia Gastronómica VIP",
      description: "Algoritmo inteligente de captación continua de comensales de alto ticket, garantizando ocupación máxima con clientes cualificados sin pagar comisiones por reserva.",
      imageSrc: "/images/reels/spot1.png",
      videoSrc: "/videos/spot1.mp4",
      overlayBadge: "🍾 MESA #04 VIP RESERVADA // +280€",
      overlaySub: "Maridaje Degustación 7 Tiempos • Ocupación 98%"
    },
    {
      id: 2,
      tag: "SPOT VIP #02 // COCINA EN ACCIÓN & KDS LIVE",
      metric: "0% COMISIONES",
      title: "Recepción de Pedidos & Precisión en Cocina",
      description: "Agiliza la sincronización entre barra y pase eliminando cuellos de botella y reduciendo los tiempos de espera y error en cocina en un 65%.",
      imageSrc: "/images/reels/spot2.png",
      videoSrc: "/videos/spot2.mp4",
      overlayBadge: "🔥 PEDIDO #809 EN PREPARACIÓN // 34s",
      overlaySub: "Sincronización KDS Directa • Emplatado Gourmet"
    },
    {
      id: 3,
      tag: "SPOT VIP #03 // DEMO EN VIVO INTERACCIÓN MÓVIL",
      metric: "+38% RENTABILIDAD",
      title: "Interacción Digital Inteligente en Mesa",
      description: "Simulación donde la carta inteligente IA sugiere maridajes y upsells personalizados en el momento exacto de la decisión del cliente.",
      imageSrc: "/images/reels/spot3.png",
      videoSrc: "/videos/spot3.mp4",
      overlayBadge: "⭐ RECOMENDACIÓN IA // +38% TICKET",
      overlaySub: "Algoritmo Predictivo de Venta Cruzada • Upsell Activo"
    }
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (mediaPhase === 'video') {
      // Seguridad: Si por alguna razón el vídeo no dispara onEnded, a los 7.8s pasa a imagen
      timer = setTimeout(() => {
        setMediaPhase('image');
      }, 7800);
    } else {
      // Retención ultrarrápida (1.8s en la imagen maestra) para mantener dinamismo del flyer
      timer = setTimeout(() => {
        setActiveReelIndex((prev) => (prev + 1) % spots.length);
        setMediaPhase('video');
      }, 1800);
    }
    return () => clearTimeout(timer);
  }, [mediaPhase, activeReelIndex, spots.length]);

  const activeSpot = spots[activeReelIndex];

  const handleVipSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.restaurantName || !formData.phone) {
      alert("Por favor, ingresa al menos el Nombre del Restaurante y tu WhatsApp.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Enviar expediente invisible al servidor de Architect.Sys / correo de Alex
      await fetch('/api/vip-intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.error("Error enviando expediente VIP:", err);
    }

    // Redirección inmediata al WhatsApp VIP de Alex con el mensaje de alta autoridad
    const textMsg = `Hola Alex, he completado el Protocolo de Registro VIP para *${formData.restaurantName}* (${formData.city || 'España'}).\n\n🎯 *Reto principal:* ${formData.mainChallenge}\n⚡ *Digitalización:* ${formData.digitalizationLevel}\n\nQuiero activar mi Consultoría Exclusiva 1-a-1 y desbloquear los Bonos de Digitalización IA.`;
    const whatsappUrl = `https://wa.me/34622652659?text=${encodeURIComponent(textMsg)}`;
    
    window.location.href = whatsappUrl;
  };

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

      {/* Barra superior de seguridad */}
      <header className="w-full bg-[#0A0A0A] text-white py-2.5 px-4 text-center border-b border-white/10 relative z-20 shadow-md flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping shrink-0" />
        <span className="font-mono text-[9px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] font-black text-white truncate">
          CONSOLA PRIVADA DE EXPANSIÓN // ARCHITECT.SYS GROWTH
        </span>
      </header>

      {/* Contenedor Principal */}
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 relative z-10 flex-1 flex flex-col justify-center space-y-8">
        
        {/* TARJETA VIP DE BIENVENIDA */}
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

        {/* SECCIÓN REEL VERTICAL DINÁMICO (RETENCIÓN INMEDIATA SIN CORTES) */}
        <section className="w-full max-w-md mx-auto space-y-4">
          
          <div className="flex items-center justify-between px-1">
            <span className="font-mono text-[10px] sm:text-xs font-black text-[#0A0A0A] uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse" />
              SPOT CINEMÁTICO EN VIVO (8K UHD)
            </span>
            <span className="bg-[#0A0A0A] text-white font-mono text-[8px] sm:text-[9px] font-black px-2.5 py-0.5 rounded-full uppercase">
              REEL {activeReelIndex + 1} / {spots.length}
            </span>
          </div>

          {/* Marco Vertical del Reel - Único elemento activo para garantizar autoplay inmediato en iOS/Chrome */}
          <div className="w-full aspect-[9/15] sm:aspect-[9/14] rounded-[32px] overflow-hidden border-4 border-[#0A0A0A] bg-black shadow-[0_20px_50px_rgba(0,0,0,0.25)] relative group">
            <div className="w-full h-full relative bg-black">
              {mediaPhase === 'video' ? (
                <video
                  key={`video-${activeSpot.id}-${activeReelIndex}`}
                  src={activeSpot.videoSrc}
                  autoPlay
                  loop={false}
                  muted
                  playsInline
                  poster={activeSpot.imageSrc}
                  onEnded={() => setMediaPhase('image')}
                  className="w-full h-full object-cover brightness-100 contrast-105 animate-fadeIn"
                />
              ) : (
                <img
                  key={`image-${activeSpot.id}-${activeReelIndex}`}
                  src={activeSpot.imageSrc}
                  alt={activeSpot.title}
                  className="w-full h-full object-cover brightness-100 contrast-105 animate-fadeIn"
                />
              )}
            </div>

            {/* Etiqueta superior flotante */}
            <div className="absolute top-3 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
              <span className="bg-black/85 backdrop-blur-md text-white font-mono text-[8px] sm:text-[9px] font-black px-3 py-1 rounded-full border border-white/20 tracking-wider uppercase shadow-lg truncate max-w-[65%]">
                {activeSpot.tag}
              </span>
              <span className="bg-[#FF4500] text-white font-mono text-[8px] sm:text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-tight shadow-lg shrink-0">
                {activeSpot.metric}
              </span>
            </div>

            {/* Overlay inferior elegante */}
            <div className="absolute bottom-4 left-4 right-4 z-20 pointer-events-none">
              <div className="bg-black/85 backdrop-blur-md p-3 rounded-2xl border border-white/25 shadow-2xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-black text-[#10B981] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-ping" />
                    {activeSpot.overlayBadge}
                  </span>
                  <span className="font-mono text-[8px] font-bold text-white/80 bg-[#FF4500]/30 border border-[#FF4500]/50 px-1.5 py-0.5 rounded">8K MASTER</span>
                </div>
                <p className="text-xs font-bold text-white leading-snug">{activeSpot.overlaySub}</p>
              </div>
            </div>
          </div>

          {/* LEYENDA Y EXPLICACIÓN DEBAJO DEL REEL */}
          <div className="bg-white rounded-2xl p-5 border-2 border-[#0A0A0A] shadow-lg space-y-3 transition-all duration-500">
            <div className="flex items-center justify-between gap-2 border-b border-black/10 pb-2">
              <h3 className="font-display font-black text-base sm:text-lg text-[#0A0A0A] leading-tight">
                {activeSpot.title}
              </h3>

              {/* Puntos selectores */}
              <div className="flex gap-1.5 shrink-0">
                {spots.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveReelIndex(i);
                      setMediaPhase('video');
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === activeReelIndex ? 'w-6 bg-[#FF4500]' : 'w-2 bg-black/20 hover:bg-black/50'
                    }`}
                  />
                ))}
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#0A0A0A]/80 font-normal leading-relaxed">
              {activeSpot.description}
            </p>
          </div>

        </section>

        {/* =========================================================================
            PROTOCOLO GUIADO DE ACCESO VIP // CAPTACIÓN DE ALTO NIVEL
           ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#0A0A0A] shadow-2xl relative overflow-hidden">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-2 border-black/10 pb-6 mb-6">
            <div>
              <span className="bg-[#10B981] text-white font-mono text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-widest inline-block mb-2">
                🌟 ACCESO EXCLUSIVO INVITADOS FLYER
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl md:text-3xl text-[#0A0A0A] tracking-tight">
                Protocolo de Auditoría & Desbloqueo de Bonos
              </h2>
              <p className="text-xs sm:text-sm text-[#0A0A0A]/70 mt-1">
                Completa esta radiografía ejecutiva en 45 segundos para que Alex prepare tu estrategia antes de la sesión.
              </p>
            </div>
          </div>

          {!showVipForm ? (
            <div className="text-center space-y-6 py-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                <div className="bg-[#FDFCF8] p-4 rounded-2xl border border-black/10">
                  <span className="font-mono text-xs font-black text-[#FF4500]">PASO 01 // AUDITORÍA</span>
                  <h4 className="font-bold text-sm text-[#0A0A0A] mt-1">Diagnóstico Operativo</h4>
                  <p className="text-xs text-gray-600 mt-1">Evaluamos tus cuellos de botella en sala y cocina en tiempo real.</p>
                </div>
                <div className="bg-[#FDFCF8] p-4 rounded-2xl border border-black/10">
                  <span className="font-mono text-xs font-black text-[#10B981]">PASO 02 // BONOS VIP</span>
                  <h4 className="font-bold text-sm text-[#0A0A0A] mt-1">Pack Digital 360º</h4>
                  <p className="text-xs text-gray-600 mt-1">Desbloqueo automático de menús IA, KDS y cero comisiones.</p>
                </div>
                <div className="bg-[#FDFCF8] p-4 rounded-2xl border border-black/10">
                  <span className="font-mono text-xs font-black text-[#FBA919]">PASO 03 // SESIÓN 1-A-1</span>
                  <h4 className="font-bold text-sm text-[#0A0A0A] mt-1">Reunión Privada con Alex</h4>
                  <p className="text-xs text-gray-600 mt-1">Hoja de ruta personalizada y demo técnica sobre tu restaurante.</p>
                </div>
              </div>

              <button
                onClick={() => setShowVipForm(true)}
                className="w-full bg-gradient-to-r from-[#FF4500] to-[#D93800] hover:from-[#E03C00] hover:to-[#B82E00] text-white font-display font-black text-base sm:text-xl p-5 sm:p-6 rounded-2xl shadow-xl hover:shadow-[0_15px_35px_rgba(255,69,0,0.4)] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 border-2 border-[#0A0A0A]"
              >
                <span>👑 INICIAR PROTOCOLO DE AUDITORÍA VIP</span>
                <span className="text-2xl">→</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleVipSubmit} className="space-y-6">
              
              {/* Indicador de Progreso */}
              <div className="flex items-center justify-between border-b border-black/10 pb-4">
                <div className="flex items-center gap-2">
                  {[1, 2, 3].map((s) => (
                    <span
                      key={s}
                      className={`w-8 h-8 rounded-full font-mono font-black text-xs flex items-center justify-center transition-all ${
                        step === s ? 'bg-[#FF4500] text-white scale-110 shadow-md' : step > s ? 'bg-[#10B981] text-white' : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step > s ? '✓' : s}
                    </span>
                  ))}
                  <span className="font-mono font-bold text-xs ml-2 text-gray-700">
                    {step === 1 && "Fase 1: Identidad & Restaurante"}
                    {step === 2 && "Fase 2: Radiografía Operativa"}
                    {step === 3 && "Fase 3: Cuello de Botella & WhatsApp"}
                  </span>
                </div>
                <span className="font-mono text-xs font-black text-gray-400">PASO {step} DE 3</span>
              </div>

              {/* PASO 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-1">
                      Nombre del Restaurante o Grupo Gastronómico *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.restaurantName}
                      onChange={(e) => setFormData({ ...formData, restaurantName: e.target.value })}
                      placeholder="Ej: Restaurante El Cenador VIP / Grupo DKitchen"
                      className="w-full p-4 rounded-xl border-2 border-black/20 focus:border-[#FF4500] outline-none font-medium bg-[#FDFCF8]"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-1">
                        Tu Nombre y Cargo (Decisor)
                      </label>
                      <input
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        placeholder="Ej: Carlos Gómez (Propietario)"
                        className="w-full p-4 rounded-xl border-2 border-black/20 focus:border-[#FF4500] outline-none font-medium bg-[#FDFCF8]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-1">
                        Ciudad / Ubicación
                      </label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Ej: Madrid / Barcelona / Marbella"
                        className="w-full p-4 rounded-xl border-2 border-black/20 focus:border-[#FF4500] outline-none font-medium bg-[#FDFCF8]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.restaurantName) alert("Por favor, ingresa el Nombre del Restaurante.");
                        else setStep(2);
                      }}
                      className="bg-[#0A0A0A] hover:bg-[#FF4500] text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Siguiente: Radiografía Operativa</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* PASO 2 */}
              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-1">
                      Modelo de Establecimiento
                    </label>
                    <select
                      value={formData.businessType}
                      onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                      className="w-full p-4 rounded-xl border-2 border-black/20 focus:border-[#FF4500] outline-none font-medium bg-[#FDFCF8]"
                    >
                      <option value="Alta Cocina / Restaurante Gourmet">Alta Cocina / Restaurante Gourmet</option>
                      <option value="Grupo de Restaurantes / Multi-local">Grupo de Restaurantes / Multi-local</option>
                      <option value="Coctelería VIP / Lounge Bar">Coctelería VIP / Lounge Bar</option>
                      <option value="Casual Dining / Fusión Premium">Casual Dining / Fusión Premium</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-1">
                        Afluencia Mensual Estimada
                      </label>
                      <select
                        value={formData.volume}
                        onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                        className="w-full p-4 rounded-xl border-2 border-black/20 focus:border-[#FF4500] outline-none font-medium bg-[#FDFCF8]"
                      >
                        <option value="Menos de 1.000 comensales / mes">Menos de 1.000 comensales / mes</option>
                        <option value="1.000 - 3.000 comensales / mes">1.000 - 3.000 comensales / mes</option>
                        <option value="Más de 3.000 comensales / mes">Más de 3.000 comensales / mes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-1">
                        Nivel de Digitalización Actual
                      </label>
                      <select
                        value={formData.digitalizationLevel}
                        onChange={(e) => setFormData({ ...formData, digitalizationLevel: e.target.value })}
                        className="w-full p-4 rounded-xl border-2 border-black/20 focus:border-[#FF4500] outline-none font-medium bg-[#FDFCF8]"
                      >
                        <option value="Básico (TPV tradicional + Carta papel)">Básico (TPV tradicional + Carta papel)</option>
                        <option value="Intermedio (TPV + Reservas Web básicas)">Intermedio (TPV + Reservas Web básicas)</option>
                        <option value="Avanzado (Buscando IA y automatización total)">Avanzado (Buscando IA y automatización total)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-5 py-3.5 rounded-xl transition-all"
                    >
                      ← Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="bg-[#0A0A0A] hover:bg-[#FF4500] text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Siguiente: Desbloquear Bonos</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              )}

              {/* PASO 3 */}
              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-1">
                      ¿Qué cuello de botella te gustaría eliminar prioritariamente con Architect.Sys?
                    </label>
                    <select
                      value={formData.mainChallenge}
                      onChange={(e) => setFormData({ ...formData, mainChallenge: e.target.value })}
                      className="w-full p-4 rounded-xl border-2 border-black/20 focus:border-[#FF4500] outline-none font-medium bg-[#FDFCF8]"
                    >
                      <option value="Eliminar comisiones por reserva (El Tenedor, etc.) y crear canal directo">Eliminar comisiones por reserva (El Tenedor, etc.) y crear canal directo</option>
                      <option value="Sincronización en cocina KDS para eliminar errores en picos de trabajo">Sincronización en cocina KDS para eliminar errores en picos de trabajo</option>
                      <option value="Aumentar el ticket medio (+30%) con cartas inteligentes IA de venta cruzada">Aumentar el ticket medio (+30%) con cartas inteligentes IA de venta cruzada</option>
                      <option value="Automatización total de reservas por WhatsApp 24/7 con IA">Automatización total de reservas por WhatsApp 24/7 con IA</option>
                    </select>
                  </div>

                  <div className="bg-[#10B981]/10 p-4 rounded-2xl border-2 border-[#10B981]/30">
                    <label className="block text-xs font-bold text-[#0A0A0A] uppercase tracking-wider mb-1">
                      Tu Teléfono / WhatsApp Directo (Para vincular tu Expediente VIP) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Ej: +34 600 000 000"
                      className="w-full p-4 rounded-xl border-2 border-[#10B981] focus:ring-4 ring-[#10B981]/20 outline-none font-bold text-lg bg-white"
                    />
                    <p className="text-[11px] text-gray-600 mt-1">
                      ⚡ Al confirmar, tu expediente se guardará de forma cifrada y se abrirá WhatsApp con Alex para fijar hora en Calendly.
                    </p>
                  </div>

                  <div className="flex justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-5 py-3.5 rounded-xl transition-all"
                    >
                      ← Atrás
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-[#10B981] to-[#059669] hover:from-[#059669] hover:to-[#047857] text-white font-display font-black text-base sm:text-lg px-8 py-4 rounded-xl shadow-xl hover:shadow-[0_10px_25px_rgba(16,185,129,0.4)] transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 border-2 border-[#0A0A0A] w-full sm:w-auto"
                    >
                      {isSubmitting ? (
                        <span>⏳ ENVIANDO EXPEDIENTE...</span>
                      ) : (
                        <span>🚀 CONFIRMAR REGISTRO & ABRIR WHATSAPP CON ALEX</span>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}

        </section>

        {/* BOTONES DIRECTOS CLÁSICOS DE ACCIÓN RÁPIDA */}
        <section className="space-y-3.5 w-full pt-2">
          
          <a 
            href="https://calendly.com/dkitchencorporate/pase-vip" 
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-full bg-[#0A0A0A] hover:bg-[#FF4500] text-white p-5 sm:p-6 rounded-3xl border-2 border-[#0A0A0A] shadow-xl hover:shadow-[0_20px_45px_rgba(255,69,0,0.3)] transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/10 group-hover:bg-white text-white group-hover:text-[#FF4500] flex items-center justify-center shrink-0 transition-colors font-mono font-black text-base sm:text-lg">
                  VIP
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-black text-base sm:text-xl tracking-tight">
                      Agendar Sesión Directa en Calendly
                    </span>
                    <span className="bg-white/20 group-hover:bg-white group-hover:text-[#0A0A0A] text-white font-mono text-[8px] sm:text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors">
                      ACCESO RÁPIDO
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-white/80 group-hover:text-white font-normal mt-1 leading-relaxed">
                    Si ya tienes claro tu objetivo, elige tu franja horaria de 30 minutos en el calendario oficial.
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 group-hover:bg-white group-hover:text-[#0A0A0A] flex items-center justify-center shrink-0 transition-all font-mono font-bold text-base sm:text-lg">
                →
              </div>
            </div>
          </a>

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
