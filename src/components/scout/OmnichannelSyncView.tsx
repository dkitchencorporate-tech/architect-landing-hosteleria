"use client";

import React from 'react';
import { Smartphone, Users, Megaphone, CheckCircle2, ArrowRight, ShieldCheck, Zap, Globe, MapPin, RefreshCw } from 'lucide-react';

export const OmnichannelSyncView: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-fadeIn">
      
      {/* Cabecera Estratégica */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 text-orange-400 font-black text-xs uppercase tracking-widest mb-3">
          <Zap className="w-4 h-4 fill-current" />
          <span>Sincronización Total de 360°</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">
          Ecosistema Omnicanal: <span className="text-orange-500">Calle, Ads & Frío Digital</span>
        </h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-3xl leading-relaxed">
          Para garantizar la facturación objetivo (5 clientes High-Ticket/mes = 7.500€ a 15.000€ MRR), la prospección no opera en silos. El enjambre digital alimenta las visitas en calle y sincroniza audiencias publicitarias en tiempo real.
        </p>
      </div>

      {/* Los 3 Pilares Sincronizados */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Pilar 1: Frío Digital (Enjambre IA) */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-orange-500/50 transition">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl group-hover:bg-orange-500/10 transition" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 mb-4">
              <Smartphone className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-orange-950 text-orange-400 border border-orange-500/30">
              Pilar 1: Digital Automático
            </span>
            <h3 className="text-xl font-black text-white mt-3">Enjambre IA en Frío</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Los 5 agentes auditan 100 restaurantes/día en Google Maps y redactan ganchos personalizados en WhatsApp, Email y DM de Instagram.
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><b>WhatsApp:</b> Cero enlaces web + &lt; 75 palabras (Anti-Ban).</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><b>Email:</b> Estructura piramidal McKinsey con link al `/hub`.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span><b>Telegram:</b> Tarjeta VIP lista para enviar en 1 toque.</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-bold text-orange-400">
            <span>Objetivo: 100 Leads/día</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
        </div>

        {/* Pilar 2: Prospección en Calle (Presencial) */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-blue-500/50 transition">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-blue-950 text-blue-400 border border-blue-500/30">
              Pilar 2: Comercial en Terreno
            </span>
            <h3 className="text-xl font-black text-white mt-3">Prospección en Calle</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              El comercial entra físicamente al restaurante con su iPad o móvil, abre la PWA y le muestra al dueño en 60 segundos su pérdida en directo.
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span><b>Carta Visual HD:</b> Demostración en `/demo/carta`.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span><b>Calculadora EBITDA:</b> Cálculo visual de comisiones en vivo.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                <span><b>Cierre en 2 Pasos:</b> Firma eSignature in situ (700€ o 2x350€).</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-bold text-blue-400">
            <span>Conversión Presencial: 35%</span>
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          </div>
        </div>

        {/* Pilar 3: Retargeting Ads (Meta & Google) */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 shadow-xl flex flex-col justify-between relative overflow-hidden group hover:border-purple-500/50 transition">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition" />
          <div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
              <Megaphone className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-purple-950 text-purple-400 border border-purple-500/30">
              Pilar 3: Publicidad Ads
            </span>
            <h3 className="text-xl font-black text-white mt-3">Retargeting Sincronizado</h3>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              Los prospectos que reciben el WhatsApp o el Email y visitan el `/hub`, quedan marcados por el Pixel de Meta y Google para impacto visual.
            </p>

            <div className="mt-6 space-y-2.5 text-xs text-zinc-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span><b>Anuncios de Vídeo Nativo:</b> Muestran la Carta HD en Instagram.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span><b>Audiencia Personalizada:</b> Sincronizada con base de Supabase.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                <span><b>Cierre de Bucle:</b> Retorno al Onboarding B2B para firma.</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs font-bold text-purple-400">
            <span>ROAS Esperado: > 4.5x</span>
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
          </div>
        </div>

      </div>

      {/* Flujo de Sinergia Matriz */}
      <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-8">
        <h3 className="text-lg font-black text-white flex items-center gap-2 mb-6">
          <RefreshCw className="w-5 h-5 text-orange-400" />
          <span>Flujo de Datos Sincronizado en Tiempo Real</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <span className="text-xs font-bold text-orange-400 uppercase">1. Descubrimiento</span>
            <p className="text-[11px] text-zinc-400 mt-1">ScoutAgent escanea Google Maps y valida que no sea duplicado.</p>
          </div>
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <span className="text-xs font-bold text-blue-400 uppercase">2. Contacto Frío / Calle</span>
            <p className="text-[11px] text-zinc-400 mt-1">Envío de WhatsApp sin enlace o visita presencial del comercial con iPad.</p>
          </div>
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <span className="text-xs font-bold text-purple-400 uppercase">3. Aterrizaje en Hub</span>
            <p className="text-[11px] text-zinc-400 mt-1">El hostelero entra al `/hub`, ve el vídeo nativo y el Pixel lo registra.</p>
          </div>
          <div className="p-4 bg-zinc-950 border border-zinc-800 rounded-2xl">
            <span className="text-xs font-bold text-emerald-400 uppercase">4. Cierre y Cobro</span>
            <p className="text-[11px] text-zinc-400 mt-1">Firma del contrato (Venta El Gallo) y cobro 700€ o 2x350€ en Whop/Stripe.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
