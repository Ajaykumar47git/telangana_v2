import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Compass,
  Box,
  Volume2,
  Clock,
  Ticket,
  Navigation,
  ArrowRight,
  Heart,
  Share2,
  Layers,
  Sparkles,
  Info,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { HeritageSite } from '../types/heritage';
import { HERITAGE_SITES, DIGITAL_ARTIFACTS, AUDIO_STORIES } from '../data/heritageData';
import { useHeritage } from '../context/HeritageContext';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Timeline } from '../components/heritage/Timeline';
import { ArtifactCard } from '../components/heritage/ArtifactCard';
import { Button } from '../components/ui/button';
import { Modal } from '../components/common/Modal';
import { getHeritageSites, getNearbyHeritageSites, getArtifacts } from '../lib/supabase';
import { DbHeritageSite, DbArtifact } from '../types/database';

interface SiteDetailPageProps {
  slug: string;
}

export const SiteDetailPage: React.FC<SiteDetailPageProps> = ({ slug }) => {
  const { navigate, isFavoriteSite, toggleFavoriteSite, playAudio, showNotification } = useHeritage();
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [dbSite, setDbSite] = useState<DbHeritageSite | null>(null);
  const [nearbySites, setNearbySites] = useState<(DbHeritageSite & { distanceKm: number })[]>([]);
  const [dbArtifacts, setDbArtifacts] = useState<DbArtifact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    Promise.all([getHeritageSites(), getArtifacts()])
      .then(async ([sitesList, artsList]) => {
        if (!isMounted) return;
        const found = sitesList.find((s) => s.slug === slug || s.id === slug);
        if (found) {
          setDbSite(found);
          const nearby = await getNearbyHeritageSites(found.id, 3);
          if (isMounted) setNearbySites(nearby);
          const siteArts = artsList.filter((a) => a.site_id === found.id);
          if (isMounted) setDbArtifacts(siteArts);
        }
      })
      .catch((err) => console.error('Failed to load site details from Supabase:', err))
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const fallbackSite = HERITAGE_SITES.find((s) => s.slug === slug) || HERITAGE_SITES[0];
  const siteId = dbSite?.id || fallbackSite.id;
  const siteName = dbSite?.name || fallbackSite.name;
  const siteDistrict = dbSite?.district || fallbackSite.district;
  const sitePeriod = dbSite?.period || fallbackSite.period;
  const siteImage = dbSite?.image_url || fallbackSite.image;
  const siteDesc = dbSite?.description || fallbackSite.overview;
  const siteHistoricalSummary = dbSite?.historical_summary || fallbackSite.historicalInformation;
  const siteArchStatus = dbSite?.archaeological_status || 'Centrally Protected ASI Monument';
  const siteHours = dbSite?.opening_hours || fallbackSite.visitingHours || '09:00 AM – 05:00 PM';
  const siteAccessibility = dbSite?.accessibility || 'Partial accessibility via ramped pathways';
  const siteFacilities = dbSite?.facilities || ['Drinking water', 'Information kiosk', 'Shaded pathways', 'Archaeological Signage'];
  const siteSource = dbSite?.source_reference || 'ASI Annual Reports & Telangana State Department of Heritage Archaeological Memoirs';

  const isFav = isFavoriteSite(siteId);

  // Associated artifacts
  const relatedArtifacts = dbArtifacts.length > 0
    ? dbArtifacts.map((art) => ({
        id: art.id,
        name: art.name,
        period: art.period,
        siteId: art.site_id,
        siteName: siteName,
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
        district: siteDistrict
      }))
    : DIGITAL_ARTIFACTS.filter((a) => a.siteId === fallbackSite.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showNotification('Site link copied to clipboard');
    } else {
      showNotification('Link ready to share');
    }
  };

  const handlePlayAudio = () => {
    const audio = AUDIO_STORIES.find((a) => a.siteName.toLowerCase().includes(siteName.toLowerCase())) || AUDIO_STORIES[0];
    playAudio(audio);
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Hero Section */}
      <div className="relative min-h-[60vh] sm:min-h-[70vh] flex items-end overflow-hidden bg-[#0D0E10]">
        <img
          src={siteImage}
          alt={siteName}
          className="absolute inset-0 w-full h-full object-cover brightness-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/50 to-black/30" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <Breadcrumbs
            items={[{ label: 'Heritage Sites', path: '/sites' }, { label: siteName }]}
            className="mb-4 text-[#D5C5AE]"
          />

          <div className="flex flex-wrap items-center gap-3 mb-3">
            <span className="px-3 py-1 text-xs font-semibold bg-[#B89255]/20 text-[#E8C868] border border-[#B89255]/40 uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {siteDistrict} District, Telangana
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-[#191B20]/80 text-[#FAF8F3] border border-[#2E333D] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#B89255]" />
              {sitePeriod}
            </span>
            <span className="px-3 py-1 text-xs font-medium bg-[#191B20]/80 text-[#B89255] border border-[#2E333D] flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {siteArchStatus}
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-[#FAF8F3] leading-tight max-w-4xl">
            {siteName}
          </h1>

          {fallbackSite.nameTelugu && (
            <p className="font-sans text-sm sm:text-base text-[#D5C5AE] mt-1 font-medium">
              {fallbackSite.nameTelugu}
            </p>
          )}

          {/* Action CTAs in Hero */}
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <Button
              variant="gold"
              onClick={() => navigate(`/virtual-tours/${slug}`)}
              className="text-xs sm:text-sm font-semibold"
            >
              <Compass className="w-4 h-4 mr-1.5" />
              <span>Launch 360° Virtual Tour</span>
            </Button>

            <Button
              variant="secondary"
              onClick={() => navigate(`/experience/${slug}`)}
              className="text-xs sm:text-sm font-semibold hover:border-[#B89255]"
            >
              <Box className="w-4 h-4 mr-1.5 text-[#B89255]" />
              <span>View 3D Reconstruction</span>
            </Button>

            <Button
              variant="outline"
              onClick={handlePlayAudio}
              className="text-xs sm:text-sm"
            >
              <Volume2 className="w-4 h-4 mr-1.5 text-[#B89255]" />
              <span>Audio Guide</span>
            </Button>

            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={handleShare}
                className="p-2.5 bg-[#191B20]/80 text-[#D5C5AE] hover:text-[#FAF8F3] border border-[#2E333D] transition-colors cursor-pointer"
                title="Share Site"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleFavoriteSite(siteId)}
                className={`p-2.5 backdrop-blur-xs border transition-colors cursor-pointer ${
                  isFav
                    ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255]'
                    : 'bg-[#191B20]/80 text-[#FAF8F3] hover:text-[#B89255] border-[#2E333D]'
                }`}
                title={isFav ? 'Remove from saved' : 'Save site to Supabase favorites'}
              >
                <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left / Main Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F3] pb-2 border-b border-[#2E333D]">
                Site Overview
              </h2>
              <p className="text-sm sm:text-base text-[#D5C5AE] leading-relaxed">
                {siteDesc}
              </p>
            </section>

            {/* Historical Information */}
            <section className="space-y-4">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F3] pb-2 border-b border-[#2E333D]">
                Historical & Epigraphical Context
              </h2>
              <p className="text-sm sm:text-base text-[#D5C5AE] leading-relaxed">
                {siteHistoricalSummary}
              </p>
            </section>

            {/* Source / Reference (Requirement 10) */}
            {siteSource && (
              <section className="p-4 bg-[#15171D] border border-[#B89255]/40 space-y-2">
                <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#B89255] font-semibold">
                  <BookOpen className="w-4 h-4" />
                  <span>Source / Reference</span>
                </div>
                <p className="text-xs text-[#FAF8F3] italic font-sans leading-relaxed">
                  {siteSource}
                </p>
              </section>
            )}

            {/* Key Structures */}
            {fallbackSite.keyStructures && fallbackSite.keyStructures.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-[#2E333D]">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F3]">
                    Key Architectural Structures
                  </h2>
                  <span className="text-xs text-[#B89255] font-mono">
                    {fallbackSite.keyStructures.length} Monument Units
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {fallbackSite.keyStructures.map((struct, idx) => (
                    <div
                      key={idx}
                      className="p-5 bg-[#191B20] border border-[#2E333D] hover:border-[#B89255]/50 transition-colors"
                    >
                      <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider bg-[#22262E] text-[#B89255] border border-[#2E333D] font-mono">
                        {struct.type}
                      </span>
                      <h3 className="font-serif text-lg font-semibold text-[#FAF8F3] mt-2">
                        {struct.name}
                      </h3>
                      <p className="text-xs text-[#D5C5AE] mt-2 leading-relaxed">
                        {struct.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Site Chronological Timeline */}
            {fallbackSite.timeline && fallbackSite.timeline.length > 0 && (
              <section className="space-y-6">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F3] pb-2 border-b border-[#2E333D]">
                  Archaeological Timeline
                </h2>
                <Timeline events={fallbackSite.timeline} />
              </section>
            )}

            {/* Site Map Excavation Layout */}
            <section className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-[#2E333D]">
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F3]">
                  Excavation Cadastral Layout
                </h2>
                <span className="text-xs text-[#9E9689]">Archaeological Survey Grid</span>
              </div>

              <div className="relative aspect-[16/9] bg-[#15171D] border border-[#2E333D] overflow-hidden flex flex-col items-center justify-center p-6 text-center">
                {/* SVG Blueprint lines */}
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 200">
                  <circle cx="200" cy="100" r="60" fill="none" stroke="#B89255" strokeWidth="1.5" strokeDasharray="4 4" />
                  <circle cx="200" cy="100" r="80" fill="none" stroke="#B89255" strokeWidth="1" />
                  <rect x="70" y="50" width="60" height="90" fill="none" stroke="#D5C5AE" strokeWidth="1" />
                  <rect x="270" y="50" width="60" height="90" fill="none" stroke="#D5C5AE" strokeWidth="1" />
                  <line x1="200" y1="20" x2="200" y2="180" stroke="#B89255" strokeWidth="1" />
                  <line x1="40" y1="100" x2="360" y2="100" stroke="#B89255" strokeWidth="1" />
                </svg>

                <Layers className="w-10 h-10 text-[#B89255] mb-2 z-10" />
                <h4 className="font-serif text-lg font-semibold text-[#FAF8F3] z-10">
                  {siteName} Architectural Blueprint
                </h4>
                <p className="text-xs text-[#D5C5AE] max-w-sm mt-1 z-10">
                  Ground-plan depicting the Maha Stupa drum, cardinal Ayaka platforms, and monastic Vihara cells.
                </p>
                <span className="mt-3 px-2 py-0.5 text-[10px] font-mono uppercase bg-[#121316] text-[#B89255] border border-[#B89255]/40 z-10">
                  Lat: {dbSite?.latitude || fallbackSite.coordinates?.lat}° N • Lng: {dbSite?.longitude || fallbackSite.coordinates?.lng}° E
                </span>
              </div>
            </section>

            {/* Related Artifacts from this site */}
            {relatedArtifacts.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center justify-between pb-2 border-b border-[#2E333D]">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F3]">
                    Excavated Antiquities & Inscriptions ({relatedArtifacts.length})
                  </h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/archive')}
                    className="text-xs text-[#B89255] hover:underline p-0"
                  >
                    <span>Browse All Artifacts</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {relatedArtifacts.map((art: any) => (
                    <ArtifactCard key={art.id} artifact={art} />
                  ))}
                </div>
              </section>
            )}

            {/* EXPLORE NEARBY HERITAGE (getNearbyHeritageSites) */}
            {nearbySites.length > 0 && (
              <section className="space-y-6 pt-6 border-t border-[#2E333D]">
                <div className="flex items-center justify-between pb-2 border-b border-[#2E333D]">
                  <div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F3]">
                      Explore Nearby Heritage
                    </h2>
                    <p className="text-xs text-[#9E9689] mt-0.5">
                      Monastic centers and archaeological complexes situated in proximity
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate('/map')}
                    className="text-xs text-[#B89255] hover:underline p-0"
                  >
                    <span>View Map</span>
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {nearbySites.map((nearby) => (
                    <div
                      key={nearby.id}
                      onClick={() => navigate(`/sites/${nearby.slug}`)}
                      className="group bg-[#191B20] border border-[#2E333D] hover:border-[#B89255] transition-all cursor-pointer flex flex-col overflow-hidden"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-[#121316]">
                        <img
                          src={nearby.image_url || 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80'}
                          alt={nearby.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 bg-[#121316]/90 border border-[#2E333D] text-[10px] font-mono font-semibold text-[#B89255]">
                          ~{nearby.distanceKm} km away
                        </div>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-serif text-base font-semibold text-[#FAF8F3] group-hover:text-[#B89255] transition-colors leading-snug">
                            {nearby.name}
                          </h4>
                          <p className="text-xs text-[#9E9689] mt-1">
                            {nearby.district} District • {nearby.period}
                          </p>
                        </div>
                        <div className="mt-3 pt-2 border-t border-[#2E333D]/60 flex items-center justify-between text-xs text-[#B89255]">
                          <span>Explore Site</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Sticky Sidebar: Practical Visiting Details & CTAs */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 space-y-6">
              {/* Plan Your Visit Box */}
              <div className="bg-[#191B20] border border-[#B89255]/60 p-6 shadow-xl space-y-5">
                <h3 className="font-serif text-xl font-bold text-[#FAF8F3] pb-2 border-b border-[#2E333D]">
                  Plan Your Visit
                </h3>

                <div className="space-y-3.5 text-xs text-[#D5C5AE]">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#B89255] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#FAF8F3] block">Visiting Hours</span>
                      <span>{siteHours}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Ticket className="w-4 h-4 text-[#B89255] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#FAF8F3] block">Archaeological Status</span>
                      <span>{siteArchStatus}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Navigation className="w-4 h-4 text-[#B89255] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#FAF8F3] block">District / Location</span>
                      <span>{siteDistrict} District, Telangana</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#B89255] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold text-[#FAF8F3] block">Accessibility</span>
                      <span>{siteAccessibility}</span>
                    </div>
                  </div>
                </div>

                {/* Facilities Pills */}
                <div className="pt-3 border-t border-[#2E333D] space-y-1.5">
                  <span className="text-[10px] uppercase font-semibold text-[#9E9689] block tracking-wider">
                    Site Facilities
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {siteFacilities.map((fac, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 text-[10px] bg-[#121316] text-[#D5C5AE] border border-[#2E333D]"
                      >
                        {fac}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#2E333D] space-y-2">
                  <Button
                    variant="gold"
                    onClick={() => navigate('/plan')}
                    className="w-full text-xs font-semibold"
                  >
                    <span>Include in My Itinerary</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => navigate(`/virtual-tours/${slug}`)}
                    className="w-full text-xs"
                  >
                    <Compass className="w-3.5 h-3.5 mr-1.5 text-[#B89255]" />
                    <span>360° Walkthrough</span>
                  </Button>
                </div>
              </div>

              {/* Research Guidance note */}
              <div className="p-4 bg-[#121316] border border-[#2E333D] text-xs text-[#9E9689] space-y-2">
                <div className="flex items-center gap-1.5 text-[#B89255] font-semibold">
                  <Info className="w-3.5 h-3.5" />
                  <span>Scholarly Photography Notice</span>
                </div>
                <p className="leading-relaxed">
                  Tripods and high-intensity lighting require prior written endorsement from the Telangana Department of Heritage. Non-commercial photography is permitted.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Reconstruction Interactive Modal */}
      <Modal
        isOpen={is3DModalOpen}
        onClose={() => setIs3DModalOpen(false)}
        title={`${siteName} — 3D Reconstruction`}
        subtitle="Illustrative Digital Spatial Model"
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <div className="relative aspect-[16/10] bg-[#121316] border border-[#2E333D] overflow-hidden flex items-center justify-center">
            <img
              src={siteImage}
              alt={siteName}
              className="w-full h-full object-cover brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#B89255]/20 border border-[#B89255] flex items-center justify-center text-[#B89255] mb-3">
                <Box className="w-6 h-6 animate-pulse" />
              </div>
              <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-amber-950/80 text-amber-300 border border-amber-800 mb-2">
                Illustrative Reconstruction
              </span>
              <h4 className="font-serif text-xl font-bold text-[#FAF8F3]">
                {siteName} Architectural Model
              </h4>
              <p className="text-xs text-[#D5C5AE] max-w-md mt-1">
                Visualizing the monastic structures, Chaityas, and Stupas as they appeared during the golden age of Buddhism in Telangana.
              </p>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIs3DModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={() => {
                setIs3DModalOpen(false);
                navigate(`/virtual-tours/${slug}`);
              }}
            >
              Enter 360° Walkthrough
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

