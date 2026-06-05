import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Usamos un mapa en memoria LRU simple debido a que el Edge Runtime / Middleware de Next.js
// no soporta librerías Node nativas fácilmente sin Upstash.
// En producción real y entornos sin estado (Serverless), se recomienda @upstash/ratelimit con Redis.

interface RateLimitData {
  count: number;
  lastReset: number;
}

// Nota: Esta caché en memoria se reiniciará en cada cold boot de la serverless function (Vercel).
const rateLimitCache = new Map<string, RateLimitData>();

const RATE_LIMIT_MAX = 20; // Máximo de peticiones
const RATE_LIMIT_WINDOW_MS = 60000; // Por minuto (60000 ms)

export function middleware(req: NextRequest) {
  // Solo aplicar a rutas críticas de API que consumen LLMs o webhooks
  const pathname = req.nextUrl.pathname;
  if (
    pathname.startsWith('/api/diagnostic') ||
    pathname.startsWith('/api/demo/respond') ||
    pathname.startsWith('/api/webhooks/')
  ) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || '127.0.0.1';

    const now = Date.now();
    const windowStart = now - RATE_LIMIT_WINDOW_MS;

    const currentData = rateLimitCache.get(ip);

    if (!currentData || currentData.lastReset < windowStart) {
      // Inicializar o reiniciar ventana
      rateLimitCache.set(ip, { count: 1, lastReset: now });
    } else {
      if (currentData.count >= RATE_LIMIT_MAX) {
        return NextResponse.json(
          { error: 'Too Many Requests', message: 'Rate limit exceeded.' },
          { status: 429 }
        );
      }
      currentData.count++;
      rateLimitCache.set(ip, currentData);
    }

    // Opcional: Cleanup básico de IPs antiguas (simplificado)
    if (rateLimitCache.size > 5000) {
        rateLimitCache.clear();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/diagnostic',
    '/api/demo/respond',
    '/api/webhooks/:path*'
  ],
};
