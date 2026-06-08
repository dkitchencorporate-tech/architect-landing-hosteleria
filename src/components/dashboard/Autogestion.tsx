"use client";

import React from "react";

interface AutogestionProps {
  isGrowthPlan: boolean;
}

export default function Autogestion({ isGrowthPlan }: AutogestionProps) {
  return (
    <div className="space-y-6 relative">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Autogestión del Ecosistema</h2>
        <p className="text-dash-text-secondary text-sm max-w-2xl">
          Edita los textos de tu carta, modifica horarios, y actualiza los elementos de tu web y bot de forma autónoma.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Fictional Management Cards */}
        {[
          { title: "Gestor de Carta Digital", desc: "Añade nuevos platos, edita descripciones y precios.", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
          { title: "Horarios y Reservas", desc: "Bloquea días festivos y ajusta los turnos de comida y cena.", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
          { title: "Textos Web (Copywriting)", desc: "Modifica la historia de tu local y mensajes principales.", icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" }
        ].map((card, i) => (
          <div key={i} className="bg-dash-surface border border-dash-border rounded-xl p-6 opacity-50 blur-[1px]">
            <svg className="w-8 h-8 text-dash-text-secondary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.icon} /></svg>
            <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
            <p className="text-sm text-dash-text-secondary">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Lock Overlay for Base Plan (or simulated development phase) */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#020202]/80 backdrop-blur-sm rounded-xl border border-dash-border/50 p-6 text-center mt-20">
        <div className="w-16 h-16 bg-dash-surface rounded-full flex items-center justify-center mb-4 border border-dash-border">
          <svg className="w-8 h-8 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Sección en Fase de Desarrollo / Entrega</h3>
        <p className="text-dash-text-secondary max-w-md mb-6">
          Actualmente estamos construyendo y afinando tu ecosistema base. Esta sección de autogestión se desbloqueará dinámicamente cuando tu web y sistemas estén 100% entregados y aprobados.
        </p>

        {!isGrowthPlan && (
          <div className="mt-4 bg-brand/10 border border-brand/30 rounded-lg p-6 max-w-lg shadow-premium">
            <h4 className="text-brand font-bold mb-2 uppercase tracking-wide text-sm">Aviso Importante</h4>
            <p className="text-white text-sm mb-4">
              Como usuario de <strong>Plan Base (Pago Único)</strong>, tendrás acceso a funciones limitadas aquí. Desbloquea el Agente de WhatsApp Autónomo, 6 Eventos premium y analíticas avanzadas actualizando a Socio Growth.
            </p>
            <button className="bg-brand text-white px-6 py-2 rounded text-sm font-bold hover:bg-brandHover transition-colors w-full">
              Ver Ventajas del Plan Growth (299€/mes)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
