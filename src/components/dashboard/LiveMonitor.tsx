'use client';

import React, { useEffect, useState } from 'react';
import { supabaseClient } from '@/lib/supabase-client';

export default function LiveMonitor() {
  const [chats, setChats] = useState<any[]>([]);
  const [botSettings, setBotSettings] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean, phone: string | null } | null>(null);

  const toggleBot = async (phone: string, currentState: boolean) => {
    if (!supabaseClient) return;
    const newState = !currentState;
    setBotSettings(prev => ({ ...prev, [phone]: newState }));
    await supabaseClient.from('bot_settings').upsert({ phone, enabled: newState });
  };

  const archiveChat = async (phone: string) => {
    if (!supabaseClient) return;
    const { error } = await supabaseClient
      .from('chats')
      .update({ status: 'archived' })
      .eq('phone', phone);
    
    if (!error) {
      setChats(prev => prev.filter(c => c.phone !== phone));
      if (selectedChat === phone) setSelectedChat(null);
      setConfirmDelete(null);
    } else {
      setErrorMsg(`Error al archivar: ${error.message}`);
    }
  };

  const deletePermanently = async (phone: string) => {
    if (!supabaseClient) return;
    const { error } = await supabaseClient
      .from('chats')
      .delete()
      .eq('phone', phone);
    
    if (!error) {
      setChats(prev => prev.filter(c => c.phone !== phone));
      if (selectedChat === phone) setSelectedChat(null);
      setConfirmDelete(null);
    } else {
      setErrorMsg(`Error al eliminar: ${error.message}`);
    }
  };

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        if (!supabaseClient) {
          setErrorMsg("Error: Cliente de Supabase no inicializado.");
          return;
        }

        // Intento 1: Con filtro de status (Ideal)
        let { data: chatData, error: chatError } = await supabaseClient
          .from('chats')
          .select('*')
          .or('status.eq.active,status.is.null')
          .order('created_at', { ascending: false });
        
        // Si el error es que la columna no existe (code 42703), reintentamos sin el filtro
        if (chatError && chatError.code === '42703') {
          console.warn('[LiveMonitor] Columna "status" no detectada. Cargando modo compatibilidad...');
          const fallback = await supabaseClient
            .from('chats')
            .select('*')
            .order('created_at', { ascending: false });
          chatData = fallback.data;
          chatError = fallback.error;
        }

        if (chatError) throw chatError;

        const { data: settingsData, error: settingsError } = await supabaseClient.from('bot_settings').select('*');
        if (settingsError) throw settingsError;

        if (mounted && chatData) {
          setChats(chatData);
          setBotSettings(settingsData?.reduce((acc: any, s: any) => ({ ...acc, [s.phone]: s.enabled }), {}) || {});
          setLoading(false);
          setErrorMsg(null);
        }
      } catch (err: any) {
        console.error('[LiveMonitor] Error crítico:', err);
        setErrorMsg(`Fallo de Sincronización: ${err.message || 'Error desconocido'}`);
        setLoading(false);
      }
    };

    fetchData();
    const channel = supabaseClient?.channel('live-monitor-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'chats' }, () => fetchData())
      .subscribe();

    return () => { mounted = false; if (channel) supabaseClient.removeChannel(channel); };
  }, []);

  if (errorMsg) return (
    <div className="p-8 bg-red-50 border border-red-100 rounded-[2rem] text-center">
      <p className="text-red-600 font-black uppercase text-xs mb-2">Protocolo de Error Activado</p>
      <p className="text-red-400 text-sm italic">"{errorMsg}"</p>
      <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-bold uppercase shadow-lg shadow-red-600/20">Reintentar Conexión</button>
    </div>
  );

  if (loading) return <div className="p-20 text-center text-zinc-400 font-extrabold uppercase text-[12px] animate-pulse tracking-[0.2em] bg-white border border-zinc-100 rounded-[3rem]">Sincronizando Torre de Control Master...</div>;

  const leadsObj = chats.reduce((acc: any, chat: any) => {
    if (!acc[chat.phone]) acc[chat.phone] = [];
    acc[chat.phone].push(chat);
    return acc;
  }, {});

  const phones = Object.keys(leadsObj);
  const activeChatData = selectedChat ? leadsObj[selectedChat] : null;

  return (
    <div className="p-4 bg-zinc-50/50 rounded-[2.5rem]">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {phones.map(phone => {
          const conversation = leadsObj[phone];
          const lastMsg = conversation[0];
          const isEnabled = botSettings[phone] !== false;

          return (
            <div key={phone} className="group relative bg-white border border-zinc-100 p-4 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-orange-500/10 transition-all cursor-pointer overflow-hidden border-b-4 border-b-zinc-200 hover:border-b-orange-500" onClick={() => setSelectedChat(phone)}>
              {/* ACCIÓN: ABRIR MODAL DE DECISIÓN */}
              <button 
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setConfirmDelete({ show: true, phone });
                }} 
                className="absolute -top-1 -right-1 w-6 h-6 bg-zinc-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:bg-zinc-200 hover:text-orange-600 z-10 text-xs font-bold shadow-sm"
              >
                ×
              </button>
              
              <div className="mb-2">
                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-tighter truncate">{phone}</p>
                <div className="flex gap-1 mt-1">
                  <span className={`w-2 h-2 rounded-full ${lastMsg.intent === 'venta' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
                  <span className="text-[8px] font-bold uppercase text-zinc-500">{lastMsg.topic || 'Chat'}</span>
                </div>
              </div>
              <p className="text-[10px] text-zinc-400 line-clamp-2 italic leading-tight">"{lastMsg.content}"</p>
            </div>
          );
        })}
      </div>

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN/ARCHIVADO */}
      {confirmDelete?.show && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-zinc-900/80 backdrop-blur-sm" onClick={() => setConfirmDelete(null)}></div>
          <div className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h3 className="text-xl font-black text-zinc-900 tracking-tight">Gestión de Conversación</h3>
              <p className="text-zinc-500 text-xs mt-2 font-medium">¿Qué deseas hacer con el registro de <br/><span className="font-bold text-zinc-800">{confirmDelete.phone}</span>?</p>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => archiveChat(confirmDelete.phone!)}
                className="w-full bg-zinc-900 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all"
              >
                Archivar (Seguro / Recuperable)
              </button>
              
              <button 
                onClick={() => deletePermanently(confirmDelete.phone!)}
                className="w-full bg-transparent text-red-600 font-black py-4 rounded-xl text-[10px] uppercase tracking-widest border border-red-100 hover:bg-red-50 transition-all text-center"
              >
                Eliminar Permanentemente (100%)
              </button>
              
              <button 
                onClick={() => setConfirmDelete(null)}
                className="w-full text-zinc-400 font-bold py-2 text-[10px] uppercase tracking-widest hover:text-zinc-600 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE AUDITORÍA PROFUNDA */}
      {selectedChat && activeChatData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12">
          <div className="absolute inset-0 bg-zinc-900/60 backdrop-blur-md" onClick={() => setSelectedChat(null)}></div>
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FDFCF8] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header Modal */}
            <div className="p-8 border-b border-zinc-100 flex justify-between items-center bg-white">
              <div>
                <h3 className="text-2xl font-black tracking-tighter">{selectedChat}</h3>
                <div className="flex gap-2 mt-1">
                  <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-200">
                    {activeChatData[0].intent}
                  </span>
                  <span className="bg-zinc-100 text-zinc-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-zinc-200">
                    {activeChatData[0].topic || 'Analizando'}
                  </span>
                  <span className="bg-blue-50 text-blue-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                    {activeChatData[0].closing_stage || 'Atención'}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center">
                <button onClick={() => toggleBot(selectedChat, botSettings[selectedChat] !== false)} className={`px-4 py-2 rounded-xl text-xs font-black uppercase transition-all ${botSettings[selectedChat] !== false ? 'bg-zinc-100 text-zinc-400 font-bold' : 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'}`}>
                  {botSettings[selectedChat] !== false ? 'Bot Activo' : 'Bot Pausado'}
                </button>
                <button onClick={() => setSelectedChat(null)} className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-xl hover:bg-zinc-200 transition-all font-bold">×</button>
              </div>
            </div>

            {/* Mindset de la IA */}
            {activeChatData.find((m: any) => m.role === 'assistant')?.strategic_note && (
              <div className="px-8 py-4 bg-orange-50/50 border-b border-orange-100">
                <p className="text-xs text-orange-600 font-bold leading-relaxed italic">
                  <span className="uppercase opacity-50 mr-2 non-italic">Mindset AI:</span>
                  "{activeChatData.find((m: any) => m.role === 'assistant')?.strategic_note}"
                </p>
              </div>
            )}

            {/* Historial */}
            <div className="flex-1 overflow-y-auto p-10 space-y-6 flex flex-col-reverse bg-white/40">
              {activeChatData.map((msg: any) => (
                <div key={msg.id} className={`p-6 rounded-[2rem] max-w-[80%] text-sm leading-relaxed shadow-sm transition-all ${msg.role === 'assistant' ? 'bg-white text-zinc-600 self-start border border-zinc-100 shadow-md' : 'bg-zinc-900 text-white self-end shadow-xl'}`}>
                  <p>{msg.content}</p>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-white border-t border-zinc-100 text-center">
               <span className="text-[10px] font-black text-zinc-300 tracking-widest uppercase italic">Fin de la auditoría de conversación • Architect.Sys Master</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
