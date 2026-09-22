'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

function calcularFortaleza(contrasena: string): { nivel: 0 | 1 | 2 | 3; etiqueta: string; color: string } {
  if (!contrasena) return { nivel: 0, etiqueta: '', color: 'bg-gray-200' };

  let puntos = 0;
  if (contrasena.length >= 8) puntos++;
  if (contrasena.length >= 12) puntos++;
  if (/[a-z]/.test(contrasena) && /[A-Z]/.test(contrasena)) puntos++;
  if (/[0-9]/.test(contrasena)) puntos++;
  if (/[^a-zA-Z0-9]/.test(contrasena)) puntos++;

  if (puntos <= 1) return { nivel: 1, etiqueta: 'Débil', color: 'bg-red-500' };
  if (puntos <= 3) return { nivel: 2, etiqueta: 'Aceptable', color: 'bg-amber-500' };
  return { nivel: 3, etiqueta: 'Potente', color: 'bg-green-500' };
}

function CampoContrasena({
  id,
  label,
  valor,
  onChange,
}: {
  id: string;
  label: string;
  valor: string;
  onChange: (v: string) => void;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-bold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? 'text' : 'password'}
          value={valor}
          onChange={(e) => onChange(e.target.value)}
          minLength={8}
          required
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 pr-12 focus:border-[#D9531E] outline-none"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {visible ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

export default function FormularioNuevaContrasena() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [contrasena, setContrasena] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hecho, setHecho] = useState(false);

  const fortaleza = useMemo(() => calcularFortaleza(contrasena), [contrasena]);

  if (!token) {
    return (
      <p className="text-center text-red-600 bg-red-50 border border-red-200 rounded-xl p-4">
        Este enlace no es válido o le falta el token. Pide uno nuevo desde el correo de bienvenida o
        escríbenos por WhatsApp.
      </p>
    );
  }

  if (hecho) {
    return (
      <div className="text-center bg-green-50 border border-green-200 rounded-xl p-6">
        <p className="text-green-700 font-bold mb-2">Contraseña fijada.</p>
        <p className="text-gray-600 text-sm">Ya puedes iniciar sesión en tu panel con tu correo y esta contraseña.</p>
      </div>
    );
  }

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (contrasena.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (contrasena !== confirmacion) {
      setError('Las dos contraseñas no coinciden.');
      return;
    }

    setEnviando(true);
    try {
      const respuesta = await fetch('/api/auth/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password: contrasena }),
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos?.error ?? 'No se pudo fijar la contraseña.');
      setHecho(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'No se pudo fijar la contraseña.');
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="space-y-4">
      <div>
        <CampoContrasena id="contrasena" label="Nueva contraseña" valor={contrasena} onChange={setContrasena} />
        {contrasena.length > 0 && (
          <div className="mt-2">
            <div className="flex gap-1">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${i <= fortaleza.nivel ? fortaleza.color : 'bg-gray-200'}`}
                />
              ))}
            </div>
            <p
              className={`text-xs mt-1 font-semibold ${
                fortaleza.nivel === 1 ? 'text-red-600' : fortaleza.nivel === 2 ? 'text-amber-600' : 'text-green-600'
              }`}
            >
              {fortaleza.etiqueta}
            </p>
          </div>
        )}
      </div>

      <CampoContrasena id="confirmacion" label="Repite la contraseña" valor={confirmacion} onChange={setConfirmacion} />

      {error && <p className="text-red-600 text-sm">{error}</p>}
      <button
        type="submit"
        disabled={enviando}
        className="w-full bg-[#D9531E] text-white font-black py-3.5 rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50"
      >
        {enviando ? 'Guardando…' : 'Fijar contraseña'}
      </button>
    </form>
  );
}
