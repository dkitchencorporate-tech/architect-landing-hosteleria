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
          Protocolo de persuasión comercial de DKitchen. Análisis de la propuesta de valor, estructura de la Landing Page y posicionamiento de marca (Socio Operativo vs. proveedor genérico de marketing).
        </p>

        <h2>Posicionamiento de Marca</h2>
        <p>
          DKitchen rompe intencionalmente con la semántica tradicional del marketing para hostelería. Regla permanente de copy: la palabra que describe a los proveedores genéricos de marketing ("posts", "likes", "locales llenos por arte de magia") no se usa nunca para describir a DKitchen, ni siquiera en negación — el encuadre en sí mismo es lo que se evita, no solo la promesa vacía.
        </p>
        <ul>
          <li><strong>NO somos:</strong> un proveedor que factura por publicar contenido o prometer resultados que no controla.</li>
          <li><strong>SÍ somos:</strong> "Un ecosistema SaaS", "Tu socio operativo", "Ingenieros de automatización", "Rentabilidad medible".</li>
        </ul>
        <p>
          Este encuadre filtra automáticamente a los dueños de locales que buscan "likes" y atrae a empresarios (restauradores serios, cadenas, dark kitchens) que buscan optimización de costos y control operativo.
        </p>

        <h2>Estructura de la Landing Page (Funnel B2B)</h2>
        <p>La página principal está diseñada bajo un embudo de dolor y resolución:</p>

        <h3>1. Hero Section (El Gancho)</h3>
        <p><strong>Titular real, en producción:</strong> "Atrae más clientes, agiliza tu servicio y domina tu presencia digital." <br/>Diseñado para denotar autoridad. El fondo dinámico y oscuro (Glassmorphism) crea un efecto "Premium/High-Ticket" inmediato, similar al que usan marcas como Apple o Stripe.</p>

        <h3>2. Sección de Dolor (Agitación)</h3>
        <p>Menciona directamente los problemas reales: Comisiones abusivas de Uber Eats, camareros estresados, descontrol de pedidos. Demuestra empatía profunda con el sector.</p>

        <h3>3. (Retirado) El agente de ventas autónomo</h3>
        <p className="text-sm italic">
          Esta sección describía un bot de WhatsApp ("Arqui") como parte de la
          estrategia de venta. Se erradicó del proyecto por decisión explícita
          del 19/09/2026 — ni siquiera como upsell — junto con Kommo, Woztell
          y Meta Cloud API: son desarrollos a medida que el negocio decidió no
          sostener. La web es hoy el sistema de venta: precios claros, sin
          intermediario conversacional.
        </p>

        <h3>4. La escalera de valor (reemplaza cualquier matriz de 3 planes con "decoy" central)</h3>
        <p className="text-sm italic">
          Esta sección describía un anclaje de 3 planos (Base 90€ / Growth Partner 499€ "decoy" / AI Autónomo 600€+) que pertenece al modelo de negocio ya desmontado (Fase 2, 19/09/2026). DKitchen no vende un plan de suscripción con garantía de resultado — vende una escalera de 5 peldaños de compromiso creciente, sin plan "señuelo" central. La psicología de cada peldaño es distinta, no una única técnica de anclaje repetida:
        </p>
        <table>
          <thead>
            <tr><th>Peldaño</th><th>Principio dominante</th><th>Cómo se aplica</th></tr>
          </thead>
          <tbody>
            <tr><td>QR Menú</td><td>Reciprocidad + prueba antes de compromiso</td><td>Montaje regalado con fecha de corte visible; primer mes a 1€ simbólico, nunca "gratis" indefinido</td></tr>
            <tr><td>Experience</td><td>Escasez real (fecha del evento) + prueba social diferida</td><td>Fecha límite genuina, nunca artificial; el informe de cierre de cada evento es prueba social para el siguiente cliente</td></tr>
            <tr><td>Auditoría de canales</td><td>Autoridad + brecha (gap)</td><td>Se muestra un gap concreto y cuantificado del propio negocio del cliente antes de ofrecer la solución</td></tr>
            <tr><td>Base Operativa</td><td>Anclaje de valor + filtro de autoridad</td><td>Se establece el valor completo (con los 4 bonos consultivos) antes de revelar el precio en 2 pasos</td></tr>
            <tr><td>Dark Kitchen</td><td>Exclusividad (Ruta A) + aversión a la pérdida (Ruta B)</td><td>Ruta A mantiene exclusividad trimestral; Ruta B ancla la capacidad de cocina ociosa no monetizada</td></tr>
          </tbody>
        </table>
        <p>
          Detalle completo de precios y mecanismos en <code>DKITCHEN_MIGRACION_COMPLETA.md</code>, Secciones 2 y 11 — esta tabla es un resumen para consulta rápida, esa fuente manda si hay alguna diferencia.
        </p>

        <h2>Eliminación de Falsas Promesas</h2>
        <p>
          Se eliminaron frases como "Te llenamos el local" o cualquier garantía de resultado — no solo por friccionar la venta, sino porque el modelo actual no cobra comisión ni gestiona el dinero del cliente en ningún peldaño salvo el checkout propio del QR Menú, así que prometer un resultado sobre dinero que DKitchen no controla es, además de mala venta, inexacto.
        </p>
        <p>
          En su lugar, el funnel garantiza <strong>Trazabilidad, Retención, Base de Datos Propia y Experiencia Premium</strong>. Al vender infraestructura operativa, el valor del producto es intrínseco e innegable desde el primer mes, asegurando una retención a largo plazo.
        </p>
      </div>
    </div>
  );
}
