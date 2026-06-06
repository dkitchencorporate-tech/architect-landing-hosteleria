'use client';

import React, { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si ya se aceptaron las cookies previamente
    const consent = localStorage.getItem('architect_cookie_consent');
    if (!consent) {
      // Pequeño retraso para que no sea lo primero que vea de golpe
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem('architect_cookie_consent', 'all');
    setIsVisible(false);
  };

  const rejectNonEssential = () => {
    localStorage.setItem('architect_cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className=&quot;fixed bottom-0 left-0 right-0 z-[9998] p-4 sm:p-6 pointer-events-none&quot;>
      <div className=&quot;max-w-4xl mx-auto bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 pointer-events-auto animate-fade-in-up&quot;>
        
        <div className=&quot;flex-1 text-center md:text-left&quot;>
          <h3 className=&quot;text-white font-bold text-lg mb-2 flex items-center justify-center md:justify-start gap-2&quot;>
            🍪 Privacidad y Cookies
          </h3>
          <p className=&quot;text-gray-400 text-sm leading-relaxed text-pretty&quot;>
            Utilizamos cookies propias y de terceros (Pixel de Meta) para entender cómo interactúas con nuestra web y poder ofrecerte anuncios relevantes que te ayuden a llenar tu restaurante. 
            Al hacer clic en &quot;Aceptar&quot;, consientes el uso de todas las cookies. Tienes más detalles en nuestra <a href=&quot;/privacy&quot; className=&quot;text-orange-400 hover:underline&quot;>Política de Privacidad</a>.
          </p>
        </div>

        <div className=&quot;flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0&quot;>
          <button 
            onClick={rejectNonEssential}
            className=&quot;px-6 py-3 rounded-full text-sm font-bold text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-600&quot;
          >
            Solo esenciales
          </button>
          <button 
            onClick={acceptAll}
            className=&quot;px-6 py-3 rounded-full text-sm font-bold text-white bg-[#FF4500] hover:bg-orange-600 transition-colors shadow-lg hover:shadow-orange-500/50&quot;
          >
            Aceptar todas
          </button>
        </div>

      </div>
    </div>
  );
}
