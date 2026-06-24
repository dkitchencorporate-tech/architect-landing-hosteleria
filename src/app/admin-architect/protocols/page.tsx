'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { FileText, FileSignature, Presentation, Download, CheckCircle, Search, Clock } from 'lucide-react';
import Link from 'next/link';

export default function ProtocolsPage() {
  const [deals, setDeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    fetchSignedDocuments();
  }, []);

  const fetchSignedDocuments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('pipeline_deals')
        .select('*, profiles(business_name, email)')
        .eq('status', 'closed')
        .order('updated_at', { ascending: false });

      if (data) {
        setDeals(data);
      }
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-tight text-white mb-2 flex items-center gap-3">
          <FileSignature className="text-orange-500" /> Archivo de Contratos
        </h1>
        <p className="text-zinc-400 max-w-2xl">
          Repositorio centralizado de acuerdos comerciales, SLAs firmados y dossiers de clientes activos. Todo documento aquí tiene validez vinculante tras el pago.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20 text-zinc-500">
          <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mr-3"></div>
          Cargando archivo documental...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.map((deal, i) => (
            <div key={i} className="bg-zinc-900 border border-white/5 rounded-2xl p-6 flex flex-col group hover:border-orange-500/30 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <CheckCircle size={20} className="text-green-500" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest px-2 py-1 bg-white/5 text-zinc-400 rounded-md">
                  {new Date(deal.updated_at || deal.created_at).toLocaleDateString()}
                </span>
              </div>
              
              <h3 className="text-xl font-black text-white mb-1">{deal.profiles?.business_name || deal.title || 'Cliente'}</h3>
              <p className="text-sm text-zinc-500 mb-6 font-mono">{deal.plan_type === 'suscripcion' ? 'Plan Suscripción' : 'Plan Base (Pago Único)'}</p>
              
              <div className="space-y-3 mt-auto">
                <Link href={`/admin-architect/protocols/signed/${deal.id}`} className="w-full flex items-center justify-between p-3 bg-black/40 rounded-xl hover:bg-white/5 transition-colors border border-white/5 group/btn">
                  <div className="flex items-center gap-3 text-sm font-bold text-zinc-300 group-hover/btn:text-white">
                    <FileSignature size={16} className="text-orange-400" /> SLA & Contrato Firmado
                  </div>
                  <Download size={14} className="text-zinc-500" />
                </Link>
              </div>
            </div>
          ))}

          {deals.length === 0 && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center bg-white/5 border border-white/5 rounded-2xl border-dashed">
              <Clock size={48} className="text-zinc-600 mb-4" />
              <p className="text-zinc-400 font-medium">Aún no hay contratos cerrados y firmados en el sistema.</p>
              <p className="text-zinc-500 text-sm mt-1">Los documentos aparecerán aquí automáticamente cuando un cliente pague y acepte los términos.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
