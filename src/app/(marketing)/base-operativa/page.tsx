import type { Metadata } from 'next';
import Link from 'next/link';
import TheTrojanHorse from '@/components/sections/TheTrojanHorse';
import SiguientePeldano from '@/components/sections/SiguientePeldano';

export const metadata: Metadata = {
  title: 'Núcleo Operativo | DKitchen',
  description:
    'Núcleo Operativo: la PWA completa como sistema operativo del negocio, conectada a tu TPV y tu gestoría, con el Pack de Arranque incluido desde el primer día.',
  alternates: { canonical: 'https://dkitchencorporate.es/base-operativa' },
};

export default function PaginaBaseOperativa() {
  return (
    <div className="bg-white pt-24 md:pt-28">
      <TheTrojanHorse />

      <section className="py-14 bg-[#FDFCF8] border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-6 md:px-8 text-center space-y-4">
          <p className="text-gray-600 text-lg">
            ¿Todavía no sabes qué te falta en presencia digital?{' '}
            <Link href="/auditoria" className="text-[#D9531E] font-bold hover:underline">
              Pide antes la Auditoría de canales
            </Link>
            .
          </p>
          <p className="text-gray-600 text-lg">
            ¿Quieres ver la carta interactiva antes de decidir?{' '}
            <Link href="/demo/carta" className="text-[#D9531E] font-bold hover:underline">
              Prueba la demo en vivo
            </Link>
            .
          </p>
        </div>
      </section>

      <SiguientePeldano siguiente="dark-kitchen" />
    </div>
  );
}
