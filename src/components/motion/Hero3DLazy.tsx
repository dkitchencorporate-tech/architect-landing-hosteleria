'use client';

import dynamic from 'next/dynamic';
import type { PresetHero3D } from './Hero3D';

/**
 * WebGL no existe en el servidor: `Hero3D` solo puede montarse en el
 * cliente. `ssr: false` es obligatorio aquí, no una optimización — sin él,
 * el build falla al intentar renderizar un `<canvas>` de Three.js en Node.
 */
const Hero3D = dynamic(() => import('./Hero3D'), { ssr: false, loading: () => null });

export default function Hero3DLazy({ preset, className }: { preset: PresetHero3D; className?: string }) {
  return <Hero3D preset={preset} className={className} />;
}
