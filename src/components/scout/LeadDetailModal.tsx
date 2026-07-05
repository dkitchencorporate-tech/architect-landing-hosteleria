import React, { useState } from 'react';
import { Lead } from '@/prospecting-engine/types';
import { ChannelType, ActionType } from '@/prospecting-engine/agents/ChannelOperatorAgent';
import { X, Copy, Check, MessageSquare, Mail, Share2, ExternalLink, ShieldAlert, Award, Phone, Calendar, TrendingUp } from 'lucide-react';

interface LeadDetailModalProps {
  lead: Lead | null;
  onClose: () => void;
  onLogAction: (leadId: string, channel: ChannelType, action: ActionType, notes?: string) => Promise<void>;
  onStatusChange: (leadId: string, newStatus: string) => Promise<void>;
}

export const LeadDetailModal: React.FC<LeadDetailModalProps> = ({
  lead,
  onClose,
  onLogAction,
  onStatusChange
}) => {
  const [copiedChannel, setCopiedChannel] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'whatsapp' | 'instagram' | 'email' | 'diagnostic'>('whatsapp');
  const [actionNotes, setActionNotes] = useState('');

  if (!lead) return null;

  const handleCopy = async (text: string, channel: ChannelType) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedChannel(channel);
      setTimeout(() => setCopiedChannel(null), 3000);
      await onLogAction(lead.id!, channel, 'hook_copied', 'Alex copió el hook desde la PWA');
    } catch (err) {
      console.error('Error al copiar:', err);
    }
  };

  const handleMarkSent = async (channel: ChannelType) => {
    await onLogAction(lead.id!, channel, 'message_sent', `Alex envió mensaje por ${channel.toUpperCase()}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-zinc-950 border border-zinc-800 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
        
        {/* Cabecera del Modal */}
        <div className="p-6 border-b border-zinc-800 flex items-start justify-between bg-zinc-900/50">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/20 text-orange-400 border border-orange-500/30">
                ICP Score: {lead.priorityScore}/100
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-zinc-800 text-zinc-300">
                {lead.status}
              </span>
              <span className="text-xs text-zinc-400 font-medium">📍 {lead.city}</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-2 flex items-center gap-3">
              {lead.restaurantName}
              {lead.websiteUrl && (
                <a href={lead.websiteUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-orange-400 transition">
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </h2>
            <p className="text-sm text-zinc-400 mt-1 flex items-center gap-4">
              <span>🍽️ {lead.businessModel}</span>
              <span>⭐ {lead.googleRating} ({lead.reviewCount} reseñas)</span>
              <span>📞 <code className="text-orange-300 bg-orange-500/10 px-1.5 py-0.5 rounded">{lead.phone}</code></span>
            </p>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-800 transition">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cuerpo Principal */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Columna Izquierda: Radiografía Financiera EBITDA */}
          <div className="md:col-span-1 space-y-4">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2 mb-3">
                <TrendingUp className="w-4 h-4 text-orange-400" />
                Radiografía EBITDA
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-zinc-400">Facturación Est.:</span>
                  <span className="font-semibold text-white">~{lead.estimatedMonthlyRevenue?.toLocaleString('es-ES')} €/m</span>
                </div>
                <div className="flex justify-between items-center text-sm border-t border-zinc-800/80 pt-2">
                  <span className="text-rose-400 font-medium">Fuga de Margen:</span>
                  <span className="font-black text-rose-400 text-base">~{lead.estimatedLostMarginMonthly.toLocaleString('es-ES')} €/m</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
              <h3 className="text-sm font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2 mb-3">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                Dolores Operativos
              </h3>
              <ul className="space-y-2 text-xs">
                <li className={`flex items-center gap-2 ${lead.hasPdfMenu ? 'text-rose-400 font-semibold' : 'text-emerald-400'}`}>
                  <span>{lead.hasPdfMenu ? '❌' : '✔️'}</span>
                  <span>{lead.hasPdfMenu ? 'Carta PDF (Pierde 40% ventas visuales)' : 'Menú digital interactivo'}</span>
                </li>
                <li className={`flex items-center gap-2 ${lead.usesElTenedor ? 'text-rose-400 font-semibold' : 'text-emerald-400'}`}>
                  <span>{lead.usesElTenedor ? '❌' : '✔️'}</span>
                  <span>{lead.usesElTenedor ? 'Depende de El Tenedor (12-15% com.)' : 'Reserva directa sin comisiones'}</span>
                </li>
                <li className="flex items-center gap-2 text-amber-400 font-medium">
                  <span>⚡</span>
                  <span>Oportunidad de upselling algorítmico</span>
                </li>
              </ul>
              <p className="text-[11px] text-zinc-400 mt-3 border-t border-zinc-800 pt-2 italic">
                "{lead.diagnosticSummary}"
              </p>
            </div>

            {/* Acciones de Estado Rápidas */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-2">
              <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">Cambiar Estado CRM</h3>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => onStatusChange(lead.id!, 'APPROVED')}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-xs font-semibold py-1.5 px-2 rounded-lg border border-emerald-500/30 transition">
                  ✅ Autorizar
                </button>
                <button 
                  onClick={() => onStatusChange(lead.id!, 'REPLIED')}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 text-xs font-semibold py-1.5 px-2 rounded-lg border border-blue-500/30 transition">
                  💬 Respondió
                </button>
                <button 
                  onClick={() => onStatusChange(lead.id!, 'MEETING_BOOKED')}
                  className="bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 text-xs font-semibold py-1.5 px-2 rounded-lg border border-purple-500/30 transition">
                  📅 Reunión
                </button>
                <button 
                  onClick={() => onStatusChange(lead.id!, 'CLOSED_WON')}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-1.5 px-2 rounded-lg shadow-lg transition">
                  🏆 Cerrado Won
                </button>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Armas de Venta & Copywriting Gemini 3 */}
          <div className="md:col-span-2 flex flex-col bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden">
            
            {/* Pestañas de Canales */}
            <div className="flex border-b border-zinc-800 bg-zinc-900">
              <button
                onClick={() => setActiveTab('whatsapp')}
                className={`flex-1 py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition ${
                  activeTab === 'whatsapp' 
                    ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10' 
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}>
                <MessageSquare className="w-4 h-4" />
                WhatsApp Hook (Sin Links)
              </button>
              <button
                onClick={() => setActiveTab('instagram')}
                className={`flex-1 py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition ${
                  activeTab === 'instagram' 
                    ? 'border-pink-500 text-pink-400 bg-pink-500/10' 
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}>
                <Share2 className="w-4 h-4" />
                IG DM / LinkedIn
              </button>
              <button
                onClick={() => setActiveTab('email')}
                className={`flex-1 py-3 px-4 text-xs font-bold flex items-center justify-center gap-2 border-b-2 transition ${
                  activeTab === 'email' 
                    ? 'border-blue-500 text-blue-400 bg-blue-500/10' 
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}>
                <Mail className="w-4 h-4" />
                Email Executive VIP
              </button>
            </div>

            {/* Contenido de la Pestaña */}
            <div className="p-6 flex-1 flex flex-col justify-between">
              {activeTab === 'whatsapp' && (
                <div className="space-y-4">
                  <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4">
                    <p className="text-xs text-emerald-400/90 font-medium mb-2 flex items-center justify-between">
                      <span>⚡ REGLA ANTI-BOT: Diseñado para copiar y pegar manualmente.</span>
                      <span className="font-bold">0 enlaces</span>
                    </p>
                    <p className="text-sm text-zinc-200 font-sans whitespace-pre-wrap leading-relaxed select-all">
                      {lead.outreachCopy?.whatsappHook}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCopy(lead.outreachCopy?.whatsappHook || '', 'whatsapp')}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition">
                      {copiedChannel === 'whatsapp' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {copiedChannel === 'whatsapp' ? '¡Hook Copiado al Portapapeles!' : 'Copiar Hook WhatsApp'}
                    </button>
                    <button
                      onClick={() => handleMarkSent('whatsapp')}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-3 px-4 rounded-xl text-xs transition">
                      Marcar Enviado
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'instagram' && (
                <div className="space-y-4">
                  <div className="bg-pink-950/30 border border-pink-500/30 rounded-xl p-4">
                    <p className="text-xs text-pink-400/90 font-medium mb-2">
                      📲 Ideal para DM en @{lead.instagramHandle || 'Instagram'} o mensaje directo de LinkedIn.
                    </p>
                    <p className="text-sm text-zinc-200 font-sans whitespace-pre-wrap leading-relaxed select-all">
                      {lead.outreachCopy?.instagramHook}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCopy(lead.outreachCopy?.instagramHook || '', 'instagram')}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition">
                      {copiedChannel === 'instagram' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {copiedChannel === 'instagram' ? '¡DM Copiado!' : 'Copiar DM Instagram'}
                    </button>
                    <button
                      onClick={() => handleMarkSent('instagram')}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-3 px-4 rounded-xl text-xs transition">
                      Marcar Enviado
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'email' && (
                <div className="space-y-4">
                  <div className="bg-blue-950/30 border border-blue-500/30 rounded-xl p-4 space-y-3">
                    <div>
                      <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Asunto:</span>
                      <p className="text-sm font-bold text-white select-all mt-0.5">{lead.outreachCopy?.emailSubject}</p>
                    </div>
                    <div className="border-t border-blue-500/20 pt-2">
                      <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Cuerpo:</span>
                      <p className="text-xs text-zinc-300 font-sans whitespace-pre-wrap leading-relaxed select-all mt-1">
                        {lead.outreachCopy?.emailBody}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleCopy(`Asunto: ${lead.outreachCopy?.emailSubject}\n\n${lead.outreachCopy?.emailBody}`, 'email')}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition">
                      {copiedChannel === 'email' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {copiedChannel === 'email' ? '¡Email Copiado!' : 'Copiar Email Completo'}
                    </button>
                    <button
                      onClick={() => handleMarkSent('email')}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-semibold py-3 px-4 rounded-xl text-xs transition">
                      Marcar Enviado
                    </button>
                  </div>
                </div>
              )}

              {/* Registro Rápido de Notas */}
              <div className="mt-4 pt-4 border-t border-zinc-800 flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Añadir nota de seguimiento o respuesta (ej. Llamar el martes a las 11:00)..."
                  value={actionNotes}
                  onChange={(e) => setActionNotes(e.target.value)}
                  className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
                />
                <button
                  onClick={async () => {
                    if (actionNotes.trim()) {
                      await onLogAction(lead.id!, 'phone_call', 'reply_received', actionNotes);
                      setActionNotes('');
                    }
                  }}
                  className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold px-3 py-2 rounded-lg transition">
                  Guardar Nota
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
