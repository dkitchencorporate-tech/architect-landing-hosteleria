import 'server-only';
import { comoCliente } from '@/lib/db';

export interface MiRestaurante {
  id: string;
  slug: string;
  nombre: string;
  logoUrl: string | null;
  plan: string;
  activo: boolean;
  colorMarca: string | null;
  estadoAcceso: string;
}

/** El restaurante del cliente que ha iniciado sesión — nunca de otro. */
export async function obtenerMiRestaurante(jwt: string): Promise<MiRestaurante | null> {
  return comoCliente(jwt, async (c) => {
    const { rows } = await c.query<{
      id: string;
      slug: string;
      nombre: string;
      logo_url: string | null;
      plan: string;
      activo: boolean;
      color_marca: string | null;
      estado_acceso: string;
    }>(
      `SELECT id, slug, nombre, logo_url, plan, activo, color_marca, estado_acceso
         FROM restaurantes
        WHERE propietario = dk.identidad_actual()`
    );
    const fila = rows[0];
    if (!fila) return null;
    return {
      id: fila.id,
      slug: fila.slug,
      nombre: fila.nombre,
      logoUrl: fila.logo_url,
      plan: fila.plan,
      activo: fila.activo,
      colorMarca: fila.color_marca,
      estadoAcceso: fila.estado_acceso,
    };
  });
}

/** El código QR activo del restaurante — la carta apunta siempre a /r/{codigo}. */
export async function obtenerCodigoQr(jwt: string, restauranteId: string): Promise<string | null> {
  return comoCliente(jwt, async (c) => {
    const { rows } = await c.query<{ codigo: string }>(
      `SELECT codigo FROM codigos_qr WHERE restaurante_id = $1 AND activo = true LIMIT 1`,
      [restauranteId]
    );
    return rows[0]?.codigo ?? null;
  });
}
