import type { Metadata } from 'next';
import DigitalPresenceValue from '@/components/sections/DigitalPresenceValue';
import QrMenuPricing from '@/components/sections/QrMenuPricing';
import FeatureSplit from '@/components/sections/FeatureSplit';
import ObjectionHandling from '@/components/sections/ObjectionHandling';
import SiguientePeldano from '@/components/sections/SiguientePeldano';

export const metadata: Metadata = {
  title: 'QR Menú | DKitchen',
  description:
    'Carta digital con QR estable: imprime una vez y cambia tu carta las veces que quieras. Plan Básico 9€/mes o Ampliado 25€/mes, primer mes a 1€.',
  alternates: { canonical: 'https://dkitchencorporate.es/qr' },
};

export default function PaginaQr() {
  return (
    <div className="bg-white">
      <DigitalPresenceValue />

      {/* FEATURE-SPLIT — URL estable (Parte 6, Sección 3): el diferenciador
          técnico más fuerte del producto, hoy perdido como un bullet suelto. */}
      <FeatureSplit icono="🔗" titulo="Cambias el menú. Tu QR sigue funcionando igual." fondo="crema">
        <p className="mb-4">
          El código QR apunta a una URL estable, no a tu carta directamente. Cuando cambias precios, fotos o platos
          desde tu panel, el QR físico ya impreso sigue apuntando al mismo sitio — nunca hay que reimprimir nada.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 text-sm">
          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4">
            <p className="font-bold text-gray-900 mb-1">Con DKitchen</p>
            <p className="text-gray-600">Cambias el menú → tu QR sigue funcionando igual.</p>
          </div>
          <div className="flex-1 bg-white border border-gray-200 rounded-xl p-4">
            <p className="font-bold text-gray-500 mb-1">La alternativa habitual</p>
            <p className="text-gray-500">Cambias el menú → reimprimes el QR en cada mesa, otra vez.</p>
          </div>
        </div>
      </FeatureSplit>

      <QrMenuPricing />

      <ObjectionHandling
        preguntas={[
          {
            pregunta: '¿Qué pasa después del primer mes a 1€?',
            respuesta: 'Se cobra automáticamente el plan completo (9€ o 25€/mes) a la misma tarjeta. Puedes cancelar antes desde tu panel si no quieres continuar.',
          },
          {
            pregunta: '¿Puedo cambiar de plan luego?',
            respuesta: 'Sí, subir de Básico a Ampliado (o al revés) se hace desde tu panel en cualquier momento, sin perder tu carta ni tu QR.',
          },
          {
            pregunta: '¿Los QR físicos van aparte?',
            respuesta: 'Sí, es una compra separada desde tu panel una vez activada la cuenta — nunca están incluidos en la cuota mensual.',
          },
        ]}
      />

      <SiguientePeldano siguiente="experience" />
    </div>
  );
}
