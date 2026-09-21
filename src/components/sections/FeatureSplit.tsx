import React from 'react';

/**
 * Bloque FEATURE-SPLIT (DKITCHEN_MIGRATION_PLAN_PARTE6.md, Sección 1):
 * un icono/mockup grande a un lado, copy explicativo al otro — nunca centrado
 * en tarjeta simétrica. `invertido` alterna el lado del icono para que una
 * secuencia de 2-4 bloques no se sienta repetitiva.
 */
export default function FeatureSplit({
  icono,
  titulo,
  children,
  invertido = false,
  fondo = 'claro',
}: {
  icono: React.ReactNode;
  titulo: string;
  children: React.ReactNode;
  invertido?: boolean;
  fondo?: 'claro' | 'crema' | 'oscuro';
}) {
  const clasesFondo =
    fondo === 'oscuro'
      ? 'bg-[#171008] text-white'
      : fondo === 'crema'
        ? 'bg-[#FDFCF8] text-gray-900'
        : 'bg-white text-gray-900';
  const clasesTexto = fondo === 'oscuro' ? 'text-gray-400' : 'text-gray-600';
  const clasesIconoBox =
    fondo === 'oscuro' ? 'bg-white/5 border border-white/10' : 'bg-orange-50 border border-orange-100';

  return (
    <section className={`py-16 md:py-24 ${clasesFondo}`}>
      <div className="max-w-6xl mx-auto px-6 md:px-8">
        <div className={`flex flex-col ${invertido ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-10 md:gap-16`}>
          <div className={`shrink-0 w-40 h-40 md:w-56 md:h-56 rounded-[2rem] flex items-center justify-center text-6xl md:text-7xl ${clasesIconoBox}`}>
            {icono}
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl md:text-3xl font-black mb-4 text-balance">{titulo}</h3>
            <div className={`text-lg leading-relaxed text-pretty ${clasesTexto}`}>{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
