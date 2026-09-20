import type { Metadata } from 'next';
import DarkKitchen from '@/components/DarkKitchen';

export const metadata: Metadata = {
  title: 'Dark Kitchen Enterprise | DKitchen',
  description:
    'Exprime la capacidad ociosa de tus fogones montando marcas virtuales a domicilio: ingeniería de procesos, fichas técnicas, KDS multimarca y enrutamiento de flotas.',
  alternates: { canonical: 'https://dkitchencorporate.es/dark-kitchen' },
};

export default function PaginaDarkKitchen() {
  return (
    <div>
      {/* TRANSICIÓN DE DOLOR AL MODELO DARK KITCHEN */}
      <section className="pt-28 md:pt-32 pb-20 bg-[#050505] text-white relative overflow-hidden border-b border-white/10">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF4500] rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

        <div className="max-w-5xl mx-auto px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-gray-300 text-xs font-bold tracking-[0.2em] uppercase mb-8 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            El precio de improvisar
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-8 text-balance">
            Si tu sistema es un caos, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF4500] to-orange-400 border-b-4 border-[#FF4500]/50 pb-1">más clientes significará tu ruina.</span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-400 max-w-4xl mx-auto leading-relaxed font-medium text-pretty mb-12">
            Muchos negocios intentan escalar abriendo canales en 5 apps de delivery a la vez. ¿El resultado? Pierden hasta el 30% de rentabilidad en comisiones, colapsan los fogones y queman al equipo. El verdadero crecimiento exige una infraestructura quirúrgica.
          </p>
          <div className="w-px h-24 bg-gradient-to-b from-[#FF4500] to-transparent mx-auto"></div>
        </div>
      </section>

      <DarkKitchen />
    </div>
  );
}
