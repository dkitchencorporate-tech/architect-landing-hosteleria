'use client';

import React, { createContext, useContext, useState } from 'react';

interface AlertContextType {
  showAlert: (message: string) => void;
  showConfirm: (message: string, onConfirm: () => void) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) throw new Error('useAlert must be used within an AlertProvider');
  return context;
};

export const AlertProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    message: string;
    type: 'alert' | 'confirm';
    onConfirm?: () => void;
  }>({ isOpen: false, message: '', type: 'alert' });

  const showAlert = (message: string) => {
    setModalState({ isOpen: true, message, type: 'alert' });
  };

  const showConfirm = (message: string, onConfirm: () => void) => {
    setModalState({ isOpen: true, message, type: 'confirm', onConfirm });
  };

  const close = () => setModalState(prev => ({ ...prev, isOpen: false }));

  return (
    <AlertContext.Provider value={{ showAlert, showConfirm }}>
      {children}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] w-full max-w-sm overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] zoom-in-95 animate-in duration-200">
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {modalState.type === 'alert' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
              </div>
              <h3 className="text-xl font-black text-white mb-2">Aviso del Sistema</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-medium">
                {modalState.message}
              </p>
            </div>
            <div className="flex border-t border-white/10 bg-white/5 p-4 gap-3">
              {modalState.type === 'confirm' && (
                <button 
                  onClick={close}
                  className="flex-1 py-3 text-zinc-400 font-bold hover:text-white hover:bg-white/10 rounded-xl transition-colors border border-transparent hover:border-white/10"
                >
                  Cancelar
                </button>
              )}
              <button 
                onClick={() => {
                  if (modalState.type === 'confirm' && modalState.onConfirm) {
                    modalState.onConfirm();
                  }
                  close();
                }}
                className="flex-1 py-3 font-black text-white bg-orange-600 hover:bg-orange-500 rounded-xl shadow-[0_0_15px_rgba(234,88,12,0.3)] transition-all"
              >
                {modalState.type === 'alert' ? 'Entendido' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AlertContext.Provider>
  );
};
