import React from 'react';
import Link from 'next/link';
import AggressiveHero from '@/components/sections/AggressiveHero';
import VisionAndEmpathy from '@/components/sections/VisionAndEmpathy';
import LiveDemoCTA from '@/components/sections/LiveDemoCTA';
import FounderBio from '@/components/sections/FounderBio';

/**
 * Home — puerta de entrada, no todo el sitio.
 *
 * Antes esta página tenía todas las secciones del sitio una detrás de otra,
 * con navegación por anclas (#suscripciones, #eventos, #dark-kitchen). Al
 * repartir el contenido en páginas reales (Fase 4), la home se queda con lo
 * que de verdad cumple su función: enganchar en los primeros segundos y
 * llevar a cada visitante a la página que responde a su pregunta —precio,
 * eventos, o Dark Kitchen—, en vez de obligarle a hacer scroll por todo.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-gray-900 font-sans selection:bg-[#FF4500] selection:text-white overflow-x-hidden">
      <AggressiveHero />
      <VisionAndEmpathy />

      {/* CÓMO FUNCIONA, EN TRES PASOS */}
      <section className="py-16 md:py-24 bg-[#FDFCF8]">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl font-black mb-6 text-balance">No somos informáticos. Somos tu socio comercial.</h2>
            <p className="text-lg md:text-xl text-gray-600 text-pretty">Así convertimos tu restaurante en una máquina bien engrasada.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-16">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-1 bg-gradient-to-r from-gray-200 via-[#FF4500] to-gray-900 z-0 opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-white border-4 border-[#FF4500] rounded-full flex items-center justify-center text-3xl font-black text-[#FF4500] shadow-lg mb-6 group-hover:scale-110 group-hover:bg-[#FF4500] group-hover:text-white transition-all duration-500">1</div>
              <h3 className="text-2xl font-bold mb-4">Atracción Incesante</h3>
              <p className="text-gray-600 text-lg">Te inyectamos tráfico real. Cuando alguien busque dónde cenar, tú serás su única opción lógica.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-[#FF4500] rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg mb-6 group-hover:scale-110 transition-all duration-500 shadow-orange-500/40">2</div>
              <h3 className="text-2xl font-bold mb-4">Pedido Directo</h3>
              <p className="text-gray-600 text-lg">Ese tráfico pide por tu propio canal, no por un agregador. Cero comisiones sobre cada ticket y los datos del cliente se quedan contigo.</p>
            </div>
            <div className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center text-3xl font-black text-white shadow-lg mb-6 group-hover:scale-110 group-hover:bg-black transition-all duration-500">3</div>
              <h3 className="text-2xl font-bold mb-4">Ticket Multiplicado</h3>
              <p className="text-gray-600 text-lg">En el local, piden más rápido gracias a cartas interactivas. Mesas veloces, camareros sin estrés y cajas que cuadran.</p>
            </div>
          </div>
        </div>
      </section>

      <LiveDemoCTA />

      {/* ENLACES AL RESTO DEL SITIO — sustituye a las anclas de la versión de una sola página */}
      <section className="py-16 md:py-20 bg-white border-y border-gray-100">
        <div className="max-w-5xl mx-auto px-6 md:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            href="/precios"
            className="group rounded-2xl border-2 border-gray-100 p-8 text-center hover:border-[#FF4500] hover:shadow-xl transition-all"
          >
            <div className="text-3xl mb-3">💰</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF4500] transition-colors">Precios</h3>
            <p className="text-gray-600 text-sm">La Fundación Digital y qué incluye desde el primer día.</p>
          </Link>
          <Link
            href="/eventos"
            className="group rounded-2xl border-2 border-gray-100 p-8 text-center hover:border-[#FF4500] hover:shadow-xl transition-all"
          >
            <div className="text-3xl mb-3">🎉</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF4500] transition-colors">Eventos</h3>
            <p className="text-gray-600 text-sm">Llena tus días valle con formatos ya diseñados.</p>
          </Link>
          <Link
            href="/dark-kitchen"
            className="group rounded-2xl border-2 border-gray-100 p-8 text-center hover:border-[#FF4500] hover:shadow-xl transition-all"
          >
            <div className="text-3xl mb-3">🔥</div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-[#FF4500] transition-colors">Dark Kitchen</h3>
            <p className="text-gray-600 text-sm">Exprime la capacidad ociosa de tus fogones con marcas virtuales.</p>
          </Link>
        </div>
      </section>

      <FounderBio />
    </div>
  );
}
