import React, { useState, useEffect } from 'react';
import { Compass, MapPin, Layers, ArrowRight, Eye, Calendar, Sparkles, Navigation } from 'lucide-react';
import { DbHeritageSite } from '../types/database';
import { SEED_HERITAGE_SITES } from '../data/seedData';
import { getHeritageSites } from '../lib/supabase';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { HeritageMap } from '../components/heritage/HeritageMap';
import { Button } from '../components/ui/button';
import { useHeritage } from '../context/HeritageContext';

export const MapPage: React.FC = () => {
  const { navigate } = useHeritage();
  const [sites, setSites] = useState<DbHeritageSite[]>(SEED_HERITAGE_SITES);
  const [selectedSite, setSelectedSite] = useState<DbHeritageSite>(SEED_HERITAGE_SITES[0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getHeritageSites()
      .then((data) => {
        if (data && data.length > 0) {
          setSites(data);
          setSelectedSite(data[0]);
        }
      })
      .catch((err) => console.error('Failed to load sites for map:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Interactive Heritage Map' }]} />

      {/* Header */}
      <div className="border-b border-[#2E333D] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-2">
            <Compass className="w-4 h-4" />
            <span>GIS Heritage Cartography &bull; Leaflet & OpenStreetMap</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F3]">
            Telangana Buddhist Sanctuary Map
          </h1>
          <p className="text-sm sm:text-base text-[#D5C5AE] max-w-2xl mt-2 leading-relaxed">
            Trace the ancient pilgrimage corridors and river wharves across the Godavari and Krishna river basins. Explore site markers, clusters, coordinates, and filter by historical dynasty.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="text-xs text-[#EADBCA] bg-[#191B20] border border-[#2E333D] px-4 py-2">
            Surveyed Monasteries: <strong className="text-[#B89255]">{sites.length} Verified Sites</strong>
          </div>
        </div>
      </div>

      {/* Map + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Leaflet Map */}
        <div className="lg:col-span-8">
          <HeritageMap
            sites={sites}
            selectedSiteId={selectedSite?.id}
            onSelectSite={(site) => setSelectedSite(site)}
            heightClass="h-[550px] lg:h-[650px]"
          />
        </div>

        {/* Selected Site Detail Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {selectedSite && (
            <div className="bg-[#191B20] border border-[#B89255]/60 p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[#B89255] font-mono">
                  Active Map Selection
                </span>
                {selectedSite.featured && (
                  <span className="text-[10px] bg-[#B89255]/20 text-[#E8C868] border border-[#B89255]/40 px-2 py-0.5 font-semibold uppercase flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Featured
                  </span>
                )}
              </div>

              <div className="relative aspect-[16/10] bg-[#0D0E10] overflow-hidden border border-[#2E333D]">
                <img
                  src={selectedSite.image_url || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80'}
                  alt={selectedSite.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 bg-[#121316]/90 border border-[#2E333D] text-[10px] text-[#FAF8F3] px-2 py-0.5 font-mono">
                  {selectedSite.latitude.toFixed(4)}° N, {selectedSite.longitude.toFixed(4)}° E
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs text-[#9E9689] mb-1">
                  <span className="text-[#B89255] font-medium">{selectedSite.district} District</span>
                  <span>{selectedSite.site_type}</span>
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#FAF8F3]">
                  {selectedSite.name}
                </h3>
                <p className="text-xs text-[#B89255] mt-0.5 font-serif">{selectedSite.period}</p>
              </div>

              <p className="text-xs sm:text-sm text-[#D5C5AE] leading-relaxed line-clamp-3">
                {selectedSite.description}
              </p>

              <div className="grid grid-cols-2 gap-2 text-[11px] pt-3 border-t border-[#2E333D] text-[#9E9689]">
                <div>
                  <span className="block text-[#FAF8F3] font-semibold">Status:</span>
                  <span className="text-emerald-400">{selectedSite.archaeological_status}</span>
                </div>
                <div>
                  <span className="block text-[#FAF8F3] font-semibold">Hours:</span>
                  <span>{selectedSite.opening_hours}</span>
                </div>
              </div>

              <div className="pt-2 space-y-2">
                <Button
                  variant="gold"
                  onClick={() => navigate(`/sites/${selectedSite.slug}`)}
                  className="w-full text-xs font-semibold"
                >
                  <span>Explore Site Documentation</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate(`/virtual-tours/${selectedSite.slug}`)}
                  className="w-full text-xs"
                >
                  <Compass className="w-3.5 h-3.5 mr-1.5 text-[#B89255]" />
                  <span>360° Virtual Pilgrimage</span>
                </Button>
              </div>
            </div>
          )}

          {/* Quick List */}
          <div className="bg-[#191B20] border border-[#2E333D] p-5 space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#2E333D]">
              <span className="text-xs font-serif font-semibold text-[#FAF8F3]">
                Monastic Directory ({sites.length})
              </span>
              <span className="text-[10px] text-[#9E9689]">Click to Pan</span>
            </div>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {sites.map((site) => (
                <button
                  key={site.id}
                  onClick={() => setSelectedSite(site)}
                  className={`w-full text-left p-2.5 text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    selectedSite?.id === site.id
                      ? 'bg-[#B89255]/20 text-[#FAF8F3] border-l-2 border-[#B89255]'
                      : 'text-[#D5C5AE] hover:bg-[#22262E] hover:text-[#FAF8F3]'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="truncate font-serif font-semibold">{site.name}</div>
                    <div className="text-[10px] text-[#9E9689]">{site.district} Dist. &bull; {site.site_type}</div>
                  </div>
                  <Navigation className="w-3.5 h-3.5 text-[#B89255] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

