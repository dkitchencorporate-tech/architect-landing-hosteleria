'use client';

import React, { useState, useEffect } from 'react';
import { supabaseClient } from '@/lib/supabase-client';
import { Target, Zap, CheckCircle2, ChevronDown } from 'lucide-react';

export default function PipelinePage() {
  const [clients, setClients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    if (!supabaseClient) return;

    const { data, error } = await supabaseClient
      .from('profiles')
      .select('id, business_name, status, role, created_at, business_profiles(address, cuisine_type, average_ticket)')
      .eq('role', 'client')
      .order('created_at', { ascending: false });

    if (data) {
      setClients(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id: string, newStatus: string) => {
    if (!supabaseClient) return;
    const { error } = await supabaseClient
      .from('profiles')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) {
      fetchData();
    } else {
      alert("Error: " + error.message);
    }
  };

  // Grouping logic (we use 'status' as the pipeline stage)
  // 'active' or 'onboarding' -> Onboarding
  // 'development' -> En Desarrollo
  // 'delivered' -> Entregados
  const onboardingClients = clients.filter(c => c.status === 'active' || c.status === 'onboarding' || c.status === 'pending_setup');
  const developmentClients = clients.filter(c => c.status === 'development');
  const deliveredClients = clients.filter(c => c.status === 'delivered');

  const renderClientCard = (client: any) => (
    <div key={client.id} className="bg-zinc-900/50 p-4 rounded-xl border border-white/10 shadow-sm hover:bg-zinc-800/50 transition-colors">
      <div className="font-bold text-sm mb-1 text-white">{client.business_name || 'Sin Nombre'}</div>
      <div className="text-xs text-zinc-400 mb-4 line-clamp-2">
        {client.business_profiles?.[0]?.cuisine_type !== 'Pendiente de Configurar' 
          ? `Cocina: ${client.business_profiles?.[0]?.cuisine_type}` 
          : 'Esperando datos del menú en PDF.'}
      </div>
      
      <div className="flex items-center gap-2">
        <select 
          className="bg-zinc-950 border border-white/10 text-zinc-300 text-xs rounded-lg px-2 py-1.5 outline-none focus:border-orange-500/50 w-full cursor-pointer appearance-none"
          value={
            ['active', 'onboarding', 'pending_setup'].includes(client.status) ? 'onboarding' :
            client.status === 'development' ? 'development' : 
            client.status === 'delivered' ? 'delivered' : 'onboarding'
          }
          onChange={(e) => updateStatus(client.id, e.target.value)}
        >
          <option value="onboarding">En Onboarding</option>
          <option value="development">En Desarrollo</option>
          <option value="delivered">Entregado / Activo</option>
        </select>
      </div>
    </div>
  );

  return (
    <div className="p-4 md:p-8 flex flex-col h-[calc(100vh-2rem)]">
      <header className="mb-8 border-b border-white/10 pb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Master Control</span>
        <h1 className="text-3xl font-black text-white tracking-tighter mt-1 flex items-center gap-3">
          Pipeline de Agencia
        </h1>
        <p className="text-zinc-400 font-medium mt-2">Flujo de vida, estado de entregables y configuración de clientes B2B.</p>
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 overflow-y-auto custom-scrollbar pb-10">
          
          {/* Onboarding Phase */}
          <div className="bg-zinc-950/30 border border-white/5 rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
            <h3 className="font-black text-white uppercase tracking-widest text-xs mb-5 flex items-center gap-2 pb-3 border-b border-white/10">
              <Target className="text-blue-500" size={16} />
              En Onboarding ({onboardingClients.length})
            </h3>
            <div className="flex flex-col gap-3">
              {onboardingClients.length === 0 ? (
                <div className="text-xs text-zinc-600 text-center py-4">No hay clientes aquí</div>
              ) : (
                onboardingClients.map(renderClientCard)
              )}
            </div>
          </div>

          {/* Development Phase */}
          <div className="bg-zinc-950/30 border border-white/5 rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
            <h3 className="font-black text-white uppercase tracking-widest text-xs mb-5 flex items-center gap-2 pb-3 border-b border-white/10">
              <Zap className="text-orange-500" size={16} />
              En Desarrollo ({developmentClients.length})
            </h3>
            <div className="flex flex-col gap-3">
              {developmentClients.length === 0 ? (
                <div className="text-xs text-zinc-600 text-center py-4">No hay clientes aquí</div>
              ) : (
                developmentClients.map(renderClientCard)
              )}
            </div>
          </div>

          {/* Delivered / Maintenance */}
          <div className="bg-zinc-950/30 border border-white/5 rounded-[2rem] p-5 shadow-[0_8px_30px_rgb(0,0,0,0.3)]">
            <h3 className="font-black text-white uppercase tracking-widest text-xs mb-5 flex items-center gap-2 pb-3 border-b border-white/10">
              <CheckCircle2 className="text-green-500" size={16} />
              Activos / Entregados ({deliveredClients.length})
            </h3>
            <div className="flex flex-col gap-3">
              {deliveredClients.length === 0 ? (
                <div className="text-xs text-zinc-600 text-center py-4">No hay clientes aquí</div>
              ) : (
                deliveredClients.map(renderClientCard)
              )}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
