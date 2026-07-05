"use client";

import React, { useState, useEffect } from 'react';
import { Lead } from '@/prospecting-engine/types';
import { ChannelType, ActionType } from '@/prospecting-engine/agents/ChannelOperatorAgent';
import { ScoutKPIs } from '@/components/scout/ScoutKPIs';
import { ScoutKanban } from '@/components/scout/ScoutKanban';
import { ScoutTable } from '@/components/scout/ScoutTable';
import { LeadDetailModal } from '@/components/scout/LeadDetailModal';
import { TelegramConfigCard } from '@/components/scout/TelegramConfigCard';
import { LayoutDashboard, Table, RefreshCw, Shield, Smartphone, Zap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ScoutCommandCenterPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isRunningRound, setIsRunningRound] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'kanban' | 'table'>('kanban');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showInstallTip, setShowInstallTip] = useState<boolean>(false);

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
      // Si la acción implica cambio de estado natural, recargamos leads
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

  return (
    <div className="min-h-screen bg-zinc-950 text-white pb-20 selection:bg-orange-500 selection:text-white">
      
      {/* Cabecera / Navbar Superior del Command Center */}
      <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-8 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-zinc-500 hover:text-white transition p-2 rounded-lg hover:bg-zinc-900">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-black bg-gradient-to-r from-orange-500 to-amber-500 text-black uppercase tracking-wider">
                PWA Command Center
              </span>
              <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Gemini 3 Pro Online
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1">
              Architect.Sys <span className="text-orange-500">Scout Engine</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <button
            onClick={() => setShowInstallTip(!showInstallTip)}
            className="bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold px-3.5 py-2 rounded-xl border border-zinc-800 flex items-center gap-2 transition">
            <Smartphone className="w-4 h-4 text-orange-400" />
            <span className="hidden sm:inline">Instalar en Móvil (PWA)</span>
          </button>

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

          <button
            onClick={fetchLeads}
            disabled={loading}
            className="bg-zinc-900 hover:bg-zinc-800 text-white p-2 rounded-xl border border-zinc-800 transition">
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-orange-400' : ''}`} />
          </button>
        </div>
      </header>

      {/* Alerta / Tip para instalación PWA en iPhone o Android */}
      {showInstallTip && (
        <div className="bg-gradient-to-r from-orange-950/60 to-zinc-900 border-b border-orange-500/30 px-4 md:px-8 py-3 text-xs text-zinc-300 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-orange-400 shrink-0" />
            <span>
              <b>Para instalar como App en tu móvil:</b> En iPhone (Safari), pulsa el botón de compartir <span className="underline">"Añadir a pantalla de inicio"</span>. En Android/PC, pulsa en el menú del navegador y selecciona <span className="underline">"Instalar aplicación"</span>.
            </span>
          </div>
          <button onClick={() => setShowInstallTip(false)} className="text-zinc-400 hover:text-white font-bold ml-4">
            ✕
          </button>
        </div>
      )}

      {/* Contenedor Principal */}
      <main className="p-4 md:p-8 max-w-[1700px] mx-auto">
        
        {/* Panel de Configuración y Disparadores */}
        <TelegramConfigCard 
          onTriggerProspecting={handleTriggerRound} 
          isRunning={isRunningRound} 
        />

        {/* Panel de Métricas Rápidas (KPIs) */}
        <ScoutKPIs 
          leads={leads} 
          onTriggerRound={() => handleTriggerRound(100)}
          isRunning={isRunningRound}
        />

        {/* Vista Principal (Kanban o Tabla) */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-2">
              <Shield className="w-4 h-4 text-orange-400" />
              <span>Pipeline de Prospección ({leads.length} Leads Activos)</span>
            </h2>
            <span className="text-xs text-zinc-500">
              💡 Haz clic en cualquier restaurante para abrir su radiografía financiera y ganchos de WhatsApp.
            </span>
          </div>

          {loading && leads.length === 0 ? (
            <div className="h-64 border border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-500 space-y-3">
              <div className="w-8 h-8 border-3 border-orange-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-semibold">Cargando base de prospectos anti-duplicados...</p>
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

      </main>

      {/* Modal Interactivo de Detalle del Lead */}
      <LeadDetailModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onLogAction={handleLogAction}
        onStatusChange={handleStatusChange}
      />

    </div>
  );
}
