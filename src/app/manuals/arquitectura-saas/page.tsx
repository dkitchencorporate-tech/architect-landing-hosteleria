'use client';

import React from 'react';
import Link from 'next/link';

export default function ArquitecturaSaasManual() {
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
        <h1>2. Arquitectura SaaS y Base de Datos Integrada</h1>
        <p className="lead">
          Documentación técnica sobre el ecosistema de base de datos relacional (PostgreSQL en Supabase) y las reglas de seguridad que sostienen el Multi-Tenant de Architect.Sys.
        </p>

        <h2>Infraestructura Backend</h2>
        <p>
          Architect.Sys no utiliza una base de datos local ni archivos estáticos para la persistencia. Todo el sistema está conectado a <strong>Supabase</strong>, un backend como servicio escalable basado en PostgreSQL.
        </p>
        <p>
          El acceso a la base de datos desde el frontend de Next.js se realiza mediante <code>@supabase/ssr</code>, lo que garantiza que las cookies de sesión se lean y verifichen de forma segura en el lado del servidor (SSR) antes de renderizar páginas críticas.
        </p>

        <h2>Esquema de Base de Datos (Tablas Core)</h2>
        <p>Existen tres tablas fundamentales en el esquema público:</p>

        <h3>1. <code>public.profiles</code></h3>
        <ul>
          <li><strong>Propósito:</strong> Almacena información complementaria del usuario (ej. su rol o si tiene suscripción activa).</li>
          <li><strong>Relación:</strong> 1-a-1 con la tabla interna <code>auth.users</code>.</li>
          <li><strong>Automatización:</strong> Existe un <em>Trigger</em> en la base de datos (<code>handle_new_user()</code>). Cuando un usuario se registra mediante Google o Email en <code>/auth/register</code>, este trigger dispara automáticamente la creación de su fila correspondiente en <code>public.profiles</code> sin que el frontend tenga que intervenir.</li>
        </ul>

        <h3>2. <code>public.projects</code></h3>
        <ul>
          <li><strong>Propósito:</strong> Almacena los datos del restaurante o negocio del cliente.</li>
          <li><strong>Columnas Clave:</strong> <code>restaurant_name</code>, <code>owner_name</code>, <code>phone</code>, <code>website</code>, <code>status</code>.</li>
          <li><strong>Flujo:</strong> Cuando el cliente entra al Dashboard por primera vez y completa el Onboarding, esta tabla recibe un <code>INSERT</code> con sus datos. De aquí es de donde se alimenta el "Centro de Control de Clientes" del Administrador.</li>
        </ul>

        <h3>3. <code>public.client_events</code></h3>
        <ul>
          <li><strong>Propósito:</strong> Historial de campañas de marketing solicitadas.</li>
          <li><strong>Columnas Clave:</strong> <code>event_id</code>, <code>title</code>, <code>status</code> (requested, in_progress, completed).</li>
          <li><strong>Flujo:</strong> Alimentada directamente desde la ruta <code>/creative-factory</code> cuando el cliente presiona "Solicitar Lanzamiento".</li>
        </ul>

        <h2>Seguridad: Row Level Security (RLS)</h2>
        <p>
          Al ser un software Multi-Tenant (muchos clientes en una sola base de datos), es imperativo que el Cliente A no pueda ver los datos del Restaurante B.
        </p>
        <p>
          Esto se resuelve con Políticas RLS en Supabase.
        </p>
        <ul>
          <li><strong>Restricción Default:</strong> Nadie puede hacer <code>SELECT</code>, <code>INSERT</code> o <code>UPDATE</code> en las tablas.</li>
          <li><strong>Política de Dueño:</strong> Se permite la lectura/escritura si la columna <code>user_id</code> de la fila coincide exactamente con el ID único (UUID) del usuario logueado que hace la petición.</li>
          <li><strong>Bypass Administrativo:</strong> Si se usa la clave secreta del servidor (<code>SUPABASE_SERVICE_KEY</code>), las RLS se ignoran. Esto es usado por el administrador para listar a todos los clientes.</li>
        </ul>

        <h2>Protección de Rutas (Middleware)</h2>
        <p>
          El archivo <code>src/middleware.ts</code> se ejecuta antes de que cualquier página cargue. Su trabajo es revisar las cookies del navegador. Si detecta que un usuario no logueado intenta entrar a <code>/dashboard</code> o <code>/creative-factory</code>, lo expulsa inmediatamente a <code>/auth/login</code> sin revelar ninguna información confidencial.
        </p>
      </div>
    </div>
  );
}
