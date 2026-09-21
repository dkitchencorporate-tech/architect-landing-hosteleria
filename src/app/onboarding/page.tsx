'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function OnboardingContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [invitation, setInvitation] = useState<any>(null);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [signingUp, setSigningUp] = useState(false);

  useEffect(() => {
    // Los tokens de invitación viven en la base de datos. Sin ella no hay nada
    // contra lo que validarlos, así que el alta queda cerrada en lugar de
    // aceptar a cualquiera que acierte la URL.
    setError(
      token
        ? 'El alta de clientes está cerrada mientras no haya base de datos conectada.'
        : 'Enlace inválido. No se ha proporcionado un token de acceso.'
    );
    setLoading(false);
  }, [token]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('No se puede completar el alta: no hay base de datos conectada.');
    setSigningUp(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#171008] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#171008] flex items-center justify-center p-4">
        <div className="bg-zinc-950 p-8 rounded-3xl border border-red-900 max-w-md w-full text-center">
          <div className="text-4xl mb-4">⛔</div>
          <h2 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Acceso Denegado</h2>
          <p className="text-red-400 text-sm font-medium">{error}</p>
          <p className="text-zinc-500 text-xs mt-6">Por favor, contacta con tu Asesor Estratégico si crees que esto es un error.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171008] flex items-center justify-center p-4">
      <div className="bg-zinc-950 p-8 rounded-3xl shadow-2xl border border-zinc-900 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white tracking-tight">D<span className="text-orange-500">Kitchen</span></h1>
          <p className="text-zinc-400 text-xs font-medium mt-2 uppercase tracking-widest">Activación de Cuenta Privada</p>
        </div>

        <div className="bg-orange-950/20 border border-orange-900/50 p-4 rounded-xl mb-6 text-center">
          <span className="block text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-1">Plan Pre-Asignado</span>
          <strong className="text-orange-400 text-sm">
            {invitation.plan_type === 'base_pago_unico' ? 'PLAN BASE (PAGO ÚNICO)' : 'PLAN SUSCRIPCIÓN'}
          </strong>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="block text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-widest">Nombre Comercial</label>
            <input
              type="text"
              required
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full bg-black px-4 py-3 rounded-xl border border-zinc-800 text-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm"
              placeholder="Ej. Restaurante Bella Vita"
            />
          </div>

          <div>
            <label className="block text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-widest">Email Corporativo</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black px-4 py-3 rounded-xl border border-zinc-800 text-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm"
              placeholder="tu@negocio.com"
            />
          </div>
          
          <div>
            <label className="block text-[10px] font-black text-zinc-500 mb-2 uppercase tracking-widest">Crea tu Contraseña</label>
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black px-4 py-3 rounded-xl border border-zinc-800 text-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all text-sm"
              placeholder="Mínimo 8 caracteres"
            />
          </div>

          <button
            type="submit"
            disabled={signingUp}
            className="w-full bg-orange-600 text-white font-black uppercase tracking-wide text-xs py-4 rounded-xl hover:bg-orange-500 hover:shadow-lg hover:shadow-orange-500/20 transition-all disabled:opacity-50 mt-4"
          >
            {signingUp ? 'Configurando Ecosistema...' : 'Activar mi Cuenta'}
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-zinc-900 text-center">
           <span className="text-[10px] text-zinc-600 font-bold tracking-widest uppercase">Encriptación AES-256 🔒</span>
        </div>
      </div>
    </div>
  );
}

export default function PrivateOnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#171008] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <OnboardingContent />
    </Suspense>
  );
}

