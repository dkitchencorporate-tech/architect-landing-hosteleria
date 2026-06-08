import React from 'react';

export default function CreativeFactoryHubPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tighter">Creative Factory Hub</h1>
        <p className="text-zinc-500 font-medium">Bandeja de entrada de datos extraídos por la IA de Onboarding.</p>
      </header>

      <div className="bg-white border border-zinc-200 rounded-2xl shadow-sm p-6 text-center text-zinc-500">
         <p>Cargando transcripciones y peticiones de copy/diseño...</p>
      </div>
    </div>
  );
}