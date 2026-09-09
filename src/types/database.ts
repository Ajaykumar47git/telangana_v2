// =============================================================================
// SANGHATELANGANA — SUPABASE DATABASE TYPE DEFINITIONS
// =============================================================================

export type UserRole = 'visitor' | 'contributor' | 'researcher' | 'curator' | 'admin';

export interface DbUser {
  id: string;
  name: string;
  email: string;
  avatar_url?: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface DbHeritageSite {
  id: string;
  name: string;
  slug: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  period: string;
  site_type: string;
  description: string;
  historical_summary: string;
  archaeological_status: string;
  opening_hours: string;
  facilities: string[];
  accessibility: string;
  featured: boolean;
  image_url?: string | null;
  source_reference?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbArtifact {
  id: string;
  site_id: string;
  name: string;
  slug: string;
  type: string;
  period: string;
  material: string;
  description: string;
  provenance: string;
  image_url: string;
  verification_status: string;
  accession_number?: string | null;
  dimensions?: string | null;
  current_location?: string | null;
  source_reference?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbInscription {
  id: string;
  site_id: string;
  title: string;
  image_url: string;
  ocr_text?: string | null;
  transcription: string;
  translation: string;
  language: string;
  estimated_date: string;
  confidence_score: number;
  verification_status: string;
  reviewer_id?: string | null;
  source_reference?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbVirtualTour {
  id: string;
  site_id: string;
  title: string;
  panorama_url: string;
  description: string;
  duration?: string;
  created_at: string;
}

export interface DbTourStop {
  id: string;
  tour_id: string;
  name: string;
  description: string;
  latitude?: number | null;
  longitude?: number | null;
  audio_url?: string | null;
  hotspot_position: { x: number; y: number } | Record<string, any>;
}

export interface DbEvent {
  id: string;
  site_id?: string | null;
  name: string;
  description: string;
  start_date: string;
  end_date?: string | null;
  location: string;
  verification_status: string;
  created_at: string;
}

export interface DbContribution {
  id: string;
  user_id: string;
  site_id?: string | null;
  title: string;
  description: string;
  category?: string;
  contribution_type?: string;
  file_url?: string | null;
  image_url?: string | null;
  source?: string | null;
  status: 'pending' | 'approved' | 'rejected';
  reviewer_id?: string | null;
  reviewer_notes?: string | null;
  created_at: string;
  updated_at: string;
}

export interface DbFavorite {
  id: string;
  user_id: string;
  entity_type: 'site' | 'artifact' | 'itinerary' | 'inscription' | 'tour';
  entity_id: string;
  created_at: string;
}

export interface DbArchiveVersion {
  id: string;
  entity_type: string;
  entity_id: string;
  version_number: number;
  previous_data?: Record<string, any> | null;
  new_data?: Record<string, any>;
  changes?: Record<string, any>;
  changed_by?: string | null;
  updated_by?: string | null;
  change_summary?: string;
  created_at: string;
}

// Storage bucket names
export type StorageBucket =
  | 'site_photos'
  | 'site-images'
  | 'artifact_images'
  | 'artifact-images'
  | 'inscription_images'
  | 'inscription-images'
  | 'manuscripts'
  | 'audio_guides'
  | 'audio'
  | 'panoramas'
  | 'models_3d'
  | '3d-models'
  | 'contributions'
  | 'avatars';
