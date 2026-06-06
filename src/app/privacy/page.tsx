import React from 'react';

export const metadata = {
  title: "Política de Privacidad | Architect.Sys",
  description: "Detalles sobre el tratamiento de datos personales y compromiso de confidencialidad en el ecosistema Architect.Sys, cumpliendo con el RGPD.",
  alternates: { canonical: 'https://hosteleria.architectsys.com/privacy' }
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-zinc-900 font-sans p-8 md:p-24 selection:bg-[#FF4500] selection:text-white">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 border-b border-zinc-100 pb-8 text-center md:text-left">
          <h1 className="text-sm font-black uppercase tracking-[0.3em] text-[#FF4500] mb-4">Arquitectura Legal</h1>
          <p className="text-4xl md:text-5xl font-black tracking-tighter">Política de Privacidad</p>
          <p className="text-zinc-400 mt-4 font-medium">Última actualización: 21 de Abril, 2026</p>
        </header>

        <section className="space-y-12 leading-relaxed text-zinc-600">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">1. Identidad del Tratamiento</h2>
            <p>
              Architect.Sys (en adelante, "la Plataforma"), operando bajo el dominio <strong>hosteleria.architectsys.com</strong>,
              garantiza la protección de los datos personales de sus usuarios y clientes conforme al Reglamento General 
              de Protección de Datos (RGPD) y las normativas locales vigentes.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">2. Datos Recopilados</h2>
            <p>
              Procesamos información estrictamente necesaria para el funcionamiento de nuestros Agentes de IA y sistemas de reserva:
            </p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Número de teléfono (identificador único para comunicaciones vía WhatsApp).</li>
              <li>Nombres de clientes proporcionados durante el proceso de reserva.</li>
              <li>Datos de interacción y preferencias comerciales para optimizar la respuesta del Agente.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">3. Uso de la Información</h2>
            <p>
              Los datos se utilizan exclusivamente para:
            </p>
            <ul className="list-disc ml-6 mt-4 space-y-2">
              <li>Facilitar la automatización de reservas y pedidos mediante IA.</li>
              <li>Proporcionar análisis predictivos de ventas en el dashboard administrativo.</li>
              <li>Cumplir con las obligaciones técnicas de la Cloud API de Meta.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">4. Retención y Eliminación</h2>
            <p>
              Los datos de conversaciones se mantienen por un periodo máximo de 90 días para fines de auditoría comercial, 
              a menos que el usuario solicite su eliminación inmediata. Cumplimos rigurosamente con los protocolos de Meta 
              para la gestión de Business-Scoped User IDs (BSUIDs).
            </p>
          </div>

          <div className="bg-white border border-zinc-100 p-8 rounded-[2rem] shadow-sm">
            <h2 className="text-xl font-bold text-zinc-900 mb-4">Contacto de Privacidad</h2>
            <p className="text-sm">
              Para ejercer sus derechos de acceso, rectificación o cancelación, contacte con nuestra delegación de datos en:
              <br />
              <span className="font-bold text-[#FF4500]">privacy@architectsys.com</span>
            </p>
          </div>
        </section>

        <footer className="mt-24 pt-12 border-t border-zinc-100 text-center">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">© Architect.Sys Ecosystem | Secure Node</p>
        </footer>
      </div>
    </div>
  );
}
