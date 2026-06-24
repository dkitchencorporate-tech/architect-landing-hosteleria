'use client';

import React from 'react';
import { ArrowLeft, Rocket, Zap, Database, BrainCircuit, Play } from 'lucide-react';
import Link from 'next/link';

export default function EscalabilidadCreativeFactory() {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-orange-500/30 overflow-y-auto">
      {/* Header */}
      <header className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/manuals" className="text-zinc-500 hover:text-white transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <div className="flex items-center gap-2">
              <BrainCircuit className="text-purple-500" size={20} />
              <span className="text-white font-bold tracking-tight">Manual de Escalabilidad: Creative Factory</span>
            </div>
          </div>
          <div className="text-xs font-black tracking-widest uppercase text-purple-500 bg-purple-500/10 px-3 py-1 rounded-full">
            Vision 2.0 (Standby)
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-invert prose-zinc max-w-none">
          <h1 className="text-4xl font-black text-white tracking-tighter mb-8">
            El Caballo de Troya: Prospección Agresiva con Creative Factory
          </h1>

          <div className="bg-purple-500/10 border border-purple-500/20 p-6 rounded-2xl mb-12">
            <h3 className="text-purple-400 font-bold flex items-center gap-2 mt-0">
              <Zap size={20} />
              Estado Actual: Standby
            </h3>
            <p className="text-sm text-zinc-300 m-0 mt-2">
              Este documento describe la fase de evolución del proyecto. Actualmente, la arquitectura de la Creative Factory está construida en backend (tablas <code>creative_chats</code> y <code>creative_dishes</code>), pero la interfaz de usuario está oculta hasta que consolidemos la base de clientes inicial con la oferta de Infraestructura (700€) + Growth (299€).
            </p>
          </div>

          <h2>1. La Tesis de Adquisición B2B</h2>
          <p>
            Vender "sistemas de reservas" o "webs" es un mercado rojo (alta competencia). Vender <strong>"Generación de contenido en piloto automático con IA para hostelería"</strong> es un mercado azul. 
            La Creative Factory no es solo una funcionalidad; es nuestra punta de lanza de prospección.
          </p>

          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl my-6">
            <h4 className="text-white font-bold mt-0 flex items-center gap-2">
              <Rocket size={18} className="text-orange-500" />
              Estrategia "Freemium a High-Ticket"
            </h4>
            <ol className="text-zinc-400 text-sm space-y-2 mt-4 mb-0">
              <li><strong>El Gancho:</strong> Ofrecer acceso gratuito a la Creative Factory a restaurantes locales.</li>
              <li><strong>El Coste Oculto (Metered Billing):</strong> Funciona mediante "Tokens de Trabajo" o "Créditos IA".</li>
              <li><strong>El Upsell:</strong> Cuando consumen sus créditos gratuitos y ven la calidad de las imágenes/copys generados, se les bloquea y se les vende el paquete <em>Growth Partner</em> (299€/mes) que incluye créditos ilimitados + la infraestructura completa.</li>
            </ol>
          </div>

          <h2>2. Arquitectura de Base de Datos y Metering</h2>
          <p>
            Para facturar por uso (como AWS o OpenAI), necesitamos medir las peticiones.
          </p>
          <ul>
            <li>
              <strong>Tabla <code>creative_usage_logs</code>:</strong> Registrará cada prompt enviado al agente IA.
            </li>
            <li>
              <strong>Integración Stripe Metered Billing:</strong> Enviaremos el consumo a Stripe cada noche a través de un cron job. El cliente será cobrado al final de mes basándose en cuántas campañas autogeneró.
            </li>
          </ul>

          <h2>3. Autopilot Campaigns (Generación de Video/Imagen)</h2>
          <p>
            La interfaz de la Creative Factory permitirá al cliente seleccionar un plato de su menú y, con 1 clic:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-black border border-zinc-800 p-4 rounded-xl">
              <span className="text-xl mb-2 block">📸</span>
              <strong className="text-white block">Imagen Midjourney</strong>
              <span className="text-xs text-zinc-500">Renderizado fotorrealista del plato para Instagram.</span>
            </div>
            <div className="bg-black border border-zinc-800 p-4 rounded-xl">
              <span className="text-xl mb-2 block">✍️</span>
              <strong className="text-white block">Copy Persuasivo</strong>
              <span className="text-xs text-zinc-500">Texto para la publicación con anclajes psicológicos.</span>
            </div>
            <div className="bg-black border border-zinc-800 p-4 rounded-xl">
              <span className="text-xl mb-2 block">🎬</span>
              <strong className="text-white block">Video B-Roll (Runway)</strong>
              <span className="text-xs text-zinc-500">Generación de video corto para Reels/TikTok.</span>
            </div>
          </div>

          <h2>4. Despliegue Técnico (Cuando se apruebe la activación)</h2>
          <pre className="bg-zinc-950 p-4 rounded-xl border border-zinc-800 text-sm overflow-x-auto">
            <code className="text-green-400">
{`# 1. Frontend: Habilitar ruta /dashboard/creative
# 2. Base de Datos: Crear política RLS para lectura de créditos
# 3. API: Conectar endpoint /api/creative-factory con Gemini Pro/Midjourney API
# 4. Stripe: Crear producto tipo "Metered Usage" a 0.50€ por Token IA`}
            </code>
          </pre>

          <p>
            Este sistema transformará Architect.Sys de un "SaaS Operativo" a un <strong>"SaaS Generativo (AI-First)"</strong>.
          </p>
        </div>
      </main>
    </div>
  );
}
