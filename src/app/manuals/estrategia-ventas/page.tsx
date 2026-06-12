'use client';

import React from 'react';
import Link from 'next/link';

export default function EstrategiaVentasManual() {
  return (
    <div className="print:block">
      <div className="flex justify-between items-center mb-8 print:hidden border-b border-white/10 pb-6">
        <Link href="/manuals" className="text-sm font-bold text-zinc-400 hover:text-white transition-colors">
          &larr; Volver al Índice
        </Link>
        <button 
          onClick={() => window.print()}
          className="bg-white text-black text-xs font-black uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Exportar PDF
        </button>
      </div>

      <div className="prose prose-invert prose-orange max-w-none print:prose-p:text-black print:prose-headings:text-black print:prose-strong:text-black print:prose-li:text-black print:prose-a:text-blue-700">
        <h1>3. Embudos de Venta y Psicología B2B</h1>
        <p className="lead">
          Protocolo de persuasión comercial de Architect.Sys. Análisis de la propuesta de valor, estructura de la Landing Page y posicionamiento de marca (Socio Operativo vs. Agencia).
        </p>

        <h2>Posicionamiento de Marca</h2>
        <p>
          Architect.Sys rompe intencionalmente con la semántica tradicional del marketing para hostelería. 
        </p>
        <ul>
          <li><strong>NO somos:</strong> "Una agencia de marketing", "Creadores de posts", "Prometedores de locales llenos".</li>
          <li><strong>SÍ somos:</strong> "Un ecosistema SaaS", "Tu socio operativo", "Ingenieros de automatización", "Rentabilidad medible".</li>
        </ul>
        <p>
          Este encuadre filtra automáticamente a los dueños de locales que buscan "likes" y atrae a empresarios (restauradores serios, cadenas, dark kitchens) que buscan optimización de costos y control operativo.
        </p>

        <h2>Estructura de la Landing Page (Funnel B2B)</h2>
        <p>La página principal está diseñada bajo un embudo de dolor y resolución:</p>

        <h3>1. Hero Section (El Gancho)</h3>
        <p><strong>Titular:</strong> "Ecosistema de Crecimiento para Hostelería Profesional." <br/>Diseñado para denotar autoridad. El fondo dinámico y oscuro (Glassmorphism) crea un efecto "Premium/High-Ticket" inmediato, similar al que usan marcas como Apple o Stripe.</p>

        <h3>2. Sección de Dolor (Agitación)</h3>
        <p>Menciona directamente los problemas reales: Comisiones abusivas de Uber Eats, camareros estresados, descontrol de pedidos. Demuestra empatía profunda con el sector.</p>

        <h3>3. El Agente de Ventas Autónomo (Arqui)</h3>
        <p>Se presenta no como un "bot de chat", sino como un "Empleado Virtual" que no duerme. La interfaz muestra demostraciones prácticas de cómo Arqui responde al público.</p>

        <h3>4. Matriz de Precios (Anclaje Psicológico)</h3>
        <p>Se utiliza la estrategia de tres pilares:</p>
        <ol>
          <li><strong>Base Infraestructura (90€):</strong> El ancla inferior. Resuelve lo básico (cartas digitales), pero deja claro que la optimización mayor requiere más.</li>
          <li><strong>Growth Partner All-in-One (499€):</strong> El producto estrella "Decoy". Posicionado centralmente.</li>
          <li><strong>AI Autónomo (600€+):</strong> El ancla superior. Hace que el plan de 499€ parezca una inversión razonable en contraste con contratar un empleado humano.</li>
        </ol>

        <h2>Eliminación de Falsas Promesas</h2>
        <p>
          En mayo de 2026, el ecosistema pasó por un refactor completo de copy. Se eliminaron frases como "Te llenamos el local", que legalmente y estratégicamente generan fricción en ventas de High-Ticket.
        </p>
        <p>
          En su lugar, el funnel garantiza <strong>Trazabilidad, Retención, Base de Datos Propia y Experiencia Premium</strong>. Al vender infraestructura operativa, el valor del producto es intrínseco e innegable desde el primer mes, asegurando una retención a largo plazo.
        </p>
      </div>
    </div>
  );
}
