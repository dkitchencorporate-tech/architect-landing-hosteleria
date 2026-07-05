import { scoutAgent } from './agents/ScoutAgent';
import { diagnosticAgent } from './agents/DiagnosticAgent';
import { predatorCopyAgent } from './agents/PredatorCopyAgent';
import { telegramSyncerAgent } from './agents/TelegramSyncerAgent';
import { discoverAndAnalyzeLeads } from './lead-scanner';
import { ProspectingBatchReport, Lead } from './types';
import { v4 as uuidv4 } from 'uuid';

/**
 * ARCHITECT.SYS PROSPECTING ORCHESTRATOR
 * Orquestador central modular que coordina los 5 agentes especializados LLM (cero monolitos).
 */

export async function runAgenticProspectingCycle(
  totalLeadsToScan: number = 100,
  topIcpThreshold: number = 70,
  maxTelegramCards: number = 10
): Promise<ProspectingBatchReport> {
  const startTime = Date.now();
  console.log(`\n==================================================================================`);
  console.log(`🦅 ARCHITECT.SYS SCOUT ORCHESTRATOR - INICIANDO RONDA MODULAR CON GEMINI 3 PRO`);
  console.log(`==================================================================================`);

  // 1. DESCUBRIMIENTO Y AUDITORÍA INICIAL (Scout & Scanner)
  const rawLeads = await discoverAndAnalyzeLeads(totalLeadsToScan);
  console.log(`🕵️ [ScoutAgent] ${rawLeads.length} leads brutos escaneados.`);

  // 2. FILTRADO ANTI-DUPLICIDAD (ScoutAgent vs Supabase)
  const uniqueLeads: Lead[] = [];
  for (const lead of rawLeads) {
    const isDup = await scoutAgent.isDuplicate(lead.phone, lead.websiteUrl);
    if (!isDup) {
      uniqueLeads.push(lead);
    }
  }
  console.log(`🛡️ [ScoutAgent] ${uniqueLeads.length} leads nuevos únicos confirmados (${rawLeads.length - uniqueLeads.length} duplicados bloqueados).`);

  // 3. AUDITORÍA FINANCIERA EBITDA & FUGA DE MARGEN (DiagnosticAgent)
  const auditedLeads = diagnosticAgent.analyzeBatch(uniqueLeads);
  console.log(`🔬 [DiagnosticAgent] Radiografía financiera EBITDA calculada con éxito.`);

  // 4. FILTRADO DE TOP ICPs (Prioridad para cobro High-Ticket)
  const topIcpLeads = auditedLeads.filter(l => l.priorityScore >= topIcpThreshold);
  const leadsForCopy = topIcpLeads.length > 0 ? topIcpLeads.slice(0, 30) : auditedLeads.slice(0, 20);
  console.log(`🎯 [DiagnosticAgent] ${topIcpLeads.length} prospectos calificados como TOP ICP (Score >= ${topIcpThreshold}).`);

  // 5. COPYWRITING CONSULTIVO HIGH-TICKET (PredatorCopyAgent - Gemini 3 Pro)
  console.log(`✍️ [PredatorCopyAgent] Redactando ganchos consultivos con Gemini 3 para ${leadsForCopy.length} leads prioritarios...`);
  const copiedLeads = await predatorCopyAgent.generateBatch(leadsForCopy);

  // Sincronizar copys en lista general
  for (const copied of copiedLeads) {
    const idx = auditedLeads.findIndex(l => l.id === copied.id);
    if (idx !== -1) auditedLeads[idx] = copied;
  }

  // 6. PERSISTENCIA EN BASE DE DATOS (Supabase)
  console.log(`💾 [ScoutAgent] Guardando tanda en Supabase para control en el Command Center PWA...`);
  await scoutAgent.saveProspectsToDb(auditedLeads);

  // 7. CÁLCULO DE MÉTRICAS DEL REPORTE
  const totalLostMargin = auditedLeads.reduce((acc, l) => acc + (l.estimatedLostMarginMonthly || 0), 0);
  const averageLostMargin = auditedLeads.length > 0 ? Math.round(totalLostMargin / auditedLeads.length) : 0;
  const executionTimeMs = Date.now() - startTime;

  const report: ProspectingBatchReport = {
    batchId: uuidv4(),
    date: new Date().toISOString(),
    totalDiscovered: auditedLeads.length,
    totalAnalyzed: copiedLeads.length,
    topIcpCount: topIcpLeads.length,
    averageLostMargin,
    leads: auditedLeads,
    executionTimeMs
  };

  // 8. NOTIFICACIÓN Y SOLICITUD DE AUTORIZACIÓN A ALEX (TelegramSyncerAgent)
  console.log(`💬 [TelegramSyncerAgent] Enviando reporte y solicitud de autorización a Telegram...`);
  await telegramSyncerAgent.sendBatchApprovalRequest(report);

  const previewCards = copiedLeads.slice(0, maxTelegramCards);
  for (const lead of previewCards) {
    await telegramSyncerAgent.sendLeadCard(lead);
    await new Promise(r => setTimeout(r, 250)); // Pequeña pausa anti-spam en Telegram
  }

  console.log(`🏁 [Architect.Sys Scout Orchestrator] Ronda completada en ${(executionTimeMs / 1000).toFixed(2)}s.\n`);
  return report;
}
