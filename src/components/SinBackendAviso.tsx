import React from 'react';
import { AVISO_SIN_BACKEND } from '@/lib/data-source';

/**
 * Marca de forma inequívoca las pantallas que todavía no tienen base de datos
 * detrás. Existe para que nadie —ni el equipo ni un cliente en una demo— confunda
 * una pantalla vacía con una pantalla sin actividad.
 */
export default function SinBackendAviso({ detalle }: { detalle?: string }) {
  return (
    <div
      role="status"
      className="mb-6 flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4"
    >
      <span aria-hidden className="text-lg leading-none">⚠️</span>
      <div className="text-sm">
        <p className="font-bold text-amber-400">{AVISO_SIN_BACKEND}</p>
        <p className="mt-1 text-amber-200/70">
          {detalle ?? 'Volverá a funcionar en cuanto se conecte Neon.'}
        </p>
      </div>
    </div>
  );
}
