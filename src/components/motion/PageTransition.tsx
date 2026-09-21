'use client';

import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Transiciones entre páginas (Parte 7, Sección 2.4): crossfade + slide/scale
 * real vía `AnimatePresence`, nunca un salto brusco. Se aplica solo a las
 * páginas de producto — el layout de `(marketing)` es exactamente ese
 * perímetro, así que basta con envolver `children` aquí.
 */
export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
