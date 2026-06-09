'use client';

import React, { useEffect, useState } from 'react';
import LiveMonitor from '@/components/dashboard/LiveMonitor';
import TrafficMonitor from '@/components/dashboard/TrafficMonitor';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabase-client';


export default function AdminDashboard() {
  const [stats, setStats] = useState({
    conversations: 0,
    closingRate: 0,
    rejectionRate: 0,
    topTopic: 'Analizando...',
    actionStage: 0,
    sentiment: 'Neutro'
  });

  const [trafficStats, setTrafficStats] = useState({
    totalVisits: 0,
    mobilePercentage: 0,
    topSource: 'Calculando...'
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!supabaseClient) return;

      // 1. Fetch Chats Stats
      let { data: chats, error } = await supabaseClient
        .from('chats')
        .select('intent, sentiment, topic, closing_stage, phone')
        .or('status.eq.active,status.is.null');

      if (error && error.code === '42703') {
        const fallback = await supabaseClient
          .from('chats')
          .select('intent, sentiment, topic, closing_stage, phone');
        chats = fallback.data;
        error = fallback.error;
      }

      if (chats) {
        const total = chats.length;
        const sales = chats.filter(c => c.intent === 'venta').length;
        const rejections = chats.filter(c => c.intent === 'rechazo').length;
        const positive = chats.filter(c => c.sentiment === 'positivo').length;
        const actionLeads = chats.filter(c => c.closing_stage === 'accion').length;

        const topics = chats.map(c => c.topic).filter(Boolean);
        const topTopic = topics.length > 0
          ? topics.sort((a,b) => topics.filter(v => v===a).length - topics.filter(v => v===b).length).pop()
          : 'Ninguno';

        const rate = total > 0 ? Math.round((sales / total) * 100) : 0;
        const rejectRate = total > 0 ? Math.round((rejections / total) * 100) : 0;

        let avgSent = 'Neutro';
        if (positive > total / 2) avgSent = 'Positivo';
        else if (total > 0 && positive < total / 4) avgSent = 'Alerta';

        setStats({
          conversations: total,
          closingRate: rate,
          rejectionRate: rejectRate,
          topTopic: topTopic || 'Chat',
          actionStage: actionLeads,
          sentiment: avgSent
        });
      }

      // 2. Fetch Traffic Stats
      const { data: traffic } = await supabaseClient
        .from('web_analytics')
        .select('utm_source, device_type');

      if (traffic) {
        const totalVisits = traffic.length;
        const mobile = traffic.filter(t => t.device_type === 'mobile').length;
        const mobilePercentage = totalVisits > 0 ? Math.round((mobile / totalVisits) * 100) : 0;

        const sources = traffic.map(t => t.utm_source).filter(Boolean);
        const topSource = sources.length > 0
          ? sources.sort((a,b) => sources.filter(v => v===a).length - sources.filter(v => v===b).length).pop()
          : 'Directo / Orgánico';

        setTrafficStats({
          totalVisits,
          mobilePercentage,
          topSource: topSource || 'Directo'
        });
      }
    };

    fetchStats();

    let channel: any = null;
    if (supabaseClient) {
      channel = supabaseClient.channel('stats-sync-heavy')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, () => fetchStats())
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'web_analytics' }, () => fetchStats())
        .subscribe();
    }

    return () => {
      if (channel && supabaseClient) supabaseClient.removeChannel(channel);
    };
  }, []);

  return (

      <div className="min-h-screen bg-[#FDFCF8] text-zinc-900 font-sans selection:bg-orange-500/30">
        <header className="border-b border-zinc-100 bg-white/70 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-orange-500/20">
                A
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-zinc-900">Architect.Sys Console</h1>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">Node Live - Production</span>
                </div>
              </div>
            </div>

            <nav className="flex items-center gap-4">
              <Link href="/" target="_blank" className="text-xs font-bold text-zinc-500 hover:text-orange-600 transition-colors">
                Ir a la Landing
              </Link>
              <div className="h-4 w-px bg-zinc-200 mx-2"></div>
              <button className="bg-zinc-900 text-white text-[10px] font-black uppercase px-4 py-2 rounded-lg hover:bg-zinc-800 transition-all">
                Export Audit
              </button>
            </nav>
          </div>
        </header>

        <main className="max-w-[1600px] mx-auto p-6 space-y-8">
          {/* GRID DE KPIs DE ALTA DENSIDAD (Conversaciones) */}
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Conversaciones', value: stats.conversations, color: 'text-orange-600', trend: 'Live' },
              { label: 'IA Sentiment', value: stats.sentiment, color: 'text-green-600', trend: 'Análisis' },
              { label: 'Tasa de Cierre', value: `${stats.closingRate}%`, color: 'text-zinc-600', trend: 'ROI' },
              { label: 'Visitas Totales', value: trafficStats.totalVisits, color: 'text-blue-500', trend: 'Orgánico' },
              { label: 'Dispositivo', value: trafficStats.mobilePercentage > 50 ? 'Móvil' : 'Desktop', color: 'text-purple-500', trend: `${trafficStats.mobilePercentage}% Móvil` },
              { label: 'Top Origen', value: trafficStats.topSource, color: 'text-orange-600', trend: 'UTM' },
            ].map((m, i) => (
              <div key={i} className="bg-white border border-zinc-100 p-4 rounded-3xl shadow-sm transition-all hover:shadow-xl hover:shadow-zinc-200/50">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-[9px] uppercase tracking-widest text-zinc-300 font-black">{m.label}</p>
                  <span className="text-[8px] px-1.5 py-0.5 bg-zinc-50 text-zinc-400 rounded-md font-bold">{m.trend}</span>
                </div>
                <p className={`text-xl font-black tracking-tighter ${m.color}`}>{m.value}</p>
              </div>
            ))}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: WhatsApp / IA */}
            <div>
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-black tracking-tighter text-zinc-900">Live AI Agent Stream</h2>
                  <p className="text-zinc-400 text-sm">Auditoría en tiempo real de leads web.</p>
                </div>
              </div>

              <div className="bg-white border border-zinc-100 p-1 rounded-[2.5rem] shadow-xl shadow-zinc-200/20">
                <LiveMonitor />
              </div>
            </div>

            {/* Right Column: Traffic Analytics */}
            <div>
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <h2 className="text-2xl font-black tracking-tighter text-zinc-900">Live Traffic Monitor</h2>
                  <p className="text-zinc-400 text-sm">Métricas de entrada web y origen de leads.</p>
                </div>
              </div>

              <div className="bg-white border border-zinc-100 p-6 rounded-[2.5rem] shadow-xl shadow-zinc-200/20 h-full">
                <TrafficMonitor />
              </div>
            </div>
          </section>
        </main>
      </div>

  );
}
