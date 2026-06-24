import React from 'react';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { notFound } from 'next/navigation';
import { CheckCircle, ShieldCheck, ArrowRight, Lock } from 'lucide-react';
import WhopCheckoutButton from '@/components/checkout/WhopCheckoutButton';
export const metadata = {
  title: 'Sala de Cierre | Architect.Sys',
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

  // Fetch Deal & Lead
  const { data: deal, error: dealError } = await supabase
    .from('deals')
    .select('*, leads(*)')
    .eq('magic_token', params.token)
    .single();

  if (dealError || !deal) {
    console.error(dealError);
    return notFound();
  }

  const lead = deal.leads;
  const isPaid = deal.status === 'paid';
  const isSigned = deal.status === 'signed';

  // Calculos
  const totalDiscount = (deal.discounts || []).reduce((acc: number, curr: any) => acc + curr.amount, 0);
  const finalPrice = deal.base_price + deal.setup_fee - totalDiscount;

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
                    <span className="text-[#444444]">Servicio Contratado ({deal.plan_type === 'growth' ? 'Growth Partner' : 'Plan Base'})</span>
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

                <div className="border-t-2 border-[#111111] pt-4 flex justify-between items-end">
                  <span className="text-[#888888] font-bold uppercase tracking-wider text-sm">Total a pagar ahora</span>
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

            {/* Action CTA */}
            <div className="mt-8 text-center pt-8 border-t border-[#E0E0E0]">
              <p className="text-xs text-[#888888] mb-4 flex items-center justify-center gap-2">
                <ShieldCheck size={14} /> Al proceder al pago, aceptas los términos del Contrato de Servicios listado a continuación.
              </p>
              
              {/* Botón de Checkout de Whop */}
              <WhopCheckoutButton dealId={deal.id} finalPrice={finalPrice} />
            </div>
          </div>
        )}

        {/* El Contrato Incrustado (Visual) */}
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
            <p>El presente contrato rige la prestación del servicio <strong>{deal.plan_type === 'growth' ? 'Growth Partner' : 'Plan Base'}</strong> para el desarrollo y optimización digital del restaurante del Cliente.</p>
            
            <h3 className="text-[#B8862A] text-xs tracking-widest uppercase font-bold mt-8 border-b border-[#E0E0E0] pb-2">Cláusula 2 - Políticas de Cancelación</h3>
            <p>Debido a la naturaleza digital e inmediata de la infraestructura desplegada, <strong>el importe inicial de configuración no es reembolsable</strong> una vez la sala de producción ha sido activada (Ley General para la Defensa de los Consumidores, excepciones al derecho de desistimiento en contenido digital).</p>

            <h3 className="text-[#B8862A] text-xs tracking-widest uppercase font-bold mt-8 border-b border-[#E0E0E0] pb-2">Cláusula 3 - Propiedad de los Activos</h3>
            <p>Todos los activos generados (código, diseño, carta digital) permanecen bajo la licencia de uso de Architect.Sys hasta la finalización de los pagos acordados. Una vez liquidados, el dominio y los activos operativos pasan a ser propiedad intelectual del Cliente.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
