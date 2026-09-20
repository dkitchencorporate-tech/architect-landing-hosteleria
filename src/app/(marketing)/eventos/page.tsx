import type { Metadata } from 'next';
import EventLibraryHook from '@/components/sections/EventLibraryHook';

export const metadata: Metadata = {
  title: 'Eventos gastronómicos | DKitchen',
  description:
    'Formatos de evento llave en mano para llenar tus días valle: catas, cenas temáticas y experiencias con campaña propia, sin capital de marketing por adelantado.',
  alternates: { canonical: 'https://dkitchencorporate.es/eventos' },
};

export default function PaginaEventos() {
  return (
    <div className="pt-24 md:pt-28">
      <EventLibraryHook />
    </div>
  );
}
