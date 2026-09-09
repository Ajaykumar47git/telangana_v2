import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, AudioStory } from '../types/heritage';
import { DbUser, UserRole } from '../types/database';
import {
  getActiveSessionUser,
  setActiveSessionUser,
  loginWithEmail,
  registerWithEmail,
  logoutUser,
  resetUserPassword,
  switchDemoRole,
  getFavorites,
  addFavorite,
  removeFavorite,
  isSupabaseConfigured
} from '../lib/supabase';
import { SEED_USERS } from '../data/seedData';

export interface FavoritesState {
  sites: string[];
  artifacts: string[];
  tours: string[];
  itineraries: string[];
  inscriptions: string[];
  // Backwards compatibility aliases
  siteIds?: string[];
  artifactIds?: string[];
  tourIds?: string[];
  itineraryIds?: string[];
}

interface HeritageContextType {
  currentPath: string;
  navigate: (path: string) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;

  // Supabase Auth & Role State
  currentUser: DbUser | null;
  userRole: UserRole;
  isSupabaseActive: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, pass: string, name: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  switchRole: (role: UserRole) => void;

  // Role Permissions
  canSubmitContribution: boolean;
  canAccessResearchArchive: boolean;
  canReviewContributions: boolean;
  canManageSystem: boolean;

  // Favorites state and methods
  favorites: FavoritesState;
  toggleFavoriteSite: (id: string) => void;
  toggleFavoriteArtifact: (id: string) => void;
  toggleFavoriteTour: (id: string) => void;
  toggleFavoriteItinerary: (id: string) => void;
  toggleFavoriteInscription: (id: string) => void;
  isFavoriteSite: (id: string) => boolean;
  isFavoriteArtifact: (id: string) => boolean;
  isFavoriteTour: (id: string) => boolean;
  isFavoriteItinerary: (id: string) => boolean;
  isFavoriteInscription: (id: string) => boolean;

  // Modals & Audio
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (open: boolean) => void;
  activeAudio: AudioStory | null;
  isPlayingAudio: boolean;
  playAudio: (audio: AudioStory) => void;
  pauseAudio: () => void;
  stopAudio: () => void;

  // Notifications
  notification: string | null;
  showNotification: (msg: string) => void;
}

const HeritageContext = createContext<HeritageContextType | undefined>(undefined);

export const HeritageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeAudio, setActiveAudio] = useState<AudioStory | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Active user initialized from Supabase or Local session
  const [currentUser, setCurrentUser] = useState<DbUser | null>(() => getActiveSessionUser());

  // Favorites state
  const [favorites, setFavorites] = useState<FavoritesState>({
    sites: ['phanigiri', 'dhulikatta'],
    artifacts: ['22222222-2222-2222-2222-222222222201', '22222222-2222-2222-2222-222222222203', 'art-001'],
    tours: ['44444444-4444-4444-4444-444444444401'],
    itineraries: ['plan-3day-classic'],
    inscriptions: ['33333333-3333-3333-3333-333333333301'],
    siteIds: ['phanigiri', 'dhulikatta'],
    artifactIds: ['22222222-2222-2222-2222-222222222201', '22222222-2222-2222-2222-222222222203', 'art-001'],
    tourIds: ['44444444-4444-4444-4444-444444444401'],
    itineraryIds: ['plan-3day-classic']
  });

  // Load user favorites from Supabase DB whenever user changes
  useEffect(() => {
    if (currentUser) {
      getFavorites(currentUser.id).then((dbFavs) => {
        if (dbFavs && dbFavs.length > 0) {
          const s = dbFavs.filter((f) => f.entity_type === 'site').map((f) => f.entity_id);
          const a = dbFavs.filter((f) => f.entity_type === 'artifact').map((f) => f.entity_id);
          const t = dbFavs.filter((f) => f.entity_type === 'itinerary').map((f) => f.entity_id);
          const i = dbFavs.filter((f) => f.entity_type === 'inscription').map((f) => f.entity_id);

          setFavorites({
            sites: s.length ? s : ['phanigiri', 'dhulikatta'],
            artifacts: a.length ? a : ['22222222-2222-2222-2222-222222222201'],
            tours: ['44444444-4444-4444-4444-444444444401'],
            itineraries: t.length ? t : ['plan-3day-classic'],
            inscriptions: i,
            siteIds: s,
            artifactIds: a,
            tourIds: ['44444444-4444-4444-4444-444444444401'],
            itineraryIds: t
          });
        }
      });
    }
  }, [currentUser]);

  // History API listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setCurrentPath(path);
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 3500);
  };

  // Auth Handlers
  const login = async (email: string, pass: string) => {
    const res = await loginWithEmail(email, pass);
    if (res.error) {
      showNotification(`Login failed: ${res.error}`);
      return { success: false, error: res.error };
    }
    if (res.user) {
      setCurrentUser(res.user);
      showNotification(`Welcome back, ${res.user.name} (${res.user.role.toUpperCase()})`);
      return { success: true };
    }
    return { success: false, error: 'Unknown authentication error' };
  };

  const register = async (email: string, pass: string, name: string, role: UserRole = 'contributor') => {
    const res = await registerWithEmail(email, pass, name, role);
    if (res.error) {
      showNotification(`Registration failed: ${res.error}`);
      return { success: false, error: res.error };
    }
    if (res.user) {
      setCurrentUser(res.user);
      showNotification(`Account created successfully as ${role.toUpperCase()}`);
      return { success: true };
    }
    return { success: false, error: 'Unknown registration error' };
  };

  const logout = async () => {
    await logoutUser();
    setCurrentUser(null);
    showNotification('Logged out from SanghaTelangana session');
  };

  const resetPassword = async (email: string) => {
    const res = await resetUserPassword(email);
    showNotification(res.message);
    return res;
  };

  const switchRole = (role: UserRole) => {
    const user = switchDemoRole(role);
    setCurrentUser(user);
    showNotification(`Switched demo role to ${role.toUpperCase()}: ${user.name}`);
  };

  const userRole: UserRole = currentUser?.role || 'visitor';

  // Role permissions
  const canSubmitContribution = ['contributor', 'researcher', 'curator', 'admin'].includes(userRole);
  const canAccessResearchArchive = ['researcher', 'curator', 'admin'].includes(userRole);
  const canReviewContributions = ['curator', 'admin'].includes(userRole);
  const canManageSystem = userRole === 'admin';

  // Favorites Handlers with Supabase sync
  const toggleFavoriteSite = (id: string) => {
    const exists = favorites.sites.includes(id);
    const updated = exists ? favorites.sites.filter((s) => s !== id) : [...favorites.sites, id];
    setFavorites((prev) => ({ ...prev, sites: updated, siteIds: updated }));

    if (currentUser) {
      if (exists) {
        removeFavorite(currentUser.id, 'site', id);
      } else {
        addFavorite(currentUser.id, 'site', id);
      }
    }
    showNotification(exists ? 'Site removed from favorites' : 'Site saved to favorites');
  };

  const toggleFavoriteArtifact = (id: string) => {
    const exists = favorites.artifacts.includes(id);
    const updated = exists ? favorites.artifacts.filter((a) => a !== id) : [...favorites.artifacts, id];
    setFavorites((prev) => ({ ...prev, artifacts: updated, artifactIds: updated }));

    if (currentUser) {
      if (exists) {
        removeFavorite(currentUser.id, 'artifact', id);
      } else {
        addFavorite(currentUser.id, 'artifact', id);
      }
    }
    showNotification(exists ? 'Artifact removed from saved collection' : 'Artifact saved to collection');
  };

  const toggleFavoriteTour = (id: string) => {
    const exists = favorites.tours.includes(id);
    const updated = exists ? favorites.tours.filter((t) => t !== id) : [...favorites.tours, id];
    setFavorites((prev) => ({ ...prev, tours: updated, tourIds: updated }));

    if (currentUser) {
      if (exists) {
        removeFavorite(currentUser.id, 'tour', id);
      } else {
        addFavorite(currentUser.id, 'tour', id);
      }
    }
    showNotification(exists ? 'Tour removed from bookmarks' : 'Tour bookmarked');
  };

  const toggleFavoriteItinerary = (id: string) => {
    const exists = favorites.itineraries.includes(id);
    const updated = exists ? favorites.itineraries.filter((i) => i !== id) : [...favorites.itineraries, id];
    setFavorites((prev) => ({ ...prev, itineraries: updated, itineraryIds: updated }));

    if (currentUser) {
      if (exists) {
        removeFavorite(currentUser.id, 'itinerary', id);
      } else {
        addFavorite(currentUser.id, 'itinerary', id);
      }
    }
    showNotification(exists ? 'Itinerary removed from saved trips' : 'Itinerary saved to your trips');
  };

  const toggleFavoriteInscription = (id: string) => {
    const exists = favorites.inscriptions.includes(id);
    const updated = exists ? favorites.inscriptions.filter((i) => i !== id) : [...favorites.inscriptions, id];
    setFavorites((prev) => ({ ...prev, inscriptions: updated }));

    if (currentUser) {
      if (exists) {
        removeFavorite(currentUser.id, 'inscription', id);
      } else {
        addFavorite(currentUser.id, 'inscription', id);
      }
    }
    showNotification(exists ? 'Inscription removed from saved epigraphy' : 'Inscription saved to study list');
  };

  const isFavoriteSite = (id: string) => favorites.sites.includes(id);
  const isFavoriteArtifact = (id: string) => favorites.artifacts.includes(id);
  const isFavoriteTour = (id: string) => favorites.tours.includes(id);
  const isFavoriteItinerary = (id: string) => favorites.itineraries.includes(id);
  const isFavoriteInscription = (id: string) => favorites.inscriptions.includes(id);

  // Audio Player
  const playAudio = (audio: AudioStory) => {
    setActiveAudio(audio);
    setIsPlayingAudio(true);
    showNotification(`Now playing: ${audio.title}`);
  };

  const pauseAudio = () => setIsPlayingAudio(false);
  const stopAudio = () => {
    setActiveAudio(null);
    setIsPlayingAudio(false);
  };

  return (
    <HeritageContext.Provider
      value={{
        currentPath,
        navigate,
        language,
        setLanguage,
        currentUser,
        userRole,
        isSupabaseActive: isSupabaseConfigured,
        login,
        register,
        logout,
        resetPassword,
        switchRole,
        canSubmitContribution,
        canAccessResearchArchive,
        canReviewContributions,
        canManageSystem,
        favorites,
        toggleFavoriteSite,
        toggleFavoriteArtifact,
        toggleFavoriteTour,
        toggleFavoriteItinerary,
        toggleFavoriteInscription,
        isFavoriteSite,
        isFavoriteArtifact,
        isFavoriteTour,
        isFavoriteItinerary,
        isFavoriteInscription,
        isSearchOpen,
        setIsSearchOpen,
        isLoginOpen,
        setIsLoginOpen,
        activeAudio,
        isPlayingAudio,
        playAudio,
        pauseAudio,
        stopAudio,
        notification,
        showNotification
      }}
    >
      {children}
    </HeritageContext.Provider>
  );
};

export const useHeritage = () => {
  const context = useContext(HeritageContext);
  if (!context) {
    throw new Error('useHeritage must be used within a HeritageProvider');
  }
  return context;
};
