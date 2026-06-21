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
  
  const Icon = IconMap['LayoutDashboard'] || BookOpen;

  return (
    <div className="max-w-5xl mx-auto pb-20 print:pb-0">
      <Link href="/manuals" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-500 hover:text-white transition-colors mb-8 print:hidden bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/20">
        <ArrowLeft size={16} /> Volver al Índice
      </Link>

      <div className="relative bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-14 overflow-hidden shadow-2xl">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <header className="border-b border-white/10 pb-10 mb-10">
          <div className="flex items-start gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-zinc-800/80 border border-white/10 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] text-orange-500 flex-shrink-0 mt-2">
              <Icon size={40} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-[11px] font-black uppercase tracking-widest text-orange-500/90 bg-orange-500/10 px-3 py-1.5 rounded-md inline-block border border-orange-500/20">
                  Administración
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-md border border-white/5">
                  SOP Master Plan
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Centro de Control de Administración
              </h1>
            </div>
          </div>
          <p className="text-zinc-400 text-sm font-bold flex items-center gap-3 bg-black/30 w-fit px-4 py-2 rounded-lg border border-white/5">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]"></span>
            Estado del Protocolo: ACTIVO &nbsp;<span className="text-zinc-600">|</span>&nbsp; Acceso: K-ADMIN LEVEL
          </p>
        </header>

        <div className="prose prose-invert prose-orange max-w-none 
          prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight 
          prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-h2:text-zinc-100
          prose-h3:text-xl prose-h3:text-orange-500/90 prose-h3:mt-8 prose-h3:mb-4
          prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:text-lg
          prose-li:text-zinc-300 prose-li:text-lg prose-li:marker:text-orange-500
          prose-strong:text-white prose-strong:font-bold
          prose-code:text-orange-400 prose-code:bg-orange-400/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none
          print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black print:prose-li:text-black" 
          dangerouslySetInnerHTML={{ __html: "\n      <h2>1. Autenticación y Layout Master</h2>\n      <p>El archivo `src/app/admin-architect/layout.tsx` emplea la función `createClient()` de `@supabase/ssr` para realizar una verificación server-side. Si el `user.email` no incluye explícitamente `klar`, el componente ejecuta un `router.push('/dashboard')`. Esto blinda todas las rutas anidadas.</p>\n\n      <h2>2. Creative Factory B2B (`/admin-architect/creative/page.tsx`)</h2>\n      <p>Esta es la herramienta más poderosa del sistema interno. Su funcionamiento se basa en inyección de contexto:</p>\n      <ol>\n        <li>Se carga el listado de clientes directamente desde la tabla `profiles`.</li>\n        <li>Al seleccionar un cliente del dropdown, el estado `selectedClient` se actualiza con su UUID.</li>\n        <li>El componente hijo (`AgentChat.tsx` o el visualizador de campañas) recibe este UUID a través del prop `targetUserId`.</li>\n        <li>En lugar de leer la propia sesión de Admin, el sistema consulta en `creative_chats` y `creative_campaigns` filtrando por `profile_id = targetUserId`.</li>\n      </ol>\n      <p>Esto permite \"espiar\" y auditar la estrategia que el Agente IA le está sugiriendo al cliente en tiempo real.</p>\n\n      <h2>3. Kanban Pipeline (`/admin-architect/pipeline`)</h2>\n      <p>Tablero de operaciones drag-and-drop renderizado vía Tailwind y estado de React. Se utiliza para medir los tiempos de Setup Técnico (montaje de ads, integraciones Kommo) y garantizar la retención de clientes Growth Partner.</p>\n    " }}>
        </div>
      </div>
    </div>
  );
}