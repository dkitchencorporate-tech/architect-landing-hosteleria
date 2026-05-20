import React from 'react';

export default function DigitalPresenceValue() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl lg:text-5xl font-black mb-6 text-gray-900">La tecnología no es un gasto.<br/>Es tu mejor empleado.</h2>
          <p className="text-xl text-gray-600">Entiende por qué los negocios que se digitalizan aplastan a la competencia local en menos de 3 meses.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Beneficio 1 */}
          <div className="bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 text-[#FF4500] rounded-2xl flex items-center justify-center text-3xl mb-6">⏳</div>
            <h3 className="text-2xl font-bold mb-4">Recupera 14h a la semana</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Un camarero pierde de media 4 minutos por mesa solo llevando la carta, esperando a que decidan y apuntando. Con la Carta Interactiva QR, el cliente se sienta, ve fotos que le abren el apetito y decide al instante. Menos paseos, servicio más rápido.
            </p>
          </div>

          {/* Beneficio 2 */}
          <div className="bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 text-[#FF4500] rounded-2xl flex items-center justify-center text-3xl mb-6">💶</div>
            <h3 className="text-2xl font-bold mb-4">El Ticket Medio sube un 15%</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              La gente come por los ojos. Un menú en papel sucio y sin fotos no vende postres ni raciones extra. Una carta digital en el móvil del cliente, con fotos profesionales y recomendaciones, hace *upselling* automático sin que tú digas una palabra.
            </p>
          </div>

          {/* Beneficio 3 */}
          <div className="bg-[#FDFCF8] p-10 rounded-[2rem] border border-gray-100 hover:shadow-xl transition-shadow">
            <div className="w-16 h-16 bg-orange-100 text-[#FF4500] rounded-2xl flex items-center justify-center text-3xl mb-6">⭐</div>
            <h3 className="text-2xl font-bold mb-4">Percepción Premium</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Tener un Agente en tu web o un sistema rápido da una imagen de restaurante moderno, limpio y eficiente. Esa percepción justifica precios más altos y atrae mejores reseñas en Google, lo que a su vez atrae a más clientes. Es un ciclo de crecimiento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
