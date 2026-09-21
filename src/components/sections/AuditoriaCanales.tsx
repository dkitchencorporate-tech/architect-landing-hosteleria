const WHATSAPP_AUDITORIA_CANALES =
  'https://wa.me/34622652659?text=Hola,%20quiero%20pedir%20presupuesto%20para%20la%20Auditor%C3%ADa%20de%20canales%20externos.';

export default function AuditoriaCanales() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 md:px-8">
        <div className="text-center space-y-6 mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-[#D9531E] text-sm font-bold tracking-widest uppercase">
            Auditoría de canales externos
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-tight text-balance">
            Un diagnóstico, no una promesa.
          </h2>
          <p className="text-lg md:text-xl text-gray-600 text-pretty max-w-2xl mx-auto">
            Diagnóstico de pago único sobre tu Google Business Profile y tus redes sociales: qué te está costando
            dinero ahora mismo en presencia digital, con acciones concretas — sin garantía de resultado, porque es
            un informe, no una gestión.
          </p>
        </div>

        <div className="bg-[#FDFCF8] rounded-3xl border border-gray-100 p-8 md:p-12 space-y-6">
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#D9531E] shrink-0 text-lg font-bold mt-1">1</span>
            <p className="text-gray-700 text-lg">
              Revisamos tu ficha de Google (respuesta a reseñas, fotos, categorías, posicionamiento de proximidad) y
              tus redes activas.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#D9531E] shrink-0 text-lg font-bold mt-1">2</span>
            <p className="text-gray-700 text-lg">
              Te entregamos un informe con cada brecha cuantificada — no genérico, con datos de tu propio negocio.
            </p>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-[#D9531E] shrink-0 text-lg font-bold mt-1">3</span>
            <p className="text-gray-700 text-lg">
              Si el diagnóstico revela que necesitas algo más serio que un parche, el siguiente paso natural es
              Base Operativa.
            </p>
          </div>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          Distinta de la Auditoría de Escandallos y Rentabilidad (esa audita costes de carta, no presencia digital).
        </p>

        <div className="text-center mt-10">
          <a
            href={WHATSAPP_AUDITORIA_CANALES}
            className="inline-flex bg-[#D9531E] text-white px-8 py-4 rounded-full font-black text-lg hover:bg-orange-600 transition-all shadow-xl hover:shadow-orange-500/30 hover:-translate-y-1"
          >
            Pedir presupuesto
          </a>
        </div>
      </div>
    </section>
  );
}
