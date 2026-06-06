'use client';

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase-client';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface WebAnalyticsRow {
  id: number;
  created_at: string;
  session_id: string;
  path: string;
  referrer: string;
  utm_source: string;
  device_type: string;
  metadata?: any;
}

export default function TrafficMonitor() {
  const [visits, setVisits] = useState<WebAnalyticsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTraffic = async () => {
      if (!supabaseClient) return;
      const { data, error } = await supabaseClient
        .from('web_analytics')
        .select('id, created_at, session_id, path, referrer, utm_source, device_type, metadata')
        .order('created_at', { ascending: false })
        .limit(20);

      if (!error && data) {
        setVisits(data);
      }
      setLoading(false);
    };

    fetchTraffic();

    // Suscripción a nuevos eventos (si RLS y Realtime están activados para web_analytics)
    const channel = supabaseClient?.channel('traffic-monitor')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'web_analytics' },
        (payload) => {
          setVisits((current) => [payload.new as WebAnalyticsRow, ...current].slice(0, 20));
        }
      )
      .subscribe();

    return () => {
      if (channel) supabaseClient?.removeChannel(channel);
    };
  }, []);

  if (loading) {
    return (
      <div className=&quot;flex items-center justify-center h-48&quot;>
        <div className=&quot;animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full&quot;></div>
      </div>
    );
  }

  if (visits.length === 0) {
    return (
      <div className=&quot;flex flex-col items-center justify-center h-48 text-zinc-400&quot;>
        <div className=&quot;text-4xl mb-2&quot;>📡</div>
        <p className=&quot;font-bold&quot;>Esperando señal de tráfico...</p>
        <p className=&quot;text-xs&quot;>Asegúrate de que la tabla 'web_analytics' exista en Supabase.</p>
      </div>
    );
  }

  return (
    <div className=&quot;w-full h-[500px] overflow-y-auto pr-2 custom-scrollbar&quot;>
      <div className=&quot;space-y-3&quot;>
        {visits.map((visit) => {
          const meta = visit.metadata || {};
          const city = meta.city || 'Desconocido';
          const country = meta.country || 'Desconocido';
          
          return (
            <div key={visit.id} className=&quot;bg-white border border-zinc-100 p-5 rounded-3xl shadow-sm hover:shadow-md transition-all&quot;>
              
              <div className=&quot;flex items-start justify-between mb-3&quot;>
                <div className=&quot;flex items-center gap-3&quot;>
                  {/* Device Icon */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold shrink-0 shadow-sm ${
                    visit.device_type === 'mobile' ? 'bg-blue-50 text-blue-500 border border-blue-100' : 'bg-purple-50 text-purple-500 border border-purple-100'
                  }`}>
                    {visit.device_type === 'mobile' ? '📱' : '💻'}
                  </div>
                  
                  <div>
                    <div className=&quot;flex items-center gap-2 mb-0.5&quot;>
                      <span className=&quot;font-black text-zinc-900 text-sm tracking-tight&quot;>Visita Detectada</span>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${visit.utm_source ? 'bg-orange-100 text-orange-600' : 'bg-zinc-100 text-zinc-500'}`}>
                        {visit.utm_source || 'Orgánico'}
                      </span>
                    </div>
                    <div className=&quot;text-[10px] font-bold text-zinc-400 font-mono tracking-tighter&quot;>
                      ID: {visit.session_id.substring(0, 10)}
                    </div>
                  </div>
                </div>

                <div className=&quot;text-right&quot;>
                  <span className=&quot;text-[10px] uppercase font-black text-zinc-300 tracking-widest block mb-0.5&quot;>Ingreso</span>
                  <span className=&quot;text-xs text-zinc-600 font-medium&quot;>
                    {formatDistanceToNow(new Date(visit.created_at), { addSuffix: true, locale: es })}
                  </span>
                </div>
              </div>

              {/* Data Grid */}
              <div className=&quot;grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 pt-4 border-t border-zinc-50&quot;>
                <div className=&quot;bg-zinc-50 p-2 rounded-xl flex flex-col justify-center&quot;>
                  <span className=&quot;text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1&quot;>Ubicación</span>
                  <span className=&quot;text-xs font-bold text-zinc-700 truncate&quot; title={`${city}, ${country}`}>📍 {city}</span>
                </div>
                <div className=&quot;bg-zinc-50 p-2 rounded-xl flex flex-col justify-center&quot;>
                  <span className=&quot;text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1&quot;>Página</span>
                  <span className=&quot;text-xs font-bold text-zinc-700 truncate&quot;>{visit.path}</span>
                </div>
                <div className=&quot;bg-zinc-50 p-2 rounded-xl flex flex-col justify-center md:col-span-2&quot;>
                  <span className=&quot;text-[9px] font-black uppercase tracking-widest text-zinc-400 mb-1&quot;>Sistema</span>
                  <span className=&quot;text-[10px] text-zinc-500 truncate&quot; title={meta.user_agent}>
                    {meta.user_agent ? meta.user_agent.split(' ').slice(0,3).join(' ') + '...' : 'Browser Standard'}
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
