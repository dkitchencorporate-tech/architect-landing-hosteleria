'use server';

import { revalidatePath } from 'next/cache';
import { obtenerJwtDeSesion, identidadActual } from '@/lib/sesion';
import { obtenerMiRestaurante } from '@/lib/mi-restaurante';
import {
  crearSeccion as dbCrearSeccion,
  editarSeccion as dbEditarSeccion,
  eliminarSeccion as dbEliminarSeccion,
  crearPlato as dbCrearPlato,
  editarPlato as dbEditarPlato,
  eliminarPlato as dbEliminarPlato,
  type DatosPlato,
} from '@/lib/menu-propietario';
import { crearSolicitudQrFisico as dbCrearSolicitudQrFisico, type TipoQrFisico } from '@/lib/solicitudes-qr-fisico';
import { crearTicket as dbCrearTicket } from '@/lib/tickets';

/**
 * Todas las acciones repiten el mismo patrón: obtener el JWT + el
 * restaurante del propio dueño de la sesión, nunca confiar en un
 * restauranteId que llegue del formulario del cliente — evita que alguien
 * manipule el DOM para escribir en la carta de otro restaurante. RLS ya lo
 * impediría a nivel de base de datos, pero resolverlo aquí también evita una
 * llamada que sabemos que va a fallar.
 */
async function requerirSesionYRestaurante() {
  const jwt = await obtenerJwtDeSesion();
  const identidad = await identidadActual();
  if (!jwt || !identidad) throw new Error('No has iniciado sesión.');
  const restaurante = await obtenerMiRestaurante(jwt);
  if (!restaurante) throw new Error('No se encontró tu restaurante.');
  return { jwt, identidad, restaurante };
}

export async function crearSeccionAction(nombre: string) {
  const { jwt, restaurante } = await requerirSesionYRestaurante();
  await dbCrearSeccion(jwt, restaurante.id, nombre);
  revalidatePath('/panel');
}

export async function editarSeccionAction(seccionId: string, nombre: string) {
  const { jwt } = await requerirSesionYRestaurante();
  await dbEditarSeccion(jwt, seccionId, nombre);
  revalidatePath('/panel');
}

export async function eliminarSeccionAction(seccionId: string) {
  const { jwt } = await requerirSesionYRestaurante();
  await dbEliminarSeccion(jwt, seccionId);
  revalidatePath('/panel');
}

export async function crearPlatoAction(datos: DatosPlato) {
  const { jwt, restaurante } = await requerirSesionYRestaurante();
  await dbCrearPlato(jwt, restaurante.id, datos);
  revalidatePath('/panel');
}

export async function editarPlatoAction(platoId: string, datos: Partial<DatosPlato> & { disponible?: boolean }) {
  const { jwt } = await requerirSesionYRestaurante();
  await dbEditarPlato(jwt, platoId, datos);
  revalidatePath('/panel');
}

export async function eliminarPlatoAction(platoId: string) {
  const { jwt } = await requerirSesionYRestaurante();
  await dbEliminarPlato(jwt, platoId);
  revalidatePath('/panel');
}

export async function crearSolicitudQrFisicoAction(datos: {
  tipo: TipoQrFisico;
  cantidad: number;
  direccionEnvio: string;
  notas?: string;
}) {
  const { jwt, identidad, restaurante } = await requerirSesionYRestaurante();
  await dbCrearSolicitudQrFisico(jwt, restaurante.id, datos, {
    restauranteNombre: restaurante.nombre,
    email: identidad.email,
  });
  revalidatePath('/panel');
}

export async function crearTicketAction(datos: { asunto: string; mensaje: string }) {
  const { jwt, identidad, restaurante } = await requerirSesionYRestaurante();
  await dbCrearTicket(jwt, restaurante.id, datos, {
    restauranteNombre: restaurante.nombre,
    email: identidad.email,
  });
  revalidatePath('/panel');
}
