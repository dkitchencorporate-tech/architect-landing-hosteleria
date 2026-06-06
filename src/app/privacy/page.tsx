import React from 'react';

export const metadata = {
  title: &quot;Política de Privacidad | Architect.Sys&quot;,
  description: &quot;Detalles sobre el tratamiento de datos personales y compromiso de confidencialidad en el ecosistema Architect.Sys, cumpliendo con el RGPD.&quot;,
  alternates: { canonical: 'https://hosteleria.architectsys.com/privacy' }
};

export default function PrivacyPolicy() {
  return (
    <div className=&quot;min-h-screen bg-[#FDFCF8] text-zinc-900 font-sans p-8 md:p-24 selection:bg-[#FF4500] selection:text-white&quot;>
      <div className=&quot;max-w-3xl mx-auto&quot;>
        <header className=&quot;mb-16 border-b border-zinc-100 pb-8 text-center md:text-left&quot;>
          <h1 className=&quot;text-sm font-black uppercase tracking-[0.3em] text-[#FF4500] mb-4&quot;>Arquitectura Legal</h1>
          <p className=&quot;text-4xl md:text-5xl font-black tracking-tighter&quot;>Política de Privacidad</p>
          <p className=&quot;text-zinc-400 mt-4 font-medium&quot;>Última actualización: 21 de Abril, 2026</p>
        </header>

        <section className=&quot;space-y-12 leading-relaxed text-zinc-600&quot;>
          <div>
            <h2 className=&quot;text-xl font-bold text-zinc-900 mb-4&quot;>1. Identidad del Tratamiento</h2>
            <p>
              Architect.Sys (en adelante, &quot;la Plataforma&quot;), operando bajo el dominio <strong>hosteleria.architectsys.com</strong>,
              garantiza la protección de los datos personales de sus usuarios y clientes conforme al Reglamento General 
              de Protección de Datos (RGPD) y las normativas locales vigentes.
            </p>
          </div>

          <div>
            <h2 className=&quot;text-xl font-bold text-zinc-900 mb-4&quot;>2. Datos Recopilados</h2>
            <p>
              Procesamos información estrictamente necesaria para el funcionamiento de nuestros Agentes de IA y sistemas de reserva:
            </p>
            <ul className=&quot;list-disc ml-6 mt-4 space-y-2&quot;>
              <li>Número de teléfono (identificador único para comunicaciones vía WhatsApp).</li>
              <li>Nombres de clientes proporcionados durante el proceso de reserva.</li>
              <li>Datos de interacción y preferencias comerciales para optimizar la respuesta del Agente.</li>
            </ul>
          </div>

          <div>
            <h2 className=&quot;text-xl font-bold text-zinc-900 mb-4&quot;>3. Uso de la Información</h2>
            <p>
              Los datos se utilizan exclusivamente para:
            </p>
            <ul className=&quot;list-disc ml-6 mt-4 space-y-2&quot;>
              <li>Facilitar la automatización de reservas y pedidos mediante IA.</li>
              <li>Proporcionar análisis predictivos de ventas en el dashboard administrativo.</li>
              <li>Cumplir con las obligaciones técnicas de la Cloud API de Meta.</li>
            </ul>
          </div>

          <div>
            <h2 className=&quot;text-xl font-bold text-zinc-900 mb-4&quot;>4. Retención y Eliminación</h2>
            <p>
              Los datos de conversaciones se mantienen por un periodo máximo de 90 días para fines de auditoría comercial, 
              a menos que el usuario solicite su eliminación inmediata. Cumplimos rigurosamente con los protocolos de Meta 
              para la gestión de Business-Scoped User IDs (BSUIDs).
            </p>
          </div>

          <div className=&quot;bg-white border border-zinc-100 p-8 rounded-[2rem] shadow-sm&quot;>
            <h2 className=&quot;text-xl font-bold text-zinc-900 mb-4&quot;>Contacto de Privacidad</h2>
            <p className=&quot;text-sm&quot;>
              Para ejercer sus derechos de acceso, rectificación o cancelación, contacte con nuestra delegación de datos en:
              <br />
              <span className=&quot;font-bold text-[#FF4500]&quot;>privacy@architectsys.com</span>
            </p>
          </div>
        </section>

        <footer className=&quot;mt-24 pt-12 border-t border-zinc-100 text-center&quot;>
          <p className=&quot;text-xs font-bold text-zinc-400 uppercase tracking-widest&quot;>© Architect.Sys Ecosystem | Secure Node</p>
        </footer>
      </div>
    </div>
  );
}
