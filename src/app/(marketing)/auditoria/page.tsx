import type { Metadata } from 'next';
import AuditoriaCanales from '@/components/sections/AuditoriaCanales';
import SiguientePeldano from '@/components/sections/SiguientePeldano';

export const metadata: Metadata = {
  title: 'Auditoría de canales externos | DKitchen',
  description:
    'Diagnóstico pagado de tu Google Business Profile y redes sociales: qué te está costando dinero en presencia digital, con acciones concretas.',
  alternates: { canonical: 'https://dkitchencorporate.es/auditoria' },
};

export default function PaginaAuditoria() {
  return (
    <div className="bg-white pt-24 md:pt-28">
      <AuditoriaCanales />
      <SiguientePeldano siguiente="base-operativa" />
    </div>
  );
}
