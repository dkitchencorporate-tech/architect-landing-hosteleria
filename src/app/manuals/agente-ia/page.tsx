'use client';

import React from 'react';
import Link from 'next/link';

export default function AgenteIAManual() {
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
        <h1>5. Agente de Ventas IA (Arqui)</h1>
        <p className="lead">
          Manual técnico y psicológico de Arqui, el consultor B2B virtual. Leyes fundamentales, inyección de personalidad y flujos de Webhooks.
        </p>

        <h2>Arquitectura de Personalidad (System Prompt)</h2>
        <p>
          Arqui no es un bot genérico de atención al cliente. Está programado con una matriz de comportamiento estricta enfocada en la venta High-Ticket para hostelería.
        </p>
        <p>Su personalidad es la de un "Socio Operativo": directo, resolutivo, sin palabras de relleno, enfocado en rentabilidad y métricas.</p>

        <h3>Las 10 Leyes Operativas de Arqui</h3>
        <p>El código maestro del agente incluye estas reglas inquebrantables que se envían al LLM en cada interacción:</p>
        <ol>
          <li><strong>Eres un cerrador High-Ticket:</strong> Tu objetivo final siempre es agendar una cita o calificar al cliente.</li>
          <li><strong>Odio el relleno:</strong> Respuestas cortas, al grano, formato WhatsApp (con emojis estratégicos).</li>
          <li><strong>Cero Jerga de Agencia:</strong> Prohibido decir "leads", "funnels" o "marketing digital". Usa "Base de datos", "Sistemas de reserva" y "Retención".</li>
          <li><strong>Manejo de Objeciones (Precio):</strong> Si dicen que es caro, Arqui hace la matemática inversa (ej. "¿Cuántas mesas vacías tienes un martes? Eso es más caro").</li>
          <li><strong>Psicología de la Escasez:</strong> No regalar la información. Arqui es exclusivo.</li>
        </ol>

        <h2>Integración WhatsApp y CRM</h2>
        <p>
          Para que Arqui pueda hablar con los dueños de restaurantes en la vida real, Architect.Sys funciona como un "cerebro" intermediario mediante Webhooks (APIs).
        </p>

        <h3>Flujo de Datos (Woztell &rarr; Vercel &rarr; LLM)</h3>
        <ul>
          <li><strong>Recepción:</strong> Cuando un usuario escribe al WhatsApp de Architect.Sys, el proveedor (Woztell) envía un JSON a nuestra ruta <code>/api/webhooks/woztell</code>.</li>
          <li><strong>Procesamiento:</strong> Next.js recibe el mensaje de texto, extrae el número de teléfono, y le inyecta las 10 Leyes Operativas.</li>
          <li><strong>Generación:</strong> Se llama al modelo de IA (OpenAI / Gemini) para que genere la respuesta.</li>
          <li><strong>Respuesta:</strong> Next.js envía la respuesta generada de vuelta a la API de WhatsApp para que el cliente la reciba.</li>
        </ul>

        <h3>Volcado a Kommo (CRM)</h3>
        <p>
          Si durante la conversación el restaurante proporciona datos valiosos (nombre, tamaño del local, correo), el sistema está diseñado para enviar otro Webhook a la API de <strong>Kommo</strong>, actualizando la tarjeta del lead automáticamente. Esto permite que el equipo de ventas humano tome el control en el momento de cierre exacto sin haber perdido contexto.
        </p>
      </div>
    </div>
  );
}
