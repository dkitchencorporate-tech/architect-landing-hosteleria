'use client';

import { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { ShieldAlert, CreditCard, LogOut, Lock, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();
  const [supabase] = useState(() => createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  ));

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<any>(null);
  const [password, setPassword] = useState('');
  const [updatingAuth, setUpdatingAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin-architect');
        return;
      }
      
      const { data } = await supabase.from('profiles').select('*, business_profiles(*)').eq('id', user.id).single();
      setProfile(data);
      setLoading(false);
    }
    loadProfile();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdatingAuth(true);
    setMessage('');
    setErrorMsg('');

    const { error } = await supabase.auth.updateUser({ password });
    
    if (error) {
      setErrorMsg(error.message);
    } else {
      setMessage('Contraseña actualizada con éxito.');
      setPassword('');
    }
    setUpdatingAuth(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const manageSubscription = async () => {
    // Redirigir al endpoint de creación de sesión de Stripe Portal
    try {
      const res = await fetch('/api/stripe/portal', {
        method: 'POST',
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setErrorMsg('Error al conectar con la pasarela de pagos.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Error de red al conectar con Stripe.');
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin h-8 w-8 text-zinc-400" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Configuración</h1>
        <p className="text-zinc-400">Gestiona tus preferencias de seguridad, suscripción y cuenta.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Perfil & Seguridad */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
          <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
            <ShieldAlert className="text-blue-400" />
            <h2 className="text-xl font-bold text-white">Seguridad de la Cuenta</h2>
          </div>
          
          <div>
            <p className="text-sm text-zinc-400">Restaurante</p>
            <p className="text-lg text-white font-medium">{profile?.business_name || 'N/A'}</p>
          </div>

          <form onSubmit={handleUpdatePassword} className="space-y-4 pt-4">
            <div>
              <label className="block text-sm text-zinc-400 mb-1">Nueva Contraseña</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-zinc-500" />
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                  placeholder="Mínimo 6 caracteres"
                  required
                />
              </div>
            </div>
            
            <button 
              type="submit" 
              disabled={updatingAuth}
              className="w-full bg-white text-black font-bold py-2 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50"
            >
              {updatingAuth ? 'Actualizando...' : 'Actualizar Contraseña'}
            </button>
            
            {message && <p className="text-green-400 text-sm">{message}</p>}
            {errorMsg && <p className="text-red-400 text-sm">{errorMsg}</p>}
          </form>
        </div>

        {/* Facturación y Salida */}
        <div className="space-y-8">
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-zinc-800 pb-4">
              <CreditCard className="text-green-400" />
              <h2 className="text-xl font-bold text-white">Facturación y Plan</h2>
            </div>
            
            <div className="space-y-4">
              <p className="text-zinc-300">
                Plan actual: <span className="font-bold text-white uppercase">{profile?.plan_type?.replace('_', ' ')}</span>
              </p>
              <p className="text-sm text-zinc-500">
                Gestiona tu método de pago, descarga facturas o solicita la cancelación del servicio desde el portal seguro.
              </p>
              
              <button 
                onClick={manageSubscription}
                className="w-full bg-zinc-800 text-white font-bold py-2 rounded-lg hover:bg-zinc-700 transition-colors border border-zinc-700"
              >
                Abrir Portal de Pagos
              </button>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3 border-b border-red-500/20 pb-4">
              <LogOut className="text-red-400" />
              <h2 className="text-xl font-bold text-red-400">Cerrar Sesión</h2>
            </div>
            <p className="text-sm text-zinc-400">Sal de tu cuenta de forma segura en este dispositivo.</p>
            <button 
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
