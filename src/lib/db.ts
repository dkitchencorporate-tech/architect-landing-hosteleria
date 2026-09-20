import 'server-only';

import { Pool, neonConfig, type PoolClient } from '@neondatabase/serverless';
import ws from 'ws';

/**
 * CONEXIÓN A NEON — EL ÚNICO SITIO DEL PROYECTO QUE ABRE UNA
 *
 * Aquí se materializa la regla inamovible: el despliegue no tiene autoridad.
 *
 * Vercel recibe de la integración de Neon un puñado de variables
 * (DATABASE_URL, POSTGRES_URL, PGPASSWORD…) que llevan la credencial de
 * `neondb_owner`. Ese rol tiene BYPASSRLS: con él, cada política de seguridad
 * del esquema sería decorativa. Es exactamente lo que ocurría con la clave de
 * servicio de Supabase que se retiró del proyecto.
 *
 * Por eso este módulo lee `DK_DATABASE_URL` y ninguna otra: apunta a `dk_app`,
 * un rol sin BYPASSRLS, sin superusuario y —esto es lo importante— NOINHERIT.
 * Recién conectado, `dk_app` no puede leer ni una fila de ninguna tabla. Para
 * hacer algo tiene que declarar con qué sombrero, dentro de la transacción:
 *
 *     comoVisitante()  →  SET LOCAL ROLE dk_anon
 *     comoCliente(jwt) →  auth.jwt_session_init(jwt) + SET LOCAL ROLE dk_auth
 *
 * Olvidar ese paso no abre nada: deja la consulta sin permisos y falla. El
 * error por omisión es denegar, que es la única forma segura de equivocarse.
 *
 * Quien añada consultas debe usar estas dos funciones. No se exporta el pool.
 */

// El driver necesita WebSocket para transacciones; sobre HTTP solo caben
// consultas sueltas, y aquí todo va en transacción a propósito.
//
// Importa: el driver y `ws` van declarados en `serverComponentsExternalPackages`
// (next.config.js). Si se dejan empaquetar por webpack, la conexión se cae nada
// más abrirse, y el mensaje —«Connection terminated unexpectedly», o bien
// «bufferUtil.mask is not a function»— no menciona en ningún momento que la
// causa sea el empaquetado. Se pierde una tarde buscándolo en el sitio
// equivocado, así que queda escrito aquí.
neonConfig.webSocketConstructor = ws;

let pool: Pool | null = null;

function obtenerPool(): Pool {
  if (pool) return pool;

  const cadena = process.env.DK_DATABASE_URL;
  if (!cadena) {
    throw new Error(
      'Falta DK_DATABASE_URL. No se debe sustituir por DATABASE_URL: esa cadena ' +
        'pertenece al propietario de la base, que puede saltarse todas las políticas.'
    );
  }
  if (/:\/\/neondb_owner:/.test(cadena)) {
    throw new Error(
      'DK_DATABASE_URL apunta al propietario de la base. La aplicación solo puede ' +
        'conectarse con dk_app. Revisa las variables de entorno del despliegue.'
    );
  }

  pool = new Pool({ connectionString: cadena });
  return pool;
}

/**
 * Abre una transacción y la cierra pase lo que pase.
 *
 * Todo va dentro de una transacción por dos motivos: `SET LOCAL ROLE` solo
 * existe dentro de una, y la conexión viene de PgBouncer en modo transacción,
 * donde el estado de sesión se comparte entre clientes. `LOCAL` garantiza que
 * el rol muere con la transacción y no viaja a la petición siguiente.
 */
async function enTransaccion<T>(fn: (c: PoolClient) => Promise<T>): Promise<T> {
  const c = await obtenerPool().connect();
  try {
    await c.query('BEGIN');
    try {
      const r = await fn(c);
      await c.query('COMMIT');
      return r;
    } catch (e) {
      await c.query('ROLLBACK').catch(() => {});
      throw e;
    }
  } finally {
    // Sin esto, un error deja la conexión fuera del pool y ocupada dentro de
    // una transacción abierta, hasta que Postgres la mata por tiempo.
    c.release();
  }
}

/**
 * Ejecuta como visitante anónimo: quien escanea un QR pegado en una mesa.
 *
 * Con este sombrero solo se ven cartas de restaurantes activos y platos
 * disponibles. Ninguna política de `dk_anon` consulta la identidad, así que no
 * hay nada que suplantar aunque la conexión venga reciclada del pool.
 */
export function comoVisitante<T>(fn: (c: PoolClient) => Promise<T>): Promise<T> {
  return enTransaccion(async (c) => {
    await c.query('SET LOCAL ROLE dk_anon');
    return fn(c);
  });
}

/**
 * Ejecuta como cliente con sesión demostrada.
 *
 * El JWT no se decodifica aquí: se entrega a Postgres, que verifica la firma
 * contra el JWKS de BetterAuth por su cuenta. Esta aplicación no tiene con qué
 * firmar, así que no puede fabricar una identidad ni aunque la comprometan.
 *
 * Después de inicializar se comprueba que la identidad existe de verdad. Es
 * barato y cierra el único hueco que deja el pool compartido: una transacción
 * que escalara a dk_auth sin haber inicializado sesión heredaría la identidad
 * que dejó la petición anterior en esa misma conexión.
 */
export function comoCliente<T>(jwt: string, fn: (c: PoolClient) => Promise<T>): Promise<T> {
  if (!jwt) throw new SesionNoValida();

  return enTransaccion(async (c) => {
    try {
      await c.query('SELECT auth.jwt_session_init($1)', [jwt]);
    } catch {
      // No se propaga el motivo: decirle a quien lo intenta si el fallo fue la
      // firma, la caducidad o el emisor le ahorra trabajo para el siguiente.
      throw new SesionNoValida();
    }

    await c.query('SET LOCAL ROLE dk_auth');

    const { rows } = await c.query<{ id: string | null }>('SELECT dk.identidad_actual() AS id');
    if (!rows[0]?.id) throw new SesionNoValida();

    return fn(c);
  });
}

export class SesionNoValida extends Error {
  constructor() {
    super('La sesión no es válida.');
    this.name = 'SesionNoValida';
  }
}

/** True cuando el despliegue tiene cableada la conexión de la aplicación. */
export const HAY_BASE_DE_DATOS = Boolean(process.env.DK_DATABASE_URL);
