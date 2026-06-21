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
  
  const Icon = IconMap['Database'] || BookOpen;

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
                Infraestructura
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                Arquitectura SaaS y Base de Datos
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
          print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black print:prose-li:text-black" dangerouslySetInnerHTML={{ __html: "\n      <h2>1. Infraestructura de Supabase</h2>\n      <p>La aplicación utiliza Supabase como backend-as-a-service principal. Las tablas centrales son:</p>\n      <ul>\n        <li><strong><code>profiles</code>:</strong> Extensión de Auth. Almacena el rol y datos básicos del restaurante.</li>\n        <li><strong><code>master_events</code>:</strong> Catálogo inmutable de los 7 eventos base ofrecidos por la agencia.</li>\n        <li><strong><code>client_events</code>:</strong> Relación N:M que indica qué evento ha desbloqueado o solicitado un cliente.</li>\n        <li><strong><code>creative_chats</code>:</strong> Almacena el historial conversacional con el agente IA por cliente.</li>\n        <li><strong><code>creative_campaigns</code>:</strong> Registra los copies de campañas y matrices generadas.</li>\n      </ul>\n\n      <h2>2. Autenticación Server-Side Rendering (SSR)</h2>\n      <p>Hemos implementado `@supabase/ssr` para un manejo robusto de sesiones. Esto permite que los Layouts de Next.js (App Router) puedan leer las cookies de forma síncrona en el servidor antes de renderizar la UI, evitando los saltos o parpadeos de carga (FOUC).</p>\n\n      <h2>3. Integración y Despliegue (Vercel)</h2>\n      <p>Cada vez que hacemos un push a GitHub, Vercel intercepta el webhook y construye la aplicación. El pipeline de Vercel está configurado con las variables de entorno inyectadas directamente en el panel del proyecto.</p>\n\n      <div class=\"bg-zinc-900/50 border border-white/10 p-6 rounded-xl mt-6\">\n        <h4 class=\"text-white font-bold mb-2\">Comandos Vercel CLI (SOP)</h4>\n        <pre class=\"bg-black/50 p-4 rounded-lg text-sm text-zinc-300 font-mono mt-2 overflow-x-auto\">\nvercel ls             # Lista los despliegues activos\ngit push origin main  # Desencadena un build automático\n        </pre>\n      </div>\n    " }}>
        </div>
      </div>
    </div>
  );
}