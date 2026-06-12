'use client';

import React from 'react';
import Link from 'next/link';

export default function CentroControlManual() {
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
        <h1>6. Centro de Control de Administración</h1>
        <p className="lead">
          Documentación técnica sobre las vistas de "God Mode". Cómo el equipo interno de Architect.Sys monitoriza a los clientes reales y cómo funciona la inyección de datos para las presentaciones de venta.
        </p>

        <h2>El Panel de Clientes (Clients List)</h2>
        <p>
          Ruta: <code>/admin-architect/clients</code>
        </p>
        <p>
          Esta interfaz es el verdadero "cerebro administrativo" del software. Cuando accedes a esta ruta, el código ejecuta una petición de alto nivel a Supabase utilizando la <code>SUPABASE_SERVICE_KEY</code>. Esta llave mágica ignora las barreras RLS (Row Level Security), permitiendo ver a TODOS los clientes registrados.
        </p>

        <h3>Datos Monitoreados:</h3>
        <ul>
          <li><strong>Email:</strong> Extraído de la base de datos de usuarios (<code>profiles</code>).</li>
          <li><strong>Restaurante:</strong> Extraído de la tabla <code>projects</code> (si el cliente ya terminó el Onboarding).</li>
          <li><strong>Estado del Ecosistema:</strong> Muestra etiquetas visuales (Verde = Activo, Amarillo = Pendiente) para saber qué módulos ha activado cada cliente (Cartas, WhatsApp, etc.).</li>
        </ul>

        <h2>La Lógica del "Modo Demo" (Ventas en Vivo)</h2>
        <p>
          Las presentaciones de software B2B sufren del "síndrome de la base de datos vacía". Si muestras un Dashboard real recién creado, el cliente verá puros "0" en las métricas y perderá el impacto emocional.
        </p>
        <p>
          Para resolver esto, hemos programado un <strong>Bypass Condicional (Modo Demo)</strong>.
        </p>

        <h3>¿Cómo se activa?</h3>
        <p>
          El sistema lee el correo con el que se ha iniciado sesión. Si el correo coincide exactamente con:
        </p>
        <ul>
          <li><code>alex@architectsys.com</code></li>
          <li><code>admin@architectsys.com</code></li>
        </ul>
        <p>
          El Dashboard y la Creative Factory ignoran la base de datos real y cargan <strong>Data Ficticia Hardcodeada</strong> (Mock Data). 
        </p>

        <h3>Efectos Visuales del Modo Demo:</h3>
        <ol>
          <li><strong>Métricas Disparadas:</strong> Se muestran gráficos con facturación mensual altísima, base de datos de 5000+ clientes y picos de retención.</li>
          <li><strong>Proyectos Falsos:</strong> El panel muestra "Burger Queen" y "Sushi Master" como clientes activos para demostrar capacidad multi-restaurante.</li>
          <li><strong>Eventos Desbloqueados:</strong> La sección de Creative Factory permite "solicitar eventos" sin chocar contra límites de servidor, mostrando alertas de éxito inmediatas para asombrar al prospecto durante la llamada de Zoom.</li>
        </ol>
        
        <p>
          <strong>Alerta de Seguridad:</strong> Este Modo Demo <em>solo</em> afecta a la parte visual del frontend de estos correos específicos. Las reglas de la base de datos en Supabase permanecen intactas, por lo que nunca se insertarán estos datos falsos en producción.
        </p>
      </div>
    </div>
  );
}
