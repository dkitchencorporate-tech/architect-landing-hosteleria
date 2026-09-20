import Link from 'next/link';

const PELDANOS: Record<string, { href: string; etiqueta: string; descripcion: string }> = {
  qr: { href: '/qr', etiqueta: 'QR Menú', descripcion: 'La puerta de entrada, con checkout propio.' },
  experience: { href: '/experience', etiqueta: 'DKitchen Experience', descripcion: 'Un evento ya definido, listo para replicar.' },
  auditoria: { href: '/auditoria', etiqueta: 'Auditoría de canales', descripcion: 'Diagnóstico de tu presencia digital.' },
  'base-operativa': { href: '/base-operativa', etiqueta: 'Base Operativa', descripcion: 'La PWA completa como sistema operativo del negocio.' },
  'dark-kitchen': { href: '/dark-kitchen', etiqueta: 'Dark Kitchen Multimarca', descripcion: 'Suma marcas virtuales a tu cocina.' },
  marcas: { href: '/marcas', etiqueta: 'Catálogo de marcas', descripcion: 'Seis marcas ya operadas, listas para tu cocina.' },
};

/** Bloque "¿Qué sigue después de esto?" — cierra cada página de producto enlazando al siguiente peldaño lógico. */
export default function SiguientePeldano({ siguiente }: { siguiente: keyof typeof PELDANOS }) {
  const peldano = PELDANOS[siguiente];
  return (
    <section className="py-14 md:py-20 bg-gray-900">
      <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
        <p className="text-gray-400 text-sm font-bold uppercase tracking-widest mb-3">¿Qué sigue después de esto?</p>
        <Link
          href={peldano.href}
          className="group inline-flex flex-col items-center gap-2 rounded-2xl border border-white/10 px-10 py-8 hover:border-[#FF4500] hover:bg-white/5 transition-all"
        >
          <span className="text-2xl md:text-3xl font-black text-white group-hover:text-[#FF4500] transition-colors">
            {peldano.etiqueta} →
          </span>
          <span className="text-gray-400">{peldano.descripcion}</span>
        </Link>
      </div>
    </section>
  );
}
