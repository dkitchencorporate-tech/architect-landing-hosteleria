'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';

export default function ContractGenerator() {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [planType, setPlanType] = useState('base');
  const supabase = createClient();

  useEffect(() => {
    const fetchClients = async () => {
      const { data } = await supabase
        .from('business_profiles')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) setClients(data);
    };
    fetchClients();
  }, []);

  return (
    <div className="p-8 min-h-screen flex flex-col md:flex-row gap-8">
      {/* Sidebar Controls */}
      <div className="w-full md:w-80 flex flex-col gap-6 print:hidden">
        <div>
          <Link href="/admin-architect/protocols" className="text-zinc-500 hover:text-white flex items-center gap-2 mb-6">
            <ArrowLeft size={16} />
            <span className="text-sm font-bold">Volver</span>
          </Link>
          <h1 className="text-2xl font-black text-white mb-2">Generador SLA</h1>
          <p className="text-sm text-zinc-400">Contrato de Nivel de Servicio adaptativo.</p>
        </div>

        <div className="bg-[#111111] border border-white/5 rounded-xl p-4">
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Cliente</label>
          <select 
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#B8862A] mb-4"
            onChange={(e) => setSelectedClient(clients.find(c => c.id === e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>Seleccionar cliente...</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.business_name || 'Restaurante Sin Nombre'}</option>
            ))}
          </select>

          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Plan Vendido</label>
          <select 
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#B8862A]"
            onChange={(e) => setPlanType(e.target.value)}
            value={planType}
          >
            <option value="base">Plan Base (Setup Único)</option>
            <option value="growth">Growth Partner (Mensual)</option>
          </select>
        </div>

        <button 
          onClick={() => window.print()}
          className="bg-[#B8862A] hover:bg-[#a07322] text-white font-black py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all mt-auto"
        >
          <Printer size={20} /> Imprimir Contrato
        </button>
      </div>

      {/* Document Preview */}
      <div className="flex-1 bg-[#FAFAFA] text-[#111111] rounded-sm p-12 shadow-2xl overflow-y-auto max-h-[calc(100vh-4rem)] print:max-h-none print:shadow-none print:p-0">
        <div className="max-w-3xl mx-auto font-serif text-justify text-sm leading-relaxed">
          
          <div className="text-center mb-12 border-b-2 border-[#111111] pb-8">
            <h4 className="text-[#B8862A] font-bold tracking-widest uppercase mb-4 text-xs">Architect.Sys Agency</h4>
            <h1 className="text-2xl font-black uppercase tracking-widest mb-2">Acuerdo de Nivel de Servicio (SLA)</h1>
            <p className="text-[#444444]">Desarrollo y Mantenimiento de Infraestructura Digital</p>
          </div>

          <div className="mb-8">
            <p className="mb-4">En la ciudad de Madrid, a {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}.</p>
            <p className="mb-4">
              <strong>REUNIDOS</strong>
            </p>
            <p className="mb-4">
              De una parte, <strong>Architect.Sys</strong>, agencia proveedora de servicios digitales independientes (en adelante, el PRESTADOR).
            </p>
            <p className="mb-4">
              De otra parte, {selectedClient ? <strong>{selectedClient.business_name}</strong> : <span className="bg-yellow-200 text-black px-1">[Seleccionar Cliente]</span>}, representada por la persona autorizada al efecto (en adelante, el CLIENTE).
            </p>
          </div>

          <h3 className="font-bold text-lg mb-4 mt-8 border-b border-[#E0E0E0] pb-2 text-[#111111]">1. OBJETO DEL CONTRATO</h3>
          <p className="mb-4">
            El presente contrato rige la prestación del servicio <strong>{planType === 'growth' ? 'Growth Partner' : 'Plan Base'}</strong> para el desarrollo, despliegue y/o mantenimiento de la infraestructura digital soberana del restaurante del CLIENTE.
          </p>

          <h3 className="font-bold text-lg mb-4 mt-8 border-b border-[#E0E0E0] pb-2 text-[#111111]">2. CONDICIONES DE PAGO Y FACTURACIÓN</h3>
          {planType === 'base' ? (
            <p className="mb-4 text-[#444444]">
              El CLIENTE acuerda un pago único en concepto de Setup (Configuración Inicial) según la propuesta comercial aceptada. Al ser un pago único, el CLIENTE asume la responsabilidad del mantenimiento y actualización posterior de su plataforma.
            </p>
          ) : (
            <p className="mb-4 text-[#444444]">
              El CLIENTE se acoge al plan "Growth Partner". El coste del Setup Inicial queda bonificado al 100%. El CLIENTE acuerda el pago de una cuota mensual recurrente en concepto de licencia de uso, alojamiento, mantenimiento evolutivo y soporte técnico prioritario, cobrada de forma automática el mismo día natural de cada mes.
            </p>
          )}

          <h3 className="font-bold text-lg mb-4 mt-8 border-b border-[#E0E0E0] pb-2 text-[#111111]">3. POLÍTICAS DE CANCELACIÓN Y DEVOLUCIÓN</h3>
          <p className="mb-4 text-[#444444]">
            Debido a la naturaleza digital e inmediata de la infraestructura desplegada y a las horas de ingeniería asignadas desde el minuto uno, <strong>el importe cobrado inicial no es reembolsable bajo ninguna circunstancia</strong> una vez el servicio ha sido activado, conforme a las excepciones al derecho de desistimiento en servicios digitales (Ley General para la Defensa de los Consumidores y Usuarios).
          </p>
          <p className="mb-4 text-[#444444]">
            El CLIENTE puede cancelar el servicio con un preaviso mínimo de 15 días antes de su siguiente ciclo de facturación enviando un correo al PRESTADOR.
          </p>

          <h3 className="font-bold text-lg mb-4 mt-8 border-b border-[#E0E0E0] pb-2 text-[#111111]">4. PROPIEDAD INTELECTUAL E INDUSTRIAL</h3>
          <p className="mb-4 text-[#444444]">
            Todos los activos generados (código fuente del panel, diseño UI/UX, infraestructura Cloud) permanecen bajo la titularidad de Architect.Sys, cediendo al CLIENTE una licencia de uso comercial mientras el contrato esté vigente y al corriente de pago. Los datos generados por los comensales son propiedad exclusiva del CLIENTE.
          </p>

          <div className="mt-16 grid grid-cols-2 gap-8 text-center pt-8 border-t-2 border-[#111111]">
            <div>
              <p className="mb-16 font-bold text-[#111111]">El PRESTADOR</p>
              <div className="w-48 h-px bg-black mx-auto mb-2"></div>
              <p className="text-xs text-[#888888]">Architect.Sys Agency</p>
            </div>
            <div>
              <p className="mb-16 font-bold text-[#111111]">El CLIENTE</p>
              <div className="w-48 h-px bg-black mx-auto mb-2"></div>
              <p className="text-xs text-[#888888]">Representante Autorizado</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
