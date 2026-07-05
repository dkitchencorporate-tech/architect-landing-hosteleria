export type LeadStatus = 
  | 'DISCOVERED' 
  | 'ANALYZED' 
  | 'TELEGRAM_SENT' 
  | 'PENDING_APPROVAL'
  | 'APPROVED'
  | 'CONTACTED' 
  | 'WHATSAPP_SENT'
  | 'EMAIL_SENT'
  | 'IG_DM_SENT'
  | 'REPLIED'
  | 'MEETING_BOOKED' 
  | 'CLOSED_WON'
  | 'REJECTED';

export type BusinessModelType = 
  | 'Alta Cocina / Gourmet'
  | 'Restaurante Tradicional / Asador'
  | 'Bar / Tapas / Gastrobar'
  | 'Beach Club / Lounge / Terraza'
  | 'Comida Rápida / Burger / Pizzería'
  | 'Grupo Hostélero / Multi-local';

export interface Lead {
  id: string;
  restaurantName: string;
  city: string;
  address?: string;
  phone: string;
  email?: string;
  websiteUrl?: string;
  instagramHandle?: string;
  businessModel: BusinessModelType;
  googleRating: number;
  reviewCount: number;
  hasPdfMenu: boolean;
  usesElTenedor: boolean;
  hasOnlineOrdering: boolean;
  estimatedMonthlyRevenue: number; // e.g., 45000
  estimatedLostMarginMonthly: number; // e.g., 1800 (commissions + lack of upselling)
  priorityScore: number; // 1 to 100
  status: LeadStatus;
  diagnosticSummary: string;
  outreachCopy: {
    whatsappHook: string;
    instagramHook: string;
    emailSubject: string;
    emailBody: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ProspectingBatchReport {
  batchId: string;
  date: string;
  totalDiscovered: number;
  totalAnalyzed: number;
  topIcpCount: number;
  averageLostMargin: number;
  leads: Lead[];
  executionTimeMs: number;
}

export interface TelegramNotificationConfig {
  botToken: string;
  chatId: string;
  enabled: boolean;
  notifyOnlyTopIcp?: boolean; // If true, only sends priorityScore >= 80 to avoid spamming
  minPriorityScore?: number;
}
