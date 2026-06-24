"use client";

import React, { useState, useEffect, useRef } from "react";
import { Send, Bot, Sparkles, ChefHat } from "lucide-react";
import { createClient } from "@/lib/supabase-browser";

interface CreativeFactoryClientProps {
  userProfile: any;
}

export default function CreativeFactoryClient({ userProfile }: CreativeFactoryClientProps) {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [businessProfile, setBusinessProfile] = useState<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const loadData = async () => {
      if (!userProfile?.id) return;
      
      // Fetch Business Profile
      const { data: bp } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('id', userProfile.id)
        .single();
        
      setBusinessProfile(bp);

      // Fetch Chat History
      const { data: chatData } = await supabase
        .from('creative_chats')
        .select('messages')
        .eq('profile_id', userProfile.id)
        .single();

      if (chatData && chatData.messages && chatData.messages.length > 0) {
        setMessages(chatData.messages);
      } else {
        const initialMsg = {
          role: 'assistant',
          content: `¡Hola! Soy **Arqui**, el Coordinador de Ejecución IA de Architect.Sys.\n\nEstoy conectado directamente al perfil de tu negocio. Puedo ayudarte a redactar copys persuasivos, definir estrategias de precios o proponer mejoras a tu carta. ¿En qué trabajamos hoy?`
        };
        setMessages([initialMsg]);
      }
    };
    
    loadData();
  }, [userProfile]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !userProfile?.id) return;

    const userMsg = { role: 'user', content: input };
    const updatedHistory = [...messages, userMsg];
    setMessages(updatedHistory);
    setInput("");
    setIsSending(true);

    try {
      const res = await fetch('/api/creative-factory/agent-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedHistory,
          clientName: userProfile.business_name || 'Restaurante',
          clientCuisine: businessProfile?.cuisine_type || 'General',
          clientTier: (businessProfile?.average_ticket > 40) ? 'Gourmet' : 'Barrio'
        })
      });
      
      const data = await res.json();
      
      if (data.status === 'ok') {
        const agentMsg = { role: 'assistant', content: data.reply };
        const finalHistory = [...updatedHistory, agentMsg];
        setMessages(finalHistory);
        
        // Upsert chat en Supabase
        const { data: existingChat } = await supabase
          .from('creative_chats')
          .select('id')
          .eq('profile_id', userProfile.id)
          .single();
          
        if (existingChat) {
          await supabase
            .from('creative_chats')
            .update({ messages: finalHistory, updated_at: new Date().toISOString() })
            .eq('profile_id', userProfile.id);
        } else {
          await supabase
            .from('creative_chats')
            .insert({ profile_id: userProfile.id, messages: finalHistory });
        }
      } else {
        setMessages([...updatedHistory, { role: 'assistant', content: '⚠️ Error al conectar con mi núcleo lógico. Intenta de nuevo.' }]);
      }
    } catch (err) {
      console.error(err);
      setMessages([...updatedHistory, { role: 'assistant', content: '⚠️ Ocurrió un error de conexión.' }]);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[80vh] bg-dash-surface border border-dash-border rounded-xl overflow-hidden relative">
      <div className="bg-dash-bg p-4 border-b border-dash-border flex items-center gap-3">
        <div className="w-10 h-10 bg-brand/10 border border-brand/30 rounded-full flex items-center justify-center">
          <Bot size={20} className="text-brand" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">Creative Factory (Arqui)</h2>
          <p className="text-xs text-dash-text-secondary flex items-center gap-1">
            <Sparkles size={10} className="text-trust" />
            Conectado al contexto de tu negocio
          </p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] md:max-w-[75%] rounded-xl p-4 ${
              msg.role === 'user' 
                ? 'bg-brand/20 border border-brand/30 text-white' 
                : 'bg-zinc-900 border border-white/10 text-zinc-300'
            }`}>
              <div className="text-sm font-bold mb-1 flex items-center gap-2">
                {msg.role === 'user' ? (
                  <>Tú</>
                ) : (
                  <><Bot size={14} className="text-brand"/> Arqui</>
                )}
              </div>
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </div>
            </div>
          </div>
        ))}
        {isSending && (
          <div className="flex justify-start">
            <div className="bg-zinc-900 border border-white/10 rounded-xl p-4 text-sm text-zinc-400 flex items-center gap-2">
              <Bot size={14} className="text-brand animate-pulse"/> Arqui está escribiendo...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <div className="p-4 bg-dash-bg border-t border-dash-border">
        <form onSubmit={handleSend} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSending}
            placeholder="Pregunta a Arqui sobre ventas, ads o copywriting..."
            className="w-full bg-zinc-900 border border-white/10 text-white text-sm rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:border-brand/50 transition-colors disabled:opacity-50"
          />
          <button 
            type="submit" 
            disabled={isSending || !input.trim()}
            className="absolute right-2 p-2 bg-brand text-white rounded-lg hover:bg-brandHover transition-colors disabled:opacity-50"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
