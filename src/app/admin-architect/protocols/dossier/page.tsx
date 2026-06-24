'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { ArrowLeft, Printer } from 'lucide-react';
import Link from 'next/link';

export default function DossierGenerator() {
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
          <h1 className="text-2xl font-black text-white mb-2">Dossier Onboarding</h1>
          <p className="text-sm text-zinc-400">Generador de hoja de ruta de los primeros 30 días.</p>
        </div>

        <div className="bg-[#111111] border border-white/5 rounded-xl p-4">
          <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Cliente</label>
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
          
          <div className="mb-16 border-b-2 border-[#111111] pb-12">
            <h4 className="text-[#B8862A] font-bold tracking-widest uppercase mb-4 text-xs">Architect.Sys Agency</h4>
            <h1 className="text-5xl font-black text-[#111111] mb-2 leading-tight uppercase">
              Protocolo de Onboarding
            </h1>
            <p className="text-2xl font-bold text-[#444444] mb-6 italic">{selectedClient?.business_name || '[Nombre del Restaurante]'}</p>
            <p className="text-[#444444] text-lg">
              Bienvenido/a a la nueva era de tu negocio. Este documento detalla nuestro plan de acción para las próximas 4 semanas y los compromisos necesarios por ambas partes para garantizar un despliegue exitoso.
            </p>
          </div>

          {/* Lo que necesitamos de ti */}
          <div className="mb-12 bg-white p-8 rounded-sm border border-[#E0E0E0] shadow-sm">
            <h2 className="text-[#B8862A] text-xs tracking-widest uppercase font-bold mb-6 border-b border-[#E0E0E0] pb-2">Fase 0: Lo que necesitamos de ti (Día 1 a 3)</h2>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-sm bg-[#111111] text-white flex items-center justify-center font-bold text-sm shrink-0">1</div>
                <div>
                  <strong className="block text-[#111111] text-lg">Activos de Marca</strong>
                  <span className="text-[#444444] text-sm">Logo en alta resolución (PNG/SVG), paleta de colores (si existe) y tipografías.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-sm bg-[#111111] text-white flex items-center justify-center font-bold text-sm shrink-0">2</div>
                <div>
                  <strong className="block text-[#111111] text-lg">Menú Actualizado</strong>
                  <span className="text-[#444444] text-sm">Carta completa con precios, alérgenos y descripciones en formato Word/PDF.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-sm bg-[#111111] text-white flex items-center justify-center font-bold text-sm shrink-0">3</div>
                <div>
                  <strong className="block text-[#111111] text-lg">Fotografía Básica</strong>
                  <span className="text-[#444444] text-sm">Al menos 5-10 buenas fotos de platos principales y del local.</span>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-8 h-8 rounded-sm bg-[#111111] text-white flex items-center justify-center font-bold text-sm shrink-0">4</div>
                <div>
                  <strong className="block text-[#111111] text-lg">Accesos (Si aplica)</strong>
                  <span className="text-[#444444] text-sm">Acceso al dominio actual y perfiles sociales (Google My Business, Instagram).</span>
                </div>
              </li>
            </ul>
          </div>

          {/* El Roadmap */}
          <div className="mb-16">
            <h2 className="text-[#B8862A] text-xs tracking-widest uppercase font-bold mb-8 border-b border-[#E0E0E0] pb-2">El Roadmap (Semanas 1 a 4)</h2>
            
            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-px before:bg-[#E0E0E0]">
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#FAFAFA] bg-[#111111] text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">1</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-sm border border-[#E0E0E0] shadow-sm">
                  <h3 className="font-bold text-[#111111] mb-1">Semana 1: Configuración Core</h3>
                  <p className="text-[#444444] text-sm">Despliegue del servidor base, configuración de la base de datos (Supabase) y estructura inicial del funnel de conversión.</p>
                </div>
              </div>
              
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#FAFAFA] bg-[#E0E0E0] text-[#444444] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">2</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-sm border border-[#E0E0E0] shadow-sm">
                  <h3 className="font-bold text-[#111111] mb-1">Semana 2: Integración de Datos</h3>
                  <p className="text-[#444444] text-sm">Carga del menú, optimización de imágenes y configuración del panel privado de control para tu negocio.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#FAFAFA] bg-[#E0E0E0] text-[#444444] font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">3</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-sm border border-[#E0E0E0] shadow-sm">
                  <h3 className="font-bold text-[#111111] mb-1">Semana 3: Testeo & QA</h3>
                  <p className="text-[#444444] text-sm">Pruebas exhaustivas del embudo de reservas, test de estrés y comprobación en múltiples dispositivos.</p>
                </div>
              </div>

              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#FAFAFA] bg-[#B8862A] text-white font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-lg shadow-[#B8862A]/20">4</div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-[#111111] p-6 rounded-sm shadow-sm">
                  <h3 className="font-bold text-white mb-1">Semana 4: Go-Live 🚀</h3>
                  <p className="text-[#888888] text-sm">Lanzamiento oficial. Entrega de llaves del panel y primera reunión de estrategia de crecimiento.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Reglas del Juego */}
          <div className="border-t-2 border-[#111111] pt-8">
            <h2 className="text-[#B8862A] text-xs tracking-widest uppercase font-bold mb-4">Límites y Comunicación</h2>
            <p className="text-[#444444] text-sm mb-4">Para garantizar la agilidad del proyecto, establecemos las siguientes normas inquebrantables:</p>
            <ul className="list-disc pl-5 text-[#444444] text-sm space-y-2">
              <li>El canal oficial de comunicación para entrega de assets es el email asignado.</li>
              <li>Las revisiones se agrupan en llamadas semanales (jueves/viernes) de máximo 30 min.</li>
              <li>No se aceptarán "cambios sobre la marcha" por WhatsApp que no estén documentados en el panel.</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
}
