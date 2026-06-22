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
  
  const Icon = IconMap['Target'] || BookOpen;

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
                  Operaciones Comerciales
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 bg-zinc-800/50 px-3 py-1.5 rounded-md border border-white/10 shadow-inner">
                  Enterprise-Grade SOP
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-md border border-blue-500/20 shadow-inner">
                  Strict Confidential
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1]">
                Estrategia de Ventas y Economía Unitaria B2B (Master Plan)
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-6">
            <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest flex items-center gap-3 bg-black/50 px-4 py-2.5 rounded-lg border border-white/5">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]"></span>
              Documento Activo
            </p>
            <p className="text-zinc-500 text-xs font-mono bg-black/30 px-3 py-2 rounded-lg border border-white/5">
              ID: ARCH-X2PF98
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
          dangerouslySetInnerHTML={{ __html: "\n      <h2>1. Executive Summary</h2>\n      <p>Este documento es la columna vertebral comercial del proyecto corporativo. Architect.Sys no vende \"software\", vende \"infraestructura de facturación\" a dueños de restaurantes. Todo el código fuente de <code>src/app/page.tsx</code> y sus componentes está matemáticamente orquestado para calificar la psicología del comprador, minimizar la objeción de precio y anclar contratos de <strong>Infraestructura Base (700€)</strong> y suscripciones recurrentes <strong>Growth Partner (299€/mes)</strong> con <strong>Soporte Premium IA (69€/mes)</strong>.</p>\n\n      <h2>2. Ingeniería Psicométrica del Embudo (Code-To-Sale)</h2>\n      <p>La Landing Page implementa una estructura clásica de *Consultative Selling* empaquetada en un flujo digital:</p>\n      \n      <h3>2.1. Diagnosis y Dolor (Pain Points)</h3>\n      <p>Implementado en <code>src/components/sections/TheTrojanHorse.tsx</code>. Rompe la mentalidad de gasto mensual en plataformas extractivas comparando el desperdicio con la inversión de construir activos propios. El objetivo de esta sección de código es crear una \"disruptura cognitiva\" que prepare al usuario para el ancla principal.</p>\n\n      <h3>2.2. Valor Irresistible y Urgencia (Bonos)</h3>\n      <p>Implementado en <code>src/components/sections/ConsultingModal.tsx</code>. El flujo no permite \"Comprar ahora\" de forma genérica; en su lugar, exige dejar los datos para asegurar <strong>Bonos Estratégicos valorados en 980€</strong> y elegir la hora de una consultoría gratuita, implementando un sesgo de exclusividad y urgencia.</p>\n\n      <h3>2.3. Economía del Precio Ancla (Pricing Strategy)</h3>\n      <p>Implementado en <code>src/components/sections/EventLibraryHook.tsx</code> y <code>HighTicketEcosystem.tsx</code>. <br/>\n      Se establece una estructura de capas:<br/>\n      - <strong>Base Operativa (700€, fraccionable en 2 cuotas de 350€):</strong> Elimina la barrera de entrada al negocio.<br/>\n      - <strong>Soporte Premium IA (69€/mes):</strong> Coste mínimo que el cliente percibe como ridículo en comparación a su valor (ahorro de recepcionistas/camareros).<br/>\n      - <strong>Socio Growth (299€/mes):</strong> El plan premium que perdona la cuota de mantenimiento de 69€, anclando psicológicamente el valor del sistema completo frente a las agencias tradicionales.</p>\n\n      <h2>3. Instrucciones Operativas (SOP) para Analistas y A/B Testing</h2>\n      <div class=\"bg-blue-500/10 border border-blue-500/20 p-6 rounded-xl mt-6\">\n        <h4 class=\"text-blue-500 font-bold mb-2\">Manipulación de Variables de Conversión</h4>\n        <ul class=\"text-zinc-300 text-sm list-disc pl-4 space-y-2\">\n          <li><strong>Regla 3.1:</strong> Las modificaciones a copys (textos) dentro de la Landing solo deben hacerse previo Test A/B estadísticamente significativo. Un Agente IA nunca debe alterar la oferta monetaria (Ej. bajar el Base de 700€ o el Growth de 299€) sin autorización administrativa explícita del K-Admin.</li>\n          <li><strong>Regla 3.2:</strong> Las integraciones futuras con pasarelas (Stripe) requerirán validar la sesión previa de Supabase para enlazar el <code>stripe_customer_id</code> al <code>profile_id</code> de la tabla <code>profiles</code>.</li>\n        </ul>\n      </div>\n\n      <h2>4. Expansión Comercial (Conclusión)</h2>\n      <p>El diseño del embudo sostiene un CAC (Customer Acquisition Cost) proyectado altamente rentable. Salvando <strong>solo 1 mesa de 4 personas al mes</strong>, el sistema de 69€/mes se paga solo. El resto es beneficio limpio a la caja del restaurante. La modificación del código en esta área no es un tema estético, es un impacto directo en el P&L (Profit & Loss) de la compañía.</p>\n    " }}>
        </article>
      </div>
    </div>
  );
}