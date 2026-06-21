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
  
  const Icon = IconMap['ShieldCheck'] || BookOpen;

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
                  Seguridad
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-md border border-white/5">
                  SOP Master Plan
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Configuración de Seguridad y OAuth
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
          dangerouslySetInnerHTML={{ __html: "\n      <h2>1. El Flujo Google OAuth (GCP -> Supabase -> Next.js)</h2>\n      <p>Hemos desechado el registro manual inseguro para adoptar un estándar corporativo. La implementación precisa:</p>\n      <ul>\n        <li><strong>Google Cloud Platform:</strong> Configuración del Client ID y Secret en la API Console bajo el dominio `architect-landing-hosteleria.vercel.app`.</li>\n        <li><strong>Supabase Auth:</strong> Inserción de credenciales de Google y habilitación de redirección segura.</li>\n        <li><strong>Frontend (`src/app/auth/login/page.tsx`):</strong> El botón de Login ejecuta el método: <br><br><code>await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${location.origin}/auth/callback` } })</code></li>\n      </ul>\n\n      <h2>2. Manejo de Sesión Server-Side (`@supabase/ssr`)</h2>\n      <p>Para evitar la manipulación de sesión en LocalStorage (XSS vulnerable), usamos Cookies. El archivo `src/lib/supabase-server.ts` / `supabase-browser.ts` encapsula las utilidades para leer, establecer y destruir cookies automáticamente. Esta validación es la que permite a `/dashboard/layout.tsx` y `/manuals/layout.tsx` bloquear el acceso antes de renderizar siquiera el DOM visual.</p>\n\n      <div class=\"bg-orange-500/10 border border-orange-500/20 p-6 rounded-xl mt-8\">\n        <h4 class=\"text-orange-500 font-bold mb-2 flex items-center gap-2\">\n          <svg class=\"w-5 h-5\" fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z\"></path></svg>\n          Directriz de Seguridad Suprema\n        </h4>\n        <p class=\"text-zinc-300 text-sm\">Nunca debe exponerse la variable <code>SUPABASE_SERVICE_KEY</code> en el Frontend (dentro de archivos expuestos o `NEXT_PUBLIC_`). Esta clave puede bypassar todas las reglas RLS de la base de datos (como se usó en el `seed_events.mjs`). Solo debe usarse en entornos Node o llamadas de servidor seguras.</p>\n      </div>\n    " }}>
        </div>
      </div>
    </div>
  );
}