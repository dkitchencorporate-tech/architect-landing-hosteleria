import 'server-only';
import { crearCuentaCliente, enviarEnlaceDeContrasena, ErrorNeonAuth } from '@/lib/neon-auth';
import { comoAprovisionamiento } from '@/lib/db';

/**
 * Lógica de aprovisionamiento común a cualquier pasarela de pago (Stripe,
 * Whop, o la que venga después). Cada webhook de proveedor solo tiene que:
 * verificar su propia firma, extraer estos mismos campos de su propio evento,
 * y llamar aquí. Nada de esto es específico de Stripe ni de Whop.
 */
export interface DatosPagoQr {
  /** Id único del evento en el proveedor — la clave de idempotencia real. */
  idEvento: string;
  email: string;
  nombreContacto: string;
  plan: 'basico' | 'ampliado';
  restauranteNombre: string;
  slugBase: string;
  /** Id del cliente en el proveedor (customer_id en Stripe, member_id en Whop). */
  referenciaCliente: string;
  /** Id de la suscripción/membresía en el proveedor. */
  referenciaSuscripcion: string;
}

export type ResultadoAprovisionamiento =
  | { ok: true; restauranteId: string; slug: string }
  | { ok: false; motivo: 'cuenta_neon_auth_fallo' }
  | { ok: false; motivo: 'db_fallo'; reintentable: true };

export async function aprovisionarClienteQr(datos: DatosPagoQr): Promise<ResultadoAprovisionamiento> {
  let identidadId: string;
  try {
    const cuenta = await crearCuentaCliente({ email: datos.email, nombre: datos.nombreContacto });
    identidadId = cuenta.id;
  } catch (error) {
    // Caso no cubierto por autoservicio: un cliente que ya tiene cuenta en
    // Neon Auth por otro peldaño intentando activar QR Menú con el mismo
    // correo. El login de cliente sigue aplazado (tarea #15), así que no hay
    // forma automática de recuperar su identidad real aquí sin arriesgar una
    // suplantación. Se registra con detalle para resolución manual.
    console.error(
      `No se pudo crear la cuenta de Neon Auth para ${datos.email} (evento ${datos.idEvento}):`,
      error instanceof ErrorNeonAuth ? `${error.codigo ?? ''} ${error.message}` : error
    );
    return { ok: false, motivo: 'cuenta_neon_auth_fallo' };
  }

  try {
    await enviarEnlaceDeContrasena(datos.email);
  } catch (error) {
    // No se aborta el aprovisionamiento por esto: el cliente puede pedir el
    // enlace de nuevo desde /panel/nueva-contrasena; quedarse sin restaurante
    // aprovisionado tras haber pagado sería el fallo peor.
    console.error(`No se pudo enviar el enlace de contraseña a ${datos.email}:`, error);
  }

  try {
    const { rows } = await comoAprovisionamiento((c) =>
      c.query<{ restaurante_id: string; slug: string }>(
        `SELECT * FROM dk.aprovisionar_cliente_qr($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          datos.idEvento,
          identidadId,
          datos.email,
          datos.nombreContacto,
          datos.plan,
          datos.restauranteNombre,
          datos.slugBase,
          datos.referenciaCliente,
          datos.referenciaSuscripcion,
        ]
      )
    );
    const fila = rows[0];
    if (!fila) throw new Error('dk.aprovisionar_cliente_qr no devolvió fila.');
    console.log(`Aprovisionado: restaurante ${fila.slug} (${fila.restaurante_id}) para ${datos.email}.`);
    return { ok: true, restauranteId: fila.restaurante_id, slug: fila.slug };
  } catch (error) {
    console.error(`Fallo aprovisionando el restaurante para ${datos.email} (evento ${datos.idEvento}):`, error);
    return { ok: false, motivo: 'db_fallo', reintentable: true };
  }
}
