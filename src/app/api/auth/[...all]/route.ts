import { auth } from '@/lib/auth';

/**
 * Ruta proxy de Neon Auth — recibe toda petición de autenticación del
 * cliente (/api/auth/*) y la reenvía a NEON_AUTH_BASE_URL identificada como
 * proxy de servidor de Next.js, evitando el problema de origen que dan las
 * llamadas directas desde el navegador (ver src/lib/auth.ts).
 */
export const { GET, POST } = auth.handler();
