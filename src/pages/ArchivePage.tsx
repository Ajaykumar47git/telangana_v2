import React, { useState, useMemo, useEffect } from 'react';
import {
  Database,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  BookOpen,
  FileText,
  Clock,
  History,
  ShieldAlert,
  Sparkles,
  ExternalLink,
  Heart,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Layers,
  ScrollText,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { ArtifactCard } from '../components/heritage/ArtifactCard';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { SearchBar } from '../components/common/SearchBar';
import { FilterPanel, FilterState } from '../components/common/FilterPanel';
import { EmptyState } from '../components/common/EmptyState';
import { LoadingSkeleton } from '../components/common/LoadingSkeleton';
import { ErrorState } from '../components/common/ErrorState';
import { Button } from '../components/ui/button';
import { Modal } from '../components/common/Modal';
import { useHeritage } from '../context/HeritageContext';
import { getArtifacts, getInscriptions, getArchiveVersions, getHeritageSites } from '../lib/supabase';
import { DbArtifact, DbInscription, DbArchiveVersion, DbHeritageSite } from '../types/database';
import { DIGITAL_ARTIFACTS, HERITAGE_SITES } from '../data/heritageData';

const CORE_CATEGORIES = [
  'All',
  'Sculptures',
  'Coins',
  'Pottery',
  'Architecture',
  'Manuscripts',
  'Inscriptions'
] as const;

interface ArchivePageProps {
  initialTab?: 'artifacts' | 'inscriptions';
}

const ITEMS_PER_PAGE = 6;

export const ArchivePage: React.FC<ArchivePageProps> = ({ initialTab = 'artifacts' }) => {
  const {
    canAccessResearchArchive,
    userRole,
    isFavoriteInscription,
    toggleFavoriteInscription,
    isSupabaseActive,
    navigate,
    showNotification
  } = useHeritage();

  const [activeTab, setActiveTab] = useState<'artifacts' | 'inscriptions'>(initialTab);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Data from Supabase
  const [artifacts, setArtifacts] = useState<DbArtifact[]>([]);
  const [inscriptions, setInscriptions] = useState<DbInscription[]>([]);
  const [sites, setSites] = useState<DbHeritageSite[]>([]);
  const [archiveVersions, setArchiveVersions] = useState<DbArchiveVersion[]>([]);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  // Selected Category Pill
  const [selectedCategoryPill, setSelectedCategoryPill] = useState<string>('All');

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    site: '',
    district: '',
    period: '',
    category: '',
    language: '',
    verificationStatus: ''
  });
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'name' | 'period' | 'category'>('name');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Sync tab if initialTab changes
  useEffect(() => {
    setActiveTab(initialTab);
    if (initialTab === 'inscriptions') {
      setSelectedCategoryPill('Inscriptions');
    }
  }, [initialTab]);

  useEffect(() => {
    loadData();
  }, []);

  // Reset pagination on filter or search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters, sortBy, activeTab, selectedCategoryPill]);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [artList, inscList, siteList, verList] = await Promise.all([
        getArtifacts(),
        getInscriptions(),
        getHeritageSites(),
        getArchiveVersions()
      ]);
      setArtifacts(artList);
      setInscriptions(inscList);
      setSites(siteList);
      setArchiveVersions(verList);
    } catch (err: any) {
      setError(err?.message || 'Failed to load archaeological records from Supabase database.');
    } finally {
      setLoading(false);
    }
  };

  // Distinct filter options
  const sitesList = sites.length > 0
    ? sites.map((s) => ({ id: s.id, name: s.name }))
    : HERITAGE_SITES.map((s) => ({ id: s.id, name: s.name }));
  const districtsList = Array.from(new Set(sites.map((s) => s.district))).filter(Boolean);
  const periodsList = Array.from(new Set(artifacts.map((a) => a.period))).filter(Boolean);
  const categoriesList = Array.from(new Set(artifacts.map((a) => a.type || a.material))).filter(Boolean);
  const languagesList = Array.from(new Set(inscriptions.map((i) => i.language))).filter(Boolean);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      site: '',
      district: '',
      period: '',
      category: '',
      language: '',
      verificationStatus: ''
    });
    setSearchQuery('');
    setSelectedCategoryPill('All');
  };

  const handleCategoryPillSelect = (cat: string) => {
    setSelectedCategoryPill(cat);
    if (cat === 'Inscriptions') {
      setActiveTab('inscriptions');
      handleFilterChange('category', '');
    } else if (cat === 'All') {
      handleFilterChange('category', '');
    } else {
      setActiveTab('artifacts');
      handleFilterChange('category', cat);
    }
  };

  // Filtered Artifacts
  const filteredArtifacts = useMemo(() => {
    const source = artifacts.length > 0 ? artifacts : DIGITAL_ARTIFACTS;

    return source.filter((art: any) => {
      const q = searchQuery.toLowerCase().trim();
      const artName = (art.name || '').toLowerCase();
      const artDesc = (art.description || '').toLowerCase();
      const artMaterial = (art.material || '').toLowerCase();
      const artProvenance = (art.provenance || art.siteName || '').toLowerCase();
      const artType = (art.type || art.category || '').toLowerCase();

      const matchesSearch =
        q === '' ||
        artName.includes(q) ||
        artProvenance.includes(q) ||
        artMaterial.includes(q) ||
        artDesc.includes(q) ||
        artType.includes(q);

      const matchesSite = !filters.site || art.site_id === filters.site || art.siteId === filters.site;
      const matchesPeriod = !filters.period || (art.period && art.period.includes(filters.period));
      
      const effectiveCategory = filters.category || (selectedCategoryPill !== 'All' && selectedCategoryPill !== 'Inscriptions' ? selectedCategoryPill : '');
      const matchesCategory =
        !effectiveCategory ||
        art.type?.toLowerCase() === effectiveCategory.toLowerCase() ||
        art.category?.toLowerCase() === effectiveCategory.toLowerCase();

      const matchesVerification =
        !filters.verificationStatus ||
        art.verification_status === filters.verificationStatus ||
        art.verificationStatus === filters.verificationStatus;

      return matchesSearch && matchesSite && matchesPeriod && matchesCategory && matchesVerification;
    }).sort((a: any, b: any) => {
      if (sortBy === 'name') return (a.name || '').localeCompare(b.name || '');
      if (sortBy === 'period') return (a.period || '').localeCompare(b.period || '');
      if (sortBy === 'category') return (a.type || a.category || '').localeCompare(b.type || b.category || '');
      return 0;
    });
  }, [artifacts, searchQuery, filters, sortBy, selectedCategoryPill]);

  // Filtered Inscriptions
  const filteredInscriptions = useMemo(() => {
    return inscriptions.filter((insc) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        (insc.title || '').toLowerCase().includes(q) ||
        (insc.language || '').toLowerCase().includes(q) ||
        (insc.translation || '').toLowerCase().includes(q) ||
        (insc.transcription || '').toLowerCase().includes(q) ||
        (insc.ocr_text || '').toLowerCase().includes(q);

      const matchesSite = !filters.site || insc.site_id === filters.site;
      const matchesPeriod = !filters.period || (insc.estimated_date && insc.estimated_date.includes(filters.period));
      const matchesLanguage = !filters.language || insc.language.toLowerCase() === filters.language.toLowerCase();
      const matchesVerification = !filters.verificationStatus || insc.verification_status === filters.verificationStatus;

      return matchesSearch && matchesSite && matchesPeriod && matchesLanguage && matchesVerification;
    });
  }, [inscriptions, searchQuery, filters]);

  // Pagination Slicing
  const currentItems = activeTab === 'artifacts' ? filteredArtifacts : filteredInscriptions;
  const totalPages = Math.max(1, Math.ceil(currentItems.length / ITEMS_PER_PAGE));
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return currentItems.slice(start, start + ITEMS_PER_PAGE);
  }, [currentItems, currentPage]);

  const handleShareInscription = (title: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showNotification(`Copied archive reference for "${title}"`);
    } else {
      showNotification('Reference link ready to share');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Digital Archive' }]} />

      {/* Header */}
      <div className="border-b border-[#2E333D] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-2">
            <Database className="w-4 h-4" />
            <span>Digital Heritage Archive — Telangana Buddhist Corpus</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F3]">
            Telangana Buddhist Digital Archive
          </h1>
          <p className="text-sm sm:text-base text-[#D5C5AE] max-w-2xl mt-3 leading-relaxed">
            Archaeologically catalogued Brahmi epigraphs, Satavahana numismatics, Amaravati-school limestone sculptures, and monastic pottery verified across Telangana excavation sites.
          </p>
        </div>

        {/* Action Controls & Audit Trail */}
        <div className="flex flex-wrap items-center gap-3">
          {canAccessResearchArchive && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsHistoryModalOpen(true)}
              className="text-xs border-[#B89255]/50 text-[#FAF8F3] hover:border-[#B89255] flex items-center gap-1.5"
            >
              <History className="w-3.5 h-3.5 text-[#B89255]" />
              <span>Archive Versions ({archiveVersions.length})</span>
            </Button>
          )}

          <div className="text-xs text-[#EADBCA] bg-[#191B20] border border-[#2E333D] px-4 py-2 rounded">
            Filtered Records:{' '}
            <strong className="text-[#B89255]">
              {currentItems.length}
            </strong>{' '}
            entries
          </div>
        </div>
      </div>

      {/* Primary Category Selector Pills (6 Categories) */}
      <div className="space-y-2">
        <div className="text-xs text-[#9E9689] uppercase tracking-wider font-semibold">
          Select Archaeological Category:
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {CORE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryPill === cat;
            return (
              <button
                key={cat}
                onClick={() => handleCategoryPillSelect(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] shadow-md'
                    : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]/70 hover:text-[#FAF8F3]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section Tabs: Antiquities vs Inscriptions */}
      <div className="flex border-b border-[#2E333D] gap-2">
        <button
          onClick={() => {
            setActiveTab('artifacts');
            if (selectedCategoryPill === 'Inscriptions') setSelectedCategoryPill('All');
          }}
          className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer ${
            activeTab === 'artifacts'
              ? 'border-[#B89255] text-[#FAF8F3]'
              : 'border-transparent text-[#9E9689] hover:text-[#D5C5AE]'
          }`}
        >
          Artifacts & Sculptures ({filteredArtifacts.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('inscriptions');
            setSelectedCategoryPill('Inscriptions');
            navigate('/archive/inscriptions');
          }}
          className={`pb-3 px-4 text-xs font-semibold uppercase tracking-wider transition-colors border-b-2 cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'inscriptions'
              ? 'border-[#B89255] text-[#FAF8F3]'
              : 'border-transparent text-[#9E9689] hover:text-[#D5C5AE]'
          }`}
        >
          <ScrollText className="w-3.5 h-3.5 text-[#B89255]" />
          <span>Inscriptions Archive ({filteredInscriptions.length})</span>
        </button>
      </div>

      {/* Controls Bar: Search, Mobile Filter Toggle, Sort */}
      <div className="bg-[#191B20] border border-[#2E333D] p-4 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-lg">
        <div className="w-full sm:w-96">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={
              activeTab === 'artifacts'
                ? 'Search limestone, torana, Phanigiri, coins...'
                : 'Search Brahmi transcription, Prakrit, translation...'
            }
            resultsCount={currentItems.length}
          />
        </div>

        <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-3">
          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden text-xs flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#B89255]" />
            <span>Filter ({Object.values(filters).filter(Boolean).length})</span>
          </Button>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 text-xs text-[#D5C5AE]">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#B89255]" />
            <span className="hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'name' | 'period' | 'category')}
              className="bg-[#121316] text-[#FAF8F3] px-2.5 py-1.5 border border-[#2E333D] text-xs focus:outline-none focus:border-[#B89255] rounded"
            >
              <option value="name">Alphabetical</option>
              <option value="period">Chronology / Period</option>
              <option value="category">Category / Material</option>
            </select>
          </div>
        </div>
      </div>

      {error && <ErrorState title="Database Query Notice" message={error} onRetry={loadData} />}

      {/* Main Archive Grid + Filter Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Filter Panel */}
        <div className="hidden lg:block lg:col-span-3 sticky top-24">
          <FilterPanel
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            sites={sitesList}
            districts={districtsList}
            periods={periodsList}
            categories={categoriesList}
            languages={languagesList}
          />
        </div>

        {/* Mobile Filter Panel */}
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
          sites={sitesList}
          districts={districtsList}
          periods={periodsList}
          categories={categoriesList}
          languages={languagesList}
          isOpenMobile={isMobileFilterOpen}
          onCloseMobile={() => setIsMobileFilterOpen(false)}
        />

        {/* Archive Display Container */}
        <div className="lg:col-span-9 space-y-6">
          {loading ? (
            <LoadingSkeleton count={3} className="h-44 w-full mb-4" />
          ) : activeTab === 'artifacts' ? (
            filteredArtifacts.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedItems.map((art: any) => {
                    const siteObj = sites.find((s) => s.id === (art.site_id || art.siteId));
                    const formatted = {
                      id: art.id,
                      name: art.name,
                      period: art.period,
                      siteId: art.site_id || art.siteId,
                      siteName: siteObj?.name || art.provenance || art.siteName || 'Telangana Excavation',
                      district: siteObj?.district || 'Telangana',
                      category: (art.type || art.category || 'Sculptures') as any,
                      material: art.material || 'Limestone',
                      currentLocation: art.current_location || art.currentLocation || 'Archaeological Museum',
                      image: art.image_url || art.image || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
                      verificationStatus: (art.verification_status || art.verificationStatus || 'Archaeologically Verified') as any,
                      description: art.description,
                      provenance: art.provenance || siteObj?.name || 'Telangana',
                      accessionNumber: art.accession_number || art.accessionNumber || 'TS-ARCH-' + art.id.slice(0, 6).toUpperCase(),
                      sources: art.source_reference ? [art.source_reference] : (art.sources || []),
                      source_reference: art.source_reference,
                      historicalContext: art.description
                    };
                    return <ArtifactCard key={art.id} artifact={formatted} />;
                  })}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="pt-6 border-t border-[#2E333D] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#9E9689]">
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                      {Math.min(currentPage * ITEMS_PER_PAGE, filteredArtifacts.length)} of{' '}
                      {filteredArtifacts.length} antiquities
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="text-xs"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                        <span>Previous</span>
                      </Button>
                      <div className="flex items-center gap-1 px-2 text-xs font-mono text-[#FAF8F3]">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                          <button
                            key={num}
                            onClick={() => setCurrentPage(num)}
                            className={`w-7 h-7 flex items-center justify-center text-xs border transition-colors cursor-pointer ${
                              currentPage === num
                                ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-bold'
                                : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className="text-xs"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                title="No Artifacts Match Your Filter"
                description="Try clearing some filter criteria or selecting 'All' from the category bar."
                actionText="Reset All Filters"
                onAction={handleResetFilters}
              />
            )
          ) : (
            /* Inscriptions & Epigraphy View */
            filteredInscriptions.length > 0 ? (
              <>
                <div className="space-y-6">
                  {paginatedItems.map((insc: any) => {
                    const isFav = isFavoriteInscription(insc.id);
                    const siteObj = sites.find((s) => s.id === insc.site_id);
                    const sourceRef = insc.source_reference || 'ASI Epigraphia Indica & Telangana Department of Heritage Archaeological Register';

                    return (
                      <div
                        key={insc.id}
                        className="bg-[#191B20] border border-[#2E333D] hover:border-[#B89255]/70 p-6 space-y-5 transition-all shadow-xl"
                      >
                        {/* Inscription Header Row */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-[#2E333D]/70">
                          <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span className="text-[10px] px-2.5 py-0.5 font-mono uppercase tracking-wider bg-[#22262E] text-[#B89255] border border-[#2E333D]">
                                Language: {insc.language}
                              </span>
                              <span className="text-[10px] px-2.5 py-0.5 font-mono uppercase tracking-wider bg-[#22262E] text-[#EADBCA] border border-[#2E333D]">
                                Script: Brahmi
                              </span>
                              <span className="text-[10px] px-2 py-0.5 font-semibold uppercase bg-emerald-950/80 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                {insc.verification_status}
                              </span>
                            </div>

                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF8F3] leading-snug">
                              {insc.title}
                            </h3>

                            <div className="flex flex-wrap items-center gap-3 text-xs text-[#9E9689] mt-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3.5 h-3.5 text-[#B89255]" />
                                {insc.estimated_date}
                              </span>
                              {siteObj && (
                                <span className="flex items-center gap-1 text-[#D5C5AE]">
                                  <MapPin className="w-3.5 h-3.5 text-[#B89255]" />
                                  <span>Site:</span>
                                  <button
                                    onClick={() => navigate(`/sites/${siteObj.slug}`)}
                                    className="text-[#B89255] font-semibold hover:underline cursor-pointer"
                                  >
                                    {siteObj.name} ({siteObj.district} Dist.)
                                  </button>
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => handleShareInscription(insc.title)}
                              className="p-2 bg-[#121316] text-[#D5C5AE] hover:text-[#FAF8F3] border border-[#2E333D] transition-colors cursor-pointer"
                              title="Share Reference"
                            >
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleFavoriteInscription(insc.id)}
                              className={`p-2 border transition-colors cursor-pointer ${
                                isFav
                                  ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255]'
                                  : 'bg-[#121316] text-[#FAF8F3] hover:text-[#B89255] border-[#2E333D]'
                              }`}
                              title={isFav ? 'Remove from saved' : 'Save inscription to Supabase favorites'}
                            >
                              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                            </button>
                            {siteObj && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/sites/${siteObj.slug}`)}
                                className="text-xs"
                              >
                                <span>Visit Site</span>
                                <ExternalLink className="w-3 h-3 ml-1 text-[#B89255]" />
                              </Button>
                            )}
                          </div>
                        </div>

                        {/* Inscription Grid: Original Image + Epigraphical Translation */}
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
                          {/* Inscription Image (Original Facsimile / Rubbing) */}
                          <div className="md:col-span-4 bg-[#121316] border border-[#2E333D] overflow-hidden flex flex-col items-center justify-center p-2 relative group">
                            <img
                              src={insc.image_url}
                              alt={insc.title}
                              className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                              referrerPolicy="no-referrer"
                            />
                            <span className="absolute bottom-2 left-2 px-2 py-0.5 text-[9px] font-mono bg-[#121316]/90 text-[#E8C868] border border-[#2E333D]">
                              Epigraphical Facsimile
                            </span>
                          </div>

                          {/* Epigraph Texts */}
                          <div className="md:col-span-8 space-y-3">
                            {/* Brahmi Epigraphical Transcription */}
                            <div className="bg-[#121418] border border-[#2E333D] p-3.5 space-y-1">
                              <div className="text-[10px] uppercase font-bold tracking-widest text-[#B89255] flex items-center justify-between">
                                <span>Epigraphical Transcription</span>
                                <span className="font-mono text-[9px] text-[#9E9689]">
                                  Confidence: {Math.round((insc.confidence_score || 0.95) * 100)}%
                                </span>
                              </div>
                              <p className="font-mono text-xs sm:text-sm text-[#FAF8F3] tracking-wide leading-relaxed">
                                {insc.transcription}
                              </p>
                            </div>

                            {/* Scholarly English Translation */}
                            <div className="bg-[#15171D] p-3.5 border-l-2 border-[#B89255] space-y-1">
                              <div className="text-[10px] uppercase font-bold tracking-wider text-[#D5C5AE]">
                                Scholarly English Translation
                              </div>
                              <p className="text-xs sm:text-sm text-[#FAF8F3] leading-relaxed italic font-serif">
                                &quot;{insc.translation}&quot;
                              </p>
                            </div>

                            {/* SOURCE / REFERENCE (Requirement 10) */}
                            <div className="p-3 bg-[#121316] border border-[#B89255]/40 space-y-1">
                              <div className="text-[10px] uppercase font-bold tracking-wider text-[#B89255] flex items-center gap-1">
                                <BookOpen className="w-3 h-3 text-[#B89255]" />
                                <span>Source / Reference</span>
                              </div>
                              <p className="text-[11px] text-[#D5C5AE] font-sans italic">
                                {sourceRef}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                  <div className="pt-6 border-t border-[#2E333D] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#9E9689]">
                      Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{' '}
                      {Math.min(currentPage * ITEMS_PER_PAGE, filteredInscriptions.length)} of{' '}
                      {filteredInscriptions.length} inscriptions
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                        className="text-xs"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 mr-1" />
                        <span>Previous</span>
                      </Button>
                      <div className="flex items-center gap-1 px-2 text-xs font-mono text-[#FAF8F3]">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                          <button
                            key={num}
                            onClick={() => setCurrentPage(num)}
                            className={`w-7 h-7 flex items-center justify-center text-xs border transition-colors cursor-pointer ${
                              currentPage === num
                                ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-bold'
                                : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]'
                            }`}
                          >
                            {num}
                          </button>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                        className="text-xs"
                      >
                        <span>Next</span>
                        <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <EmptyState
                title="No Inscriptions Match Your Query"
                description="Try clearing search filters or searching for terms like 'Mahachaitya', 'Prakrit', or 'Siddham'."
                actionText="Reset All Filters"
                onAction={handleResetFilters}
              />
            )
          )}
        </div>
      </div>

      {/* ARCHIVE VERSIONS AUDIT MODAL (archive_versions table display) */}
      <Modal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        title="Scholarly Provenance & Version Audit Trail"
        subtitle="Tracking revisions and epigraphical consensus in archive_versions table"
        maxWidth="lg"
      >
        <div className="space-y-4 py-2">
          <div className="text-xs text-[#9E9689] flex items-center justify-between p-3 bg-[#191B20] border border-[#2E333D]">
            <span>Privileged view enabled for: <strong className="text-[#FAF8F3] uppercase">{userRole}</strong></span>
            <span className="text-emerald-400 font-mono">Read-Only Immutable Log</span>
          </div>

          <div className="space-y-3">
            {archiveVersions.map((v) => (
              <div
                key={v.id}
                className="p-4 bg-[#191B20] border border-[#2E333D] space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#FAF8F3] uppercase font-mono">
                    {v.entity_type} #{v.entity_id.slice(0, 8)} (v{v.version_number}.0)
                  </span>
                  <span className="text-[11px] text-[#787163]">
                    {new Date(v.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="bg-[#121316] p-2.5 border border-[#2E333D] font-mono text-[11px] text-[#D5C5AE] overflow-x-auto">
                  {JSON.stringify(v.changes, null, 2)}
                </div>
                <div className="text-[10px] text-[#9E9689]">
                  Audited & Approved by User UUID: <code className="text-[#B89255]">{v.updated_by}</code>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
};

