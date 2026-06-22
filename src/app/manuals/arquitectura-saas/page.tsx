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
                  Base de Datos
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-white/10 shadow-inner">
                  Enterprise-Grade SOP
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-md border border-blue-500/20 shadow-inner">
                  Strict Confidential
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                Arquitectura Serverless Multi-Tenant (Master Plan)
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-3 bg-black/50 px-4 py-2.5 rounded-lg border border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]"></span>
              Documento Activo
            </p>
            <p className="text-zinc-500 text-xs font-mono bg-black/30 px-3 py-2 rounded-lg border border-white/5">
              ID: ARCH-VDUIWA
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
          dangerouslySetInnerHTML={{ __html: "\n      <h2>1. Executive Summary</h2>\n      <p>Architect.Sys no es una web tradicional; es una infraestructura SaaS distribuida, diseñada sobre arquitectura Serverless (Next.js + Vercel) y bases de datos relacionales en la nube con PostgreSQL (Supabase). Esta decisión técnica garantiza la escalabilidad horizontal automatizada, permitiendo que la plataforma soporte picos de tráfico masivos durante campañas de Ads sin que el costo de servidores fijos afecte el margen bruto (Gross Margin) del modelo de negocio B2B High-Ticket.</p>\n\n      <h2>2. Modelado de Datos Distribuido (PostgreSQL Schema)</h2>\n      <p>El núcleo transaccional reside en la migración <code>20260621000001_create_creative_tables.sql</code>, diseñada bajo un modelo Multi-Tenant.</p>\n      \n      <h3>2.1. Tablas Core:</h3>\n      <dl class=\"space-y-4\">\n        <div>\n          <dt class=\"font-bold text-white bg-zinc-800 px-3 py-1 rounded inline-block\">1. auth.users & public.profiles</dt>\n          <dd class=\"mt-2 pl-4 border-l-2 border-orange-500/50\">La tabla <code>profiles</code> hereda el UUID de la tabla de identidades de Supabase mediante un trigger atómico (<code>handle_new_user</code>). Contiene los atributos de negocio: <code>restaurant_type</code>, <code>monthly_revenue</code>, <code>seating_capacity</code> y el <code>saas_plan</code>. Es el cimiento para calcular la Economía Unitaria de cada cuenta.</dd>\n        </div>\n        <div>\n          <dt class=\"font-bold text-white bg-zinc-800 px-3 py-1 rounded inline-block\">2. public.master_events & public.client_events</dt>\n          <dd class=\"mt-2 pl-4 border-l-2 border-orange-500/50\">El catálogo centralizado de servicios. <code>master_events</code> almacena JSONBs complejos con los entregables y roles técnicos de la agencia y el cliente. <code>client_events</code> actúa como tabla relacional muchos-a-muchos, rastreando los estados de despliegue (bloqueado, solicitado, activo) mediante el enum de PostgreSQL.</dd>\n        </div>\n        <div>\n          <dt class=\"font-bold text-white bg-zinc-800 px-3 py-1 rounded inline-block\">3. public.creative_chats</dt>\n          <dd class=\"mt-2 pl-4 border-l-2 border-orange-500/50\">Persistencia del motor de IA. Emplea la columna <code>conversation_history</code> de tipo <strong>JSONB</strong>. Esta elección arquitectónica es vital: permite la inserción O(1) y la actualización parcial (JSON_APPEND) sin la sobrecarga de consultas JOIN complejas, garantizando inferencias sub-segundo incluso en historiales de chat kilométricos.</dd>\n        </div>\n      </dl>\n\n      <h2>3. Instrucciones Operativas (SOP) para Base de Datos</h2>\n      <div class=\"bg-orange-500/10 border border-orange-500/20 p-6 rounded-xl mt-6\">\n        <h4 class=\"text-orange-500 font-bold mb-2\">Protocolos de Riesgo y Modificación de Schema</h4>\n        <ul class=\"text-zinc-300 text-sm list-disc pl-4 space-y-2\">\n          <li><strong>Regla 3.1: Mapeo Inmutable.</strong> Los campos de JSONB nunca deben parsearse sin un bloque <code>try/catch</code> estricto en Next.js. Si una IA corrompe un bloque JSON de chat, el frontend crasheará si no se provee un Fallback (Array vacío).</li>\n          <li><strong>Regla 3.2: Row Level Security (RLS).</strong> En el despliegue futuro hacia clientes de terceros, toda tabla debe habilitar políticas RLS para evitar que un <code>profile_id</code> lea los datos o campañas generadas por la competencia comercial.</li>\n          <li><strong>Regla 3.3: Migraciones UP/DOWN.</strong> Prohibido ejecutar <code>ALTER TABLE</code> de forma directa en producción. Se debe crear un archivo <code>.sql</code> de migración en la carpeta <code>supabase/migrations</code>.</li>\n        </ul>\n      </div>\n\n      <h2>4. Mantenimiento y Escalabilidad Futura (Conclusión)</h2>\n      <p>El cuello de botella de esta arquitectura recaerá en la tabla <code>creative_chats</code> a medida que los tokens procesados superen los 100 Millones. El plan de escalabilidad involucra particionar la tabla mensualmente (Table Partitioning) y vaciar los JSONB antiguos a un almacenamiento en frío (AWS S3 / Supabase Storage), manteniendo solo el contexto de los últimos 30 días en caché en memoria.</p>\n    " }}>
        </article>
      </div>
    </div>
  );
}