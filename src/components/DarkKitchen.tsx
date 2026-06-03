'use client';
import React, { useState } from 'react';
import EnterpriseModal from './EnterpriseModal';

/**
 * src/components/DarkKitchen.tsx
 * Sección de ecosistema Dark Kitchen refactorizada a nivel Enterprise.
 * Protocolo: Ingeniería de procesos, sin precio visible, alta exclusividad.
 */

export default function DarkKitchen() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-24 bg-[#0A0A0A] border-y border-white/10 overflow-hidden relative text-white">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px] pointer-events-none -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] pointer-events-none -ml-32 -mb-32"></div>
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        
        {/* ENCABEZADO ENTERPRISE */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#FF4500] text-xs font-bold tracking-widest uppercase">
            <span className="w-2 h-2 bg-[#FF4500] rounded-full animate-pulse"></span> INGENIERÍA DE PROYECTOS & MARCAS VIRTUALES
          </div>
          <h2 className="text-4xl lg:text-6xl font-black leading-tight text-white tracking-tight text-balance">
            El Caos Operativo tiene un precio.<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-orange-400">La Ingeniería, un retorno.</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-medium">
            Muchos hosteleros intentan escalar subiéndose a 4 aplicaciones de delivery a la vez. ¿El resultado? <strong>Fogones colapsados, pérdida de calidad y rentabilidad nula.</strong> El delivery masivo no necesita más apps; necesita procesos estandarizados.
          </p>
        </div>

        {/* --- CALCULADOR DE HEMORRAGIA (Mantenido porque el dolor es real) --- */}
        <div className="mb-24 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#1A1A1A] p-8 rounded-3xl border border-red-500/30 flex items-center justify-between group hover:border-red-500/60 transition-colors shadow-[0_10px_30px_rgba(239,68,68,0.05)] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                    <p className="text-red-500 font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Dependencia de Apps</p>
                    <p className="text-2xl font-black text-white tracking-tight">Facturar 10.000€</p>
                </div>
                <div className="text-right relative z-10">
                    <p className="text-red-500 font-black text-3xl">- 3.000€</p>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">Hemorragia Fija</p>
                </div>
            </div>
            <div className="bg-[#1A1A1A] p-8 rounded-3xl border border-[#FF4500]/30 flex items-center justify-between group hover:border-[#FF4500]/60 transition-colors shadow-[0_10px_30px_rgba(255,69,0,0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#FF4500]/10 rounded-full blur-2xl"></div>
                <div className="relative z-10">
                    <p className="text-[#FF4500] font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Ecosistema PWA Propio</p>
                    <p className="text-2xl font-black text-white tracking-tight">Facturar 10.000€</p>
                </div>
                <div className="text-right relative z-10">
                    <p className="text-[#25D366] font-black text-3xl">0€</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Margen Limpio</p>
                </div>
            </div>
        </div>

        {/* LOS TRES PILARES OPERATIVOS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24">
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 group hover:border-white/20 transition-all duration-500 flex flex-col relative overflow-hidden">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner border border-white/5">🍔</div>
            <h3 className="text-xl font-bold mb-4 text-white tracking-wide">Marcas Virtuales Listas para Operar (Llave en Mano)</h3>
            <p className="text-gray-400 flex-1 leading-relaxed text-sm">
                No inventes recetas. Te damos acceso a nuestro catálogo de marcas virtuales probadas (Smash Burgers, Sushi, Kebab de Autor). Te entregamos las <strong>fichas técnicas de cocina, proveedores y tiempos de elaboración</strong>. Tu equipo solo tiene que seguir el protocolo y empaquetar.
            </p>
          </div>
          
          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 group hover:border-white/20 transition-all duration-500 flex flex-col relative overflow-hidden">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner border border-white/5">🚀</div>
            <h3 className="text-xl font-bold mb-4 text-white tracking-wide">Infraestructura PWA de Pedidos Propios</h3>
            <p className="text-gray-400 flex-1 leading-relaxed text-sm">
                Diseñamos una aplicación web progresiva (PWA) de alta conversión. El cliente pide en dos clics y <strong>el dinero viaja directo a tu banco mediante pasarelas seguras</strong>. Sin intermediarios y generando tu propia base de datos para futuras campañas automáticas.
            </p>
          </div>

          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 group hover:border-white/20 transition-all duration-500 flex flex-col relative overflow-hidden">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner border border-white/5">🎯</div>
            <h3 className="text-xl font-bold mb-4 text-white tracking-wide">Enrutamiento Multimarca (KDS Centralizado)</h3>
            <p className="text-gray-400 flex-1 leading-relaxed text-sm">
                La arquitectura tecnológica para operar hasta 7 marcas desde una sola cocina. <strong>Centralizamos todos los pedidos en una única Pantalla de Cocina (KDS).</strong> El chef solo ve lo que tiene que cocinar y en qué orden. Evitamos el estrés cognitivo y el colapso del pase.
            </p>
          </div>
        </div>

        {/* FASES DE ADMISIÓN (El Filtro High-Ticket) */}
        <div className="max-w-5xl mx-auto bg-gradient-to-b from-white/5 to-transparent p-1 rounded-[3rem] border border-white/10 mb-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#FF4500] to-transparent opacity-50"></div>
          <div className="bg-[#0A0A0A] rounded-[2.8rem] p-8 md:p-16">
            <div className="text-center mb-12">
              <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Proceso de Admisión y Desarrollo Enterprise</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">Esto no es un software preconfigurado. Es una integración de procesos y tecnología a medida. Por ello, exigimos un análisis estricto antes de iniciar.</p>
            </div>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-[#FF4500] before:via-orange-500/20 before:to-transparent">
              
              {/* Fase 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0A0A0A] bg-[#FF4500] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_20px_rgba(255,69,0,0.5)] z-10 font-bold text-sm">1</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 rounded-2xl border border-white/10 ml-4 md:ml-0 text-left">
                  <div className="text-[#FF4500] font-black text-xs tracking-widest uppercase mb-2">Evaluación Estricta</div>
                  <h4 className="text-xl font-bold text-white mb-2">Auditoría Operativa y Viabilidad</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">Analizamos la capacidad instalada de tu cocina, radio de reparto y costes base (Food Cost). Si los números no garantizan rentabilidad, rechazaremos el proyecto antes de que gastes un euro.</p>
                </div>
              </div>
              
              {/* Fase 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0A0A0A] bg-gray-800 text-gray-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-sm transition-colors group-hover:bg-white group-hover:text-black">2</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 rounded-2xl border border-white/10 ml-4 md:ml-0 text-left">
                  <div className="text-gray-500 font-black text-xs tracking-widest uppercase mb-2">Protocolos</div>
                  <h4 className="text-xl font-bold text-white mb-2">Ingeniería del Menú y Estandarización</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">Adaptamos nuestras cartas a tu equipamiento. Diseñamos el flujo de trabajo en cocina y seleccionamos el packaging térmico idóneo para que el producto viaje sin perder calidad.</p>
                </div>
              </div>

              {/* Fase 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#0A0A0A] bg-gray-800 text-gray-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 font-bold text-sm transition-colors group-hover:bg-[#25D366] group-hover:text-white">3</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 bg-white/5 rounded-2xl border border-white/10 ml-4 md:ml-0 text-left">
                  <div className="text-gray-500 font-black text-xs tracking-widest uppercase mb-2">Lanzamiento</div>
                  <h4 className="text-xl font-bold text-white mb-2">Despliegue del Ecosistema Tecnológico</h4>
                  <p className="text-sm text-gray-400 leading-relaxed">Montamos la PWA de pedidos, integramos pasarelas de pago y configuramos el enrutamiento automático de repartidores (Stuart, flotas propias, etc.) directamente a tu pantalla de cocina (KDS).</p>
                </div>
              </div>

            </div>
          </div>
        </div>
        
        {/* CTA EXCLUSIVO */}
        <div className="text-center max-w-3xl mx-auto">
          <button onClick={() => setIsModalOpen(true)} className="inline-block w-full sm:w-auto bg-white text-black px-10 py-5 rounded-full font-black text-lg md:text-xl hover:bg-gray-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105">
            Solicitar Entrevista de Admisión
          </button>
          <div className="mt-6 p-4 border border-red-500/20 bg-red-500/5 rounded-xl inline-block text-left max-w-2xl mx-auto">
            <p className="text-[11px] text-gray-400 leading-relaxed">
              <strong className="text-red-400 uppercase tracking-widest block mb-1">Aviso de Exclusividad:</strong>
              Reservado estrictamente para operaciones consolidadas o inversores de capital privado. Para garantizar el retorno de inversión y la excelencia operativa, <strong className="text-white">limitamos el desarrollo a 2 proyectos simultáneos por trimestre</strong>.
            </p>
          </div>
        </div>

      </div>

      <EnterpriseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}
