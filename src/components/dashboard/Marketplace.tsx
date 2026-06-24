"use client";

import React, { useState } from "react";
import { marketplaceServices, MarketplaceService } from "@/lib/marketplace-data";

export default function Marketplace() {
  const [requestSent, setRequestSent] = useState<string | null>(null);

  const handleRequestInfo = async (id: string) => {
    setRequestSent(id);
    try {
      const res = await fetch('/api/client/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId: id })
      });
      if (res.ok) {
        alert("¡Solicitud enviada con éxito! Tu consultor senior se pondrá en contacto contigo vía WhatsApp en breves minutos.");
      } else {
        alert("Ocurrió un error al enviar la solicitud.");
      }
    } catch (error) {
      alert("Error de conexión al enviar la solicitud.");
    } finally {
      setRequestSent(null);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "whatsapp":
        return <svg className="w-8 h-8 text-trust" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
      case "ads":
        return <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;
      case "content":
        return <svg className="w-8 h-8 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
      case "audit":
        return <svg className="w-8 h-8 text-dash-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">Potenciadores / Marketplace</h2>
        <p className="text-dash-text-secondary text-sm max-w-2xl">
          Ecosistema B2B de up-sells. Soluciones avanzadas para escalar tu facturación, automatizar procesos y dominar tu zona.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {marketplaceServices.map((service) => (
          <div key={service.id} className="bg-dash-surface border border-dash-border rounded-xl p-6 md:p-8 flex flex-col transition-all hover:border-dash-accent/50 hover:shadow-premium group">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-dash-bg p-3 rounded-lg border border-dash-border group-hover:border-dash-accent/30 transition-colors">
                {getIcon(service.iconType)}
              </div>
              <span className="bg-dash-bg text-xs font-bold px-3 py-1 rounded text-dash-text-secondary border border-dash-border uppercase tracking-wider">
                {service.category}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
            <p className="text-sm text-dash-text-secondary mb-6 leading-relaxed flex-1">{service.shortDescription}</p>

            <div className="bg-dash-bg rounded p-4 border border-dash-border mb-6">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Qué incluye</h4>
              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-xs text-dash-text-secondary">
                    <span className="text-trust mr-2">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 pt-4 border-t border-dash-border">
              <div>
                <p className="text-xs text-dash-text-secondary">Inversión Estimada</p>
                <p className="text-white font-bold">{service.priceEst}</p>
              </div>
              <div className="mt-2 sm:mt-0 text-left sm:text-right">
                <p className="text-xs text-dash-text-secondary">ROI Esperado</p>
                <p className="text-dash-accent font-medium text-sm">{service.roiEst}</p>
              </div>
            </div>

            {service.deliverables && (
              <div className="bg-[#0f0f0f] rounded p-4 border border-dash-border mb-6">
                <h4 className="text-[10px] font-black text-white uppercase tracking-wider mb-2">Protocolo de Entrega</h4>
                <div className="space-y-2 text-xs">
                  <p className="flex flex-col">
                    <span className="text-brand font-bold">Contrato SLA:</span>
                    <span className="text-zinc-400">{service.deliverables.contract}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-brand font-bold">Propuesta:</span>
                    <span className="text-zinc-400">{service.deliverables.proposal}</span>
                  </p>
                  <p className="flex flex-col">
                    <span className="text-brand font-bold">Setup y Dossier:</span>
                    <span className="text-zinc-400">{service.deliverables.dossier}</span>
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={() => handleRequestInfo(service.id)}
              disabled={requestSent === service.id}
              className={`w-full py-3 rounded font-bold transition-all flex justify-center items-center ${
                requestSent === service.id
                  ? 'bg-trust text-white cursor-not-allowed'
                  : 'bg-dash-surface-hover border border-dash-border text-white hover:bg-white hover:text-black'
              }`}
            >
              {requestSent === service.id ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Procesando Solicitud...
                </>
              ) : (
                'Solicitar Información / Contratar'
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
