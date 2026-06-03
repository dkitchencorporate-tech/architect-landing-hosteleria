'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';

const ChatDemoWidget = dynamic(() => import('./ChatDemoWidget'), { ssr: false });

export default function DemoLauncher() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const floatingButton = (
    <div className="fixed bottom-6 right-6 z-[9999] group pointer-events-none">
      {/* Halo de radar llamativo */}
      <div className="absolute inset-0 bg-[#FF4500] rounded-full blur-[30px] opacity-20 group-hover:opacity-40 animate-[pulse_3s_ease-in-out_infinite] transition-opacity duration-700"></div>
      
      {/* Animación flotante suave */}
      <button
        onClick={() => setOpen(true)}
        title="Iniciar Consultoría Interactiva"
        className="pointer-events-auto relative flex items-center gap-3 rounded-full bg-[#050505] shadow-[0_0_30px_rgba(255,69,0,0.4)] hover:shadow-[0_0_50px_rgba(255,69,0,0.8)] px-5 py-3 md:px-6 md:py-4 border border-white/10 hover:bg-[#111] transition-all hover:-translate-y-2 animate-[bounce_4s_infinite]"
        style={{ animation: 'float 6s ease-in-out infinite' }}
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4500] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF4500]"></span>
        </span>
        <span className="block font-bold tracking-widest uppercase text-[10px] md:text-xs text-white">Consultoría Interactiva</span>
      </button>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0px); }
        }
      `}} />
    </div>
  );

  return (
    <>
      <div className="hidden sm:block">
        <button onClick={() => setOpen(true)} className="inline-flex items-center justify-center gap-3 bg-[#FF4500] text-white px-6 md:px-10 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold shadow-[0_0_40px_rgba(255,69,0,0.4)] hover:-translate-y-2 transition-all duration-300 whitespace-nowrap">
          Ver demostración en vivo
        </button>
      </div>

      {mounted && createPortal(floatingButton, document.body)}

      {open && <ChatDemoWidget onClose={() => setOpen(false)} />}
    </>
  );
}
