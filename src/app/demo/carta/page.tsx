'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { 
  DEMO_MENU_SUSHI, CATEGORIES_SUSHI, 
  DEMO_MENU_TAPAS, CATEGORIES_TAPAS,
  DEMO_MENU_BURGER, CATEGORIES_BURGER,
  ALLERGEN_ICONS, UI_TRANSLATIONS, LanguageCode, MenuItem, TemplateType 
} from '@/lib/demo-data';

interface CartItem extends MenuItem {
  qty: number;
  dinerId: number;
}

// Helper to handle broken images gracefully
const ImageWithFallback = ({ src, alt, className }: { src: string, alt: string, className: string }) => {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image 
      src={imgSrc} 
      alt={alt} 
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={className + " object-cover"}
      onError={() => setImgSrc('/images/demo/s1.png')} // Fallback local de alta calidad garantizado
    />
  );
};

// ==========================================
// 1. LAYOUT: ALTA COCINA (EDITORIAL)
// ==========================================
function EditorialSushiLayout({ menu, categories, lang, t, activeDiner, setActiveDiner, tableParam, setLang, onAdd, onAsk }: any) {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#f5f5f5] font-serif pb-48">
      
      {/* 1. Unique Header (Inline, elegant, transparent) */}
      <header className="px-8 py-10 flex flex-col md:flex-row justify-between items-center border-b border-white/10">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h1 className="text-3xl tracking-[0.2em] uppercase font-light">Nobu <span className="text-amber-600 font-serif">Sense</span></h1>
          <p className="text-[10px] tracking-widest text-amber-600/70 mt-2 uppercase">{t.table_prefix} {tableParam}</p>
        </div>
        
        <div className="flex flex-col items-center gap-6">
          <div className="flex gap-4">
            {(['es', 'en', 'fr'] as LanguageCode[]).map(l => (
              <button key={l} onClick={() => setLang(l)} className={`text-[10px] uppercase tracking-widest transition-colors ${lang === l ? 'text-amber-500' : 'text-gray-600 hover:text-white'}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="flex gap-2 bg-white/5 p-1 rounded-full border border-white/10">
            {[1, 2, 3, 4].map(d => (
              <button key={d} onClick={() => setActiveDiner(d)} className={`px-4 py-2 text-[10px] uppercase tracking-widest rounded-full transition-all ${activeDiner === d ? 'bg-amber-600 text-white' : 'text-gray-500'}`}>
                {t.diner_prefix} {d}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* 2. Unique Hero Promo */}
      <div className="relative py-32 px-6 flex items-center justify-center border-b border-white/5 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=1200&q=30')] bg-cover bg-center mix-blend-luminosity"></div>
        <div className="relative z-10 text-center max-w-2xl">
          <span className="text-amber-500 text-xs tracking-[0.3em] uppercase mb-4 block">Experiencia Omakase</span>
          <h2 className="text-4xl md:text-6xl font-light leading-tight mb-8">
            Únete a The Club y recibe un <span className="italic text-amber-500">Sake Premium</span> de cortesía.
          </h2>
          <button className="px-8 py-3 border border-amber-500 text-amber-500 text-xs uppercase tracking-widest hover:bg-amber-500 hover:text-black transition-colors">
            Descubrir Beneficios
          </button>
        </div>
      </div>

      {/* 3. Menu Content */}
      <div className="max-w-4xl mx-auto px-6 py-24 space-y-32">
        {categories.map((cat: any, index: number) => {
          const items = menu.filter((i: any) => i.category === cat.id);
          if (!items.length) return null;

          return (
            <section key={cat.id}>
              <h3 className="text-2xl text-white mb-16 pb-4 flex items-center gap-6">
                <span className="w-12 h-[1px] bg-amber-500/50"></span>
                {cat.name[lang]}
              </h3>
              
              <div className="flex flex-col space-y-24">
                {items.map((item: any, idx: number) => (
                  <div key={item.id} className={`flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}>
                    <div className="w-full md:w-1/2">
                      <div className="aspect-[16/9] w-full overflow-hidden bg-white/5 relative">
                        <ImageWithFallback src={item.image} alt={item.name[lang]} className="grayscale-[30%] hover:grayscale-0 transition-all duration-1000" />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 flex flex-col justify-center">
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="text-xl text-white font-light">{item.name[lang]}</h4>
                        <span className="text-lg text-amber-500 ml-4">{item.price.toFixed(2)}€</span>
                      </div>
                      {item.isChefRecommendation && <span className="text-[9px] uppercase tracking-[0.2em] text-amber-500 mb-2 block">✧ {t.chef_rec}</span>}
                      {item.allergens.length > 0 && (
                        <div className="flex gap-2 mb-4">
                          {item.allergens.map((a: string) => (
                            <span key={a} title={ALLERGEN_ICONS[a]} className="text-[8px] border border-amber-500/30 text-amber-500/70 px-1.5 py-0.5 uppercase tracking-widest">{a}</span>
                          ))}
                        </div>
                      )}
                      <p className="text-gray-400 font-sans font-light text-sm mb-10 leading-relaxed">
                        {item.description[lang]}
                      </p>
                      <div className="flex gap-4">
                        <button onClick={() => onAdd(item)} className="px-6 py-3 border border-white/20 text-white text-[10px] tracking-[0.2em] uppercase hover:border-amber-500 hover:text-amber-500 transition-colors">
                          {t.add_to_order} ({activeDiner})
                        </button>
                        <button onClick={() => onAsk(item.name[lang])} className="px-4 py-3 text-gray-500 text-[10px] tracking-[0.2em] uppercase hover:text-amber-500 transition-colors">
                          {t.ask_ai}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* 4. Unique Loyalty Form */}
      <div className="max-w-2xl mx-auto px-6 py-24 text-center border-t border-white/10 mt-16">
        <h3 className="text-3xl font-light mb-4">Membresía <span className="text-amber-500 italic">Exclusiva</span></h3>
        <p className="text-sm text-gray-400 mb-8 font-sans font-light">Déjenos su email para acceder a mesas ocultas, eventos de cata privados y reclamar su Sake de bienvenida.</p>
        <div className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
          <input type="email" placeholder="Su correo electrónico..." className="flex-1 bg-transparent border-b border-white/30 px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors font-sans" />
          <button className="px-6 py-3 bg-amber-600 text-white text-[10px] uppercase tracking-widest hover:bg-amber-500 transition-colors">
            Solicitar Acceso
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. LAYOUT: BAR GRANADINO (LISTA DENSA)
// ==========================================
// ==========================================
// 2. LAYOUT: BAR GRANADINO (LISTA DENSA)
// ==========================================
function ListTapasLayout({ menu, categories, lang, t, activeDiner, setActiveDiner, tableParam, setLang, onAdd, onAsk }: any) {
  const [loyaltyStep, setLoyaltyStep] = useState(1);
  const [selectedReward, setSelectedReward] = useState<string | null>(null);
  const [loyaltyName, setLoyaltyName] = useState('');
  const [loyaltyPhone, setLoyaltyPhone] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [isOtpVerifying, setIsOtpVerifying] = useState(false);

  const rewards = [
    { id: 'beer', name: 'Caña de Alhambra 1925', desc: 'Una caña helada de nuestra cerveza artesana estrella.', icon: '🍺' },
    { id: 'croquetas', name: 'Ración de Croquetas', desc: 'Dos croquetas melosas de rabo de toro crujientes.', icon: '🧆' },
    { id: 'dessert', name: 'Pionono de Santa Fe', desc: 'Bizcocho humedecido tradicional con crema tostada.', icon: '🍰' }
  ];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loyaltyName || !loyaltyPhone) return;
    setLoyaltyStep(3);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#2c3e2e] font-sans pb-48">
      
      {/* 1. Unique Header (Chalkboard style) */}
      <header className="bg-[#2c3e2e] text-[#f4ecd8] px-4 py-6 shadow-md border-b border-[#cc5203]/30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-serif font-bold italic tracking-tight">
              La Taberna de Baco
            </h1>
            <div className="text-xs uppercase tracking-widest mt-1 opacity-80 border-t border-[#f4ecd8]/20 pt-1 inline-block">
              Gastrobar, Tapas & Solera Granadina • {t.table_prefix} {tableParam}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <div className="flex bg-[#1e2a1f] p-1 rounded-md shadow-inner">
              {[1, 2, 3, 4].map(d => (
                <button key={d} onClick={() => setActiveDiner(d)} className={`px-3 py-1.5 text-xs font-bold uppercase rounded-sm transition-colors ${activeDiner === d ? 'bg-[#f4ecd8] text-[#2c3e2e]' : 'text-white/60'}`}>
                  {t.diner_prefix} {d}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              {(['es', 'en', 'fr'] as LanguageCode[]).map(l => (
                <button key={l} onClick={() => setLang(l)} className={`w-6 h-6 rounded-full text-[9px] font-bold border ${lang === l ? 'bg-[#f4ecd8] text-[#2c3e2e] border-transparent' : 'border-white/30 text-white/80'}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Unique Hero Promo */}
      <div className="bg-[#e85d04] text-white py-8 px-4 text-center shadow-inner relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/5 rounded-full -ml-16 -mt-16 pointer-events-none"></div>
        <div className="max-w-xl mx-auto border-2 border-white/30 p-6 rounded-lg border-dashed relative z-10">
          <span className="text-4xl block mb-2">🍻</span>
          <h2 className="text-2xl font-black uppercase tracking-wider mb-2">¡2x1 en tus Primeras Cañas!</h2>
          <p className="text-sm font-medium opacity-90 mb-0">Solo para miembros registrados del Club del Tapeo VIP. Únete abajo.</p>
        </div>
      </div>

      {/* 3. Menu Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
        {categories.map((cat: any) => {
          const items = menu.filter((i: any) => i.category === cat.id);
          if (!items.length) return null;

          return (
            <section key={cat.id} className="bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-[#e8e4d9]">
              <h3 className="text-3xl font-serif font-bold text-[#2c3e2e] mb-8 border-b-2 border-[#cc5203] pb-3 inline-block">
                {cat.name[lang]}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {items.map((item: any) => (
                  <div key={item.id} className="bg-[#fefdfa] border border-[#e6dfcf] rounded-2xl p-4 md:p-5 flex gap-4 md:gap-6 items-center hover:shadow-md hover:border-[#cc5203] transition-all duration-300 group relative">
                    <div className="relative w-24 h-24 md:w-28 md:h-28 shrink-0 rounded-2xl overflow-hidden shadow-sm border border-[#e8e4d9] bg-[#f4ecd8]">
                      <ImageWithFallback src={item.image} alt={item.name[lang]} className="group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="text-base md:text-lg font-bold text-[#2c3e2e] truncate pr-2">{item.name[lang]}</h4>
                          <span className="text-base md:text-lg font-black text-[#e85d04]">{item.price.toFixed(2)}€</span>
                        </div>
                        {item.isChefRecommendation && (
                          <span className="inline-block text-[8px] font-bold tracking-widest bg-[#e85d04]/10 text-[#e85d04] px-2 py-0.5 rounded-full mb-1">
                            ⭐ RECOMENDADO
                          </span>
                        )}
                        {item.allergens.length > 0 && (
                          <div className="flex gap-1 mb-2">
                            {item.allergens.map((a: string) => (
                              <span key={a} title={ALLERGEN_ICONS[a]} className="text-[8px] bg-[#f4ecd8] text-[#2c3e2e] px-1.5 py-0.5 rounded-sm font-bold uppercase">{a}</span>
                            ))}
                          </div>
                        )}
                        <p className="text-[#6b7264] text-xs leading-relaxed mb-3 line-clamp-2">
                          {item.description[lang]}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => onAdd(item)} className="bg-[#2c3e2e] text-white px-4 py-2 rounded-xl text-xs font-bold uppercase hover:bg-[#1e2a1f] transition-colors active:scale-95">
                          + Añadir
                        </button>
                        <button onClick={() => onAsk(item.name[lang])} className="bg-[#f4ecd8] text-[#2c3e2e] px-3 py-2 rounded-xl text-xs font-bold uppercase hover:bg-[#e8e4d9] transition-colors">
                          🤖 Asistente
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* 4. Interactive Loyalty Widget */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="bg-[#2c3e2e] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden border border-[#d4af37]/20">
          <div className="absolute -top-10 -right-10 text-[180px] opacity-5 pointer-events-none">🍷</div>
          
          <div className="relative z-10">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-[#e85d04] text-xs font-bold tracking-[0.3em] uppercase block mb-2">Club del Tapeo VIP</span>
              <h3 className="text-3xl font-serif font-bold mb-3">Programa de Recompensas</h3>
              <p className="text-sm text-white/70">Regístrate en 30 segundos, llévate un regalo de bienvenida directo en tu mesa y acumula sellos digitales.</p>
            </div>

            {loyaltyStep === 1 && (
              <div className="space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-center text-[#f4ecd8] mb-4">Paso 1: Selecciona tu regalo de bienvenida</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {rewards.map(r => (
                    <button
                      key={r.id}
                      onClick={() => { setSelectedReward(r.name); setLoyaltyStep(2); }}
                      className="bg-white/5 border border-white/10 hover:border-[#e85d04] hover:bg-white/10 p-6 rounded-2xl text-left transition-all duration-300 group flex flex-col justify-between h-40"
                    >
                      <span className="text-3xl mb-3">{r.icon}</span>
                      <div>
                        <div className="font-bold text-white group-hover:text-[#e85d04] transition-colors">{r.name}</div>
                        <div className="text-[11px] text-white/50 mt-1 line-clamp-2">{r.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {loyaltyStep === 2 && (
              <form onSubmit={handleRegister} className="max-w-md mx-auto space-y-6">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center justify-between">
                  <div className="text-xs">
                    <span className="text-white/50 block">Regalo seleccionado:</span>
                    <span className="font-bold text-white">{selectedReward}</span>
                  </div>
                  <button type="button" onClick={() => setLoyaltyStep(1)} className="text-xs text-[#e85d04] underline">Cambiar</button>
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-center text-[#f4ecd8]">Paso 2: Completa tus datos de registro</h4>
                <div className="space-y-4">
                  <input
                    type="text"
                    required
                    placeholder="Tu nombre completo..."
                    value={loyaltyName}
                    onChange={e => setLoyaltyName(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-[#e85d04] font-medium text-sm"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Tu número de teléfono..."
                    value={loyaltyPhone}
                    onChange={e => setLoyaltyPhone(e.target.value)}
                    className="w-full px-5 py-4 rounded-xl bg-black/40 text-white border border-white/10 focus:outline-none focus:border-[#e85d04] font-medium text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-[#e85d04] text-white font-bold rounded-xl uppercase tracking-wider hover:bg-[#cc5203] transition-colors text-xs"
                >
                  Solicitar Recompensa
                </button>
              </form>
            )}

            {loyaltyStep === 3 && (
              <div className="max-w-md mx-auto text-center space-y-6">
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#f4ecd8]">Paso 3: Verificación de Teléfono</h4>
                <p className="text-xs text-white/60">Simulando el envío de un código SMS de verificación de 4 dígitos al número: <span className="text-white font-bold">{loyaltyPhone}</span></p>
                
                <div className="bg-black/20 p-6 rounded-2xl border border-white/5 space-y-4">
                  <div className="text-[11px] text-white/40">Ingresa cualquier código de 4 dígitos (ej: 1234)</div>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="0000"
                    value={otpInput}
                    onChange={e => {
                      const val = e.target.value.replace(/\D/g, '');
                      setOtpInput(val);
                      if (val.length === 4) {
                        setIsOtpVerifying(true);
                        setTimeout(() => {
                          setIsOtpVerifying(false);
                          setLoyaltyStep(4);
                        }, 1200);
                      }
                    }}
                    className="w-32 px-4 py-3 text-center tracking-[0.5em] text-xl rounded-xl bg-black/50 text-white border border-white/10 focus:outline-none focus:border-[#e85d04] font-bold"
                  />
                  
                  {isOtpVerifying && (
                    <div className="text-xs text-[#e85d04] flex items-center justify-center gap-2">
                      <div className="w-3 h-3 border-2 border-t-transparent border-[#e85d04] rounded-full animate-spin"></div>
                      <span>Verificando número...</span>
                    </div>
                  )}
                </div>
                
                <button type="button" onClick={() => setLoyaltyStep(2)} className="text-xs text-white/50 hover:text-white underline">Volver al paso anterior</button>
              </div>
            )}

            {loyaltyStep === 4 && (
              <div className="max-w-md mx-auto space-y-8 animate-fade-in">
                {/* Virtual Card */}
                <div className="bg-gradient-to-br from-[#d4af37]/80 to-[#aa7c11] text-[#2c3e2e] p-6 rounded-3xl shadow-xl relative overflow-hidden border border-white/30 flex flex-col justify-between min-h-[220px] shadow-[0_15px_30px_rgba(0,0,0,0.3)]">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-8 -mt-8"></div>
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-[9px] uppercase tracking-widest font-black opacity-60">Tarjeta de Fidelización VIP</div>
                      <div className="text-xl font-serif font-black italic tracking-tight text-[#1b2b1d] mt-1">Club de Baco</div>
                    </div>
                    <span className="text-2xl">🍷</span>
                  </div>

                  {/* Stamp grid */}
                  <div className="my-4">
                    <div className="text-[8px] uppercase tracking-wider font-bold mb-2 opacity-80">Mis Sellos de Consumo</div>
                    <div className="grid grid-cols-5 gap-2">
                      {/* Active reward stamp */}
                      <div className="aspect-square bg-[#1b2b1d] text-[#d4af37] rounded-xl flex items-center justify-center text-xs font-bold border border-white/20 shadow-inner flex-col">
                        <span>🎁</span>
                        <span className="text-[6px] tracking-tighter opacity-80 mt-0.5">LISTO</span>
                      </div>
                      {/* Empty stamps */}
                      {Array.from({ length: 9 }).map((_, idx) => (
                        <div key={idx} className="aspect-square border border-[#1b2b1d]/30 rounded-xl flex items-center justify-center text-[10px] font-bold opacity-30 bg-black/5">
                          {idx + 2}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-t border-[#1b2b1d]/20 pt-3">
                    <div>
                      <div className="text-[8px] uppercase tracking-wider opacity-60">Socio Titular</div>
                      <div className="text-xs font-black uppercase text-[#1b2b1d]">{loyaltyName}</div>
                    </div>
                    <div className="text-[9px] font-mono tracking-widest font-bold bg-[#1b2b1d]/10 px-2 py-1 rounded">
                      Nº {loyaltyPhone.slice(-4)}-VIP
                    </div>
                  </div>
                </div>

                {/* QR scanner mockup */}
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-4">
                  <div className="font-bold text-sm text-[#f4ecd8]">¡Registro Completado con Éxito!</div>
                  <div className="text-xs text-white/70">Tu regalo de bienvenida **({selectedReward})** ha sido cargado a la mesa {tableParam}.</div>
                  
                  {/* QR code container */}
                  <div className="bg-white p-3 rounded-2xl w-32 h-32 mx-auto flex items-center justify-center shadow-inner">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-black">
                      <path d="M10,10 h30 v30 h-30 z M10,60 h30 v30 h-30 z M60,10 h30 v30 h-30 z" fill="currentColor" />
                      <path d="M15,15 h20 v20 h-20 z M15,65 h20 v20 h-20 z M65,15 h20 v20 h-20 z" fill="white" />
                      <path d="M20,20 h10 v10 h-10 z M20,70 h10 v10 h-10 z M70,20 h10 v10 h-10 z" fill="currentColor" />
                      <path d="M45,45 h10 v10 h-10 z M60,60 h10 v10 h-10 z M75,75 h15 v15 h-15 z M60,80 h10 v10 h-10 z M80,60 h10 v10 h-10 z" fill="currentColor" />
                    </svg>
                  </div>
                  
                  <div className="text-[10px] text-white/50">Muestra el código QR al camarero para que valide la recompensa de bienvenida.</div>
                  
                  <button type="button" onClick={() => { setLoyaltyStep(1); setSelectedReward(null); }} className="text-xs text-[#e85d04] hover:text-[#ff7b00] underline font-bold mt-2">Registrar otra cuenta</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. LAYOUT: FAST FOOD (APP GRID / NEON)
// ==========================================
function GridBurgerLayout({ menu, categories, lang, t, activeDiner, setActiveDiner, tableParam, setLang, onAdd, onAsk }: any) {
  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-48 selection:bg-[#ff003c] selection:text-white">
      
      {/* 1. Unique Header (Cyberpunk / Delivery App style) */}
      <header className="sticky top-0 z-30 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ff003c] rounded-xl flex items-center justify-center font-black text-2xl italic shadow-[0_0_15px_rgba(255,0,60,0.5)]">
              B
            </div>
            <div>
              <h1 className="text-xl font-black italic uppercase tracking-tighter leading-none">Bite<span className="text-[#ff003c]">Corp</span></h1>
              <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{tableParam}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex gap-1">
              {(['es', 'en', 'fr'] as LanguageCode[]).map(l => (
                <button key={l} onClick={() => setLang(l)} className={`w-6 h-6 rounded-full text-[9px] font-black uppercase border ${lang === l ? 'bg-[#ff003c] text-white border-transparent' : 'border-zinc-800 text-zinc-500'}`}>
                  {l}
                </button>
              ))}
            </div>
            <div className="flex bg-[#111] p-1 rounded-xl w-full sm:w-auto overflow-x-auto">
              {[1, 2, 3, 4].map(d => (
                <button key={d} onClick={() => setActiveDiner(d)} className={`flex-1 sm:flex-none px-4 py-2 text-[10px] font-black uppercase rounded-lg transition-all ${activeDiner === d ? 'bg-[#ff003c] text-white shadow-[0_0_10px_rgba(255,0,60,0.4)]' : 'text-zinc-500'}`}>
                  Diner {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* 2. Unique Hero Promo */}
      <div className="px-4 py-6 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-[#ff003c] to-[#ff7b00] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(255,0,60,0.2)]">
          <div className="relative z-10">
            <div className="bg-black text-white text-[10px] font-black px-3 py-1 inline-block uppercase tracking-widest rounded-full mb-4">Limited Time</div>
            <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter mb-4 text-white drop-shadow-lg">
              FREE LOADED FRIES
            </h2>
            <p className="text-lg font-bold opacity-90 mb-6 max-w-md">Join the Crave Syndicate and get a massive portion of Bacon Fries with your first Smash.</p>
          </div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[url('https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=800&q=80')] bg-cover rounded-full border-8 border-[#ff003c] shadow-2xl transform -rotate-12 hidden md:block"></div>
        </div>
      </div>

      {/* 3. Menu Content */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        {categories.map((cat: any) => {
          const items = menu.filter((i: any) => i.category === cat.id);
          if (!items.length) return null;

          return (
            <section key={cat.id}>
              <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-8 flex items-center gap-4 text-zinc-100">
                {cat.name[lang]}
                <span className="h-1 flex-1 bg-gradient-to-r from-zinc-800 to-transparent rounded-full"></span>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {items.map((item: any) => (
                  <div key={item.id} className="bg-[#111] rounded-3xl overflow-hidden border border-zinc-800 flex flex-col group relative">
                    <div className="absolute inset-0 border-2 border-[#ff003c] opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity z-20 pointer-events-none"></div>
                    
                    <div className="aspect-[4/3] w-full relative overflow-hidden bg-black">
                      <ImageWithFallback src={item.image} alt={item.name[lang]} className="group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100" />
                      {item.isChefRecommendation && (
                        <div className="absolute top-3 left-3 z-10 bg-[#ff003c] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-lg">
                          HYPE
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 z-10 bg-black/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl font-black text-lg border border-white/10">
                        {item.price.toFixed(2)}€
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h4 className="text-xl font-black uppercase tracking-tight mb-1 line-clamp-1">{item.name[lang]}</h4>
                      {item.allergens.length > 0 && (
                        <div className="flex gap-1 mb-2">
                          {item.allergens.map((a: string) => (
                            <span key={a} title={ALLERGEN_ICONS[a]} className="text-[8px] bg-zinc-800 text-zinc-400 px-1.5 py-0.5 rounded-sm font-bold uppercase">{a}</span>
                          ))}
                        </div>
                      )}
                      <p className="text-zinc-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-1">
                        {item.description[lang]}
                      </p>
                      
                      <div className="grid grid-cols-4 gap-2">
                        <button onClick={() => onAsk(item.name[lang])} className="col-span-1 h-12 flex items-center justify-center rounded-2xl bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                          🤖
                        </button>
                        <button onClick={() => onAdd(item)} className="col-span-3 h-12 flex items-center justify-center rounded-2xl bg-[#ff003c] text-white font-black uppercase tracking-widest text-xs hover:bg-[#ff3366] transition-colors active:scale-95">
                          ADD TO TRAY
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* 4. Unique Loyalty Form */}
      <div className="px-4 py-16">
        <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
          <div className="absolute -left-20 -bottom-20 text-[200px] opacity-5">💀</div>
          <div className="flex-1 relative z-10 text-center md:text-left">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2 text-white">Join the Syndicate</h3>
            <p className="text-zinc-400 text-sm mb-0">Drop your email to claim your Free Fries and unlock underground secret menu drops.</p>
          </div>
          <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3 relative z-10">
            <input type="email" placeholder="YOUR@EMAIL.COM" className="w-full sm:w-64 px-5 py-4 rounded-2xl bg-black text-white border border-zinc-700 focus:outline-none focus:border-[#ff003c] font-black uppercase text-sm" />
            <button className="px-8 py-4 bg-white text-black font-black rounded-2xl uppercase tracking-widest hover:bg-gray-200 transition-colors">
              JOIN NOW
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}


// ==========================================
// MAIN CONTROLLER (STATE & GLOBAL COMPONENTS)
// ==========================================
function CartaContent() {
  const searchParams = useSearchParams();
  const tableParam = searchParams.get('table') || 'Demo';

  const [lang, setLang] = useState<LanguageCode>('es');
  const [activeTemplate, setActiveTemplate] = useState<TemplateType>('sushi');
  const [activeDiner, setActiveDiner] = useState<number>(1);
  const [cart, setCart] = useState<CartItem[]>([]);
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isSalesModalOpen, setIsSalesModalOpen] = useState(false);
  const [isSwitcherModalOpen, setIsSwitcherModalOpen] = useState(false);

  // Chat State
  const [chatMessages, setChatMessages] = useState<{role: string, content: string}[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeDishContext, setActiveDishContext] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = UI_TRANSLATIONS[lang];

  let currentMenu = DEMO_MENU_SUSHI;
  let currentCategories = CATEGORIES_SUSHI;
  if (activeTemplate === 'tapas') { currentMenu = DEMO_MENU_TAPAS; currentCategories = CATEGORIES_TAPAS; } 
  else if (activeTemplate === 'burger') { currentMenu = DEMO_MENU_BURGER; currentCategories = CATEGORIES_BURGER; }

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages, isTyping]);
  useEffect(() => { 
    setCart([]); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTemplate]);

  const addToCart = (item: MenuItem, qty: number = 1) => {
    setCart(prev => {
      const existing = prev.findIndex(i => i.id === item.id && i.dinerId === activeDiner);
      if (existing >= 0) { const nc = [...prev]; nc[existing].qty += qty; return nc; }
      return [...prev, { ...item, qty, dinerId: activeDiner }];
    });
  };

  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartItemCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const getDinerTotal = (dinerId: number) => cart.filter(c => c.dinerId === dinerId).reduce((acc, item) => acc + (item.price * item.qty), 0);

  const openContextualChat = (dishName: string) => {
    setActiveDishContext(dishName);
    setIsCartOpen(true);
    const initialPrompt = `Me gustaría consultar sobre: ${dishName}.`;
    setChatMessages(prev => [...prev, { role: 'user', content: initialPrompt }]);
    sendToAi(initialPrompt, dishName);
  };

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    sendToAi(userMsg, activeDishContext);
  };

  const sendToAi = async (userMsg: string, context: string | null) => {
    setIsTyping(true);
    try {
      const res = await fetch('/api/demo/waiter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...chatMessages, { role: 'user', content: userMsg }], language: lang, contextDish: context, template: activeTemplate })
      });
      const jsonRes = await res.json();
      if (jsonRes.status === 'ok') {
        const { text, action } = jsonRes.data;
        setChatMessages(prev => [...prev, { role: 'assistant', content: text }]);
        if (action && action.type === 'ADD_MULTIPLE') {
          action.items.forEach((actItem: any) => {
            const menuItem = currentMenu.find(m => m.id === actItem.itemId);
            if (menuItem) addToCart(menuItem, actItem.qty);
          });
        }
      } else { setChatMessages(prev => [...prev, { role: 'assistant', content: "Error." }]); }
    } catch (e) { setChatMessages(prev => [...prev, { role: 'assistant', content: "Error." }]); } finally { setIsTyping(false); }
  };

  return (
    <div className={`relative transition-colors duration-500 bg-black`}>
      
      {/* GLOBAL BACK BUTTON */}
      <div className="fixed top-4 left-4 z-50 animate-fade-in-down">
        <a href="/" className="bg-black/80 backdrop-blur-md text-white border border-white/20 px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-2xl hover:bg-white hover:text-black transition-colors flex items-center gap-2">
          <span>🔙</span> Volver a Architect.Sys
        </a>
      </div>

      {/* RENDER ACTIVE LAYOUT (HEADERS ARE INSIDE THEM NOW) */}
      {activeTemplate === 'sushi' && <EditorialSushiLayout menu={currentMenu} categories={currentCategories} lang={lang} t={t} activeDiner={activeDiner} setActiveDiner={setActiveDiner} tableParam={tableParam} setLang={setLang} onAdd={addToCart} onAsk={openContextualChat} />}
      {activeTemplate === 'tapas' && <ListTapasLayout menu={currentMenu} categories={currentCategories} lang={lang} t={t} activeDiner={activeDiner} setActiveDiner={setActiveDiner} tableParam={tableParam} setLang={setLang} onAdd={addToCart} onAsk={openContextualChat} />}
      {activeTemplate === 'burger' && <GridBurgerLayout menu={currentMenu} categories={currentCategories} lang={lang} t={t} activeDiner={activeDiner} setActiveDiner={setActiveDiner} tableParam={tableParam} setLang={setLang} onAdd={addToCart} onAsk={openContextualChat} />}

      {/* GLOBAL FIXED DOCK (B2B SALES & SWITCHER) */}
      <div className="fixed bottom-0 left-0 w-full z-40 p-4 pointer-events-none pb-8">
        <div className="max-w-md mx-auto flex flex-col gap-3 pointer-events-auto">
          {cartItemCount > 0 && (
            <button onClick={() => setIsCartOpen(true)} className={`bg-black/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex justify-between items-center hover:scale-[1.02] animate-fade-in`}>
              <div className="flex items-center gap-4">
                <span className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold bg-white text-black">{cartItemCount}</span>
                <span className="text-sm uppercase tracking-[0.1em] font-bold text-white">{t.view_order}</span>
              </div>
              <span className="font-serif text-xl text-white">{cartTotal.toFixed(2)}€</span>
            </button>
          )}

          <div className="flex gap-2 w-full shadow-2xl rounded-2xl overflow-hidden border border-white/10 bg-black/90 backdrop-blur-xl p-1.5">
            <button onClick={() => setIsSwitcherModalOpen(true)} className="flex-1 bg-transparent text-white px-4 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10">
              🎨 {t.sales_cta_1}
            </button>
            <button onClick={() => setIsSalesModalOpen(true)} className="flex-1 bg-[#10b981] hover:bg-[#059669] text-black px-4 py-3.5 rounded-xl text-[10px] font-bold uppercase tracking-widest">
              💰 {t.sales_cta_2}
            </button>
          </div>
        </div>
      </div>

      {/* TEMPLATE SWITCHER MODAL */}
      {isSwitcherModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsSwitcherModalOpen(false)}></div>
          <div className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl animate-fade-in">
            <h3 className="font-serif text-3xl text-white mb-8 text-center">{t.select_design}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button onClick={() => { setActiveTemplate('sushi'); setIsSwitcherModalOpen(false); }} className={`p-8 rounded-2xl border transition-all ${activeTemplate === 'sushi' ? 'bg-amber-500/10 border-amber-500' : 'bg-black border-white/10 hover:border-white/30'}`}>
                <div className="text-5xl mb-6">🍣</div><div className="font-serif text-white text-xl mb-2">Alta Cocina</div><div className="text-sm text-gray-500">Diseño Editorial y Minimalista.</div>
              </button>
              <button onClick={() => { setActiveTemplate('tapas'); setIsSwitcherModalOpen(false); }} className={`p-8 rounded-2xl border transition-all ${activeTemplate === 'tapas' ? 'bg-[#e85d04]/10 border-[#e85d04]' : 'bg-black border-white/10 hover:border-white/30'}`}>
                <div className="text-5xl mb-6">🍺</div><div className="font-serif text-white text-xl mb-2">Bar & Tapas</div><div className="text-sm text-gray-500">Diseño Lista. Tradición y Cuchareo.</div>
              </button>
              <button onClick={() => { setActiveTemplate('burger'); setIsSwitcherModalOpen(false); }} className={`p-8 rounded-2xl border transition-all ${activeTemplate === 'burger' ? 'bg-[#ff003c]/10 border-[#ff003c]' : 'bg-black border-white/10 hover:border-white/30'}`}>
                <div className="text-5xl mb-6">🍔</div><div className="font-sans font-black uppercase text-white text-xl mb-2">Fast Food App</div><div className="text-sm text-gray-500">Diseño Grid/Neon. Compra Impulsiva.</div>
              </button>
            </div>
            <button onClick={() => setIsSwitcherModalOpen(false)} className="mt-10 w-full text-xs uppercase tracking-[0.2em] text-gray-500 hover:text-white">Cerrar Panel</button>
          </div>
        </div>
      )}

      {/* SALES MODAL B2B (UPDATED WITH WEBSITE BUTTON) */}
      {isSalesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={() => setIsSalesModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 shadow-2xl text-center animate-fade-in">
            <h3 className="font-serif text-3xl text-white mb-4">Transforma tu Sala</h3>
            <p className="text-gray-400 text-sm font-light leading-relaxed mb-8">
              Esta es solo 1 de las 10 tecnologías que componen nuestro ecosistema B2B. Aumenta el ticket medio, fideliza clientes y domina tu sector.
            </p>
            <div className="space-y-4">
              <a href="/" className="block w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-gray-200">
                Ver Ecosistema Web Completo
              </a>
              <a href="#" onClick={() => alert('Abriendo Calendly...')} className="block w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-[#10b981] text-black hover:bg-[#059669]">
                Agendar Auditoría Gratuita
              </a>
              <a href="https://wa.me/34000000000" target="_blank" rel="noopener noreferrer" className="block w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest border border-[#10b981] text-[#10b981] hover:bg-[#10b981]/10">
                Hablar por WhatsApp
              </a>
            </div>
            <button onClick={() => setIsSalesModalOpen(false)} className="mt-6 text-xs uppercase tracking-[0.2em] text-gray-600 hover:text-white">Cerrar Panel</button>
          </div>
        </div>
      )}

      {/* GLOBAL CART & CHAT (Simplified internal structure for brevity, identical functionality) */}
      {/* (Cart Drawer logic kept intact) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end px-2 pb-2">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-5xl mx-auto h-[85vh] rounded-3xl p-6 md:p-8 flex flex-col bg-[#0a0a0a] border border-white/10 animate-fade-in">
            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
              <h2 className="font-serif text-2xl md:text-3xl text-white flex items-center gap-3">
                <span>Comanda Activa</span>
                <span className="text-xs uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full font-sans font-bold">Mesa {tableParam}</span>
              </h2>
              <button onClick={() => setIsCartOpen(false)} className="text-white bg-white/10 hover:bg-white/20 w-10 h-10 rounded-full flex items-center justify-center transition-colors">✕</button>
            </div>

            {/* Split layout: Order on left, Camarero IA on right (Desktop) */}
            <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-8">
              
              {/* Order side (3/5 width on desktop) */}
              <div className="md:col-span-3 flex flex-col h-full min-h-0 justify-between">
                <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                  {[1, 2, 3, 4].map(d => {
                    const dinerCart = cart.filter(c => c.dinerId === d);
                    if (dinerCart.length === 0) return null;
                    return (
                      <div key={d} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                        <div className="flex justify-between items-center mb-4 border-b border-white/5 pb-3">
                          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Comensal {d}</h3>
                          <span className="font-serif text-lg text-white">{getDinerTotal(d).toFixed(2)}€</span>
                        </div>
                        <div className="space-y-4">
                          {dinerCart.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold bg-white/10 text-white px-2 py-1 rounded">{item.qty}x</span>
                                <div className="text-sm text-gray-200">{item.name[lang]}</div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className="font-serif text-sm text-gray-400">{(item.price * item.qty).toFixed(2)}€</span>
                                <button onClick={() => {
                                  // Quick remove / decrement
                                  setCart(prev => {
                                    const existing = prev.findIndex(i => i.id === item.id && i.dinerId === d);
                                    if (existing >= 0) {
                                      const nc = [...prev];
                                      if (nc[existing].qty > 1) {
                                        nc[existing].qty -= 1;
                                      } else {
                                        nc.splice(existing, 1);
                                      }
                                      return nc;
                                    }
                                    return prev;
                                  });
                                }} className="text-[10px] text-red-500 hover:text-red-400 bg-red-500/10 px-2.5 py-1 rounded transition-colors">
                                  Borrar
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  {cart.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-12">
                      <span className="text-5xl mb-4">🛒</span>
                      <p className="text-sm">Tu bandeja de pedido está vacía.</p>
                      <p className="text-xs text-gray-600 mt-2">¡Pídele recomendaciones al Camarero IA a la derecha!</p>
                    </div>
                  )}
                </div>

                {/* Confirm Order section */}
                {cartTotal > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10 bg-[#0a0a0a]">
                    <div className="flex justify-between items-end mb-4">
                      <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-500">Total Comanda</span>
                      <span className="font-serif text-3xl text-white">{cartTotal.toFixed(2)}€</span>
                    </div>
                    <button onClick={() => { alert('Pedido Enviado a Cocina'); setCart([]); setIsCartOpen(false); }} className="w-full py-4 rounded-xl text-xs font-bold uppercase tracking-widest bg-white text-black hover:bg-gray-200 transition-colors">
                      Enviar a Cocina (Mesa {tableParam})
                    </button>
                  </div>
                )}
              </div>

              {/* Camarero IA side (2/5 width on desktop, acts as chat section) */}
              <div className="md:col-span-2 flex flex-col h-full min-h-0 bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
                <div className="bg-white/5 px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></div>
                    <div>
                      <div className="text-xs font-bold text-white uppercase tracking-wider">Camarero IA Interactiva</div>
                      <div className="text-[9px] text-gray-400">Gestiona tu pedido y responde tus dudas</div>
                    </div>
                  </div>
                  <span className="text-lg">🤖</span>
                </div>
                
                {/* Chat Message Window */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
                  <div className="flex justify-start">
                    <div className="p-3.5 rounded-2xl rounded-tl-sm max-w-[90%] bg-white/5 text-gray-300 font-light leading-relaxed border border-white/5">
                      ¡Hola! Soy tu camarero de mesa interactivo. Puedo ayudarte a añadir platos a tu bandeja, sugerirte maridajes o responder dudas sobre alergias. ¿Qué te apetece hoy?
                    </div>
                  </div>
                  {chatMessages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`p-3.5 rounded-2xl max-w-[90%] font-light leading-relaxed ${msg.role === 'user' ? 'bg-[#e85d04] text-white rounded-tr-sm' : 'bg-white/5 text-gray-300 border border-white/5 rounded-tl-sm'}`}>
                        {msg.content}
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start animate-pulse">
                      <div className="p-3 rounded-2xl rounded-tl-sm bg-white/5 border border-white/5 flex gap-1">
                        <div className="w-1 h-1 rounded-full bg-gray-500 animate-bounce"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-500 animate-bounce" style={{animationDelay:'150ms'}}></div>
                        <div className="w-1 h-1 rounded-full bg-gray-500 animate-bounce" style={{animationDelay:'300ms'}}></div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                
                {/* Chat Suggestion Pills */}
                {cart.length > 0 && (
                  <div className="px-4 py-2 bg-black/40 border-t border-white/5 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
                    <button onClick={() => {
                      const msg = "¿Qué postre me recomiendas para terminar?";
                      setChatInput(msg);
                      setChatMessages(prev => [...prev, { role: 'user', content: msg }]);
                      sendToAi(msg, "recomendación postre");
                    }} className="text-[9px] bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-gray-400 hover:text-white transition-colors">
                      🍰 ¿Qué postre me recomiendas?
                    </button>
                    <button onClick={() => {
                      const msg = "¿Qué vino marida mejor con mi comanda?";
                      setChatInput(msg);
                      setChatMessages(prev => [...prev, { role: 'user', content: msg }]);
                      sendToAi(msg, "maridaje vino");
                    }} className="text-[9px] bg-white/5 border border-white/10 rounded-full px-3 py-1.5 text-gray-400 hover:text-white transition-colors">
                      🍷 ¿Qué vino marida mejor?
                    </button>
                  </div>
                )}
                
                {/* Chat Inputs */}
                <div className="p-3 bg-black/40 border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe aquí al camarero..."
                    className="flex-1 rounded-xl px-4 py-2.5 bg-black/60 text-white border border-white/10 focus:outline-none focus:border-white/30 text-xs"
                  />
                  <button onClick={handleSendMessage} disabled={isTyping} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white text-black hover:bg-gray-200 disabled:opacity-50 transition-colors">↗</button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default function CartaPremiumDemo() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="font-serif text-white italic text-xl animate-pulse">Cargando Ecosistema...</div></div>}>
      <CartaContent />
    </Suspense>
  );
}
