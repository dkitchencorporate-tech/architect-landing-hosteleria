'use client';

import type { MiRestaurante } from '@/lib/mi-restaurante';

const FUNCIONES_AMPLIADO = [
  'Llamar al camarero desde la carta',
  'Promociones visibles en la carta',
  'Sincronización con Google Business',
  'Botón de reseñas',
];

export default function MiPlan({ restaurante }: { restaurante: MiRestaurante }) {
  const esAmpliado = restaurante.plan === 'ampliado';

  return (
    <div className="space-y-8">
      <h2 className="text-xl font-bold">Mi Plan</h2>

      <div className="bg-[#1c140b] border border-white/10 rounded-2xl p-6">
        <p className="text-white/50 text-sm">Plan actual</p>
        <p className="text-2xl font-black mt-1 capitalize">{restaurante.plan}</p>
        <p className="text-white/40 text-xs mt-2">
          Estado de la cuenta:{' '}
          <span className={restaurante.estadoAcceso === 'activo' ? 'text-green-400' : 'text-amber-400'}>
            {restaurante.estadoAcceso}
          </span>
        </p>
      </div>

      {!esAmpliado && (
        <div className="bg-[#1c140b] border border-[#D9531E]/40 rounded-2xl p-6">
          <h3 className="font-bold mb-3">Pasa a Ampliado</h3>
          <ul className="space-y-2 mb-5">
            {FUNCIONES_AMPLIADO.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-white/70">
                <span className="text-[#D9531E]">✓</span> {f}
              </li>
            ))}
          </ul>
          <a
            href={`https://wa.me/34622652659?text=${encodeURIComponent(
              `Hola, tengo el restaurante "${restaurante.nombre}" y quiero pasar de Básico a Ampliado.`
            )}`}
            className="inline-block bg-[#D9531E] hover:bg-[#B8451A] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors"
          >
            Pedir el cambio por WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
