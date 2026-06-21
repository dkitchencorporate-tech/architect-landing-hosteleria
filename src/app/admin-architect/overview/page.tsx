'use client';

import React, { useEffect, useState } from 'react';
import LiveMonitor from '@/components/dashboard/LiveMonitor';
import TrafficMonitor from '@/components/dashboard/TrafficMonitor';
import Link from 'next/link';
import { Download, Activity, Globe, MessageSquare, HeartHandshake, Zap, Target, Laptop } from 'lucide-react';
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

      <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-orange-500/30">
        <header className="border-b border-white/5 bg-[#0A0A0A]/50 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-3 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="hidden md:flex w-8 h-8 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg items-center justify-center font-black text-white text-xs shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                A.
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-black tracking-tighter text-white leading-none">Console</h1>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-black">Node Live</span>
                </div>
              </div>
            </div>

            <nav className="flex items-center gap-4">
              <Link href="/" className="text-[10px] md:text-xs font-bold text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                <Globe size={12} /> Landing
              </Link>
              <div className="h-3 w-px bg-white/10 hidden md:block"></div>
              <button className="hidden md:flex bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase px-4 py-2 rounded-lg hover:bg-white/10 transition-all items-center gap-1.5">
                <Download size={12} /> Export
              </button>
            </nav>
          </div>
        </header>

        <main className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8 space-y-8">
          {/* GRID DE KPIs DE ALTA DENSIDAD (Conversaciones) */}
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { label: 'Conversaciones', value: stats.conversations, color: 'text-orange-400', trend: 'Live', icon: MessageSquare },
              { label: 'IA Sentiment', value: stats.sentiment, color: 'text-green-400', trend: 'Análisis', icon: HeartHandshake },
              { label: 'Tasa de Cierre', value: `${stats.closingRate}%`, color: 'text-zinc-200', trend: 'ROI', icon: Target },
              { label: 'Visitas Totales', value: trafficStats.totalVisits, color: 'text-blue-400', trend: 'Orgánico', icon: Zap },
              { label: 'Dispositivo', value: trafficStats.mobilePercentage > 50 ? 'Móvil' : 'Desktop', color: 'text-purple-400', trend: `${trafficStats.mobilePercentage}% Móvil`, icon: Laptop },
              { label: 'Top Origen', value: trafficStats.topSource, color: 'text-orange-400', trend: 'UTM', icon: Globe },
            ].map((m, i) => {
              const Icon = m.icon;
              return (
                <div key={i} className="bg-zinc-950/40 border border-white/5 backdrop-blur-md p-5 rounded-3xl transition-all hover:-translate-y-1 hover:shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:border-white/10 group relative overflow-hidden flex flex-col justify-between">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-3xl -mr-8 -mt-8 group-hover:bg-white/10 transition-colors pointer-events-none"></div>
                  <div className="flex justify-between items-start mb-4 relative z-10 gap-2">
                    <div className="flex items-center gap-1.5 text-zinc-500">
                      <Icon size={12} className="opacity-70 shrink-0" />
                      <p className="text-[9px] md:text-[10px] uppercase tracking-widest font-black truncate">{m.label}</p>
                    </div>
                    <span className="text-[8px] px-1.5 py-0.5 md:px-2 md:py-1 bg-black/40 border border-white/10 text-zinc-400 rounded-md font-black tracking-widest shrink-0">{m.trend}</span>
                  </div>
                  <p className={`text-2xl md:text-3xl font-black tracking-tighter relative z-10 drop-shadow-md truncate ${m.color}`} title={String(m.value)}>{m.value}</p>
                </div>
              );
            })}
          </section>

          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column: WhatsApp / IA */}
            <div>
              <div className="mb-4 flex justify-between items-end px-1">
                <div>
                  <h2 className="text-xl md:text-2xl font-black tracking-tighter text-white flex items-center gap-2">
                    <Activity className="text-orange-500" size={20} /> Live AI Agent Stream
                  </h2>
                </div>
              </div>

              <div className="bg-zinc-950/50 border border-white/5 p-2 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl">
                <LiveMonitor />
              </div>
            </div>

            {/* Right Column: Traffic Analytics */}
            <div>
              <div className="mb-4 flex justify-between items-end px-1 mt-8 lg:mt-0">
                <div>
                  <h2 className="text-xl md:text-2xl font-black tracking-tighter text-white flex items-center gap-2">
                    <Globe className="text-blue-500" size={20} /> Live Traffic Monitor
                  </h2>
                </div>
              </div>

              <div className="bg-zinc-950/50 border border-white/5 p-3 md:p-4 rounded-[2.5rem] shadow-[0_15px_40px_rgba(0,0,0,0.4)] backdrop-blur-xl h-[500px]">
                <TrafficMonitor />
              </div>
            </div>
          </section>
        </main>
      </div>

  );
}
