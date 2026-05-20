/**
 * Tipos compartidos para webhooks y analytics
 */
export interface LeadAnalyticsInsert {
  phone: string | null;
  email: string | null;
  source: 'kommo' | 'woztell' | string | null;
  payload: Record<string, unknown> | unknown;
  created_at: string;
}
