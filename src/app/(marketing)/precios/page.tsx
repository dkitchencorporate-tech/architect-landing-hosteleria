import type { Metadata } from 'next';
import DigitalPresenceValue from '@/components/sections/DigitalPresenceValue';
import TheTrojanHorse from '@/components/sections/TheTrojanHorse';

export const metadata: Metadata = {
  title: 'Precios | DKitchen',
  description:
    'La Fundación Digital de DKitchen: carta interactiva, PWA y optimización SEO en Google Maps, con el Pack de Arranque incluido desde el primer día.',
  alternates: { canonical: 'https://dkitchencorporate.es/precios' },
};

export default function PaginaPrecios() {
  return (
    <div className="bg-white pt-24 md:pt-28">
      <DigitalPresenceValue />
      <TheTrojanHorse />

      {/* NUESTRO PROCESO */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center max-w-4xl mx-auto mb-16 md:mb-20 space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-balance">Sin reuniones interminables. <br className="hidden sm:block"/>Así de rápido trabajamos.</h2>
            <p className="text-lg md:text-xl text-gray-600 text-pretty">
              Sabemos que no tienes tiempo que perder. Nuestro proceso es claro, directo y sin letra pequeña.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors">1</div>
              <div className="text-4xl mb-4 relative z-10">📊</div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Auditoría de Viabilidad</h3>
              <p className="text-gray-600 relative z-10">Analizamos tus números, capacidad operativa y fugas de capital para diseñar un plan exacto.</p>
            </div>
            <div className="bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors">2</div>
              <div className="text-4xl mb-4 relative z-10">🏗️</div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Fundación Digital</h3>
              <p className="text-gray-600 relative z-10">Desplegamos tu ecosistema propio: carta interactiva, PWA y base de datos sin comisiones.</p>
            </div>
            <div className="bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors">3</div>
              <div className="text-4xl mb-4 relative z-10">🔥</div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Inyección de Tráfico</h3>
              <p className="text-gray-600 relative z-10">Montamos un evento con fecha fija y campaña propia. Llenamos tus mesas los días valle sin que pongas capital de marketing por adelantado.</p>
            </div>
            <div className="bg-[#FDFCF8] p-8 rounded-2xl shadow-lg border border-gray-100 relative group hover:-translate-y-2 transition-transform duration-300">
              <div className="text-6xl font-black text-gray-50 absolute top-4 right-4 group-hover:text-orange-50 transition-colors">4</div>
              <div className="text-4xl mb-4 relative z-10">🤖</div>
              <h3 className="text-xl font-bold mb-2 relative z-10">Escalado Autónomo</h3>
              <p className="text-gray-600 relative z-10">Implementamos el KDS multimarca cuando necesites absorber más volumen.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
