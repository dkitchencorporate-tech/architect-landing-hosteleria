import { Lead } from '../types';

/**
 * DIAGNOSTIC AGENT (El Auditor Financiero & EBITDA)
 * Evalúa cada restaurante descubierto, calcula su facturación estimada y determina
 * con precisión matemática la fuga de margen mensual que sufren en comisiones y cartas PDF.
 */

export class DiagnosticAgent {
  /**
   * Ejecuta la radiografía financiera y asigna el Score de Prioridad ICP (1 a 100).
   */
  analyzeLeadFinancials(lead: Lead): Lead {
    // 1. Estimación de volumen de comensales mensuales según reseñas de Google y modelo
    const baseCoversMonthly = Math.max(800, lead.reviewCount * 12);
    
    let avgTicket = 35; // Ticket medio por comensal estimado según modelo
    if (lead.businessModel.includes('Alta Gastronomía') || lead.businessModel.includes('Asador')) {
      avgTicket = 60;
    } else if (lead.businessModel.includes('Beach Club') || lead.businessModel.includes('Lounge')) {
      avgTicket = 50;
    } else if (lead.businessModel.includes('Bar') || lead.businessModel.includes('Tapas')) {
      avgTicket = 25;
    }

    const estimatedMonthlyRevenue = baseCoversMonthly * avgTicket;

    // 2. Cálculo de pérdidas por El Tenedor (12% al 15% por reserva de canal de terceros)
    let elTenedorLoss = 0;
    if (lead.usesElTenedor) {
      // Suponemos que un 35% de sus mesas entran por El Tenedor pagando comisión media de 2.5€ a 4€/pax o 13%
      elTenedorLoss = Math.round((estimatedMonthlyRevenue * 0.35) * 0.13);
    }

    // 3. Cálculo de pérdida visual por Carta PDF o falta de upselling algorítmico
    let pdfMenuLoss = 0;
    if (lead.hasPdfMenu) {
      // Un menú PWA visual sube un 20-25% el ticket en vinos, postres y entrantes
      pdfMenuLoss = Math.round(estimatedMonthlyRevenue * 0.08); // 8% de margen perdido directo
    }

    const totalLostMarginMonthly = elTenedorLoss + pdfMenuLoss;

    // 4. Cálculo de Prioridad ICP (0 - 100)
    let score = 50;
    if (lead.googleRating >= 4.2 && lead.googleRating <= 4.8) score += 15; // Buen producto, excelente target
    if (lead.reviewCount > 250) score += 15; // Alto volumen de clientela
    if (lead.usesElTenedor) score += 10; // Dolor financiero directo por comisiones
    if (lead.hasPdfMenu) score += 10; // Dolor visual y operativo
    if (totalLostMarginMonthly > 3000) score += 10; // Gran potencial de ahorro con Architect.Sys

    const priorityScore = Math.min(100, Math.max(10, score));

    // 5. Resumen de Diagnóstico
    const diagnosticSummary = `Fuga total ~${totalLostMarginMonthly.toLocaleString('es-ES')}€/mes (` +
      `${lead.usesElTenedor ? `~${elTenedorLoss}€ en comisiones El Tenedor` : 'Reserva directa'} | ` +
      `${lead.hasPdfMenu ? `~${pdfMenuLoss}€ en pérdida de upselling visual por Carta PDF` : 'Menú digital ok'}). ` +
      `Facturación estimada: ~${estimatedMonthlyRevenue.toLocaleString('es-ES')}€/mes.`;

    return {
      ...lead,
      estimatedLostMarginMonthly: totalLostMarginMonthly,
      priorityScore,
      diagnosticSummary
    };
  }

  /**
   * Procesa un lote de leads para realizar su diagnóstico.
   */
  analyzeBatch(leads: Lead[]): Lead[] {
    return leads.map(l => this.analyzeLeadFinancials(l));
  }
}

export const diagnosticAgent = new DiagnosticAgent();
