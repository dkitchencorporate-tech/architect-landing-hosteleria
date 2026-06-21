import React from 'react';

export default function MatrixTab({ approvedCreatives, setActiveTab }: { approvedCreatives: any[], setActiveTab: (tab: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-black text-white mb-2">Matriz de Despliegue Comercial</h3>
        <p className="text-zinc-400 text-sm">Copys publicitarios e imágenes aprobadas listas para exportarse o activarse en Meta Ads Manager.</p>
      </div>

      {approvedCreatives.length === 0 ? (
        <div className="border border-dashed border-zinc-800 rounded-3xl p-16 text-center flex flex-col items-center justify-center bg-zinc-950/20">
          <span className="text-4xl mb-4">🗂️</span>
          <h4 className="text-lg font-bold text-white mb-1">Matriz de Creativos Vacía</h4>
          <p className="text-zinc-500 text-xs max-w-sm mx-auto mb-6">Genera copys persuasivos en el Motor Generativo B2B y apruébalos para verlos aquí.</p>
          <button onClick={() => setActiveTab('generator')} className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-2.5 px-5 rounded-xl border border-zinc-800 transition-colors">
            Ir al Motor Generativo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {approvedCreatives.map((creative) => (
            <div key={creative.id} className="bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden flex flex-col">
              <div className="relative aspect-[4/5] bg-black">
                <img src={creative.image} alt={creative.hook} className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 p-6 flex flex-col justify-end">
                  <h4 className="text-2xl md:text-3xl font-black uppercase text-white tracking-tight leading-none">
                    {creative.hook}
                  </h4>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex gap-2 mb-3">
                    <span className="text-[9px] font-black tracking-widest bg-zinc-900 px-2 py-0.5 rounded text-zinc-400 uppercase">CLIENTE: {creative.clientName}</span>
                    <span className="text-[9px] font-black tracking-widest bg-orange-950 px-2 py-0.5 rounded text-orange-400 uppercase">ÁNGULO: {creative.angle}</span>
                  </div>
                  <p className="text-xs text-zinc-400 font-mono whitespace-pre-wrap leading-relaxed">
                    {creative.primaryText}
                  </p>
                </div>
                <div className="border-t border-zinc-900/60 pt-4 flex gap-4">
                  <button onClick={() => alert('Campaña integrada en el embudo comercial de Architect.Sys.')} className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs py-3 rounded-xl transition-colors">
                    🚀 Lanzar Publicidad Local
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
