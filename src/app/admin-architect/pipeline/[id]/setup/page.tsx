'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { ArrowLeft, Rocket, Plus, Trash2, Send } from 'lucide-react';
import Link from 'next/link';
import { marketplaceServices } from '@/lib/marketplace-data';

export default function DealSetupPage({ params }: { params: { id: string } }) {
  const [lead, setLead] = useState<any>(null);
  const [setupMode, setSetupMode] = useState<'core' | 'upsell'>('core');
  const [planType, setPlanType] = useState('growth');
  const [basePrice, setBasePrice] = useState(299);
  const [setupFee, setSetupFee] = useState(0);
  const [discounts, setDiscounts] = useState<{name: string, amount: number}[]>([]);
  const [bonuses, setBonuses] = useState<string[]>(['Acceso anticipado a Creative Factory']);
  const [dealNotes, setDealNotes] = useState('');
  
  const [newBonus, setNewBonus] = useState('');
  const [newDiscountName, setNewDiscountName] = useState('');
  const [newDiscountAmount, setNewDiscountAmount] = useState('');

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const supabase = createClient();

  useEffect(() => {
    const fetchLead = async () => {
      const { data } = await supabase.from('leads').select('*').eq('id', params.id).single();
      if (data) setLead(data);
    };
    fetchLead();
  }, [params.id]);

  useEffect(() => {
    if (setupMode === 'core') {
      if (planType === 'growth') {
        setBasePrice(299);
        setSetupFee(0);
      } else if (planType === 'base') {
        setBasePrice(700);
        setSetupFee(0);
      } else {
        setPlanType('growth');
      }
    } else {
      const upsell = marketplaceServices.find(s => s.id === planType);
      if (upsell) {
        const num = upsell.priceEst.match(/\d+/);
        setBasePrice(num ? parseInt(num[0]) : 0);
        setSetupFee(0);
      } else {
        setPlanType(marketplaceServices[0].id);
      }
    }
  }, [planType, setupMode]);

  const addDiscount = () => {
    if (newDiscountName && newDiscountAmount) {
      setDiscounts([...discounts, { name: newDiscountName, amount: Number(newDiscountAmount) }]);
      setNewDiscountName('');
      setNewDiscountAmount('');
    }
  };

  const addBonus = () => {
    if (newBonus) {
      setBonuses([...bonuses, newBonus]);
      setNewBonus('');
    }
  };

  const handleDispatch = async () => {
    setLoading(true);
    setError('');
    try {
      // 1. Guardar el Deal en Supabase
      const { data: deal, error: dealError } = await supabase
        .from('deals')
        .insert([{
          lead_id: lead.id,
          plan_type: planType,
          base_price: basePrice,
          setup_fee: setupFee,
          discounts: discounts,
          bonuses: bonuses,
          deal_notes: dealNotes,
          status: 'sent'
        }])
        .select()
        .single();

      if (dealError) throw dealError;

      // 2. Disparar el API de Resend para el Email
      const response = await fetch('/api/dispatch-deal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ deal, lead })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error enviando el correo');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!lead) return <div className="p-8 text-white">Cargando datos del lead...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Link href="/admin-architect/pipeline" className="text-zinc-500 hover:text-white flex items-center gap-2 mb-6">
        <ArrowLeft size={16} />
        <span className="text-sm font-bold">Volver al Pipeline</span>
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tight mb-2">Configurar Deal</h1>
          <p className="text-zinc-400">Preparando propuesta para <strong className="text-white">{lead.restaurant_name}</strong> ({lead.name})</p>
        </div>
        <div className="bg-orange-500/10 text-orange-400 px-4 py-2 rounded-xl font-bold uppercase tracking-widest text-xs flex gap-4">
          <button onClick={() => setSetupMode('core')} className={`transition-colors ${setupMode === 'core' ? 'text-orange-500' : 'text-orange-500/50 hover:text-orange-400'}`}>MODO CORE</button>
          <span className="text-orange-500/30">|</span>
          <button onClick={() => setSetupMode('upsell')} className={`transition-colors ${setupMode === 'upsell' ? 'text-orange-500' : 'text-orange-500/50 hover:text-orange-400'}`}>MODO UPSELL</button>
        </div>
      </div>

      <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 mb-6">
        <h2 className="text-lg font-bold text-white mb-4">1. Selección de {setupMode === 'core' ? 'Arquitectura' : 'Servicio Upsell'}</h2>
        
        {setupMode === 'core' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${planType === 'growth' ? 'border-orange-500 bg-orange-500/5' : 'border-white/5 bg-black/50 hover:border-white/20'}`}>
              <input type="radio" className="hidden" name="plan" value="growth" checked={planType === 'growth'} onChange={() => setPlanType('growth')} />
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white">Growth Partner</span>
                <span className="text-orange-500 font-black">299€/mes</span>
              </div>
              <p className="text-xs text-zinc-500">SaaS completo + Mantenimiento + IA</p>
            </label>
            <label className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${planType === 'base' ? 'border-orange-500 bg-orange-500/5' : 'border-white/5 bg-black/50 hover:border-white/20'}`}>
              <input type="radio" className="hidden" name="plan" value="base" checked={planType === 'base'} onChange={() => setPlanType('base')} />
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white">Plan Base</span>
                <span className="text-white font-black">700€ Único</span>
              </div>
              <p className="text-xs text-zinc-500">Solo infraestructura. Sin mantenimiento.</p>
            </label>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {marketplaceServices.map((service) => (
              <label key={service.id} className={`cursor-pointer p-4 rounded-xl border-2 transition-all ${planType === service.id ? 'border-orange-500 bg-orange-500/5' : 'border-white/5 bg-black/50 hover:border-white/20'}`}>
                <input type="radio" className="hidden" name="plan" value={service.id} checked={planType === service.id} onChange={() => setPlanType(service.id)} />
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-white">{service.title}</span>
                </div>
                <p className="text-xs text-zinc-500 mb-2">{service.shortDescription}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-orange-500 font-black text-sm">{service.priceEst}</span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 mb-6 flex flex-col md:flex-row justify-between items-center">
        <div>
          <h2 className="text-lg font-bold text-white mb-1">Precio Base Configurado</h2>
          <p className="text-xs text-zinc-500">Ajusta el precio manualmente para contratos personalizados.</p>
        </div>
        <div className="flex items-center gap-2 mt-4 md:mt-0">
          <input 
            type="number" 
            value={basePrice} 
            onChange={(e) => setBasePrice(Number(e.target.value))} 
            className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-white font-bold text-xl w-32 text-right focus:border-orange-500 outline-none"
          />
          <span className="text-xl font-bold text-zinc-400">€</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Descuentos */}
        <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">2. Descuentos / Rebajas</h2>
          <div className="space-y-3 mb-4">
            {discounts.map((d, i) => (
              <div key={i} className="flex justify-between items-center bg-black/50 p-3 rounded-lg border border-white/5">
                <span className="text-sm text-zinc-300">{d.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-red-400 font-bold">-{d.amount}€</span>
                  <button onClick={() => setDiscounts(discounts.filter((_, idx) => idx !== i))} className="text-zinc-600 hover:text-red-500"><Trash2 size={16} /></button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Ej: Bonificación Setup" className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" value={newDiscountName} onChange={e => setNewDiscountName(e.target.value)} />
            <input type="number" placeholder="€" className="w-20 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" value={newDiscountAmount} onChange={e => setNewDiscountAmount(e.target.value)} />
            <button onClick={addDiscount} className="bg-white/10 hover:bg-white/20 p-2 rounded-lg text-white"><Plus size={18} /></button>
          </div>
        </div>

        {/* Bonos */}
        <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">3. Bonos Extra (Over-deliver)</h2>
          <div className="space-y-3 mb-4">
            {bonuses.map((b, i) => (
              <div key={i} className="flex justify-between items-center bg-black/50 p-3 rounded-lg border border-white/5">
                <span className="text-sm text-zinc-300">{b}</span>
                <button onClick={() => setBonuses(bonuses.filter((_, idx) => idx !== i))} className="text-zinc-600 hover:text-red-500"><Trash2 size={16} /></button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input type="text" placeholder="Ej: Dominio Gratis 1 año" className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-sm text-white" value={newBonus} onChange={e => setNewBonus(e.target.value)} />
            <button onClick={addBonus} className="bg-white/10 hover:bg-white/20 p-2 rounded-lg text-white"><Plus size={18} /></button>
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6 mb-8">
        <h2 className="text-lg font-bold text-white mb-4">4. Notas Privadas del Contrato</h2>
        <p className="text-xs text-zinc-500 mb-2">Estas notas aparecerán en la propuesta bajo "Acuerdos Específicos de la Reunión".</p>
        <textarea 
          className="w-full bg-black/50 border border-white/10 rounded-xl p-4 text-white text-sm focus:border-orange-500 transition-colors min-h-[100px]"
          placeholder="Ej: Como acordamos, la carta digital incluirá las fotos tomadas en el local de Madrid..."
          value={dealNotes}
          onChange={e => setDealNotes(e.target.value)}
        ></textarea>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6">{error}</div>}
      
      {success ? (
        <div className="bg-green-500/10 border border-green-500/20 p-8 rounded-2xl text-center">
          <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Rocket size={32} />
          </div>
          <h2 className="text-2xl font-black text-white mb-2">¡Deal Enviado con Éxito!</h2>
          <p className="text-zinc-400">El cliente ha recibido el email con el enlace a la Sala de Cierre. Te avisaremos cuando firme y pague.</p>
          <Link href="/admin-architect/pipeline" className="mt-6 inline-block bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-colors">
            Volver al Pipeline
          </Link>
        </div>
      ) : (
        <button 
          onClick={handleDispatch}
          disabled={loading}
          className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed text-black font-black py-5 px-6 rounded-xl flex items-center justify-center gap-3 transition-all text-lg shadow-[0_0_40px_rgba(249,115,22,0.3)]"
        >
          {loading ? 'Generando Contratos y Enviando...' : 'Generar y Despachar Documentos'}
          <Send size={24} />
        </button>
      )}

    </div>
  );
}
