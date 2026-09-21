'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function FormularioNuevaContrasena() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [contrasena, setContrasena] = useState('');
  const [confirmacion, setConfirmacion] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hecho, setHecho] = useState(false);

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
        <label className="block text-sm font-bold text-gray-700 mb-1">Nueva contraseña</label>
        <input
          type="password"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          minLength={8}
          required
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#D9531E] outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-1">Repite la contraseña</label>
        <input
          type="password"
          value={confirmacion}
          onChange={(e) => setConfirmacion(e.target.value)}
          minLength={8}
          required
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-[#D9531E] outline-none"
        />
      </div>
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
