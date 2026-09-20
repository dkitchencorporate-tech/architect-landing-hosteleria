import type { Metadata } from 'next';
import CatalogoMarcas from '@/components/sections/CatalogoMarcas';
import SiguientePeldano from '@/components/sections/SiguientePeldano';

export const metadata: Metadata = {
  title: 'Catálogo de marcas virtuales | DKitchen',
  description:
    'Seis marcas virtuales ya operadas en una dark kitchen real: Santa Brazza, My Latin Bowl, Seven Food Fries, Natureza Brunch, Bokadipan y Wing Boss. Menú y precios reales.',
  alternates: { canonical: 'https://dkitchencorporate.es/marcas' },
};

export default function PaginaMarcas() {
  return (
    <div className="bg-white pt-24 md:pt-28">
      <CatalogoMarcas />
      <SiguientePeldano siguiente="dark-kitchen" />
    </div>
  );
}
