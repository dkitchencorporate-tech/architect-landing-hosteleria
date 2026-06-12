'use client';

import React from 'react';
import Link from 'next/link';

export default function GoogleOAuthManual() {
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
        <h1>Protocolo de Configuración: Google OAuth y Verificación de Aplicación</h1>
        <p className="lead">
          Este documento detalla el procedimiento operativo estándar (SOP) para activar y escalar la autenticación con Google en la plataforma SaaS de Architect.Sys, gestionada a través de Supabase y Google Cloud Console.
        </p>

        <h2>1. Objetivo</h2>
        <p>
          Habilitar el inicio de sesión fluido con Google (OAuth 2.0) para clientes B2B, eliminando la fricción del registro tradicional mediante correo y contraseña.
        </p>

        <h2>2. Configuración en Google Cloud Console</h2>
        <p>
          Las credenciales de autorización se administran desde la <a href="https://console.cloud.google.com/" target="_blank" rel="noreferrer">Consola de Google Cloud</a>.
        </p>
        
        <h3>2.1. Pantalla de Consentimiento de OAuth</h3>
        <ul>
          <li><strong>Tipo de usuario:</strong> Debe seleccionarse <strong>"Usuarios externos"</strong>. Esto permite que cualquier dueño de restaurante con una cuenta de Gmail (o Google Workspace) pueda registrarse en el ecosistema.</li>
          <li><strong>Estado de publicación:</strong> La aplicación debe marcarse como <strong>"En producción"</strong> para que los usuarios puedan interactuar con ella sin recibir advertencias de seguridad graves de Google.</li>
        </ul>

        <h3>2.2. Creación de Credenciales (ID de Cliente y Secreto)</h3>
        <p>
          Al crear las credenciales en <em>APIs y Servicios &gt; Credenciales &gt; ID de cliente de OAuth</em>:
        </p>
        <ul>
          <li><strong>Tipo de aplicación:</strong> Aplicación Web.</li>
          <li><strong>Orígenes autorizados de JavaScript:</strong> <code>https://ytzgfgzwrjwbmjudvwgc.supabase.co</code> (La raíz del proyecto en Supabase).</li>
          <li><strong>URI de redireccionamiento autorizados:</strong> <code>https://ytzgfgzwrjwbmjudvwgc.supabase.co/auth/v1/callback</code> (La ruta oficial que procesa el retorno del token).</li>
        </ul>

        <h2>3. Límite Inicial de 100 Usuarios y Verificación</h2>
        <p>
          Inmediatamente después de poner la aplicación "En Producción", Google impone un límite de seguridad preventivo que permite registrar <strong>solamente a 100 usuarios (clientes)</strong>.
        </p>
        
        <h3>3.1. ¿Por qué ocurre esto?</h3>
        <p>
          Google requiere confirmar la autenticidad de la empresa detrás de la aplicación web. El límite existe para prevenir que aplicaciones no verificadas realicen captura masiva de datos (phishing).
        </p>

        <h3>3.2. Procedimiento de Verificación (Aumento de Límite)</h3>
        <p>
          Una vez que el flujo de usuarios se acerque a los 100 registros, el administrador debe solicitar la verificación formal en la misma pantalla de Google Cloud. Se requerirán dos enlaces operativos de Architect.Sys:
        </p>
        <ol>
          <li><strong>Política de Privacidad:</strong> <code>https://hosteleria.architectsys.com/privacy</code></li>
          <li><strong>Términos de Servicio (TOS):</strong> <code>https://hosteleria.architectsys.com/terms</code></li>
        </ol>
        <p>
          <em>Nota Técnica:</em> Ambas rutas ya están programadas y desplegadas en la infraestructura de Vercel. Al proveer estos enlaces al equipo de revisión de Google, el límite de 100 usuarios será removido permanentemente.
        </p>

        <h2>4. Sincronización con Supabase</h2>
        <p>
          El último paso requiere insertar el <strong>Client ID</strong> y el <strong>Client Secret</strong> (obtenidos en el paso 2.2) dentro de: 
          <br/><code>Supabase Dashboard &gt; Authentication &gt; Providers &gt; Google</code>.
        </p>
        <p>
          Una vez guardado, el botón en la interfaz de la Landing Page funcionará instantáneamente en el entorno de producción.
        </p>

      </div>
    </div>
  );
}
