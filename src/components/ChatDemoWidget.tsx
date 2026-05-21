"use client";

import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import ReactMarkdown from "react-markdown";

type Props = { onClose?: () => void };

type BusinessType = "restaurant" | "bar" | "delivery" | "hotel" | "dark_kitchen" | "other";

type LeadContext = {
  leadName?: string;
  businessName?: string;
  businessType?: BusinessType;
  location?: string;
  serviceModel?: string;
  capacity?: string;
  channels?: string[];
  notes?: string;
};

// Z-index compartido para overlays globales: evita que se pise el modal de Arqui.
const Z_INDEX_OVERLAY = 9999;

export default function ChatDemoWidget({ onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadContext, setLeadContext] = useState<LeadContext>({});

  const welcomeText = "Hola, soy Arqui 🤖, Consultor Estratégico de Digitalización en Architect.Sys. Ayudamos a negocios de hostelería a escalar sus ventas, automatizar su operativa y ser 100% independientes de plataformas de terceros. Para poder darte una asesoría precisa, ¿qué tipo de negocio gestionas?";

  useEffect(() => {
    setMounted(true);
    setMessages([{ role: "assistant", content: welcomeText }]);
    window.dispatchEvent(new Event('chat_opened'));
    return () => {
      window.dispatchEvent(new Event('chat_closed'));
    };
  }, []);

  const pushMessage = (m: { role: "user" | "assistant"; content: string }) => setMessages((p) => [...p, m]);

  const messagesContainerRef = React.useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const scrollToNewMessage = () => {
      if (messages.length > 0 && messagesContainerRef.current) {
        const lastMsgId = `msg-${messages.length - 1}`;
        const lastMsgElement = document.getElementById(lastMsgId);
        if (lastMsgElement) {
          lastMsgElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };
    scrollToNewMessage();
    const timer = setTimeout(scrollToNewMessage, 150);
    return () => clearTimeout(timer);
  }, [messages, loading]);

  const callApi = async (payload: any) => {
    try {
      setLoading(true);
      const res = await fetch("/api/demo/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      setLoading(false);
      if (json?.text) {
        pushMessage({ role: "assistant", content: json.text });
      } else if (json?.message) {
        pushMessage({ role: "assistant", content: `Error del servidor: ${json.message}` });
      } else {
        pushMessage({ role: "assistant", content: "Lo siento, ha ocurrido un error inesperado al contactar con mi cerebro." });
      }
      if (json?.leadContext && typeof json.leadContext === "object") {
        setLeadContext((prev) => ({ ...prev, ...json.leadContext }));
      }
    } catch (err: any) {
      setLoading(false);
      pushMessage({ role: "assistant", content: `Error de red: ${String(err)}` });
    }
  };

  const sendUserInput = async (textOverride?: string) => {
    const val = textOverride || inputValue.trim();
    if (!val) return;
    setInputValue("");
    const newMessages = [...messages, { role: "user" as const, content: val }];
    setMessages(newMessages);
    const payload = { messages: newMessages, leadContext };
    await callApi(payload);
  };

  const resetAndClose = () => {
    if (onClose) onClose();
    setMessages([{ role: "assistant", content: welcomeText }]);
    setLeadContext({});
    setInputValue("");
  };

  if (!mounted) return null;

  const content = (
    <>
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto transition-opacity duration-300 z-[9998]"
        onClick={resetAndClose}
      />
      <div
        className="fixed inset-0 flex items-center justify-center p-2 sm:p-6 pointer-events-none z-[9999]"
      >
        <div className="w-full max-w-[98%] md:max-w-3xl h-[95vh] md:h-[85vh] rounded-[2rem] bg-[#FDFCF8] shadow-2xl overflow-hidden relative flex flex-col pointer-events-auto animate-in zoom-in duration-300">
          
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center text-xl">🤖</div>
              <div className="flex flex-col">
                <div className="text-xl font-black text-gray-900">Asistente Arqui</div>
                <div className="text-base font-medium text-gray-500">Consultoría Interactiva</div>
              </div>
            </div>
            <button onClick={resetAndClose} className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-900 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50" ref={messagesContainerRef}>
            <div className="space-y-4 pb-4">
              {messages.map((m, i) => {
                // Parsear sugerencias ocultas si existen
                let cleanContent = m.content;
                let suggestions: string[] = [];
                if (m.role === "assistant" && cleanContent.includes("|SUGERENCIAS|")) {
                  const parts = cleanContent.split("|SUGERENCIAS|");
                  cleanContent = parts[0].trim();
                  if (parts[1]) {
                    suggestions = parts[1].split("|").filter(s => s.trim().length > 0);
                  }
                }
                
                // Mostrar botones de sugerencia solo si es el último mensaje
                const isLast = i === messages.length - 1;

                return (
                  <div key={i} id={`msg-${i}`} className="flex flex-col">
                    <div className={`flex ${m.role === "assistant" ? "justify-start" : "justify-end"}`}>
                      <div className={`p-5 rounded-3xl max-w-[90%] md:max-w-[85%] text-lg shadow-md ${m.role === "assistant" ? "bg-white text-gray-800 border border-gray-100 rounded-tl-none" : "bg-[#FF4500] text-white rounded-tr-none font-medium"}`}>
                        <ReactMarkdown
                          components={{
                            p: ({node, ...props}) => <p className="mb-4 last:mb-0 leading-relaxed text-pretty" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-black" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc pl-6 mb-4 space-y-2" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal pl-6 mb-4 space-y-2 font-medium" {...props} />,
                            li: ({node, ...props}) => <li className="leading-snug" {...props} />,
                            a: ({node, ...props}) => <a className="inline-block mt-4 w-full rounded-2xl bg-[#FF4500] px-6 py-4 text-center text-base font-black text-white hover:bg-orange-600 transition-colors shadow-lg hover:-translate-y-1" target="_blank" rel="noreferrer" {...props} />
                          }}
                        >
                          {cleanContent}
                        </ReactMarkdown>
                      </div>
                    </div>
                    
                    {/* Renderizar Quick Replies si es el último mensaje y no está cargando */}
                    {isLast && m.role === "assistant" && suggestions.length > 0 && !loading && (
                      <div className="flex flex-wrap gap-2 mt-4 ml-2 animate-in fade-in slide-in-from-bottom-2 duration-500">
                        {suggestions.map((sug, idx) => (
                          <button 
                            key={idx}
                            onClick={() => {
                              setInputValue(sug + " ");
                              // Focalizar el textarea automáticamente después de hacer clic en una sugerencia
                              const textarea = document.getElementById('chat-input-textarea');
                              if (textarea) {
                                textarea.focus();
                              }
                            }}
                            className="px-4 py-2 bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-full text-sm font-bold border border-orange-200 transition-colors shadow-sm"
                          >
                            {sug}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              {loading && (
                <div className="flex justify-start">
                  <div className="p-5 rounded-3xl bg-white border border-gray-100 rounded-tl-none flex gap-3 shadow-md">
                    <span className="w-3 h-3 rounded-full bg-orange-400 animate-bounce"></span>
                    <span className="w-3 h-3 rounded-full bg-orange-400 animate-bounce" style={{animationDelay: '150ms'}}></span>
                    <span className="w-3 h-3 rounded-full bg-orange-400 animate-bounce" style={{animationDelay: '300ms'}}></span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-gray-100 bg-white">
              <div className="space-y-3">
                
                {/* Botones rápidos iniciales (solo se muestran si es el primer mensaje y no hay input libre aún) */}
                {messages.length === 1 && !loading && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    {['Restaurante', 'Dark Kitchen', 'Bar / Copas', 'Hotel'].map(tipo => (
                      <button 
                        key={tipo}
                        onClick={() => sendUserInput(tipo)}
                        className="bg-orange-50 hover:bg-[#FF4500] text-orange-600 hover:text-white border border-orange-200 transition-colors font-bold rounded-xl py-3 px-2 text-sm shadow-sm"
                      >
                        {tipo}
                      </button>
                    ))}
                  </div>
                )}

                {messages.length > 1 && (
                  <form onSubmit={(e) => { e.preventDefault(); sendUserInput(); }} className="flex gap-3 items-end">
                    <textarea 
                      id="chat-input-textarea"
                      rows={1}
                      value={inputValue}
                      onChange={(e) => {
                        setInputValue(e.target.value);
                        e.target.style.height = 'auto';
                        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          if (inputValue.trim() && !loading) {
                            sendUserInput();
                            e.currentTarget.style.height = 'auto'; // Reset height after send
                          }
                        }
                      }}
                      placeholder="Escribe tu respuesta aquí... (Shift+Enter para nueva línea)"
                      className="flex-1 bg-white border border-gray-200 rounded-3xl px-6 py-4 outline-none focus:border-[#FF4500] focus:ring-2 focus:ring-orange-100 transition-all text-gray-800 font-medium resize-none overflow-hidden min-h-[56px]"
                      disabled={loading}
                      style={{ maxHeight: '120px' }}
                    />
                    <button 
                      type="submit"
                      disabled={!inputValue.trim() || loading}
                      className="bg-gray-900 text-white font-bold h-14 px-8 rounded-full hover:bg-[#FF4500] transition-colors disabled:opacity-50 disabled:bg-gray-300 shadow-md shrink-0"
                    >
                      Enviar
                    </button>
                  </form>
                )}
              </div>





          </div>
        </div>
      </div>
    </>
  );

  return createPortal(content, document.body);
}
