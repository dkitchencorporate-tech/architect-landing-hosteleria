import React from 'react';
import { Lead } from '@/prospecting-engine/types';
import { Award, MessageSquare, Calendar, DollarSign, CheckCircle, Clock, ChevronRight } from 'lucide-react';

interface ScoutKanbanProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onApproveLead?: (leadId: string) => Promise<void>;
}

interface KanbanColumn {
  id: string;
  title: string;
  statuses: string[];
  color: string;
  icon: React.ReactNode;
}

const COLUMNS: KanbanColumn[] = [
  {
    id: 'pending',
    title: 'Por Aprobar (IA)',
    statuses: ['DISCOVERED', 'PENDING_APPROVAL'],
    color: 'border-amber-500/30 bg-amber-500/5',
    icon: <Clock className="w-4 h-4 text-amber-400" />
  },
  {
    id: 'approved',
    title: 'Autorizados por Alex',
    statuses: ['APPROVED'],
    color: 'border-emerald-500/30 bg-emerald-500/5',
    icon: <CheckCircle className="w-4 h-4 text-emerald-400" />
  },
  {
    id: 'contacted',
    title: 'Contactados (WA/IG)',
    statuses: ['WHATSAPP_SENT', 'EMAIL_SENT', 'IG_DM_SENT'],
    color: 'border-blue-500/30 bg-blue-500/5',
    icon: <MessageSquare className="w-4 h-4 text-blue-400" />
  },
  {
    id: 'replied',
    title: 'Respuesta / Negociación',
    statuses: ['REPLIED'],
    color: 'border-purple-500/30 bg-purple-500/5',
    icon: <Award className="w-4 h-4 text-purple-400" />
  },
  {
    id: 'meetings',
    title: 'Reunión Agendada',
    statuses: ['MEETING_BOOKED'],
    color: 'border-pink-500/30 bg-pink-500/5',
    icon: <Calendar className="w-4 h-4 text-pink-400" />
  },
  {
    id: 'won',
    title: 'Cerrado / Cliente Won',
    statuses: ['CLOSED_WON'],
    color: 'border-orange-500/30 bg-orange-500/10',
    icon: <DollarSign className="w-4 h-4 text-orange-400" />
  }
];

export const ScoutKanban: React.FC<ScoutKanbanProps> = ({ leads, onSelectLead, onApproveLead }) => {
  return (
    <div className="flex gap-5 overflow-x-auto pb-8 pt-2 custom-scrollbar">
      {COLUMNS.map(col => {
        const colLeads = leads.filter(l => col.statuses.includes(l.status));
        const colValue = colLeads.reduce((acc, l) => acc + (l.estimatedLostMarginMonthly || 0), 0);

        return (
          <div key={col.id} className={`flex flex-col bg-zinc-950/90 border rounded-2xl p-4 w-[340px] shrink-0 shadow-xl ${col.color}`}>
            {/* Cabecera de Columna */}
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
              <div className="flex items-center gap-2">
                {col.icon}
                <span className="text-xs font-bold text-white uppercase tracking-wider">{col.title}</span>
              </div>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-zinc-800 text-zinc-300">
                {colLeads.length}
              </span>
            </div>

            {/* Subtítulo Valor Fuga */}
            <div className="text-[11px] text-zinc-400 mb-3 flex justify-between">
              <span>Fuga Media:</span>
              <span className="font-semibold text-zinc-300">~{(colValue / 1000).toFixed(1)}k €/m</span>
            </div>

            {/* Tarjetas de Leads */}
            <div className="flex-1 space-y-2 overflow-y-auto max-h-[650px] pr-1">
              {colLeads.length === 0 ? (
                <div className="h-24 border border-dashed border-zinc-800/80 rounded-lg flex items-center justify-center text-xs text-zinc-600">
                  Sin leads
                </div>
              ) : (
                colLeads.map(lead => (
                  <div
                    key={lead.id}
                    onClick={() => onSelectLead(lead)}
                    className="bg-zinc-900/90 border border-zinc-800 hover:border-orange-500/50 rounded-xl p-3.5 cursor-pointer shadow-md group transition-all hover:-translate-y-0.5">
                    
                    <div className="flex items-start justify-between">
                      <span className="text-xs font-bold text-white group-hover:text-orange-400 transition line-clamp-1">
                        {lead.restaurantName}
                      </span>
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-orange-500/20 text-orange-400">
                        #{lead.priorityScore}
                      </span>
                    </div>

                    <div className="text-[11px] text-zinc-400 mt-1 flex items-center justify-between">
                      <span>📍 {lead.city}</span>
                      <span>⭐ {lead.googleRating}</span>
                    </div>

                    <div className="mt-2 pt-2 border-t border-zinc-800/60 flex items-center justify-between text-[11px]">
                      <span className="text-rose-400 font-semibold">
                        Fuga: ~{lead.estimatedLostMarginMonthly?.toLocaleString('es-ES')}€
                      </span>
                      <ChevronRight className="w-3.5 h-3.5 text-zinc-600 group-hover:text-white transition" />
                    </div>

                    {/* Botón rápido de autorización en columna Por Aprobar */}
                    {col.id === 'pending' && onApproveLead && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onApproveLead(lead.id!);
                        }}
                        className="w-full mt-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 rounded-lg py-1 text-[11px] font-bold transition flex items-center justify-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Autorizar Lead
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
