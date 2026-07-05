import React, { useState } from 'react';
import { Lead } from '@/prospecting-engine/types';
import { Search, Filter, ExternalLink, MessageSquare, CheckCircle, AlertTriangle } from 'lucide-react';

interface ScoutTableProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onApproveLead?: (leadId: string) => Promise<void>;
}

export const ScoutTable: React.FC<ScoutTableProps> = ({ leads, onSelectLead, onApproveLead }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const cities = Array.from(new Set(leads.map(l => l.city)));

  const filteredLeads = leads.filter(l => {
    const matchesSearch = l.restaurantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          l.phone.includes(searchTerm) ||
                          (l.instagramHandle && l.instagramHandle.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCity = cityFilter === 'ALL' || l.city === cityFilter;
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    return matchesSearch && matchesCity && matchesStatus;
  });

  return (
    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Barra de Filtros */}
      <div className="p-4 border-b border-zinc-800 flex flex-col md:flex-row gap-4 items-center justify-between bg-zinc-950/50">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por restaurante, teléfono o IG..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={cityFilter}
            onChange={(e) => setCityFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-orange-500">
            <option value="ALL">Todas las Ciudades ({cities.length})</option>
            {cities.map(c => <option key={c} value={c}>{c}</option>)}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-zinc-300 focus:outline-none focus:border-orange-500">
            <option value="ALL">Todos los Estados</option>
            <option value="PENDING_APPROVAL">Por Aprobar</option>
            <option value="APPROVED">Autorizados por Alex</option>
            <option value="WHATSAPP_SENT">WhatsApp Enviado</option>
            <option value="EMAIL_SENT">Email Enviado</option>
            <option value="REPLIED">Respondió</option>
            <option value="MEETING_BOOKED">Reunión Agendada</option>
            <option value="CLOSED_WON">Cerrado Won</option>
          </select>
        </div>
      </div>

      {/* Tabla de Alta Densidad (Estilo Clay.com / Airtable) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-950/80 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
              <th className="py-3 px-4">Score</th>
              <th className="py-3 px-4">Restaurante</th>
              <th className="py-3 px-4">Ciudad</th>
              <th className="py-3 px-4">Modelo</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Carta PDF</th>
              <th className="py-3 px-4">El Tenedor</th>
              <th className="py-3 px-4">Fuga Margen</th>
              <th className="py-3 px-4">Estado CRM</th>
              <th className="py-3 px-4 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/60 text-xs">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={10} className="py-8 text-center text-zinc-500">
                  No se encontraron restaurantes con esos filtros.
                </td>
              </tr>
            ) : (
              filteredLeads.map(lead => (
                <tr
                  key={lead.id}
                  onClick={() => onSelectLead(lead)}
                  className="hover:bg-zinc-800/50 cursor-pointer transition group">
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-500/20 text-orange-400 font-mono">
                      #{lead.priorityScore}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-white group-hover:text-orange-400 transition">
                    <div className="flex items-center gap-2">
                      <span>{lead.restaurantName}</span>
                      {lead.websiteUrl && (
                        <a href={lead.websiteUrl} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} className="text-zinc-500 hover:text-white">
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                    <span className="text-[10px] text-zinc-500 font-mono block">{lead.phone}</span>
                  </td>
                  <td className="py-3 px-4 text-zinc-300">{lead.city}</td>
                  <td className="py-3 px-4 text-zinc-400">{lead.businessModel}</td>
                  <td className="py-3 px-4 font-semibold text-amber-400">
                    {lead.googleRating}⭐ <span className="text-[10px] text-zinc-500">({lead.reviewCount})</span>
                  </td>
                  <td className="py-3 px-4">
                    {lead.hasPdfMenu ? (
                      <span className="text-rose-400 font-semibold flex items-center gap-1">❌ Sí (-40%)</span>
                    ) : (
                      <span className="text-emerald-400">✔️ Digital</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    {lead.usesElTenedor ? (
                      <span className="text-rose-400 font-semibold flex items-center gap-1">❌ Sí (12-15%)</span>
                    ) : (
                      <span className="text-emerald-400">✔️ Directo</span>
                    )}
                  </td>
                  <td className="py-3 px-4 font-black text-rose-400 font-mono">
                    ~{lead.estimatedLostMarginMonthly?.toLocaleString('es-ES')} €
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-zinc-800 text-zinc-300">
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right" onClick={e => e.stopPropagation()}>
                    {lead.status === 'PENDING_APPROVAL' && onApproveLead ? (
                      <button
                        onClick={() => onApproveLead(lead.id!)}
                        className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 rounded-lg px-2.5 py-1 text-[11px] font-bold transition">
                        Autorizar
                      </button>
                    ) : (
                      <button
                        onClick={() => onSelectLead(lead)}
                        className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg px-2.5 py-1 text-[11px] font-semibold transition">
                        Ver Radiografía
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
