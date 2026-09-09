import React, { useState, useEffect, useTransition } from 'react';
import { Search, MapPin, Landmark, Compass, ArrowRight, X, FileText, Sparkles, Loader2 } from 'lucide-react';
import { useHeritage } from '../../context/HeritageContext';
import { searchHeritageRecords } from '../../lib/supabase';
import { DbHeritageSite, DbArtifact, DbInscription } from '../../types/database';
import { VIRTUAL_TOURS } from '../../data/heritageData';

export const GlobalSearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigate } = useHeritage();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    sites: DbHeritageSite[];
    artifacts: DbArtifact[];
    inscriptions: DbInscription[];
    tours: typeof VIRTUAL_TOURS;
  } | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults(null);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchHeritageRecords(query);
        const q = query.toLowerCase();
        const matchedTours = VIRTUAL_TOURS.filter(
          (t) =>
            t.title.toLowerCase().includes(q) ||
            t.siteName.toLowerCase().includes(q) ||
            t.district.toLowerCase().includes(q)
        );

        setResults({
          sites: res.sites,
          artifacts: res.artifacts,
          inscriptions: res.inscriptions,
          tours: matchedTours
        });
      } catch (err) {
        console.error('Error during global search:', err);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isSearchOpen) return null;

  const handleSelect = (path: string) => {
    setIsSearchOpen(false);
    setQuery('');
    navigate(path);
  };

  const totalMatches = results
    ? results.sites.length + results.artifacts.length + results.inscriptions.length + results.tours.length
    : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-2xl bg-[#191B20] border border-[#B89255]/40 shadow-2xl z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-[#2E333D] bg-[#121316]">
          {loading ? (
            <Loader2 className="w-5 h-5 text-[#B89255] animate-spin shrink-0" />
          ) : (
            <Search className="w-5 h-5 text-[#B89255] shrink-0" />
          )}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sites (Phanigiri, Kotilingala...), artifacts, inscriptions, or tours..."
            className="w-full bg-transparent text-[#FAF8F3] placeholder:text-[#9E9689] text-base focus:outline-none font-sans"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#9E9689] hover:text-[#FAF8F3] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs text-[#9E9689] hover:text-[#FAF8F3] px-2 py-1 border border-[#2E333D] ml-2 cursor-pointer uppercase tracking-wider"
          >
            ESC
          </button>
        </div>

        {/* Search Results Area */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5">
          {!query.trim() ? (
            <div className="py-8 px-4 text-center">
              <p className="text-xs uppercase tracking-widest text-[#B89255] mb-2 font-medium">Quick Discovery Suggestions</p>
              <div className="flex flex-wrap justify-center gap-2 mt-3">
                {['Phanigiri Torana', 'Dhulikatta Stupa', 'Nelakondapalli Buddha', 'Satavahana Simuka Coin', 'Brahmi Inscriptions', '360° Tours'].map(
                  (tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 text-xs bg-[#22262E] text-[#EADBCA] hover:bg-[#2E333D] hover:text-[#FAF8F3] border border-[#2E333D] transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  )
                )}
              </div>
            </div>
          ) : (
            <>
              {results && (
                <>
                  {/* Sites */}
                  {results.sites.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#B89255] font-semibold mb-2 px-2">
                        <Landmark className="w-3.5 h-3.5" />
                        <span>Heritage Sites ({results.sites.length})</span>
                      </div>
                      <div className="space-y-1">
                        {results.sites.map((site) => (
                          <button
                            key={site.id}
                            onClick={() => handleSelect(`/sites/${site.slug}`)}
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-[#22262E] border border-transparent hover:border-[#2E333D] transition-colors group cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={site.image_url || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80'}
                                alt={site.name}
                                className="w-10 h-10 object-cover shrink-0 border border-[#2E333D]"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <h4 className="font-serif text-sm font-semibold text-[#FAF8F3] group-hover:text-[#B89255] transition-colors">
                                  {site.name}
                                </h4>
                                <p className="text-xs text-[#9E9689]">
                                  {site.district} District • {site.period}
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#9E9689] group-hover:text-[#B89255] group-hover:translate-x-0.5 transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Artifacts */}
                  {results.artifacts.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#B89255] font-semibold mb-2 px-2">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Archive Antiquities ({results.artifacts.length})</span>
                      </div>
                      <div className="space-y-1">
                        {results.artifacts.map((art) => (
                          <button
                            key={art.id}
                            onClick={() => handleSelect(`/archive/artifacts/${art.id}`)}
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-[#22262E] border border-transparent hover:border-[#2E333D] transition-colors group cursor-pointer"
                          >
                            <div className="flex items-center gap-3">
                              <img
                                src={art.image_url}
                                alt={art.name}
                                className="w-10 h-10 object-cover shrink-0 border border-[#2E333D]"
                                referrerPolicy="no-referrer"
                              />
                              <div className="min-w-0">
                                <h4 className="font-serif text-sm font-semibold text-[#FAF8F3] group-hover:text-[#B89255] transition-colors truncate">
                                  {art.name}
                                </h4>
                                <p className="text-xs text-[#9E9689] truncate">
                                  {art.type} • {art.material} • {art.period}
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#9E9689] group-hover:text-[#B89255] group-hover:translate-x-0.5 transition-all shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Inscriptions */}
                  {results.inscriptions.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#B89255] font-semibold mb-2 px-2">
                        <FileText className="w-3.5 h-3.5" />
                        <span>Epigraphical Inscriptions ({results.inscriptions.length})</span>
                      </div>
                      <div className="space-y-1">
                        {results.inscriptions.map((insc) => (
                          <button
                            key={insc.id}
                            onClick={() => handleSelect('/archive/inscriptions')}
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-[#22262E] border border-transparent hover:border-[#2E333D] transition-colors group cursor-pointer"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="w-10 h-10 bg-[#121316] border border-[#2E333D] flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5 text-[#B89255]" />
                              </div>
                              <div className="min-w-0">
                                <h4 className="font-serif text-sm font-semibold text-[#FAF8F3] group-hover:text-[#B89255] transition-colors truncate">
                                  {insc.title}
                                </h4>
                                <p className="text-xs text-[#9E9689] truncate">
                                  Language: {insc.language} • {insc.estimated_date}
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#9E9689] group-hover:text-[#B89255] group-hover:translate-x-0.5 transition-all shrink-0" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Virtual Tours */}
                  {results.tours.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-[#B89255] font-semibold mb-2 px-2">
                        <Compass className="w-3.5 h-3.5" />
                        <span>360° Virtual Tours ({results.tours.length})</span>
                      </div>
                      <div className="space-y-1">
                        {results.tours.map((tour) => (
                          <button
                            key={tour.id}
                            onClick={() => handleSelect(`/virtual-tours/${tour.siteSlug}`)}
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-[#22262E] border border-transparent hover:border-[#2E333D] transition-colors group cursor-pointer"
                          >
                            <div>
                              <h4 className="font-serif text-sm font-semibold text-[#FAF8F3] group-hover:text-[#B89255] transition-colors">
                                {tour.title}
                              </h4>
                              <p className="text-xs text-[#9E9689]">
                                {tour.siteName} • {tour.duration}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-[#9E9689] group-hover:text-[#B89255] transition-all" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {totalMatches === 0 && (
                    <div className="text-center py-8 text-[#9E9689]">
                      <p className="text-sm">No heritage records match “{query}”.</p>
                      <p className="text-xs mt-1">Try searching for site names like "Phanigiri", "Dhulikatta", or "Simuka".</p>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

