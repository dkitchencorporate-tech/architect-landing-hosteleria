'use client';

import React, { useState } from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useAlert } from '@/components/ui/AlertProvider';

interface WhopCheckoutButtonProps {
  dealId: string;
  finalPrice: number;
}

export default function WhopCheckoutButton({ dealId, finalPrice }: WhopCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { showAlert } = useAlert();

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/whop/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dealId })
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirigir al enlace de pago dinámico o simulador
      } else {
        showAlert('Error generando el enlace de pago: ' + (data.error || 'Desconocido'));
      }
    } catch (error) {
      console.error('Error:', error);
      showAlert('Error de conexión al intentar procesar el pago.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading}
      className="w-full md:w-auto bg-[#111111] hover:bg-[#222222] text-white font-bold py-4 px-12 rounded-xl transition-all flex items-center justify-center gap-3 mx-auto shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 disabled:transform-none"
    >
      {loading ? (
        <><Loader2 size={20} className="animate-spin" /> Procesando...</>
      ) : (
        <>Firmar y Pagar {finalPrice}€ <ArrowRight size={20} /></>
      )}
    </button>
  );
}
