import { redirect } from 'next/navigation';
import { obtenerJwtDeSesion, identidadActual } from '@/lib/sesion';
import { obtenerMiRestaurante, obtenerCodigoQr } from '@/lib/mi-restaurante';
import { listarMiCarta } from '@/lib/menu-propietario';
import { escaneosDelMes, escaneosUltimos30Dias } from '@/lib/escaneos-cliente';
import { listarMisSolicitudesQrFisico } from '@/lib/solicitudes-qr-fisico';
import { listarMisTickets } from '@/lib/tickets';
import PanelShell from '@/components/panel/PanelShell';

export const dynamic = 'force-dynamic';

export default async function Panel() {
  const jwt = await obtenerJwtDeSesion();
  const identidad = await identidadActual();

  if (!jwt || !identidad) {
    redirect('/panel/iniciar-sesion');
  }

  const restaurante = await obtenerMiRestaurante(jwt);

  if (!restaurante) {
    return (
      <div className="min-h-screen bg-[#171008] flex items-center justify-center px-6 text-center">
        <div className="max-w-md">
          <h1 className="text-xl font-bold text-white mb-2">Todavía no tienes un restaurante activo</h1>
          <p className="text-white/50 text-sm">
            Si acabas de pagar, espera unos minutos a que se aprovisione tu cuenta. Si el problema
            continúa, escríbenos por WhatsApp.
          </p>
        </div>
      </div>
    );
  }

  const [codigoQr, carta, escaneosMes, escaneos30d, solicitudesQr, tickets] = await Promise.all([
    obtenerCodigoQr(jwt, restaurante.id),
    listarMiCarta(jwt, restaurante.id),
    escaneosDelMes(jwt, restaurante.id),
    escaneosUltimos30Dias(jwt, restaurante.id),
    listarMisSolicitudesQrFisico(jwt, restaurante.id),
    listarMisTickets(jwt, restaurante.id),
  ]);

  return (
    <PanelShell
      identidad={identidad}
      restaurante={restaurante}
      codigoQr={codigoQr}
      carta={carta}
      escaneosMes={escaneosMes}
      escaneos30d={escaneos30d}
      solicitudesQr={solicitudesQr}
      tickets={tickets}
    />
  );
}
