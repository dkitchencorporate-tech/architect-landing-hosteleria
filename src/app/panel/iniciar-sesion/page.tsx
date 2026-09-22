'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function IniciarSesion() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const { error: errorAuth } = await authClient.signIn.email({ email, password });
      if (errorAuth) {
        setError(errorAuth.message ?? 'No se pudo iniciar sesión. Comprueba tu correo y contraseña.');
        setCargando(false);
        return;
      }
      router.push('/panel');
    } catch {
      setError('No se pudo conectar. Inténtalo de nuevo en unos segundos.');
      setCargando(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#171008] flex items-center justify-center px-6 py-24">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold text-white">
            D<span className="text-[#D9531E]">Kitchen</span>
          </h1>
          <p className="text-white/50 text-sm mt-2">Entra a tu panel para gestionar tu carta y tu QR</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-[#1c140b] border border-white/10 rounded-2xl p-8 space-y-5"
        >
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">
              Correo
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-[#D9531E]"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-1.5">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-[#D9531E]"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="w-full rounded-lg bg-[#D9531E] hover:bg-[#B8451A] text-white font-bold py-3 transition-colors disabled:opacity-50"
          >
            {cargando ? 'Entrando…' : 'Entrar'}
          </button>

          <a
            href="/panel/nueva-contrasena"
            className="block text-center text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </form>
      </div>
    </div>
  );
}
