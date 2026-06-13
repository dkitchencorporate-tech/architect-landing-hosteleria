"use client";

import React, { useState } from "react";
import { eventsLibrary, EventDossier } from "@/lib/events-data";

interface EventsLibraryProps {
  isGrowthPlan: boolean;
}

export default function EventsLibrary({ isGrowthPlan }: EventsLibraryProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventDossier | null>(null);

  const handleEventClick = (event: EventDossier) => {
    const isLocked = !isGrowthPlan && !event.isUnlockedForBase;
    if (isLocked) {
      // Could show a specific "Upgrade required" modal, but for now we show the dossier with a locked overlay
      setSelectedEvent({ ...event, title: `${event.title} (Bloqueado)` });
      return;
    }
    setSelectedEvent(event);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Biblioteca de Eventos</h2>
          <p className="text-dash-text-secondary text-sm max-w-2xl">
            Protocolos probados de ingeniería de restaurantes. Selecciona un evento para ver su dossier operativo y lanzarlo.
          </p>
        </div>
        {!isGrowthPlan && (
          <div className="hidden md:block bg-dash-surface border border-brand px-4 py-2 rounded">
            <p className="text-xs text-brand font-medium">Plan Base: 1 Evento Desbloqueado</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsLibrary.map((event) => {
          const isLocked = !isGrowthPlan && !event.isUnlockedForBase;

          return (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className={`relative bg-dash-surface border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:shadow-premium hover:-translate-y-1 ${isLocked ? 'border-dash-border opacity-70' : 'border-dash-border hover:border-brand/50'}`}
            >
              {isLocked && (
                <div className="absolute top-4 right-4 bg-dash-bg p-2 rounded-full shadow-lg z-10">
                  <svg className="w-4 h-4 text-dash-text-secondary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                </div>
              )}

              <div className="flex flex-col h-full">
                <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${isLocked ? 'text-dash-text-secondary' : 'text-dash-accent'}`}>{event.category}</span>
                <h3 className="text-lg font-bold text-white mb-3 leading-tight">{event.title}</h3>
                <p className="text-sm text-dash-text-secondary line-clamp-3 mb-6 flex-1">{event.description}</p>

                <div className="flex items-center justify-between text-xs pt-4 border-t border-dash-border">
                  <span className="text-dash-text-secondary">Prep: {event.preparationTime}</span>
                  <span className={isLocked ? 'text-dash-text-secondary' : 'text-brand font-medium'}>
                    {isLocked ? 'Bloqueado' : 'Ver Dossier →'}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Event Dossier Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-dash-bg w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-dash-border shadow-2xl relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 text-dash-text-secondary hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="p-8 md:p-10">
              <span className="text-xs font-bold text-brand uppercase tracking-wider mb-2 block">Dossier Operativo</span>
              <h2 className="text-3xl font-bold text-white mb-6">{selectedEvent.title}</h2>

              {!isGrowthPlan && !selectedEvent.isUnlockedForBase && (
                <div className="bg-brand/10 border border-brand/30 rounded-lg p-4 mb-8 flex items-start space-x-4">
                  <div className="mt-1">
                    <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Evento Exclusivo Plan Growth</h4>
                    <p className="text-sm text-dash-text-secondary">Desbloquea este y 6 eventos más, junto con el Agente de WhatsApp Autónomo por 299€/mes.</p>
                    <button className="mt-3 bg-brand text-white px-4 py-2 rounded text-sm font-medium hover:bg-brandHover transition-colors">Hacer Upgrade a Growth</button>
                  </div>
                </div>
              )}

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 border-b border-dash-border pb-2">Descripción y Objetivo</h3>
                  <p className="text-dash-text-secondary text-sm leading-relaxed">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">KPIs Esperados</h3>
                    <ul className="space-y-2">
                      {selectedEvent.kpis.map((kpi, idx) => (
                        <li key={idx} className="flex items-start text-sm text-dash-text-secondary">
                          <span className="text-dash-accent mr-2 mt-0.5">•</span> {kpi}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Público Objetivo</h3>
                    <p className="text-sm text-dash-text-secondary">{selectedEvent.targetAudience}</p>
                    <h3 className="text-lg font-semibold text-white mb-2 mt-4">Tiempo de Preparación</h3>
                    <p className="text-sm text-dash-text-secondary">{selectedEvent.preparationTime}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 border-b border-dash-border pb-2">Logística y Operaciones</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedEvent.logistics.map((item, idx) => (
                      <li key={idx} className="flex items-start bg-dash-surface p-3 rounded border border-dash-border text-sm text-dash-text-secondary">
                        <span className="w-5 h-5 rounded-full bg-dash-bg border border-dash-border flex items-center justify-center text-[10px] mr-3 mt-0.5 shrink-0">{idx + 1}</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 border-b border-dash-border pb-2">Estrategia de Ads / Promoción</h3>
                  <div className="bg-dash-surface p-4 rounded-lg border border-dash-border border-l-4 border-l-brand">
                    <p className="text-sm text-dash-text-secondary leading-relaxed">{selectedEvent.adsStrategy}</p>
                  </div>
                </div>
              </div>

              {(!(!isGrowthPlan && !selectedEvent.isUnlockedForBase)) && (
                <div className="mt-10 flex justify-end">
                  <button 
                    onClick={async () => {
                      const { createClient } = await import("@/lib/supabase-browser");
                      const supabase = createClient();
                      const { data: { session } } = await supabase.auth.getSession();
                      
                      const email = session?.user?.email || '';
                      const isAdmin = email === 'klarx94@gmail.com';

                      if (isAdmin) {
                        alert("Modo Demo: Evento simulado activado.");
                        setSelectedEvent(null);
                        return;
                      }

                      if (session) {
                        await supabase.from('client_events').insert([{
                          profile_id: session.user.id,
                          event_id: selectedEvent.id,
                          status: 'requested'
                        }]);
                        alert("Protocolo Iniciado. Nuestro equipo se pondrá en contacto pronto.");
                      }
                      setSelectedEvent(null);
                    }}
                    className="bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition-colors shadow-lg"
                  >
                    Iniciar Protocolo de Lanzamiento
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
