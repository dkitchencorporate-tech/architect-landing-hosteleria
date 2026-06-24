'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, Database, Target, Users, Bot, LayoutDashboard, ShieldCheck, Palette, Rocket } from 'lucide-react';

export default function ManualsIndex() {
  const manuals = [
    {
      title: '1. Mapa Integral de Navegación',
      description: 'Directorio completo de todos los enlaces y rutas de Architect.Sys, incluyendo los niveles de acceso (Admin vs Client).',
      href: '/manuals/mapa-navegacion',
      date: 'Actualizado Hoy',
      tag: 'Directorio',
      icon: BookOpen
    },
    {
      title: '2. Arquitectura SaaS y Base de Datos',
      description: 'Esquema completo en Supabase, tablas de eventos, reglas RLS y gestión de despliegues continuos (Vercel CLI).',
      href: '/manuals/arquitectura-saas',
      date: 'Actualizado Hoy',
      tag: 'Infraestructura',
      icon: Database
    },
    {
      title: '3. Embudos de Venta y Estrategia B2B',
      description: 'Lógica comercial de la Landing Page, justificación de planes High-Ticket (Base vs Growth) y posicionamiento.',
      href: '/manuals/estrategia-ventas',
      date: '12 Junio 2026',
      tag: 'Ventas',
      icon: Target
    },
    {
      title: '4. Onboarding de Clientes B2B',
      description: 'Flujo post-compra, recopilación de datos del restaurante, persistencia de perfiles y despliegue del catálogo de eventos.',
      href: '/manuals/onboarding-b2b',
      date: '12 Junio 2026',
      tag: 'Operaciones',
      icon: Users
    },
    {
      title: '5. Agente de Ventas IA (Arqui)',
      description: 'Leyes operativas del asistente conversacional, integraciones con Kommo CRM, y Creative Factory B2B.',
      href: '/manuals/agente-ia',
      date: 'Actualizado Hoy',
      tag: 'Inteligencia Artificial',
      icon: Bot
    },
    {
      title: '6. Centro de Control de Administración',
      description: 'Manejo del panel de monitoreo, despliegue de clientes, sincronización de la Matriz Generativa y bypass de validación.',
      href: '/manuals/centro-control',
      date: 'Actualizado Hoy',
      tag: 'Administración',
      icon: LayoutDashboard
    },
    {
      title: '7. Configuración de Seguridad y OAuth',
      description: 'Protocolo para autorizar Google OAuth, manejo de roles en Supabase, y validación por Cookies en SSR.',
      href: '/manuals/google-oauth',
      date: 'Actualizado Hoy',
      tag: 'Seguridad',
      icon: ShieldCheck
    },
    {
      title: '8. Escalabilidad: Creative Factory',
      description: 'Roadmap estratégico para escalar la prospección. Generación de imágenes, copies y videos en piloto automático.',
      href: '/manuals/escalabilidad-creative-factory',
      date: 'Actualizado Hoy',
      tag: 'Standby / Vision',
      icon: Palette
    },
    {
      title: '9. Escalado y Ecosistema Whop (V2)',
      description: 'Estrategia para evolucionar de ventas High-Ticket a ingresos recurrentes, red de afiliados y venta de Micro-SaaS B2B.',
      href: '/manuals/escalado-whop',
      date: 'Actualizado Hoy',
      tag: 'Crecimiento',
      icon: Rocket
    }
  ];

  return (
    <div className="space-y-12 print:block relative z-10">
      <div className="flex flex-col items-start justify-between border-b border-white/10 pb-8 mb-8">
        <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-500 tracking-tighter mb-4">
          Índice Operativo Global
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl font-medium leading-relaxed">
          Documentación técnica, protocolos de actuación (SOP) y manuales arquitectónicos de uso exclusivo para administración de <strong className="text-white">Architect.Sys</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-1">
        {manuals.map((manual, idx) => (
          <Link key={idx} href={manual.href} className="block group">
            <div className="relative h-full bg-zinc-900/40 backdrop-blur-md border border-white/5 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-800/50 hover:border-orange-500/30 hover:shadow-[0_0_30px_rgba(249,115,22,0.1)] overflow-hidden">
              
              {/* Decorative gradient blob */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl group-hover:bg-orange-500/10 transition-colors -z-10" />

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-800/80 border border-white/5 flex items-center justify-center flex-shrink-0 group-hover:border-orange-500/20 group-hover:text-orange-500 transition-colors shadow-inner">
                  <manual.icon size={22} className="text-zinc-400 group-hover:text-orange-500 transition-colors" />
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-[10px] font-black uppercase tracking-widest text-orange-500/80 bg-orange-500/10 px-2 py-1 rounded-md mb-2 inline-block">
                      {manual.tag}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-white transition-colors">
                    {manual.title}
                  </h3>
                </div>
              </div>
              
              <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-medium group-hover:text-zinc-300 transition-colors">
                {manual.description}
              </p>
              
              <div className="flex items-center justify-between text-xs text-zinc-500 font-bold border-t border-white/5 pt-4">
                <span>{manual.date}</span>
                <span className="text-orange-500 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 translate-x-2 group-hover:translate-x-0">
                  Leer Manual <span className="text-lg leading-none">→</span>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
