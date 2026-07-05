import { NextResponse } from 'next/server';
import { runDailyProspectingCycle } from '@/prospecting-engine/daily-runner';

/**
 * ENDPOINT DE PROSPECCIÓN AUTOMATIZADA
 * Permite ejecutar la ronda diaria de 100 leads mediante un GET/POST o Cron Job de Vercel.
 * Ruta: /api/prospecting/run
 */

export const maxDuration = 60; // Vercel timeout max duration
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const count = parseInt(searchParams.get('count') || '100', 10);
    const minScore = parseInt(searchParams.get('minScore') || '70', 10);

    console.log(`[API Prospecting] Disparando ciclo web con ${count} leads...`);
    const report = await runDailyProspectingCycle(count, minScore);

    return NextResponse.json({
      success: true,
      message: `Ciclo completado. ${report.totalDiscovered} leads evaluados, ${report.topIcpCount} ICPs cualificados.`,
      reportSummary: {
        batchId: report.batchId,
        date: report.date,
        totalDiscovered: report.totalDiscovered,
        totalAnalyzed: report.totalAnalyzed,
        topIcpCount: report.topIcpCount,
        averageLostMargin: report.averageLostMargin,
        executionTimeSeconds: Number((report.executionTimeMs / 1000).toFixed(2))
      },
      topLeadsPreview: report.leads.slice(0, 10).map(l => ({
        name: l.restaurantName,
        city: l.city,
        rating: l.googleRating,
        reviews: l.reviewCount,
        lostMargin: l.estimatedLostMarginMonthly,
        score: l.priorityScore,
        whatsappHook: l.outreachCopy.whatsappHook
      }))
    });
  } catch (error: any) {
    console.error('[API Prospecting] Error ejecutando ciclo:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error interno en agente de prospección' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
