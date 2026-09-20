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
          Documentación técnica sobre el ecosistema de base de datos relacional (Neon Postgres) y las reglas de seguridad que sostienen el motor de QR y el resto del sistema de DKitchen.
        </p>
        <p className="text-sm italic">
          Esta página describía Supabase (<code>@supabase/ssr</code>, tablas <code>profiles</code>/<code>projects</code>/<code>client_events</code>, <code>SUPABASE_SERVICE_KEY</code>) — infraestructura eliminada por completo en la migración a Neon (ver <code>SEGURIDAD_Y_PERSISTENCIA_NEON.md</code>). Nada de eso existe ya en el código. Reescrita para describir la arquitectura real.
        </p>

        <h2>Infraestructura Backend</h2>
        <p>
          DKitchen no utiliza una base de datos local ni archivos estáticos para la persistencia. Todo el sistema está conectado a <strong>Neon Postgres</strong>, a través de un único punto de conexión: <code>src/lib/db.ts</code>. Ningún otro archivo del proyecto abre una conexión a la base de datos por su cuenta.
        </p>
        <p>
          El despliegue se conecta siempre con el rol <code>dk_app</code>, un rol sin privilegios (<code>NOINHERIT</code>, sin <code>BYPASSRLS</code>). Toda la autoridad real vive en las políticas de RLS de la base, no en el código — la regla inamovible del proyecto: "el despliegue no tiene autoridad, puede pedir datos, no puede decidir quién tiene derecho a ellos".
        </p>

        <h2>Esquema de Base de Datos (Tablas Core del motor de QR)</h2>
        <ul>
          <li><strong><code>restaurantes</code>:</strong> un registro por cliente QR Menú, incluye <code>slug</code> (identificador estable del QR, único, con formato validado por constraint) y <code>color_marca</code> (personalización del QR del plan Ampliado).</li>
          <li><strong><code>menu_secciones</code> / <code>menu_items</code>:</strong> la carta editable del cliente. Un trigger (<code>dk.tope_productos()</code>) hace cumplir el tope de 50 (Básico) o 150 (Ampliado) productos como restricción de base de datos, no solo como validación de interfaz.</li>
          <li><strong><code>codigos_qr</code> / <code>escaneos</code>:</strong> el QR en sí y el registro de cada escaneo — es el dato que alimenta el umbral de 600 escaneos/mes del marco Sostener/Evolucionar/Soltar.</li>
          <li><strong><code>leads</code>:</strong> captación de <code>/api/lead</code>, con restricciones de formato en la propia tabla (un email mal formado no puede insertarse aunque se salte el formulario).</li>
          <li><strong><code>auditoria</code>:</strong> registro de toda operación privilegiada (exportaciones, cambios de rol, accesos admin). Nadie puede escribir en ella directamente — solo funciones <code>SECURITY DEFINER</code>.</li>
        </ul>

        <h2>Seguridad: Row Level Security (RLS)</h2>
        <p>
          Toda tabla con datos nace con RLS activado y <strong>forzado</strong> (<code>FORCE ROW LEVEL SECURITY</code>, que aplica las políticas incluso al propietario de la tabla) y sin ninguna política — es decir, nace inaccesible, y se le van concediendo permisos explícitos uno a uno.
        </p>
        <ul>
          <li><strong>Cuatro roles, no más:</strong> <code>dk_owner</code> (solo migraciones, nunca el despliegue), <code>dk_anon</code> (visitante sin sesión — QR, cartas públicas), <code>dk_auth</code> (visitante con sesión), <code>dk_admin</code> (nunca se usa directamente; se alcanza por una fila con <code>rol = 'admin'</code> en la tabla de identidades, nunca por comparación de correo).</li>
          <li><strong>Escrituras sensibles, solo a través de funciones:</strong> registrar un escaneo, validar una entrada de evento o exportar datos personales pasan por funciones <code>SECURITY DEFINER</code> con <code>SET search_path</code> obligatorio — nunca por <code>INSERT</code>/<code>UPDATE</code> directo del rol del despliegue.</li>
          <li><strong>Sin bypass por clave de servicio:</strong> a diferencia del <code>SUPABASE_SERVICE_KEY</code> del sistema anterior, no existe una clave que salte RLS desde el despliegue. El acceso administrativo se resuelve con <code>dk.es_admin()</code>, que consulta una fila real, nunca con una credencial que ignore las políticas.</li>
        </ul>

        <h2>Identidad</h2>
        <p>
          El despliegue no decide quién eres: recibe un token, la base lo resuelve. <code>dk.identidad_actual()</code> lee el <em>claim</em> del JWT verificado contra la base — no hay middleware que fabrique un usuario, ni comparación de subcadenas de correo (ver <code>SEGURIDAD_Y_PERSISTENCIA_NEON.md</code>, hallazgos V-01 a V-03, ya cerrados).
        </p>
      </div>
    </div>
  );
}
