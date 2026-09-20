'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

/**
 * Navegación de las páginas de marketing.
 *
 * Antes esto vivía embebido dentro de `src/app/page.tsx`, con enlaces a
 * anclas (`#suscripciones`, `#eventos`, `#dark-kitchen`) porque todo el sitio
 * era una sola página larga. Al repartir el contenido en páginas reales
 * (Fase 4), los enlaces pasan a ser rutas de verdad: se puede llegar a
 * "Precios" directamente desde un resultado de búsqueda o un enlace
 * compartido, no solo haciendo scroll desde la home.
 */

const ENLACES = [
  { href: '/qr', etiqueta: 'QR' },
  { href: '/experience', etiqueta: 'Experience' },
  { href: '/auditoria', etiqueta: 'Auditoría' },
  { href: '/base-operativa', etiqueta: 'Base Operativa' },
  { href: '/dark-kitchen', etiqueta: 'Dark Kitchen' },
  { href: '/faq', etiqueta: 'Preguntas' },
] as const;

const WHATSAPP_AUDITORIA =
  'https://wa.me/34622652659?text=Hola,%20quiero%20solicitar%20la%20Auditoría%20Gratuita.';

export default function NavBar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-[100] bg-black/90 backdrop-blur-md border-b border-white/10 shadow-xl">
      <div className="flex items-center justify-between py-3 md:py-4 px-4 md:px-8 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-xl md:text-2xl font-black tracking-tighter text-white hover:scale-105 transition-transform shrink-0"
        >
          D<span className="text-[#FF4500]">Kitchen</span>
        </Link>

        {/* Escritorio: enlaces en línea */}
        <div className="hidden lg:flex items-center bg-[#1A1A1A]/90 border border-white/10 rounded-full p-1.5 shadow-[0_4px_30px_rgba(255,69,0,0.2)] backdrop-blur-md">
          {ENLACES.map((enlace, i) => {
            const activo = pathname === enlace.href;
            return (
              <div key={enlace.href} className="flex items-center">
                {i > 0 && <div className="w-px h-4 bg-white/20 mx-1" />}
                <Link
                  href={enlace.href}
                  aria-current={activo ? 'page' : undefined}
                  className={`whitespace-nowrap px-3 xl:px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    activo
                      ? 'bg-[#FF4500] text-white shadow-[0_0_15px_rgba(255,69,0,0.5)]'
                      : 'text-gray-300 hover:text-white hover:bg-[#FF4500] hover:shadow-[0_0_15px_rgba(255,69,0,0.5)]'
                  }`}
                >
                  {enlace.etiqueta}
                </Link>
              </div>
            );
          })}
        </div>

        <a
          href={WHATSAPP_AUDITORIA}
          className="hidden lg:inline-flex bg-[#FF4500] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/50 hover:-translate-y-1"
        >
          Auditoría Gratuita
        </a>

        {/* Móvil/tablet: botón de menú */}
        <button
          onClick={() => setMenuAbierto((v) => !v)}
          aria-expanded={menuAbierto}
          aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'}
          className="lg:hidden text-white p-2 -mr-2"
        >
          {menuAbierto ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Móvil/tablet: panel desplegable */}
      {menuAbierto && (
        <div className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-md px-4 py-4 flex flex-col gap-1">
          {ENLACES.map((enlace) => (
            <Link
              key={enlace.href}
              href={enlace.href}
              onClick={() => setMenuAbierto(false)}
              className={`px-4 py-3 rounded-lg text-sm font-bold ${
                pathname === enlace.href ? 'bg-[#FF4500] text-white' : 'text-gray-300 hover:bg-white/5'
              }`}
            >
              {enlace.etiqueta}
            </Link>
          ))}
          <a
            href={WHATSAPP_AUDITORIA}
            className="mt-2 bg-[#FF4500] text-white px-4 py-3 rounded-lg font-bold text-sm text-center"
          >
            Auditoría Gratuita
          </a>
        </div>
      )}
    </nav>
  );
}
