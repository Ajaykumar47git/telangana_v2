import React, { useState, useEffect } from 'react';
import {
  Download,
  Share2,
  Heart,
  ZoomIn,
  ZoomOut,
  Maximize2,
  FileText,
  MapPin,
  Calendar,
  Layers,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Compass
} from 'lucide-react';
import { DIGITAL_ARTIFACTS, HERITAGE_SITES } from '../data/heritageData';
import { useHeritage } from '../context/HeritageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { VerificationBadge } from '../components/common/VerificationBadge';
import { ArtifactCard } from '../components/heritage/ArtifactCard';
import { Button } from '../components/ui/button';
import { getArtifacts, getHeritageSites } from '../lib/supabase';
import { DbArtifact, DbHeritageSite } from '../types/database';

interface ArtifactDetailPageProps {
  id: string;
}

export const ArtifactDetailPage: React.FC<ArtifactDetailPageProps> = ({ id }) => {
  const { navigate, isFavoriteArtifact, toggleFavoriteArtifact, showNotification } = useHeritage();
  const [zoomScale, setZoomScale] = useState(1);
  const [dbArtifact, setDbArtifact] = useState<DbArtifact | null>(null);
  const [associatedDbSite, setAssociatedDbSite] = useState<DbHeritageSite | null>(null);
  const [allDbArtifacts, setAllDbArtifacts] = useState<DbArtifact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getArtifacts(), getHeritageSites()])
      .then(([arts, sitesList]) => {
        if (!isMounted) return;
        setAllDbArtifacts(arts);
        const match = arts.find((a) => a.id === id || a.slug === id);
        if (match) {
          setDbArtifact(match);
          const foundSite = sitesList.find((s) => s.id === match.site_id);
          if (foundSite) setAssociatedDbSite(foundSite);
        }
      })
      .catch((err) => console.error('Failed to load artifact details:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [id]);

  // Fallback to DIGITAL_ARTIFACTS if not in Supabase yet
  const fallbackArtifact = DIGITAL_ARTIFACTS.find((a) => a.id === id) || DIGITAL_ARTIFACTS[0];
  const artifactId = dbArtifact?.id || fallbackArtifact.id;
  const artifactName = dbArtifact?.name || fallbackArtifact.name;
  const artifactImage = dbArtifact?.image_url || fallbackArtifact.image;
  const artifactType = dbArtifact?.type || fallbackArtifact.category;
  const artifactPeriod = dbArtifact?.period || fallbackArtifact.period;
  const artifactMaterial = dbArtifact?.material || fallbackArtifact.material;
  const artifactDesc = dbArtifact?.description || fallbackArtifact.description;
  const artifactProvenance = dbArtifact?.provenance || fallbackArtifact.provenance;
  const artifactStatus = dbArtifact?.verification_status || fallbackArtifact.verificationStatus;
  const artifactAccession = dbArtifact?.accession_number || fallbackArtifact.accessionNumber;
  const artifactDimensions = dbArtifact?.dimensions || fallbackArtifact.dimensions || 'Dimensions recorded in ASI register';
  const artifactLocation = dbArtifact?.current_location || fallbackArtifact.currentLocation || 'Archaeological Museum';
  const artifactSource = dbArtifact?.source_reference || (fallbackArtifact.sources ? fallbackArtifact.sources.join('; ') : null);

  const siteName = associatedDbSite?.name || fallbackArtifact.siteName;
  const siteSlug = associatedDbSite?.slug || HERITAGE_SITES.find((s) => s.id === fallbackArtifact.siteId)?.slug || 'phanigiri';

  const isFav = isFavoriteArtifact(artifactId);

  // Related artifacts
  const relatedArtifacts = allDbArtifacts.length > 0
    ? allDbArtifacts
        .filter((a) => a.id !== artifactId && (a.type === artifactType || a.site_id === dbArtifact?.site_id))
        .slice(0, 3)
        .map((art) => ({
          id: art.id,
          name: art.name,
          period: art.period,
          siteId: art.site_id,
          siteName: associatedDbSite?.name || 'Telangana Excavation',
          category: (art.type as any) || 'Sculptures',
          material: art.material,
          image: art.image_url,
          verificationStatus: (art.verification_status as any) || 'Archaeologically Verified',
          description: art.description,
          provenance: art.provenance,
          accessionNumber: art.accession_number || 'TS-ARCH-' + art.id.slice(0, 6).toUpperCase(),
          currentLocation: art.current_location || 'Museum',
          sources: art.source_reference ? [art.source_reference] : [],
          historicalContext: art.description,
          district: associatedDbSite?.district || 'Suryapet'
        }))
    : DIGITAL_ARTIFACTS.filter(
        (a) => a.id !== fallbackArtifact.id && (a.category === fallbackArtifact.category || a.siteId === fallbackArtifact.siteId)
      ).slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showNotification('Artifact URL copied to clipboard');
    } else {
      showNotification('URL ready to share');
    }
  };

  const handleDownloadMetadata = () => {
    const exportData = dbArtifact || fallbackArtifact;
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${artifactAccession}_metadata.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showNotification(`Downloaded metadata for ${artifactAccession}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-12 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Digital Archive', path: '/archive' },
          { label: artifactName }
        ]}
      />

      {/* Main Grid: Viewer + Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: High-Res Artifact Image Viewer */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative aspect-square sm:aspect-[4/3] bg-[#0D0E10] border border-[#2E333D] overflow-hidden flex items-center justify-center select-none shadow-2xl">
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-300 ease-out"
              style={{ transform: `scale(${zoomScale})` }}
            >
              <img
                src={artifactImage}
                alt={artifactName}
                className="max-w-full max-h-full object-contain p-4"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Zoom Controls Overlay */}
            <div className="absolute bottom-4 left-4 bg-[#121316]/90 backdrop-blur-md border border-[#2E333D] flex items-center p-1">
              <button
                onClick={() => setZoomScale((prev) => Math.min(2.5, prev + 0.3))}
                className="p-2 text-[#D5C5AE] hover:text-[#B89255] transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-[#2E333D]" />
              <button
                onClick={() => setZoomScale((prev) => Math.max(1, prev - 0.3))}
                className="p-2 text-[#D5C5AE] hover:text-[#B89255] transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-[#2E333D]" />
              <button
                onClick={() => setZoomScale(1)}
                className="px-2 text-[10px] text-[#9E9689] hover:text-[#FAF8F3] transition-colors cursor-pointer"
                title="Reset Zoom"
              >
                Reset
              </button>
            </div>

            {/* Accession Watermark */}
            <div className="absolute top-4 left-4 bg-[#121316]/80 px-2.5 py-1 text-[10px] font-mono text-[#9E9689] border border-[#2E333D]">
              Acc. No: {artifactAccession}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#191B20] border border-[#2E333D]">
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadMetadata}
              className="text-xs"
            >
              <Download className="w-3.5 h-3.5 mr-1.5 text-[#B89255]" />
              <span>Download Metadata (JSON)</span>
            </Button>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 text-[#D5C5AE] hover:text-[#FAF8F3] border border-[#2E333D] bg-[#121316] transition-colors cursor-pointer"
                title="Share Record"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleFavoriteArtifact(artifactId)}
                className={`p-2 border transition-colors cursor-pointer ${
                  isFav
                    ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255]'
                    : 'bg-[#121316] text-[#FAF8F3] hover:text-[#B89255] border-[#2E333D]'
                }`}
                title={isFav ? 'Remove from saved' : 'Save artifact to Supabase favorites'}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Detailed Metadata & Interpretation */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <VerificationBadge status={artifactStatus as any} />
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-[#22262E] text-[#B89255] border border-[#2E333D] uppercase tracking-wider">
                {artifactType}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#FAF8F3] leading-tight mt-2">
              {artifactName}
            </h1>

            {/* Discovery Site Link */}
            <div className="flex items-center gap-2 mt-3 text-xs sm:text-sm text-[#D5C5AE]">
              <MapPin className="w-4 h-4 text-[#B89255] shrink-0" />
              <span>Excavation Site:</span>
              <button
                onClick={() => navigate(`/sites/${siteSlug}`)}
                className="text-[#B89255] font-semibold hover:underline cursor-pointer"
              >
                {siteName}
              </button>
            </div>
          </div>

          {/* Physical Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-[#191B20] border border-[#2E333D] text-xs">
            <div>
              <span className="text-[10px] uppercase text-[#9E9689] block">Category / Type</span>
              <span className="font-medium text-[#FAF8F3]">{artifactType}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#9E9689] block">Material</span>
              <span className="font-medium text-[#FAF8F3]">{artifactMaterial}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#9E9689] block">Historical Period</span>
              <span className="font-medium text-[#FAF8F3]">{artifactPeriod}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#9E9689] block">Dimensions</span>
              <span className="font-medium text-[#FAF8F3]">{artifactDimensions}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#9E9689] block">Current Location</span>
              <span className="font-medium text-[#FAF8F3]">{artifactLocation}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase text-[#9E9689] block">Accession Number</span>
              <span className="font-mono text-[#D5C5AE]">{artifactAccession}</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-semibold text-[#FAF8F3]">
              Archaeological Description
            </h3>
            <p className="text-xs sm:text-sm text-[#D5C5AE] leading-relaxed">
              {artifactDesc}
            </p>
          </div>

          {/* Provenance */}
          <div className="space-y-2">
            <h3 className="font-serif text-lg font-semibold text-[#FAF8F3]">
              Archaeological Provenance
            </h3>
            <p className="text-xs sm:text-sm text-[#D5C5AE] leading-relaxed bg-[#191B20] p-3 border border-[#2E333D]">
              {artifactProvenance}
            </p>
          </div>

          {/* SOURCE / REFERENCE (Requirement 10) */}
          {artifactSource && (
            <div className="p-4 bg-[#121316] border border-[#B89255]/50 space-y-1.5 shadow-md">
              <div className="text-[11px] font-serif uppercase tracking-wider text-[#B89255] font-semibold flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#B89255]" />
                <span>Source / Reference</span>
              </div>
              <p className="text-xs text-[#FAF8F3] leading-relaxed font-sans italic">
                {artifactSource}
              </p>
            </div>
          )}

          {/* Inscription Details (if present on fallback) */}
          {fallbackArtifact.inscriptionDetails && (
            <div className="p-5 bg-[#121316] border border-[#B89255]/40 space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-[#2E333D]">
                <FileText className="w-4 h-4 text-[#B89255]" />
                <h3 className="font-serif text-base font-semibold text-[#FAF8F3]">
                  Epigraphical Record & Inscription Translation
                </h3>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9E9689] block mb-1">
                  Original Brahmi Script (Epigraph):
                </span>
                <div className="p-3 bg-[#191B20] border border-[#2E333D] font-serif text-lg sm:text-xl text-[#E8C868] tracking-widest leading-relaxed">
                  {fallbackArtifact.inscriptionDetails.originalScript}
                </div>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9E9689] block mb-0.5">
                  Academic Transliteration:
                </span>
                <p className="font-mono text-xs text-[#FAF8F3] italic">
                  {fallbackArtifact.inscriptionDetails.transliteration}
                </p>
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#9E9689] block mb-0.5">
                  English Translation:
                </span>
                <p className="text-xs sm:text-sm text-[#D5C5AE] font-serif italic border-l-2 border-[#B89255] pl-3 py-0.5">
                  &quot;{fallbackArtifact.inscriptionDetails.translation}&quot;
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Artifacts */}
      {relatedArtifacts.length > 0 && (
        <section className="pt-8 border-t border-[#2E333D] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#FAF8F3]">
              Related Antiquities from the Telangana Corpus
            </h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/archive')}
              className="text-xs text-[#B89255] hover:underline p-0"
            >
              <span>View Full Archive</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedArtifacts.map((rel: any) => (
              <ArtifactCard key={rel.id} artifact={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

