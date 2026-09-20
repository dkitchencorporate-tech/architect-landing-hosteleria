import type { Metadata } from 'next';
import EventLibraryHook from '@/components/sections/EventLibraryHook';
import SiguientePeldano from '@/components/sections/SiguientePeldano';

export const metadata: Metadata = {
  title: 'DKitchen Experience | DKitchen',
  description:
    'Formatos de evento llave en mano para llenar tus días valle: catas, cenas temáticas y experiencias con campaña propia, sin capital de marketing por adelantado.',
  alternates: { canonical: 'https://dkitchencorporate.es/experience' },
};

export default function PaginaExperience() {
  return (
    <div className="pt-24 md:pt-28">
      <EventLibraryHook />
      <SiguientePeldano siguiente="auditoria" />
    </div>
  );
}
