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
          setErrorMsg(&quot;Error: Cliente de Supabase no inicializado.&quot;);
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
          console.warn('[LiveMonitor] Columna &quot;status&quot; no detectada. Cargando modo compatibilidad...');
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
    <div className=&quot;p-8 bg-red-50 border border-red-100 rounded-[2rem] text-center&quot;>
      <p className=&quot;text-red-600 font-black uppercase text-xs mb-2&quot;>Protocolo de Error Activado</p>
      <p className=&quot;text-red-400 text-sm italic&quot;>&quot;{errorMsg}&quot;</p>
      <button onClick={() => window.location.reload()} className=&quot;mt-4 px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-bold uppercase shadow-lg shadow-red-600/20&quot;>Reintentar Conexión</button>
    </div>
  );

  if (loading) return <div className=&quot;p-20 text-center text-zinc-400 font-extrabold uppercase text-[12px] animate-pulse tracking-[0.2em] bg-white border border-zinc-100 rounded-[3rem]&quot;>Sincronizando Torre de Control Master...</div>;

  const leadsObj = chats.reduce((acc: any, chat: any) => {
    if (!acc[chat.phone]) acc[chat.phone] = [];
    acc[chat.phone].push(chat);
    return acc;
  }, {});

  const phones = Object.keys(leadsObj);
  const activeChatData = selectedChat ? leadsObj[selectedChat] : null;

  return (
    <div className=&quot;p-4 bg-zinc-50/50 rounded-[2.5rem] h-[500px] overflow-y-auto custom-scrollbar&quot;>
      <div className=&quot;flex flex-col gap-2 pr-2&quot;>
        {phones.map(phone => {
          const conversation = leadsObj[phone];
          const lastMsg = conversation[0];
          const isEnabled = botSettings[phone] !== false;

          return (
            <div key={phone} 
                 className=&quot;group relative bg-white border border-zinc-100 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer flex items-center justify-between&quot;
                 onClick={() => setSelectedChat(phone)}>
              
              {/* Información Principal */}
              <div className=&quot;flex items-center gap-4 overflow-hidden flex-1&quot;>
                {/* Avatar / Icono */}
                <div className=&quot;w-10 h-10 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center shrink-0 font-bold text-lg&quot;>
                  👤
                </div>
                
                {/* Textos */}
                <div className=&quot;flex-1 min-w-0&quot;>
                  <div className=&quot;flex items-center gap-2 mb-1&quot;>
                    <p className=&quot;text-xs font-black text-zinc-900 truncate&quot;>Sesión: {phone.substring(0,8)}...</p>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${lastMsg.intent === 'venta' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                      {lastMsg.intent}
                    </span>
                    {lastMsg.topic && (
                      <span className=&quot;px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-500 hidden md:inline-block&quot;>
                        {lastMsg.topic}
                      </span>
                    )}
                  </div>
                  <p className=&quot;text-xs text-zinc-500 truncate italic&quot;>&quot;{lastMsg.content}&quot;</p>
                </div>
              </div>

              {/* Botón Borrar / Archivar */}
              <div className=&quot;shrink-0 ml-4 opacity-0 group-hover:opacity-100 transition-opacity&quot;>
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setConfirmDelete({ show: true, phone });
                  }} 
                  className=&quot;w-8 h-8 bg-zinc-50 rounded-full flex items-center justify-center hover:bg-red-50 hover:text-red-500 text-zinc-400 transition-all font-bold&quot;
                  title=&quot;Gestionar&quot;
                >
                  ×
                </button>
              </div>

            </div>
          );
        })}

        {phones.length === 0 && (
          <div className=&quot;flex flex-col items-center justify-center h-48 text-zinc-400&quot;>
            <div className=&quot;text-4xl mb-2&quot;>🤖</div>
            <p className=&quot;font-bold&quot;>El agente está a la espera...</p>
            <p className=&quot;text-xs&quot;>No hay conversaciones activas.</p>
          </div>
        )}
      </div>

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN/ARCHIVADO */}
      {confirmDelete?.show && (
        <div className=&quot;fixed inset-0 z-[200] flex items-center justify-center p-4&quot;>
          <div className=&quot;absolute inset-0 bg-zinc-900/80 backdrop-blur-sm&quot; onClick={() => setConfirmDelete(null)}></div>
          <div className=&quot;relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl p-8 animate-in fade-in zoom-in duration-200&quot;>
            <div className=&quot;text-center mb-6&quot;>
              <div className=&quot;w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-4&quot;>
                <span className=&quot;text-2xl&quot;>⚠️</span>
              </div>
              <h3 className=&quot;text-xl font-black text-zinc-900 tracking-tight&quot;>Gestión de Sesión</h3>
              <p className=&quot;text-zinc-500 text-xs mt-2 font-medium&quot;>¿Qué deseas hacer con el registro de <br/><span className=&quot;font-bold text-zinc-800&quot;>{confirmDelete.phone}</span>?</p>
            </div>
            
            <div className=&quot;space-y-3&quot;>
              <button 
                onClick={() => archiveChat(confirmDelete.phone!)}
                className=&quot;w-full bg-zinc-900 text-white font-black py-4 rounded-xl text-[10px] uppercase tracking-widest hover:bg-zinc-800 transition-all&quot;
              >
                Archivar (Recuperable)
              </button>
              
              <button 
                onClick={() => deletePermanently(confirmDelete.phone!)}
                className=&quot;w-full bg-transparent text-red-600 font-black py-4 rounded-xl text-[10px] uppercase tracking-widest border border-red-100 hover:bg-red-50 transition-all text-center&quot;
              >
                Eliminar Permanentemente
              </button>
              
              <button 
                onClick={() => setConfirmDelete(null)}
                className=&quot;w-full text-zinc-400 font-bold py-2 text-[10px] uppercase tracking-widest hover:text-zinc-600 transition-all&quot;
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE AUDITORÍA PROFUNDA */}
      {selectedChat && activeChatData && (
        <div className=&quot;fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12&quot;>
          <div className=&quot;absolute inset-0 bg-zinc-900/60 backdrop-blur-md&quot; onClick={() => setSelectedChat(null)}></div>
          <div className=&quot;relative w-full max-w-4xl max-h-[90vh] bg-[#FDFCF8] rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300&quot;>
            {/* Header Modal */}
            <div className=&quot;p-8 border-b border-zinc-100 flex flex-col md:flex-row justify-between items-start md:items-center bg-white gap-4&quot;>
              <div>
                <h3 className=&quot;text-xl font-black tracking-tighter text-zinc-900&quot;>Sesión: {selectedChat}</h3>
                <div className=&quot;flex gap-2 mt-2 flex-wrap&quot;>
                  <span className=&quot;bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-orange-200&quot;>
                    {activeChatData[0].intent}
                  </span>
                  <span className=&quot;bg-zinc-100 text-zinc-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-zinc-200&quot;>
                    {activeChatData[0].topic || 'Analizando'}
                  </span>
                  <span className=&quot;bg-blue-50 text-blue-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100&quot;>
                    {activeChatData[0].closing_stage || 'Atención'}
                  </span>
                </div>
              </div>
              <div className=&quot;flex gap-3 items-center w-full md:w-auto justify-end&quot;>
                <button onClick={() => toggleBot(selectedChat, botSettings[selectedChat] !== false)} className={`px-4 py-2 rounded-xl text-[10px] tracking-wider font-black uppercase transition-all ${botSettings[selectedChat] !== false ? 'bg-zinc-100 text-zinc-400 hover:bg-zinc-200' : 'bg-orange-600 text-white shadow-lg shadow-orange-600/20'}`}>
                  {botSettings[selectedChat] !== false ? 'Agente Activo' : 'Agente Pausado'}
                </button>
                <button onClick={() => setSelectedChat(null)} className=&quot;w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-xl hover:bg-zinc-200 transition-all font-bold&quot;>×</button>
              </div>
            </div>

            {/* Mindset de la IA */}
            {activeChatData.find((m: any) => m.role === 'assistant')?.strategic_note && (
              <div className=&quot;px-8 py-4 bg-orange-50/50 border-b border-orange-100 flex gap-3 items-center&quot;>
                <span className=&quot;text-xl&quot;>🧠</span>
                <p className=&quot;text-xs text-orange-700 font-medium leading-relaxed&quot;>
                  <strong className=&quot;uppercase mr-1 tracking-wider text-[10px]&quot;>AI Mindset:</strong>
                  {activeChatData.find((m: any) => m.role === 'assistant')?.strategic_note}
                </p>
              </div>
            )}

            {/* Historial de Chat */}
            <div className=&quot;flex-1 overflow-y-auto p-6 md:p-10 space-y-4 flex flex-col-reverse bg-white/40&quot;>
              {activeChatData.map((msg: any) => (
                <div key={msg.id} className={`p-4 md:p-6 rounded-3xl max-w-[85%] text-sm leading-relaxed shadow-sm transition-all ${msg.role === 'assistant' ? 'bg-white text-zinc-600 self-start border border-zinc-100 rounded-tl-sm' : 'bg-zinc-900 text-white self-end rounded-tr-sm'}`}>
                  <p>{msg.content}</p>
                  <span className={`block text-[9px] mt-2 font-bold uppercase tracking-widest ${msg.role === 'assistant' ? 'text-zinc-300' : 'text-zinc-500'}`}>
                    {msg.role === 'assistant' ? 'Arqui AI' : 'Visitante'}
                  </span>
                </div>
              ))}
            </div>
            
            <div className=&quot;p-4 bg-white border-t border-zinc-100 text-center&quot;>
               <span className=&quot;text-[9px] font-black text-zinc-400 tracking-widest uppercase&quot;>Architect.Sys Master Console • Modo Auditoría</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
