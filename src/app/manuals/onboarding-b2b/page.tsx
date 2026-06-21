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
                Operaciones
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
                Onboarding de Clientes B2B
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
          print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black print:prose-li:text-black" dangerouslySetInnerHTML={{ __html: "\n      <h2>1. El Flujo Post-Pago</h2>\n      <p>Cuando el cliente abona su factura, es redirigido a <code>/onboarding</code>. Aquí se le solicita:</p>\n      <ol>\n        <li>Tipo de Local (Bar, Restaurante, Club).</li>\n        <li>Capacidad de comensales.</li>\n        <li>Facturación Promedio.</li>\n      </ol>\n      <p>Estos datos se inyectan en <strong>Supabase</strong> (Tabla `profiles`) y sirven para condicionar las respuestas del Agente IA posteriormente.</p>\n\n      <h2>2. Despliegue de Eventos Inmediato</h2>\n      <p>Una vez en el Dashboard, el sistema clona virtualmente los 7 eventos maestros (Master Events) hacia el catálogo del cliente. Desde ahí, el cliente puede \"Solicitar\" el despliegue de un evento, el cual cambia su estado en la base de datos y alerta a la agencia.</p>\n\n      <h2>3. Activación de Campañas</h2>\n      <p>En la sección \"Campañas\", el cliente puede requerir anuncios para Facebook o Google. Estos requerimientos alimentan la \"Creative Factory\" en el Master Console del administrador.</p>\n    " }}>
        </div>
      </div>
    </div>
  );
}