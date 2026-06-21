"use client";

import React, { useState, useEffect } from 'react';
import { supabaseClient } from '@/lib/supabase-client';
import { v4 as uuidv4 } from 'uuid';
import { Plus, X, Copy, CheckCircle2, Server, Zap, Users } from 'lucide-react';

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [invitations, setInvitations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    if (!supabaseClient) return;

    const [clientsRes, invitesRes] = await Promise.all([
      supabaseClient
        .from('profiles')
        .select('id, business_name, status, role, created_at, business_profiles(address, cuisine_type, average_ticket)')
        .eq('role', 'client')
        .order('created_at', { ascending: false }),
      supabaseClient
        .from('invitations')
        .select('*')
        .order('created_at', { ascending: false })
    ]);

    if (clientsRes.data) setClients(clientsRes.data);
    if (invitesRes.data) setInvitations(invitesRes.data);
    
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApprove = async (id: string) => {
    if (!supabaseClient) return;
    const { error } = await supabaseClient
      .from('profiles')
      .update({ status: 'active' })
      .eq('id', id);

    if (!error) {
      fetchData();
    } else {
      alert("Error: " + error.message);
    }
  };

  const handleGenerate = async (planType: 'base_pago_unico' | 'suscripcion') => {
    if (!supabaseClient) return;
    setGenerating(true);

    const token = uuidv4();
    const { data: { session } } = await supabaseClient.auth.getSession();

    const { error } = await supabaseClient
      .from('invitations')
      .insert({
        token,
        plan_type: planType,
        created_by: session?.user?.id
      });

    if (!error) {
      fetchData();
    } else {
      alert("Error al generar: " + error.message);
    }
    setGenerating(false);
  };

  const copyToClipboard = (token: string, id: string) => {
    const url = `${window.location.origin}/onboarding?token=${token}`;
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) return <div className="p-8 text-white flex items-center justify-center min-h-screen">Cargando ecosistema de clientes...</div>;

  return (
    <div className="p-4 md:p-6 lg:p-8 min-h-screen bg-[#050505] text-zinc-100 selection:bg-orange-500/30">
      <header className="mb-8 max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between md:items-end gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-white tracking-tighter flex items-center gap-2">
            <Server className="text-orange-500" size={24} /> Gestor de Ecosistemas
          </h1>
          <p className="text-zinc-500 text-xs md:text-sm font-medium mt-1 max-w-xl">Control integral de clientes activos y auditoría de despliegues.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black text-[10px] md:text-xs py-2 md:py-2.5 px-4 md:px-5 rounded-lg transition-all shadow-none flex items-center gap-2 justify-center"
        >
          <Plus size={14} /> Generar Acceso
        </button>
      </header>

      {/* MODAL GENERADOR DE TOKENS */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-2xl p-4">
          <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] w-full max-w-5xl max-h-[90vh] overflow-y-auto relative shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-8 right-8 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full flex items-center justify-center text-zinc-400 hover:text-white transition-all z-20"
            >
              <X size={24} />
            </button>
            
            <div className="p-8 md:p-12 lg:p-16">
              <div className="mb-12">
                <h2 className="text-3xl font-black text-white tracking-tighter flex items-center gap-3">
                  <Zap className="text-orange-500" /> Generar Acceso Seguro
                </h2>
                <p className="text-zinc-500 text-sm mt-2 max-w-lg">Selecciona el plan para crear un token encriptado de onboarding privado. Este link será de un solo uso.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-white/10 transition-all rounded-[2rem] p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-white/10 transition-colors pointer-events-none"></div>
                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mb-6 text-white">
                    <Server size={24} />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">Plan Base</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-6 bg-white/5 inline-block px-3 py-1 rounded-md">Pago Único</div>
                  <p className="text-sm text-zinc-400 mb-8 leading-relaxed font-medium">1 Evento activo, Personalización total por código, Autogestión completa del ecosistema.</p>
                  <button 
                    onClick={() => handleGenerate('base_pago_unico')}
                    disabled={generating}
                    className="w-full bg-white hover:bg-zinc-200 text-black font-black text-xs py-4 rounded-xl transition-all disabled:opacity-50 relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] flex justify-center items-center gap-2"
                  >
                    <Plus size={16} /> Crear Instancia Base
                  </button>
                </div>

                <div className="bg-gradient-to-b from-orange-500/10 to-transparent border border-orange-500/20 hover:border-orange-500/40 transition-all rounded-[2rem] p-8 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-orange-500/30 transition-colors pointer-events-none"></div>
                  <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center mb-6 text-orange-500">
                    <Zap size={24} />
                  </div>
                  <h3 className="text-xl font-black text-orange-500 mb-2">Plan Suscripción</h3>
                  <div className="text-[10px] font-black uppercase tracking-widest text-orange-500 mb-6 bg-orange-500/10 border border-orange-500/20 inline-block px-3 py-1 rounded-md">Recurring</div>
                  <p className="text-sm text-orange-200/60 mb-8 leading-relaxed font-medium">Múltiples Eventos, Interfaz por plantillas dinámicas, Autogestión limitante por capa.</p>
                  <button 
                    onClick={() => handleGenerate('suscripcion')}
                    disabled={generating}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black text-xs py-4 rounded-xl transition-all disabled:opacity-50 relative z-10 shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.4)] flex justify-center items-center gap-2"
                  >
                    <Plus size={16} /> Crear Instancia Pro
                  </button>
                </div>
              </div>

              {invitations.length > 0 && (
                <div className="bg-black/40 border border-white/5 rounded-[2rem] p-6 md:p-8">
                  <h4 className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-6">Tokens Criptográficos Recientes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {invitations.filter(i => !i.used).map(inv => (
                      <div key={inv.id} className="bg-zinc-900/50 backdrop-blur-md border border-white/5 hover:border-white/10 transition-colors rounded-2xl p-5 flex flex-col justify-between group">
                        <div className="flex justify-between items-start mb-6">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg border ${inv.plan_type === 'suscripcion' ? 'bg-orange-500/10 border-orange-500/20 text-orange-400' : 'bg-white/5 border-white/10 text-zinc-300'}`}>
                            {inv.plan_type === 'suscripcion' ? 'Suscripción' : 'Base'}
                          </span>
                          <span className="text-xs text-zinc-600 font-mono font-medium">...{inv.token.slice(-8)}</span>
                        </div>
                        <button 
                          onClick={() => copyToClipboard(inv.token, inv.id)}
                          className={`w-full text-center text-xs font-black py-3 rounded-xl transition-all border flex items-center justify-center gap-2 ${copiedId === inv.id ? 'bg-green-500/20 text-green-400 border-green-500/30' : 'bg-white/5 text-white border-white/5 hover:bg-white/10'}`}
                        >
                          {copiedId === inv.id ? <><CheckCircle2 size={14}/> Copiado</> : <><Copy size={14}/> Copiar Link</>}
                        </button>
                      </div>
                    ))}
                    {invitations.filter(i => !i.used).length === 0 && (
                      <p className="text-sm text-zinc-600 p-2 col-span-full">No hay tokens activos pendientes de uso.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* LISTADO DE CLIENTES */}
      <section className="max-w-[1600px] mx-auto mt-8">
        <h2 className="text-xl font-black text-white mb-6 tracking-tight flex items-center gap-3">
          <Users className="text-zinc-500" /> Nodos Desplegados
        </h2>
        <div className="bg-zinc-950/50 border border-white/10 backdrop-blur-xl rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-zinc-500 uppercase text-[10px] font-black tracking-widest border-b border-white/5">
                  <th className="pb-4 px-4">Identificador de Nodo</th>
                  <th className="pb-4 px-4">Timestamp Alta</th>
                  <th className="pb-4 px-4">Status de Despliegue</th>
                  <th className="pb-4 px-4">Intervención</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((c) => (
                  <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors group">
                    <td className="py-5 px-4">
                      <div className="font-black text-white text-base tracking-tight">{c.business_name}</div>
                      <div className="text-xs text-zinc-500 font-medium mt-1">{c.business_profiles?.[0]?.cuisine_type || 'Esperando propagación de datos'}</div>
                    </td>
                    <td className="py-5 px-4 text-sm font-medium text-zinc-400">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-5 px-4">
                      {c.status === 'pending_approval' ? (
                        <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse"></span> En Revisión
                        </span>
                      ) : (
                        <span className="bg-green-500/10 text-green-400 border border-green-500/20 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg flex items-center gap-1.5 w-max">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span> Operativo
                        </span>
                      )}
                    </td>
                    <td className="py-5 px-4">
                      {c.status === 'pending_approval' && (
                        <button 
                          onClick={() => handleApprove(c.id)}
                          className="bg-white hover:bg-zinc-200 text-black font-black text-xs py-2 px-5 rounded-xl transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center gap-2"
                        >
                          <CheckCircle2 size={14}/> Autorizar
                        </button>
                      )}
                      {c.status === 'active' && (
                        <button className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors flex items-center gap-1">
                          Terminal <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                {clients.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-12 text-center text-zinc-500 text-sm font-medium bg-white/5 rounded-2xl border border-white/5 mt-4">
                      No hay nodos desplegados en la red todavía. Inicia generando un token criptográfico.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
