import { runDailyProspectingCycle } from './daily-runner';

/**
 * CLI RUNNER - ARCHITECT.SYS HOSPITALITY AI PROSPECTOR
 * Permite ejecutar el ciclo de prospección diaria desde la terminal o cron job.
 * Uso: npx tsx src/prospecting-engine/cli.ts [cantidad_leads] [min_score]
 */

async function main() {
  const args = process.argv.slice(2);
  const count = args[0] ? parseInt(args[0], 10) : 100; // Por defecto 100 leads al día como ordenó Alex
  const minScore = args[1] ? parseInt(args[1], 10) : 70;

  console.log(`==================================================================================`);
  console.log(`🦅 ARCHITECT.SYS - SISTEMA DE AGENTES DE PROSPECCIÓN HUMANIZADA ALTA HOSTELERÍA`);
  console.log(`==================================================================================`);

  try {
    const report = await runDailyProspectingCycle(count, minScore);
    console.log(`✅ ¡Prospección completada exitosamente! ${report.totalDiscovered} leads procesados.`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error fatal en la ejecución del agente de prospección:`, error);
    process.exit(1);
  }
}

main();
