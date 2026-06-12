import React from 'react';
import Link from 'next/link';

export default function ManualsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#020202] text-zinc-300 font-sans print:bg-white print:text-black">
      {/* Navbar Solo en Pantalla */}
      <header className="border-b border-white/5 bg-white/[0.02] backdrop-blur-md sticky top-0 z-50 print:hidden">
        <div className="max-w-[1000px] mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/manuals" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-white to-zinc-400 text-black font-black text-lg flex items-center justify-center rounded-lg shadow-lg">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white">Architect.Sys Hub</h1>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block leading-none">Manuales y SOPs</span>
            </div>
          </Link>

          <nav className="flex items-center gap-4">
            <Link href="/dashboard" className="text-xs font-bold text-zinc-500 hover:text-white transition-colors">
              Ir al Dashboard
            </Link>
          </nav>
        </div>
      </header>

      {/* Contenedor Principal */}
      <main className="max-w-[1000px] mx-auto px-6 py-12 print:py-0 print:px-0">
        {/* Cabecera corporativa de impresión (Solo visible al imprimir) */}
        <div className="hidden print:block border-b-2 border-black pb-4 mb-8">
          <h1 className="text-3xl font-black uppercase tracking-tighter">Architect.Sys</h1>
          <p className="text-sm font-bold text-zinc-500 uppercase">Documentación Operativa y Protocolos (SOP)</p>
          <p className="text-xs text-zinc-400 mt-1">Generado automáticamente desde la matriz central.</p>
        </div>

        {/* Contenido del Documento */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-xl print:bg-transparent print:border-none print:shadow-none print:p-0 print:backdrop-blur-none print:text-black prose prose-invert prose-orange max-w-none print:prose-p:text-black print:prose-headings:text-black print:prose-a:text-blue-700 print:prose-strong:text-black print:prose-li:text-black">
          {children}
        </div>

        {/* Pie de página de impresión */}
        <div className="hidden print:block mt-12 pt-4 border-t border-zinc-200 text-xs text-center text-zinc-500 font-medium">
          DOCUMENTO CONFIDENCIAL - USO INTERNO ARCHITECT.SYS
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page {
            margin: 2cm;
            size: A4;
          }
        }
      `}} />
    </div>
  );
}
