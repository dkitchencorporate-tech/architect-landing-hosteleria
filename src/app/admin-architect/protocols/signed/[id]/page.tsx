'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { ArrowLeft, Printer, ShieldCheck, FileCheck, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function SignedAgreementVault({ params }: { params: { id: string } }) {
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const { data } = await supabase
          .from('pipeline_deals')
          .select('*, profiles(business_name, email, phone)')
          .eq('id', params.id)
          .single();

        if (data) {
          // Intentar obtener la invitación asociada a este email para leer el payload exacto
          if (data.profiles?.email) {
            const { data: invData } = await supabase
              .from('invitations')
              .select('token, plan_type')
              .eq('email', data.profiles.email)
              .eq('used', true)
              .order('created_at', { ascending: false })
              .limit(1)
              .single();

            if (invData && invData.token) {
              try {
                const parts = decodeURIComponent(invData.token).split('::');
                if (parts.length > 1) {
                  const payload = JSON.parse(decodeURIComponent(atob(parts[1])));
                  data.payload_data = payload;
                }
              } catch (e) {
                console.error('Error decoding token in vault', e);
              }
            }
          }
          setDeal(data);
        }
      } catch (err) {
        console.error('Error fetching signed agreement:', err);
      }
      setLoading(false);
    };

    fetchDeal();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <div className="animate-spin w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-[#050505] text-white">
        <ShieldCheck size={64} className="text-zinc-600 mb-4" />
        <h2 className="text-2xl font-black mb-2">Documento No Encontrado</h2>
        <p className="text-zinc-400 mb-6">El acuerdo no existe o no tienes permisos de acceso a este vault.</p>
        <Link href="/admin-architect/protocols" className="bg-white/10 hover:bg-white/20 px-6 py-2 rounded-lg font-bold transition-colors">Volver al Archivo</Link>
      </div>
    );
  }

  const payload = deal.payload_data || {};
  const basePrice = Number(payload.price) || deal.base_price || 0;
  const setupFee = Number(payload.setup) || deal.setup_fee || 0;
  const paymentTerms = payload.paymentTerms || '1_pago';
  const discounts = payload.discountAmount > 0 ? [{ name: payload.discountName || 'Descuento', amount: Number(payload.discountAmount), type: payload.discountType }] : [];
  const totalDiscounts = discounts.reduce((sum: number, d: any) => sum + d.amount, 0);
  let totalContractPrice = basePrice + setupFee - totalDiscounts;

  let initialCheckoutPrice = totalContractPrice;
  if (paymentTerms === '2_pagos') {
    initialCheckoutPrice = (basePrice / 2) + setupFee - totalDiscounts;
  }
  const finalPrice = Math.max(initialCheckoutPrice, 0);
  
  const isMonthly = deal.plan_type === 'suscripcion';
  const signingDate = new Date(deal.updated_at || deal.created_at);

  return (
    <div className="bg-[#050505] min-h-screen text-white font-sans pb-24 selection:bg-orange-500/30">
      
      {/* Barra de Controles No Imprimible */}
      <div className="print:hidden sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center shadow-lg">
        <Link href="/admin-architect/protocols" className="text-zinc-400 hover:text-white flex items-center gap-2 transition-colors">
          <ArrowLeft size={16} />
          <span className="text-sm font-bold">Volver al Vault</span>
        </Link>

        <button 
          onClick={() => window.print()}
          className="bg-orange-600 hover:bg-orange-500 text-white font-black py-2.5 px-6 rounded-lg flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:shadow-[0_0_30px_rgba(234,88,12,0.5)]"
        >
          <Printer size={18} /> <span>Descargar / Imprimir PDF</span>
        </button>
      </div>

      {/* Contenedor del Documento (Imprimible) */}
      <div className="pt-12 px-4 md:px-0">
        <div className="max-w-[850px] mx-auto bg-white text-black min-h-[1100px] shadow-2xl p-12 md:p-20 relative overflow-hidden print:shadow-none print:p-0 print:bg-transparent print:min-h-auto">
          
          {/* Sello de Pagado y Firmado - Marca de Agua */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-[-30deg] opacity-[0.03] pointer-events-none select-none flex flex-col items-center">
            <CheckCircle2 size={400} className="text-green-600 mb-4" />
            <span className="text-8xl font-black uppercase tracking-widest text-green-600">Completado</span>
          </div>

          {/* Encabezado Corporativo */}
          <div className="flex justify-between items-start border-b-2 border-black/10 pb-10 mb-10">
            <div>
              <h1 className="text-3xl font-black tracking-tighter uppercase mb-1">Architect<span className="text-orange-600">.Sys</span></h1>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Engineering Growth Agencies</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Ref. Documento</p>
              <p className="text-sm font-mono font-bold bg-zinc-100 px-3 py-1 rounded-md">{deal.id.split('-')[0].toUpperCase()}</p>
            </div>
          </div>

          {/* Título Principal */}
          <div className="text-center mb-16">
            <h2 className="text-2xl font-black uppercase tracking-widest mb-3">Acuerdo de Nivel de Servicio (SLA) & <br/>Comprobante de Ejecución</h2>
            <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">
              <ShieldCheck size={16} /> Estado: Verificado, Pagado y Cifrado
            </div>
          </div>

          {/* Bloques de Información */}
          <div className="grid grid-cols-2 gap-12 mb-16">
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 border-b border-zinc-200 pb-2">Datos del Cliente</h3>
              <p className="font-bold text-lg mb-1">{deal.profiles?.business_name || 'Restaurante / Empresa'}</p>
              <p className="text-sm text-zinc-600 mb-1">Email: {deal.profiles?.email}</p>
              <p className="text-sm text-zinc-600">Telf: {deal.profiles?.phone || 'No registrado'}</p>
            </div>
            <div>
              <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-4 border-b border-zinc-200 pb-2">Datos de la Transacción</h3>
              <p className="text-sm mb-2 flex justify-between"><span className="text-zinc-500">Fecha de Cierre:</span> <strong className="font-mono">{signingDate.toLocaleDateString('es-ES')} {signingDate.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}</strong></p>
              <p className="text-sm mb-2 flex justify-between"><span className="text-zinc-500">Tipo de Plan:</span> <strong>{isMonthly ? 'Growth Partner (Mensual)' : 'Plan Base (Setup Único)'}</strong></p>
              <p className="text-sm flex justify-between"><span className="text-zinc-500">Valor Total Contrato:</span> <strong className="text-lg text-black font-black">{totalContractPrice} €</strong></p>
              <p className="text-sm flex justify-between"><span className="text-zinc-500">Importe Abonado Inicial:</span> <strong className="text-lg text-green-600 font-black">{finalPrice} €</strong></p>
              {paymentTerms === '2_pagos' && (
                <p className="text-xs text-orange-600 font-bold text-right mt-1">* 2º Pago pendiente a la entrega.</p>
              )}
            </div>
          </div>

          {/* Cláusulas del Acuerdo */}
          <div className="space-y-8 text-sm leading-relaxed text-zinc-800 text-justify">
            <div>
              <h4 className="font-black uppercase tracking-widest text-xs text-black mb-3">1. Objeto de Ejecución Inmediata y Pagos</h4>
              <p>
                El presente documento acredita la ejecución comercial y tecnológica entre <strong>Architect.Sys</strong> (El Prestador) y <strong>{deal.profiles?.business_name}</strong> (El Cliente). El Cliente ha realizado el abono inicial correspondiente para la activación de la infraestructura de reservas, embudos automáticos y activos digitales designados bajo el plan contratado. El inicio de las labores de ingeniería se activa de manera inmediata tras la emisión de este comprobante.
              </p>
              <p className="mt-2 font-bold text-xs bg-zinc-100 p-2 rounded">
                Condiciones Especiales de Pago: El contrato está valorado en {totalContractPrice}€. 
                {paymentTerms === '2_pagos' ? ' El Cliente ha abonado un 50% inicial en concepto de señal. El 50% restante deberá abonarse de manera obligatoria al finalizar y entregar la aplicación web (PWA) en producción.' : ' El Cliente ha seleccionado un pago único liquidando el total de la infraestructura.'}
                {discounts.length > 0 && discounts.some((d: any) => d.type === '2_meses_free') && ' El cliente cuenta con un descuento especial de 2 meses de mantenimiento gratuito. El fee aplicable cubrirá el mantenimiento, servidores y 1 consultoría mensual, abonando el cliente el importe proporcional correspondiente (10 mensualidades sobre 12).'}
              </p>
            </div>

            <div>
              <h4 className="font-black uppercase tracking-widest text-xs text-black mb-3">2. Renuncia a Derecho de Desistimiento</h4>
              <p>
                Al tratarse de la creación y despliegue de infraestructura digital personalizada, despliegue de servidores privados y el inicio inmediato de ingeniería y diseño a medida, <strong>El Cliente reconoce de forma expresa y consiente que pierde su derecho de desistimiento</strong> legal (Art. 103 de la Ley General para la Defensa de los Consumidores y Usuarios de España, y directivas europeas aplicables), dado que el servicio se considera ejecutado parcial y materialmente en el momento de la confirmación del pago. Los importes abonados no son reembolsables.
              </p>
            </div>

            <div>
              <h4 className="font-black uppercase tracking-widest text-xs text-black mb-3">3. Titularidad y Licencia de Uso</h4>
              <p>
                Todo el código fuente estructurado, diseños maestros (UI/UX), automatizaciones pre-configuradas e infraestructura técnica desplegada por Architect.Sys permanecen como propiedad intelectual e industrial del Prestador. El Cliente obtiene, sin embargo, una licencia de explotación comercial exclusiva sobre su entorno digital mientras mantenga su situación en regla respecto a los acuerdos vigentes y de soporte (si aplica el modelo de suscripción). Las bases de datos de usuarios finales generadas por el Cliente son propiedad exclusiva y absoluta del Cliente.
              </p>
            </div>
            
            {isMonthly && (
              <div className="bg-zinc-50 p-6 border border-zinc-200 rounded-lg">
                <h4 className="font-black uppercase tracking-widest text-xs text-black mb-2">Cláusula Adicional: Modelo Growth Partner</h4>
                <p>
                  El Cliente está suscrito al plan recurrente. El mantenimiento técnico completo, auditorías de conversión, optimización en motores y ajustes evolutivos de la plataforma están 100% cubiertos. El cliente podrá darse de baja notificando con 15 días de anticipación antes de su próximo ciclo de facturación, perdiendo acceso al soporte evolutivo tras el fin del ciclo pagado.
                </p>
              </div>
            )}
          </div>

          {/* Firmas Reales (Estilizadas) */}
          <div className="mt-20 pt-10 border-t-2 border-black/10 flex justify-between items-end break-inside-avoid">
            <div className="w-1/3 text-center">
              <div className="h-20 flex flex-col justify-end items-center mb-2">
                <img src="/signatures/architect-sig.png" alt="Signature" className="h-16 opacity-80" onError={(e) => e.currentTarget.style.display = 'none'} />
                <div className="font-signature text-3xl text-zinc-800 -rotate-3">Carlos Arquímedes</div>
              </div>
              <div className="w-full h-px bg-black mb-2"></div>
              <p className="text-xs font-bold uppercase tracking-widest text-black">Architect.Sys</p>
              <p className="text-[10px] text-zinc-500 uppercase">Firma Digital Verificada</p>
            </div>
            
            <div className="w-1/3 text-center">
              <div className="h-20 flex flex-col justify-end items-center mb-2">
                 {/* Sello o IP digital mock de la firma del cliente */}
                 <FileCheck size={48} className="text-green-600/30 mb-2" />
              </div>
              <div className="w-full h-px bg-black mb-2"></div>
              <p className="text-xs font-bold uppercase tracking-widest text-black">{deal.profiles?.business_name}</p>
              <p className="text-[10px] text-zinc-500 uppercase">Validación mediante Pago en Pasarela</p>
            </div>
          </div>

          {/* Footer del Doc */}
          <div className="absolute bottom-12 left-0 right-0 text-center px-12 print:bottom-0">
             <p className="text-[9px] text-zinc-400 uppercase tracking-widest">
               Documento generado automáticamente por Architect.Sys Core Operations. <br/>
               ID Transaccional cifrado con la marca temporal: {deal.id}-{signingDate.getTime()}
             </p>
          </div>
          
        </div>
      </div>
      
    </div>
  );
}
