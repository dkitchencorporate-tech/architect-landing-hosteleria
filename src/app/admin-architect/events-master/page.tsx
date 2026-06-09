import React from 'react';

export default function EventsMasterPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tighter">Base de Eventos (Master)</h1>
        <p className="text-zinc-500 font-medium">Control global de los 7 eventos que se distribuyen en el SaaS de los clientes.</p>
      </header>

      <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded-xl p-4 mb-8">
        <p className="text-sm font-bold">⚠️ Estás en la vista maestra. Cualquier cambio aquí afectará los dossiers que ven los clientes en su `/dashboard`.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {['Catas Guiadas Especiales', 'Noche de Maridaje Exclusivo', 'Veladas de Música en Directo', 'Cena y Espectáculo Flamenco', 'Noches de Comedia / Monólogos', 'Noche de Trivia Interactiva', 'Speed Dating & Mixology'].map((ev, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-white border border-zinc-200 rounded-xl">
             <div className="font-bold text-zinc-900">{ev}</div>
             <button className="text-xs font-bold text-orange-600 hover:text-orange-800">Editar Dossier</button>
          </div>
        ))}
      </div>
    </div>
  );
}
