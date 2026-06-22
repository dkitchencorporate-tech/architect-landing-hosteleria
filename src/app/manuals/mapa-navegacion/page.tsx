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
        <ArrowLeft size={16} /> Volver a los SOPs Maestros
      </Link>

      <div className="relative bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-14 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)]">
        {/* Glow Corporativo */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] -z-10 pointer-events-none" />
        
        <header className="border-b border-white/10 pb-10 mb-10">
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center shadow-[inset_0_0_30px_rgba(255,165,0,0.05)] text-orange-500 flex-shrink-0 mt-2">
              <Icon size={48} strokeWidth={1.5} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-400 bg-orange-500/10 px-3 py-1.5 rounded-md border border-orange-500/20">
                  Arquitectura Frontend
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-white/10 shadow-inner">
                  Enterprise-Grade SOP
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-md border border-blue-500/20 shadow-inner">
                  Strict Confidential
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                Topología de Red y Enrutamiento B2B (Master Plan)
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-3 bg-black/50 px-4 py-2.5 rounded-lg border border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]"></span>
              Documento Activo
            </p>
            <p className="text-zinc-500 text-xs font-mono bg-black/30 px-3 py-2 rounded-lg border border-white/5">
              ID: ARCH-0UVEF5
            </p>
          </div>
        </header>

        <article className="prose prose-invert prose-orange max-w-none 
          prose-headings:text-white prose-headings:font-black prose-headings:tracking-tight 
          prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-6 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4 prose-h2:text-zinc-100
          prose-h3:text-2xl prose-h3:text-zinc-300 prose-h3:mt-10 prose-h3:mb-5 prose-h3:font-bold
          prose-p:text-zinc-400 prose-p:leading-relaxed prose-p:text-lg
          prose-li:text-zinc-400 prose-li:text-lg prose-li:marker:text-orange-500
          prose-strong:text-zinc-200 prose-strong:font-bold
          prose-code:text-orange-300 prose-code:bg-orange-900/20 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-code:border prose-code:border-orange-500/20
          print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black print:prose-li:text-black" 
          dangerouslySetInnerHTML={{ __html: "\n      <h2>1. Executive Summary</h2>\n      <p>Este documento especifica la topología de red y el enrutamiento de Next.js App Router para Architect.Sys. Su diseño no es trivial; constituye un embudo de retención que categoriza el tráfico en tres capas estrictas: Adquisición Pública (Capa 0), Entorno de Cliente Autenticado (Capa 1) y Governance Administrativo (Capa 2). La estructuración correcta asegura tiempos de carga mínimos, mejorando las métricas de retención (LTV) y habilitando un monitoreo exacto del comportamiento comercial.</p>\n\n      <h2>2. Arquitectura de Enrutamiento y Mapeo Lógico</h2>\n      <h3>2.1. Capa 0: Adquisición y Conversión (Public Routes)</h3>\n      <p>Rutas diseñadas para la captación de leads fríos, tráfico pagado (Ads) y SEO B2B. Los tiempos de Time-To-First-Byte (TTFB) están optimizados mediante Server Components en la raíz.</p>\n      <ul>\n        <li><strong><code>src/app/page.tsx</code>:</strong> Epicentro del embudo de ventas. Carga componentes estáticos críticos como el <code>Hero.tsx</code> y el <code>CreativeShowcase.tsx</code>, optimizando Web Vitals.</li>\n        <li><strong><code>src/app/auth/login/page.tsx</code> & <code>register/page.tsx</code>:</strong> Endpoints de la API de Identidad (Supabase Auth). Emplean redirecciones seguras para evitar secuestros de sesión en la primera iteración de onboarding.</li>\n      </ul>\n\n      <h3>2.2. Capa 1: Entorno Multi-Tenant B2B (Protected Client Routes)</h3>\n      <p>Rutas que manejan los flujos operativos de cuentas de pago (Restaurantes). Requieren un token de sesión válido inyectado en las cabeceras HTTP de la petición.</p>\n      <ul>\n        <li><strong><code>src/app/dashboard/layout.tsx</code>:</strong> El guardián perimetral. Antes de montar la vista, lee las cookies y si el JWT expira o es inválido, redirige. Elimina el \"flicker\" de carga que ocurre en SPAs obsoletas.</li>\n        <li><strong><code>src/app/dashboard/events/page.tsx</code>:</strong> Punto de consumo de la base de datos de eventos <code>master_events</code> cruzada con <code>client_events</code>.</li>\n        <li><strong><code>src/app/dashboard/ai-architect/page.tsx</code>:</strong> Interfaz del motor de inferencia IA.</li>\n      </ul>\n\n      <h3>2.3. Capa 2: Governance y Telemetría Administrativa (K-Admin Level)</h3>\n      <p>El núcleo de operaciones. Oculto para la red global y blindado por validación de Identity Access Management (IAM).</p>\n      <ul>\n        <li><strong><code>src/app/admin-architect/layout.tsx</code>:</strong> Middleware a nivel de layout que exige una validación semántica (presencia del identificador admin \"klar\").</li>\n        <li><strong><code>/admin-architect/creative</code>:</strong> Módulo de auditoría de inferencia IA. Permite *impersonation* técnico inyectando un <code>targetUserId</code> específico.</li>\n        <li><strong><code>/admin-architect/pipeline</code>:</strong> Tablero de control de Operaciones (RevOps) que permite el seguimiento físico y virtual de implementaciones técnicas (Kommo, Meta Ads).</li>\n      </ul>\n\n      <h2>3. Instrucciones Operativas (SOP) para Agentes IA y Desarrolladores</h2>\n      <div class=\"bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl mt-6\">\n        <h4 class=\"text-blue-500 font-bold mb-2\">Directrices de Contribución de Enrutamiento</h4>\n        <ul class=\"text-zinc-300 text-sm list-disc pl-4 space-y-2\">\n          <li><strong>Regla 3.1:</strong> Nunca agregar un endpoint API en <code>/api</code> sin un middleware de autorización a menos que sea un webhook validado mediante HMAC.</li>\n          <li><strong>Regla 3.2:</strong> No usar <code>localStorage</code> para proteger rutas. Todas las verificaciones deben emplear <code>@supabase/ssr</code> en el servidor (Layout o Page).</li>\n          <li><strong>Regla 3.3:</strong> Al crear una nueva ruta de cliente, debe residir siempre dentro del directorio <code>(dashboard)/</code> para heredar la protección de Capa 1 automáticamente.</li>\n        </ul>\n      </div>\n\n      <h2>4. Escalabilidad y Futuro (Conclusión)</h2>\n      <p>Actualmente el enrutamiento soporta +10,000 conexiones concurrentes sin penalización de latencia gracias a la CDN Global de Vercel. A medida que escalemos, el siguiente paso será migrar los layouts de protección a un <code>middleware.ts</code> real en el Edge Network, lo que reducirá los tiempos de redirección de usuarios no autenticados a sub-50 milisegundos en todo el mundo.</p>\n    " }}>
        </article>
      </div>
    </div>
  );
}