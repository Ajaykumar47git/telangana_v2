import { createClient, SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js';
import {
  DbUser,
  DbHeritageSite,
  DbArtifact,
  DbInscription,
  DbVirtualTour,
  DbTourStop,
  DbEvent,
  DbContribution,
  DbFavorite,
  DbArchiveVersion,
  StorageBucket,
  UserRole
} from '../types/database';
import {
  SEED_USERS,
  SEED_HERITAGE_SITES,
  SEED_ARTIFACTS,
  SEED_INSCRIPTIONS,
  SEED_VIRTUAL_TOURS,
  SEED_TOUR_STOPS,
  SEED_EVENTS,
  SEED_CONTRIBUTIONS,
  SEED_FAVORITES,
  SEED_ARCHIVE_VERSIONS
} from '../data/seedData';

// -----------------------------------------------------------------------------
// SUPABASE CLIENT INITIALIZATION
// -----------------------------------------------------------------------------
const envObj = (typeof import.meta !== 'undefined' && (import.meta as any).env) || {};
const supabaseUrl = envObj.VITE_SUPABASE_URL || '';
const supabaseAnonKey = envObj.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl.startsWith('http') &&
  !supabaseUrl.includes('placeholder') &&
  !supabaseUrl.includes('your-project-id') &&
  !supabaseUrl.includes('example.com') &&
  !supabaseAnonKey.includes('your-anon-key')
);

// Fallback dummy client if credentials are not configured yet
export const supabase: SupabaseClient = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : createClient('https://mock-sangha-telangana.supabase.co', 'mock-anon-key', {
      auth: {
        persistSession: false
      }
    });

// -----------------------------------------------------------------------------
// LOCAL STATE STORAGE ENGINE (FOR CLIENT-SIDE SANDBOX & FALLBACK)
// -----------------------------------------------------------------------------
const STORAGE_KEYS = {
  USERS: 'sangha_users_db',
  SITES: 'sangha_sites_db',
  ARTIFACTS: 'sangha_artifacts_db',
  INSCRIPTIONS: 'sangha_inscriptions_db',
  TOURS: 'sangha_tours_db',
  TOUR_STOPS: 'sangha_tour_stops_db',
  EVENTS: 'sangha_events_db',
  CONTRIBUTIONS: 'sangha_contributions_db',
  FAVORITES: 'sangha_favorites_db',
  VERSIONS: 'sangha_versions_db',
  SESSION_USER: 'sangha_active_user'
};

function getLocalData<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    return fallback;
  }
}

function setLocalData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Failed to persist ${key} in local sandbox:`, err);
  }
}

// Initialize sandbox tables
export function initSandboxData() {
  getLocalData(STORAGE_KEYS.USERS, SEED_USERS);
  getLocalData(STORAGE_KEYS.SITES, SEED_HERITAGE_SITES);
  getLocalData(STORAGE_KEYS.ARTIFACTS, SEED_ARTIFACTS);
  getLocalData(STORAGE_KEYS.INSCRIPTIONS, SEED_INSCRIPTIONS);
  getLocalData(STORAGE_KEYS.TOURS, SEED_VIRTUAL_TOURS);
  getLocalData(STORAGE_KEYS.TOUR_STOPS, SEED_TOUR_STOPS);
  getLocalData(STORAGE_KEYS.EVENTS, SEED_EVENTS);
  getLocalData(STORAGE_KEYS.CONTRIBUTIONS, SEED_CONTRIBUTIONS);
  getLocalData(STORAGE_KEYS.FAVORITES, SEED_FAVORITES);
  getLocalData(STORAGE_KEYS.VERSIONS, SEED_ARCHIVE_VERSIONS);
}

// Run init on module load
if (typeof window !== 'undefined') {
  initSandboxData();
}

// -----------------------------------------------------------------------------
// DATABASE SERVICE LAYER (AUTO-DISPATCHES REAL SUPABASE OR SANDBOX)
// -----------------------------------------------------------------------------

// 1. Heritage Sites
export async function getHeritageSites(): Promise<DbHeritageSite[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('heritage_sites')
        .select('*')
        .order('featured', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase query failed, falling back to cached seed data', e);
    }
  }
  return getLocalData<DbHeritageSite[]>(STORAGE_KEYS.SITES, SEED_HERITAGE_SITES);
}

export async function getHeritageSiteBySlug(slug: string): Promise<DbHeritageSite | null> {
  const sites = await getHeritageSites();
  return sites.find((s) => s.slug === slug) || null;
}

// 2. Artifacts
export async function getArtifacts(): Promise<DbArtifact[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('artifacts').select('*');
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase artifacts query failed, falling back to local sandbox', e);
    }
  }
  return getLocalData<DbArtifact[]>(STORAGE_KEYS.ARTIFACTS, SEED_ARTIFACTS);
}

export async function getArtifactById(id: string): Promise<DbArtifact | null> {
  const artifacts = await getArtifacts();
  return artifacts.find((a) => a.id === id || a.slug === id) || null;
}

// 3. Inscriptions
export async function getInscriptions(): Promise<DbInscription[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('inscriptions').select('*');
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase inscriptions query failed, falling back to local sandbox', e);
    }
  }
  return getLocalData<DbInscription[]>(STORAGE_KEYS.INSCRIPTIONS, SEED_INSCRIPTIONS);
}

export async function getInscriptionById(id: string): Promise<DbInscription | null> {
  const inscriptions = await getInscriptions();
  return inscriptions.find((i) => i.id === id) || null;
}

// 4. Virtual Tours & Stops
export async function getVirtualTours(): Promise<DbVirtualTour[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('virtual_tours').select('*');
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase virtual tours query failed', e);
    }
  }
  return getLocalData<DbVirtualTour[]>(STORAGE_KEYS.TOURS, SEED_VIRTUAL_TOURS);
}

export async function getTourStops(tourId: string): Promise<DbTourStop[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('tour_stops')
        .select('*')
        .eq('tour_id', tourId);
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase tour stops query failed', e);
    }
  }
  const allStops = getLocalData<DbTourStop[]>(STORAGE_KEYS.TOUR_STOPS, SEED_TOUR_STOPS);
  return allStops.filter((s) => s.tour_id === tourId);
}

// 5. Cultural Events
export async function getEvents(): Promise<DbEvent[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('events').select('*').order('start_date');
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase events query failed', e);
    }
  }
  return getLocalData<DbEvent[]>(STORAGE_KEYS.EVENTS, SEED_EVENTS);
}

// 6. Contributions (Citizen Archaeology)
export async function getContributions(userId?: string): Promise<DbContribution[]> {
  if (isSupabaseConfigured) {
    try {
      let query = supabase.from('contributions').select('*').order('created_at', { ascending: false });
      if (userId) query = query.eq('user_id', userId);
      const { data, error } = await query;
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase contributions query failed', e);
    }
  }
  const list = getLocalData<DbContribution[]>(STORAGE_KEYS.CONTRIBUTIONS, SEED_CONTRIBUTIONS);
  if (userId) return list.filter((c) => c.user_id === userId);
  return list;
}

export async function createContribution(
  item: Omit<DbContribution, 'id' | 'created_at' | 'updated_at'>
): Promise<DbContribution> {
  const newRecord: DbContribution = {
    ...item,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'contrib-' + Date.now(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('contributions').insert([newRecord]).select().single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase create contribution failed, using local sandbox', e);
    }
  }

  const list = getLocalData<DbContribution[]>(STORAGE_KEYS.CONTRIBUTIONS, SEED_CONTRIBUTIONS);
  const updated = [newRecord, ...list];
  setLocalData(STORAGE_KEYS.CONTRIBUTIONS, updated);
  return newRecord;
}

export async function updateContributionStatus(
  id: string,
  status: 'approved' | 'rejected',
  notes?: string,
  reviewerId?: string
): Promise<DbContribution | null> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('contributions')
        .update({ status, reviewer_notes: notes, reviewer_id: reviewerId, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase update contribution failed', e);
    }
  }

  const list = getLocalData<DbContribution[]>(STORAGE_KEYS.CONTRIBUTIONS, SEED_CONTRIBUTIONS);
  const index = list.findIndex((c) => c.id === id);
  if (index === -1) return null;

  list[index] = {
    ...list[index],
    status,
    reviewer_notes: notes || null,
    reviewer_id: reviewerId || null,
    updated_at: new Date().toISOString()
  };

  setLocalData(STORAGE_KEYS.CONTRIBUTIONS, list);
  return list[index];
}

// 7. Favorites (User-Specific Bookmarks)
export async function getFavorites(userId: string): Promise<DbFavorite[]> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', userId);
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase favorites query failed', e);
    }
  }

  const allFavs = getLocalData<DbFavorite[]>(STORAGE_KEYS.FAVORITES, SEED_FAVORITES);
  return allFavs.filter((f) => f.user_id === userId);
}

export async function addFavorite(
  userId: string,
  entityType: 'site' | 'artifact' | 'itinerary' | 'inscription' | 'tour',
  entityId: string
): Promise<DbFavorite> {
  const newFav: DbFavorite = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'fav-' + Date.now(),
    user_id: userId,
    entity_type: entityType,
    entity_id: entityId,
    created_at: new Date().toISOString()
  };

  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('favorites').insert([newFav]).select().single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase add favorite failed', e);
    }
  }

  const list = getLocalData<DbFavorite[]>(STORAGE_KEYS.FAVORITES, SEED_FAVORITES);
  const exists = list.some(
    (f) => f.user_id === userId && f.entity_type === entityType && f.entity_id === entityId
  );
  if (!exists) {
    list.push(newFav);
    setLocalData(STORAGE_KEYS.FAVORITES, list);
  }
  return newFav;
}

export async function removeFavorite(
  userId: string,
  entityType: 'site' | 'artifact' | 'itinerary' | 'inscription' | 'tour',
  entityId: string
): Promise<void> {
  if (isSupabaseConfigured) {
    try {
      await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('entity_type', entityType)
        .eq('entity_id', entityId);
      return;
    } catch (e) {
      console.warn('Supabase remove favorite failed', e);
    }
  }

  const list = getLocalData<DbFavorite[]>(STORAGE_KEYS.FAVORITES, SEED_FAVORITES);
  const filtered = list.filter(
    (f) => !(f.user_id === userId && f.entity_type === entityType && f.entity_id === entityId)
  );
  setLocalData(STORAGE_KEYS.FAVORITES, filtered);
}

// 8. Archive Versions
export async function getArchiveVersions(entityType?: string, entityId?: string): Promise<DbArchiveVersion[]> {
  if (isSupabaseConfigured) {
    try {
      let q = supabase.from('archive_versions').select('*').order('version_number', { ascending: false });
      if (entityType) q = q.eq('entity_type', entityType);
      if (entityId) q = q.eq('entity_id', entityId);
      const { data, error } = await q;
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase archive versions query failed', e);
    }
  }
  const versions = getLocalData<DbArchiveVersion[]>(STORAGE_KEYS.VERSIONS, SEED_ARCHIVE_VERSIONS);
  if (entityType && entityId) {
    return versions.filter((v) => v.entity_type === entityType && v.entity_id === entityId);
  }
  return versions;
}

// 9. Storage: Upload File
export async function uploadStorageFile(
  bucket: StorageBucket,
  file: File,
  path: string
): Promise<{ url: string; error?: string }> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
        upsert: true
      });
      if (error) {
        console.error('Supabase storage upload error:', error);
        return { url: '', error: error.message };
      }
      const { data: publicData } = supabase.storage.from(bucket).getPublicUrl(data.path);
      return { url: publicData.publicUrl };
    } catch (e: any) {
      console.warn('Storage upload error, falling back to data URL', e);
    }
  }

  // Client sandbox fallback: Convert to Data URL / Object URL
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve({ url: reader.result as string });
    };
    reader.onerror = () => {
      resolve({ url: URL.createObjectURL(file) });
    };
    reader.readAsDataURL(file);
  });
}

// -----------------------------------------------------------------------------
// 10. GEOGRAPHIC PROXIMITY & DISTANCE ENGINE
// -----------------------------------------------------------------------------

export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

export async function getNearbyHeritageSites(
  currentSiteId: string,
  limit: number = 3
): Promise<(DbHeritageSite & { distanceKm: number })[]> {
  const allSites = await getHeritageSites();
  const current = allSites.find((s) => s.id === currentSiteId || s.slug === currentSiteId);
  if (!current) return [];

  const others = allSites.filter((s) => s.id !== current.id && s.slug !== current.slug);
  const withDistance = others.map((s) => ({
    ...s,
    distanceKm: getDistanceKm(current.latitude, current.longitude, s.latitude, s.longitude)
  }));

  withDistance.sort((a, b) => a.distanceKm - b.distanceKm);
  return withDistance.slice(0, limit);
}

// -----------------------------------------------------------------------------
// 11. FULL-TEXT SEARCH ENGINE (SUPABASE POSTGRESQL + SANDBOX FALLBACK)
// -----------------------------------------------------------------------------

export interface HeritageSearchResults {
  sites: DbHeritageSite[];
  artifacts: DbArtifact[];
  inscriptions: DbInscription[];
  total: number;
}

export async function searchHeritageRecords(query: string): Promise<HeritageSearchResults> {
  const cleanQ = query.trim();
  if (!cleanQ) {
    return { sites: [], artifacts: [], inscriptions: [], total: 0 };
  }

  // 1. If Supabase is active, execute PostgreSQL Full-Text / ILIKE queries
  if (isSupabaseConfigured) {
    try {
      const [sitesRes, artsRes, inscsRes] = await Promise.all([
        supabase
          .from('heritage_sites')
          .select('*')
          .or(`name.ilike.%${cleanQ}%,district.ilike.%${cleanQ}%,description.ilike.%${cleanQ}%,historical_summary.ilike.%${cleanQ}%,period.ilike.%${cleanQ}%`)
          .limit(10),
        supabase
          .from('artifacts')
          .select('*')
          .or(`name.ilike.%${cleanQ}%,description.ilike.%${cleanQ}%,material.ilike.%${cleanQ}%,provenance.ilike.%${cleanQ}%,type.ilike.%${cleanQ}%`)
          .limit(10),
        supabase
          .from('inscriptions')
          .select('*')
          .or(`title.ilike.%${cleanQ}%,transcription.ilike.%${cleanQ}%,translation.ilike.%${cleanQ}%,language.ilike.%${cleanQ}%,ocr_text.ilike.%${cleanQ}%`)
          .limit(10)
      ]);

      const sites = sitesRes.data || [];
      const artifacts = artsRes.data || [];
      const inscriptions = inscsRes.data || [];

      return {
        sites,
        artifacts,
        inscriptions,
        total: sites.length + artifacts.length + inscriptions.length
      };
    } catch (e) {
      console.warn('PostgreSQL search query failed, using local token matching engine', e);
    }
  }

  // 2. Client-side full-text token matching engine (multi-word, weighted score)
  const tokens = cleanQ.toLowerCase().split(/\s+/).filter(Boolean);
  const [allSites, allArtifacts, allInscriptions] = await Promise.all([
    getHeritageSites(),
    getArtifacts(),
    getInscriptions()
  ]);

  const scoreText = (text: string | null | undefined, weight = 1): number => {
    if (!text) return 0;
    const lower = text.toLowerCase();
    let score = 0;
    for (const t of tokens) {
      if (lower.includes(t)) {
        score += weight * (lower.startsWith(t) ? 2 : 1);
      }
    }
    return score;
  };

  const matchedSites = allSites
    .map((s) => {
      const score =
        scoreText(s.name, 4) +
        scoreText(s.district, 3) +
        scoreText(s.period, 2) +
        scoreText(s.description, 1) +
        scoreText(s.historical_summary, 1);
      return { item: s, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);

  const matchedArtifacts = allArtifacts
    .map((a) => {
      const score =
        scoreText(a.name, 4) +
        scoreText(a.type, 3) +
        scoreText(a.material, 2) +
        scoreText(a.provenance, 2) +
        scoreText(a.description, 1) +
        scoreText(a.period, 1);
      return { item: a, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);

  const matchedInscriptions = allInscriptions
    .map((i) => {
      const score =
        scoreText(i.title, 4) +
        scoreText(i.language, 3) +
        scoreText(i.transcription, 2) +
        scoreText(i.translation, 2) +
        scoreText(i.ocr_text, 1) +
        scoreText(i.estimated_date, 1);
      return { item: i, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item);

  return {
    sites: matchedSites,
    artifacts: matchedArtifacts,
    inscriptions: matchedInscriptions,
    total: matchedSites.length + matchedArtifacts.length + matchedInscriptions.length
  };
}

// -----------------------------------------------------------------------------
// AUTHENTICATION & ROLE MANAGEMENT
// -----------------------------------------------------------------------------

export function getActiveSessionUser(): DbUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SESSION_USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  // Default to demo admin user so all pages & features can be explored immediately
  return SEED_USERS[0];
}

export function setActiveSessionUser(user: DbUser | null): void {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.SESSION_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.SESSION_USER);
  }
}

export async function loginWithEmail(email: string, pass: string): Promise<{ user: DbUser | null; error?: string }> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
      if (error) return { user: null, error: error.message };
      if (data.user) {
        const { data: dbUser } = await supabase.from('users').select('*').eq('id', data.user.id).single();
        const role = (data.user.user_metadata?.role as UserRole) || 'visitor';
        const userObj: DbUser = dbUser || {
          id: data.user.id,
          name: data.user.user_metadata?.name || data.user.email?.split('@')[0] || 'User',
          email: data.user.email || email,
          role,
          created_at: data.user.created_at,
          updated_at: data.user.created_at
        };
        setActiveSessionUser(userObj);
        return { user: userObj };
      }
    } catch (e: any) {
      return { user: null, error: e.message };
    }
  }

  // Sandbox fallback: Match existing users or create/login
  const users = getLocalData<DbUser[]>(STORAGE_KEYS.USERS, SEED_USERS);
  const found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (found) {
    setActiveSessionUser(found);
    return { user: found };
  }

  // Create on-the-fly visitor user
  const newUser: DbUser = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'user-' + Date.now(),
    name: email.split('@')[0],
    email,
    role: 'visitor',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  users.push(newUser);
  setLocalData(STORAGE_KEYS.USERS, users);
  setActiveSessionUser(newUser);
  return { user: newUser };
}

export async function registerWithEmail(
  email: string,
  pass: string,
  name: string,
  role: UserRole = 'contributor'
): Promise<{ user: DbUser | null; error?: string }> {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: pass,
        options: {
          data: { name, role }
        }
      });
      if (error) return { user: null, error: error.message };
      if (data.user) {
        const userObj: DbUser = {
          id: data.user.id,
          name,
          email,
          role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        // Persist to public.users table
        await supabase.from('users').upsert([userObj]);
        setActiveSessionUser(userObj);
        return { user: userObj };
      }
    } catch (e: any) {
      return { user: null, error: e.message };
    }
  }

  const users = getLocalData<DbUser[]>(STORAGE_KEYS.USERS, SEED_USERS);
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { user: null, error: 'An account with this email address already exists.' };
  }

  const newUser: DbUser = {
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : 'user-' + Date.now(),
    name,
    email,
    role,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };
  users.push(newUser);
  setLocalData(STORAGE_KEYS.USERS, users);
  setActiveSessionUser(newUser);
  return { user: newUser };
}

export async function logoutUser(): Promise<void> {
  if (isSupabaseConfigured) {
    try {
      await supabase.auth.signOut();
    } catch (e) {}
  }
  setActiveSessionUser(null);
}

export async function resetUserPassword(email: string): Promise<{ success: boolean; message: string }> {
  if (isSupabaseConfigured) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) return { success: false, message: error.message };
      return { success: true, message: 'Password reset link sent to your email.' };
    } catch (e: any) {
      return { success: false, message: e.message };
    }
  }

  return {
    success: true,
    message: `A password reset link has been dispatched to ${email} (Demo Mode).`
  };
}

export function switchDemoRole(role: UserRole): DbUser {
  const match = SEED_USERS.find((u) => u.role === role) || SEED_USERS[0];
  setActiveSessionUser(match);
  return match;
}
