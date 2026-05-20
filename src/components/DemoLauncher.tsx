'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const ChatDemoWidget = dynamic(() => import('./ChatDemoWidget'), { ssr: false });

export default function DemoLauncher() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="hidden sm:block">
        <button onClick={() => setOpen(true)} className="inline-flex items-center justify-center gap-3 bg-[#FF4500] text-white px-6 md:px-10 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold shadow-[0_0_40px_rgba(255,69,0,0.4)] hover:-translate-y-2 transition-all duration-300 whitespace-nowrap">
          Ver demostración en vivo
        </button>
      </div>

      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        title="Probar demo con IA"
        className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full bg-white shadow-lg px-4 py-2 text-sm font-medium text-gray-900 border border-gray-200 hover:bg-gray-50 md:px-5 md:py-3"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#FF4500] text-white text-xs">
          💬
        </span>
        <span className="block">Probar demo en vivo</span>
      </button>

      {open && <ChatDemoWidget onClose={() => setOpen(false)} />}
    </>
  );
}
