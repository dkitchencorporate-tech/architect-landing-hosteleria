'use client';

import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import WhopCheckoutButton from './WhopCheckoutButton';

interface DealAcceptanceProps {
  dealId: string;
  finalPrice: number;
}

export default function DealAcceptance({ dealId, finalPrice }: DealAcceptanceProps) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="mt-8 text-center pt-8 border-t border-[#E0E0E0]">
      <div className="mb-6 flex flex-col items-center justify-center gap-3">
        <label className="flex items-start gap-3 cursor-pointer text-left max-w-lg mx-auto bg-[#FAFAFA] p-4 rounded-lg border border-[#E0E0E0] hover:border-[#B8862A] transition-colors">
          <input 
            type="checkbox" 
            className="mt-1 w-5 h-5 accent-[#B8862A]"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />
          <span className="text-sm text-[#444444]">
            He leído y acepto los <strong className="text-[#111111]">Términos Legales, SLA y Políticas de Cancelación</strong> detallados en este documento. Entiendo que este pago establece un contrato vinculante con Architect.Sys.
          </span>
        </label>
      </div>
      
      {accepted ? (
        <WhopCheckoutButton dealId={dealId} finalPrice={finalPrice} />
      ) : (
        <button 
          disabled
          className="bg-[#E0E0E0] text-[#888888] font-bold py-4 px-8 rounded-xl cursor-not-allowed w-full max-w-sm mx-auto flex justify-center items-center gap-2"
        >
          <ShieldCheck size={18} /> Aceptar Términos para Pagar
        </button>
      )}
    </div>
  );
}
