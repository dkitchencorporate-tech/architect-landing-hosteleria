'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { createPortal } from 'react-dom';

const ChatDemoWidget = dynamic(() => import('./ChatDemoWidget'), { ssr: false });

export default function DemoLauncher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openArqui = () => {
    window.dispatchEvent(new Event('open_arqui'));
  };

  return (
    <>
      <div className="hidden sm:block">
        <button onClick={openArqui} className="inline-flex items-center justify-center gap-3 bg-[#FF4500] text-white px-6 md:px-10 py-4 md:py-5 rounded-full text-lg md:text-xl font-bold shadow-[0_0_40px_rgba(255,69,0,0.4)] hover:-translate-y-2 transition-all duration-300 whitespace-nowrap">
          Ver demostración en vivo
        </button>
      </div>
    </>
  );
}
