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
}

export default function TrafficMonitor() {
  const [visits, setVisits] = useState<WebAnalyticsRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTraffic = async () => {
      if (!supabaseClient) return;
      const { data, error } = await supabaseClient
        .from('web_analytics')
        .select('id, created_at, session_id, path, referrer, utm_source, device_type')
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
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (visits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-48 text-zinc-400">
        <div className="text-4xl mb-2">📡</div>
        <p className="font-bold">Esperando señal de tráfico...</p>
        <p className="text-xs">Asegúrate de que la tabla 'web_analytics' exista en Supabase.</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] overflow-y-auto pr-2 custom-scrollbar">
      <div className="space-y-3">
        {visits.map((visit) => (
          <div key={visit.id} className="bg-white border border-zinc-100 p-4 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all flex items-center justify-between">
            
            <div className="flex items-center gap-4">
              {/* Device Icon */}
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 ${
                visit.device_type === 'mobile' ? 'bg-blue-50 text-blue-500' : 'bg-purple-50 text-purple-500'
              }`}>
                {visit.device_type === 'mobile' ? '📱' : '💻'}
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-zinc-900 text-sm">Visita Detectada</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500">
                    {visit.utm_source || 'Orgánico / Directo'}
                  </span>
                </div>
                <div className="text-xs text-zinc-400 font-mono">
                  {visit.path} • ID: {visit.session_id.substring(0, 8)}...
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-zinc-400 block mb-1">Hace instantes</span>
              <span className="text-xs text-zinc-500 font-medium">
                {formatDistanceToNow(new Date(visit.created_at), { addSuffix: true, locale: es })}
              </span>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
