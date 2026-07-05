import React, { useState } from 'react';
import { MessageSquare, ShieldCheck, Play, Send, CheckCircle2, AlertCircle } from 'lucide-react';

interface TelegramConfigCardProps {
  onTriggerProspecting: (count: number) => Promise<void>;
  isRunning: boolean;
}

export const TelegramConfigCard: React.FC<TelegramConfigCardProps> = ({ onTriggerProspecting, isRunning }) => {
  const [leadsCount, setLeadsCount] = useState<number>(100);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState<string>('');

  const handleTestTelegram = async () => {
    setTestStatus('testing');
    try {
      const res = await fetch('/api/prospecting/test-telegram', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setTestStatus('success');
        setTestMessage('¡Conexión verificada! Te hemos enviado un mensaje de prueba a tu móvil.');
      } else {
        setTestStatus('error');
        setTestMessage(data.error || 'Asegúrate de haber configurado TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID en .env.local');
      }
    } catch (err: any) {
      setTestStatus('error');
      setTestMessage('Error de red al conectar con el servidor.');
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Tarjeta 1: Control de Disparo Agresivo */}
      <div className="bg-gradient-to-br from-orange-950/40 via-zinc-900 to-zinc-950 border border-orange-500/40 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-orange-400 font-bold text-xs uppercase tracking-wider mb-2">
            <Play className="w-4 h-4 fill-current" />
            <span>Disparador de Prospección Agresiva</span>
          </div>
          <h3 className="text-xl font-black text-white">Lanzar Ronda IA (Gemini 3 Pro)</h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Escanea y audita restaurantes en tiempo real, filtra duplicados en Supabase y redacta los 3 ganchos de prospección consultiva.
          </p>
          
          <div className="mt-4 flex items-center gap-3">
            <label className="text-xs text-zinc-300 font-semibold">Leads a auditar:</label>
            <select
              value={leadsCount}
              onChange={(e) => setLeadsCount(Number(e.target.value))}
              className="bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs font-bold text-orange-400 focus:outline-none focus:border-orange-500">
              <option value={20}>20 Leads (Prueba Rápida)</option>
              <option value={50}>50 Leads (Media Tanda)</option>
              <option value={100}>100 Leads (Objetivo Diario Alex)</option>
              <option value={200}>200 Leads (Modo Depredador Máximo)</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => onTriggerProspecting(leadsCount)}
          disabled={isRunning}
          className={`w-full mt-6 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition ${
            isRunning 
              ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
              : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/20 hover:scale-[1.02]'
          }`}>
          {isRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Ejecutando Agentes en Segundo Plano...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>INICIAR RONDA DE PROSPECCIÓN ({leadsCount} LEADS)</span>
            </>
          )}
        </button>
      </div>

      {/* Tarjeta 2: Sinergia y Autorización por Telegram */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-blue-400 font-bold text-xs uppercase tracking-wider mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>Sinergia de Mando en Tiempo Real</span>
          </div>
          <h3 className="text-xl font-black text-white">Canal Directo Telegram</h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            Recibe en tu móvil las Tarjetas VIP y reportes de pérdida financiera. Ningún agente contacta sin tu autorización en la PWA o Telegram.
          </p>

          <div className="mt-4 p-3 bg-zinc-950 border border-zinc-800/80 rounded-xl space-y-1.5 text-[11px] text-zinc-400 font-mono">
            <div className="flex items-center justify-between">
              <span>Status Bot:</span>
              <span className="text-emerald-400 font-bold">● ACTIVO EN .ENV.LOCAL</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Regla Anti-Ban:</span>
              <span className="text-orange-400 font-bold">100% WhatsApp Manual</span>
            </div>
          </div>
        </div>

        <div>
          <button
            onClick={handleTestTelegram}
            disabled={testStatus === 'testing'}
            className="w-full mt-6 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition border border-zinc-700">
            <Send className="w-3.5 h-3.5 text-blue-400" />
            <span>Probar Conexión con mi Móvil (Telegram)</span>
          </button>
          {testStatus !== 'idle' && (
            <p className={`text-[11px] mt-2 flex items-center gap-1.5 font-medium ${testStatus === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
              {testStatus === 'success' ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertCircle className="w-3.5 h-3.5" />}
              <span>{testMessage}</span>
            </p>
          )}
        </div>
      </div>

      {/* Tarjeta 3: Escudo Anti-Duplicados y PWA */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Escudo Supabase & Instalación PWA</span>
          </div>
          <h3 className="text-xl font-black text-white">Garantía Anti-Colisión</h3>
          <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
            El <code>ScoutAgent</code> verifica cada teléfono y dominio contra la base de datos de Supabase. Jamás molestaremos dos veces a un restaurante.
          </p>

          <div className="mt-4 p-3 bg-zinc-950 border border-zinc-800/80 rounded-xl text-xs space-y-2 text-zinc-300">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✔️</span>
              <span>Instalable en iPhone, Android y Mac/PC.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✔️</span>
              <span>Cero monolitos: 5 cerebros LLM independientes.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✔️</span>
              <span>Objetivo de Facturación: 5 clientes High-Ticket/mes.</span>
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <span className="text-[11px] text-zinc-500 font-semibold uppercase tracking-wider">
            ⚡ Ecosistema Architect.Sys Hostelería
          </span>
        </div>
      </div>
    </div>
  );
};
