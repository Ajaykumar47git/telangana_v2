-- =============================================================================
-- SANGHATELANGANA — SUPABASE POSTGRESQL SCHEMA (STAGE 2)
-- Digital Heritage Platform for Telangana's Buddhist Heritage
-- =============================================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 1. USER ROLES ENUM
-- -----------------------------------------------------------------------------
CREATE TYPE user_role AS ENUM (
  'visitor',
  'contributor',
  'researcher',
  'curator',
  'admin'
);

-- -----------------------------------------------------------------------------
-- 2. USERS TABLE (Linked to Supabase Auth)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  role user_role NOT NULL DEFAULT 'visitor',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on email & role
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

-- -----------------------------------------------------------------------------
-- 3. HERITAGE SITES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.heritage_sites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  district TEXT NOT NULL,
  state TEXT NOT NULL DEFAULT 'Telangana',
  latitude NUMERIC(10, 7) NOT NULL,
  longitude NUMERIC(10, 7) NOT NULL,
  period TEXT NOT NULL,
  site_type TEXT NOT NULL,
  description TEXT NOT NULL,
  historical_summary TEXT NOT NULL,
  archaeological_status TEXT NOT NULL DEFAULT 'Archaeologically Verified',
  opening_hours TEXT DEFAULT '09:00 AM – 05:00 PM',
  facilities TEXT[] DEFAULT ARRAY['Visitor Centre', 'Signage'],
  accessibility TEXT DEFAULT 'Partially Accessible',
  featured BOOLEAN NOT NULL DEFAULT false,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sites_slug ON public.heritage_sites(slug);
CREATE INDEX IF NOT EXISTS idx_sites_district ON public.heritage_sites(district);
CREATE INDEX IF NOT EXISTS idx_sites_featured ON public.heritage_sites(featured);

-- -----------------------------------------------------------------------------
-- 4. ARTIFACTS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.artifacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES public.heritage_sites(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL,
  period TEXT NOT NULL,
  material TEXT NOT NULL,
  description TEXT NOT NULL,
  provenance TEXT NOT NULL,
  image_url TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'Archaeologically Verified',
  accession_number TEXT,
  dimensions TEXT,
  current_location TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_artifacts_site ON public.artifacts(site_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_type ON public.artifacts(type);
CREATE INDEX IF NOT EXISTS idx_artifacts_period ON public.artifacts(period);

-- -----------------------------------------------------------------------------
-- 5. INSCRIPTIONS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.inscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES public.heritage_sites(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  ocr_text TEXT,
  transcription TEXT NOT NULL,
  translation TEXT NOT NULL,
  language TEXT NOT NULL DEFAULT 'Prakrit in Brahmi Script',
  estimated_date TEXT NOT NULL,
  confidence_score NUMERIC(4, 2) DEFAULT 0.95,
  verification_status TEXT NOT NULL DEFAULT 'Archaeologically Verified',
  reviewer_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inscriptions_site ON public.inscriptions(site_id);

-- -----------------------------------------------------------------------------
-- 6. VIRTUAL TOURS & TOUR STOPS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.virtual_tours (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID NOT NULL REFERENCES public.heritage_sites(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  panorama_url TEXT NOT NULL,
  description TEXT NOT NULL,
  duration TEXT DEFAULT '20 mins',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_virtual_tours_site ON public.virtual_tours(site_id);

CREATE TABLE IF NOT EXISTS public.tour_stops (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tour_id UUID NOT NULL REFERENCES public.virtual_tours(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  latitude NUMERIC(10, 7),
  longitude NUMERIC(10, 7),
  audio_url TEXT,
  hotspot_position JSONB NOT NULL DEFAULT '{"x": 50, "y": 50}'::jsonb
);

CREATE INDEX IF NOT EXISTS idx_tour_stops_tour ON public.tour_stops(tour_id);

-- -----------------------------------------------------------------------------
-- 7. EVENTS (CULTURAL CALENDAR)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  site_id UUID REFERENCES public.heritage_sites(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  location TEXT NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'Verified',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_site ON public.events(site_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON public.events(start_date);

-- -----------------------------------------------------------------------------
-- 8. CONTRIBUTIONS (CITIZEN ARCHAEOLOGY)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contributions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  site_id UUID REFERENCES public.heritage_sites(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL, -- e.g. 'Photos', 'Damage Report', 'Correction'
  file_url TEXT,
  source TEXT,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  reviewer_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  reviewer_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contributions_user ON public.contributions(user_id);
CREATE INDEX IF NOT EXISTS idx_contributions_site ON public.contributions(site_id);
CREATE INDEX IF NOT EXISTS idx_contributions_status ON public.contributions(status);

-- -----------------------------------------------------------------------------
-- 9. FAVORITES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL, -- 'site', 'artifact', 'itinerary'
  entity_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, entity_type, entity_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);

-- -----------------------------------------------------------------------------
-- 10. ARCHIVE VERSIONS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.archive_versions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL, -- 'site', 'artifact', 'inscription'
  entity_id TEXT NOT NULL,
  version_number INT NOT NULL DEFAULT 1,
  previous_data JSONB,
  new_data JSONB NOT NULL,
  changed_by UUID REFERENCES public.users(id) ON DELETE SET NULL,
  change_summary TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_archive_versions_entity ON public.archive_versions(entity_type, entity_id);

-- -----------------------------------------------------------------------------
-- 11. ROW LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.heritage_sites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.artifacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.virtual_tours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tour_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contributions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.archive_versions ENABLE ROW LEVEL SECURITY;

-- Helper function: Check if current user is admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function: Check if current user is curator or admin
CREATE OR REPLACE FUNCTION public.is_curator_or_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role IN ('curator', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function: Check if current user is researcher, curator, or admin
CREATE OR REPLACE FUNCTION public.is_researcher_or_above()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role IN ('researcher', 'curator', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- USERS POLICIES
CREATE POLICY "Public can view basic user profiles"
  ON public.users FOR SELECT
  USING (true);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can manage all users"
  ON public.users FOR ALL
  USING (public.is_admin());

-- PUBLIC CONTENT POLICIES (Read-only for all, write for curator/admin)
CREATE POLICY "Anyone can read heritage sites"
  ON public.heritage_sites FOR SELECT USING (true);

CREATE POLICY "Curators and Admins can modify heritage sites"
  ON public.heritage_sites FOR ALL USING (public.is_curator_or_admin());

CREATE POLICY "Anyone can read artifacts"
  ON public.artifacts FOR SELECT USING (true);

CREATE POLICY "Curators and Admins can modify artifacts"
  ON public.artifacts FOR ALL USING (public.is_curator_or_admin());

CREATE POLICY "Anyone can read inscriptions"
  ON public.inscriptions FOR SELECT USING (true);

CREATE POLICY "Curators and Admins can modify inscriptions"
  ON public.inscriptions FOR ALL USING (public.is_curator_or_admin());

CREATE POLICY "Anyone can read virtual tours and stops"
  ON public.virtual_tours FOR SELECT USING (true);

CREATE POLICY "Curators and Admins can modify virtual tours"
  ON public.virtual_tours FOR ALL USING (public.is_curator_or_admin());

CREATE POLICY "Anyone can read tour stops"
  ON public.tour_stops FOR SELECT USING (true);

CREATE POLICY "Curators and Admins can modify tour stops"
  ON public.tour_stops FOR ALL USING (public.is_curator_or_admin());

CREATE POLICY "Anyone can read events"
  ON public.events FOR SELECT USING (true);

CREATE POLICY "Curators and Admins can modify events"
  ON public.events FOR ALL USING (public.is_curator_or_admin());

-- CONTRIBUTIONS POLICIES
CREATE POLICY "Users can view their own contributions"
  ON public.contributions FOR SELECT
  USING (auth.uid() = user_id OR public.is_curator_or_admin());

CREATE POLICY "Anyone can view approved contributions"
  ON public.contributions FOR SELECT
  USING (status = 'approved');

CREATE POLICY "Authenticated users can submit contributions"
  ON public.contributions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pending contributions"
  ON public.contributions FOR UPDATE
  USING (auth.uid() = user_id AND status = 'pending')
  WITH CHECK (auth.uid() = user_id AND status = 'pending');

CREATE POLICY "Curators and Admins can review all contributions"
  ON public.contributions FOR ALL
  USING (public.is_curator_or_admin());

-- FAVORITES POLICIES
CREATE POLICY "Users can manage their own favorites"
  ON public.favorites FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ARCHIVE VERSIONS POLICIES
CREATE POLICY "Researchers, Curators, and Admins can view archive versions"
  ON public.archive_versions FOR SELECT
  USING (public.is_researcher_or_above());

CREATE POLICY "Curators and Admins can insert archive versions"
  ON public.archive_versions FOR INSERT
  WITH CHECK (public.is_curator_or_admin());

-- -----------------------------------------------------------------------------
-- 12. STORAGE BUCKETS CONFIGURATION (Supabase Storage)
-- -----------------------------------------------------------------------------
-- Insert 8 required buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('site-images', 'site-images', true),
  ('artifact-images', 'artifact-images', true),
  ('inscription-images', 'inscription-images', true),
  ('manuscripts', 'manuscripts', false),
  ('audio', 'audio', true),
  ('panoramas', 'panoramas', true),
  ('3d-models', '3d-models', true),
  ('contributions', 'contributions', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS
CREATE POLICY "Public Read Access for Public Media Buckets"
  ON storage.objects FOR SELECT
  USING (bucket_id IN ('site-images', 'artifact-images', 'inscription-images', 'audio', 'panoramas', '3d-models', 'contributions'));

CREATE POLICY "Authenticated Users Upload Contributions"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'contributions' AND auth.role() = 'authenticated');

CREATE POLICY "Curators and Admins Full Storage Access"
  ON storage.objects FOR ALL
  USING (public.is_curator_or_admin());
