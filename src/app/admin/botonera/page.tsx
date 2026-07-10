"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { MasterSecurityShield } from '@/components/admin/MasterSecurityShield';
import { 
  ExternalLink, Copy, Check, Shield, Smartphone, Zap, Flame, Globe, 
  Terminal, Lock, Award, ArrowRight, Layers, FileText, Cpu, BookOpen, Search
} from 'lucide-react';

interface LinkItem {
  id: string;
  name: string;
  url: string;
  isExternal?: boolean;
  description: string;
  badge: string;
  badgeColor: string;
  category: string;
}

export default function BotoneraMaestraPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeRank, setActiveRank] = useState<string>('all');
  const [showInstallTip, setShowInstallTip] = useState<boolean>(false);

  const handleCopy = (id: string, url: string) => {
    // Si es ruta relativa, copiamos con dominio completo o tal cual para la IA
    const fullUrl = url.startsWith('http') || url.startsWith('file:') 
      ? url 
      : `${window.location.origin}${url}`;
      
    navigator.clipboard.writeText(fullUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const ranks = [
    {
      id: 'rank1',
      title: '🔴 RANGO 1: CENTROS DE MANDO Y CONTROL OPERATIVO (Interno / Dirección)',
      description: 'Herramientas de alta seguridad para gestión de agencias, prospección IA y CRM de clientes.',
      items: [
        {
          id: 'hub-botonera',
          name: 'Centro Neurálgico & Botonera VIP (Esta Página)',
          url: '/admin/botonera',
          description: 'Panel centralizado con todas las URLs del ecosistema organizadas por rango de importancia.',
          badge: 'NÚCLEO MAESTRO',
          badgeColor: 'bg-red-950/80 text-red-300 border-red-500/40',
          category: 'rank1'
        },
        {
          id: 'scout-pwa',
          name: 'Motor Scout IA & Auditoría EBITDA PWA',
          url: '/admin/scout',
          description: 'Radar geolocalizado de restaurantes de alto ticket, análisis automático de fugas y disparo en WhatsApp/Telegram.',
          badge: 'PROSPECCIÓN IA',
          badgeColor: 'bg-orange-950/80 text-orange-300 border-orange-500/40',
          category: 'rank1'
        },
        {
          id: 'admin-pipeline',
          name: 'Pipeline CRM & Operaciones B2B',
          url: '/admin-architect/pipeline',
          description: 'Gestión de acuerdos, seguimiento de cierres y control de clientes activos en la agencia.',
          badge: 'CRM OPERATIVO',
          badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
          category: 'rank1'
        },
        {
          id: 'admin-overview',
          name: 'Sincronización Overview & KDS Enterprise',
          url: '/admin-architect/overview',
          description: 'Panel general de rendimiento, métricas de salas en vivo y estado de servidores KDS.',
          badge: 'TELEMETRÍA',
          badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
          category: 'rank1'
        },
        {
          id: 'admin-creative',
          name: 'Creative Factory & Ads Management',
          url: '/admin-architect/creative',
          description: 'Control de campañas publicitarias, creatividades virales y optimización de pauta para hostelería.',
          badge: 'PAUTA & ADS',
          badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
          category: 'rank1'
        },
        {
          id: 'admin-events',
          name: 'Events Master & Gestión Logística',
          url: '/admin-architect/events-master',
          description: 'Coordinación de eventos especiales, grandes reservas y banquetes gastronómicos.',
          badge: 'LOGÍSTICA',
          badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
          category: 'rank1'
        }
      ]
    },
    {
      id: 'rank2',
      title: '🟡 RANGO 2: DESPLIEGUES, DOSIERS Y CONTRATOS (Cliente: Venta El Gallo)',
      description: 'Documentación comercial en producción, dosiers interactivos y acuerdos ejecutivos.',
      items: [
        {
          id: 'dosier-vercel',
          name: 'Dosier Interactivo de Toma de Datos (Vercel Producción)',
          url: 'https://hosteleria.architectsys.com/dosier-ventaelgallo.html',
          isExternal: true,
          description: 'Dosier online interactivo en producción para que Venta El Gallo introduzca sus menús, horarios y accesos.',
          badge: 'VERCEL LIVE ⭐',
          badgeColor: 'bg-yellow-950/80 text-yellow-300 border-yellow-500/40',
          category: 'rank2'
        },
        {
          id: 'contrato-html',
          name: 'Contrato Ejecutivo Comercial 400 € (Formato A4 PDF)',
          url: '/docs/contrato_AS_2026.html',
          description: 'Acuerdo de servicios de diseño y despliegue en IONOS por 400 €. Maquetado para impresión A4 exacta.',
          badge: 'ACUERDO 400€',
          badgeColor: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
          category: 'rank2'
        },
        {
          id: 'carta-bienvenida',
          name: 'Carta de Bienvenida & Protocolo de Inicio (A4 PDF/Web)',
          url: '/docs/carta_bienvenida_AS_2026.html',
          description: 'Documento oficial de bienvenida y protocolo operativo con teléfono directo +34 622 56 26 59.',
          badge: 'PROTOCOLO',
          badgeColor: 'bg-orange-950/80 text-orange-300 border-orange-500/40',
          category: 'rank2'
        }
      ]
    },
    {
      id: 'rank3',
      title: '🟢 RANGO 3: CAPTACIÓN B2B & DEMOS VIP DE ALTA COCINA',
      description: 'Embudos de venta, páginas de aterrizaje y simulaciones interactivas para cerrar restaurantes.',
      items: [
        {
          id: 'landing-main',
          name: 'Landing Principal de Captación B2B (Hostelería)',
          url: 'https://hosteleria.architectsys.com/',
          isExternal: true,
          description: 'Página pública principal para captación de dueños de restaurantes. Sin prompts de PWA interna.',
          badge: 'EMBUDO PÚBLICO',
          badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
          category: 'rank3'
        },
        {
          id: 'hub-vip',
          name: 'Hub VIP Interactivo & Spots de Vídeo (/hub)',
          url: '/hub',
          description: 'Showroom con vídeos de cocina, KDS y sala en acción, junto con el formulario guiado VIP.',
          badge: 'DEMO SHOWROOM',
          badgeColor: 'bg-teal-950/80 text-teal-300 border-teal-500/40',
          category: 'rank3'
        },
        {
          id: 'demo-carta',
          name: 'Demo Carta & Pedido Inteligente en Mesa',
          url: '/demo/carta',
          description: 'Experiencia móvil simulada donde el comensal pide y recibe recomendaciones IA con +38% ticket.',
          badge: 'CARTA IA MÓVIL',
          badgeColor: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
          category: 'rank3'
        }
      ]
    },
    {
      id: 'rank4',
      title: '🔵 RANGO 4: MANUALES MAESTROS, ARQUITECTURA & SOPORTE',
      description: 'Documentación técnica, guías de arquitectura de sistemas y portal de clientes logueados.',
      items: [
        {
          id: 'manual-master',
          name: 'Manual Master Doc (Ecosistema Completo)',
          url: '/manuals/master-doc',
          description: 'Guía maestra con la ingeniería de procesos, agentes IA y estructura de la agencia.',
          badge: 'MANUAL B2B',
          badgeColor: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
          category: 'rank4'
        },
        {
          id: 'manual-kds',
          name: 'Centro de Control & KDS Enterprise Manual',
          url: '/manuals/centro-control',
          description: 'Especificaciones técnicas del sistema de pantallas en cocina y sincronización de sala.',
          badge: 'SISTEMAS KDS',
          badgeColor: 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40',
          category: 'rank4'
        },
        {
          id: 'manual-ia',
          name: 'Agentes IA WhatsApp Híbridos & Automatización',
          url: '/manuals/agente-ia',
          description: 'Arquitectura de los agentes conversacionales de atención y reservas en WhatsApp 24/7.',
          badge: 'AGENTES IA',
          badgeColor: 'bg-violet-950/80 text-violet-300 border-violet-500/40',
          category: 'rank4'
        },
        {
          id: 'client-dashboard',
          name: 'Portal Dashboard Cliente Logueado',
          url: '/dashboard',
          description: 'Área privada de cliente una vez autenticado para gestionar sus menús, métricas y reservas.',
          badge: 'CLIENTE VIP',
          badgeColor: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
          category: 'rank4'
        }
      ]
    }
  ];

  const filteredRanks = ranks.map(rank => ({
    ...rank,
    items: rank.items.filter(item => 
      (activeRank === 'all' || item.category === activeRank) &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
       item.url.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(rank => rank.items.length > 0);

  return (
    <MasterSecurityShield
      title="CENTRO NEURÁLGICO & BOTONERA MAESTRA ARCHITECT.SYS"
      subtitle="Control de URLs Operativas, Demos, Prospección y Enfoque Vertical. Exclusivo Dirección Técnica."
    >
      <div className="min-h-screen bg-[#050505] text-zinc-100 p-4 md:p-8 selection:bg-orange-500 selection:text-white">
        
        {/* Cabecera / Header Central */}
        <div className="max-w-7xl mx-auto space-y-6">
          
          <div className="bg-[#0d0d10] border border-orange-500/30 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 font-mono text-xs uppercase tracking-wider">
                  <Shield className="w-3.5 h-3.5 animate-pulse" /> WAF BLINDADO // CLAVE MAESTRA ACTIVADA
                </div>
                <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white font-mono uppercase">
                  Botonera Neurálgica de Mando
                </h1>
                <p className="text-xs md:text-sm text-zinc-400 max-w-3xl leading-relaxed">
                  Centro neurálgico para abrir o copiar instantáneamente cualquier URL de nuestro ecosistema. 
                  <strong className="text-orange-400"> Regla de Enfoque Vertical:</strong> Selecciona una URL, cópiala o ábrela, pégala en el chat de Antigravity y no pivotaremos a ninguna otra zona hasta finalizarla por completo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                <button
                  onClick={() => setShowInstallTip(!showInstallTip)}
                  className="px-5 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 rounded-xl text-xs font-mono font-bold text-zinc-200 hover:text-white flex items-center justify-center gap-2 transition shadow-lg"
                >
                  <Smartphone className="w-4 h-4 text-orange-400" />
                  <span>Instalar Botonera PWA</span>
                </button>

                <Link
                  href="/admin/scout"
                  className="px-5 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 rounded-xl text-xs font-mono font-black text-black uppercase flex items-center justify-center gap-2 transition shadow-lg shadow-orange-500/20"
                >
                  <Zap className="w-4 h-4 fill-black" />
                  <span>Abrir Scout PWA</span>
                </Link>
              </div>
            </div>

            {/* Tip de Instalación de la Botonera como App nativa */}
            {showInstallTip && (
              <div className="mt-6 p-4 rounded-2xl bg-zinc-950 border border-orange-500/40 flex items-start justify-between gap-4 animate-fadeIn">
                <div className="space-y-1.5 text-xs">
                  <p className="font-bold text-orange-400 font-mono">📱 CÓMO INSTALAR ESTA BOTONERA EN TU MÓVIL u ORDENADOR:</p>
                  <p className="text-zinc-300">
                    <strong>En PC/Mac Chrome:</strong> Pulsa el icono de instalación en la barra de direcciones superior derecha (`+` o pantalla con flecha).
                  </p>
                  <p className="text-zinc-300">
                    <strong>En iPhone / Android:</strong> Abre las opciones del navegador y selecciona <strong className="text-orange-400">&quot;Añadir a pantalla de inicio&quot;</strong>. La botonera funcionará como app independiente con protección por clave.
                  </p>
                </div>
                <button onClick={() => setShowInstallTip(false)} className="p-1 hover:bg-zinc-800 rounded-lg text-zinc-400">
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Controles de Filtrado y Búsqueda */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-[#0d0d10] p-4 rounded-2xl border border-zinc-800/80">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Buscar por nombre, descripción o URL (/admin, vercel, contrato, scout...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#16161b] border border-zinc-800 rounded-xl text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-orange-500 transition"
              />
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 font-mono text-[11px]">
              <button
                onClick={() => setActiveRank('all')}
                className={`px-3 py-2 rounded-lg font-bold uppercase transition whitespace-nowrap ${
                  activeRank === 'all' 
                    ? 'bg-orange-500 text-black' 
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                Todas ({ranks.reduce((acc, r) => acc + r.items.length, 0)})
              </button>
              <button
                onClick={() => setActiveRank('rank1')}
                className={`px-3 py-2 rounded-lg font-bold uppercase transition whitespace-nowrap ${
                  activeRank === 'rank1' 
                    ? 'bg-red-500 text-black' 
                    : 'bg-zinc-900 text-red-400 hover:text-white border border-zinc-800'
                }`}
              >
                🔴 Rango 1: Admin
              </button>
              <button
                onClick={() => setActiveRank('rank2')}
                className={`px-3 py-2 rounded-lg font-bold uppercase transition whitespace-nowrap ${
                  activeRank === 'rank2' 
                    ? 'bg-yellow-500 text-black' 
                    : 'bg-zinc-900 text-yellow-400 hover:text-white border border-zinc-800'
                }`}
              >
                🟡 Rango 2: Venta El Gallo
              </button>
              <button
                onClick={() => setActiveRank('rank3')}
                className={`px-3 py-2 rounded-lg font-bold uppercase transition whitespace-nowrap ${
                  activeRank === 'rank3' 
                    ? 'bg-emerald-500 text-black' 
                    : 'bg-zinc-900 text-emerald-400 hover:text-white border border-zinc-800'
                }`}
              >
                🟢 Rango 3: Captación
              </button>
              <button
                onClick={() => setActiveRank('rank4')}
                className={`px-3 py-2 rounded-lg font-bold uppercase transition whitespace-nowrap ${
                  activeRank === 'rank4' 
                    ? 'bg-blue-500 text-black' 
                    : 'bg-zinc-900 text-blue-400 hover:text-white border border-zinc-800'
                }`}
              >
                🔵 Rango 4: Manuales
              </button>
            </div>
          </div>

          {/* Lista de Rangos y Tarjetas de Enlaces */}
          <div className="space-y-10">
            {filteredRanks.map((rank) => (
              <div key={rank.id} className="space-y-4">
                <div className="border-b border-zinc-800 pb-3">
                  <h2 className="text-sm md:text-base font-black uppercase font-mono tracking-wider text-white">
                    {rank.title}
                  </h2>
                  <p className="text-xs text-zinc-400 mt-0.5">{rank.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rank.items.map((item) => (
                    <div 
                      key={item.id}
                      className="bg-[#0d0d10] hover:bg-[#121216] border border-zinc-800/80 hover:border-zinc-700 rounded-2xl p-5 flex flex-col justify-between gap-4 transition shadow-md group relative overflow-hidden"
                    >
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-[10px] font-mono font-black px-2.5 py-1 rounded-full border uppercase tracking-wider ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                          <span className="text-[11px] font-mono text-zinc-500 truncate max-w-[180px]" title={item.url}>
                            {item.url}
                          </span>
                        </div>

                        <h3 className="text-base font-bold text-white group-hover:text-orange-400 transition flex items-center gap-1.5">
                          <span>{item.name}</span>
                          {item.isExternal && <ExternalLink className="w-3.5 h-3.5 text-zinc-500 shrink-0" />}
                        </h3>

                        <p className="text-xs text-zinc-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                        <button
                          onClick={() => handleCopy(item.id, item.url)}
                          className={`flex-1 py-2.5 px-3 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 border ${
                            copiedId === item.id
                              ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500'
                              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-zinc-700/80'
                          }`}
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-400" />
                              <span>¡URL COPIADA!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-orange-400" />
                              <span>Copiar URL para IA</span>
                            </>
                          )}
                        </button>

                        <a
                          href={item.url}
                          target={item.isExternal || item.url.startsWith('http') ? '_blank' : '_self'}
                          rel="noopener noreferrer"
                          className="py-2.5 px-4 bg-orange-500/10 hover:bg-orange-500 text-orange-400 hover:text-black border border-orange-500/40 hover:border-orange-500 rounded-xl font-mono text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-sm"
                        >
                          <span>Abrir</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pie informativo sobre el método de trabajo vertical */}
          <div className="bg-gradient-to-r from-zinc-900/90 via-orange-950/20 to-zinc-900/90 border border-orange-500/30 rounded-2xl p-6 text-center space-y-2">
            <h3 className="text-xs font-mono font-bold uppercase text-orange-400 tracking-wider">
              ⚡ PROTOCOLO DE TRABAJO VERTICAL ACTIVO
            </h3>
            <p className="text-xs text-zinc-300 max-w-2xl mx-auto leading-relaxed">
              Cuando quieras trabajar en un área, entra a esta Botonera (blindada con tu Clave Criptográfica), copia la URL exacta de la tarjeta y pégamela en el chat. Nos enfocaremos 100% en esa URL y no saltaremos a ninguna otra hasta que des el visto bueno definitivo.
            </p>
          </div>

        </div>

      </div>
    </MasterSecurityShield>
  );
}
