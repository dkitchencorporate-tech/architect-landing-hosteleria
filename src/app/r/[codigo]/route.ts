import { NextResponse } from 'next/server';
import { resolverCodigo } from '@/lib/menu';

/**
 * LO QUE HAY DETRÁS DEL QR IMPRESO
 *
 * El código impreso en la pegatina de la mesa apunta aquí, a `/r/{codigo}`, y
 * no directamente a la carta. Esa capa intermedia es lo que permite dos cosas
 * que de otro modo se excluyen entre sí:
 *
 *  1. **El QR impreso no caduca nunca.** El restaurante puede cambiar de nombre
 *     o de slug y las pegatinas ya pegadas siguen funcionando. Reimprimir
 *     cartelería es un coste real para el cliente y una llamada incómoda.
 *
 *  2. **Hay escaneos que contar.** El umbral de 600 al mes del marco
 *     Sostener / Evolucionar / Soltar necesita un sitio donde sumarse. Si el QR
 *     llevara directo a la carta, ese número no existiría.
 */

export const runtime = 'nodejs';
// Un redirector que se cachea deja de contar. Esta ruta se ejecuta siempre.
export const dynamic = 'force-dynamic';

// El mismo formato que impone la restricción de la tabla. Comprobarlo aquí
// evita ir a la base a preguntar por algo que no puede existir.
const CODIGO_VALIDO = /^[a-z0-9]{8,16}$/;

export async function GET(
  peticion: Request,
  { params }: { params: { codigo: string } }
) {
  const codigo = params.codigo.toLowerCase();
  const origen = new URL(peticion.url).origin;

  if (!CODIGO_VALIDO.test(codigo)) {
    return NextResponse.redirect(`${origen}/carta-no-disponible`, 302);
  }

  let destino: { slug: string } | null = null;
  try {
    destino = await resolverCodigo(
      codigo,
      peticion.headers.get('user-agent'),
      // El país lo sabe el borde de Vercel a partir de la petición. No hace
      // falta ningún tercero y no se guarda la IP: solo dos letras.
      peticion.headers.get('x-vercel-ip-country')
    );
  } catch (error) {
    // Si la base falla, quien está en la mesa no tiene la culpa: ve una página
    // que le explica qué hacer, no una traza de error.
    console.error('No se pudo resolver el código de QR:', error);
    return NextResponse.redirect(`${origen}/carta-no-disponible`, 302);
  }

  if (!destino) {
    // Un código inexistente y uno desactivado responden igual. Distinguirlos
    // permitiría recorrer el catálogo de clientes probando códigos.
    return NextResponse.redirect(`${origen}/carta-no-disponible`, 302);
  }

  // 302 y no 301: la redirección permanente se queda guardada en el navegador,
  // y a partir de la segunda visita el teléfono iría directo a la carta sin
  // pasar por aquí. Los escaneos dejarían de contarse sin que nadie se entere.
  return NextResponse.redirect(`${origen}/m/${destino.slug}`, 302);
}
