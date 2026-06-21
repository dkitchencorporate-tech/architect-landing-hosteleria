"use client";

import React, { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Activity, Smartphone, Monitor, MapPin, Loader, Radio } from 'lucide-react';

export default function TrafficMonitor() {
  const [visits, setVisits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchVisits();

    const channel = supabase.channel('realtime_traffic')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'web_analytics' }, payload => {
        setVisits(prev => [payload.new, ...prev].slice(0, 50));
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchVisits = async () => {
    try {
      const { data, error } = await supabase
        .from('web_analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      if (!error && data) {
        setVisits(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 gap-4">
        <Loader className="w-8 h-8 text-orange-500 animate-spin" />
        <span className="text-[10px] uppercase font-black tracking-widest text-zinc-500">Analizando Nodos...</span>
      </div>
    );
  }

  if (visits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-zinc-500">
        <Radio className="w-10 h-10 mb-3 opacity-50" />
        <p className="font-bold text-zinc-400">Esperando señal de tráfico...</p>
        <p className="text-xs mt-1 opacity-60">Asegúrate de que la tabla 'web_analytics' exista en Supabase.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      <div className="flex flex-col gap-3">
        {visits.map((visit) => {
          const meta = visit.meta_data || {};
          const city = meta.city || 'Localhost';
          const country = meta.country || 'Desconocido';
          
          return (
            <div key={visit.id} className="group bg-white/5 border border-white/5 p-6 rounded-[2rem] hover:bg-white/10 hover:border-white/10 hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] transition-all relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.02] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div className="flex items-center gap-4">
                  {/* Device Icon */}
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-lg font-bold shrink-0 transition-transform group-hover:scale-105 ${
                    visit.device_type === 'mobile' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'bg-purple-500/10 text-purple-400 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                  }`}>
                    {visit.device_type === 'mobile' ? <Smartphone size={20}/> : <Monitor size={20}/>}
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-black text-white text-sm tracking-tight flex items-center gap-2">
                        Visita Detectada
                      </span>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border ${visit.utm_source ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 'bg-white/5 text-zinc-400 border-white/10'}`}>
                        {visit.utm_source || 'Orgánico'}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-zinc-400 truncate w-48 md:w-64">
                      {visit.utm_campaign ? `Campaña: ${visit.utm_campaign}` : 'Navegación Directa'}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[9px] uppercase font-black text-zinc-500 tracking-widest block mb-1">Ingreso</span>
                  <span className="text-xs text-zinc-300 font-bold bg-black/40 px-2 py-1 rounded-md border border-white/5">
                    {formatDistanceToNow(new Date(visit.created_at), { addSuffix: true, locale: es })}
                  </span>
                </div>
              </div>

              {/* Data Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-4 border-t border-white/5 relative z-10">
                <div className="bg-black/20 border border-white/5 p-3 rounded-2xl flex flex-col justify-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1.5 flex items-center gap-1"><MapPin size={10}/> Ubicación</span>
                  <span className="text-xs font-bold text-zinc-300 truncate" title={`${city}, ${country}`}>{city}</span>
                </div>
                <div className="bg-black/20 border border-white/5 p-3 rounded-2xl flex flex-col justify-center">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1.5 flex items-center gap-1"><Activity size={10}/> Página</span>
                  <span className="text-xs font-bold text-zinc-300 truncate">{visit.path}</span>
                </div>
                <div className="bg-black/20 border border-white/5 p-3 rounded-2xl flex flex-col justify-center md:col-span-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-1.5">Sistema Base</span>
                  <span className="text-[10px] text-zinc-400 truncate" title={meta.user_agent}>
                    {meta.user_agent ? meta.user_agent.split(' ').slice(0,4).join(' ') + '...' : 'Browser Standard'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
