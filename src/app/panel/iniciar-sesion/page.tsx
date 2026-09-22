'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';

export default function IniciarSesion() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [verContrasena, setVerContrasena] = useState(false);
  const [recordarme, setRecordarme] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cargando, setCargando] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCargando(true);
    try {
      const { error: errorAuth } = await authClient.signIn.email({ email, password, rememberMe: recordarme });
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
            <div className="relative">
              <input
                id="password"
                type={verContrasena ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-black/30 border border-white/10 px-4 py-2.5 pr-11 text-white placeholder-white/30 focus:outline-none focus:border-[#D9531E]"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setVerContrasena((v) => !v)}
                aria-label={verContrasena ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
              >
                {verContrasena ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-white/60 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={recordarme}
              onChange={(e) => setRecordarme(e.target.checked)}
              className="w-4 h-4 rounded border-white/20 bg-black/30 accent-[#D9531E]"
            />
            Recordarme en este dispositivo
          </label>

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
