import React from 'react';
import Link from 'next/link';

export default function CreativeFactoryHubPage() {
  return (
    <div className="p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-black text-zinc-900 tracking-tighter">Creative Factory Hub</h1>
        <p className="text-zinc-500 font-medium">Acceso centralizado al motor de generación de contenido IA.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
          <div className="text-4xl mb-4">✍️</div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">Generador de Copy (Ads)</h3>
          <p className="text-sm text-zinc-500 mb-6">Motor AI para crear variaciones de anuncios para Facebook e Instagram adaptados al ticket del cliente.</p>
          <Link href="/creative-factory" className="block text-center w-full bg-zinc-900 text-white font-bold py-2 rounded-lg hover:bg-orange-600 transition-colors">
            Abrir Factory
          </Link>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all">
          <div className="text-4xl mb-4">📸</div>
          <h3 className="text-xl font-bold text-zinc-900 mb-2">Guiones para Reels/TikTok</h3>
          <p className="text-sm text-zinc-500 mb-6">Estructuras virales con ganchos, retención y CTA específicos para eventos gastronómicos.</p>
          <button className="block text-center w-full bg-zinc-100 text-zinc-400 font-bold py-2 rounded-lg cursor-not-allowed">
            Próximamente
          </button>
        </div>
      </div>
    </div>
  );
}
