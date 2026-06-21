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
                Seguridad
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                Configuración de Seguridad y OAuth
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
          print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black print:prose-li:text-black" dangerouslySetInnerHTML={{ __html: "\n      <h2>1. Google Cloud Platform (GCP)</h2>\n      <p>La integración OAuth permite el acceso con un solo clic usando cuentas de Google. El flujo configurado exige:</p>\n      <ul>\n        <li>Alta del proyecto en Google Cloud Console.</li>\n        <li>Configuración de la Pantalla de Consentimiento (Scope: email, profile).</li>\n        <li>Creación de Credenciales (Client ID y Client Secret).</li>\n      </ul>\n\n      <h2>2. Integración en Supabase</h2>\n      <p>En el panel de Supabase > Authentication > Providers, se habilitó Google inyectando las credenciales de GCP. Esto delega la responsabilidad de seguridad en los servidores de Google y Supabase.</p>\n\n      <h2>3. Bloqueo de Rutas (Middleware y Layouts)</h2>\n      <p>Next.js gestiona la seguridad interceptando las peticiones a rutas protegidas. Si un usuario sin sesión o sin el email <code>klarx94@...</code> intenta acceder a <code>/admin-architect</code> o <code>/manuals</code>, será redirigido o bloqueado instantáneamente.</p>\n    " }}>
        </div>
      </div>
    </div>
  );
}