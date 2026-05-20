'use client';
import React, { useState } from 'react';

const faqs = [
  {
    question: "¿Qué pasa si mis camareros no saben usar la tecnología?",
    answer: "No tienen que instalar nada ni aprender sistemas complejos. Nuestra plataforma está diseñada para ser más sencilla que usar WhatsApp. El cliente escanea, pide y tú recibes la orden clara. Cero curva de aprendizaje."
  },
  {
    question: "¿Tengo que comprar tablets o hardware caro?",
    answer: "Absolutamente no. El cliente usa su propio teléfono móvil para ver la carta y pedir. Tú puedes gestionar todo desde tu móvil actual, una tablet vieja o el ordenador de caja que ya tienes."
  },
  {
    question: "¿La Licencia Completa (450€) tiene algún gasto oculto?",
    answer: "No hay cuotas mensuales ni comisiones por venta. Es un pago único. El único mantenimiento anual sería la renovación de tu nombre de dominio web (.com o .es), que suele costar unos 15€ al año si decides comprarlo con nosotros."
  },
  {
    question: "¿Cuánto tardáis en tener todo listo?",
    answer: "Trabajamos rápido porque sabemos que el fin de semana está a la vuelta de la esquina. Una vez nos envíes tu carta actual, tendrás todo el sistema digital desplegado y tu agente IA configurado en un máximo de 48 horas."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
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
              className={`border-2 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-[#FF4500] shadow-md bg-white' : 'border-gray-100 bg-white hover:border-gray-200'}`}
            >
              <button
                className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg sm:text-xl font-bold text-gray-900 pr-8">{faq.question}</span>
                <span className={`text-2xl text-[#FF4500] transform transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              <div 
                className={`px-6 sm:px-8 text-gray-600 text-base sm:text-lg leading-relaxed transition-all duration-300 ease-in-out ${openIndex === index ? 'pb-6 sm:pb-8 opacity-100 max-h-96' : 'max-h-0 opacity-0 overflow-hidden'}`}
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
