import React from 'react';

export default function PipelinePage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tighter">Pipeline de Agencia</h1>
        <p className="text-zinc-500 font-medium">Estado global de entregables y configuración de clientes.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Onboarding Phase */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
          <h3 className="font-black text-zinc-900 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            En Onboarding (1)
          </h3>
          <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
             <div className="font-bold text-sm mb-1">Tapas & Cañas C.B.</div>
             <div className="text-xs text-zinc-500 mb-3">Esperando menú en PDF y fotos del local.</div>
             <div className="w-full bg-zinc-100 rounded-full h-1.5">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '30%' }}></div>
             </div>
          </div>
        </div>

        {/* Development Phase */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
          <h3 className="font-black text-zinc-900 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-orange-500"></span>
            En Desarrollo (1)
          </h3>
          <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
             <div className="font-bold text-sm mb-1">Burger Factory</div>
             <div className="text-xs text-zinc-500 mb-3">Conectando Agente IA de WhatsApp.</div>
             <div className="w-full bg-zinc-100 rounded-full h-1.5">
                <div className="bg-orange-500 h-1.5 rounded-full" style={{ width: '80%' }}></div>
             </div>
          </div>
        </div>

        {/* Delivered / Maintenance */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
          <h3 className="font-black text-zinc-900 uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Activos / Entregados (1)
          </h3>
          <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
             <div className="font-bold text-sm mb-1">Restaurante El Gourmet</div>
             <div className="text-xs text-zinc-500 mb-3">SaaS Growth activo. Ads rodando.</div>
             <div className="w-full bg-zinc-100 rounded-full h-1.5">
                <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
