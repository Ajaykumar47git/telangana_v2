import React, { useState, useEffect } from 'react';
import {
  Box,
  Compass,
  ArrowRight,
  Layers,
  Sparkles,
  Info,
  Calendar,
  MapPin,
  Share2,
  Bookmark,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Heritage3DViewer } from '../components/heritage/Heritage3DViewer';
import { ThenVsNowSlider } from '../components/heritage/ThenVsNowSlider';
import { Button } from '../components/ui/button';
import { useHeritage } from '../context/HeritageContext';
import { getHeritageSites, getHeritageSiteBySlug } from '../lib/supabase';
import { DbHeritageSite } from '../types/database';
import { SEED_HERITAGE_SITES } from '../data/seedData';

interface Experience3DPageProps {
  slug?: string;
}

interface Site3DMetadata {
  slug: string;
  hasModel: boolean;
  historicalImage: string;
  presentImage: string;
  historicalPeriod: string;
  historicalDescription: string;
  presentDescription: string;
  modelUrl?: string | null;
}

const SITES_3D_REGISTRY: Record<string, Site3DMetadata> = {
  phanigiri: {
    slug: 'phanigiri',
    hasModel: true,
    historicalImage:
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1400&q=80',
    presentImage:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
    historicalPeriod: 'Ikshvaku Period (3rd c. CE)',
    historicalDescription:
      'Visualizing the pristine white-lime encased Maha Stupa with carved Torana gate and marble Ayaka platforms overlooking the Alair river valley.',
    presentDescription:
      'Excavated foundation trenches, conserved brick drum, and restored stone torana components preserved atop the granite hillock.'
  },
  dhulikatta: {
    slug: 'dhulikatta',
    hasModel: true,
    historicalImage:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
    presentImage:
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1400&q=80',
    historicalPeriod: 'Early Satavahana (2nd c. BCE)',
    historicalDescription:
      'A massive early historic baked-brick dome flanked by seven-hooded Muchalinda Naga relief slabs and fortified mud citadel ramparts.',
    presentDescription:
      'The conserved brick hemispherical mound rising above the cotton fields, with visible pradakshinapatha ring walls and Ayaka slabs.'
  },
  nelakondapalli: {
    slug: 'nelakondapalli',
    hasModel: true,
    historicalImage:
      'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=1400&q=80',
    presentImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    historicalPeriod: 'Satavahana / Ikshvaku (2nd–3rd c. CE)',
    historicalDescription:
      'South India’s colossal solid brick stupa constructed with an internal wheel-spoke framework, multiple circumambulatory tiers, and colossal bronze icons.',
    presentDescription:
      'The massive excavated 16-meter brick mound known locally as Virabhadra Gutta with subterranean cisterns and monastic cell bases.'
  },
  'nagarjuna-konda': {
    slug: 'nagarjuna-konda',
    hasModel: true,
    historicalImage:
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1400&q=80',
    presentImage:
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1400&q=80',
    historicalPeriod: 'Ikshvaku Imperial Capital (3rd c. CE)',
    historicalDescription:
      'The thriving university valley of Vijayapuri with international viharas for Ceylonese and Chinese monks, grand Mahachaityas, and amphitheater.',
    presentDescription:
      'Salvation island sanctuary surrounded by the Nagarjuna Sagar reservoir, housing translocated monuments and the ASI island museum.'
  },
  kondapur: {
    slug: 'kondapur',
    hasModel: true,
    historicalImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    presentImage:
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1400&q=80',
    historicalPeriod: 'Satavahana Manufacturing Epoch (1st c. CE)',
    historicalDescription:
      'Urban Buddhist chaityagriha workshops and bead-making centers engaged in bustling Mediterranean gold coin exchange.',
    presentDescription:
      'The circular apsidal chaitya foundations and on-site ASI museum housing thousands of beads, molds, and terracottas.'
  },
  badankurthi: {
    slug: 'badankurthi',
    hasModel: false, // Triggers Requirement 10: Model Fallback
    historicalImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    presentImage:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=80',
    historicalPeriod: 'Early Historic (2nd c. BCE)',
    historicalDescription: 'River island meditation retreat on the Godavari.',
    presentDescription: 'Granite bedrock terraces and steps on the river islet.'
  }
};

export const Experience3DPage: React.FC<Experience3DPageProps> = ({ slug = 'phanigiri' }) => {
  const { navigate } = useHeritage();
  const [site, setSite] = useState<DbHeritageSite | null>(null);
  const [allSites, setAllSites] = useState<DbHeritageSite[]>(SEED_HERITAGE_SITES);
  const [activeSlug, setActiveSlug] = useState<string>(slug);
  const [loading, setLoading] = useState(true);

  // Fetch site data
  useEffect(() => {
    setLoading(true);
    getHeritageSites().then((sitesList) => {
      setAllSites(sitesList);
      const matched = sitesList.find((s) => s.slug === activeSlug) || sitesList[0];
      setSite(matched);
      setLoading(false);
    });
  }, [activeSlug]);

  const siteMeta = SITES_3D_REGISTRY[activeSlug] || {
    slug: activeSlug,
    hasModel: true,
    historicalImage:
      site?.image_url ||
      'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1400&q=80',
    presentImage:
      site?.image_url ||
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
    historicalPeriod: site?.period || 'Satavahana / Ikshvaku',
    historicalDescription:
      'Hypothetical spatial reconstruction derived from stratified brick dimensions and architectural reliefs.',
    presentDescription: site?.description || 'Preserved archaeological monument.'
  };

  const handleSelectSite = (newSlug: string) => {
    setActiveSlug(newSlug);
    window.history.pushState(null, '', `/experience/${newSlug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: '3D Heritage Reconstruction', path: '/experience' },
          { label: site?.name || activeSlug }
        ]}
      />

      {/* Page Header */}
      <div className="border-b border-[#2E333D] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-2">
            <Box className="w-4 h-4" />
            <span>Three.js &bull; React Three Fiber &bull; Spatial Photogrammetry</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F3]">
            {site?.name || 'Buddhist 3D Heritage Reconstruction'}
          </h1>
          <p className="text-sm sm:text-base text-[#D5C5AE] max-w-2xl mt-2 leading-relaxed">
            Manipulate spatial geometry, inspect architectural components in 3D, and compare ancient Buddhist sanctuaries against their present archaeological excavation states.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/virtual-tours/${activeSlug}`)}
            className="text-xs"
          >
            <Compass className="w-4 h-4 mr-1.5 text-[#B89255]" />
            <span>360° Virtual Tour</span>
          </Button>
          <Button
            variant="gold"
            size="sm"
            onClick={() => navigate(`/sites/${activeSlug}`)}
            className="text-xs"
          >
            <span>Full Site Archive</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>

      {/* Site Switcher Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#2E333D]/60 no-scrollbar">
        <span className="text-xs font-mono uppercase text-[#9E9689] shrink-0 mr-2">
          Sanctuary 3D Models:
        </span>
        {allSites.map((s) => {
          const isSelected = s.slug === activeSlug;
          const meta = SITES_3D_REGISTRY[s.slug];
          const has3D = meta ? meta.hasModel : true;

          return (
            <button
              key={s.id}
              onClick={() => handleSelectSite(s.slug)}
              className={`px-3 py-1.5 text-xs whitespace-nowrap border transition-all cursor-pointer flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-semibold shadow-md'
                  : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]'
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>{s.name.replace(' Buddhist Complex', '').replace(' Archaeological Complex', '')}</span>
              {!has3D && (
                <span className="text-[9px] px-1 bg-amber-950/80 text-amber-300 border border-amber-800 font-mono">
                  Soon
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 1. THREE.JS 3D MODEL VIEWER (Requirements 6, 7, 8, 10, 11) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B89255] animate-pulse" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF8F3]">
              Interactive 3D Architectural Model
            </h2>
          </div>
          <span className="text-xs text-[#9E9689] font-mono hidden sm:inline">
            Drag to Rotate &bull; Scroll to Zoom &bull; Click Hotspots
          </span>
        </div>

        <Heritage3DViewer
          siteSlug={activeSlug}
          siteName={site?.name || 'Buddhist Sanctuary'}
          district={site?.district || 'Telangana'}
          hasModel={siteMeta.hasModel}
          modelUrl={siteMeta.modelUrl}
        />
      </section>

      {/* 2. THEN VS NOW COMPARISON SLIDER (Requirement 9) */}
      <section className="space-y-4 pt-6">
        <div className="flex items-center justify-between pb-2 border-b border-[#2E333D]">
          <div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF8F3]">
              Then vs. Now: Historical Reconstruction & Ground Reality
            </h2>
            <p className="text-xs text-[#D5C5AE] mt-0.5">
              Interactive split-plane slider correlating architectural reconstruction against excavated archaeological mounds.
            </p>
          </div>
        </div>

        <ThenVsNowSlider
          siteName={site?.name || 'Sanctuary'}
          historicalImage={siteMeta.historicalImage}
          historicalLabel={`Historical Reconstruction — ${site?.name}`}
          historicalPeriod={siteMeta.historicalPeriod}
          historicalDescription={siteMeta.historicalDescription}
          presentImage={siteMeta.presentImage}
          presentLabel={`Present Excavation State — ${site?.name}`}
          presentDescription={siteMeta.presentDescription}
        />
      </section>

      {/* 3. ARCHAEOLOGICAL METHODOLOGY NOTES */}
      <div className="bg-[#191B20] border border-[#2E333D] p-6 sm:p-8 space-y-4">
        <div className="flex items-center gap-2 text-xs uppercase font-mono text-[#B89255] font-semibold">
          <BookOpen className="w-4 h-4" />
          <span>Epigraphical & Architectural Reconstruction Methodology</span>
        </div>
        <h3 className="font-serif text-lg font-bold text-[#FAF8F3]">
          How SanghaTelangana Reconstructs 3D Sacred Geometry
        </h3>
        <p className="text-xs sm:text-sm text-[#D5C5AE] leading-relaxed">
          The 3D reconstructions presented on this platform adhere strictly to archaeological integrity. Measurements are derived from stratified excavation reports published by the Department of Heritage Telangana and the Archaeological Survey of India (ASI). Carved relief sculptures from Amaravati, Nagarjunakonda, and Phanigiri depicting Chaityagrihas and Stupas serve as direct primary sources for superstructures, harmikas, and chhatravalis.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-[#FAF8F3]">
          <div className="p-3 bg-[#121316] border border-[#2E333D]">
            <strong className="text-[#B89255] block mb-1">Brick Proportions:</strong>
            Standard 52 × 26 × 8 cm early historic Satavahana baked bricks dictate drum and stupa circumferences.
          </div>
          <div className="p-3 bg-[#121316] border border-[#2E333D]">
            <strong className="text-[#B89255] block mb-1">Ayaka Platform Alignment:</strong>
            Cardinal projections oriented mathematically to the equinoxes, confirmed by epigraphical donation records.
          </div>
          <div className="p-3 bg-[#121316] border border-[#2E333D]">
            <strong className="text-[#B89255] block mb-1">Non-Fabrication Policy:</strong>
            Reconstructed elements without in-situ physical proof are labeled as illustrative hypotheses.
          </div>
        </div>
      </div>
    </div>
  );
};
