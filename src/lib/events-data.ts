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

// Fallback vacío: el catálogo de eventos vive en la base de datos.
export const eventsLibrary: EventDossier[] = [];
