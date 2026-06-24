import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({
            request: { headers: request.headers },
          });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { data } = await supabase.auth.getUser();
  let user = data?.user;

  // BYPASS LOCAL: Si estamos en desarrollo y no hay sesión, simulamos ser el admin
  // Esto permite la auditoría visual sin comprometer la seguridad de Supabase.
  if (process.env.NODE_ENV === 'development' && !user) {
    user = { email: 'klarx94@gmail.com' } as any;
  }
  
  const url = request.nextUrl;

  // Rutas internas protegidas (para clientes normales)
  const isProtectedRoute = 
    url.pathname.startsWith('/dashboard') || 
    url.pathname.startsWith('/creative-factory');

  // Rutas exclusivas de administrador
  const isAdminRoute = 
    url.pathname.startsWith('/admin-architect') || 
    url.pathname.startsWith('/manuals');

  if ((isProtectedRoute || isAdminRoute) && !user) {
    // Redirigir al login si no hay sesión, guardando la ruta original en 'next'
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = '/auth/login';
    loginUrl.searchParams.set('next', url.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminRoute && user) {
    const isAdmin = true; // TEMPORAL PARA TEST: Permitir acceso a cualquier usuario logueado
    if (!isAdmin) {
      // Si está logueado pero no es admin, enviarlo a su dashboard
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  // Si intenta ir a /auth y ya está logueado, llevarlo a su zona correspondiente
  if (url.pathname.startsWith('/auth') && user) {
    const isAdmin = true; // TEMPORAL PARA TEST
    url.pathname = isAdmin ? '/admin-architect/pipeline' : '/dashboard';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/creative-factory/:path*', '/admin-architect/:path*', '/auth/:path*', '/manuals/:path*'],
};
