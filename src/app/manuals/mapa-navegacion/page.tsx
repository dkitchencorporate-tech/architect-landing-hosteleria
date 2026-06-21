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
                  Directorio
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-md border border-white/5">
                  SOP Master Plan
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Mapa Integral de Navegación
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
          dangerouslySetInnerHTML={{ __html: "\n      <h2>1. Directorio Público y Rutas de Conversión (Front-End)</h2>\n      <p>Las siguientes rutas están abiertas al público y forman el embudo principal de adquisición B2B:</p>\n      <ul>\n        <li><strong><code>/</code> (Home):</strong> Raíz del proyecto. Renderiza el layout principal de la Landing Page (`src/app/page.tsx`). Destinado a la conversión inicial.</li>\n        <li><strong><code>/auth/login</code> & <code>/auth/register</code>:</strong> Formularios y flujos OAuth. Protegidos parcialmente (si el usuario ya tiene sesión, es redirigido mediante middleware).</li>\n        <li><strong><code>/onboarding</code>:</strong> El paso post-registro. El archivo `src/app/onboarding/page.tsx` captura los metadatos del restaurante (tipo, capacidad, facturación) y actualiza la tabla `profiles`.</li>\n      </ul>\n\n      <h2>2. Dashboard del Cliente (Client Zone)</h2>\n      <p>Rutas ubicadas bajo `src/app/dashboard/`. Están protegidas por el cliente SSR de Supabase. El archivo clave de protección es `src/app/dashboard/layout.tsx` que fuerza el re-enrutamiento a `/auth/login` si la sesión (`createClient().auth.getUser()`) es inválida.</p>\n      <ul>\n        <li><strong><code>/dashboard</code>:</strong> Overview. Renderiza los componentes `TrafficMonitor.tsx` y `LiveMonitor.tsx`.</li>\n        <li><strong><code>/dashboard/events</code>:</strong> Renderiza `EventsLibrary.tsx`. Cruza la tabla `master_events` con `client_events` (relacionadas por `event_id`) para mostrar los eventos desbloqueados o solicitados.</li>\n        <li><strong><code>/dashboard/campaigns</code>:</strong> Historial de campañas, lee directamente de la tabla `creative_campaigns` filtrando por el `profile_id` activo.</li>\n        <li><strong><code>/dashboard/ai-architect</code>:</strong> El chat interactivo con el Agente IA, que invoca a la ruta `/api/creative-factory/agent-chat`.</li>\n      </ul>\n\n      <h2>3. Admin Master Console (Admin Zone)</h2>\n      <p>Rutas bajo `src/app/admin-architect/`. El archivo `src/app/admin-architect/layout.tsx` implementa la regla de negocio crítica: <code>data?.user?.email?.includes('klar')</code>. Solo tú, el administrador, pasas este filtro.</p>\n      <ul>\n        <li><strong><code>/admin-architect/overview</code>:</strong> Vista global de negocio. Lee directamente de `profiles` para contar restaurantes registrados.</li>\n        <li><strong><code>/admin-architect/creative</code>:</strong> Creative Factory. Contiene el selector de clientes que inyecta un `targetUserId` dinámico para que el componente `AgentChat` lea la tabla `creative_chats` pero del cliente seleccionado.</li>\n        <li><strong><code>/admin-architect/events-master</code>:</strong> Permite visualizar los eventos globales inyectados (por ejemplo, vía `seed_events.mjs`).</li>\n        <li><strong><code>/admin-architect/pipeline</code>:</strong> Tablero Kanban renderizado desde `src/app/admin-architect/pipeline/page.tsx`.</li>\n      </ul>\n    " }}>
        </div>
      </div>
    </div>
  );
}