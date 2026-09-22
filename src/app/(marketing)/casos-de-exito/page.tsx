import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import SiguientePeldano from '@/components/sections/SiguientePeldano';

export const metadata: Metadata = {
  title: 'Casos de éxito | DKitchen',
  description:
    'Negocios reales que ya usan el sistema de DKitchen — no una promesa, capturas de la PWA en producción hoy mismo.',
  alternates: { canonical: 'https://dkitchencorporate.es/casos-de-exito' },
};

const WHATSAPP_CASO =
  'https://wa.me/34622652659?text=Hola,%20he%20visto%20los%20casos%20de%20%C3%A9xito%20y%20quiero%20hablar%20sobre%20mi%20negocio.';

export default function PaginaCasosDeExito() {
  return (
    <div className="bg-white">
      {/* HERO propio (Parte 6, Sección 7-bis): enlaza directamente con el
          POWER-STATEMENT del fundador en Home ("no lo vendemos, lo hemos operado"). */}
      <header className="bg-[#171008] text-white pt-32 pb-20 md:pt-40 md:pb-24 text-center px-6">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-orange-400 text-sm font-bold tracking-widest uppercase mb-8">
          Casos de éxito
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] max-w-3xl mx-auto text-balance">
          Esto no es una promesa.<br/>Es lo que ya está funcionando.
        </h1>
        <p className="text-lg md:text-xl text-gray-400 text-pretty max-w-2xl mx-auto mt-8">
          Sin cifras inventadas ni medias estadísticas — cada ficha muestra solo lo que ese negocio concreto ya
          tiene funcionando, y solo lo que ha autorizado a mostrar.
        </p>
      </header>

      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8 space-y-20">
          {/* FICHA — Néstor Pizzas (Caniles) */}
          <article className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="order-2 lg:order-1">
              <p className="text-xs font-black uppercase tracking-widest text-[#D9531E] mb-3">
                Núcleo Operativo · Caniles, Granada
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Néstor Pizzas</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#FDFCF8] border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-1">Antes</p>
                  <p className="text-gray-700 font-medium">Pedido solo por teléfono, sin carta digital propia.</p>
                </div>
                <div className="bg-[#FDFCF8] border border-gray-100 rounded-2xl p-4">
                  <p className="text-xs font-black uppercase tracking-widest text-[#D9531E] mb-1">Ahora</p>
                  <p className="text-gray-700 font-medium">PWA propia en producción: pedido, catálogo y club de fidelización.</p>
                </div>
              </div>
              <ul className="space-y-2 text-gray-700 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>Catálogo real en carta: más de 50 productos, con ingredientes y precio por unidad.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>Club de fidelización propio (puntos por pedido, canje de producto gratis).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">✓</span>
                  <span>Pedido directo desde la PWA, sin pasar por ninguna app de delivery externa.</span>
                </li>
              </ul>
              <a
                href="https://nestorpizzas.es/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-gray-900 font-black hover:text-[#D9531E] transition-colors"
              >
                Ver la PWA en vivo (nestorpizzas.es) →
              </a>
            </div>
            <div className="order-1 lg:order-2 flex justify-center gap-4">
              <div className="rounded-[2rem] border-8 border-gray-900 shadow-2xl overflow-hidden w-40 sm:w-48">
                <Image
                  src="/images/casos-de-exito/nestor-pizza-home.jpg"
                  alt="Pantalla de inicio de la PWA de Néstor Pizzas, con promoción activa y menú"
                  width={390}
                  height={844}
                  className="w-full h-auto"
                />
              </div>
              <div className="rounded-[2rem] border-8 border-gray-900 shadow-2xl overflow-hidden w-40 sm:w-48 mt-8">
                <Image
                  src="/images/casos-de-exito/nestor-pizza-productos.jpg"
                  alt="Catálogo de productos de la PWA de Néstor Pizzas con precios y botón de pedido"
                  width={390}
                  height={844}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </article>

          {/* FICHA — Seven Food Fries (pendiente de contenido del cliente) */}
          <article className="rounded-3xl border-2 border-dashed border-gray-200 p-10 text-center">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Próximamente</p>
            <h2 className="text-2xl font-black text-gray-900 mb-2">Seven Food Fries</h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Demo visual del sistema en uso — a la espera de que el cliente autorice qué datos de negocio se
              pueden mostrar. Esta ficha se completa en cuanto llegue esa autorización, no antes.
            </p>
          </article>
        </div>
      </section>

      {/* CTA-FINAL doble (Parte 6, Sección 7-bis) */}
      <section className="py-16 md:py-20 bg-[#FDFCF8] border-t border-gray-100">
        <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-balance">
            ¿Quieres un sistema así en tu negocio?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/base-operativa"
              className="inline-flex justify-center bg-[#D9531E] text-white px-8 py-4 rounded-full font-black text-lg hover:bg-orange-600 transition-all shadow-lg"
            >
              Quiero un sistema así
            </Link>
            <a
              href={WHATSAPP_CASO}
              className="inline-flex justify-center border-2 border-gray-900 text-gray-900 px-8 py-4 rounded-full font-black text-lg hover:bg-gray-900 hover:text-white transition-all"
            >
              Habla con Alex sobre tu caso
            </a>
          </div>
        </div>
      </section>

      <SiguientePeldano siguiente="dark-kitchen" />
    </div>
  );
}
