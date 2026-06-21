'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Database, Target, Users, Bot, LayoutDashboard, ShieldCheck } from 'lucide-react';

export default function ManualPage() {
  const IconMap = {
    BookOpen: BookOpen,
    Database: Database,
    Target: Target,
    Users: Users,
    Bot: Bot,
    LayoutDashboard: LayoutDashboard,
    ShieldCheck: ShieldCheck
  };
  
  const Icon = IconMap['BookOpen'] || BookOpen;

  return (
    <div className="max-w-4xl mx-auto pb-20 print:pb-0">
      <Link href="/manuals" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-white transition-colors mb-8 print:hidden bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/20">
        <ArrowLeft size={16} /> Volver al Índice
      </Link>

      <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -z-10" />
        
        <header className="border-b border-white/10 pb-8 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-white/10 flex items-center justify-center shadow-inner text-orange-500">
              <Icon size={32} />
            </div>
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-orange-500/80 bg-orange-500/10 px-3 py-1 rounded-md mb-2 inline-block">
                Directorio
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                Mapa Integral de Navegación
              </h1>
            </div>
          </div>
          <p className="text-zinc-500 text-sm font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Estado: ACTIVO &nbsp;|&nbsp; Rol Requerido: ADMIN
          </p>
        </header>

        <div className="prose prose-invert prose-orange max-w-none 
          prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight 
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-2
          prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-base
          prose-li:text-zinc-400 prose-li:marker:text-orange-500
          prose-strong:text-zinc-200
          print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black print:prose-li:text-black" dangerouslySetInnerHTML={{ __html: "\n      <h2>1. Directorio Público y Rutas de Conversión</h2>\n      <ul>\n        <li><strong><code>/</code> (Home):</strong> Landing page principal. Diseño High-End, enfocado a captación B2B.</li>\n        <li><strong><code>/onboarding</code>:</strong> Proceso post-registro donde los clientes llenan datos de su restaurante para el CRM.</li>\n      </ul>\n\n      <h2>2. Dashboard del Cliente (Client Zone)</h2>\n      <p>Rutas protegidas por Supabase Auth (solo usuarios logueados):</p>\n      <ul>\n        <li><strong><code>/dashboard</code>:</strong> Vista general del negocio, estadísticas simuladas de CTR e impacto.</li>\n        <li><strong><code>/dashboard/events</code>:</strong> Catálogo interactivo con los 7 eventos maestros (catas, monólogos, etc.).</li>\n        <li><strong><code>/dashboard/campaigns</code>:</strong> Gestor de campañas publicitarias activas e historial de solicitudes.</li>\n        <li><strong><code>/dashboard/ai-architect</code>:</strong> Chat integrado con el agente de IA (Arqui) capaz de generar ideas y guardarlas en Supabase.</li>\n      </ul>\n\n      <h2>3. Admin Master Console (Admin Zone)</h2>\n      <p>Rutas con validación de rol estricta (`isAdmin`). Solo accesible por la cuenta maestra.</p>\n      <ul>\n        <li><strong><code>/admin-architect/overview</code>:</strong> Métricas globales, gestión de clientes (activar/bloquear).</li>\n        <li><strong><code>/admin-architect/creative</code>:</strong> Creative Factory. Visualiza los historiales de IA y campañas de los clientes individuales gracias al selector de Supabase.</li>\n        <li><strong><code>/admin-architect/projects</code>:</strong> Tablero Kanban de seguimiento de integraciones y status de Onboarding.</li>\n      </ul>\n\n      <div class=\"bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl mt-8\">\n        <h4 class=\"text-orange-500 font-bold mb-2\">Nota de Seguridad SSR</h4>\n        <p class=\"text-zinc-400 text-sm\">Todo el ruteo interno está protegido mediante validación de cookies de sesión (`createClient` de SSR) y Middleware en Vercel, impidiendo accesos anónimos a los paneles.</p>\n      </div>\n    " }}>
        </div>
      </div>
    </div>
  );
}