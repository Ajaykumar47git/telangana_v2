import React, { useState, useMemo, useEffect } from 'react';
import { Landmark, Filter, MapPin, Search } from 'lucide-react';
import { HeritageSiteCard } from '../components/heritage/HeritageSiteCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SearchBar } from '../components/common/SearchBar';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ErrorState } from '../components/common/ErrorState';
import { getHeritageSites } from '../lib/supabase';
import { DbHeritageSite } from '../types/database';
import { HERITAGE_SITES } from '../data/heritageData';
import { HeritageSite } from '../types/heritage';

export const SitesPage: React.FC = () => {
  const [dbSites, setDbSites] = useState<DbHeritageSite[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedPeriod, setSelectedPeriod] = useState('All');

  useEffect(() => {
    loadSites();
  }, []);

  const loadSites = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHeritageSites();
      setDbSites(data);
    } catch (err: any) {
      setError(err?.message || 'Unable to fetch sites from Supabase.');
    } finally {
      setLoading(false);
    }
  };

  // Harmonize data source: fallback to HERITAGE_SITES if needed
  const sitesList: HeritageSite[] = useMemo(() => {
    if (dbSites.length === 0) return HERITAGE_SITES;
    return dbSites.map((d) => {
      const match = HERITAGE_SITES.find((s) => s.slug === d.slug);
      if (match) {
        return {
          ...match,
          id: d.id,
          name: d.name,
          slug: d.slug,
          district: d.district,
          period: d.period,
          shortDescription: d.description,
          significance: d.historical_summary,
          archaeologicalStatus: d.archaeological_status as any,
          featured: d.featured
        };
      }
      return {
        id: d.id,
        name: d.name,
        nameTelugu: d.name,
        slug: d.slug,
        district: d.district,
        period: d.period,
        century: 'Early Historic',
        shortDescription: d.description,
        overview: d.description,
        historicalInformation: d.historical_summary,
        image: d.image_url || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80',
        gallery: [d.image_url || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80'],
        coordinates: {
          lat: d.latitude,
          lng: d.longitude,
          xPercent: 50,
          yPercent: 50
        },
        keyStructures: [],
        timeline: [],
        artifactsCount: 12,
        featured: d.featured
      };
    });
  }, [dbSites]);

  const districts = ['All', ...Array.from(new Set(sitesList.map((s) => s.district)))];
  const periods = ['All', 'Satavahana', 'Ikshvaku'];

  const filteredSites = useMemo(() => {
    return sitesList.filter((site) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        site.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDistrict = selectedDistrict === 'All' || site.district === selectedDistrict;
      const matchesPeriod =
        selectedPeriod === 'All' || site.period.toLowerCase().includes(selectedPeriod.toLowerCase());

      return matchesSearch && matchesDistrict && matchesPeriod;
    });
  }, [sitesList, searchQuery, selectedDistrict, selectedPeriod]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Heritage Sites' }]} />

      {/* Page Title & Intro */}
      <div className="border-b border-[#2E333D] pb-8">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-2">
          <Landmark className="w-4 h-4" />
          <span>Archaeological Sanctuaries (Supabase Database)</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[#FAF8F3]">
          Telangana Buddhist Heritage Sites
        </h1>
        <p className="text-sm sm:text-base text-[#D5C5AE] max-w-3xl mt-3 leading-relaxed">
          From the Godavari riverside ramparts of Kotilingala down to the Krishna valley island monastery of Nagarjunakonda, explore the ancient stupas, chaityas, and monasteries of the Deccan.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#191B20] border border-[#2E333D] p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-center justify-between rounded-lg">
        <div className="w-full md:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search by site, district, or period..."
            resultsCount={filteredSites.length}
          />
        </div>

        <div className="w-full md:w-auto flex flex-wrap items-center gap-3">
          {/* District Selector */}
          <div className="flex items-center gap-1.5 text-xs text-[#D5C5AE]">
            <MapPin className="w-3.5 h-3.5 text-[#B89255]" />
            <span>District:</span>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-[#121316] text-[#FAF8F3] px-2.5 py-1.5 border border-[#2E333D] text-xs focus:outline-none focus:border-[#B89255] rounded"
            >
              {districts.map((d) => (
                <option key={d} value={d}>
                  {d} {d !== 'All' ? 'District' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Period Selector */}
          <div className="flex items-center gap-1.5 text-xs text-[#D5C5AE]">
            <Filter className="w-3.5 h-3.5 text-[#B89255]" />
            <span>Dynasty:</span>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="bg-[#121316] text-[#FAF8F3] px-2.5 py-1.5 border border-[#2E333D] text-xs focus:outline-none focus:border-[#B89255] rounded"
            >
              {periods.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && <ErrorState title="Notice" message={error} onRetry={loadSites} />}

      {/* Sites Grid */}
      {loading ? (
        <LoadingSkeleton count={3} className="h-64 w-full" />
      ) : filteredSites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSites.map((site) => (
            <HeritageSiteCard key={site.id} site={site} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Buddhist Heritage Sites Found"
          description="Try broadening your district selection or clearing your keyword filter."
          actionText="Reset Filters"
          onAction={() => {
            setSelectedDistrict('All');
            setSelectedPeriod('All');
            setSearchQuery('');
          }}
        />
      )}
    </div>
  );
};
