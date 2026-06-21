import React from 'react';

interface PromoTabProps {
  promoGoal: string;
  setPromoGoal: (v: string) => void;
  promoFormat: string;
  setPromoFormat: (v: string) => void;
  isGeneratingPromo: boolean;
  handleGenerateArchitectPromo: () => void;
  generalError: string | null;
  promoData: any;
  generatedImage: string | null;
  setCustomVisualPrompt: (v: string) => void;
  handleGenerateImage: () => void;
  isGeneratingImage: boolean;
  currentSlideIndex: number;
  setCurrentSlideIndex: (v: number) => void;
  carouselImages: Record<number, string>;
  isGeneratingPromoImage: boolean;
  handleGeneratePromoSlideImage: (slideIndex: number, prompt: string) => void;
}

export default function PromoTab({
  promoGoal,
  setPromoGoal,
  promoFormat,
  setPromoFormat,
  isGeneratingPromo,
  handleGenerateArchitectPromo,
  generalError,
  promoData,
  generatedImage,
  setCustomVisualPrompt,
  handleGenerateImage,
  isGeneratingImage,
  currentSlideIndex,
  setCurrentSlideIndex,
  carouselImages,
  isGeneratingPromoImage,
  handleGeneratePromoSlideImage
}: PromoTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-black text-white mb-2">📢 Hub de Auto-Promoción Architect.Sys</h3>
        <p className="text-zinc-400 text-sm">Diseña creativos de alto impacto para promocionar nuestros servicios B2B (Pago Único, Socio Growth, y WhatsApp Closers).</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">1. Objetivo de la Campaña B2B</label>
              <select
                value={promoGoal}
                onChange={(e) => setPromoGoal(e.target.value)}
                className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500 appearance-none"
              >
                <option value="Dolor de Comisiones de Delivery (Captar hosteleros quemados con Glovo/UberEats)">Dolor del Delivery (30% comisión)</option>
                <option value="Up-sell de Eventos Físicos (Convertir hosteleros base a suscripción Socio Growth mediante eventos)">Vender Eventos (Conversión a Growth)</option>
                <option value="Promocionar a Arqui V2 (WhatsApp Sales Closer autónomo que detecta spam y cierra reservas)">Promocionar WhatsApp Bot Closer (Arqui V2)</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">2. Formato del Anuncio</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPromoFormat('static')}
                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                    promoFormat === 'static' ? 'bg-white text-black border-white' : 'bg-black text-zinc-400 border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  Estático (1 Frame)
                </button>
                <button
                  type="button"
                  onClick={() => setPromoFormat('carousel')}
                  className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                    promoFormat === 'carousel' ? 'bg-white text-black border-white' : 'bg-black text-zinc-400 border-zinc-900 hover:border-zinc-800'
                  }`}
                >
                  Carrusel (5 Slides)
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerateArchitectPromo}
            disabled={isGeneratingPromo}
            className="w-full bg-white text-black font-black uppercase text-xs py-4 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2 mt-8"
          >
            {isGeneratingPromo ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                Generando Hub...
              </>
            ) : (
              '⚡ Generar Campaña B2B'
            )}
          </button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {generalError && (
            <div className="bg-red-950/20 border border-red-900 text-red-400 p-4 rounded-2xl text-xs">
              ⚠️ {generalError}
            </div>
          )}

          {promoData ? (
            <div className="space-y-6">
              {promoData.type === 'static' && (
                <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl space-y-6">
                  <div className="space-y-4">
                    <span className="text-[9px] font-black tracking-widest bg-orange-950 px-2 py-1 rounded text-orange-400 uppercase">ANUNCIO ESTÁTICO B2B</span>
                    <div>
                      <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Hook Visual</label>
                      <div className="bg-black rounded-xl border border-zinc-900 p-3 text-white text-sm font-black uppercase">
                        {promoData.hook}
                      </div>
                    </div>
                    <div>
                      <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Copy del Post</label>
                      <div className="bg-black rounded-xl border border-zinc-900 p-3 text-zinc-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                        {promoData.body}
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-zinc-900/60 pt-6 flex flex-col md:flex-row gap-6">
                    <div className="w-[180px] aspect-[4/5] bg-black border border-zinc-900 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                      {generatedImage ? (
                        <img src={generatedImage} alt="Static asset" className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-3xl opacity-30">🖼️</span>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Prompt Recomendado</label>
                        <div className="bg-black border border-zinc-900 rounded-lg p-3 text-zinc-400 text-[10px] font-mono leading-relaxed h-20 overflow-y-auto">
                          {promoData.imagePrompt}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          setCustomVisualPrompt(promoData.imagePrompt);
                          handleGenerateImage();
                        }}
                        disabled={isGeneratingImage}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black text-xs py-3 rounded-xl transition-all mt-4"
                      >
                        {isGeneratingImage ? 'Generando visual...' : 'Pintar con Imagen 4'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {promoData.type === 'carousel' && (
                <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl space-y-6">
                  <div className="flex justify-between items-center border-b border-zinc-900 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-black tracking-widest bg-orange-950 px-2 py-1 rounded text-orange-400 uppercase">CARRUSEL ESTRATÉGICO</span>
                      <span className="text-xs font-bold text-zinc-500">Diapositiva {currentSlideIndex + 1} de {promoData.slides.length}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        disabled={currentSlideIndex === 0}
                        onClick={() => setCurrentSlideIndex(currentSlideIndex - 1)}
                        className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 disabled:opacity-30 text-white px-3 py-1.5 rounded-lg text-xs font-black"
                      >
                        ← Anterior
                      </button>
                      <button
                        disabled={currentSlideIndex === promoData.slides.length - 1}
                        onClick={() => setCurrentSlideIndex(currentSlideIndex + 1)}
                        className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 disabled:opacity-30 text-white px-3 py-1.5 rounded-lg text-xs font-black"
                      >
                        Siguiente →
                      </button>
                    </div>
                  </div>

                  {promoData.slides[currentSlideIndex] && (
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Título Diapositiva (Hook)</label>
                          <div className="bg-black rounded-xl border border-zinc-900 p-3 text-white text-sm font-black uppercase">
                            {promoData.slides[currentSlideIndex].hook}
                          </div>
                        </div>
                        <div>
                          <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Texto Diapositiva (Descripción)</label>
                          <div className="bg-black rounded-xl border border-zinc-900 p-3 text-zinc-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                            {promoData.slides[currentSlideIndex].description}
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-zinc-900 pt-6 flex flex-col md:flex-row gap-6">
                        <div className="w-[180px] aspect-[4/5] bg-black border border-zinc-900 rounded-2xl flex items-center justify-center overflow-hidden shrink-0">
                          {carouselImages[currentSlideIndex] ? (
                            <img src={carouselImages[currentSlideIndex]} alt={`Slide ${currentSlideIndex + 1}`} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-center px-4">
                              {isGeneratingPromoImage ? (
                                <span className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin block mx-auto mb-2"></span>
                              ) : (
                                <span className="text-3xl opacity-30 block mb-2">🖼️</span>
                              )}
                              <span className="text-[8px] font-black uppercase tracking-wider text-zinc-600">Diapo #{currentSlideIndex + 1}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Prompt de Imagen recomendado</label>
                            <div className="bg-black border border-zinc-900 rounded-lg p-3 text-zinc-400 text-[10px] font-mono leading-relaxed h-20 overflow-y-auto">
                              {promoData.slides[currentSlideIndex].imagePrompt}
                            </div>
                          </div>
                          <button
                            onClick={() => handleGeneratePromoSlideImage(currentSlideIndex, promoData.slides[currentSlideIndex].imagePrompt)}
                            disabled={isGeneratingPromoImage}
                            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black text-xs py-3 rounded-xl transition-all mt-4"
                          >
                            {isGeneratingPromoImage ? 'Pintando Diapositiva...' : 'Pintar esta Diapositiva'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="border border-dashed border-zinc-800 rounded-3xl p-16 text-center flex flex-col items-center justify-center bg-zinc-950/20 py-24">
              <span className="text-4xl mb-4">📢</span>
              <h4 className="text-lg font-bold text-white mb-1">Campaña de Auto-Promoción Vacía</h4>
              <p className="text-zinc-500 text-xs max-w-sm mx-auto mb-6">Elige el objetivo del embudo de Architect.Sys en el panel izquierdo y haz clic en Generar Campaña B2B.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
