'use client';
import React, { useState } from 'react';

const faqs = [
  {
    question: "¿Qué incluye exactamente la Base Operativa de 700€?",
    answer: "Es un ecosistema llave en mano. Incluye el diseño de tu web profesional, la carta interactiva con menú QR, el sistema de reservas directas y la configuración de SEO local en Google Maps. Además de los 4 bonos de consultoría gratuitos. Tú solo tienes que darnos la información y nosotros construimos todo."
  },
  {
    question: "¿Tengo que pagar comisiones por las reservas o pedidos?",
    answer: "Cero comisiones. A diferencia de las apps de terceros que se quedan hasta un 30% de tu margen, nuestro sistema redirige los pagos y las reservas directamente a tu negocio. Es tu marca, son tus clientes y tuyos son los beneficios."
  },
  {
    question: "¿Hay algún gasto oculto después de la activación?",
    answer: "No hay cuotas sorpresa. Como Bono Especial, te regalamos los primeros 2 meses de alojamiento y soporte técnico. A partir del tercer mes, el mantenimiento del servidor premium, la protección anti-caídas y el soporte continuo tiene un coste de 69€/mes. No hay permanencia; el sistema es tuyo."
  },
  {
    question: "¿Tengo que instalar el Agente de Inteligencia Artificial obligatoriamente?",
    answer: "No. El Agente Híbrido de Recepción (WhatsApp + CRM) es un módulo de escalabilidad avanzado. Lo recomendamos solo para restaurantes que ya tienen un alto volumen de clientes y pierden dinero al no poder contestar llamadas los fines de semana. Puedes añadirlo en el futuro."
  }
];

export default function FAQ() {
  const [openIndices, setOpenIndices] = useState<number[]>([0, 1, 2, 3]);

  const toggleFAQ = (index: number) => {
    setOpenIndices(prev => 
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <section className="py-24 bg-[#FDFCF8] border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-6 tracking-tight text-balance">
            Dudas frecuentes antes de arrancar
          </h2>
          <p className="text-lg text-gray-600 font-medium text-pretty">
            Transparencia total. Sin letra pequeña.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${openIndices.includes(index) ? 'border-[#FF4500] shadow-md bg-white' : 'border-gray-100 bg-white hover:border-gray-200'}`}
            >
              <button
                className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg sm:text-xl font-bold text-gray-900 pr-8">{faq.question}</span>
                <span className={`text-2xl text-[#FF4500] transform transition-transform duration-300 flex-shrink-0 ${openIndices.includes(index) ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div 
                className={`px-6 sm:px-8 text-gray-600 text-base sm:text-lg leading-relaxed transition-all duration-300 ease-in-out ${openIndices.includes(index) ? 'pb-6 sm:pb-8 opacity-100 max-h-96' : 'max-h-0 opacity-0 overflow-hidden'}`}
              >
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
