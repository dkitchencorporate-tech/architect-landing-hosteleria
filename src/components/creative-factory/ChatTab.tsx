import React, { FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';

interface ChatTabProps {
  selectedClient: any;
  currentChat: any[];
  isSendingChat: boolean;
  chatInput: string;
  setChatInput: (v: string) => void;
  handleSendChatMessage: (e: FormEvent) => void;
  chatEndRef: React.RefObject<HTMLDivElement>;
}

export default function ChatTab({
  selectedClient,
  currentChat,
  isSendingChat,
  chatInput,
  setChatInput,
  handleSendChatMessage,
  chatEndRef
}: ChatTabProps) {
  if (!selectedClient) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] border border-zinc-900 bg-zinc-950 rounded-3xl overflow-hidden">
      <div className="bg-zinc-900/60 p-4 border-b border-zinc-900/60 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center font-black text-white text-sm">A</div>
        <div>
          <h4 className="text-xs font-bold text-white">Arqui (AI Marketing Co-Pilot)</h4>
          <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">En línea - Contexto: {selectedClient.name}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {currentChat.map((msg: any, idx: number) => (
          <div 
            key={idx} 
            className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs shrink-0 ${
              msg.role === 'user' ? 'bg-zinc-800 text-white' : 'bg-orange-600 text-white'
            }`}>
              {msg.role === 'user' ? 'C' : 'A'}
            </div>
            <div className={`p-4 rounded-2xl text-xs leading-relaxed font-mono ${
              msg.role === 'user' ? 'bg-zinc-900 text-zinc-200 rounded-tr-none' : 'bg-zinc-900/50 border border-zinc-900 text-zinc-300 rounded-tl-none'
            }`}>
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </div>
          </div>
        ))}
        {isSendingChat && (
          <div className="flex gap-3 max-w-[80%] mr-auto items-center">
            <div className="w-7 h-7 rounded-full bg-orange-600 flex items-center justify-center font-black text-white text-xs">A</div>
            <div className="flex gap-1 py-3 px-4 bg-zinc-900/50 border border-zinc-900 rounded-2xl rounded-tl-none">
              <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce delay-75"></span>
              <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce delay-150"></span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      <form onSubmit={handleSendChatMessage} className="p-4 border-t border-zinc-900/60 bg-black/40 flex gap-3">
        <input 
          type="text" 
          value={chatInput}
          onChange={(e) => setChatInput(e.target.value)}
          placeholder={`Pregúntale a Arqui sobre la campaña de ${selectedClient.name}...`}
          className="flex-1 bg-black border border-zinc-900 rounded-xl px-4 text-xs text-white focus:outline-none focus:border-orange-600"
        />
        <button 
          type="submit" 
          disabled={isSendingChat || !chatInput.trim()}
          className="bg-white hover:bg-zinc-200 text-black font-black text-xs px-6 py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
