import React from 'react';
import { Lead } from '@/prospecting-engine/types';
import { Users, TrendingUp, CheckCircle, MessageSquare, DollarSign, Award } from 'lucide-react';

interface ScoutKPIsProps {
  leads: Lead[];
  onTriggerRound?: () => void;
  isRunning?: boolean;
}

export const ScoutKPIs: React.FC<ScoutKPIsProps> = ({ leads, onTriggerRound, isRunning }) => {
  const totalLeads = leads.length;
  const topIcps = leads.filter(l => l.priorityScore >= 70).length;
  const approved = leads.filter(l => ['APPROVED', 'WHATSAPP_SENT', 'EMAIL_SENT', 'IG_DM_SENT', 'REPLIED', 'MEETING_BOOKED', 'CLOSED_WON'].includes(l.status)).length;
  const contacted = leads.filter(l => ['WHATSAPP_SENT', 'EMAIL_SENT', 'IG_DM_SENT', 'REPLIED', 'MEETING_BOOKED', 'CLOSED_WON'].includes(l.status)).length;
  const meetings = leads.filter(l => ['MEETING_BOOKED', 'CLOSED_WON'].includes(l.status)).length;
  
  const totalLostMargin = leads.reduce((acc, l) => acc + (l.estimatedLostMarginMonthly || 0), 0);
  const potentialAgencyRevenue = topIcps * 2500; // Estimando 2.500€ ticket medio por cliente High-Ticket

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
      {/* KPI 1: Leads Descubiertos */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-lg group hover:border-orange-500/50 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Leads en Radar</span>
          <Users className="w-4 h-4 text-orange-400" />
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold text-white">{totalLeads}</span>
          <span className="text-xs text-orange-400 font-medium">100/día obj</span>
        </div>
        <div className="w-full bg-zinc-800 h-1 mt-3 rounded-full overflow-hidden">
          <div className="bg-orange-500 h-full rounded-full" style={{ width: `${Math.min(100, (totalLeads / 100) * 100)}%` }} />
        </div>
      </div>

      {/* KPI 2: Top ICPs Prioridad */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-lg group hover:border-amber-500/50 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Top ICPs (&gt;70)</span>
          <Award className="w-4 h-4 text-amber-400" />
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold text-amber-400">{topIcps}</span>
          <span className="text-xs text-zinc-400">Objetivo VIP</span>
        </div>
        <p className="text-[11px] text-zinc-500 mt-2">Altísimo dolor financiero</p>
      </div>

      {/* KPI 3: Aprobados por Alex */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-lg group hover:border-emerald-500/50 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Autorizados</span>
          <CheckCircle className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold text-emerald-400">{approved}</span>
          <span className="text-xs text-emerald-500/80 font-semibold">{totalLeads > 0 ? Math.round((approved / totalLeads) * 100) : 0}%</span>
        </div>
        <p className="text-[11px] text-zinc-500 mt-2">Listos para acción agresiva</p>
      </div>

      {/* KPI 4: Contactados Multi-Canal */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-lg group hover:border-blue-500/50 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Contactados</span>
          <MessageSquare className="w-4 h-4 text-blue-400" />
        </div>
        <div className="mt-3 flex items-baseline justify-between">
          <span className="text-2xl font-bold text-blue-400">{contacted}</span>
          <span className="text-xs text-blue-300 font-medium">{meetings} agendas</span>
        </div>
        <p className="text-[11px] text-zinc-500 mt-2">WhatsApp / IG / Email</p>
      </div>

      {/* KPI 5: Fuga de Margen Detectada */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-lg group hover:border-rose-500/50 transition-all">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Fuga Auditoría</span>
          <TrendingUp className="w-4 h-4 text-rose-400" />
        </div>
        <div className="mt-3">
          <span className="text-xl font-bold text-rose-400">~{(totalLostMargin / 1000).toFixed(1)}k €/mes</span>
        </div>
        <p className="text-[11px] text-zinc-500 mt-2">En comisiones y cartas PDF</p>
      </div>

      {/* KPI 6: Pipeline Facturación Agencia */}
      <div className="bg-gradient-to-br from-orange-500/20 via-zinc-900 to-amber-500/10 border border-orange-500/30 rounded-xl p-4 flex flex-col justify-between relative overflow-hidden shadow-xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Pipeline MRR</span>
          <DollarSign className="w-4 h-4 text-orange-400" />
        </div>
        <div className="mt-3">
          <span className="text-2xl font-black text-white">~{(potentialAgencyRevenue / 1000).toFixed(1)}k €</span>
        </div>
        <p className="text-[11px] text-orange-300/80 mt-2 font-medium">Meta: 5 clientes/mes (~12.5k€)</p>
      </div>
    </div>
  );
};
