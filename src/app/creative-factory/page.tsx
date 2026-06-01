'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AuthLayer from '@/components/dashboard/AuthLayer';

export default function CreativeFactoryPage() {
  const [activeTab, setActiveTab] = useState('matrix');

  return (
    <AuthLayer>
      <div className="min-h-screen bg-[#0A0A0A] text-zinc-100 font-sans selection:bg-orange-500/30">
        
        {/* Navbar */}
        <header className="border-b border-zinc-900 bg-black/50 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-[1600px] mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center font-black text-white shadow-lg shadow-orange-600/20">
                F
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tighter text-white">Creative Factory</h1>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)] animate-pulse"></span>
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Generador AI Activo</span>
                </div>
              </div>
            </div>
            
            <nav className="flex items-center gap-4">
              <Link href="/admin-architect" className="text-xs font-bold text-zinc-400 hover:text-white transition-colors">
                Ir al Dashboard
              </Link>
            </nav>
          </div>
        </header>

        {/* Layout */}
        <div className="max-w-[1600px] mx-auto px-6 py-8 flex gap-8">
          
          {/* Sidebar */}
          <div className="w-64 shrink-0">
            <nav className="space-y-2">
              <button 
                onClick={() => setActiveTab('matrix')}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 ${activeTab === 'matrix' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'}`}
              >
                <span>🎯</span> Matriz de 12 Creativos
              </button>
              <button 
                onClick={() => setActiveTab('generator')}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 ${activeTab === 'generator' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'}`}
              >
                <span>⚡</span> Generador de Campañas
              </button>
              <button 
                onClick={() => setActiveTab('rules')}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-3 ${activeTab === 'rules' ? 'bg-zinc-900 text-white border border-zinc-800' : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50'}`}
              >
                <span>📐</span> Reglas Visuales
              </button>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 min-w-0">
            {activeTab === 'matrix' && (
              <div className="animate-fade-in">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-black mb-2">Matriz de Despliegue</h2>
                    <p className="text-zinc-400 text-sm">Tus creativos finales aprobados y listos para pautar.</p>
                  </div>
                  <button onClick={() => setActiveTab('generator')} className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold py-2 px-4 rounded-lg transition-colors shadow-lg shadow-orange-600/20">
                    + Nuevo Creativo
                  </button>
                </div>
                
                {/* Empty State Real */}
                <div className="border border-dashed border-zinc-800 rounded-3xl p-12 text-center flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-zinc-900 rounded-2xl flex items-center justify-center text-3xl mb-4">🗂️</div>
                  <h3 className="text-xl font-bold text-white mb-2">Matriz Vacía</h3>
                  <p className="text-zinc-500 text-sm max-w-md mx-auto">No hay creativos aprobados aún. Ve al Generador de Campañas para crear tu primera pieza estratégica.</p>
                </div>
              </div>
            )}
            
            {activeTab === 'generator' && (
              <div className="animate-fade-in">
                <h2 className="text-3xl font-black mb-2">El Motor Generativo</h2>
                <p className="text-zinc-400 text-sm mb-8">Define el dolor. La IA construirá el copy, el gancho visual y la imagen final.</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Inputs Section */}
                  <div className="lg:col-span-1 space-y-6 bg-zinc-900/50 p-6 rounded-3xl border border-zinc-800">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">1. Dolor del Cliente</label>
                      <select className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none">
                        <option value="">Selecciona un dolor B2B...</option>
                        <option value="comisiones">Márgenes comidos por Apps de Delivery</option>
                        <option value="vacio">Local vacío entre semana</option>
                        <option value="caos">Caos en reservas y teléfono colapsado</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-widest text-zinc-400 mb-2">2. Ángulo de Ataque</label>
                      <select className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-orange-500 transition-colors appearance-none">
                        <option value="">Selecciona el ángulo...</option>
                        <option value="sangrado">El Sangrado Financiero (Agresivo)</option>
                        <option value="estatus">El Restaurante del Futuro (Estatus)</option>
                        <option value="roi">El Caso de Éxito Extremo (Prueba Social)</option>
                      </select>
                    </div>

                    <button className="w-full bg-white text-black font-black uppercase text-sm py-4 rounded-xl hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10 flex items-center justify-center gap-2">
                      <span>⚙️</span> Fabricar Campaña
                    </button>
                  </div>

                  {/* Outputs Section (Empty / Waiting) */}
                  <div className="lg:col-span-2 space-y-6">
                    {/* Estructura vacía a la espera de datos */}
                    <div className="border border-zinc-800 bg-black p-6 rounded-3xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-zinc-800"></div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                        <span>📝</span> Copy & Estrategia
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label className="text-[10px] text-zinc-600 font-bold uppercase block mb-1">Gancho (Texto en Imagen)</label>
                          <div className="w-full min-h-[40px] bg-zinc-900/50 rounded-lg border border-zinc-800/50 p-3 text-zinc-600 text-sm font-mono">Esperando generación...</div>
                        </div>
                        <div>
                          <label className="text-[10px] text-zinc-600 font-bold uppercase block mb-1">Primary Text (Cuerpo del Post)</label>
                          <div className="w-full min-h-[100px] bg-zinc-900/50 rounded-lg border border-zinc-800/50 p-3 text-zinc-600 text-sm font-mono">Esperando generación...</div>
                        </div>
                      </div>
                    </div>

                    <div className="border border-zinc-800 bg-black p-6 rounded-3xl relative overflow-hidden">
                      <div className="absolute top-0 left-0 w-1 h-full bg-orange-900/30"></div>
                      <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                        <span>🎨</span> Visual Asset (Regla 4:5)
                      </h3>
                      <div className="flex gap-6">
                        <div className="w-[200px] h-[250px] bg-zinc-900/50 border border-zinc-800/50 rounded-xl flex items-center justify-center text-zinc-700">
                          <span className="text-4xl opacity-50">🖼️</span>
                        </div>
                        <div className="flex-1 space-y-4">
                           <div>
                            <label className="text-[10px] text-zinc-600 font-bold uppercase block mb-1">Prompt Visual (Midjourney/DALL-E)</label>
                            <div className="w-full min-h-[80px] bg-zinc-900/50 rounded-lg border border-zinc-800/50 p-3 text-zinc-600 text-sm font-mono">Esperando generación...</div>
                          </div>
                          <button disabled className="w-full bg-zinc-900 text-zinc-600 font-bold text-xs py-3 rounded-lg border border-zinc-800 cursor-not-allowed">
                            Aprobar y Añadir a Matriz
                          </button>
                          <button disabled className="w-full bg-zinc-900 text-zinc-600 font-bold text-xs py-3 rounded-lg border border-zinc-800 cursor-not-allowed">
                            Descargar Assets (.ZIP)
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )}

            {activeTab === 'rules' && (
              <div>
                <h2 className="text-3xl font-black mb-2">Reglas de Oro del Diseño B2B</h2>
                <p className="text-zinc-400 text-sm mb-8">El 60% del éxito del anuncio recae en la imagen. No negocies estas reglas.</p>
                <div className="space-y-4">
                  <div className="bg-zinc-900 border-l-4 border-l-orange-500 p-6 rounded-r-2xl">
                    <h3 className="font-bold text-white mb-1">1. Contraste Extremo & Ancla Inesperada</h3>
                    <p className="text-zinc-400 text-sm">Cero fotos de stock. Usa imágenes nativas crudas o elementos UI de altísimo contraste. El dolor debe ser obvio visualmente.</p>
                  </div>
                  <div className="bg-zinc-900 border-l-4 border-l-orange-500 p-6 rounded-r-2xl">
                    <h3 className="font-bold text-white mb-1">2. Tipografía Invasiva (Max 10 palabras)</h3>
                    <p className="text-zinc-400 text-sm">Fuentes ExtraBold. El hook principal va SOBRE la imagen. Debe poder leerse haciendo scroll a máxima velocidad.</p>
                  </div>
                  <div className="bg-zinc-900 border-l-4 border-l-orange-500 p-6 rounded-r-2xl">
                    <h3 className="font-bold text-white mb-1">3. Formato 4:5 (Vertical)</h3>
                    <p className="text-zinc-400 text-sm">En estáticos de Meta, el 4:5 ocupa casi toda la pantalla del móvil. No uses 1:1 a menos que sea un Carrusel.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </AuthLayer>
  );
}
