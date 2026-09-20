/**
 * Freno de frecuencia por IP, en memoria del proceso.
 *
 * Es deliberadamente sencillo, y hay que ser honesto sobre lo que cubre y lo
 * que no. Las funciones de Vercel son efímeras y corren varias instancias a
 * la vez: este contador es por instancia, no global. Quita de en medio el
 * abuso trivial —un bucle desde una consola, un script sin distribuir— pero
 * no frena a quien reparta las peticiones entre varias IPs o instancias.
 *
 * Un límite global de verdad exige un contador compartido (Neon, Redis). Se
 * anota como pendiente en SEGURIDAD_Y_PERSISTENCIA_NEON.md; esto es lo que se
 * puede tener ya, sin añadir una dependencia nueva por una función que hace
 * una sola cosa.
 */

interface Cubo {
  marcas: number[];
}

const cubos = new Map<string, Cubo>();

/**
 * true si la IP ha superado el límite dentro de la ventana.
 * Cada llamada cuenta como un intento, se pase o no el límite.
 */
export function demasiadoSeguido(
  clave: string,
  limite: number,
  ventanaMs: number
): boolean {
  const ahora = Date.now();
  const cubo = cubos.get(clave) ?? { marcas: [] };
  cubo.marcas = cubo.marcas.filter((t) => ahora - t < ventanaMs);
  cubo.marcas.push(ahora);
  cubos.set(clave, cubo);

  // El mapa no puede crecer sin fin en una instancia de larga vida.
  if (cubos.size > 5000) {
    for (const [k, c] of cubos) {
      if (c.marcas.every((t) => ahora - t >= ventanaMs)) cubos.delete(k);
    }
  }

  return cubo.marcas.length > limite;
}

/** La IP del cliente, tal como la entrega el borde de Vercel. */
export function ipDeLaPeticion(peticion: Request): string {
  return peticion.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'desconocida';
}
