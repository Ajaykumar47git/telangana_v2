import React, { useState } from 'react';
import { Heart, Landmark, Database, Compass, Trash2, ArrowRight } from 'lucide-react';
import { useHeritage } from '../context/HeritageContext';
import { HERITAGE_SITES, DIGITAL_ARTIFACTS, DEMO_ITINERARIES } from '../data/heritageData';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { HeritageSiteCard } from '../components/heritage/HeritageSiteCard';
import { ArtifactCard } from '../components/heritage/ArtifactCard';
import { ItineraryCard } from '../components/heritage/ItineraryCard';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '../components/ui/button';

export const FavoritesPage: React.FC = () => {
  const {
    favorites,
    navigate,
    toggleFavoriteSite,
    toggleFavoriteArtifact,
    toggleFavoriteItinerary
  } = useHeritage();

  const [activeTab, setActiveTab] = useState<'sites' | 'artifacts' | 'itineraries'>('sites');

  const savedSites = HERITAGE_SITES.filter((s) => favorites.sites.includes(s.id));
  const savedArtifacts = DIGITAL_ARTIFACTS.filter((a) => favorites.artifacts.includes(a.id));
  const savedItineraries = DEMO_ITINERARIES.filter((it) => favorites.itineraries.includes(it.id));

  const totalSaved = favorites.sites.length + favorites.artifacts.length + favorites.itineraries.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Saved Collections' }]} />

      {/* Header */}
      <div className="border-b border-[#2E333D] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-2">
            <Heart className="w-4 h-4 fill-current text-[#B89255]" />
            <span>Personal Scholarly Dossier</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F3]">
            Saved Heritage Collections
          </h1>
          <p className="text-sm sm:text-base text-[#D5C5AE] max-w-2xl mt-3 leading-relaxed">
            Your personalized study list of Telangana Buddhist sites, epigraphical artifacts, and expedition itineraries.
          </p>
        </div>

        {/* Count summary */}
        <div className="px-4 py-2 bg-[#191B20] border border-[#2E333D] text-xs text-[#EADBCA] self-start md:self-auto">
          Total Bookmarked Items: <strong className="text-[#B89255]">{totalSaved}</strong>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2E333D]">
        <button
          onClick={() => setActiveTab('sites')}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
            activeTab === 'sites'
              ? 'border-[#B89255] text-[#FAF8F3] bg-[#191B20]'
              : 'border-transparent text-[#9E9689] hover:text-[#FAF8F3]'
          }`}
        >
          <Landmark className="w-4 h-4 text-[#B89255]" />
          <span>Heritage Sites ({savedSites.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('artifacts')}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
            activeTab === 'artifacts'
              ? 'border-[#B89255] text-[#FAF8F3] bg-[#191B20]'
              : 'border-transparent text-[#9E9689] hover:text-[#FAF8F3]'
          }`}
        >
          <Database className="w-4 h-4 text-[#B89255]" />
          <span>Artifacts & Inscriptions ({savedArtifacts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('itineraries')}
          className={`flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
            activeTab === 'itineraries'
              ? 'border-[#B89255] text-[#FAF8F3] bg-[#191B20]'
              : 'border-transparent text-[#9E9689] hover:text-[#FAF8F3]'
          }`}
        >
          <Compass className="w-4 h-4 text-[#B89255]" />
          <span>Itineraries ({savedItineraries.length})</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div>
        {activeTab === 'sites' && (
          <div>
            {savedSites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedSites.map((site) => (
                  <HeritageSiteCard key={site.id} site={site} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Saved Heritage Sites"
                description="Explore our catalogue of Telangana stupas, viharas, and excavation mounds, and bookmark your favorites."
                actionText="Explore Heritage Sites"
                onAction={() => navigate('/sites')}
              />
            )}
          </div>
        )}

        {activeTab === 'artifacts' && (
          <div>
            {savedArtifacts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedArtifacts.map((artifact) => (
                  <ArtifactCard key={artifact.id} artifact={artifact} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Saved Artifacts"
                description="Browse our digital repository of limestone reliefs, Brahmi epigraphs, and coins to save records to your study collection."
                actionText="Browse Digital Archive"
                onAction={() => navigate('/archive')}
              />
            )}
          </div>
        )}

        {activeTab === 'itineraries' && (
          <div>
            {savedItineraries.length > 0 ? (
              <div className="space-y-6">
                {savedItineraries.map((itinerary) => (
                  <ItineraryCard key={itinerary.id} itinerary={itinerary} isDetailed={true} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Saved Itineraries"
                description="Use our Trip Planner to customize and save day-by-day expedition routes across the ancient Buddhist corridors of Telangana."
                actionText="Open Trip Planner"
                onAction={() => navigate('/plan')}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
