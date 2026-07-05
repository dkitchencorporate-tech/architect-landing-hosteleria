'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldAlert, CheckCircle2, AlertTriangle, Cpu, DollarSign, GitBranch, Layers, FileText, Lock } from 'lucide-react';

export default function MasterDocPage() {
  return (
    <div className="max-w-5xl mx-auto pb-24 print:pb-0 relative z-10">
      <Link href="/manuals" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-400 hover:text-white transition-colors mb-8 print:hidden bg-white/5 px-4 py-2 rounded-lg border border-white/5 hover:border-white/20">
        <ArrowLeft size={16} /> Volver al Índice Operativo
      </Link>

      <div className="relative bg-zinc-900/90 backdrop-blur-2xl border-2 border-orange-500/50 rounded-3xl p-8 md:p-14 overflow-hidden shadow-[0_0_100px_rgba(249,115,22,0.15)]">
        {/* Glow Corporativo */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />
        
        <header className="border-b border-white/10 pb-10 mb-10">
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-6">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.4)] text-white flex-shrink-0 mt-2">
              <ShieldAlert size={52} strokeWidth={2} className="animate-pulse" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white bg-red-600 px-3 py-1.5 rounded-md shadow-lg">
                  MASTER DOC / SUPREME SOP
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-orange-400 bg-orange-500/20 px-3 py-1.5 rounded-md border border-orange-500/30">
                  Reconfiguración Operativa
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-green-400 bg-green-500/10 px-3 py-1.5 rounded-md border border-green-500/20">
                  Cero Alucinaciones
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-3">
                Sincronización Absoluta y Estado Maestro de Architect.Sys
              </h1>
              <p className="text-lg text-zinc-300 font-medium">
                Documento de consulta obligatoria para Agentes IA y operadores humanos. Establece la verdad arquitectónica, comercial y técnica indiscutible del proyecto.
              </p>
            </div>
          </div>
          
          <div className="bg-red-500/10 border-2 border-red-500/40 rounded-2xl p-6 mt-6 flex items-start gap-4">
            <Lock className="text-red-400 flex-shrink-0 mt-1" size={24} />
            <div className="text-sm text-zinc-200">
              <strong className="text-white uppercase font-black block mb-1">DIRECTRIZ SUPREMA ANTI-ALUCINACIÓN:</strong>
              Ningún Agente IA (Antigravity, Gemini, Claude, etc.) tiene permitido alucinar precios, modificar tarifas, inventar características o alterar el modelo de negocio. Si un agente pierde el contexto o comete deslices de sincronización, DEBE leer este documento de inmediato para reconfigurar su memoria operativa.
            </div>
          </div>
        </header>

        <article className="space-y-16 text-zinc-300">
          
          {/* SECCIÓN 1: ADN ESTRATÉGICO */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <Cpu className="text-orange-500" /> 1. ADN Estratégico: Misión, Visión y Modelo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2 text-orange-400 uppercase tracking-wider text-xs">Misión</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Rescatar al hostelero tradicional de la esclavitud de las plataformas extractivas (UberEats, ElTenedor, JustEat que cobran 20-30% de comisión) y erradicar la pérdida de facturación por cartas PDF estáticas y llamadas no atendidas en horas punta.
                </p>
              </div>
              <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2 text-orange-400 uppercase tracking-wider text-xs">Visión</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  Convertir a Architect.Sys en la firma de Ingeniería y Arquitectura Web de Alto Standing de referencia para la hostelería hispanohablante, instaurando el estándar del <strong>&quot;Ecosistema 24/7&quot;</strong> (activos propios, PWA y atención IA autónoma).
                </p>
              </div>
              <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold text-white mb-2 text-orange-400 uppercase tracking-wider text-xs">Modelo de Negocio</h3>
                <p className="text-sm text-zinc-300 leading-relaxed">
                  <strong>Consultative Selling B2B</strong> de infraestructura de facturación. No vendemos &quot;páginas web&quot; genéricas; diseñamos activos operativos cuya inversión se justifica en la recuperación inmediata de margen EBITDA y control total de clientes.
                </p>
              </div>
            </div>
          </section>

          {/* SECCIÓN 2: CATÁLOGO DE PRECIOS EXACTO */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <DollarSign className="text-green-500" /> 2. Catálogo de Servicios y Precios Exactos (Sin Alucinaciones)
            </h2>
            
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 text-xs text-yellow-300 font-bold uppercase tracking-wide">
              ⚠️ NOTA CRÍTICA: El módulo y modalidad de &quot;Dark Kitchen / Marcas Virtuales&quot; queda estrictamente descartado y congelado hasta consolidar una cartera funcional y robusta con el resto de servicios de hostelería tradicional.
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Nivel 1 */}
              <div className="bg-zinc-950/80 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded mb-3 inline-block">Nivel 1</span>
                  <h3 className="text-xl font-black text-white mb-2">Fundación Digital / Base Operativa</h3>
                  <p className="text-xs text-zinc-400 mb-6">Para restaurantes sin web o dependientes de Glovo/ElTenedor.</p>
                  
                  <div className="text-3xl font-black text-white mb-1">700 € <span className="text-xs font-normal text-zinc-500">pago único</span></div>
                  <p className="text-xs text-green-400 font-bold mb-4">Fraccionable en 2 cuotas de 350 €</p>
                  
                  <ul className="text-xs space-y-2 text-zinc-300 mb-6">
                    <li className="flex gap-2"><span>✓</span> PWA de pedidos y reservas propias (0% comisiones)</li>
                    <li className="flex gap-2"><span>✓</span> Carta visual interactiva (adiós al PDF estático)</li>
                    <li className="flex gap-2"><span>✓</span> <strong>2 meses de mantenimiento GRATIS</strong> (luego 69€/mes)</li>
                    <li className="flex gap-2"><span>✓</span> Pack de Bonos Estratégicos (Valor: 980€)</li>
                  </ul>
                </div>
                <div className="text-[11px] text-zinc-500 border-t border-white/5 pt-3">Soporte mensual (69€/m) sin permanencia.</div>
              </div>

              {/* Nivel 2 */}
              <div className="bg-zinc-950/80 p-6 rounded-2xl border border-orange-500/40 flex flex-col justify-between relative shadow-[0_0_30px_rgba(249,115,22,0.1)]">
                <div className="absolute -top-3 right-4 bg-orange-500 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Setup Express</div>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded mb-3 inline-block">Nivel 2</span>
                  <h3 className="text-xl font-black text-white mb-2">Recepcionista IA + CRM Reservas</h3>
                  <p className="text-xs text-zinc-400 mb-6">Para locales saturados que pierden llamadas y reservas.</p>
                  
                  <div className="text-3xl font-black text-white mb-1">450 € <span className="text-xs font-normal text-zinc-500">setup</span></div>
                  <p className="text-xs text-orange-400 font-bold mb-4">+ 69 €/mes mantenimiento y tokens IA</p>
                  
                  <ul className="text-xs space-y-2 text-zinc-300 mb-6">
                    <li className="flex gap-2"><span>✓</span> Agente autónomo en WhatsApp (Meta API + Kommo)</li>
                    <li className="flex gap-2"><span>✓</span> Pipeline visual de mesas en tiempo real</li>
                    <li className="flex gap-2"><span>✓</span> Calificación de comensales y fianza anti No-Shows</li>
                    <li className="flex gap-2"><span>✓</span> Consumo de tokens IA hasta 1.500 chats/mes</li>
                  </ul>
                </div>
                <div className="text-[11px] text-green-400 font-bold border-t border-white/5 pt-3">🌟 Si es Socio Growth, la cuota de 69€/m es 0€/m para siempre.</div>
              </div>

              {/* Nivel 3 */}
              <div className="bg-zinc-950/80 p-6 rounded-2xl border border-white/10 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded mb-3 inline-block">Nivel 3</span>
                  <h3 className="text-xl font-black text-white mb-2">Plan Growth Partner</h3>
                  <p className="text-xs text-zinc-400 mb-6">Para inyectar clientes recurrentes y llenar días valle.</p>
                  
                  <div className="text-3xl font-black text-white mb-1">299 € <span className="text-xs font-normal text-zinc-500">/mes</span></div>
                  <p className="text-xs text-purple-400 font-bold mb-4">Anual: 2.990 €/año (Ahorras 2 meses)</p>
                  
                  <ul className="text-xs space-y-2 text-zinc-300 mb-6">
                    <li className="flex gap-2"><span>✓</span> Desbloqueo total de Biblioteca de Eventos (7+ eventos)</li>
                    <li className="flex gap-2"><span>✓</span> Gestión técnica de campañas publicitarias de atracción</li>
                    <li className="flex gap-2"><span>✓</span> <strong>Bonificación total cuota IA (0€/mes en vez de 69€)</strong></li>
                    <li className="flex gap-2"><span>✓</span> 1 actualización estructural o visual mensual</li>
                  </ul>
                </div>
                <div className="text-[11px] text-zinc-500 border-t border-white/5 pt-3">Socio tecnológico integral de alto rendimiento.</div>
              </div>
            </div>

            {/* Upsells de Agencia */}
            <div className="bg-black/50 p-6 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-1">Upsells de Agencia (Tipificados en Dossier Corporativo)</h4>
                <p className="text-xs text-zinc-400">Servicios complementarios escalables en panel de cliente una vez consolidada la infraestructura base:</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-white">
                  Meta Ads Avanzado: <strong className="text-orange-400">Desde 299 €/mes</strong>
                </span>
                <span className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-xs font-bold text-white">
                  Community Manager & UGC: <strong className="text-orange-400">Desde 350 €/mes</strong>
                </span>
              </div>
            </div>
          </section>

          {/* SECCIÓN 3: DIAGNÓSTICO DE ENTORNOS */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <GitBranch className="text-blue-500" /> 3. Diagnóstico de Entornos: Local vs. GitHub vs. Vercel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-zinc-950 p-6 rounded-2xl border-2 border-green-500/50 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-green-400 bg-green-500/10 px-2.5 py-1 rounded">100% AL DÍA</span>
                <h3 className="text-lg font-bold text-white mb-2">🖥️ LOCAL (Workspace)</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Es la versión suprema y más avanzada. Contiene toda la arquitectura de prospección agentica (Scout Command Center en <code>/admin/scout</code>), el motor modular en <code>src/prospecting-engine/</code>, endpoints de CRM y manifest PWA.
                </p>
              </div>
              
              <div className="bg-zinc-950 p-6 rounded-2xl border border-blue-500/40 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded">ESPEJO NUBE</span>
                <h3 className="text-lg font-bold text-white mb-2">🐙 GITHUB (Origin/Main)</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Repositorio maestro en la nube. Se mantiene sincronizado con el Local mediante pushes periódicos. Para guardar respaldo sin alterar producción pública, se utiliza la etiqueta <code>[skip ci]</code> en los commits.
                </p>
              </div>

              <div className="bg-zinc-950 p-6 rounded-2xl border border-white/10 relative">
                <span className="absolute top-4 right-4 text-xs font-black text-zinc-400 bg-white/5 px-2.5 py-1 rounded">PRODUCCIÓN</span>
                <h3 className="text-lg font-bold text-white mb-2">▲ VERCEL (Público)</h3>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Despliegue público en vivo para clientes. Se actualiza selectivamente desde GitHub cuando se aprueba un pase a producción oficial, protegiendo las herramientas internas y experimentales.
                </p>
              </div>
            </div>
          </section>

          {/* SECCIÓN 4: MAPEO POR ÁREAS DEL PROYECTO */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <Layers className="text-purple-500" /> 4. Mapeo Integral por Áreas y Estado de Madurez
            </h2>
            <div className="space-y-4">
              <div className="bg-black/40 p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    <h3 className="text-lg font-bold text-white">Área 1: Embudo de Captación Público (Landing & Marketing)</h3>
                  </div>
                  <p className="text-xs text-zinc-400">Rutas: <code>/</code>, <code>/hub</code>, <code>/demo/carta</code>, <code>/onboarding</code>, <code>/terms</code>, <code>/privacy</code>, <code>/manuals/*</code></p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-green-500/20 text-green-400 border border-green-500/30">100% FUNCIONAL</span>
              </div>

              <div className="bg-black/40 p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    <h3 className="text-lg font-bold text-white">Área 2: Prospección Agentica (Scout Command Center PWA)</h3>
                  </div>
                  <p className="text-xs text-zinc-400">Rutas: <code>/admin/scout</code>, <code>src/prospecting-engine/*</code> (5 Agentes IA), Supabase SQL, Telegram Bot</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-green-500/20 text-green-400 border border-green-500/30">100% FUNCIONAL EN LOCAL</span>
              </div>

              <div className="bg-black/40 p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 animate-pulse"></span>
                    <h3 className="text-lg font-bold text-white">Área 3: Centro de Control Operativo Admin (Admin Architect)</h3>
                  </div>
                  <p className="text-xs text-zinc-400">Rutas: <code>/admin-architect/pipeline</code>, <code>/clients</code>, <code>/protocols</code> (eSignature), <code>/events-master</code>, <code>/creative</code></p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">FUNCIONAL / EN EVOLUCIÓN</span>
              </div>

              <div className="bg-black/40 p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span>
                    <h3 className="text-lg font-bold text-white">Área 4: Área de Cliente B2B (Dashboard del Hostelero)</h3>
                  </div>
                  <p className="text-xs text-zinc-400">Rutas: <code>/dashboard</code>, <code>LiveMonitor.tsx</code>, <code>TrafficMonitor.tsx</code>, <code>CreativeFactoryClient.tsx</code>, <code>/deal/[token]</code></p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-400 border border-blue-500/30">ESTRUCTURA OPERATIVA</span>
              </div>

              <div className="bg-black/40 p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                    <h3 className="text-lg font-bold text-white">Área 5: Integraciones, Webhooks y APIs Backend</h3>
                  </div>
                  <p className="text-xs text-zinc-400">Rutas: <code>/api/webhooks/kommo</code>, <code>/woztell</code>, <code>/whop/*</code>, <code>/stripe/*</code>, <code>/demo/*</code>, <code>/vip-intake</code></p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-green-500/20 text-green-400 border border-green-500/30">PROBADO Y CONECTADO</span>
              </div>
            </div>
          </section>

          {/* SECCIÓN 5: GENERADOR UNIVERSAL DE PROPUESTAS */}
          <section className="space-y-6">
            <h2 className="text-2xl md:text-3xl font-black text-white flex items-center gap-3 border-b border-white/10 pb-4">
              <FileText className="text-orange-500" /> 5. Estándar Universal de Propuestas (Tipo Venta El Gallo)
            </h2>
            <div className="bg-black/40 p-6 rounded-2xl border border-white/10">
              <p className="text-sm text-zinc-300 leading-relaxed mb-4">
                Los documentos de captación y cierre (como el dosier elaborado para <strong>Venta El Gallo - Ref: AS-2026-VEG-01</strong>) operan bajo una estructura universal y estandarizada en <code>/deal/[token]</code> y el generador de protocolos <code>/admin-architect/protocols</code>.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-400">
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <strong className="text-white block mb-1">Parte I: Propuesta Comercial y Acuerdo</strong>
                  Alcance técnico, 4 bonos tecnológicos (980€), inversión acordada, canales de pago (Whop, SEPA, Bizum), comparativa de mantenimiento (0€ IONOS vs 69€ Socio Premium) y garantías legales.
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <strong className="text-white block mb-1">Parte II: Manual Operativo y Toma de Datos</strong>
                  Formulario estructurado para datos fiscales, credenciales técnicas, identidad visual, motor de reservas externo, desglose sección por sección e inyección de firma electrónica (eSignature).
                </div>
              </div>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
}
