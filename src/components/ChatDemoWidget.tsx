"use client";

import React, { useEffect, useState, useRef } from "react";

type Props = { onClose?: () => void };

type ChatMode = "CONSULTING" | "BOOKING_DEMO" | "CLOSING";
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
// Cualquier contenedor con posición relativa + z-index bajo (u overflow hidden) no debe interferir.
const Z_INDEX_OVERLAY = 9999;

export default function ChatDemoWidget({ onClose }: Props) {
  const [mode, setMode] = useState<ChatMode>("CONSULTING");
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [leadContext, setLeadContext] = useState<LeadContext>({});

  const welcomeText = "Hola — soy Arqui, asistente de Architect.Sys. En 2 minutos te muestro cómo automatizar reservas y pedidos para tu negocio de hostelería.";

  useEffect(() => {
    // Inicializar con dos mensajes del assistant: saludo + pregunta inicial
    setMessages([
      { role: "assistant", content: welcomeText },
      { role: "assistant", content: "Para empezar, cuéntame: ¿cómo te llamas y qué tipo de negocio tienes (restaurante, bar, delivery, hotel, dark_kitchen u otro)?" },
    ]);
  }, []);

  const pushMessage = (m: { role: "user" | "assistant"; content: string }) => setMessages((p) => [...p, m]);

  // ref para scroll inteligente
  const messagesRef = React.useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

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
      if (json?.text) pushMessage({ role: "assistant", content: json.text });
      if (json?.leadContext && typeof json.leadContext === "object") {
        setLeadContext((prev) => ({ ...prev, ...json.leadContext }));
      }
    } catch (err: any) {
      setLoading(false);
      pushMessage({ role: "assistant", content: `Error: ${String(err)}` });
    }
  };

  const sendUserInput = async () => {
    const val = inputValue.trim();
    if (!val) return;
    setInputValue("");
    const newMessages = [...messages, { role: "user" as const, content: val }];
    setMessages(newMessages);
    const payload = { mode, messages: newMessages, leadContext };
    await callApi(payload);
  };

  const hasMinimumLead = () => {
    const hasLead = !!leadContext.leadName;
    const hasBusiness = !!leadContext.businessName;
    const hasType = !!leadContext.businessType;
    const hasLocation = !!leadContext.location;
    const hasChannelOrCapacity = (leadContext.channels && leadContext.channels.length > 0) || !!leadContext.capacity;
    return hasLead && hasBusiness && hasType && hasLocation && hasChannelOrCapacity;
  };

  const demoLabelForType = (bt?: BusinessType) => {
    if (!bt) return "Ver demo en vivo";
    if (bt === "restaurant") return "Ver demo en vivo de reservas";
    if (bt === "delivery") return "Ver demo en vivo de pedidos";
    return "Ver demo en vivo";
  };

  const startBookingDemo = async (label?: string) => {
    const userText = label || demoLabelForType(leadContext.businessType);
    pushMessage({ role: "user", content: userText });
    setMode("BOOKING_DEMO");
    const payload = { mode: "BOOKING_DEMO", messages: [...messages, { role: "user", content: userText }], leadContext };
    await callApi(payload);
  };

  const triggerClosing = async (userText: string) => {
    pushMessage({ role: "user", content: userText });
    setMode("CLOSING");
    const payload = { mode: "CLOSING", messages: [...messages, { role: "user", content: userText }], leadContext };
    await callApi(payload);
  };

  const resetAndClose = () => {
    if (onClose) onClose();
    setMode("CONSULTING");
    setMessages([
      { role: "assistant", content: welcomeText },
      { role: "assistant", content: "Para empezar, cuéntame: ¿cómo te llamas y qué tipo de negocio tienes (restaurante, bar, delivery, hotel, dark_kitchen u otro)?" },
    ]);
    setLeadContext({});
    setInputValue("");
  };

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: Z_INDEX_OVERLAY }}
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 flex items-center justify-center sm:items-end bg-black/40 pointer-events-auto"
        style={{ zIndex: Z_INDEX_OVERLAY }}
      >
        <div
          className="w-full max-w-[420px] sm:max-w-[480px] mx-4 sm:mx-0 rounded-3xl bg-white border border-gray-100 shadow-2xl overflow-hidden relative"
          style={{ zIndex: Z_INDEX_OVERLAY + 1 }}
        >
        <div className="max-h-[80vh] h-auto flex flex-col">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex flex-col">
              <div className="text-sm font-semibold text-gray-900">Asistente Arqui · Demo en vivo</div>
              <div className="text-xs text-gray-500">Architect.Sys</div>
            </div>
            <div>
              <button onClick={resetAndClose} className="text-sm text-gray-500">Cerrar</button>
            </div>
          </div>

          <div className="flex-1 p-4">
            <div ref={messagesRef} className="space-y-3 max-h-[56vh] overflow-y-auto">
              {messages.map((m, i) => (
                <div key={i} className={`p-2 rounded-lg text-sm ${m.role === "assistant" ? "bg-slate-50 text-slate-800 self-start" : "bg-[#DCF8C6] text-gray-900 self-end"}`}>
                  {m.content}
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 pb-4 pt-2 border-t bg-white">
            {mode === "CONSULTING" && (
              <div className="space-y-2">
                {!hasMinimumLead() && (
                  <p className="text-xs text-gray-600">Te haré unas preguntas para conocer tu negocio y así ofrecer una demo personalizada.</p>
                )}

                {hasMinimumLead() && (
                  <div className="mb-2">
                    <button onClick={() => startBookingDemo()} className="w-full rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white">{demoLabelForType(leadContext.businessType)}</button>
                  </div>
                )}

                <form onSubmit={(e) => { e.preventDefault(); sendUserInput(); }} className="flex gap-2">
                  <input value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="flex-1 border rounded-lg px-3 py-2 text-gray-900 placeholder-gray-400" placeholder="Escribe aquí..." />
                  <button type="submit" className="bg-[#FF4500] text-white px-4 py-2 rounded-lg">{loading ? "..." : "Enviar"}</button>
                </form>
              </div>
            )}

            {mode === "BOOKING_DEMO" && (
              <div className="space-y-2">
                <p className="text-xs text-gray-600">Acciones rápidas</p>
                <div className="flex gap-2">
                  <button onClick={() => triggerClosing('Gracias, nos vemos esta noche')} className="flex-1 rounded-full border px-3 py-2 text-sm">Gracias, nos vemos esta noche</button>
                  <button onClick={() => triggerClosing('Reserva confirmada, gracias')} className="flex-1 rounded-full border px-3 py-2 text-sm">Reserva confirmada, gracias</button>
                </div>

              </div>
            )}

            {mode === "CLOSING" && (
              <div className="space-y-2">
                <div className="text-xs text-gray-600">Si quieres seguir, agenda una llamada.</div>
                <div className="mt-2">
                  <a href="https://calendly.com/placeholder" target="_blank" rel="noreferrer" className="w-full inline-block text-center rounded-full bg-orange-500 px-4 py-3 text-sm font-semibold text-white">Agendar llamada</a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
