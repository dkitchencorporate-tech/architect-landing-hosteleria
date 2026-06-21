import React from 'react';

interface GeneratorTabProps {
  selectedPain: string;
  setSelectedPain: (v: string) => void;
  selectedAngle: string;
  setSelectedAngle: (v: string) => void;
  selectedClient: any;
  isGeneratingCopy: boolean;
  handleGenerateCopy: () => void;
  generalError: string | null;
  copyData: any;
  customVisualPrompt: string;
  setCustomVisualPrompt: (v: string) => void;
  generatedImage: string | null;
  isGeneratingImage: boolean;
  billingError: string | null;
  handleGenerateImage: () => void;
  handleAddToMatrix: () => void;
  targetDishId: string;
  setTargetDishId: (v: string) => void;
  handleSaveAndAssign: () => void;
  isSavingImage: boolean;
  saveMessage: string | null;
}

export default function GeneratorTab({
  selectedPain,
  setSelectedPain,
  selectedAngle,
  setSelectedAngle,
  selectedClient,
  isGeneratingCopy,
  handleGenerateCopy,
  generalError,
  copyData,
  customVisualPrompt,
  setCustomVisualPrompt,
  generatedImage,
  isGeneratingImage,
  billingError,
  handleGenerateImage,
  handleAddToMatrix,
  targetDishId,
  setTargetDishId,
  handleSaveAndAssign,
  isSavingImage,
  saveMessage,
}: GeneratorTabProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-black text-white mb-2">Motor Generativo de Neuromarketing</h3>
        <p className="text-zinc-400 text-sm">Define el dolor del hostelero. La IA adaptará los textos y prompts visuales al estilo de cocina y ticket del restaurante activo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6 bg-zinc-950 border border-zinc-900 p-6 rounded-3xl flex flex-col justify-between">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">1. Seleccionar Dolor</label>
              <select 
                value={selectedPain} 
                onChange={(e) => setSelectedPain(e.target.value)} 
                className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500 appearance-none"
              >
                <option value="">Selecciona...</option>
                <option value="Las comisiones abusivas del 30% de las apps de delivery se comen todo el margen de beneficio.">Delivery ahoga márgenes (30%)</option>
                <option value="El comedor del restaurante se queda completamente vacío de martes a jueves por la noche.">Local vacío a mitad de semana</option>
                <option value="El teléfono de reservas colapsa en horas punta, perdiendo llamadas y reservas de grupos.">Caos telefónico e ineficiencia de reservas</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">2. Ángulo Publicitario</label>
              <select 
                value={selectedAngle}
                onChange={(e) => setSelectedAngle(e.target.value)}
                className="w-full bg-black border border-zinc-900 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-orange-500 appearance-none"
              >
                <option value="">Selecciona...</option>
                <option value="El sangrado financiero silencioso: Demuestra con números agresivos la cantidad de dinero que pierden al mes.">El Sangrado Financiero (Agresivo)</option>
                <option value="Estatus y Modernización: Posiciona el restaurante como parte del 5% tecnológico superior de la ciudad.">El Restaurante del Futuro (Estatus)</option>
                <option value="El variable sin riesgo: Garantía del 20% solo por resultados de afluencia conseguidos.">Modelo 20% Variable (Garantía)</option>
              </select>
            </div>
          </div>

          <button 
            onClick={handleGenerateCopy}
            disabled={isGeneratingCopy || !selectedPain || !selectedAngle || !selectedClient}
            className="w-full bg-white text-black font-black uppercase text-xs py-4 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-8"
          >
            {isGeneratingCopy ? (
              <>
                <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                Generando...
              </>
            ) : (
              '⚙️ Fabricar Creativo'
            )}
          </button>
        </div>

        <div className="lg:col-span-2 space-y-6">
          {generalError && (
            <div className="bg-red-950/20 border border-red-900 text-red-400 p-4 rounded-2xl text-xs">
              ⚠️ {generalError}
            </div>
          )}

          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl relative">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
              <span>📝</span> Anuncio Estructurado
            </h4>

            {copyData ? (
              <div className="space-y-4">
                <div>
                  <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Gancho en Imagen (Hook)</label>
                  <div className="w-full bg-black rounded-xl border border-zinc-900 p-3 text-white text-sm font-black uppercase tracking-tight">
                    {copyData.hook}
                  </div>
                </div>
                <div>
                  <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Cuerpo del Post (Primary Text)</label>
                  <div className="w-full bg-black rounded-xl border border-zinc-900 p-3 text-zinc-300 text-xs font-mono whitespace-pre-wrap leading-relaxed">
                    {copyData.primaryText}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-zinc-600 text-xs font-mono py-6 text-center">
                {isGeneratingCopy ? 'IA escribiendo copy adaptado...' : 'Selecciona los parámetros y clica en Fabricar Creativo.'}
              </div>
            )}
          </div>

          <div className="bg-zinc-950 border border-zinc-900 p-6 rounded-3xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
              <span>🎨</span> Visual Asset (Google Imagen 4)
            </h4>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-[200px] aspect-[4/5] bg-black border border-zinc-900 rounded-2xl flex items-center justify-center text-zinc-600 relative overflow-hidden shrink-0">
                {generatedImage ? (
                  <img src={generatedImage} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    {isGeneratingImage ? (
                      <>
                        <span className="w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></span>
                        <span className="text-[9px] text-zinc-500 font-bold uppercase">Pintando...</span>
                      </>
                    ) : (
                      <>
                        <span className="text-3xl opacity-40">🖼️</span>
                        <span className="text-[9px] font-bold uppercase text-zinc-700">Sin Imagen</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Prompt de Imagen editable</label>
                  <textarea
                    value={customVisualPrompt}
                    onChange={(e) => setCustomVisualPrompt(e.target.value)}
                    disabled={!copyData}
                    className="w-full h-24 bg-black rounded-xl border border-zinc-900 p-3 text-zinc-300 text-xs font-mono focus:outline-none resize-none leading-relaxed"
                    placeholder="Prompt visual en inglés..."
                  />
                </div>

                {billingError && (
                  <div className="bg-orange-950/20 border border-orange-900 text-orange-400 p-3.5 rounded-xl text-[11px] leading-relaxed">
                    <strong>Facturación requerida:</strong> {billingError}
                  </div>
                )}

                <div className="space-y-2">
                  <button 
                    onClick={handleGenerateImage}
                    disabled={isGeneratingImage || !copyData}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black text-xs py-3 rounded-xl disabled:opacity-50 transition-colors"
                  >
                    {isGeneratingImage ? 'Generando imagen...' : 'Generar Imagen con IA'}
                  </button>
                  
                  <button 
                    onClick={handleAddToMatrix}
                    disabled={!generatedImage || !copyData}
                    className="w-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold text-xs py-3 rounded-xl border border-zinc-900/60 disabled:opacity-50 transition-colors"
                  >
                    Aprobar y Añadir a Matriz de Ads
                  </button>
                </div>
              </div>
            </div>

            {/* Vinculador dinámico */}
            {generatedImage && selectedClient && (
              <div className="mt-6 border-t border-zinc-900 pt-6 space-y-4">
                <h5 className="text-xs font-black uppercase text-orange-500">Asignar a especialidad de la carta</h5>
                <div className="flex flex-col sm:flex-row gap-4 items-end bg-black/50 p-4 rounded-2xl border border-zinc-900">
                  <div className="flex-1">
                    <label className="text-[9px] text-zinc-600 font-bold uppercase block mb-1">Elegir Plato del Cliente</label>
                    <select 
                      value={targetDishId} 
                      onChange={(e) => setTargetDishId(e.target.value)}
                      className="w-full bg-black border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white"
                    >
                      {selectedClient.dishes.map((dish: any) => (
                        <option key={dish.id} value={dish.id}>{dish.name}</option>
                      ))}
                    </select>
                  </div>
                  <button 
                    onClick={handleSaveAndAssign}
                    disabled={isSavingImage}
                    className="bg-white hover:bg-zinc-200 text-black font-black text-xs px-6 py-2.5 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSavingImage ? 'Guardando...' : 'Vincular a Carta'}
                  </button>
                </div>
                {saveMessage && (
                  <div className="bg-green-950/20 border border-green-900 text-green-400 p-4 rounded-xl text-xs">
                    {saveMessage}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
