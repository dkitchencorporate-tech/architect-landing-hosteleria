import React from 'react';
import Link from 'next/link';
import AggressiveHero from '@/components/sections/AggressiveHero';
import PowerStatement from '@/components/sections/PowerStatement';
import LiveDemoCTA from '@/components/sections/LiveDemoCTA';
import FounderBio from '@/components/sections/FounderBio';
import CtaFinal from '@/components/sections/CtaFinal';

/**
 * Home — secuencia de bloques según DKITCHEN_MIGRATION_PLAN_PARTE6.md, Sección 2:
 * HERO -> POWER-STATEMENT -> FEATURE-SPLIT (escalera asimétrica) -> demo en vivo
 * (prueba interactiva) -> PROOF-BLOCK (fundador) -> CTA-FINAL.
 *
 * Se retiran el manifiesto genérico ("La hostelería ha cambiado...") y el
 * bloque "Cómo funciona en 3 pasos": no encajan en el vocabulario de bloques
 * de la Parte 6 y repetían lenguaje de agencia genérica que el propio
 * posicionamiento de marca evita (ver manuals/estrategia-ventas).
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans selection:bg-[#D9531E] selection:text-white overflow-x-hidden">
      <AggressiveHero />

      <PowerStatement texto="Cero comisiones sobre cada ticket. Los datos de tu cliente se quedan contigo." />

      {/* FEATURE-SPLIT — la escalera, con peso asimétrico (Parte 6, Sección 2) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-black text-balance">Una escalera, no un catálogo suelto</h2>
            <p className="text-gray-600 mt-3">Cada peldaño se apoya en el anterior. Entra por donde tenga sentido para ti.</p>
          </div>

          {/* QR Menú — la puerta de entrada, mayor peso visual */}
          <Link
            href="/qr"
            className="group block rounded-[2rem] border-2 border-[#D9531E]/30 bg-gradient-to-br from-orange-50 to-white p-8 md:p-12 mb-6 hover:border-[#D9531E] hover:shadow-2xl transition-all relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full blur-[100px] opacity-60 -z-10"></div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
              <div className="text-6xl md:text-7xl shrink-0">📱</div>
              <div className="flex-1">
                <div className="inline-block bg-[#D9531E] text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                  Empieza aquí
                </div>
                <h3 className="text-2xl md:text-4xl font-black mb-2 group-hover:text-[#D9531E] transition-colors">QR Menú</h3>
                <p className="text-gray-600 text-base md:text-lg max-w-xl">
                  La puerta de entrada: carta digital con checkout propio, desde 9€/mes. Imprime una vez, cambia tu carta las veces que quieras.
                </p>
              </div>
              <div className="shrink-0 text-[#D9531E] font-black text-lg group-hover:translate-x-1 transition-transform">
                Ver planes →
              </div>
            </div>
          </Link>

          {/* Los otros 4 peldaños — fila secundaria, más compacta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <Link
              href="/experience"
              className="group rounded-2xl border-2 border-gray-100 p-6 hover:border-orange-400 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">🎉</div>
              <h3 className="text-lg font-bold mb-1 group-hover:text-orange-500 transition-colors">Experience</h3>
              <p className="text-gray-600 text-sm">Llena tus días valle con formatos de evento ya diseñados.</p>
            </Link>
            <Link
              href="/auditoria"
              className="group rounded-2xl border-2 border-gray-100 p-6 hover:border-blue-400 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">🔎</div>
              <h3 className="text-lg font-bold mb-1 group-hover:text-blue-500 transition-colors">Auditoría</h3>
              <p className="text-gray-600 text-sm">Diagnóstico de tu presencia digital, sin promesas vacías.</p>
            </Link>
            <Link
              href="/base-operativa"
              className="group rounded-2xl border-2 border-gray-100 p-6 hover:border-gray-900 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">🏗️</div>
              <h3 className="text-lg font-bold mb-1 group-hover:text-gray-900 transition-colors">Base Operativa</h3>
              <p className="text-gray-600 text-sm">La PWA completa como sistema operativo de tu negocio.</p>
            </Link>
            <Link
              href="/dark-kitchen"
              className="group rounded-2xl border-2 border-gray-100 p-6 hover:border-red-500 hover:shadow-lg transition-all"
            >
              <div className="text-3xl mb-3">🔥</div>
              <h3 className="text-lg font-bold mb-1 group-hover:text-red-500 transition-colors">Dark Kitchen</h3>
              <p className="text-gray-600 text-sm">Exprime la capacidad ociosa de tus fogones con marcas virtuales.</p>
            </Link>
          </div>
        </div>
      </section>

      <LiveDemoCTA />

      <FounderBio />

      <CtaFinal
        titulo="¿Por dónde quieres empezar?"
        subtitulo="La puerta de entrada más rápida es el QR Menú: montaje regalado, primer mes a 1€."
        etiquetaBoton="Activar mi QR Menú"
        hrefBoton="/qr"
      />
    </div>
  );
}
