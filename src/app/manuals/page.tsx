'use client';

import React from 'react';
import Link from 'next/link';

export default function ManualsIndex() {
  const manuals = [
    {
      title: 'Configuración de Google OAuth',
      description: 'Protocolo para autorizar el botón de inicio de sesión con Google y publicar la aplicación de autenticación para producción.',
      href: '/manuals/google-oauth',
      date: '12 Junio 2026',
      tag: 'Seguridad'
    }
  ];

  return (
    <div className="space-y-8 print:block">
      <div>
        <h2 className="text-3xl font-black text-white print:text-black tracking-tighter">Índice Operativo</h2>
        <p className="text-zinc-400 print:text-zinc-600 mt-2">Protocolos y manuales (SOP) estandarizados de Architect.Sys.</p>
      </div>

      <div className="grid gap-4 print:grid-cols-1">
        {manuals.map((manual, idx) => (
          <Link key={idx} href={manual.href} className="block group">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors print:border-black print:bg-transparent">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-white print:text-black group-hover:text-[#FF4500] transition-colors">{manual.title}</h3>
                <span className="text-[10px] font-bold uppercase tracking-widest bg-white/10 text-zinc-300 print:bg-zinc-200 print:text-black px-2 py-1 rounded-md">{manual.tag}</span>
              </div>
              <p className="text-sm text-zinc-400 print:text-zinc-600 mb-4">{manual.description}</p>
              <div className="text-xs text-zinc-500 font-medium">Actualizado: {manual.date}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
