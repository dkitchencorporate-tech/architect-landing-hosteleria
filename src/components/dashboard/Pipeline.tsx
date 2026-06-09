"use client";

import React from "react";

export default function Pipeline() {
  const pipelineSteps = [
    {
      id: 1,
      title: "Onboarding & Traspaso de Datos",
      status: "completed",
      date: "Completado",
      description: "Recopilación de carta, datos operativos y preferencias visuales a través del Asistente IA."
    },
    {
      id: 2,
      title: "Diseño UI/UX y Estructura Base",
      status: "active",
      date: "En Progreso (Est. 3-5 días)",
      description: "Nuestros arquitectos están diseñando la experiencia de usuario y el look & feel premium de tu ecosistema."
    },
    {
      id: 3,
      title: "Desarrollo del Agente IA y Reservas",
      status: "pending",
      date: "Pendiente",
      description: "Integración del bot de WhatsApp para gestión automática de reservas y atención al cliente."
    },
    {
      id: 4,
      title: "Revisión y Ajustes (Feedback Loop)",
      status: "pending",
      date: "Pendiente",
      description: "Presentación de la V1 para tus comentarios y refinamiento final."
    },
    {
      id: 5,
      title: "Lanzamiento y Desbloqueo del Dashboard",
      status: "pending",
      date: "Pendiente",
      description: "Despliegue en producción y activación de las funciones de Autogestión."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Pipeline de Trabajo</h2>
        <p className="text-dash-text-secondary text-sm max-w-2xl">
          Transparencia total. Sigue en tiempo real el progreso de desarrollo e implementación de tu ecosistema tecnológico.
        </p>
      </div>

      <div className="bg-dash-surface border border-dash-border rounded-xl p-6 md:p-10">
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-dash-border"></div>

          <div className="space-y-10">
            {pipelineSteps.map((step, idx) => (
              <div key={step.id} className="relative flex items-start">

                {/* Status Indicator */}
                <div className="absolute left-4 md:left-8 -ml-[9px] mt-1.5 flex items-center justify-center">
                  {step.status === 'completed' && (
                    <div className="w-5 h-5 rounded-full bg-trust border-[3px] border-dash-surface flex items-center justify-center z-10">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                    </div>
                  )}
                  {step.status === 'active' && (
                    <div className="w-5 h-5 rounded-full bg-brand border-[3px] border-dash-surface z-10 animate-pulse"></div>
                  )}
                  {step.status === 'pending' && (
                    <div className="w-5 h-5 rounded-full bg-dash-bg border-[3px] border-dash-border z-10"></div>
                  )}
                </div>

                {/* Content */}
                <div className="ml-12 md:ml-20 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className={`text-lg font-bold ${step.status === 'active' ? 'text-brand' : step.status === 'completed' ? 'text-white' : 'text-dash-text-secondary'}`}>
                      {step.title}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded mt-2 md:mt-0 inline-block w-max ${
                      step.status === 'completed' ? 'bg-trust/10 text-trust border border-trust/20' :
                      step.status === 'active' ? 'bg-brand/10 text-brand border border-brand/20' :
                      'bg-dash-bg text-dash-text-secondary border border-dash-border'
                    }`}>
                      {step.date}
                    </span>
                  </div>
                  <p className="text-sm text-dash-text-secondary leading-relaxed">
                    {step.description}
                  </p>

                  {step.status === 'active' && (
                    <div className="mt-4 bg-dash-bg border border-dash-border p-4 rounded-lg">
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="text-white font-medium">Progreso Actual</span>
                        <span className="text-brand font-bold">45%</span>
                      </div>
                      <div className="w-full bg-dash-surface h-1.5 rounded-full overflow-hidden">
                        <div className="bg-brand h-full rounded-full w-[45%]"></div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
