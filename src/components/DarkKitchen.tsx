import React from 'react';

/**
 * src/components/DarkKitchen.tsx
 * Sección de ecosistema Dark Kitchen refactorizada.
 * Filosofía Comercial: Atacando el dolor de activos ociosos y comisiones.
 * Protocolo: Anti-Monolito (Modularización).
 */

export default function DarkKitchen() {
  return (
    <section className="py-24 bg-white border-y border-gray-100 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl opacity-50 -mr-32 -mt-32"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <div className="text-[#FF4500] font-bold tracking-widest uppercase flex items-center justify-center gap-2">
            <span className="w-2 h-2 bg-[#FF4500] rounded-full animate-pulse"></span> Escalabilidad y Delivery: Dark Kitchens
          </div>
          <h2 className="text-4xl lg:text-7xl font-black leading-tight text-gray-900">
            Multiplica tus ventas sin<br/> abrir más locales.
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Tanto si quieres rentabilizar las horas muertas de tu restaurante actual (modelo híbrido), potenciar una Dark Kitchen existente o empezar desde cero. Construimos la maquinaria para que domines el delivery.
          </p>
        </div>

        {/* --- CALCULADOR DE HEMORRAGIA --- */}
        <div className="mb-16 grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="bg-red-50 p-8 rounded-3xl border border-red-100 flex items-center justify-between group hover:bg-red-100 transition-colors">
                <div>
                    <p className="text-red-600 font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Dependencia de Apps (Glovo/Uber)</p>
                    <p className="text-2xl font-black text-gray-900 tracking-tight">Vender 10.000€</p>
                </div>
                <div className="text-right">
                    <p className="text-red-600 font-black text-3xl transition-transform group-hover:scale-110">- 3.000€</p>
                    <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest mt-1">Hemorragia de Comisiones</p>
                </div>
            </div>
            <div className="bg-green-50 p-8 rounded-3xl border-2 border-green-500 flex items-center justify-between shadow-lg shadow-green-500/10 hover:bg-green-100 transition-colors">
                <div>
                    <p className="text-green-600 font-bold uppercase text-[10px] tracking-[0.2em] mb-2">Ecosistema Architect.Sys</p>
                    <p className="text-2xl font-black text-gray-900 tracking-tight">Vender 10.000€</p>
                </div>
                <div className="text-right">
                    <p className="text-green-600 font-black text-3xl">0€</p>
                    <p className="text-[10px] text-green-500 font-bold uppercase tracking-widest mt-1">Margen Intacto</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-[#FDFCF8] p-8 rounded-[2rem] border border-gray-200 group hover:border-[#FF4500] hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="w-16 h-16 bg-orange-100 text-[#FF4500] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🍔</div>
            <h3 className="text-2xl font-bold mb-4">Múltiples Menús, Una Sola Cocina</h3>
            <p className="text-gray-600 flex-1 leading-relaxed">
                ¿Tienes un restaurante tradicional o una cocina a puerta cerrada? Te montamos un sistema donde puedes tener hasta <strong>7 menús de comida distintos operando a la vez</strong> desde la misma cocina. Más opciones, más pedidos, mismos gastos de alquiler.
            </p>
          </div>
          
          <div className="bg-[#FDFCF8] p-8 rounded-[2rem] border border-gray-200 group hover:border-[#FF4500] hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="w-16 h-16 bg-orange-100 text-[#FF4500] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🚀</div>
            <h3 className="text-2xl font-bold mb-4">Tu Propio Sistema de Pedidos</h3>
            <p className="text-gray-600 flex-1 leading-relaxed">
                Olvídate de regalarle el 30% a las apps de delivery. Te creamos una plataforma a medida donde tus clientes hacen el pedido y pagan directamente a tu cuenta. <strong>El cliente es tuyo, el dinero es tuyo y los datos son tuyos.</strong>
            </p>
          </div>

          <div className="bg-[#FDFCF8] p-8 rounded-[2rem] border border-gray-200 group hover:border-[#FF4500] hover:shadow-2xl transition-all duration-500 flex flex-col">
            <div className="w-16 h-16 bg-orange-100 text-[#FF4500] rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">🎯</div>
            <h3 className="text-2xl font-bold mb-4">Marcas Virtuales Listas para Usar</h3>
            <p className="text-gray-600 flex-1 leading-relaxed">
                Si no sabes qué más vender, te damos acceso a nuestro catálogo de marcas virtuales (hamburguesas, sushi, etc.) que ya sabemos que funcionan. Te las instalamos en tu sistema y empiezas a recibir pedidos extra casi sin esfuerzo.
            </p>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <a href="https://wa.me/34611499674?text=Hola,%20quiero%20solicitar%20una%20auditoría%20gratuita%20para%20mi%20proyecto%20de%20Delivery/Dark%20Kitchen." className="inline-block bg-gray-900 text-white px-8 py-5 md:px-12 md:py-6 rounded-full font-black text-xl md:text-2xl hover:bg-[#FF4500] hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(255,69,0,0.3)] transition-all duration-300 text-balance">
            Solicitar Auditoría de Proyecto Gratuita
          </a>
        </div>
      </div>
    </section>
  );
}
