'use client';

import React from 'react';
import Link from 'next/link';

export default function MapaNavegacionManual() {
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
        <h1>1. Mapa Integral de Navegación y URLs</h1>
        <p className="lead">
          Directorio completo de enrutamiento del ecosistema Architect.Sys. Este documento funciona como el mapa cartográfico de toda la aplicación, dividiendo las áreas por nivel de seguridad.
        </p>

        <h2>Área Pública (Sin Autenticación)</h2>
        <p>Estas rutas están abiertas al internet y son el frente de captación de clientes.</p>
        <ul>
          <li><strong>Landing Page Principal:</strong> <code>https://hosteleria.architectsys.com/</code> <br/>El funnel B2B, presentación de servicios, matriz de precios y FAQs.</li>
          <li><strong>Carta Digital Demo:</strong> <code>/demo/carta</code> <br/>Simulación de cómo se ve una carta digital interactiva en el móvil.</li>
          <li><strong>Legal - Privacidad:</strong> <code>/privacy</code> <br/>Obligatorio para Google OAuth y normativas europeas.</li>
          <li><strong>Legal - Términos:</strong> <code>/terms</code> <br/>Condiciones de uso y contratación del servicio SaaS.</li>
        </ul>

        <h2>Área de Autenticación</h2>
        <p>El puente de seguridad entre los usuarios anónimos y el ecosistema operativo.</p>
        <ul>
          <li><strong>Login:</strong> <code>/auth/login</code> <br/>Pantalla de inicio de sesión con Email o Google.</li>
          <li><strong>Registro:</strong> <code>/auth/register</code> <br/>Pantalla para crear cuentas nuevas. Redirige a callback al completarse.</li>
          <li><strong>OAuth Callback (Servidor):</strong> <code>/auth/callback</code> <br/>Ruta invisible que procesa los tokens de Google y establece las cookies seguras. No tiene interfaz gráfica.</li>
        </ul>

        <h2>Área Privada (Clientes SaaS)</h2>
        <p>Protegida por el <em>Middleware</em>. Solo accesible si existe una sesión válida de Supabase en las cookies del navegador.</p>
        <ul>
          <li><strong>Dashboard Principal:</strong> <code>/dashboard</code> <br/>Centro de control del cliente. Muestra el estado del negocio, conexión con métricas y el asistente de Onboarding inicial.</li>
          <li><strong>Creative Factory:</strong> <code>/creative-factory</code> <br/>La biblioteca de eventos y campañas. Permite al cliente explorar catálogos de marketing (Navidad, Verano, Halloween) y solicitarlas al equipo de Architect.Sys.</li>
        </ul>

        <h2>Área de Administración (God Mode)</h2>
        <p>Rutas exclusivas para monitorizar a los clientes. Están ocultas de los menús principales y protegidas por Middleware.</p>
        <ul>
          <li><strong>Centro de Clientes:</strong> <code>/admin-architect/clients</code> <br/>Tabla de monitoreo en tiempo real. Extrae datos de Supabase de todos los usuarios registrados, sus proyectos y el estado del Onboarding.</li>
          <li><strong>Overview de Sistema:</strong> <code>/admin-architect/overview</code> <br/>Métricas globales de facturación (Pendiente de conexión futura con pasarela de pagos).</li>
          <li><strong>Centro de Manuales (SOPs):</strong> <code>/manuals</code> <br/>Directorio de protocolos operativos protegido para uso exclusivo del administrador.</li>
        </ul>

        <h2>APIs y Webhooks (Rutas de Servidor)</h2>
        <p>Puntos de conexión máquina-a-máquina.</p>
        <ul>
          <li><strong>Diagnóstico de Lead:</strong> <code>/api/diagnostic</code> <br/>Evalúa si un restaurante califica o no para el servicio.</li>
          <li><strong>Procesamiento de Leads:</strong> <code>/api/lead</code> <br/>Recibe datos del formulario y los envía a CRM.</li>
          <li><strong>Kommo Webhook:</strong> <code>/api/webhooks/kommo</code> <br/>Recibe actualizaciones de estado desde el CRM de ventas.</li>
          <li><strong>Woztell Webhook:</strong> <code>/api/webhooks/woztell</code> <br/>Conexión bidireccional con WhatsApp para el bot Arqui.</li>
        </ul>
      </div>
    </div>
  );
}
