import type { Metadata } from 'next';
import DigitalPresenceValue from '@/components/sections/DigitalPresenceValue';
import QrMenuPricing from '@/components/sections/QrMenuPricing';
import SiguientePeldano from '@/components/sections/SiguientePeldano';

export const metadata: Metadata = {
  title: 'QR Menú | DKitchen',
  description:
    'Carta digital con QR estable: imprime una vez y cambia tu carta las veces que quieras. Plan Básico 19€/mes o Ampliado 49€/mes, primer mes a 1€.',
  alternates: { canonical: 'https://dkitchencorporate.es/qr' },
};

export default function PaginaQr() {
  return (
    <div className="bg-white pt-24 md:pt-28">
      <DigitalPresenceValue />
      <QrMenuPricing />
      <SiguientePeldano siguiente="experience" />
    </div>
  );
}
