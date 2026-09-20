import type { Metadata } from 'next';
import FAQ from '@/components/sections/FAQ';

export const metadata: Metadata = {
  title: 'Preguntas frecuentes | DKitchen',
  description: 'Resolvemos las dudas más habituales sobre la Fundación Digital, los eventos y Dark Kitchen antes de que hables con nosotros.',
  alternates: { canonical: 'https://dkitchencorporate.es/faq' },
};

export default function PaginaFAQ() {
  return (
    <div className="pt-24 md:pt-28 bg-[#FDFCF8] min-h-screen">
      <FAQ />
    </div>
  );
}
