'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';

export default function ProposalGenerator() {
  const [clients, setClients] = useState<any[]>([]);
  const [selectedClient, setSelectedClient] = useState<any>(null);
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
          <h1 className="text-2xl font-black text-white mb-2">Propuesta Comercial</h1>
          <p className="text-sm text-zinc-400">Generador del Pitch Deck para cierre B2B.</p>
        </div>

        <div className="bg-[#111111] border border-white/5 rounded-xl p-4">
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Cliente a proponer</label>
          <select 
            className="w-full bg-black border border-white/10 rounded-lg p-3 text-white text-sm focus:outline-none focus:border-[#B8862A]"
            onChange={(e) => setSelectedClient(clients.find(c => c.id === e.target.value))}
            defaultValue=""
          >
            <option value="" disabled>Seleccionar cliente...</option>
            {clients.map(c => (
              <option key={c.id} value={c.id}>{c.business_name || 'Restaurante Sin Nombre'}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={() => window.print()}
          className="bg-[#B8862A] hover:bg-[#a07322] text-white font-black py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all mt-auto"
        >
          <Printer size={20} /> Imprimir / PDF
        </button>
      </div>

      {/* Document Preview */}
      <div className="flex-1 bg-[#FAFAFA] text-[#111111] rounded-sm p-12 shadow-2xl overflow-y-auto max-h-[calc(100vh-4rem)] print:max-h-none print:shadow-none print:p-0">
        <div className="max-w-3xl mx-auto font-serif">
          
          <div className="text-center mb-16 border-b-2 border-[#111111] pb-12">
            <h4 className="text-[#B8862A] font-bold tracking-widest uppercase mb-4 text-xs">Architect.Sys Digital Solutions</h4>
            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase">
              Propuesta de Infraestructura Digital
            </h1>
            <p className="text-2xl italic text-[#444444]">Preparado exclusivamente para:</p>
            <p className="text-3xl font-black text-[#111111] mt-2">{selectedClient?.business_name || '[Nombre del Restaurante]'}</p>
          </div>

          {/* El Problema */}
          <div className="mb-12">
            <h2 className="text-[#B8862A] text-xs tracking-widest uppercase font-bold mb-4 border-b border-[#E0E0E0] pb-2">I. El Paradigma Actual</h2>
            <p className="text-lg text-[#444444] mb-4 leading-relaxed">
              El sector hostelero está perdiendo el control de su propio negocio. Depender de plataformas de terceros (Glovo, ElTenedor, JustEat) significa ceder hasta un 30% de tus márgenes y, lo que es peor, ceder los datos de tus propios clientes.
            </p>
            <p className="text-lg text-[#444444] leading-relaxed">
              <strong>Architect.Sys</strong> no es una agencia de marketing tradicional. Somos arquitectos de software construyendo tu propia infraestructura digital soberana. Un sistema donde tú eres el dueño absoluto del embudo de conversión y de tu facturación.
            </p>
          </div>

          {/* La Solución */}
          <div className="mb-12">
            <h2 className="text-[#B8862A] text-xs tracking-widest uppercase font-bold mb-4 border-b border-[#E0E0E0] pb-2">II. La Infraestructura</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              <div className="bg-white p-6 border border-[#E0E0E0] shadow-sm">
                <h3 className="font-bold text-xl mb-2 text-[#111111]">Motor de Reservas Propio</h3>
                <p className="text-[#444444]">Cero comisiones por comensal. Recibe reservas directamente desde Google Maps, Instagram y tu web.</p>
              </div>
              <div className="bg-white p-6 border border-[#E0E0E0] shadow-sm">
                <h3 className="font-bold text-xl mb-2 text-[#111111]">Carta Digital Inteligente</h3>
                <p className="text-[#444444]">Código QR dinámico. Cambia precios y platos en segundos desde tu panel privado sin depender de nadie.</p>
              </div>
              <div className="bg-white p-6 border border-[#E0E0E0] shadow-sm">
                <h3 className="font-bold text-xl mb-2 text-[#111111]">Panel de Control K-Admin</h3>
                <p className="text-[#444444]">Tu propia aplicación web (SaaS) para ver métricas, descargar QRs y gestionar la información vital de tu negocio.</p>
              </div>
              <div className="bg-white p-6 border border-[#E0E0E0] shadow-sm">
                <h3 className="font-bold text-xl mb-2 text-[#111111]">Presencia SEO Local</h3>
                <p className="text-[#444444]">Dominamos el algoritmo de Google My Business para que seas la primera opción en las búsquedas de tu zona.</p>
              </div>
            </div>
          </div>

          {/* Inversión */}
          <div className="mb-12 page-break-before">
            <h2 className="text-[#B8862A] text-xs tracking-widest uppercase font-bold mb-6 border-b border-[#E0E0E0] pb-2">III. Modelos de Inversión</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Plan Base (Decoy) */}
              <div className="border border-[#E0E0E0] p-8 bg-white opacity-80">
                <h3 className="text-xl font-bold mb-1 text-[#111111]">Plan Base</h3>
                <p className="text-[#888888] text-sm mb-6">Setup One-Off. Tú lo mantienes.</p>
                <div className="text-4xl font-black text-[#111111] mb-6">700€ <span className="text-sm font-normal text-[#888888]">pago único</span></div>
                <ul className="space-y-3 mb-8 text-[#444444] text-sm">
                  <li className="flex items-center gap-2">✓ Despliegue de Web + Reservas</li>
                  <li className="flex items-center gap-2">✓ Configuración Carta QR</li>
                  <li className="flex items-center gap-2">✓ Optimización Google Inicial</li>
                  <li className="flex items-center gap-2 text-red-500">✗ Sin mantenimiento mensual</li>
                  <li className="flex items-center gap-2 text-red-500">✗ Sin panel de control privado</li>
                  <li className="flex items-center gap-2 text-red-500">✗ Sin actualizaciones del sistema</li>
                </ul>
              </div>

              {/* Growth Partner */}
              <div className="border-2 border-[#111111] p-8 bg-[#111111] text-white shadow-2xl relative transform scale-105">
                <div className="absolute top-0 right-0 bg-[#B8862A] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1">Recomendado</div>
                <h3 className="text-xl font-bold mb-1 text-white">Growth Partner</h3>
                <p className="text-[#888888] text-sm mb-6">Tu departamento tecnológico.</p>
                <div className="text-4xl font-black text-white mb-6">299€ <span className="text-sm font-normal text-[#888888]">/mes</span></div>
                <ul className="space-y-3 mb-8 text-gray-300 text-sm">
                  <li className="flex items-center gap-2">✓ <strong>Setup 100% Bonificado (0€)</strong></li>
                  <li className="flex items-center gap-2">✓ Todo lo del Plan Base incluido</li>
                  <li className="flex items-center gap-2">✓ Panel Privado (App de Cliente)</li>
                  <li className="flex items-center gap-2">✓ Mantenimiento de servidores</li>
                  <li className="flex items-center gap-2">✓ Soporte técnico y cambios 24/7</li>
                  <li className="flex items-center gap-2">✓ Nuevas features sin coste</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-[#888888] border-t border-[#E0E0E0] pt-8">
            <p>Documento de carácter confidencial.</p>
            <p>Architect.Sys - hosteleria.architectsys.com</p>
          </div>

        </div>
      </div>
    </div>
  );
}
