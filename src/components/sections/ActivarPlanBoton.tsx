'use client';

import { useState } from 'react';

/**
 * Dispara el checkout real de Stripe para QR Menú (Parte 6, Sección 3).
 * Pide nombre del restaurante y correo en un formulario mínimo antes de abrir
 * Stripe: ambos viajan como metadata de la sesión y son los datos con los que
 * el webhook aprovisiona la cuenta tras el pago.
 */
export default function ActivarPlanBoton({
  plan,
  etiqueta,
  className,
}: {
  plan: 'basico' | 'ampliado';
  etiqueta: string;
  className?: string;
}) {
  const [abierto, setAbierto] = useState(false);
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function activar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const respuesta = await fetch('/api/checkout/qr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan, restauranteNombre: nombre, email }),
      });
      const datos = await respuesta.json();
      if (!respuesta.ok || !datos.url) throw new Error(datos?.error ?? 'No se pudo iniciar el pago.');
      window.location.href = datos.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo iniciar el pago.');
      setCargando(false);
    }
  }

  if (!abierto) {
    return (
      <button type="button" onClick={() => setAbierto(true)} className={className}>
        {etiqueta}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6" onClick={() => setAbierto(false)}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={activar}
        className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl"
      >
        <h3 className="text-xl font-black mb-1">Activar plan {plan === 'basico' ? 'Básico' : 'Ampliado'}</h3>
        <p className="text-gray-500 text-sm mb-6">Primer mes a 1€. Tarjeta registrada desde ahora.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Nombre del restaurante</label>
            <input
              type="text"
              required
              maxLength={80}
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#D9531E] outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Tu correo</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-2 border-gray-200 rounded-xl px-4 py-2.5 focus:border-[#D9531E] outline-none"
            />
          </div>
        </div>
        {error && <p className="text-red-600 text-sm mt-3">{error}</p>}
        <button
          type="submit"
          disabled={cargando}
          className="mt-6 w-full bg-[#D9531E] text-white font-black py-3.5 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50"
        >
          {cargando ? 'Abriendo pago…' : 'Continuar al pago'}
        </button>
      </form>
    </div>
  );
}
