import Link from 'next/link';

/**
 * Bloque CTA-FINAL (DKITCHEN_MIGRATION_PLAN_PARTE6.md, Sección 1):
 * cierre de página con un único siguiente paso claro — nunca varios CTAs
 * compitiendo por la misma atención.
 */
export default function CtaFinal({
  titulo,
  subtitulo,
  etiquetaBoton,
  hrefBoton,
  esExterno = false,
}: {
  titulo: string;
  subtitulo?: string;
  etiquetaBoton: string;
  hrefBoton: string;
  esExterno?: boolean;
}) {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-gray-100">
      <div className="max-w-2xl mx-auto px-6 md:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 mb-4 text-balance">{titulo}</h2>
        {subtitulo && <p className="text-lg text-gray-600 mb-10 text-pretty">{subtitulo}</p>}
        {esExterno ? (
          <a
            href={hrefBoton}
            className="inline-flex bg-brand text-white px-10 py-5 rounded-full font-black text-lg md:text-xl hover:bg-brandHover transition-all shadow-xl hover:shadow-orange-500/30 hover:-translate-y-1"
          >
            {etiquetaBoton}
          </a>
        ) : (
          <Link
            href={hrefBoton}
            className="inline-flex bg-brand text-white px-10 py-5 rounded-full font-black text-lg md:text-xl hover:bg-brandHover transition-all shadow-xl hover:shadow-orange-500/30 hover:-translate-y-1"
          >
            {etiquetaBoton}
          </Link>
        )}
      </div>
    </section>
  );
}
