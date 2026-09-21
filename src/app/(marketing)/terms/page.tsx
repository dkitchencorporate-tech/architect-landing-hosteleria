import React from 'react';

export const metadata = {
  title: "Condiciones del Servicio | DKitchen",
  description: "Términos y condiciones de uso de la plataforma de automatización y servicios digitales de DKitchen.",
  alternates: { canonical: 'https://dkitchencorporate.es/terms' }
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#FDFCF8] text-zinc-900 font-sans p-8 md:p-24 selection:bg-[#D9531E] selection:text-white">
      <div className="max-w-3xl mx-auto">
        <header className="mb-16 border-b border-zinc-100 pb-8 text-center md:text-left">
          <h1 className="text-sm font-black uppercase tracking-[0.3em] text-[#D9531E] mb-4">Protocolo de Servicio</h1>
          <p className="text-4xl md:text-5xl font-black tracking-tighter">Condiciones del Servicio</p>
          <p className="text-zinc-400 mt-4 font-medium">Última actualización: 21 de Abril, 2026</p>
        </header>

        <section className="space-y-12 leading-relaxed text-zinc-600">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">1. Aceptación de Términos</h2>
            <p>
              Al contratar cualquiera de los servicios de DKitchen Corporate SL —carta digital con QR,
              eventos gastronómicos, auditoría de canales, digitalización a medida o marcas virtuales—
              el cliente acepta estas condiciones.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">2. Contenido y disponibilidad</h2>
            <p>
              El contenido de la carta digital (platos, precios, alérgenos y disponibilidad) es
              responsabilidad exclusiva del establecimiento, que puede editarlo en cualquier momento desde
              su panel. DKitchen provee la infraestructura que lo publica, no valida ni garantiza la
              exactitud de esa información frente al consumidor final.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-zinc-900 mb-4">3. Cobros de terceros</h2>
            <p>
              En los eventos, la venta de entradas se cobra directamente en la cuenta de la pasarela de pago
              titularidad del propio establecimiento. DKitchen configura esa conexión pero en ningún momento
              recibe, retiene ni intermedia los fondos, ni percibe comisión alguna sobre esas ventas.
            </p>
          </div>

          <div className="bg-zinc-900 text-white p-8 rounded-[2rem] shadow-xl">
            <h2 className="text-xl font-bold mb-4">Aviso de Facturación</h2>
            <p className="text-zinc-400 text-sm">
              Las tarifas de DKitchen son fijas y se acuerdan por escrito antes de la contratación. La cuota
              mensual de la carta digital se factura de forma recurrente hasta que el cliente la cancele; el
              resto de servicios se facturan como pago único. Ninguna tarifa incluye un componente variable
              ni un porcentaje sobre la facturación del establecimiento.
            </p>
          </div>
        </section>

        <footer className="mt-24 pt-12 border-t border-zinc-100 text-center">
          <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">© DKitchen Ecosystem | Secure Node</p>
        </footer>
      </div>
    </div>
  );
}
