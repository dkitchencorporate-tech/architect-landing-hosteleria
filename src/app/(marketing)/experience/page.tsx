import type { Metadata } from 'next';
import EventLibraryHook from '@/components/sections/EventLibraryHook';
import ObjectionHandling from '@/components/sections/ObjectionHandling';
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

      <ObjectionHandling
        fondo="oscuro"
        preguntas={[
          {
            pregunta: '¿Cómo se cobra la entrada?',
            respuesta: 'Con tu propia pasarela — Stripe, SumUp o Revolut Pay, tú eliges. Nosotros solo la conectamos a la landing de venta; el dinero cae directo en tu cuenta.',
          },
          {
            pregunta: '¿Quién paga los anuncios?',
            respuesta: 'El presupuesto de publicidad lo pones tú, y se paga directo a Meta o Google. Nosotros creamos y gestionamos la campaña, pero nunca ponemos ni intermediamos ese capital.',
          },
          {
            pregunta: '¿Cuánto tarda en montarse un evento?',
            respuesta: 'Unas tres semanas desde la primera reunión hasta el día del evento — tiempo suficiente para concepto, campaña y venta de entradas.',
          },
        ]}
      />

      <SiguientePeldano siguiente="auditoria" />
    </div>
  );
}
