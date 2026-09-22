import 'server-only';
import { comoCliente } from '@/lib/db';

export async function escaneosDelMes(jwt: string, restauranteId: string): Promise<number> {
  return comoCliente(jwt, async (c) => {
    const { rows } = await c.query<{ escaneos_del_mes: number }>(`SELECT dk.escaneos_del_mes($1)`, [restauranteId]);
    return rows[0]?.escaneos_del_mes ?? 0;
  });
}

export interface EscaneosPorDia {
  fecha: string;
  total: number;
}

/**
 * Últimos 30 días — `escaneos` no tiene restaurante_id propio, se relaciona
 * por `codigo` a través de `codigos_qr` (0003). La política
 * "escaneo_del_propietario" ya limita esto a los códigos del propio
 * restaurante, este JOIN es solo para poder agrupar por día.
 */
export async function escaneosUltimos30Dias(jwt: string, restauranteId: string): Promise<EscaneosPorDia[]> {
  return comoCliente(jwt, async (c) => {
    const { rows } = await c.query<{ fecha: string; total: string }>(
      `SELECT to_char(date_trunc('day', e.ocurrido_en), 'YYYY-MM-DD') AS fecha, count(*) AS total
         FROM escaneos e
         JOIN codigos_qr q ON q.codigo = e.codigo
        WHERE q.restaurante_id = $1 AND e.ocurrido_en >= now() - interval '30 days'
        GROUP BY 1
        ORDER BY 1`,
      [restauranteId]
    );
    return rows.map((r) => ({ fecha: r.fecha, total: Number(r.total) }));
  });
}
