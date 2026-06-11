import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  // Rutas internas que requieren protección
  if (url.pathname.startsWith('/dashboard') || 
      url.pathname.startsWith('/creative-factory') || 
      url.pathname.startsWith('/admin-architect')) {
      
      if (basicAuth) {
        const authValue = basicAuth.split(' ')[1];
        const [user, pwd] = atob(authValue).split(':');

        // Credenciales temporales: admin / architect2026
        // Todo: mover a variables de entorno en el futuro
        if (user === 'admin' && pwd === 'architect2026') {
          return NextResponse.next();
        }
      }

      url.pathname = '/api/basic-auth';
      return new NextResponse('Auth required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/creative-factory/:path*', '/admin-architect/:path*'],
};
