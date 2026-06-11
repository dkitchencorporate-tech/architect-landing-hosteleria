'use client';

import React, { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      }
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    // Usually Supabase requires email confirmation, but for now we push to dashboard or show success.
    router.push('/dashboard');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111] border border-[#FF4500]/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(255,69,0,0.1)]">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-white text-black font-black text-2xl flex items-center justify-center rounded-full mx-auto mb-4">A</div>
          <h1 className="text-2xl font-black text-white tracking-tighter mb-2">
            Activación de Cuenta
          </h1>
          <p className="text-gray-400 text-sm">Establece tu contraseña corporativa para iniciar el Onboarding del SaaS.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-500 text-sm p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email de Contacto</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF4500] transition-colors"
              placeholder="tu@restaurante.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Crear Contraseña</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#FF4500] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-white text-black font-black py-3 rounded-lg mt-4 hover:bg-gray-200 transition-colors disabled:opacity-50 shadow-xl"
          >
            {loading ? 'Activando...' : 'Activar Cuenta y Continuar'}
          </button>
        </form>
      </div>
    </div>
  );
}
