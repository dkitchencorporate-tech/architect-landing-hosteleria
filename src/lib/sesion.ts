import 'server-only';
import { auth } from './auth';

/**
 * Puente entre la sesión real de Neon Auth (resuelta en 0017/Parte 17) y el
 * patrón `comoCliente(jwt, fn)` que ya usa el resto del proyecto (db.ts) —
 * ese patrón necesita un JWT verificable contra el JWKS de Neon Auth, no el
 * objeto de sesión en sí.
 *
 * `auth.token()` es el método del plugin JWT de Better Auth expuesto por
 * `createNeonAuth` (mismo mecanismo que `authClient.token()` en el cliente,
 * server-side) — confirmar contra producción real la primera vez que se
 * despliegue esto, no hay documentación pública explícita del nombre exacto.
 */
export async function obtenerJwtDeSesion(): Promise<string | null> {
  const { data: sesion } = await auth.getSession();
  if (!sesion?.user) return null;

  try {
    const { data } = await auth.token();
    if (data?.token) return data.token;
  } catch (error) {
    console.error('No se pudo obtener el JWT de sesión vía auth.token():', error);
  }

  return null;
}

export async function identidadActual(): Promise<{ id: string; nombre: string; email: string } | null> {
  const { data: sesion } = await auth.getSession();
  if (!sesion?.user) return null;
  return { id: sesion.user.id, nombre: sesion.user.name, email: sesion.user.email };
}
