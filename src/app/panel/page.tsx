import { auth } from '@/lib/auth';

/** Server components que usan `auth` deben renderizarse de forma dinámica. */
export const dynamic = 'force-dynamic';

/**
 * Verificación mínima de que el login real funciona — el panel completo
 * (Mi Carta, Mi QR, Mis Escaneos, Mi Plan, Soporte) se construye en cuanto
 * esto quede confirmado en producción.
 */
export default async function Panel() {
  const { data: session } = await auth.getSession();

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-[#171008] flex items-center justify-center px-6 text-center">
        <div>
          <h1 className="text-xl font-bold text-white mb-2">No has iniciado sesión</h1>
          <a href="/panel/iniciar-sesion" className="text-[#D9531E] underline">
            Ir a iniciar sesión
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#171008] flex items-center justify-center px-6 text-center">
      <div>
        <h1 className="text-xl font-bold text-white mb-2">Sesión activa</h1>
        <p className="text-white/60">
          {session.user.name} — {session.user.email}
        </p>
      </div>
    </div>
  );
}
