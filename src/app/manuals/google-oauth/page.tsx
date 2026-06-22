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
                  Ciberseguridad B2B
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-white/10 shadow-inner">
                  Enterprise-Grade SOP
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-md border border-blue-500/20 shadow-inner">
                  Strict Confidential
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                Arquitectura Zero-Trust, Seguridad y OAuth (Master Plan)
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-3 bg-black/50 px-4 py-2.5 rounded-lg border border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]"></span>
              Documento Activo
            </p>
            <p className="text-zinc-500 text-xs font-mono bg-black/30 px-3 py-2 rounded-lg border border-white/5">
              ID: ARCH-4M9FT9
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
          dangerouslySetInnerHTML={{ __html: "\n      <h2>1. Executive Summary</h2>\n      <p>La seguridad no es una capa superficial en Architect.Sys; es el perímetro fundacional. Procesamos datos confidenciales corporativos de restaurantes (Facturación, Capacidad, Estrategias de Mercado B2B). La decisión de migrar de autenticaciones básicas a <strong>Google OAuth</strong> vía Supabase bajo una arquitectura <strong>Zero-Trust</strong> garantiza auditorías limpias para estándares ISO/SOC2 futuros, previniendo fuga de datos (Data Leaks) y secuestro de sesiones.</p>\n\n      <h2>2. Ingeniería del Protocolo de Autenticación</h2>\n      <h3>2.1. Intercambio de Tokens OAuth 2.0</h3>\n      <p>El flujo en <code>/auth/login</code> desencadena la invocación a <code>signInWithOAuth()</code>. Esto transfiere la responsabilidad de verificación de identidad criptográfica a los servidores de Google Cloud Platform (GCP). Tras el OK, Supabase genera un JSON Web Token (JWT) firmado para la sesión.</p>\n\n      <h3>2.2. Gestión SSR (Server-Side Rendering) de Cookies</h3>\n      <p>El antiguo modelo guardaba JWTs en el <code>localStorage</code> del navegador. Este vector es vulnerable a <strong>Cross-Site Scripting (XSS)</strong>. El proyecto se ha refactorizado con la librería <code>@supabase/ssr</code>, implementando el archivo maestro <code>src/lib/supabase-server.ts</code>.</p>\n      <ul>\n        <li>Los tokens residen en cookies HttpOnly (o manejadas por SSR).</li>\n        <li>Los Layouts en Next.js (Server Components) leen directamente las cabeceras de red antes de enviar un solo byte de HTML al usuario, interceptando a los intrusos de forma instantánea.</li>\n      </ul>\n\n      <h2>3. Instrucciones Operativas (SOP) de Seguridad Integral</h2>\n      <div class=\"bg-red-500/10 border border-red-500/20 p-6 rounded-xl mt-6\">\n        <h4 class=\"text-red-500 font-bold mb-2\">Protocolo de Desastre y Variables Clasificadas</h4>\n        <ul class=\"text-zinc-300 text-sm list-disc pl-4 space-y-2\">\n          <li><strong>Regla 3.1: Service Key.</strong> La <code>SUPABASE_SERVICE_KEY</code> tiene privilegios de superusuario que ignoran el Row Level Security (RLS) en Postgres. NUNCA debe incluirse en un archivo con la directiva <code>'use client'</code> ni prefijarse con <code>NEXT_PUBLIC_</code>. Un commit que exponga esta clave resultará en un compromiso total del SaaS.</li>\n          <li><strong>Regla 3.2: Rotación de Secretos.</strong> En caso de intrusión sospechosa, el procedimiento es: (1) Entrar al panel de Supabase y rotar la llave de proyecto. (2) Entrar a Vercel Settings y actualizar el entorno. (3) Ejecutar <code>vercel --prod</code> para invalidar el caché global en Edge.</li>\n          <li><strong>Regla 3.3: Prevención de Crawlers.</strong> Las rutas de <code>/admin-architect</code> y <code>/dashboard</code> deben estar siempre excluidas en la instrucción de <code>robots.txt</code> para evitar el mapeo forzado por arañas web ajenas.</li>\n        </ul>\n      </div>\n\n      <h2>4. Certificación y Escala (Conclusión)</h2>\n      <p>Este nivel de seguridad es lo que diferencia a una \"herramienta freelancer\" de un \"Software Empresarial\". Al mantener sesiones basadas en cookies y flujos OAuth duros, Architect.Sys puede pasar por filtros técnicos complejos de departamentos de TI en grandes cadenas hoteleras o franquicias sin objeciones de cumplimiento.</p>\n    " }}>
        </article>
      </div>
    </div>
  );
}