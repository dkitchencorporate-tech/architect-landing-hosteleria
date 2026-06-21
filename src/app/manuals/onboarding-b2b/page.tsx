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
  
  const Icon = IconMap['Users'] || BookOpen;

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
                  Operaciones
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-md border border-white/5">
                  SOP Master Plan
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Onboarding de Clientes B2B
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
          dangerouslySetInnerHTML={{ __html: "\n      <h2>1. El Código del Flujo (`src/app/onboarding/page.tsx`)</h2>\n      <p>Una vez el cliente se registra vía Google OAuth (`/auth/login`), es redirigido a `/onboarding`. Este componente gestiona un formulario multi-step en React:</p>\n      <ol>\n        <li><strong>Paso 1: Tipo de Local.</strong> Define la identidad del perfil comercial.</li>\n        <li><strong>Paso 2: Aforo y Facturación.</strong> Métricas vitales para calcular ROAS.</li>\n      </ol>\n\n      <h2>2. Inyección a Supabase y Activación</h2>\n      <p>Al presionar \"Completar Onboarding\", el sistema ejecuta una función asíncrona que hace un `UPSERT` en la tabla `profiles`, utilizando el `userId` actual como clave de búsqueda:</p>\n      <pre class=\"bg-black/50 p-4 rounded-lg text-sm text-zinc-300 font-mono mt-2 mb-4 overflow-x-auto whitespace-pre-wrap\">\nconst { error } = await supabase.from('profiles').update({\n  restaurant_type: formData.type,\n  monthly_revenue: formData.revenue,\n  seating_capacity: formData.capacity,\n  is_onboarded: true\n}).eq('id', user.id);\n      </pre>\n\n      <h2>3. Creación del Set Inicial de Eventos</h2>\n      <p>Inmediatamente después de la actualización del perfil, el cliente accede al `/dashboard`. La lógica en `EventsLibrary.tsx` detecta que el cliente es nuevo y lista todos los `master_events` con el estado inicial, listos para ser solicitados.</p>\n    " }}>
        </div>
      </div>
    </div>
  );
}