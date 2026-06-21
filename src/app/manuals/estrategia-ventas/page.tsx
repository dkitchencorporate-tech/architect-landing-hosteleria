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
                  Ventas
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-md border border-white/5">
                  SOP Master Plan
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-tight">
                Embudos de Ventas y Estrategia B2B
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
          dangerouslySetInnerHTML={{ __html: "\n      <h2>1. Estructura Persuasiva del Front-End</h2>\n      <p>La Landing Page (`src/app/page.tsx`) no es un simple diseño; es un embudo psicológico codificado en secciones:</p>\n      <ul>\n        <li><strong>Hero Section (`src/components/Hero.tsx`):</strong> Promesa de valor radical y CTA principal hacia el onboarding.</li>\n        <li><strong>Pain Points (`src/components/PainPoints.tsx`):</strong> Diagnóstico de mercado (Local vacío, dependencia de reseñas falsas, guerra de precios).</li>\n        <li><strong>Creative Showcase (`src/components/CreativeShowcase.tsx`):</strong> Interfaz de demostración simulada que evidencia la potencia del Agente IA y la generación de matrices de copys, elevando la percepción de autoridad tecnológica.</li>\n        <li><strong>Pricing (`src/components/Pricing.tsx`):</strong> Estrategia de anclaje con el Plan Growth (2,497€) para vender masivamente el Plan Base (997€).</li>\n      </ul>\n\n      <h2>2. Justificación Técnica de Precios (High-Ticket)</h2>\n      <p>Almacenamos la variable `saas_plan` en `localStorage` y luego en la tabla `profiles`. La diferencia operativa real en el código es:</p>\n      <ul>\n        <li><strong>Base Plan (997€/mes):</strong> El usuario interactúa con la plataforma de forma \"Self-Service\". Genera sus campañas en la pestaña \"Arqui\" y solicita eventos.</li>\n        <li><strong>Growth Partner (2,497€/mes):</strong> La agencia intercepta las solicitudes a través del Master Console. Incluye automatizaciones en Kommo CRM (`/api/webhooks/kommo`) y asignación de presupuesto humano (Account Manager).</li>\n      </ul>\n\n      <h2>3. Sistema de \"Exclusividad Invertida\"</h2>\n      <p>El botón de pago no es directo, el usuario percibe que \"Aplica\" para trabajar contigo. Esto se gestiona en la fase de Lead Gen y el Onboarding.</p>\n    " }}>
        </div>
      </div>
    </div>
  );
}