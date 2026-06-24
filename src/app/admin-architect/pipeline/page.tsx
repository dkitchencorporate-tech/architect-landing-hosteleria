'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Users, PhoneCall, CheckCircle, Search, Plus, ArrowRight, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PipelineDealsPage() {
  const [leads, setLeads] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, met, closed
  const supabase = createClient();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    // Si la tabla no existe aún, evitamos que crashee la página atrapando el error.
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data) {
        setLeads(data);
      } else {
        // Mock data temporal si la tabla está vacía o no ha sido creada en DB
        setLeads([
          { id: '1', name: 'Carlos Martín', restaurant_name: 'La Parrilla de San Telmo', status: 'meeting_booked', created_at: new Date().toISOString() },
          { id: '2', name: 'Laura Gómez', restaurant_name: 'Bistro 44', status: 'met', created_at: new Date().toISOString() }
        ]);
      }
    } catch (e) {
      console.log('Tabla leads no encontrada o vacía');
    }
  };

  const filteredLeads = leads.filter(lead => {
    const matchSearch = (lead.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) || 
                        (lead.restaurant_name?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchSearch;
    if (filter === 'pending') return matchSearch && ['new', 'meeting_booked'].includes(lead.status);
    if (filter === 'met') return matchSearch && lead.status === 'met';
    if (filter === 'closed') return matchSearch && lead.status === 'closed';
    return matchSearch;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto h-full flex flex-col">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Deal Management</h1>
          <p className="text-zinc-400">Desde el contacto inicial hasta el despacho de contratos automáticos.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl font-bold transition-colors flex items-center gap-2">
            <Plus size={18} />
            Nuevo Lead Manual
          </button>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-zinc-900 border border-white/5 rounded-2xl p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto custom-scrollbar pb-2 md:pb-0">
          <button 
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-orange-500 text-black' : 'bg-black/50 text-zinc-400 hover:text-white'}`}
          >
            Todos
          </button>
          <button 
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-colors ${filter === 'pending' ? 'bg-orange-500 text-black' : 'bg-black/50 text-zinc-400 hover:text-white'}`}
          >
            <PhoneCall size={14} className="inline mr-2" /> Reunión Pendiente
          </button>
          <button 
            onClick={() => setFilter('met')}
            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-colors ${filter === 'met' ? 'bg-orange-500 text-black' : 'bg-black/50 text-zinc-400 hover:text-white'}`}
          >
            <Users size={14} className="inline mr-2" /> Reunión Realizada
          </button>
          <button 
            onClick={() => setFilter('closed')}
            className={`px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap transition-colors ${filter === 'closed' ? 'bg-orange-500 text-black' : 'bg-black/50 text-zinc-400 hover:text-white'}`}
          >
            <CheckCircle size={14} className="inline mr-2" /> Cerrados
          </button>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar lead o local..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
          />
        </div>
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLeads.map((lead, i) => (
          <div key={i} className="bg-zinc-900 border border-white/5 rounded-2xl p-5 hover:border-orange-500/30 transition-all group flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md mb-2 inline-block
                  ${['new', 'meeting_booked'].includes(lead.status) ? 'bg-blue-500/10 text-blue-400' : 
                    lead.status === 'met' ? 'bg-orange-500/10 text-orange-400' : 
                    lead.status === 'closed' ? 'bg-green-500/10 text-green-400' : 
                    'bg-zinc-500/10 text-zinc-400'}`}
                >
                  {lead.status === 'new' ? 'Nuevo' : 
                   lead.status === 'meeting_booked' ? 'Reunión Agendada' :
                   lead.status === 'met' ? 'Reunión Realizada' :
                   lead.status === 'closed' ? 'Cliente (Cerrado)' : 'Perdido'}
                </span>
                <h3 className="text-lg font-bold text-white">{lead.restaurant_name || 'Sin Restaurante'}</h3>
                <p className="text-zinc-500 text-sm">{lead.name}</p>
              </div>
            </div>

            <div className="mt-auto pt-6">
              {lead.status === 'met' || lead.status === 'meeting_booked' ? (
                <Link href={`/admin-architect/pipeline/${lead.id}/setup`} className="w-full bg-orange-500 hover:bg-orange-400 text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  Configurar Deal & Enviar Contrato <ArrowRight size={16} />
                </Link>
              ) : lead.status === 'closed' ? (
                <div className="w-full bg-green-500/10 text-green-400 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2">
                  <CheckCircle size={16} /> Acuerdo Firmado & Pagado
                </div>
              ) : (
                <button className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
                  Ver Detalles
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {filteredLeads.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-zinc-500 mt-12">
          <XCircle size={48} className="mb-4 opacity-50" />
          <p className="text-lg">No se encontraron leads con estos filtros.</p>
        </div>
      )}
    </div>
  );
}
