'use client';

import React from 'react';
import { ArrowLeft, Rocket, Users, RefreshCw, ShoppingBag, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function EscaladoWhopV2() {
  return (
    <div className="max-w-4xl mx-auto pb-20 relative z-10">
      <Link href="/manuals" className="inline-flex items-center text-zinc-400 hover:text-white transition-colors mb-8 font-medium">
        <ArrowLeft className="mr-2" size={20} />
        Volver al Índice
      </Link>

      <div className="mb-12 border-b border-white/10 pb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-orange-500/10 text-orange-500 mb-6 border border-orange-500/20 shadow-inner">
          <Rocket size={32} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 tracking-tighter mb-4">
          Plan de Escalado V2: Ecosistema Whop
        </h1>
        <p className="text-xl text-zinc-400 font-medium leading-relaxed">
          Estrategia maestra para evolucionar Architect Sys de una agencia de validación High-Ticket a un ecosistema de software y servicios recurrentes utilizando la infraestructura de Whop.
        </p>
      </div>

      <div className="space-y-12 text-zinc-300 leading-relaxed font-medium">
        
        {/* Intro */}
        <section className="bg-zinc-900/50 backdrop-blur-md border border-white/5 rounded-3xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />
          <h2 className="text-2xl font-bold text-white mb-4">Contexto de la V2</h2>
          <p className="mb-4">
            La Fase 1 (actual) consiste en operar de forma "invisible", utilizando la API de Whop para cerrar ventas High-Ticket mediante contratos personalizados y cobros dinámicos. Esto nos permite validar la oferta y conseguir los primeros 10 clientes sin fricción técnica.
          </p>
          <p>
            Una vez la LLC esté constituida y el negocio esté rodando con beneficios, ejecutaremos la <strong>Fase V2</strong>: transformar a Architect Sys en un Marketplace de Soluciones, aprovechando las herramientas de Whop que actualmente están inactivas.
          </p>
        </section>

        {/* 1. Ingresos Recurrentes (MRR) */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <RefreshCw className="text-orange-500" />
            1. Suscripciones y Retención (MRR)
          </h2>
          <div className="space-y-4">
            <p>
              El verdadero valor de una empresa B2B está en el MRR (Monthly Recurring Revenue). En la V2 dejaremos de depender exclusivamente del "Setup Fee".
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li><strong>Mantenimiento y Soporte Evolutivo:</strong> Crearemos planes de suscripción mensual dentro de Whop (ej. 250€/mes).</li>
              <li><strong>Orquestación de Pagos (Dunning):</strong> Si la tarjeta de un restaurante falla, Whop se encargará de enviarle avisos automáticos y suspenderá el acceso a las herramientas hasta que se regularice, eliminando nuestro trabajo de cobranza manual.</li>
            </ul>
          </div>
        </section>

        {/* 2. SaaS y Herramientas Propias */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <ShieldCheck className="text-orange-500" />
            2. Venta de Software (Micro-SaaS)
          </h2>
          <div className="space-y-4">
            <p>
              Architect Sys desarrollará herramientas internas empaquetadas.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li><strong>Integración OAuth:</strong> Los restaurantes podrán comprar una App nuestra en el marketplace de Whop, iniciar sesión con su cuenta de Whop y acceder al software.</li>
              <li>Whop gestionará la protección de licencias (DRM) y evitará que usuarios no pagadores accedan a la herramienta.</li>
            </ul>
          </div>
        </section>

        {/* 3. Ejército de Afiliados */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <Users className="text-orange-500" />
            3. Red de Afiliación B2B
          </h2>
          <div className="space-y-4">
            <p>
              Activaremos el módulo de afiliados nativo de Whop para crear una red de comerciales descentralizada.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li>Estableceremos una comisión automática (ej. 15% del Setup Fee y 10% del recurrente).</li>
              <li>Consultores gastronómicos, influencers o dueños de restaurantes satisfechos podrán enviar clientes usando un enlace único.</li>
              <li>Whop dividirá el pago en el momento exacto de la compra: 85% para Architect Sys, 15% para el afiliado. Sin facturación manual.</li>
            </ul>
          </div>
        </section>

        {/* 4. Marketplace y Comunidades */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <ShoppingBag className="text-orange-500" />
            4. Info-Productos y Comunidad VIP
          </h2>
          <div className="space-y-4">
            <p>
              Empaquetaremos el conocimiento de la agencia en productos digitales.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-400">
              <li>Venta de guías, plantillas operativas, o prompts de IA específicos para hostelería directamente alojados en Whop.</li>
              <li>Creación de una <strong>Comunidad Privada</strong> (vía Discord o Telegram) para dueños de restaurantes. Whop sincroniza los roles y expulsa automáticamente a los miembros que cancelen su membresía.</li>
            </ul>
          </div>
        </section>

      </div>
    </div>
  );
}
