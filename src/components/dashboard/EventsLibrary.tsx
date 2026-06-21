"use client";

import React, { useState, useEffect } from "react";
import { EventDossier } from "@/lib/events-data";
import { createClient } from "@/lib/supabase-browser";

interface EventsLibraryProps {
  isGrowthPlan: boolean;
}

export default function EventsLibrary({ isGrowthPlan }: EventsLibraryProps) {
  const [selectedEvent, setSelectedEvent] = useState<EventDossier | null>(null);
  const [eventsList, setEventsList] = useState<EventDossier[]>([]);
  const [requestedEventIds, setRequestedEventIds] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        if (!supabase) throw new Error("Supabase no inicializado");
        
        // Obtener usuario actual
        const { data: authData } = await supabase.auth.getUser();
        const currentUserId = authData?.user?.id;
        if (currentUserId) setUserId(currentUserId);

        // Fetch master events
        const { data: masterData, error: masterError } = await supabase
          .from('master_events')
          .select('*')
          .order('created_at', { ascending: true });

        if (masterError) throw masterError;

        if (masterData) {
          // Transform snake_case to camelCase
          const formatted: EventDossier[] = masterData.map(ev => ({
            id: ev.id,
            title: ev.title,
            category: ev.category,
            description: ev.description,
            targetAudience: ev.target_audience,
            preparationTime: ev.preparation_time,
            clientRole: ev.client_role || [],
            agencyRole: ev.agency_role || [],
            deliverables: ev.deliverables || [],
            preEventProtocol: ev.pre_event_protocol,
            isUnlockedForBase: ev.is_unlocked_for_base,
            imagePlaceholder: ev.image_placeholder
          }));
          setEventsList(formatted);
        }

        // Fetch user's requested events if logged in
        if (currentUserId) {
          const { data: clientEvents } = await supabase
            .from('client_events')
            .select('event_id')
            .eq('profile_id', currentUserId);
            
          if (clientEvents) {
            const requested = new Set(clientEvents.map(ce => ce.event_id));
            setRequestedEventIds(requested);
          }
        }
      } catch (err: any) {
        console.error("Error fetching events:", err);
        setError("No se pudieron cargar los eventos. ¿Migración SQL pendiente?");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleEventClick = (event: EventDossier) => {
    const isLocked = !isGrowthPlan && !event.isUnlockedForBase;
    if (isLocked) {
      setSelectedEvent({ ...event, title: `${event.title} (Bloqueado)` });
      return;
    }
    setSelectedEvent(event);
  };

  const requestEvent = async () => {
    if (!selectedEvent || !userId) return;
    
    try {
      const { error } = await supabase.from('client_events').insert([{
        profile_id: userId,
        event_id: selectedEvent.id,
        status: 'requested'
      }]);
      
      if (error) throw error;
      
      alert("Protocolo Iniciado. El equipo técnico ha recibido tu solicitud y se pondrá en contacto pronto.");
      setRequestedEventIds(prev => new Set(prev).add(selectedEvent.id));
      setSelectedEvent(null);
    } catch (err: any) {
      console.error("Error requesting event:", err);
      alert("Hubo un error al iniciar el protocolo. Intenta de nuevo.");
    }
  };

  if (loading) return <div className="text-zinc-500 animate-pulse">Cargando biblioteca de eventos...</div>;
  if (error) return <div className="text-red-500 p-4 border border-red-500/30 bg-red-500/10 rounded-xl">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Biblioteca de Eventos</h2>
          <p className="text-zinc-400 text-sm max-w-2xl">
            Protocolos probados de ingeniería de restaurantes. Selecciona un evento para ver su dossier operativo y lanzarlo.
          </p>
        </div>
        {!isGrowthPlan && (
          <div className="hidden md:block bg-zinc-900 border border-orange-500/50 px-4 py-2 rounded-xl">
            <p className="text-xs text-orange-500 font-medium">Plan Base: Eventos Limitados</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsList.map((event) => {
          const isLocked = !isGrowthPlan && !event.isUnlockedForBase;
          const isRequested = requestedEventIds.has(event.id);

          return (
            <div
              key={event.id}
              onClick={() => handleEventClick(event)}
              className={`relative bg-zinc-900/50 backdrop-blur-md border rounded-xl p-6 cursor-pointer transition-all duration-300 hover:-translate-y-1 
                ${isLocked ? 'border-white/5 opacity-70' : 'border-white/10 hover:border-orange-500/50 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]'}
                ${isRequested ? 'border-green-500/30 bg-green-500/5' : ''}
              `}
            >
              {isLocked && (
                <div className="absolute top-4 right-4 bg-zinc-800 p-2 rounded-full shadow-lg z-10 border border-white/5">
                  <svg className="w-4 h-4 text-zinc-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                </div>
              )}

              {isRequested && (
                <div className="absolute top-4 right-4 bg-green-500/20 px-2 py-1 rounded text-[10px] font-bold text-green-400 border border-green-500/20">
                  EN PROCESO
                </div>
              )}

              <div className="flex flex-col h-full">
                <span className={`text-xs font-bold uppercase tracking-wider mb-2 ${isLocked ? 'text-zinc-600' : 'text-orange-500'}`}>{event.category}</span>
                <h3 className="text-lg font-bold text-white mb-3 leading-tight">{event.title}</h3>
                <p className="text-sm text-zinc-400 line-clamp-3 mb-6 flex-1">{event.description}</p>

                <div className="flex items-center justify-between text-xs pt-4 border-t border-white/10">
                  <span className="text-zinc-500">Prep: {event.preparationTime}</span>
                  <span className={isLocked ? 'text-zinc-600' : (isRequested ? 'text-green-500 font-medium' : 'text-orange-500 font-medium')}>
                    {isLocked ? 'Bloqueado' : (isRequested ? 'Ver Estado' : 'Ver Dossier →')}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {eventsList.length === 0 && (
          <div className="col-span-full py-12 text-center text-zinc-500 border border-dashed border-white/10 rounded-xl">
            No hay eventos en el catálogo. Configura el Master de Eventos.
          </div>
        )}
      </div>

      {/* Event Dossier Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-zinc-950 w-full max-w-3xl max-h-[90vh] overflow-y-auto custom-scrollbar rounded-2xl border border-white/10 shadow-2xl relative">
            <button
              onClick={() => setSelectedEvent(null)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>

            <div className="p-8 md:p-10">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-wider mb-2 block">Dossier Operativo</span>
              <h2 className="text-3xl font-bold text-white mb-6">{selectedEvent.title}</h2>

              {!isGrowthPlan && !selectedEvent.isUnlockedForBase && (
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 mb-8 flex items-start space-x-4">
                  <div className="mt-1">
                    <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">Evento Exclusivo Plan Growth</h4>
                    <p className="text-sm text-zinc-400">Desbloquea este y 6 eventos más, junto con el Agente de WhatsApp Autónomo por 299€/mes.</p>
                    <button className="mt-3 bg-orange-500 text-white px-4 py-2 rounded text-sm font-bold hover:bg-orange-600 transition-colors shadow-[0_0_15px_rgba(249,115,22,0.3)]">Hacer Upgrade a Growth</button>
                  </div>
                </div>
              )}

              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2 border-b border-white/10 pb-2">Descripción y Objetivo</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Tu Rol (El Restaurante)</h3>
                    <ul className="space-y-3">
                      {selectedEvent.clientRole.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-zinc-400 bg-zinc-900/50 p-3 rounded-xl border border-white/5">
                          <span className="text-orange-500 mr-2 font-bold">{idx + 1}.</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Nuestro Rol (Architect.Sys)</h3>
                    <ul className="space-y-3">
                      {selectedEvent.agencyRole.map((item, idx) => (
                        <li key={idx} className="flex items-start text-sm text-zinc-400 bg-orange-500/5 p-3 rounded-xl border border-orange-500/20">
                          <span className="text-orange-500 mr-2 font-bold">✓</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 border-b border-white/10 pb-2">Entregables del Protocolo</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {selectedEvent.deliverables.map((item, idx) => (
                      <div key={idx} className="bg-zinc-900/80 p-4 rounded-xl border border-white/5 text-center flex flex-col items-center justify-center">
                        <svg className="w-6 h-6 text-orange-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        <span className="text-sm font-medium text-white">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3 border-b border-white/10 pb-2">Reunión Previa (Kick-off)</h3>
                  <div className="bg-zinc-900/50 p-4 rounded-xl border border-white/5 border-l-4 border-l-orange-500">
                    <p className="text-sm text-zinc-400 leading-relaxed">{selectedEvent.preEventProtocol}</p>
                  </div>
                </div>
              </div>

              {(!(!isGrowthPlan && !selectedEvent.isUnlockedForBase)) && (
                <div className="mt-10 flex justify-end">
                  {requestedEventIds.has(selectedEvent.id) ? (
                    <button 
                      disabled
                      className="bg-green-500/10 text-green-500 border border-green-500/30 px-8 py-3 rounded-xl font-bold flex items-center gap-2 cursor-not-allowed"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      Protocolo en Curso
                    </button>
                  ) : (
                    <button 
                      onClick={requestEvent}
                      disabled={!userId}
                      className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Iniciar Protocolo de Lanzamiento
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
