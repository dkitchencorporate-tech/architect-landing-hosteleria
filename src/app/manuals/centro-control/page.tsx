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
                  Auditoría y RevOps
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-white/10 shadow-inner">
                  Enterprise-Grade SOP
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-md border border-blue-500/20 shadow-inner">
                  Strict Confidential
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                Centro de Mando Operacional y Compliance (Master Plan)
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-3 bg-black/50 px-4 py-2.5 rounded-lg border border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]"></span>
              Documento Activo
            </p>
            <p className="text-zinc-500 text-xs font-mono bg-black/30 px-3 py-2 rounded-lg border border-white/5">
              ID: ARCH-NDHVTJ
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
          dangerouslySetInnerHTML={{ __html: "\n      <h2>1. Executive Summary</h2>\n      <p>El módulo <code>/admin-architect</code> representa la capa de Governance C-Level. Las cuentas B2B corporativas requieren una revisión exhaustiva de sus implementaciones, gestión de calidad del servicio y visualización del Pipeline (Revenue Operations). Este entorno está sellado criptográficamente y es el corazón desde el cual tú (K-Admin) controlas el imperio de datos sin interactuar con interfaces limitadas de cliente.</p>\n\n      <h2>2. Arquitectura de Submódulos Administrativos</h2>\n      <h3>2.1. Creative Factory (El Panóptico Estratégico)</h3>\n      <p>Ubicado en <code>/admin-architect/creative</code>. Es la obra maestra de auditoría técnica. En lugar de ver el panel genérico de IA, el Admin dispone de un <strong>Selector de Entidades</strong>. Al cambiar el dropdown (eligiendo el Restaurante de Juan o el Bar de María):</p>\n      <ul>\n        <li>El componente altera dinámicamente un prop de React: <code>targetUserId</code>.</li>\n        <li>Los hooks de base de datos se re-hidratan apuntando a los registros JSONB de <code>creative_chats</code> y <code>creative_campaigns</code> vinculados a ESE cliente.</li>\n        <li><strong>Resultado:</strong> Capacidad de visualizar, auditar y corregir (Impersonate) la dirección estratégica de cada cliente, garantizando la promesa de valor (Quality Assurance).</li>\n      </ul>\n\n      <h3>2.2. Kanban Pipeline (Gestión de Despliegues)</h3>\n      <p>El tablero <code>/admin-architect/pipeline</code> gestiona los estados logísticos del Onboarding técnico (Ej: \"Conexión con Meta\", \"Webhook de Kommo activo\", \"Pixel instalado\"). Centraliza la entrega del servicio (Fulfillment) eliminando la dependencia de herramientas externas como Trello o Asana.</p>\n\n      <h2>3. Instrucciones Operativas (SOP) de Compliance</h2>\n      <div class=\"bg-orange-500/10 border border-orange-500/20 p-6 rounded-xl mt-6\">\n        <h4 class=\"text-orange-500 font-bold mb-2\">Protocolos de Riesgo y Manipulación de Identidad</h4>\n        <ul class=\"text-zinc-300 text-sm list-disc pl-4 space-y-2\">\n          <li><strong>Regla 3.1: IAM Semántica Estricta.</strong> El código actual valida en el <code>layout.tsx</code> si <code>data.user.email.includes('klar')</code>. Si un desarrollador futuro altera este string o lo elimina por error, todo el panel de administración quedará expuesto al internet público. <strong>Prohibido modificar este condicional sin un sistema de RBAC alterno activo.</strong></li>\n          <li><strong>Regla 3.2: Exportación de Datos.</strong> La manipulación de los registros de <code>profiles</code> a CSV o endpoints externos requerirá validaciones Service-to-Service (Tokens de portador).</li>\n        </ul>\n      </div>\n\n      <h2>4. Mantenimiento del Imperio (Conclusión)</h2>\n      <p>El diseño del Centro de Mando asume que las operaciones de la agencia crecerán de forma vertical. A futuro, se crearán submódulos que mostrarán tableros de métricas P&L consolidadas y métricas de consumo de tokens LLM por cada cliente para auditar la rentabilidad granular de cada cuenta High-Ticket.</p>\n    " }}>
        </article>
      </div>
    </div>
  );
}