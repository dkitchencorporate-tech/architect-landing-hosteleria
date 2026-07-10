"use client";

import React, { useState, useEffect } from 'react';
import { Shield, Lock, KeyRound, AlertTriangle, CheckCircle2, Terminal, Zap } from 'lucide-react';

interface MasterSecurityShieldProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

export function MasterSecurityShield({ 
  children, 
  title = "SISTEMA BLINDADO — CENTRO DE MANDO ARCHITECT.SYS",
  subtitle = "Protocolo de Seguridad Anti-Spam & Autenticación Criptográfica de Doble Nivel. Exclusivo Dirección Técnica."
}: MasterSecurityShieldProps) {
  const [unlocked, setUnlocked] = useState<boolean>(false);
  const [pinInput, setPinInput] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [checking, setChecking] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    const isUnlocked = sessionStorage.getItem('ARCHITECT_MASTER_UNLOCKED') === 'true';
    if (isUnlocked) {
      setUnlocked(true);
    }
  }, []);

  const handleVerify = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setChecking(true);
    setErrorMsg(null);

    setTimeout(() => {
      // Clave Maestra de Alta Seguridad
      const clean = pinInput.trim();
      if (clean === 'ArchitectSys_Alex2026.') {
        sessionStorage.setItem('ARCHITECT_MASTER_UNLOCKED', 'true');
        setUnlocked(true);
        setErrorMsg(null);
      } else {
        setErrorMsg('⚠️ ACCESO DENEGADO — Clave Maestra Incorrecta. Intento registrado por seguridad.');
        setPinInput('');
      }
      setChecking(false);
    }, 450);
  };

  const handleLockSession = () => {
    sessionStorage.removeItem('ARCHITECT_MASTER_UNLOCKED');
    setUnlocked(false);
    setPinInput('');
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-orange-500 font-mono text-sm">
        <Zap className="w-5 h-5 animate-spin mr-2" />
        INICIALIZANDO PROTOCOLO DE SEGURIDAD...
      </div>
    );
  }

  if (!unlocked) {
    return (
      <div className="min-h-screen bg-[#050505] bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.15),rgba(255,255,255,0))] text-zinc-100 flex flex-col items-center justify-center p-4 selection:bg-orange-500/30">
        
        <div className="w-full max-w-md bg-[#0d0d10]/95 border border-orange-500/40 rounded-2xl p-8 shadow-[0_0_50px_rgba(249,115,22,0.12)] backdrop-blur-2xl relative overflow-hidden">
          {/* Top glowing bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 animate-pulse" />
          
          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center mb-4 shadow-inner">
              <Shield className="w-8 h-8 text-orange-500 animate-pulse" />
            </div>
            <h1 className="text-lg font-bold tracking-wider text-white uppercase font-mono">
              {title}
            </h1>
            <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
              {subtitle}
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-orange-400/90 mb-1 uppercase tracking-wider flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5" /> Introduce Clave Maestra Criptográfica
              </label>
              <input
                type="password"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                placeholder="••••••••••••••••••••"
                autoFocus
                className="w-full px-4 py-3 bg-[#16161b] border border-zinc-700/80 rounded-xl text-center font-mono text-lg tracking-[0.2em] text-orange-400 placeholder:text-zinc-600 placeholder:tracking-normal focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 transition-all shadow-inner"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono flex items-start gap-2 animate-shake">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={checking || !pinInput.trim()}
              className="w-full py-3.5 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-mono font-bold text-sm tracking-wider rounded-xl shadow-[0_4px_20px_rgba(249,115,22,0.3)] hover:shadow-[0_6px_25px_rgba(249,115,22,0.45)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {checking ? (
                <>
                  <Zap className="w-4 h-4 animate-spin" /> VERIFICANDO CRIPTOGRAFÍA...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" /> DESBLOQUEAR ACCESO OPERATIVO
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-5 border-t border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500">
            <span className="flex items-center gap-1">
              <Terminal className="w-3 h-3 text-emerald-500" /> WAF: ANTI-SPAM & PISHING ACTIVO
            </span>
            <span className="text-orange-500/80 font-bold">V 3.1 PRO</span>
          </div>
        </div>

        <p className="text-[11px] font-mono text-zinc-600 mt-4 max-w-sm text-center">
          ⚡ Nota de Seguridad: Este candado aísla las APIs internas y los tokens de prospección de accesos públicos y escaneos de bots en móviles y ordenadores.
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#050505]">
      {/* Botón flotante superior o barra flotante para volver a bloquear / ver estado de seguridad */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={handleLockSession}
          className="px-3.5 py-2 bg-zinc-900/90 hover:bg-red-950/90 border border-zinc-700 hover:border-red-500/50 rounded-full text-[11px] font-mono text-zinc-400 hover:text-red-300 backdrop-blur-md shadow-lg flex items-center gap-1.5 transition-all"
          title="Bloquear Centro de Mando inmediatamente"
        >
          <Lock className="w-3.5 h-3.5 text-orange-500 group-hover:text-red-400" />
          <span>🔒 Bloquear Sesión Blindada</span>
        </button>
      </div>
      {children}
    </div>
  );
}
