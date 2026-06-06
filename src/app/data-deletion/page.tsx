import React from 'react';

export const metadata = {
  title: &quot;Instrucciones de Eliminación de Datos | Architect.Sys&quot;,
  description: &quot;Protocolo oficial para la solicitud de borrado permanente de datos personales en el ecosistema Architect.Sys, conforme al RGPD y políticas de Meta.&quot;,
  alternates: { canonical: 'https://hosteleria.architectsys.com/data-deletion' }
};

export default function DataDeletion() {
  return (
    <div className=&quot;min-h-screen bg-[#FDFCF8] text-zinc-900 font-sans p-8 md:p-24 selection:bg-[#FF4500] selection:text-white&quot;>
      <div className=&quot;max-w-3xl mx-auto&quot;>
        <header className=&quot;mb-16 border-b border-zinc-100 pb-8 text-center md:text-left&quot;>
          <h1 className=&quot;text-sm font-black uppercase tracking-[0.3em] text-[#FF4500] mb-4&quot;>Soberanía de Datos</h1>
          <p className=&quot;text-4xl md:text-5xl font-black tracking-tighter&quot;>Eliminación de Datos</p>
          <p className=&quot;text-zinc-400 mt-4 font-medium&quot;>Protocolo de Purga Segura</p>
        </header>

        <section className=&quot;space-y-12 leading-relaxed text-zinc-600&quot;>
          <div>
            <h2 className=&quot;text-xl font-bold text-zinc-900 mb-4&quot;>Instrucciones de Eliminación</h2>
            <p>
              Conforme a los requerimientos de la plataforma Meta y el cumplimiento del RGPD, 
              Architect.Sys provee un mecanismo directo para que los usuarios soliciten la 
              eliminación total de su rastro digital en nuestro ecosistema.
            </p>
          </div>

          <div className=&quot;grid grid-cols-1 md:grid-cols-2 gap-8&quot;>
            <div className=&quot;bg-white p-8 rounded-3xl border border-zinc-100&quot;>
              <h3 className=&quot;font-bold text-zinc-900 mb-2&quot;>Vía WhatsApp</h3>
              <p className=&quot;text-sm&quot;>Escriba <span className=&quot;font-bold text-[#FF4500]&quot;>&quot;ELIMINAR MIS DATOS&quot;</span> al número oficial del establecimiento. Nuestro sistema de soporte automatizado procesará la solicitud e informará al administrador para el borrado permanente del historial en Supabase.</p>
            </div>
            <div className=&quot;bg-white p-8 rounded-3xl border border-zinc-100&quot;>
              <h3 className=&quot;font-bold text-zinc-900 mb-2&quot;>Vía Email</h3>
              <p className=&quot;text-sm&quot;>Envíe un correo a <span className=&quot;font-bold text-[#FF4500]&quot;>support@architectsys.com</span> indicando su número de teléfono. La purga se completará en un plazo máximo de 48 horas.</p>
            </div>
          </div>

          <div>
            <h2 className=&quot;text-xl font-bold text-zinc-900 mb-4&quot;>¿Qué se elimina?</h2>
            <p>
              Al completar la solicitud, se borrarán de forma irreversible:
            </p>
            <ul className=&quot;list-disc ml-6 mt-4 space-y-2&quot;>
              <li>Historial de conversaciones en la tabla `chats`.</li>
              <li>Configuraciones personalizadas en `bot_settings`.</li>
              <li>Cualquier metadato sociodemográfico capturado por la IA.</li>
            </ul>
          </div>
        </section>

        <footer className=&quot;mt-24 pt-12 border-t border-zinc-100 text-center&quot;>
          <p className=&quot;text-xs font-bold text-zinc-400 uppercase tracking-widest&quot;>© Architect.Sys Ecosystem | Secure Node</p>
        </footer>
      </div>
    </div>
  );
}
