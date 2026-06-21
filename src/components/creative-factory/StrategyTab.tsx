import React from 'react';
import ReactMarkdown from 'react-markdown';

interface StrategyTabProps {
  selectedClient: any;
  handleGenerateStrategy: () => void;
  isGeneratingStrategy: boolean;
  strategies: Record<string, string>;
}

export default function StrategyTab({
  selectedClient,
  handleGenerateStrategy,
  isGeneratingStrategy,
  strategies
}: StrategyTabProps) {
  if (!selectedClient) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black text-white mb-2">Plan Comercial de 30 Días</h3>
          <p className="text-zinc-400 text-sm">Plan estratégico de marketing de guerrilla para **{selectedClient.name}**.</p>
        </div>
        <button 
          onClick={handleGenerateStrategy}
          disabled={isGeneratingStrategy}
          className="bg-white hover:bg-zinc-200 text-black font-black text-xs px-5 py-3 rounded-xl transition-colors disabled:opacity-50"
        >
          {isGeneratingStrategy ? 'Trazando Ruta...' : '⚙️ Generar Estrategia IA'}
        </button>
      </div>

      {strategies[selectedClient.id] ? (
        <div className="bg-zinc-950 border border-zinc-900 p-8 rounded-3xl prose prose-invert max-w-none prose-xs leading-relaxed font-mono">
          <ReactMarkdown>{strategies[selectedClient.id]}</ReactMarkdown>
        </div>
      ) : (
        <div className="border border-dashed border-zinc-800 rounded-3xl p-16 text-center flex flex-col items-center justify-center bg-zinc-950/20">
          <span className="text-4xl mb-4">🗺️</span>
          <h4 className="text-lg font-bold text-white mb-1">Sin Hoja de Ruta Activa</h4>
          <p className="text-zinc-500 text-xs max-w-sm mx-auto mb-6">Genera una estrategia comercial a 30 días adaptada al ticket y tipo de cocina del cliente.</p>
          <button 
            onClick={handleGenerateStrategy}
            disabled={isGeneratingStrategy}
            className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold py-2.5 px-5 rounded-xl border border-zinc-800 transition-colors"
          >
            Generar Estrategia Ahora
          </button>
        </div>
      )}
    </div>
  );
}
