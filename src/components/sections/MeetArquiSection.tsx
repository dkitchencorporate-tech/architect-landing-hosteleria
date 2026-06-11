"use client";

import React from 'react';

export default function MeetArquiSection() {
  const openArqui = () => {
    window.dispatchEvent(new Event('open_arqui'));
  };

  return (
    <section className="py-24 bg-gray-900 text-white relative overflow-hidden border-t border-gray-800">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#FF4500] rounded-full blur-[150px] opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="bg-[#111] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-12">
          
          <div className="shrink-0 relative">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-black border-4 border-[#FF4500]/50 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,69,0,0.3)] overflow-hidden">
              <img src="/images/arqui.png" alt="Arqui, tu Especialista HORECA" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-[#FF4500] text-white text-xs font-black px-4 py-1 rounded-full uppercase tracking-widest border-2 border-black">
              Online
            </div>
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 leading-tight text-balance">
              Conoce a tu Nuevo <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-orange-400">Director de Atención Digital.</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-medium mb-8 text-pretty max-w-2xl">
              Esa burbuja flotante no es un simple bot. Es Arqui, una IA inteligente diseñada para estar siempre presente ante cualquier situación de atención al cliente. Arqui escucha a tus comensales, responde dudas al instante, gestiona reservas y se asegura de que ninguna oportunidad se escape mientras tú y tu equipo os encargáis de dar el mejor servicio en el local.
            </p>
            
            <button 
              onClick={openArqui}
              className="inline-flex items-center justify-center gap-3 bg-[#FF4500] text-white px-8 py-4 rounded-full text-lg font-black shadow-[0_0_30px_rgba(255,69,0,0.4)] hover:shadow-[0_0_50px_rgba(255,69,0,0.6)] hover:-translate-y-1 hover:bg-orange-600 transition-all"
            >
              Habla con Arqui Ahora
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
