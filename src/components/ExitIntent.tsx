'use client';

import React, { useState, useEffect } from 'react';

/**
 * src/components/ExitIntent.tsx
 * Componente de captura de leads por intención de salida (Embudo 3 Fases).
 * Protocolo: B2B, Consultivo, Alta Conversión.
 */

export default function ExitIntent() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  // Estados del Embudo
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', consent: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || hasShown) return;

    // Retrasar la activación para no ser invasivo al entrar (mínimo 10 segundos en la página)
    let canTrigger = false;
    const triggerDelay = setTimeout(() => { canTrigger = true; }, 10000);

    // --- DETECCIÓN DESKTOP (Mouse Leave superior) ---
    const handleMouseLeave = (e: MouseEvent) => {
      if (canTrigger && e.clientY <= 5) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    // --- DETECCIÓN MOBILE (Interacción / Inactividad) ---
    let inactivityTimer: NodeJS.Timeout;

    const resetInactivity = () => {
      clearTimeout(inactivityTimer);
      // Disparar tras 60 segundos de inactividad 
      inactivityTimer = setTimeout(() => {
        if (canTrigger) {
          setIsVisible(true);
          setHasShown(true);
        }
      }, 60000);
    };

    const handleChatOpen = () => setIsChatOpen(true);
    const handleChatClose = () => setIsChatOpen(false);

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchstart', resetInactivity);
    window.addEventListener('scroll', resetInactivity);
    window.addEventListener('chat_opened', handleChatOpen);
    window.addEventListener('chat_closed', handleChatClose);
    
    resetInactivity();

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchstart', resetInactivity);
      window.removeEventListener('scroll', resetInactivity);
      window.removeEventListener('chat_opened', handleChatOpen);
      window.removeEventListener('chat_closed', handleChatClose);
      clearTimeout(inactivityTimer);
      clearTimeout(triggerDelay);
    };
  }, [hasShown]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email || !formData.consent) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStep(3);
      } else {
        alert('Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error enviando lead:', error);
      alert('Error de conexión. Por favor, inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isVisible || isChatOpen) return null;

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

        <div className="text-center flex flex-col items-center mt-2 sm:mt-0">
          
          {/* FASE 1: PITCH B2B */}
          {step === 1 && (
            <div className="flex flex-col h-full w-full animate-in slide-in-from-right-4 duration-300">
              
              <div className="flex-none text-center">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-orange-100 text-[#FF4500] rounded-full flex items-center justify-center text-xl sm:text-2xl mb-3 mx-auto group animate-bounce">
                  ✋
                </div>
                <h2 className="text-xl sm:text-2xl font-black leading-tight text-gray-900 mb-2 text-balance">
                  ¡Espera! No te vayas sin reclamar tus <span className="text-[#FF4500]">Bonos Exclusivos</span>
                </h2>
                <div className="text-[#FF4500] font-black text-[10px] sm:text-xs uppercase tracking-widest mb-3">
                   BONIFICACIÓN POR ACTIVACIÓN (Valor: 620€)
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto pr-1 mb-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-200 [&::-webkit-scrollbar-thumb]:rounded-full">
                <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-left">
                  <div className="space-y-3.5 text-xs sm:text-sm font-medium text-gray-800">
                    
                    <div className="flex items-start gap-2.5">
                      <span className="text-[#25D366] font-bold mt-0.5">✔</span> 
                      <div>
                        <strong className="text-gray-900 font-bold block">Auditoría Google Maps & Redes (150€)</strong>
                        <span className="text-gray-500 leading-tight block mt-0.5">Análisis de tu ficha, informe PDF y consultoría privada de 20 min.</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2.5">
                      <span className="text-[#25D366] font-bold mt-0.5">✔</span> 
                      <div>
                        <strong className="text-gray-900 font-bold block">Diseño de Carta Física Premium (150€)</strong>
                        <span className="text-gray-500 leading-tight block mt-0.5">Maquetamos tu menú en un PDF elegante y listo para imprenta.</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2.5">
                      <span className="text-[#25D366] font-bold mt-0.5">✔</span> 
                      <div>
                        <strong className="text-gray-900 font-bold block">Estrategia de Venta Local (120€)</strong>
                        <span className="text-gray-500 leading-tight block mt-0.5">Diseñamos una promoción para subir las ventas en tus días más lentos.</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <span className="text-[#25D366] font-bold mt-0.5">✔</span> 
                      <div>
                        <strong className="text-gray-900 font-bold block">Lanzamiento Redes Sociales (200€)</strong>
                        <span className="text-gray-500 leading-tight block mt-0.5">Pack de 12 publicaciones profesionales con IA, textos e imágenes.</span>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

              <div className="flex-none pt-2 mt-auto">
                <button 
                  onClick={() => setStep(2)}
                  className="block w-full bg-gray-900 text-white py-3.5 sm:py-4 rounded-full font-black text-base sm:text-lg shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:bg-[#FF4500] hover:-translate-y-1 transition-all duration-300"
                >
                  Quiero mis Bonos y Consultoría
                </button>
              </div>

            </div>
          )}

          {/* FASE 2: FORMULARIO */}
          {step === 2 && (
            <div className="animate-in slide-in-from-right-4 duration-300 w-full">
              <h2 className="text-2xl font-black text-gray-900 mb-2">Solicita tu Auditoría</h2>
              <p className="text-sm text-gray-500 mb-6 font-medium">Déjanos tus datos para asignarte un Consultor Senior.</p>
              
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Nombre Completo</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FF4500] focus:ring-2 focus:ring-orange-100 transition-all font-medium text-gray-900" placeholder="Ej. Carlos Martínez" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">WhatsApp</label>
                  <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FF4500] focus:ring-2 focus:ring-orange-100 transition-all font-medium text-gray-900" placeholder="+34 600 000 000" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1">Email Profesional</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-[#FF4500] focus:ring-2 focus:ring-orange-100 transition-all font-medium text-gray-900" placeholder="carlos@restaurante.com" />
                </div>
                
                <label className="flex items-start gap-3 mt-4 cursor-pointer group">
                  <div className="relative flex items-center mt-1">
                    <input type="checkbox" required checked={formData.consent} onChange={e => setFormData({...formData, consent: e.target.checked})} className="peer w-5 h-5 appearance-none border-2 border-gray-300 rounded-md checked:bg-[#FF4500] checked:border-[#FF4500] transition-colors cursor-pointer" />
                    <svg className="absolute w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100 text-white left-1 top-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-xs text-gray-500 font-medium leading-tight">
                    Acepto las políticas de privacidad y consiento ser contactado vía WhatsApp para coordinar mi consultoría.
                  </span>
                </label>

                <button 
                  type="submit"
                  disabled={isSubmitting || !formData.consent}
                  className="w-full mt-6 bg-[#FF4500] text-white py-4 rounded-xl font-black text-lg shadow-xl hover:bg-orange-600 transition-all duration-300 disabled:opacity-50 disabled:bg-gray-400 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : "Confirmar Solicitud"}
                </button>
              </form>
            </div>
          )}

          {/* FASE 3: ÉXITO Y URGENCIA */}
          {step === 3 && (
            <div className="animate-in zoom-in-95 duration-500 py-6">
              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mb-6 mx-auto">
                ✓
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-3">¡Solicitud Registrada!</h2>
              <p className="text-gray-600 font-medium mb-8 leading-relaxed">
                Hemos recibido tus datos correctamente. Un Consultor Senior analizará tu caso y te contactará en breve.
              </p>
              
              <div className="border-t border-gray-100 pt-8 w-full">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">¿Tu negocio necesita soluciones urgentes?</p>
                <a 
                  href={`https://wa.me/34611499674?text=Hola,%20acabo%20de%20dejar%20mis%20datos%20(${formData.name}).%20Quiero%20hablar%20con%20un%20consultor%20ahora%20mismo.`}
                  className="block w-full bg-[#25D366] text-white py-4 rounded-full font-black text-lg shadow-[0_10px_30px_rgba(37,211,102,0.3)] hover:bg-[#1ebd5a] hover:-translate-y-1 transition-all duration-300"
                >
                  Quiero comunicarme YA
                </a>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
