export interface EventDossier {
  id: string;
  title: string;
  category: string;
  description: string;
  targetAudience: string;
  preparationTime: string;
  clientRole: string[];
  agencyRole: string[];
  deliverables: string[];
  preEventProtocol: string;
  isUnlockedForBase: boolean;
  imagePlaceholder?: string;
}

export interface EventDossier {
  id: string;
  title: string;
  category: string;
  description: string;
  targetAudience: string;
  preparationTime: string;
  clientRole: string[];
  agencyRole: string[];
  deliverables: string[];
  preEventProtocol: string;
  isUnlockedForBase: boolean;
  imagePlaceholder?: string;
}

// Fallback vacío, los datos ahora provienen de Supabase (master_events)
export const eventsLibrary: EventDossier[] = [];
