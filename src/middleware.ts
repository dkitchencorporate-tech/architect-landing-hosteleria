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

  const { data: { user } } = await supabase.auth.getUser();
  
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
    // Redirigir al login si no hay sesión
    url.pathname = '/auth/login';
    return NextResponse.redirect(url);
  }

  if (isAdminRoute && user) {
    const isAdmin = user.email === 'klarx94@gmail.com';
    if (!isAdmin) {
      // Si está logueado pero no es admin, enviarlo a su dashboard
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
    }
  }

  // Si intenta ir a /auth y ya está logueado, llevarlo a su zona correspondiente
  if (url.pathname.startsWith('/auth') && user) {
    const isAdmin = user.email === 'klarx94@gmail.com';
    url.pathname = isAdmin ? '/admin-architect/clients' : '/dashboard';
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*', '/creative-factory/:path*', '/admin-architect/:path*', '/auth/:path*', '/manuals/:path*'],
};
