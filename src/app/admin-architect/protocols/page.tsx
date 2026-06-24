'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, FileSignature, Presentation, ArrowRight } from 'lucide-react';

export default function ProtocolsPage() {
  const protocols = [
    {
      title: 'Propuesta Comercial (Pitch)',
      description: 'Genera una propuesta en PDF para enviar después de la primera llamada. Incluye dolores, solución (Arquitectura + Growth), bonos y precio anclado.',
      href: '/admin-architect/protocols/proposal',
      icon: Presentation,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10'
    },
    {
      title: 'Contrato de Servicio (SLA)',
      description: 'Genera el acuerdo legal. Incluye protección de datos (RGPD), cláusulas de cancelación, derechos de autor y responsabilidades.',
      href: '/admin-architect/protocols/contract',
      icon: FileSignature,
      color: 'text-orange-400',
      bg: 'bg-orange-400/10'
    },
    {
      title: 'Dossier de Trabajo (Onboarding)',
      description: 'Hoja de ruta de 30 días para el cliente recién cerrado. Explica qué necesitamos de él y qué entregaremos semana a semana.',
      href: '/admin-architect/protocols/dossier',
      icon: FileText,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10'
    }
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-white mb-2">Protocolos Comerciales</h1>
        <p className="text-zinc-400 max-w-2xl">
          Generador automatizado de documentación corporativa. Crea documentos de alto nivel para cerrar ventas y gestionar el ciclo de vida del cliente.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {protocols.map((protocol, i) => (
          <div key={i} className="bg-zinc-900 border border-white/5 rounded-2xl p-6 flex flex-col">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${protocol.bg}`}>
              <protocol.icon size={24} className={protocol.color} />
            </div>
            
            <h3 className="text-lg font-bold text-white mb-2">{protocol.title}</h3>
            <p className="text-sm text-zinc-400 mb-8 flex-1 leading-relaxed">
              {protocol.description}
            </p>
            
            <Link 
              href={protocol.href}
              className="flex items-center justify-between p-4 bg-zinc-950 rounded-xl hover:bg-white/5 transition-colors group border border-white/5"
            >
              <span className="font-bold text-sm text-zinc-300 group-hover:text-white transition-colors">Generar Documento</span>
              <ArrowRight size={16} className="text-zinc-500 group-hover:text-white transition-colors group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
