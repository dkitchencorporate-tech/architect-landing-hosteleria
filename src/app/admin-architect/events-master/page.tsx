import React from 'react';

export default function EventsMasterPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tighter">Base de Eventos (Master)</h1>
        <p className="text-zinc-500 font-medium">Gestor de catálogo global de eventos para desbloquear a clientes.</p>
      </header>

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 text-center text-zinc-500">
         <p>Cargando los 7 protocolos base de eventos...</p>
      </div>
    </div>
  );
}