'use client';

import React, { useState, useEffect, useRef } from 'react';

/**
 * src/components/ExitIntent.tsx
 * Componente de captura de leads por intención de salida.
 * Flujo optimizado: Bonos de 1.150€ -> Cierre dual (WhatsApp rápido / Calendly corporativo).
 */

export default function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isAnyModalOpen, setIsAnyModalOpen] = useState(false);
  
  // Refs para tracking de scroll en móvil
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(Date.now());
  
  useEffect(() => {
    if (typeof window === 'undefined' || hasShown) return;

    // Retrasar la activación para no ser invasivo al entrar (mínimo 5 segundos en la página)
    let canTrigger = false;
    const triggerDelay = setTimeout(() => { canTrigger = true; }, 5000);

    const showModal = () => {
      if (canTrigger && !hasShown && !isAnyModalOpen) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // --- DETECCIÓN DESKTOP (Mouse Leave superior) ---
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10) {
        showModal();
      }
    };

    // --- DETECCIÓN MOBILE (Scroll Up Rápido + Inactividad) ---
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();
      
      const scrollDelta = lastScrollY.current - currentScrollY;
      const timeDelta = currentTime - lastScrollTime.current;
      
      // Velocidad del scroll (px por ms)
      const scrollVelocity = timeDelta > 0 ? (scrollDelta / timeDelta) : 0;
      
      // Si el usuario scrollea hacia arriba rápido (velocidad > 1.5) y está por debajo de 600px
      if (currentScrollY > 600 && scrollVelocity > 1.5) {
        showModal();
      }
      
      lastScrollY.current = currentScrollY;
      lastScrollTime.current = currentTime;
      resetInactivity();
    };

    let inactivityTimer: NodeJS.Timeout;
    const resetInactivity = () => {
      clearTimeout(inactivityTimer);
      // Disparar tras 60 segundos de inactividad
      inactivityTimer = setTimeout(() => {
        showModal();
      }, 60000);
    };

    const handleModalOpen = () => setIsAnyModalOpen(true);
    const handleModalClose = () => setIsAnyModalOpen(false);

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('touchstart', resetInactivity, { passive: true });
    
    // Escuchar eventos globales de otros modales (ej: Calendly)
    window.addEventListener('modal_opened', handleModalOpen);
    window.addEventListener('modal_closed', handleModalClose);
    window.addEventListener('chat_opened', handleModalOpen); // si hay chat flotante
    window.addEventListener('chat_closed', handleModalClose);
    
    resetInactivity();

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('touchstart', resetInactivity);
      window.removeEventListener('modal_opened', handleModalOpen);
      window.removeEventListener('modal_closed', handleModalClose);
      window.removeEventListener('chat_opened', handleModalOpen);
      window.removeEventListener('chat_closed', handleModalClose);
      clearTimeout(inactivityTimer);
      clearTimeout(triggerDelay);
    };
  }, [hasShown, isAnyModalOpen]);

  // Si no está visible o hay otro modal abierto, no renderizamos nada
  if (!isVisible || isAnyModalOpen) return null;

  // Redirigir hacia el ancla del Calendly o disparar el modal
  const handleOpenCalendly = () => {
    setIsVisible(false);
    // Encontramos el botón principal de agendar para abrir el ConsultingModal original
    // Alternativamente, el usuario puede simplemente scrollear a una sección.
    // Usaremos dispatchEvent para abrir el ConsultingModal si está montado globalmente,
    // o redirigir a un ancla si existe. 
    
    // Dispatch custom event if your app structure supports it:
    // window.dispatchEvent(new Event('open_consulting_modal'));
    
    // O simplemente alertar al usuario o hacer scroll suave a la tarjeta de precios:
    const baseElement = document.getElementById('solucion-base');
    if (baseElement) {
      baseElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 drop-shadow-2xl">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-xl transition-opacity duration-500"
        onClick={() => setIsVisible(false)}
      ></div>
      
      <div className="relative bg-[#FDFCF8] max-w-lg w-full rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-8 border border-white/20 shadow-[0_30px_100px_rgba(255,69,0,0.2)] animate-in fade-in zoom-in duration-500 max-h-[95vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        
        <button 
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 text-gray-400 hover:text-gray-900 transition-all hover:rotate-90 z-10"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="text-center flex flex-col items-center mt-2 sm:mt-0 h-full w-full">
          
          <div className="flex-none text-center">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 text-[#FF4500] rounded-full flex items-center justify-center text-xl sm:text-2xl mb-3 mx-auto group animate-bounce">
              🎁
            </div>
            <h2 className="text-xl sm:text-2xl font-black leading-tight text-gray-900 mb-2 text-balance">
              ¿Te vas tan pronto? Llévate nuestro <span className="text-[#FF4500]">Pack de Arranque</span>
            </h2>
            <div className="text-[#FF4500] font-black text-[10px] sm:text-xs uppercase tracking-widest mb-4">
               Totalmente GRATIS (Valor: 1.150€)
            </div>
          </div>
          
          <div className="flex-1 w-full overflow-y-auto pr-1 mb-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-left">
              <div className="space-y-4 text-xs sm:text-sm font-medium text-gray-800">
                
                <div className="flex items-start gap-3">
                  <span className="text-[#25D366] font-bold mt-0.5">✔</span> 
                  <div>
                    <strong className="text-gray-900 font-bold block">Auditoría Fuga de Clientes (180€)</strong>
                    <span className="text-gray-500 leading-tight block mt-0.5">Análisis de tu Google Maps para robar tráfico a tu competencia.</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#25D366] font-bold mt-0.5">✔</span> 
                  <div>
                    <strong className="text-gray-900 font-bold block">Ingeniería de Carta Física (250€)</strong>
                    <span className="text-gray-500 leading-tight block mt-0.5">Rediseño con neuromarketing enfocado en platos de alto margen.</span>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <span className="text-[#25D366] font-bold mt-0.5">✔</span> 
                  <div>
                    <strong className="text-gray-900 font-bold block">Estrategia Días Valle (300€)</strong>
                    <span className="text-gray-500 leading-tight block mt-0.5">Plan de acción táctico para llenar tu local martes y miércoles.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[#25D366] font-bold mt-0.5">✔</span> 
                  <div>
                    <strong className="text-gray-900 font-bold block">Kit Lanzamiento Redes (250€)</strong>
                    <span className="text-gray-500 leading-tight block mt-0.5">12 publicaciones profesionales generadas con IA listas para subir.</span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="flex-none w-full mt-auto space-y-4">
            {/* CTA Primario: WhatsApp (Mínima Fricción) */}
            <a 
              href="https://wa.me/34611499674?text=Hola,%20iba%20a%20salir%20de%20la%20web%20pero%20vi%20el%20Pack%20de%20Arranque%20de%201.150€.%20Me%20interesa%20reclamarlo."
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full bg-[#25D366] text-white py-4 px-4 rounded-xl font-black text-lg shadow-[0_10px_20px_rgba(37,211,102,0.2)] hover:bg-[#1ebd5a] hover:-translate-y-1 transition-all duration-300 justify-center items-center gap-2"
            >
              Reclamar Bonos por WhatsApp
            </a>
            
            {/* CTA Secundario: Scroll suave */}
            <button 
              onClick={handleOpenCalendly}
              className="w-full text-gray-500 font-bold hover:text-[#FF4500] transition-colors text-sm py-2 underline decoration-transparent hover:decoration-[#FF4500] underline-offset-4"
            >
              O leer más detalles sobre la Base Operativa
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
