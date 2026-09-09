import React from 'react';
import { HeritageProvider, useHeritage } from './context/HeritageContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { AudioPlayer } from './components/common/AudioPlayer';
import { GlobalSearchModal } from './components/common/GlobalSearchModal';
import { LoginModal } from './components/common/LoginModal';

// Pages
import { HomePage } from './pages/HomePage';
import { SitesPage } from './pages/SitesPage';
import { SiteDetailPage } from './pages/SiteDetailPage';
import { MapPage } from './pages/MapPage';
import { VirtualToursPage } from './pages/VirtualToursPage';
import { ArchivePage } from './pages/ArchivePage';
import { ArtifactDetailPage } from './pages/ArtifactDetailPage';
import { AIGuidePage } from './pages/AIGuidePage';
import { PlanPage } from './pages/PlanPage';
import { CalendarPage } from './pages/CalendarPage';
import { ContributePage } from './pages/ContributePage';
import { FavoritesPage } from './pages/FavoritesPage';
import { AboutPage } from './pages/AboutPage';
import { ProfilePage } from './pages/ProfilePage';
import { Experience3DPage } from './pages/Experience3DPage';

const AppContent: React.FC = () => {
  const {
    currentPath,
    isSearchOpen,
    setIsSearchOpen,
    isLoginOpen,
    setIsLoginOpen,
    notification
  } = useHeritage();

  // Route Resolver
  const renderCurrentPage = () => {
    // 1. Site Detail Route: /sites/:slug
    if (currentPath.startsWith('/sites/')) {
      const slug = currentPath.replace('/sites/', '').split('/')[0].split('?')[0];
      return <SiteDetailPage slug={slug} />;
    }

    // 2. Virtual Tour Detail Route: /virtual-tours/:slug
    if (currentPath.startsWith('/virtual-tours/')) {
      const slug = currentPath.replace('/virtual-tours/', '').split('/')[0].split('?')[0];
      return <VirtualToursPage initialSiteSlug={slug} />;
    }

    // 3. Artifact Detail Route: /archive/artifacts/:id
    if (currentPath.startsWith('/archive/artifacts/')) {
      const id = currentPath.replace('/archive/artifacts/', '').split('/')[0].split('?')[0];
      return <ArtifactDetailPage id={id} />;
    }

    // 4. 3D Experience Route: /experience/:slug
    if (currentPath.startsWith('/experience/')) {
      const slug = currentPath.replace('/experience/', '').split('/')[0].split('?')[0];
      return <Experience3DPage slug={slug} />;
    }

    // Standard Routes
    switch (currentPath) {
      case '/sites':
        return <SitesPage />;
      case '/map':
      case '/explore-map':
        return <MapPage />;
      case '/virtual-tours':
        return <VirtualToursPage />;
      case '/experience':
      case '/3d':
        return <Experience3DPage slug="phanigiri" />;
      case '/archive':
        return <ArchivePage initialTab="artifacts" />;
      case '/archive/inscriptions':
        return <ArchivePage initialTab="inscriptions" />;
      case '/ai-guide':
        return <AIGuidePage />;
      case '/plan':
        return <PlanPage />;
      case '/calendar':
        return <CalendarPage />;
      case '/contribute':
        return <ContributePage />;
      case '/favorites':
        return <FavoritesPage />;
      case '/profile':
        return <ProfilePage />;
      case '/about':
        return <AboutPage />;
      case '/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#121316] text-[#FAF8F3] flex flex-col font-sans selection:bg-[#B89255]/30 selection:text-[#FAF8F3]">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Routed Content */}
      <main className="flex-1 w-full">{renderCurrentPage()}</main>

      {/* Persistent Institutional Footer */}
      <Footer />

      {/* Global Bottom Audio Player when playing */}
      <AudioPlayer />

      {/* Global Search Modal */}
      <GlobalSearchModal />

      {/* Login / Auth Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
      />

      {/* Global Toast Notification */}
      {notification && (
        <div className="fixed bottom-20 right-6 z-50 bg-[#191B20] text-[#FAF8F3] border border-[#B89255] px-4 py-3 shadow-2xl animate-in fade-in slide-in-from-bottom-3 duration-200 flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#B89255] animate-pulse shrink-0" />
          <p className="text-xs font-medium text-[#EADBCA]">{notification}</p>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <HeritageProvider>
      <AppContent />
    </HeritageProvider>
  );
}
