'use client';

import React, { useState, useEffect } from 'react';
import { supabaseClient } from '@/lib/supabase-client';

export default function AuthLayer({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setSigningIn(true);
    setError('');
    
    const { error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    }
    setSigningIn(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#FF4500] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 selection:bg-[#FF4500] selection:text-white">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">Architect<span className="text-[#FF4500]">.Sys</span></h1>
            <p className="text-gray-500 font-medium mt-2">Acceso a la Sala de Análisis Visual</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-xl text-sm font-medium text-center border border-red-100">
                {error === 'Invalid login credentials' ? 'Credenciales incorrectas' : error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-[11px]">Email Administrativo</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF4500] focus:border-transparent outline-none transition-all"
                placeholder="admin@architect.sys"
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider text-[11px]">Contraseña de Acceso</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#FF4500] focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={signingIn}
              className="w-full bg-[#FF4500] text-white font-bold py-4 rounded-xl hover:bg-[#E03E00] hover:shadow-lg transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50"
            >
              {signingIn ? 'Verificando Criptografía...' : 'Ingresar a la Sala Segura'}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-100 text-center">
             <span className="text-xs text-gray-400 font-medium tracking-wide uppercase">Cifrado Militar de Extremo a Extremo 🔒</span>
          </div>
        </div>
      </div>
    );
  }

  // Inject a logout button mechanism as a contextual floater
  return (
    <div className="relative min-h-screen">
      <button 
        onClick={() => supabaseClient.auth.signOut()}
        className="absolute top-8 right-8 text-sm font-bold text-gray-500 hover:text-red-500 transition-colors z-50 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200"
      >
        Cerrar Sesión Segura
      </button>
      {children}
    </div>
  );
}
