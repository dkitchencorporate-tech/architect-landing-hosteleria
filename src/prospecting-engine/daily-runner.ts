import { runAgenticProspectingCycle } from './orchestrator';
import { ProspectingBatchReport } from './types';

/**
 * DAILY PROSPECTING ORCHESTRATOR (Bridge hacia el nuevo orquestador modular multi-agente)
 */

export async function runDailyProspectingCycle(
  totalLeadsToScan: number = 100,
  topIcpThreshold: number = 70,
  maxTelegramCards: number = 15
): Promise<ProspectingBatchReport> {
  return await runAgenticProspectingCycle(totalLeadsToScan, topIcpThreshold, maxTelegramCards);
}

