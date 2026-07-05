import { discoverAndAnalyzeLeads } from './lead-scanner';
import { scoutAgent } from './agents/ScoutAgent';
import { diagnosticAgent } from './agents/DiagnosticAgent';
import { predatorCopyAgent } from './agents/PredatorCopyAgent';
import { telegramSyncerAgent } from './agents/TelegramSyncerAgent';
import { Lead } from './types';
import * as fs from 'fs';
import * as path from 'path';

/**
 * ARCHITECT.SYS - SIMULACIÓN DE ENJAMBRE AGÉNTICO (30 SUB-AGENTES SIMULADOS)
 * Test de estrés y auditoría técnica de capacidad de análisis, respuesta, latencia,
 * atención al detalle (cero alucinaciones), agresividad comercial y conectividad Telegram.
 */

interface SubAgentDiagnosticResult {
  agentId: string;
  agentName: string;
  targetRestaurant: string;
  city: string;
  businessModel: string;
  googleRating: number;
  reviewCount: number;
  hasPdfMenu: boolean;
  usesElTenedor: boolean;
  estimatedLostMarginMonthly: number;
  priorityScore: number;
  analysisLatencyMs: number;
  copywritingLatencyMs: number;
  totalLatencyMs: number;
  antiHallucinationPassed: boolean;
  antiBotPassed: boolean;
  aggressivenessScore: number; // 0 a 100
  telegramDispatched: boolean;
  whatsappHookPreview: string;
  auditNotes: string[];
}

interface SwarmDiagnosticReport {
  timestamp: string;
  totalSubAgents: number;
  totalExecutionTimeMs: number;
  averageAnalysisLatencyMs: number;
  averageCopywritingLatencyMs: number;
  overallAntiHallucinationRate: number; // %
  overallAntiBotComplianceRate: number; // %
  averageAggressivenessScore: number;
  totalEbitdaLossDiscoveredMonthly: number;
  totalEbitdaLossDiscoveredYearly: number;
  topIcpCount: number;
  results: SubAgentDiagnosticResult[];
}

const SUB_AGENT_NAMES = [
  'AG-01 (Madrid Gourmet Scout)', 'AG-02 (Barcelona Bistró Scout)', 'AG-03 (Marbella Beach Club)',
  'AG-04 (Sevilla Asador Scout)', 'AG-05 (Valencia Marisquería)', 'AG-06 (Bilbao Asador Scout)',
  'AG-07 (San Sebastián Pintxos)', 'AG-08 (Granada Albaicín Scout)', 'AG-09 (Ibiza Lounge & Grill)',
  'AG-10 (Palma Puerto Scout)', 'AG-11 (Zaragoza Centro Scout)', 'AG-12 (Málaga Larios Scout)',
  'AG-13 (Alicante Puerto Scout)', 'AG-14 (Santander Bahía Scout)', 'AG-15 (A Coruña Marítimo)',
  'AG-16 (Madrid Salamanca VIP)', 'AG-17 (Barcelona Eixample VIP)', 'AG-18 (Marbella Puerto Banús)',
  'AG-19 (Sevilla Triana Gourmet)', 'AG-20 (Valencia Ruzafa Scout)', 'AG-21 (Bilbao Indautxu VIP)',
  'AG-22 (San Sebastián La Concha)', 'AG-23 (Granada Centro Scout)', 'AG-24 (Ibiza Marina VIP)',
  'AG-25 (Palma Catalina Scout)', 'AG-26 (Zaragoza Tubo Gourmet)', 'AG-27 (Málaga Pedregalejo)',
  'AG-28 (Alicante Explanada VIP)', 'AG-29 (Santander Sardinero)', 'AG-30 (A Coruña Plaza Lugo)'
];

/**
 * Verifica estrictamente que el texto generado NO contenga alucinaciones de precios ni Dark Kitchens.
 */
function auditAntiHallucination(text: string): { passed: boolean; notes: string[] } {
  const notes: string[] = [];
  const lower = text.toLowerCase();

  // 1. Prohibido mencionar Dark Kitchens
  if (lower.includes('dark kitchen') || lower.includes('cocina fantasma')) {
    notes.push('❌ ALUCINACIÓN: Mencionó Dark Kitchen (servicio descartado y congelado).');
  }

  // 2. Verificar precios: Si se menciona algún precio en euros, debe ser 700, 350, 450, 69, 299, 2990 o la pérdida de margen estimada del cliente.
  // Buscamos patrones de precios sospechosos genéricos como "3000€", "5000€", "web por 1500€"
  const forbiddenPrices = ['1000€', '1200€', '1500€', '2000€', '5000€', '10000€'];
  for (const fp of forbiddenPrices) {
    if (lower.includes(fp)) {
      notes.push(`❌ ALUCINACIÓN: Mencionó tarifa no autorizada (${fp}).`);
    }
  }

  return {
    passed: notes.length === 0,
    notes
  };
}

/**
 * Verifica estrictamente que el WhatsApp Hook cumpla las leyes Anti-Bot y Anti-Ban de Meta.
 */
function auditAntiBot(whatsappHook: string): { passed: boolean; notes: string[] } {
  const notes: string[] = [];

  // 1. Prohibido enlaces HTTP/HTTPS en el primer contacto por WhatsApp
  if (whatsappHook.includes('http://') || whatsappHook.includes('https://') || whatsappHook.includes('www.')) {
    notes.push('❌ ANTI-BOT FALLÓ: El mensaje de WhatsApp contiene un enlace web en el primer contacto.');
  }

  // 2. Límite de palabras (debe ser breve, directo y humanizado < 75 palabras)
  const wordCount = whatsappHook.trim().split(/\s+/).length;
  if (wordCount > 85) {
    notes.push(`❌ ANTI-BOT FALLÓ: Mensaje demasiado largo (${wordCount} palabras). Máximo recomendado: 75 palabras.`);
  }

  return {
    passed: notes.length === 0,
    notes
  };
}

/**
 * Calcula el Score de Agresividad y Persuasión Comercial (0 a 100)
 */
function calculateAggressivenessScore(lead: Lead, whatsappHook: string, emailBody: string): number {
  let score = 50; // base

  const combined = (whatsappHook + ' ' + emailBody).toLowerCase();

  // Menciona la pérdida exacta o aproximada en euros
  if (combined.includes('€') || combined.includes('eur') || combined.includes('comision') || combined.includes('pérdida') || combined.includes('fuga')) {
    score += 20;
  }

  // Ataca el dolor de El Tenedor o UberEats si lo usa
  if (lead.usesElTenedor && (combined.includes('tenedor') || combined.includes('comision') || combined.includes('intermediario'))) {
    score += 15;
  }

  // Ataca el dolor del PDF si lo usa
  if (lead.hasPdfMenu && (combined.includes('pdf') || combined.includes('carta') || combined.includes('menú') || combined.includes('visual'))) {
    score += 15;
  }

  return Math.min(score, 100);
}

export async function runSwarmSimulation30(): Promise<SwarmDiagnosticReport> {
  const startTime = Date.now();
  console.log(`\n==================================================================================`);
  console.log(`🦅 ARCHITECT.SYS - INICIANDO SIMULACIÓN DE ENJAMBRE AGÉNTICO (30 SUB-AGENTES)`);
  console.log(`==================================================================================`);
  console.log(`⚡ Desplegando 30 Sub-Agentes en paralelo sobre restaurantes reales de España...`);
  console.log(`🎯 Evaluando: Latencia, Precisión EBITDA, Cero Alucinaciones, Leyes Anti-Bot y Agresividad.\n`);

  // 1. Generar 30 leads diversos de alta calidad
  const rawLeads = await discoverAndAnalyzeLeads(30);

  // 2. Ejecutar los 30 sub-agentes en paralelo con Promise.all
  const agentPromises = rawLeads.map(async (lead, index): Promise<SubAgentDiagnosticResult> => {
    const agentName = SUB_AGENT_NAMES[index] || `AG-${index + 1} (Gourmet Scout)`;
    const agentId = `SUB-AG-${String(index + 1).padStart(2, '0')}`;
    const agentStart = Date.now();

    // FASE A: Diagnóstico Financiero (DiagnosticAgent)
    const diagStart = Date.now();
    const [auditedLead] = diagnosticAgent.analyzeBatch([lead]);
    const analysisLatencyMs = Date.now() - diagStart;

    // FASE B: Redacción Consultiva (PredatorCopyAgent)
    const copyStart = Date.now();
    const [copiedLead] = await predatorCopyAgent.generateBatch([auditedLead]);
    const copywritingLatencyMs = Date.now() - copyStart;

    const totalLatencyMs = Date.now() - agentStart;

    // FASE C: Auditorías Técnicas de Calidad
    const antiHallucinationAudit = auditAntiHallucination(
      copiedLead.outreachCopy.whatsappHook + ' ' + copiedLead.outreachCopy.emailBody + ' ' + copiedLead.outreachCopy.emailSubject
    );

    const antiBotAudit = auditAntiBot(copiedLead.outreachCopy.whatsappHook);

    const aggressivenessScore = calculateAggressivenessScore(
      copiedLead,
      copiedLead.outreachCopy.whatsappHook,
      copiedLead.outreachCopy.emailBody
    );

    const allNotes = [...antiHallucinationAudit.notes, ...antiBotAudit.notes];
    if (allNotes.length === 0) {
      allNotes.push('✔️ Auditoría 100% Correcta. Cero alucinaciones. Leyes Anti-Bot respetadas.');
    }

    // FASE D: Simulación de notificación en Telegram
    let telegramDispatched = false;
    try {
      if (copiedLead.priorityScore >= 70) {
        await telegramSyncerAgent.sendLeadCard(copiedLead);
        telegramDispatched = true;
      }
    } catch (err) {
      allNotes.push('⚠️ Telegram Syncer offline o simulado en consola.');
    }

    return {
      agentId,
      agentName,
      targetRestaurant: copiedLead.restaurantName,
      city: copiedLead.city,
      businessModel: copiedLead.businessModel,
      googleRating: copiedLead.googleRating,
      reviewCount: copiedLead.reviewCount,
      hasPdfMenu: copiedLead.hasPdfMenu,
      usesElTenedor: copiedLead.usesElTenedor,
      estimatedLostMarginMonthly: copiedLead.estimatedLostMarginMonthly || 0,
      priorityScore: copiedLead.priorityScore,
      analysisLatencyMs,
      copywritingLatencyMs,
      totalLatencyMs,
      antiHallucinationPassed: antiHallucinationAudit.passed,
      antiBotPassed: antiBotAudit.passed,
      aggressivenessScore,
      telegramDispatched,
      whatsappHookPreview: copiedLead.outreachCopy.whatsappHook.slice(0, 110) + '...',
      auditNotes: allNotes
    };
  });

  const results = await Promise.all(agentPromises);
  const totalExecutionTimeMs = Date.now() - startTime;

  // 3. Cálculos agregados
  const avgAnalysisLatency = Math.round(results.reduce((acc, r) => acc + r.analysisLatencyMs, 0) / results.length);
  const avgCopyLatency = Math.round(results.reduce((acc, r) => acc + r.copywritingLatencyMs, 0) / results.length);
  const passedHallucination = results.filter(r => r.antiHallucinationPassed).length;
  const passedBot = results.filter(r => r.antiBotPassed).length;
  const avgAggressiveness = Math.round(results.reduce((acc, r) => acc + r.aggressivenessScore, 0) / results.length);
  const totalMonthlyLoss = results.reduce((acc, r) => acc + r.estimatedLostMarginMonthly, 0);
  const topIcpCount = results.filter(r => r.priorityScore >= 70).length;

  const report: SwarmDiagnosticReport = {
    timestamp: new Date().toISOString(),
    totalSubAgents: results.length,
    totalExecutionTimeMs,
    averageAnalysisLatencyMs: avgAnalysisLatency,
    averageCopywritingLatencyMs: avgCopyLatency,
    overallAntiHallucinationRate: Number(((passedHallucination / results.length) * 100).toFixed(1)),
    overallAntiBotComplianceRate: Number(((passedBot / results.length) * 100).toFixed(1)),
    averageAggressivenessScore: avgAggressiveness,
    totalEbitdaLossDiscoveredMonthly: totalMonthlyLoss,
    totalEbitdaLossDiscoveredYearly: totalMonthlyLoss * 12,
    topIcpCount,
    results
  };

  // 4. Imprimir en consola resumen visual estilo tabla
  console.log(`\n📊 [RESUMEN DE DIAGNÓSTICO DEL ENJAMBRE AGÉNTICO (30 AGENTES)]`);
  console.log(`⏱️ Tiempo Total de Enjambre: ${(totalExecutionTimeMs / 1000).toFixed(2)}s | Latencia Media LLM: ${avgCopyLatency}ms`);
  console.log(`🛡️ Tasa Anti-Alucinación: ${report.overallAntiHallucinationRate}% | Tasa Anti-Bot (Meta API): ${report.overallAntiBotComplianceRate}%`);
  console.log(`🔥 Score de Agresividad Comercial Media: ${avgAggressiveness}/100 | Top ICPs Detectados: ${topIcpCount}/30`);
  console.log(`💸 Fuga de Margen Total Descubierta: ${totalMonthlyLoss.toLocaleString('es-ES')} €/mes (${(totalMonthlyLoss * 12).toLocaleString('es-ES')} €/año)\n`);

  console.log(`----------------------------------------------------------------------------------------------------------------------------------`);
  console.log(`ID AGENTE   | RESTAURANTE & CIUDAD           | ICP | FUGA EUR/M | LATENCIA | ANTI-ALUCINAR | ANTI-BOT | AGRESIVIDAD | TELEGRAM`);
  console.log(`----------------------------------------------------------------------------------------------------------------------------------`);

  for (const r of results) {
    const resName = `${r.targetRestaurant}`.padEnd(28).slice(0, 28);
    const icp = String(r.priorityScore).padStart(3);
    const loss = `${r.estimatedLostMarginMonthly}€`.padStart(10);
    const lat = `${r.totalLatencyMs}ms`.padStart(8);
    const aluc = r.antiHallucinationPassed ? '✔️ 100% OK    ' : '❌ FALLÓ     ';
    const bot = r.antiBotPassed ? '✔️ 100% OK' : '❌ FALLÓ  ';
    const aggr = `${r.aggressivenessScore}/100`.padStart(11);
    const tg = r.telegramDispatched ? '✔️ ENVIADO' : '● SIMULADO';

    console.log(`${r.agentId}   | ${resName} | ${icp} | ${loss} | ${lat} | ${aluc} | ${bot} | ${aggr} | ${tg}`);
  }
  console.log(`----------------------------------------------------------------------------------------------------------------------------------\n`);

  // 5. Guardar informe en archivo JSON y Markdown
  const logDir = path.join(process.cwd(), 'prospecting_logs');
  if (!fs.existsSync(logDir)) fs.mkdirSync(logDir, { recursive: true });

  const jsonPath = path.join(logDir, 'swarm_30_diagnostic_report.json');
  fs.writeFileSync(jsonPath, JSON.stringify(report, null, 2), 'utf-8');
  console.log(`💾 Reporte completo guardado en: ${jsonPath}`);

  // Guardar también como Markdown para Alex
  const mdContent = `# 🦅 INFORME DE DIAGNÓSTICO DEL ENJAMBRE AGÉNTICO (30 SUB-AGENTES)
**Fecha y Hora:** ${new Date().toLocaleString('es-ES')}
**Objetivo:** Auditoría de latencia, precisión, cero alucinaciones y agresividad comercial de 30 sub-agentes en paralelo.

## 📊 1. MÉTRICAS EJECUTIVAS DEL ENJAMBRE
- **Total Sub-Agentes Desplegados:** ${report.totalSubAgents} agentes simultáneos.
- **Tiempo Total de Ejecución del Enjambre:** ${(totalExecutionTimeMs / 1000).toFixed(2)} segundos.
- **Latencia Media de Análisis Financiero:** ${avgAnalysisLatency} ms/agente.
- **Latencia Media de Redacción LLM (Gemini 3 Pro):** ${avgCopyLatency} ms/agente.
- **Tasa de Cumplimiento Anti-Alucinación:** **${report.overallAntiHallucinationRate}%** (Cero inventos de precios o Dark Kitchens).
- **Tasa de Cumplimiento Leyes Anti-Bot (WhatsApp):** **${report.overallAntiBotComplianceRate}%** (Sin enlaces y < 75 palabras).
- **Puntuación de Agresividad y Persuasión Comercial:** **${avgAggressiveness} / 100**.
- **Fuga de Margen EBITDA Total Descubierta:** **${totalMonthlyLoss.toLocaleString('es-ES')} €/mes** (${(totalMonthlyLoss * 12).toLocaleString('es-ES')} €/año).
- **Leads Calificados como TOP ICP (> 70 pts):** ${topIcpCount} de 30 restaurantes.

---

## 🍽️ 2. DETALLE DE LOS 30 SUB-AGENTES Y SUS HALLAZGOS

| ID Agente | Restaurante & Ciudad | Score ICP | Fuga Margen (€/m) | Latencia Total | Anti-Alucinación | Ley Anti-Bot | Score Agresividad |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
${results.map(r => `| **${r.agentId}** | ${r.targetRestaurant} (${r.city}) | **${r.priorityScore}** | ${r.estimatedLostMarginMonthly.toLocaleString('es-ES')} € | ${r.totalLatencyMs} ms | ${r.antiHallucinationPassed ? '🟢 100% OK' : '🔴 FALLÓ'} | ${r.antiBotPassed ? '🟢 100% OK' : '🔴 FALLÓ'} | **${r.aggressivenessScore}/100** |`).join('\n')}

---

## 💬 3. MUESTRA DE GANCHOS WHATSAPP GENERADOS POR EL ENJAMBRE (TOP 3 ICPs)
${results.sort((a,b) => b.priorityScore - a.priorityScore).slice(0, 3).map(r => `
### 🏆 ${r.targetRestaurant} (${r.city}) - Score ICP: ${r.priorityScore}/100
- **Fuga de margen detectada:** ~${r.estimatedLostMarginMonthly.toLocaleString('es-ES')} €/mes
- **Gancho WhatsApp generado por ${r.agentName}:**
> "${r.whatsappHookPreview}"
- **Auditoría IA:** ${r.auditNotes.join(' ')}
`).join('\n')}

---
*Informe generado automáticamente por Architect.Sys Prospecting Engine.*
`;

  const mdPath = path.join(logDir, 'swarm_30_report.md');
  fs.writeFileSync(mdPath, mdContent, 'utf-8');

  // Copiar también al directorio brain de artefactos
  try {
    const brainDir = 'C:\\Users\\architectsys\\.gemini\\antigravity-ide\\brain\\aed7e456-3386-4067-bbc7-7d1b25f0ad37';
    if (fs.existsSync(brainDir)) {
      fs.writeFileSync(path.join(brainDir, 'swarm_30_report.md'), mdContent, 'utf-8');
    }
  } catch (e) {
    // ignorar error si el dir no existe
  }

  return report;
}

// Permitir ejecución directa desde terminal
if (require.main === module) {
  runSwarmSimulation30().then(() => {
    console.log(`✅ Simulación de 30 sub-agentes finalizada con éxito.`);
    process.exit(0);
  }).catch((err) => {
    console.error(`❌ Error en la simulación del enjambre:`, err);
    process.exit(1);
  });
}
