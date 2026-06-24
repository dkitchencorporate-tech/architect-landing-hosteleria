"use client";

import React, { useState, useEffect } from "react";
import { supabaseClient } from "@/lib/supabase-client";
import { Plus, Edit2, CheckCircle, Clock, Search, AlertCircle, RefreshCw } from "lucide-react";
import { useAlert } from "@/components/ui/AlertProvider";

export default function EventsMasterPage() {
  const [activeTab, setActiveTab] = useState<'catalog' | 'requests'>('catalog');
  const [events, setEvents] = useState<any[]>([]);
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert();

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'catalog') {
        const { data, error } = await supabaseClient.from('master_events').select('*').order('created_at', { ascending: true });
        if (error) throw error;
        setEvents(data || []);
      } else {
        const { data, error } = await supabaseClient.from('client_events')
          .select(`
            *,
            profiles(restaurant_name, email),
            master_events(title)
          `)
          .order('created_at', { ascending: false });
        if (error) throw error;
        setRequests(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateRequestStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabaseClient.from('client_events').update({ status: newStatus }).eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      console.error(err);
      showAlert("Error al actualizar estado");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2">Events Master Console</h1>
          <p className="text-zinc-400 font-medium">Gestión global del catálogo y control de despliegues (Silver Premium V3)</p>
        </div>
        <div className="flex bg-zinc-900 border border-white/10 rounded-xl p-1">
          <button 
            onClick={() => setActiveTab('catalog')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'catalog' ? 'bg-orange-500 text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}
          >
            Catálogo Base
          </button>
          <button 
            onClick={() => setActiveTab('requests')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'requests' ? 'bg-orange-500 text-white shadow-lg' : 'text-zinc-400 hover:text-white'}`}
          >
            Peticiones Activas
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
      ) : activeTab === 'catalog' ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center bg-zinc-900/50 p-6 rounded-2xl border border-white/5 gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0" />
              <p className="text-sm text-zinc-300">Cualquier cambio en los dossiers se reflejará instantáneamente en todos los clientes.</p>
            </div>
            <button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors">
              <Plus className="w-4 h-4" /> Nuevo Evento
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((ev) => (
              <div key={ev.id} className="bg-zinc-900/40 border border-white/10 rounded-2xl p-6 hover:border-orange-500/30 transition-all flex flex-col h-full group">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-bold text-orange-500 uppercase tracking-wider bg-orange-500/10 px-3 py-1 rounded-full">{ev.category}</span>
                  {ev.is_unlocked_for_base ? (
                    <span className="text-[10px] font-bold text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded">PLAN BASE</span>
                  ) : (
                    <span className="text-[10px] font-bold text-orange-400 bg-orange-500/10 border border-orange-500/20 px-2 py-1 rounded">SOLO GROWTH</span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{ev.title}</h3>
                <p className="text-sm text-zinc-400 line-clamp-2 mb-6 flex-1">{ev.description}</p>
                <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-xs text-zinc-500">ID: {ev.id}</span>
                  <button className="text-orange-500 hover:text-white p-2 bg-orange-500/10 rounded-lg transition-colors group-hover:bg-orange-500 group-hover:text-white">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {events.length === 0 && (
              <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl bg-zinc-900/20">
                <p className="text-zinc-500">No hay eventos. Ejecuta la migración SQL para poblar el catálogo.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-zinc-900/40 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-zinc-900/80 border-b border-white/10">
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Restaurante</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Evento Solicitado</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Fecha de Solicitud</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider">Estado</th>
                  <th className="p-4 text-xs font-bold text-zinc-400 uppercase tracking-wider text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <p className="text-sm font-bold text-white">{req.profiles?.restaurant_name || 'Desconocido'}</p>
                      <p className="text-xs text-zinc-500">{req.profiles?.email}</p>
                    </td>
                    <td className="p-4 text-sm text-zinc-300 font-medium">{req.master_events?.title || req.event_id}</td>
                    <td className="p-4 text-sm text-zinc-500">{new Date(req.created_at).toLocaleDateString()}</td>
                    <td className="p-4">
                      {req.status === 'requested' && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-500 border border-orange-500/20"><Clock className="w-3 h-3" /> Solicitado</span>}
                      {req.status === 'in_progress' && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20"><RefreshCw className="w-3 h-3 animate-spin" /> En Curso</span>}
                      {req.status === 'delivered' && <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-400 border border-green-500/20"><CheckCircle className="w-3 h-3" /> Entregado</span>}
                    </td>
                    <td className="p-4 text-right space-x-2">
                      {req.status === 'requested' && (
                        <button onClick={() => updateRequestStatus(req.id, 'in_progress')} className="text-xs bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white px-3 py-1.5 rounded transition-colors">Empezar</button>
                      )}
                      {req.status === 'in_progress' && (
                        <button onClick={() => updateRequestStatus(req.id, 'delivered')} className="text-xs bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white px-3 py-1.5 rounded transition-colors">Marcar Entregado</button>
                      )}
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-zinc-500 border-t border-dashed border-white/5">
                      No hay peticiones de eventos pendientes por parte de los clientes.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
