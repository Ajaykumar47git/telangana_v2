export interface HeritageSite {
  id: string;
  slug: string;
  name: string;
  nameTelugu: string;
  district: string;
  period: string;
  century: string;
  shortDescription: string;
  overview: string;
  historicalInformation: string;
  image: string;
  gallery: string[];
  coordinates: {
    lat: number;
    lng: number;
    xPercent: number; // For interactive SVG/Canvas map positioning
    yPercent: number;
  };
  keyStructures: {
    name: string;
    description: string;
    type: string;
  }[];
  timeline: {
    era: string;
    event: string;
    details: string;
  }[];
  artifactsCount: number;
  featured: boolean;
  elevation?: string;
  nearestTown?: string;
  visitingHours?: string;
  entryFee?: string;
}

export interface Artifact {
  id: string;
  name: string;
  nameTelugu?: string;
  siteId: string;
  siteName: string;
  district: string;
  category: 'Inscriptions' | 'Sculptures' | 'Coins' | 'Pottery' | 'Architecture' | 'Manuscripts';
  period: string;
  material: string;
  image: string;
  dimensions?: string;
  provenance: string;
  accessionNumber: string;
  verificationStatus: 'Archaeologically Verified' | 'ASI Catalogued' | 'Under Scholarly Review' | 'Illustrative Reconstruction';
  isIllustrative?: boolean;
  description: string;
  historicalContext: string;
  historicalInterpretation?: string;
  inscriptionDetails?: {
    originalScript: string;
    transliteration: string;
    translation: string;
    significance: string;
  };
  sources: string[];
  currentLocation: string;
  languageOrScript?: string;
  source_reference?: string;
}

export interface VirtualTour {
  id: string;
  siteId: string;
  siteSlug: string;
  siteName: string;
  title: string;
  district: string;
  period: string;
  image: string;
  panoramaUrl?: string;
  duration: string;
  hotspotsCount: number;
  featured: boolean;
  description: string;
  highlights: string[];
  status: 'Available' | '360° Experience Coming Soon' | 'In Photogrammetry';
}

export interface AudioStory {
  id: string;
  title: string;
  siteName: string;
  duration: string;
  narrator: string;
  languages: ('English' | 'Telugu' | 'Hindi')[];
  description: string;
  audioMockUrl: string;
  coverImage: string;
}

export interface CulturalEvent {
  id: string;
  title: string;
  siteName: string;
  siteSlug: string;
  district: string;
  date: string;
  time: string;
  category: 'Archaeological Symposium' | 'Heritage Walk' | 'Buddha Purnima' | 'Lecture Series' | 'Scholarly Workshop';
  description: string;
  speakers?: string;
  location: string;
  isRegistered?: boolean;
}

export interface ItineraryStop {
  day: number;
  siteName: string;
  siteSlug: string;
  district: string;
  activity: string;
  highlight: string;
  timeEstimate: string;
  travelNote: string;
}

export interface ItineraryPlan {
  id: string;
  title: string;
  days: number;
  interests: string[];
  travelStyle: string;
  startingLocation: string;
  overview: string;
  stops: ItineraryStop[];
  recommendedSeason: string;
  transportAdvice: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  suggestedQuestions?: string[];
  sources?: {
    title: string;
    siteSlug?: string;
    type: 'Site' | 'Artifact' | 'Scholar Paper' | 'ASI Inscription';
  }[];
}

export type SupportedLanguage = 'en' | 'te' | 'hi';
