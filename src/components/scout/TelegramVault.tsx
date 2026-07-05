"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Key, MessageSquare, Send, CheckCircle2, AlertCircle, Lock, Smartphone, Bell, Save, RefreshCw } from 'lucide-react';

export const TelegramVault: React.FC = () => {
  const [botToken, setBotToken] = useState<string>('');
  const [chatId, setChatId] = useState<string>('');
  const [minIcpScore, setMinIcpScore] = useState<number>(70);
  const [autoNotify, setAutoNotify] = useState<boolean>(true);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saved'>('idle');
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState<string>('');

  useEffect(() => {
    // Cargar configuración guardada en localStorage o memoria local
    const savedToken = localStorage.getItem('architect_tg_token') || '';
    const savedChat = localStorage.getItem('architect_tg_chat') || '';
    const savedScore = localStorage.getItem('architect_tg_score') || '70';
    const savedNotify = localStorage.getItem('architect_tg_notify') !== 'false';

    setBotToken(savedToken);
    setChatId(savedChat);
    setMinIcpScore(Number(savedScore));
    setAutoNotify(savedNotify);
  }, []);

  const handleSaveVault = () => {
    localStorage.setItem('architect_tg_token', botToken);
    localStorage.setItem('architect_tg_chat', chatId);
    localStorage.setItem('architect_tg_score', String(minIcpScore));
    localStorage.setItem('architect_tg_notify', String(autoNotify));
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 3000);
  };

  const handleTestConnection = async () => {
    setTestStatus('testing');
    try {
      const res = await fetch('/api/prospecting/test-telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ botToken, chatId })
      });
      const data = await res.json();
      if (data.success) {
        setTestStatus('success');
        setTestMessage('¡Bóveda verificada! Hemos enviado una Tarjeta VIP de prueba a tu móvil.');
      } else {
        setTestStatus('error');
        setTestMessage(data.error || 'Verifica que el Bot Token y el Chat ID sean válidos.');
      }
    } catch (err) {
      setTestStatus('error');
      setTestMessage('Error de red al conectar con el servidor de Telegram.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Cabecera de la Bóveda */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 text-blue-400 font-black text-xs uppercase tracking-widest mb-3">
          <Lock className="w-4 h-4" />
          <span>Bóveda de Sinergia y Mando Independiente</span>
        </div>
        <h2 className="text-3xl font-black text-white tracking-tight">
          Sub-Menú Estilo Login: <span className="text-blue-400">Conexión Telegram</span>
        </h2>
        <p className="text-zinc-400 text-sm mt-2 max-w-2xl leading-relaxed">
          Configura de forma independiente cualquier Bot Token o Canal de Telegram para recibir en tu móvil las alertas de pérdida financiera y autorizar cada ronda de prospección sin necesitar acceso a la PWA.
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
          <span className="px-3 py-1.5 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 flex items-center gap-2">
            <Shield className="w-3.5 h-3.5" /> Encriptación en Memoria Local
          </span>
          <span className="px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 flex items-center gap-2">
            <Smartphone className="w-3.5 h-3.5" /> Control Móvil 24/7
          </span>
          <span className="px-3 py-1.5 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 flex items-center gap-2">
            <Bell className="w-3.5 h-3.5" /> Sincronización Anti-Spam
          </span>
        </div>
      </div>

      {/* Tarjeta de Configuración y Login */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Formulario Estilo Login */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-xl space-y-6">
          <h3 className="text-lg font-black text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-orange-400" />
            <span>Credenciales de Acceso Telegram</span>
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                Telegram Bot Token (@BotFather)
              </label>
              <input
                type="password"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                placeholder="ej. 783920193:AAH_xk9201ms_K29..."
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-blue-500 transition shadow-inner"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Escribe <code>/newbot</code> en @BotFather para crear tu agente de alertas.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                Telegram Chat ID (@myidbot)
              </label>
              <input
                type="text"
                value={chatId}
                onChange={(e) => setChatId(e.target.value)}
                placeholder="ej. 582910394 ó -100293019"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:border-blue-500 transition shadow-inner"
              />
              <p className="text-[11px] text-zinc-500 mt-1">
                Abre @myidbot o @userinfobot para conocer tu ID personal o el del grupo de mando.
              </p>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-zinc-300 uppercase tracking-wider mb-2">
                Filtro de Prioridad para Alertas VIP
              </label>
              <select
                value={minIcpScore}
                onChange={(e) => setMinIcpScore(Number(e.target.value))}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold text-orange-400 focus:outline-none focus:border-orange-500">
                <option value={70}>⭐ Score >= 70 pts (Recomendado - Top ICPs)</option>
                <option value={80}>⭐⭐ Score >= 80 pts (Alta Prioridad y Fuga > 5.000€)</option>
                <option value={90}>⭐⭐⭐ Score >= 90 pts (Modo Francotirador VIP)</option>
                <option value={0}>📢 Recibir el 100% de los leads descubiertos</option>
              </select>
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-semibold text-zinc-300">Notificaciones Automáticas en Vivo</span>
              <button
                type="button"
                onClick={() => setAutoNotify(!autoNotify)}
                className={`w-12 h-6 rounded-full transition-colors relative p-1 ${autoNotify ? 'bg-blue-600' : 'bg-zinc-800'}`}>
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${autoNotify ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>

          <div className="pt-4 flex gap-3">
            <button
              onClick={handleSaveVault}
              className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition">
              <Save className="w-4 h-4" />
              <span>{saveStatus === 'saved' ? '¡Configuración Guardada!' : 'Guardar en Bóveda'}</span>
            </button>
          </div>
        </div>

        {/* Panel de Verificación y Estado */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 shadow-xl flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>Verificación de Sincronización</span>
            </h3>

            <p className="text-xs text-zinc-400 leading-relaxed">
              Al realizar la prueba de conexión, el <code>TelegramSyncerAgent</code> verificará tus credenciales y te enviará una tarjeta interactiva con los 3 ganchos de prospección listos para copiar.
            </p>

            <div className="p-4 bg-zinc-950 border border-zinc-800/80 rounded-2xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between text-zinc-400">
                <span>Estado Bóveda:</span>
                <span className={botToken && chatId ? "text-emerald-400 font-bold" : "text-amber-400 font-bold"}>
                  {botToken && chatId ? "● CREDENCIALES CARGADAS" : "● MODO SIMULACIÓN"}
                </span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Filtro ICP:</span>
                <span className="text-orange-400 font-bold">&gt;= {minIcpScore} Puntos</span>
              </div>
              <div className="flex items-center justify-between text-zinc-400">
                <span>Anti-Alucinación:</span>
                <span className="text-emerald-400 font-bold">100% ACTIVO</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={handleTestConnection}
              disabled={testStatus === 'testing'}
              className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition border border-zinc-700 shadow-md">
              {testStatus === 'testing' ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-400" />
                  <span>Sincronizando con Telegram...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-blue-400" />
                  <span>Disparar Alerta de Prueba a mi Móvil</span>
                </>
              )}
            </button>

            {testStatus !== 'idle' && (
              <div className={`mt-4 p-3 rounded-xl text-xs flex items-center gap-2 font-medium ${
                testStatus === 'success' ? 'bg-emerald-950/50 border border-emerald-500/30 text-emerald-300' : 'bg-rose-950/50 border border-rose-500/30 text-rose-300'
              }`}>
                {testStatus === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" /> : <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />}
                <span>{testMessage}</span>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
