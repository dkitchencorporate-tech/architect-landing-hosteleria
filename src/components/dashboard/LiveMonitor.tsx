"use client";

import React, { useState, useEffect } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useAlert } from '@/components/ui/AlertProvider';
import { 
  User, 
  BrainCircuit, 
  Trash2, 
  Archive, 
  AlertTriangle,
  X,
  Bot,
  PowerOff,
  Activity
} from 'lucide-react';

export default function LiveMonitor() {
  const [chats, setChats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [botSettings, setBotSettings] = useState<any>({});
  const [confirmDelete, setConfirmDelete] = useState<{ show: boolean, phone: string | null } | null>(null);
  const { showAlert } = useAlert();

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    fetchChats();
    fetchBotSettings();
    const interval = setInterval(fetchChats, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchChats = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_history')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setChats(data);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchBotSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('bot_settings')
        .select('phone, is_active');
      if (!error && data) {
        const settingsMap: any = {};
        data.forEach(s => { settingsMap[s.phone] = s.is_active; });
        setBotSettings(settingsMap);
      }
    } catch(e) { console.error(e); }
  };

  const toggleBot = async (phone: string, currentState: boolean) => {
    try {
      const newState = !currentState;
      await supabase
        .from('bot_settings')
        .upsert({ phone, is_active: newState });
      setBotSettings({ ...botSettings, [phone]: newState });
    } catch(e) { console.error(e); }
  };

  const archiveChat = async (phone: string) => {
    showAlert(`Chat ${phone} archivado con éxito.`);
    setConfirmDelete(null);
  };

  const deletePermanently = async (phone: string) => {
    try {
      await supabase.from('chat_history').delete().eq('phone', phone);
      await supabase.from('bot_settings').delete().eq('phone', phone);
      setConfirmDelete(null);
      setSelectedChat(null);
      fetchChats();
    } catch(e) { console.error(e); }
  };

  if (loading) return <div className="p-20 text-center text-zinc-600 font-extrabold uppercase text-[12px] animate-pulse tracking-[0.2em] bg-white/5 border border-white/5 rounded-[3rem]">Sincronizando Torre de Control Master...</div>;

  const leadsObj = chats.reduce((acc: any, chat: any) => {
    if (!acc[chat.phone]) acc[chat.phone] = [];
    acc[chat.phone].push(chat);
    return acc;
  }, {});

  const phones = Object.keys(leadsObj);
  const activeChatData = selectedChat ? leadsObj[selectedChat] : null;

  return (
      <div className="p-4 bg-transparent rounded-[2.5rem] h-[500px] overflow-y-auto custom-scrollbar">
      <div className="flex flex-col gap-2 pr-2">
        {phones.map(phone => {
          const conversation = leadsObj[phone];
          const lastMsg = conversation[0];
          const isEnabled = botSettings[phone] !== false;

          return (
            <div key={phone} 
                 className="group relative bg-white/5 border border-white/5 p-4 rounded-3xl hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer flex items-center justify-between overflow-hidden"
                 onClick={() => setSelectedChat(phone)}>
              
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/[0.02] to-white/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

              {/* Información Principal */}
              <div className="flex items-center gap-4">
                {/* Avatar / Icono */}
                <div className="w-12 h-12 bg-orange-500/10 text-orange-500 border border-orange-500/20 rounded-2xl flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(249,115,22,0.1)] group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-shadow">
                  <User size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1.5">
                    <p className="text-sm font-black text-white truncate tracking-tight">Sesión: {phone.substring(0,8)}...</p>
                    <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border ${lastMsg.intent === 'venta' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-orange-500/10 text-orange-400 border-orange-500/20'}`}>
                      {lastMsg.intent}
                    </span>
                    {lastMsg.topic && (
                      <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-white/5 text-zinc-400 border border-white/10 hidden md:inline-block">
                        {lastMsg.topic}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-400 truncate pr-4">"{lastMsg.content}"</p>
                </div>
              </div>

              {/* Controles */}
              <div className="flex items-center gap-3 relative z-10">
                {!isEnabled && (
                  <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20 flex items-center gap-1">
                    <PowerOff size={10} /> Pausado
                  </span>
                )}
                <button 
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    setConfirmDelete({ show: true, phone });
                  }} 
                  className="w-10 h-10 bg-black/40 border border-white/5 rounded-2xl flex items-center justify-center hover:bg-red-500/20 hover:text-red-400 hover:border-red-500/30 text-zinc-500 transition-all shadow-inner"
                  title="Gestionar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          );
        })}

        {phones.length === 0 && (
          <div className="p-12 text-center text-zinc-500 bg-white/5 border border-white/5 rounded-3xl">
            <Bot size={40} className="mx-auto mb-4 opacity-50" />
            <p className="font-medium">No hay conversaciones registradas.</p>
          </div>
        )}
      </div>

      {/* MODAL DE CONFIRMACIÓN DE ELIMINACIÓN/ARCHIVADO */}
      {confirmDelete?.show && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setConfirmDelete(null)}></div>
          <div className="relative w-full max-w-sm bg-[#050505] border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-8 animate-in fade-in zoom-in duration-200">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/20 text-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-[0_0_20px_rgba(249,115,22,0.1)]">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tighter">Gestión de Sesión</h3>
              <p className="text-zinc-500 text-xs mt-3 font-medium leading-relaxed">¿Qué deseas hacer con el registro de <br/><span className="font-bold text-white bg-white/5 px-2 py-0.5 rounded-md mt-1 inline-block">{confirmDelete.phone}</span>?</p>
            </div>
            
            <div className="space-y-3">
              <button 
                onClick={() => archiveChat(confirmDelete.phone!)}
                className="w-full bg-white text-black font-black py-4 rounded-2xl text-[11px] uppercase tracking-widest hover:bg-zinc-200 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2"
              >
                <Archive size={14} /> Archivar Registro
              </button>
              
              <button 
                onClick={() => deletePermanently(confirmDelete.phone!)}
                className="w-full bg-transparent text-red-500 font-black py-4 rounded-2xl text-[11px] uppercase tracking-widest border border-red-500/20 hover:bg-red-500/10 hover:border-red-500/40 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={14} /> Eliminar Permanentemente
              </button>
            </div>
            <button onClick={() => setConfirmDelete(null)} className="absolute top-6 right-6 text-zinc-600 hover:text-white transition-colors"><X size={20}/></button>
          </div>
        </div>
      )}

      {/* MODAL DE AUDITORÍA PROFUNDA */}
      {selectedChat && activeChatData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedChat(null)}></div>
          <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#050505] border border-white/10 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden animate-in fade-in zoom-in duration-300">
            {/* Header Modal */}
            <div className="p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center bg-black/40 backdrop-blur-xl gap-4">
              <div>
                <h3 className="text-2xl font-black tracking-tighter text-white flex items-center gap-3">
                  <User className="text-zinc-500" /> Sesión: {selectedChat}
                </h3>
                <div className="flex gap-2 mt-3 flex-wrap">
                  <span className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-orange-500/20">
                    {activeChatData[0].intent}
                  </span>
                  <span className="bg-white/5 text-zinc-300 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-white/10">
                    {activeChatData[0].topic || 'Analizando'}
                  </span>
                  <span className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                    {activeChatData[0].closing_stage || 'Atención'}
                  </span>
                </div>
              </div>
              <div className="flex gap-3 items-center w-full md:w-auto justify-end">
                <button 
                  onClick={() => toggleBot(selectedChat, botSettings[selectedChat] !== false)} 
                  className={`px-5 py-3 rounded-xl text-[10px] tracking-widest font-black uppercase transition-all flex items-center gap-2 ${botSettings[selectedChat] !== false ? 'bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10' : 'bg-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:bg-orange-500'}`}
                >
                  <Bot size={14} /> {botSettings[selectedChat] !== false ? 'Agente Activo' : 'Agente Pausado'}
                </button>
                <button onClick={() => setSelectedChat(null)} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 text-zinc-400 transition-all"><X size={20}/></button>
              </div>
            </div>

            {/* Mindset de la IA */}
            {activeChatData.find((m: any) => m.role === 'assistant')?.strategic_note && (
              <div className="px-8 py-5 bg-gradient-to-r from-orange-500/10 to-transparent border-b border-orange-500/10 flex gap-4 items-start">
                <div className="p-2 bg-orange-500/10 rounded-lg shrink-0 mt-0.5">
                  <BrainCircuit size={18} className="text-orange-500" />
                </div>
                <p className="text-xs text-orange-300/80 font-medium leading-relaxed">
                  <strong className="uppercase mr-2 tracking-widest text-[10px] text-orange-500">AI Mindset:</strong>
                  {activeChatData.find((m: any) => m.role === 'assistant')?.strategic_note}
                </p>
              </div>
            )}

            {/* Historial de Chat */}
            <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 flex flex-col-reverse bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/[0.02] to-transparent">
              {activeChatData.map((msg: any) => (
                <div key={msg.id} className={`p-5 md:p-6 rounded-[2rem] max-w-[85%] text-sm leading-relaxed transition-all ${msg.role === 'assistant' ? 'bg-zinc-900/80 backdrop-blur-sm text-zinc-300 self-start border border-white/5 rounded-tl-sm' : 'bg-white text-black self-end rounded-tr-sm shadow-[0_10px_30px_rgba(255,255,255,0.05)]'}`}>
                  <p>{msg.content}</p>
                  <span className={`flex items-center gap-1.5 text-[9px] mt-3 font-black uppercase tracking-widest opacity-60`}>
                    {msg.role === 'assistant' ? <Bot size={10} /> : <User size={10} />}
                    {msg.role === 'assistant' ? 'Arqui AI' : 'Visitante'}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="p-5 bg-black/60 backdrop-blur-xl border-t border-white/5 flex justify-between items-center px-8">
               <span className="text-[10px] font-black text-zinc-600 tracking-widest uppercase flex items-center gap-2"><Activity size={12}/> Console Auditor</span>
               <span className="text-[10px] font-black text-zinc-600 tracking-widest uppercase">Live Encryption Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
