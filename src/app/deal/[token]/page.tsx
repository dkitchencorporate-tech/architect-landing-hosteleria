import React from 'react';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { notFound } from 'next/navigation';
import { CheckCircle, ShieldCheck, ArrowRight, Lock, Calendar, FileText, AlertTriangle } from 'lucide-react';
import DealAcceptance from '@/components/checkout/DealAcceptance';
import { marketplaceServices } from '@/lib/marketplace-data';
import { baseOperativaContract } from '@/lib/contracts/base-operativa';
export const metadata = {
  title: 'Sala de Cierre | Architect.Sys',
};

const decodeTokenPayload = (fullToken: string) => {
  try {
    const decodedToken = decodeURIComponent(fullToken);
    const parts = decodedToken.split('::');
    if (parts.length > 1) {
      return JSON.parse(decodeURIComponent(atob(parts[1])));
    }
  } catch(e) {
    console.error('Error decoding token payload:', e);
  }
  return null;
};

export default async function DealRoomPage({ params }: { params: { token: string } }) {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return cookieStore.get(name)?.value },
      },
    }
  );

  const decodedTokenStr = decodeURIComponent(params.token);
  let payload = decodeTokenPayload(decodedTokenStr);

  // Si el token es 'demo' o no se pudo decodificar, proveer el payload de demostración oficial en vivo
  if (!payload) {
    if (decodedTokenStr === 'demo' || decodedTokenStr.includes('demo')) {
      payload = {
        name: 'Mesón de Txistu (Demo VIP)',
        price: '3500',
        deposit: '500',
        services: ['infra-ia', 'digital-menu', 'crm-hosteleria'],
        customTerms: 'Garantía de incremento en ticket medio o devolución íntegra del depósito en 30 días.'
      };
    } else {
      return notFound();
    }
  }

  // Fetch Invitation Status (to see if it's already paid/used)
  const { data: invitation, error: invError } = await supabase
    .from('invitations')
    .select('*')
    .eq('token', decodedTokenStr)
    .single();

  const isPaid = invitation?.used === true;

  // Extraer datos del payload
  const lead = {
    name: payload.name || 'Cliente',
    restaurant_name: payload.name || 'Tu Negocio'
  };
  
  const deal = {
    id: invitation?.id || 'TEMP-ID',
    base_price: Number(payload.price) || 0,
    setup_fee: Number(payload.setup) || 0,
    plan_type: invitation?.plan_type || 'base',
    deal_notes: payload.notes || '',
    paymentTerms: payload.paymentTerms || '1_pago',
    discounts: payload.discountAmount > 0 ? [{ name: payload.discountName || 'Descuento', amount: Number(payload.discountAmount), type: payload.discountType }] : [],
    bonuses: []
  };

  const totalDiscounts = deal.discounts.reduce((sum: number, d: any) => sum + d.amount, 0);
  let totalContractPrice = deal.base_price + deal.setup_fee - totalDiscounts;
  
  // Si son 2 pagos y no es personalizado, el checkout es la mitad del precio base + setup fee total.
  // Pero el usuario dijo: "2 pagos de 350", es decir, pagan 350 ahora.
  // Vamos a asumir que pagan la mitad del precio base total, más el setup completo, menos descuentos.
  let initialCheckoutPrice = totalContractPrice;
  if (deal.paymentTerms === '2_pagos') {
    initialCheckoutPrice = (deal.base_price / 2) + deal.setup_fee - totalDiscounts;
  }

  // Prevención de precios negativos
  const finalPrice = Math.max(initialCheckoutPrice, 0);

  let serviceTitle = deal.plan_type === 'suscripcion' ? 'Plan Suscripción Pro' : 'Plan Base (Pago Único)';
  let isUpsell = false;
  let upsellData: any = null;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#111111] font-sans selection:bg-[#B8862A] selection:text-white pb-24">
      {/* Top Banner */}
      <div className="bg-[#111111] text-white py-3 px-6 flex justify-between items-center text-xs tracking-widest uppercase font-bold sticky top-0 z-50 shadow-md">
        <div className="flex items-center gap-2">
          <Lock size={14} className="text-[#B8862A]" /> Sala de Cierre Privada
        </div>
        <div className="text-white/50">REF: AS-{deal.id.split('-')[0].toUpperCase()}</div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-12">
        {/* Header Sala */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-5xl font-black mb-4">ARCHITECT<span className="text-[#B8862A]">.SYS</span></h1>
          <p className="text-sm tracking-[0.3em] uppercase text-[#888888] font-bold mb-8">Acuerdo de Servicios Digitales</p>
          <h2 className="text-2xl md:text-3xl font-bold text-[#444444]">Propuesta formal para <strong className="text-[#111111]">{lead.restaurant_name}</strong></h2>
        </div>

        {/* Status Banner */}
        {isPaid ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-xl mb-12 flex items-center justify-center gap-4">
            <CheckCircle size={32} className="text-green-600" />
            <div>
              <h3 className="font-bold text-lg">Acuerdo Cerrado y Pagado</h3>
              <p className="text-sm">Tu cuenta ha sido activada. Revisa tu correo electrónico para acceder al panel de control.</p>
            </div>
          </div>
        ) : (
          <div className="bg-white border border-[#E0E0E0] p-8 rounded-2xl shadow-xl mb-12 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#111111] to-[#B8862A]"></div>
            
            <div className="flex flex-col md:flex-row justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-xs tracking-widest uppercase text-[#B8862A] font-bold mb-4 border-b border-[#E0E0E0] pb-2">Resumen Financiero</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[#444444]">Servicio Contratado ({serviceTitle})</span>
                    <span className="font-bold">{deal.base_price} €</span>
                  </div>
                  {deal.setup_fee > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-[#444444]">Fee de Configuración Inicial</span>
                      <span className="font-bold">{deal.setup_fee} €</span>
                    </div>
                  )}
                  {deal.discounts?.map((d: any, i: number) => (
                    <div key={i} className="flex justify-between items-center text-red-600">
                      <span>Descuento: {d.name}</span>
                      <span className="font-bold">-{d.amount} €</span>
                    </div>
                  ))}
                </div>

                  {deal.paymentTerms === '2_pagos' && (
                    <div className="flex justify-between items-center text-[#B8862A] font-bold mt-2">
                      <span>Facilidad de Pago (2 Plazos)</span>
                      <span>Sólo pagas el 50% del servicio hoy</span>
                    </div>
                  )}

                <div className="border-t-2 border-[#111111] pt-4 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="text-[#888888] font-bold uppercase tracking-wider text-sm">Total a pagar ahora</span>
                    {deal.paymentTerms === '2_pagos' && (
                      <span className="text-[10px] text-[#888888]">Segundo pago al finalizar y entregar PWA.</span>
                    )}
                  </div>
                  <div className="text-4xl font-black">{finalPrice} <span className="text-xl">€</span></div>
                </div>
              </div>

              <div className="w-px bg-[#E0E0E0] hidden md:block"></div>

              <div className="flex-1">
                <h3 className="text-xs tracking-widest uppercase text-[#B8862A] font-bold mb-4 border-b border-[#E0E0E0] pb-2">Acuerdos Especiales & Bonos</h3>
                {deal.deal_notes && (
                  <div className="bg-[#FAFAFA] p-4 rounded-lg text-sm text-[#444444] italic mb-4 border-l-4 border-[#111111]">
                    "{deal.deal_notes}"
                  </div>
                )}
                {deal.bonuses?.length > 0 ? (
                  <ul className="space-y-2">
                    {deal.bonuses.map((b: string, i: number) => (
                      <li key={i} className="flex gap-2 text-sm text-[#444444]">
                        <CheckCircle size={16} className="text-[#B8862A] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[#888888]">Sin bonos adicionales en este acuerdo.</p>
                )}
              </div>
            </div>

            {/* Action CTA con Checkbox (Envíamos el token, no el dealId) */}
            <DealAcceptance dealId={decodedTokenStr} finalPrice={finalPrice} />
          </div>
        )}

        {/* El Contrato Incrustado (Visual) */}
        {deal.plan_type === 'base' ? (
          <div className="space-y-8">
            <div className="bg-white p-8 md:p-12 shadow-sm border border-[#E0E0E0] rounded-sm">
              <div className="border-b-2 border-[#111111] pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                 <div>
                   <div className="font-serif text-3xl font-black">ARCHITECT<span className="text-[#B8862A]">.SYS</span></div>
                   <div className="text-xs tracking-widest uppercase text-[#888888] font-bold mt-2">Dossier y Acuerdo de Servicios</div>
                 </div>
                 <div className="text-left md:text-right">
                   <div className="text-[10px] tracking-widest uppercase text-[#B8862A] font-bold mb-1">Contrato Legal Vinculante</div>
                   <div className="font-bold text-[#111111] bg-[#FAFAFA] px-3 py-1 rounded border border-[#E0E0E0]">REF: AS-{deal.id.split('-')[0].toUpperCase()}</div>
                 </div>
              </div>

              <div className="prose prose-sm max-w-none text-[#444444]">
                <p className="text-base mb-8">
                  De una parte, <strong>Architect.Sys</strong>, como proveedor de servicios digitales independiente.<br/>
                  De otra parte, <strong>{lead.name}</strong> en representación de <strong>{lead.restaurant_name}</strong> (en adelante, el Cliente).
                </p>

                {/* BLOQUE A: Propuesta */}
                <h3 className="text-[#111111] text-lg font-black border-l-4 border-[#B8862A] pl-3 mb-4 flex items-center gap-2">
                  <FileText size={20} className="text-[#B8862A]" /> SECCIÓN I: Propuesta y Entregables
                </h3>
                <div className="bg-[#FAFAFA] p-6 rounded-lg border border-[#E0E0E0] mb-8 space-y-4">
                  <p><strong>Infraestructura:</strong> {baseOperativaContract.proposal.infrastructure}</p>
                  <p><strong>Módulos Activos:</strong> {baseOperativaContract.proposal.modules}</p>
                  <p><strong>Política de Revisiones:</strong> {baseOperativaContract.proposal.revisions}</p>
                  <div className="bg-[#111111] text-white p-4 rounded-md mt-4">
                    <strong className="text-[#B8862A] uppercase text-xs tracking-widest block mb-1">Timeline de Ejecución (SLA)</strong>
                    {baseOperativaContract.proposal.slaTimeline}
                  </div>
                </div>

                {/* BLOQUE B: Dossier */}
                <h3 className="text-[#111111] text-lg font-black border-l-4 border-[#B8862A] pl-3 mb-4 flex items-center gap-2">
                  <Calendar size={20} className="text-[#B8862A]" /> SECCIÓN II: Dossier de Onboarding
                </h3>
                <div className="mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {baseOperativaContract.dossier.phases.map((phase, i) => (
                      <div key={i} className="border border-[#E0E0E0] p-4 rounded-lg bg-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-[#111111]"></div>
                        <span className="text-[#B8862A] font-bold text-xs uppercase tracking-widest">{phase.day}</span>
                        <h4 className="font-bold text-[#111111] mt-2 mb-2">{phase.title}</h4>
                        <p className="text-xs text-[#888888]">{phase.description}</p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-red-50 border border-red-100 p-5 rounded-lg flex gap-4 items-start">
                    <AlertTriangle size={24} className="text-red-500 shrink-0" />
                    <div>
                      <strong className="text-red-800 block mb-1">Cláusula Estricta de Abandono (Ghosting)</strong>
                      <p className="text-xs text-red-700 leading-relaxed">{baseOperativaContract.dossier.ghostingClause}</p>
                    </div>
                  </div>
                </div>

                {/* BLOQUE C: Legal */}
                <h3 className="text-[#111111] text-lg font-black border-l-4 border-[#B8862A] pl-3 mb-4 flex items-center gap-2">
                  <ShieldCheck size={20} className="text-[#B8862A]" /> SECCIÓN III: Contrato SLA
                </h3>
                <div className="space-y-6 text-justify">
                  <div>
                    <strong className="block text-[#111111] mb-1">1. Objeto del Contrato y Términos de Pago</strong>
                    <p className="text-xs">
                      {baseOperativaContract.legal.clause1_object} 
                      El presente acuerdo contempla un valor total de los servicios de {totalContractPrice}€. 
                      {deal.paymentTerms === '2_pagos' ? ' El Cliente abona un pago inicial en concepto de señal de ejecución. Un segundo y último pago se realizará exclusivamente contra entrega e implementación final en el entorno de producción.' : ' El Cliente ha seleccionado un pago único por el desarrollo de la infraestructura base.'}
                      {deal.discounts.length > 0 && deal.discounts.some((d: any) => d.type === '2_meses_free') && ' El cliente cuenta con un descuento especial de 2 meses de mantenimiento gratuito. El fee aplicable cubrirá el mantenimiento, servidores y 1 consultoría mensual, abonando el cliente el importe proporcional correspondiente (10 mensualidades sobre 12).'}
                    </p>
                  </div>
                  <div>
                    <strong className="block text-[#111111] mb-1">2. Política de Reembolso Condicionado</strong>
                    <p className="text-xs">{baseOperativaContract.legal.clause2_refunds}</p>
                  </div>
                  <div>
                    <strong className="block text-[#111111] mb-1">3. Exención de Responsabilidad Tecnológica</strong>
                    <p className="text-xs">{baseOperativaContract.legal.clause3_technology}</p>
                  </div>
                  <div>
                    <strong className="block text-[#111111] mb-1">4. Propiedad Intelectual y Licenciamiento</strong>
                    <p className="text-xs">{baseOperativaContract.legal.clause4_property}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 md:p-12 shadow-sm border border-[#E0E0E0] rounded-sm">
            <div className="border-b-2 border-[#111111] pb-6 mb-8 flex justify-between items-end">
               <div>
                 <div className="font-serif text-2xl font-black">ARCHITECT<span className="text-[#B8862A]">.SYS</span></div>
                 <div className="text-[10px] tracking-widest uppercase text-[#888888] font-bold mt-1">Condiciones Generales del Servicio</div>
               </div>
               <div className="text-right">
                 <div className="text-[10px] tracking-widest uppercase text-[#B8862A] font-bold mb-1">Contrato Legal Vinculante</div>
                 <div className="font-bold text-[#111111]">REF: AS-{deal.id.split('-')[0].toUpperCase()}</div>
               </div>
            </div>

          <div className="prose prose-sm max-w-none text-[#444444] prose-headings:font-serif prose-headings:text-[#111111] prose-strong:text-[#111111]">
            <p><strong>REUNIDOS</strong></p>
            <p>De una parte, <strong>Architect.Sys</strong>, como proveedor de servicios digitales independiente.</p>
            <p>De otra parte, <strong>{lead.name}</strong> en representación de <strong>{lead.restaurant_name}</strong> (en adelante, el Cliente).</p>
            
            <h3 className="text-[#B8862A] text-xs tracking-widest uppercase font-bold mt-8 border-b border-[#E0E0E0] pb-2">Cláusula 1 - Objeto</h3>
            <p>El presente contrato rige la prestación del servicio <strong>{serviceTitle}</strong>.</p>
            {isUpsell && upsellData?.deliverables && (
              <div className="mt-4 p-4 bg-[#FAFAFA] border border-[#E0E0E0] rounded-sm">
                <p className="mb-2"><strong>SLA Contractual:</strong> {upsellData.deliverables.contract}</p>
                <p><strong>Entregables:</strong> {upsellData.deliverables.proposal}</p>
              </div>
            )}
            
            <h3 className="text-[#B8862A] text-xs tracking-widest uppercase font-bold mt-8 border-b border-[#E0E0E0] pb-2">Cláusula 2 - Políticas de Cancelación</h3>
            {isUpsell ? (
              <p>El importe abonado compromete el tiempo y recursos del equipo de especialistas de Architect.Sys, por lo que <strong>no es reembolsable</strong> una vez iniciado el servicio o la auditoría acordada.</p>
            ) : (
              <p>Debido a la naturaleza digital e inmediata de la infraestructura desplegada, <strong>el importe inicial de configuración no es reembolsable</strong> una vez la sala de producción ha sido activada (Ley General para la Defensa de los Consumidores, excepciones al derecho de desistimiento en contenido digital).</p>
            )}

            <h3 className="text-[#B8862A] text-xs tracking-widest uppercase font-bold mt-8 border-b border-[#E0E0E0] pb-2">Cláusula 3 - Propiedad de los Activos</h3>
            {isUpsell ? (
              <p>Los entregables, reportes, creatividades o planes de optimización generados como parte de este servicio Upsell pasan a ser propiedad del Cliente una vez liquidados los honorarios correspondientes.</p>
            ) : (
              <p>Todos los activos generados (código, diseño, carta digital) permanecen bajo la licencia de uso de Architect.Sys hasta la finalización de los pagos acordados. Una vez liquidados, el dominio y los activos operativos pasan a ser propiedad intelectual del Cliente.</p>
            )}
          </div>
        </div>
        )}
      </div>
    </div>
  );
}
