"use client";

import React, { useState, useEffect } from 'react';
import { Lead } from '@/prospecting-engine/types';
import { ChannelType, ActionType } from '@/prospecting-engine/agents/ChannelOperatorAgent';
import { ScoutKPIs } from '@/components/scout/ScoutKPIs';
import { ScoutKanban } from '@/components/scout/ScoutKanban';
import { ScoutTable } from '@/components/scout/ScoutTable';
import { LeadDetailModal } from '@/components/scout/LeadDetailModal';
import { TelegramVault } from '@/components/scout/TelegramVault';
import { MatrixAgentChat } from '@/components/scout/MatrixAgentChat';
import { OmnichannelSyncView } from '@/components/scout/OmnichannelSyncView';
import { 
  LayoutDashboard, Table, RefreshCw, Shield, Smartphone, Zap, ArrowLeft, 
  Menu, X, MessageSquare, Cpu, Globe, Lock, ChevronRight, Flame, Award
} from 'lucide-react';
import Link from 'next/link';

type NavSection = 'overview' | 'pipeline' | 'telegram' | 'matrix' | 'omnichannel';

export default function ScoutCommandCenterPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRunningRound, setIsRunningRound] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showInstallTip, setShowInstallTip] = useState<boolean>(false);
  
  // Navegación por Secciones y Menú Lateral (Hamburguesa)
  const [currentSection, setCurrentSection] = useState<NavSection>('overview');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  // 1. Cargar prospectos iniciales desde nuestra API
  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/prospecting/leads');
      const data = await res.json();
      if (data.success && data.leads) {
        setLeads(data.leads);
      }
    } catch (err) {
      console.error('Error cargando leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // 2. Disparar nueva ronda de prospección con Gemini 3 Pro
  const handleTriggerRound = async (count: number = 100) => {
    setIsRunningRound(true);
    try {
      const res = await fetch(`/api/prospecting/run?count=${count}`);
      const data = await res.json();
      if (data.success) {
        await fetchLeads(); // Recargar lista con los nuevos leads descubiertos
        setCurrentSection('pipeline'); // Cambiar automáticamente a la vista de pipeline para verlos
      } else {
        alert('Error ejecutando ronda: ' + (data.error || 'Desconocido'));
      }
    } catch (err) {
      alert('Error de conexión al disparar el agente de prospección.');
    } finally {
      setIsRunningRound(false);
    }
  };

  // 3. Autorizar un lead para contacto
  const handleApproveLead = async (leadId: string) => {
    await handleStatusChange(leadId, 'APPROVED');
  };

  // 4. Cambiar estado CRM
  const handleStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/prospecting/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'update_status', leadId, status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        const typedStatus = newStatus as Lead['status'];
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: typedStatus } : l));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(prev => prev ? { ...prev, status: typedStatus } : null);
        }
      }
    } catch (err) {
      console.error('Error al actualizar estado:', err);
    }
  };

  // 5. Registrar acción multi-canal
  const handleLogAction = async (leadId: string, channel: ChannelType, actionType: ActionType, notes?: string) => {
    try {
      await fetch('/api/prospecting/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'log_channel_action', leadId, channel, actionType, notes })
      });
      if (actionType === 'message_sent' || actionType === 'hook_copied') {
        let newStatus: Lead['status'] = 'APPROVED';
        if (channel === 'whatsapp') newStatus = 'WHATSAPP_SENT';
        else if (channel === 'email') newStatus = 'EMAIL_SENT';
        else if (channel === 'instagram' || channel === 'linkedin' || channel === 'facebook') newStatus = 'IG_DM_SENT';
        
        setLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
        if (selectedLead && selectedLead.id === leadId) {
          setSelectedLead(prev => prev ? { ...prev, status: newStatus } : null);
        }
      }
    } catch (err) {
      console.error('Error log channel action:', err);
    }
  };

  const navItems = [
    { id: 'overview', label: 'Centro de Mando & Disparo', icon: LayoutDashboard, badge: 'KPIs' },
    { id: 'pipeline', label: 'Pipeline & Radiografías', icon: Shield, badge: `${leads.length} Leads` },
    { id: 'telegram', label: 'Bóveda Telegram (Login)', icon: Lock, badge: 'VIP' },
    { id: 'matrix', label: 'Agente Matriz (Arqui-AI)', icon: Cpu, badge: 'Comandante' },
    { id: 'omnichannel', label: 'Sincronización 360°', icon: Globe, badge: 'Calle & Ads' },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col md:flex-row selection:bg-orange-500 selection:text-white">
      
      {/* MENÚ LATERAL (SIDEBAR / HAMBURGUESA) */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-50 h-screen bg-zinc-950 border-r border-zinc-800/80 transition-all duration-300 flex flex-col justify-between ${
          sidebarOpen ? 'w-72 translate-x-0' : '-translate-x-full md:translate-x-0 md:w-20'
        }`}>
        
        {/* Cabecera del Sidebar */}
        <div className="p-4 border-b border-zinc-800/80 flex items-center justify-between">
          <div className={`flex items-center gap-3 overflow-hidden transition-opacity ${!sidebarOpen && 'md:opacity-0 md:w-0'}`}>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center font-black text-black text-sm shrink-0 shadow-lg shadow-orange-500/20">
              A
            </div>
            <div className="flex flex-col">
              <span className="font-black text-sm text-white tracking-tight leading-none">Architect.Sys</span>
              <span className="text-[10px] text-orange-400 font-bold mt-0.5 uppercase tracking-wider">Scout Engine PWA</span>
            </div>
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition border border-zinc-800">
            {sidebarOpen ? <X className="w-4 h-4 md:hidden" /> : <Menu className="w-4 h-4" />}
            <Menu className="w-4 h-4 hidden md:block" />
          </button>
        </div>

        {/* Lista de Secciones */}
        <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentSection(item.id as NavSection);
                  if (window.innerWidth < 768) setSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between p-3 rounded-2xl transition font-bold text-xs group ${
                  isActive
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900/80'
                }`}>
                <div className="flex items-center gap-3.5">
                  <Icon className={`w-4 h-4 shrink-0 transition ${isActive ? 'text-white' : 'text-orange-400 group-hover:scale-110'}`} />
                  <span className={`transition-opacity whitespace-nowrap ${!sidebarOpen && 'md:hidden'}`}>
                    {item.label}
                  </span>
                </div>
                {sidebarOpen && (
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-extrabold uppercase ${
                    isActive ? 'bg-black/30 text-white' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Pie del Sidebar / Botón Volver e Instalación PWA */}
        <div className="p-3 border-t border-zinc-800/80 space-y-2">
          <button
            onClick={() => setShowInstallTip(!showInstallTip)}
            className={`w-full flex items-center gap-3 p-3 rounded-2xl bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-semibold transition ${
              !sidebarOpen && 'md:justify-center'
            }`}>
            <Smartphone className="w-4 h-4 text-orange-400 shrink-0" />
            <span className={`transition-opacity whitespace-nowrap ${!sidebarOpen && 'md:hidden'}`}>
              Instalar en Móvil
            </span>
          </button>

          <Link
            href="/"
            className={`w-full flex items-center gap-3 p-3 rounded-2xl text-zinc-500 hover:text-white hover:bg-zinc-900/60 text-xs font-semibold transition ${
              !sidebarOpen && 'md:justify-center'
            }`}>
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span className={`transition-opacity whitespace-nowrap ${!sidebarOpen && 'md:hidden'}`}>
              Volver a la Landing
            </span>
          </Link>
        </div>

      </aside>

      {/* ÁREA DE CONTENIDO PRINCIPAL */}
      <div className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        
        {/* Barra Superior Superior (Header del Área Principal) */}
        <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 md:hidden border border-zinc-800">
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Gemini 3 Pro Sincronizado
              </span>
              <span className="hidden sm:inline-flex text-xs text-orange-400 font-bold items-center gap-1.5 bg-orange-950/60 border border-orange-500/30 px-3 py-1 rounded-full">
                <Flame className="w-3.5 h-3.5 fill-current" />
                Agresividad: 93/100
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentSection === 'pipeline' && (
              <div className="bg-zinc-900 p-1 rounded-xl border border-zinc-800 flex items-center">
                <button
                  onClick={() => setViewMode('kanban')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    viewMode === 'kanban' ? 'bg-orange-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}>
                  <LayoutDashboard className="w-3.5 h-3.5" />
                  <span>Kanban</span>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition ${
                    viewMode === 'table' ? 'bg-orange-500 text-white shadow-md' : 'text-zinc-400 hover:text-white'
                  }`}>
                  <Table className="w-3.5 h-3.5" />
                  <span>Tabla Clay</span>
                </button>
              </div>
            )}

            <button
              onClick={fetchLeads}
              disabled={loading}
              title="Recargar base de datos"
              className="bg-zinc-900 hover:bg-zinc-800 text-white p-2.5 rounded-xl border border-zinc-800 transition">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-400' : ''}`} />
            </button>
          </div>
        </header>

        {/* Alerta PWA */}
        {showInstallTip && (
          <div className="bg-gradient-to-r from-orange-950/60 to-zinc-900 border-b border-orange-500/30 px-4 md:px-8 py-3 text-xs text-zinc-300 flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-3">
              <Zap className="w-4 h-4 text-orange-400 shrink-0" />
              <span>
                <b>Para instalar como App en tu móvil:</b> En iPhone (Safari), pulsa compartir <span className="underline">"Añadir a pantalla de inicio"</span>. En Android/PC, pulsa en menú y <span className="underline">"Instalar aplicación"</span>.
              </span>
            </div>
            <button onClick={() => setShowInstallTip(false)} className="text-zinc-400 hover:text-white font-bold ml-4">✕</button>
          </div>
        )}

        {/* CONTENIDO PRINCIPAL SEGÚN LA SECCIÓN SELECCIONADA */}
        <main className="p-4 md:p-8 flex-1 max-w-[1800px] w-full mx-auto">
          
          {/* SECCIÓN 1: CENTRO DE MANDO & DISPARO */}
          {currentSection === 'overview' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
                    Centro de Mando: <span className="text-orange-500">Scout Engine</span>
                  </h2>
                  <p className="text-zinc-400 text-xs md:text-sm mt-1">
                    Control central del enjambre agéntico. Dispara rondas sobre Google Maps o revisa el estado global.
                  </p>
                </div>
                <button
                  onClick={() => setCurrentSection('matrix')}
                  className="hidden md:flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-amber-500/20 hover:from-orange-500/30 hover:to-amber-500/30 border border-orange-500/40 text-orange-300 px-4 py-2.5 rounded-xl text-xs font-bold transition">
                  <Cpu className="w-4 h-4 text-orange-400" />
                  <span>Hablar con Agente Matriz</span>
                </button>
              </div>

              {/* Panel de Métricas Rápidas (KPIs) */}
              <ScoutKPIs 
                leads={leads} 
                onTriggerRound={() => handleTriggerRound(100)}
                isRunning={isRunningRound}
              />

              {/* Banner de Sinergia y Acceso Rápido a Secciones */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                <div 
                  onClick={() => setCurrentSection('pipeline')}
                  className="bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 rounded-3xl p-6 cursor-pointer transition group flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4 group-hover:scale-110 transition">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-black text-white">Pipeline ({leads.length} Leads)</h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Visualiza las radiografías en Kanban espacioso o en Tabla estilo Clay con chat interactivo por lead.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-bold text-orange-400 group-hover:translate-x-1 transition">
                    <span>Abrir Pipeline</span> <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>

                <div 
                  onClick={() => setCurrentSection('telegram')}
                  className="bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-blue-500/50 rounded-3xl p-6 cursor-pointer transition group flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-black text-white">Bóveda Telegram</h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Sub-menú estilo login independiente para configurar alertas VIP directo a tu móvil sin pasar por PWA.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-bold text-blue-400 group-hover:translate-x-1 transition">
                    <span>Configurar Bóveda</span> <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>

                <div 
                  onClick={() => setCurrentSection('omnichannel')}
                  className="bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800 hover:border-purple-500/50 rounded-3xl p-6 cursor-pointer transition group flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition">
                      <Globe className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-black text-white">Sincronización 360°</h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Supervisa la coherencia entre prospección en calle, anuncios de retargeting y el enjambre de frío digital.
                    </p>
                  </div>
                  <div className="mt-4 flex items-center text-xs font-bold text-purple-400 group-hover:translate-x-1 transition">
                    <span>Ver Sincronía</span> <ChevronRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SECCIÓN 2: PIPELINE & RADIOGRAFÍAS (KANBAN Y TABLA) */}
          {currentSection === 'pipeline' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                    <Shield className="w-6 h-6 text-orange-400" />
                    <span>Pipeline y Radiografías de Fuga ({leads.length} Restaurantes)</span>
                  </h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    💡 Haz clic en cualquier tarjeta para abrir la radiografía completa y el **Chat Visual con el Agente** de ese restaurante.
                  </p>
                </div>

                <button
                  onClick={() => handleTriggerRound(50)}
                  disabled={isRunningRound}
                  className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-5 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-orange-500/20 transition">
                  <Zap className={`w-4 h-4 ${isRunningRound ? 'animate-spin' : 'fill-current'}`} />
                  <span>{isRunningRound ? 'Orquestando Agentes...' : '+ Escanear 50 Nuevos Leads'}</span>
                </button>
              </div>

              {loading && leads.length === 0 ? (
                <div className="h-96 border border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-zinc-500 space-y-3">
                  <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-bold">Cargando base de prospectos anti-duplicados...</p>
                </div>
              ) : (
                viewMode === 'kanban' ? (
                  <ScoutKanban 
                    leads={leads} 
                    onSelectLead={setSelectedLead}
                    onApproveLead={handleApproveLead}
                  />
                ) : (
                  <ScoutTable 
                    leads={leads} 
                    onSelectLead={setSelectedLead}
                    onApproveLead={handleApproveLead}
                  />
                )
              )}
            </div>
          )}

          {/* SECCIÓN 3: BÓVEDA TELEGRAM (LOGIN INTERNO) */}
          {currentSection === 'telegram' && (
            <TelegramVault />
          )}

          {/* SECCIÓN 4: AGENTE MATRIZ (ARQUI-AI COMANDANTE) */}
          {currentSection === 'matrix' && (
            <MatrixAgentChat 
              leads={leads}
              onTriggerRound={handleTriggerRound}
              isRunning={isRunningRound}
            />
          )}

          {/* SECCIÓN 5: SINCRONIZACIÓN OMNICANAL */}
          {currentSection === 'omnichannel' && (
            <OmnichannelSyncView />
          )}

        </main>

      </div>

      {/* Modal Interactivo de Detalle del Lead y Chat Visual */}
      <LeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onLogAction={handleLogAction}
        onStatusChange={handleStatusChange}
      />

    </div>
  );
}
