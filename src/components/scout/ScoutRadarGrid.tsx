"use client";

import React, { useState } from 'react';
import { Lead } from '@/prospecting-engine/types';
import { Shield, MessageSquare, Send, Copy, Check, RefreshCw, ExternalLink, TrendingUp, AlertTriangle, Sparkles, Filter, Award, Flame, Phone } from 'lucide-react';

interface ScoutRadarGridProps {
  leads: Lead[];
  onSelectLead: (lead: Lead, tab?: 'ai_chat' | 'whatsapp' | 'email') => void;
  onRefresh: () => Promise<void>;
  onLogAction: (leadId: string, channel: any, actionType: any, notes?: string) => Promise<void>;
}

export const ScoutRadarGrid: React.FC<ScoutRadarGridProps> = ({ leads, onSelectLead, onRefresh, onLogAction }) => {
  const [filter, setFilter] = useState<'all' | 'high_loss' | 'top_icp' | 'madrid_bcn'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [sendingTelegramId, setSendingTelegramId] = useState<string | null>(null);
  const [telegramSuccessId, setTelegramSuccessId] = useState<string | null>(null);

  // Filtrado funcional en tiempo real
  const filteredLeads = leads.filter(l => {
    if (filter === 'high_loss') return (l.estimatedLostMarginMonthly || 0) >= 20000;
    if (filter === 'top_icp') return l.priorityScore >= 95;
    if (filter === 'madrid_bcn') return l.city.toLowerCase().includes('madrid') || l.city.toLowerCase().includes('barcel') || l.city.toLowerCase().includes('marbell');
    return true;
  });

  const handleCopyHook = async (lead: Lead, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(lead.outreachCopy?.whatsappHook || '');
      setCopiedId(lead.id!);
      setTimeout(() => setCopiedId(null), 3000);
      await onLogAction(lead.id!, 'whatsapp', 'hook_copied', 'Alex copió el hook desde la Rejilla Agéntica');
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleSendTelegramAlert = async (lead: Lead, e: React.MouseEvent) => {
    e.stopPropagation();
    setSendingTelegramId(lead.id!);
    try {
      const res = await fetch('/api/prospecting/test-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          customLead: lead,
          notes: `Alerta disparada manualmente por Alex desde la Rejilla Agéntica para ${lead.restaurantName}`
        })
      });
      const data = await res.json();
      if (data.success || res.ok) {
        setTelegramSuccessId(lead.id!);
        setTimeout(() => setTelegramSuccessId(null), 4000);
      } else {
        alert('Configura tus credenciales en la Bóveda Telegram primero para recibir alertas en vivo.');
      }
    } catch (err) {
      alert('Error de red al intentar enviar la alerta a Telegram.');
    } finally {
      setSendingTelegramId(null);
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Barra de Filtros Funcionales (Cero elementos simulados) */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-orange-400" />
          <span className="text-xs font-black uppercase tracking-wider text-white">Filtro de Radiografías:</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              filter === 'all' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
            }`}>
            <span>🔥 Todos los ICPs ({leads.length})</span>
          </button>

          <button
            onClick={() => setFilter('high_loss')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              filter === 'high_loss' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
            }`}>
            <span>🚨 Fuga Crítica &gt; 20.000€/m ({leads.filter(l => (l.estimatedLostMarginMonthly||0) >= 20000).length})</span>
          </button>

          <button
            onClick={() => setFilter('top_icp')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              filter === 'top_icp' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20 font-black' : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
            }`}>
            <span>⭐ Top Score 95-100 pts ({leads.filter(l => l.priorityScore >= 95).length})</span>
          </button>

          <button
            onClick={() => setFilter('madrid_bcn')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              filter === 'madrid_bcn' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'bg-zinc-950 text-zinc-400 hover:text-white border border-zinc-800'
            }`}>
            <span>📍 Madrid, BCN & Marbella ({leads.filter(l => l.city.toLowerCase().includes('madrid') || l.city.toLowerCase().includes('barcel') || l.city.toLowerCase().includes('marbell')).length})</span>
          </button>
        </div>
      </div>

      {/* Rejilla de Tarjetas Independientes (¡NO ES UN CRM!) */}
      {filteredLeads.length === 0 ? (
        <div className="h-64 border border-dashed border-zinc-800 rounded-3xl flex flex-col items-center justify-center text-zinc-500 space-y-3">
          <AlertTriangle className="w-8 h-8 text-amber-400" />
          <p className="text-sm font-bold">No hay restaurantes que coincidan con este filtro táctico.</p>
          <button onClick={() => setFilter('all')} className="text-xs text-orange-400 underline font-semibold">
            Ver todos los prospectos activos
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredLeads.map((lead) => {
            const isHighLoss = (lead.estimatedLostMarginMonthly || 0) >= 25000;
            return (
              <div
                key={lead.id}
                onClick={() => onSelectLead(lead, 'ai_chat')}
                className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800/90 hover:border-orange-500/60 rounded-3xl p-6 shadow-2xl flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1 group relative overflow-hidden">
                
                {/* Resplandor superior según prioridad */}
                <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none transition-opacity opacity-20 ${
                  isHighLoss ? 'bg-rose-500' : 'bg-orange-500'
                }`} />

                <div>
                  {/* Cabecera de la Tarjeta Independiente */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          ICP #{lead.priorityScore}
                        </span>
                        <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1">
                          📍 {lead.city}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-white group-hover:text-orange-400 transition flex items-center gap-2">
                        {lead.restaurantName}
                        {lead.websiteUrl && (
                          <a 
                            href={lead.websiteUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="text-zinc-500 hover:text-white transition">
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1 flex items-center gap-3">
                        <span>🍽️ {lead.businessModel}</span>
                        <span>⭐ {lead.googleRating} ({lead.reviewCount} res.)</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[10px] font-bold uppercase text-zinc-500 block">Fuga Mensual</span>
                      <span className={`text-xl font-black ${isHighLoss ? 'text-rose-400 animate-pulse' : 'text-orange-400'}`}>
                        ~{lead.estimatedLostMarginMonthly?.toLocaleString('es-ES')} €
                      </span>
                    </div>
                  </div>

                  {/* Diagnóstico Táctico en Vivo */}
                  <div className="p-3.5 bg-zinc-950/80 border border-zinc-800/80 rounded-2xl space-y-2 mb-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-400">Estado Operativo:</span>
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                        {lead.usesElTenedor ? 'Comisiones El Tenedor (15%)' : 'Carta PDF Estática (-40%)'}
                      </span>
                    </div>
                    <p className="text-[11px] text-zinc-300 italic line-clamp-2 leading-relaxed">
                      "{lead.diagnosticSummary}"
                    </p>
                  </div>

                  {/* Vista Previa del Gancho WhatsApp (0 enlaces, < 75 palabras) */}
                  <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/20 rounded-2xl mb-4">
                    <div className="flex items-center justify-between text-[10px] font-bold text-emerald-400 uppercase tracking-wider mb-1">
                      <span>💬 Hook WhatsApp (Sin Links):</span>
                      <span>{lead.outreachCopy?.whatsappHook.split(' ').length || 0} palabras</span>
                    </div>
                    <p className="text-xs text-zinc-300 font-sans line-clamp-3 leading-relaxed">
                      "{lead.outreachCopy?.whatsappHook}"
                    </p>
                  </div>
                </div>

                {/* BARRA DE ACCIÓN FUNCIONAL 100% AUTOMATIZADA (Cero mockups) */}
                <div className="pt-4 border-t border-zinc-800/80 grid grid-cols-3 gap-2">
                  
                  {/* Botón 1: Abrir Chat IA del Lead */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectLead(lead, 'ai_chat');
                    }}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 transition group-hover:scale-[1.02]">
                    <Award className="w-3.5 h-3.5 shrink-0" />
                    <span>Chat IA</span>
                  </button>

                  {/* Botón 2: Copiar WhatsApp Hook */}
                  <button
                    onClick={(e) => handleCopyHook(lead, e)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-zinc-700 transition">
                    {copiedId === lead.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-emerald-400" />}
                    <span>{copiedId === lead.id ? '¡Copiado!' : 'Copiar WA'}</span>
                  </button>

                  {/* Botón 3: Enviar Alerta VIP a Telegram */}
                  <button
                    onClick={(e) => handleSendTelegramAlert(lead, e)}
                    disabled={sendingTelegramId === lead.id}
                    className={`font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition border ${
                      telegramSuccessId === lead.id
                        ? 'bg-emerald-950 border-emerald-500/50 text-emerald-300'
                        : 'bg-blue-950/60 hover:bg-blue-900/80 border-blue-500/30 text-blue-300'
                    }`}>
                    {sendingTelegramId === lead.id ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : telegramSuccessId === lead.id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Send className="w-3.5 h-3.5 text-blue-400" />
                    )}
                    <span>{telegramSuccessId === lead.id ? '¡Enviado!' : 'Alerta VIP'}</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
