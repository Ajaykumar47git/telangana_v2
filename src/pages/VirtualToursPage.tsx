import React, { useState, useEffect } from 'react';
import {
  Compass,
  Eye,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  Box,
  Volume2,
  Headphones,
  CheckCircle2,
  Share2
} from 'lucide-react';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { PannellumViewer, TourStopData } from '../components/heritage/PannellumViewer';
import { AudioGuidePlayer } from '../components/heritage/AudioGuidePlayer';
import { Button } from '../components/ui/button';
import { useHeritage } from '../context/HeritageContext';
import { getVirtualTours, getTourStops, getHeritageSites } from '../lib/supabase';
import { DbVirtualTour, DbTourStop, DbHeritageSite } from '../types/database';
import { SEED_VIRTUAL_TOURS, SEED_TOUR_STOPS, SEED_HERITAGE_SITES } from '../data/seedData';

interface VirtualToursPageProps {
  initialSiteSlug?: string;
}

// Curated Tour Stops with Hotspots & Audio Guide data for each site
const DETAILED_TOUR_STOPS_MAP: Record<string, TourStopData[]> = {
  phanigiri: [
    {
      id: 'stop-phn-1',
      name: 'Maha Stupa Drum & Pradakshinapatha',
      description:
        'Central circular stupa drum of 18 meters diameter enclosed by carved limestone Ayaka panels and stone circumambulation pathway.',
      panoramaUrl:
        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2000&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      historicalContext:
        'The centerpiece of the Phanigiri hilltop monastery, patronized by royal ladies of the Ikshvaku dynasty in the 3rd century CE.',
      relatedArtifact: {
        id: '22222222-2222-2222-2222-222222222201',
        name: 'Phanigiri Torana Carved Architrave',
        type: 'Sculptures',
        image:
          'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80'
      },
      hotspots: [
        {
          id: 'hs-phn-1a',
          pitch: 8,
          yaw: -24,
          title: 'Ayaka Drum Platform',
          description:
            'Cardinal rectangular projection with slots for five monolithic octagonal limestone pillars.',
          historicalContext:
            'Dedicated by royal physician Dharmasena as recorded in the 8-line Brahmi epigraph.',
          relatedArtifact: {
            id: '22222222-2222-2222-2222-222222222202',
            name: 'Brahmi Inscribed Ayaka Octagonal Pillar',
            type: 'Inscriptions',
            image:
              'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80'
          }
        },
        {
          id: 'hs-phn-1b',
          pitch: -12,
          yaw: 45,
          title: 'Circumambulation Flagstones',
          description:
            'Paved stone pathway where Buddhist monks practiced walking contemplation (Chankamana).',
          historicalContext:
            'Worn smooth by thousands of monastic pilgrims traversing between Paithan and the Krishna delta.'
        }
      ]
    },
    {
      id: 'stop-phn-2',
      name: 'Monolithic Torana Gateway Arch',
      description:
        'Celebrated sandstone torana architrave illustrating the Great Renunciation of Prince Siddhartha.',
      panoramaUrl:
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      historicalContext:
        'One of only three surviving complete early historic torana gateways in the Indian subcontinent.',
      hotspots: [
        {
          id: 'hs-phn-2a',
          pitch: 15,
          yaw: 10,
          title: 'Architrave Spiral Volutes',
          description:
            'Carved makara terminals and celestial yakshis flanking the narrative scenes of the Buddha’s renunciation.',
          historicalContext:
            'Stylistically related to the mature classical style of the Sanchi and Amaravati sculptural ateliers.'
        }
      ]
    },
    {
      id: 'stop-phn-3',
      name: 'Apsidal Chaityagriha Prayer Sanctuary',
      description:
        'Apsidal worship hall overlooking the fertile Alair river valley, oriented toward the sunrise.',
      panoramaUrl:
        'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=2000&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      historicalContext:
        'Used for congregational chanting and recitation of the Pratimoksha monastic rules during fortnightly Uposatha observances.'
    },
    {
      id: 'stop-phn-4',
      name: 'Monks’ Vihara Residential Quadrangle',
      description:
        'Individual monastic cells, dining refectory, stone beds, and ancient rainwater cistern.',
      panoramaUrl:
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      historicalContext:
        'Housed the resident Sangha belonging to the Dhammottariya sect as attested by discovered pottery stamps.'
    }
  ],
  dhulikatta: [
    {
      id: 'stop-dkt-1',
      name: 'Dhulikatta Maha Stupa Drum & Base',
      description:
        'Early historic baked-brick hemispherical dome dating to 3rd century BCE with Ayaka casing platforms.',
      panoramaUrl:
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2000&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      historicalContext:
        'Constructed during the Mauryan and early Satavahana periods, representing one of Telangana’s oldest stupas.',
      hotspots: [
        {
          id: 'hs-dkt-1a',
          pitch: 5,
          yaw: -30,
          title: 'Muchalinda Naga Ayaka Slab Spot',
          description:
            'Findspot of the limestone relief depicting the seven-hooded serpent Muchalinda sheltering the Buddha.',
          historicalContext:
            'Demonstrates the peaceful synthesis of indigenous Naga veneration into early Deccan Buddhism.',
          relatedArtifact: {
            id: '22222222-2222-2222-2222-222222222203',
            name: 'Muchalinda Naga Protective Slab',
            type: 'Sculptures',
            image:
              'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=600&q=80'
          }
        }
      ]
    },
    {
      id: 'stop-dkt-2',
      name: 'Fortified North Gateway & Mud Ramparts',
      description:
        'Ancient baked-brick gateway and massive earthen ramparts enclosing the 45-acre Satavahana fortified town.',
      panoramaUrl:
        'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2000&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
      historicalContext:
        'Corresponds to the fortified towns in the Andhra country mentioned by Megasthenes in his Indika.'
    }
  ],
  nelakondapalli: [
    {
      id: 'stop-nkp-1',
      name: 'Colossal Brick Stupa Spoke Wheel Core',
      description:
        'The monumental 16-meter high brick stupa constructed with an internal radial wheel-spoke structural core.',
      panoramaUrl:
        'https://images.unsplash.com/photo-1599839575945-a9e5af0c3fa5?auto=format&fit=crop&w=2000&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      historicalContext:
        'The largest solid brick stupa in South India, with subterranean monastic cisterns and discovery pit of colossal bronze Buddhas.'
    }
  ],
  'nagarjuna-konda': [
    {
      id: 'stop-njk-1',
      name: 'Maha Chaitya Site 1 Island Sanctuary',
      description:
        'The reconstructed principal reliquary stupa and royal monastery on the hill island in the Krishna reservoir.',
      panoramaUrl:
        'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=2000&q=80',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
      historicalContext:
        'Salvaged from the submerged valley of Vijayapuri during the landmark 1954–1960 archaeological excavations.'
    }
  ]
};

export const VirtualToursPage: React.FC<VirtualToursPageProps> = ({
  initialSiteSlug = 'phanigiri'
}) => {
  const { navigate } = useHeritage();
  const [activeSiteSlug, setActiveSiteSlug] = useState<string>(initialSiteSlug);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [sites, setSites] = useState<DbHeritageSite[]>(SEED_HERITAGE_SITES);
  const [tours, setTours] = useState<DbVirtualTour[]>(SEED_VIRTUAL_TOURS);
  const [loading, setLoading] = useState(true);

  // Sync initial site slug from URL props
  useEffect(() => {
    if (initialSiteSlug) {
      setActiveSiteSlug(initialSiteSlug);
      setCurrentStopIndex(0);
    }
  }, [initialSiteSlug]);

  // Load live data from Supabase
  useEffect(() => {
    Promise.all([getHeritageSites(), getVirtualTours()])
      .then(([sitesData, toursData]) => {
        if (sitesData && sitesData.length > 0) setSites(sitesData);
        if (toursData && toursData.length > 0) setTours(toursData);
      })
      .catch((err) => console.error('Failed to fetch tours from Supabase:', err))
      .finally(() => setLoading(false));
  }, []);

  // Determine current active site
  const currentSite =
    sites.find((s) => s.slug === activeSiteSlug) ||
    sites.find((s) => s.slug === 'phanigiri') ||
    sites[0];

  // Get tour stops for active site
  const currentStops: TourStopData[] =
    DETAILED_TOUR_STOPS_MAP[activeSiteSlug] || DETAILED_TOUR_STOPS_MAP['phanigiri'];

  const activeStop = currentStops[currentStopIndex] || currentStops[0];

  const handleSelectSite = (slug: string) => {
    setActiveSiteSlug(slug);
    setCurrentStopIndex(0);
    window.history.pushState(null, '', `/virtual-tours/${slug}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Virtual Tours', path: '/virtual-tours' },
          { label: currentSite?.name || activeSiteSlug }
        ]}
      />

      {/* Header */}
      <div className="border-b border-[#2E333D] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-2">
            <Compass className="w-4 h-4" />
            <span>Pannellum 360° Spherical Photogrammetry &bull; Telepresence</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F3]">
            {currentSite?.name || '360° Virtual Walkthrough'}
          </h1>
          <p className="text-sm sm:text-base text-[#D5C5AE] max-w-2xl mt-2 leading-relaxed">
            Step onto the archaeological excavation mounds of Telangana. Rotate the panoramic view, click interactive architectural hotspots, and inspect ancient inscriptions in high resolution.
          </p>
        </div>

        {/* Action Link to 3D Experience (Requirement 6) */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <Button
            variant="gold"
            size="sm"
            onClick={() => navigate(`/experience/${activeSiteSlug}`)}
            className="text-xs"
          >
            <Box className="w-4 h-4 mr-1.5" />
            <span>Switch to 3D Reconstruction</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/sites/${activeSiteSlug}`)}
            className="text-xs"
          >
            <span>Site Detail</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>

      {/* Tour Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#2E333D]/60 no-scrollbar">
        <span className="text-xs font-mono uppercase text-[#9E9689] shrink-0 mr-2">
          Select Sanctuary:
        </span>
        {sites.map((siteItem) => {
          const isSelected = siteItem.slug === activeSiteSlug;
          const stopsCount = (DETAILED_TOUR_STOPS_MAP[siteItem.slug] || []).length || 1;

          return (
            <button
              key={siteItem.id}
              onClick={() => handleSelectSite(siteItem.slug)}
              className={`px-3.5 py-2 text-xs whitespace-nowrap border transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-bold shadow-lg'
                  : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>{siteItem.name.replace(' Buddhist Complex', '').replace(' Archaeological Complex', '')}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 font-mono ${
                  isSelected ? 'bg-[#0D0E10] text-[#FAF8F3]' : 'bg-[#121316] text-[#B89255]'
                }`}
              >
                {stopsCount} Stops
              </span>
            </button>
          );
        })}
      </div>

      {/* 1. PANNELLUM 360° SPHERICAL VIEWER (Requirements 1, 2, 3, 4) */}
      <section className="space-y-4">
        <PannellumViewer
          siteSlug={activeSiteSlug}
          siteName={currentSite?.name || 'Sanctuary'}
          district={currentSite?.district || 'Telangana'}
          stops={currentStops}
          currentStopIndex={currentStopIndex}
          onSelectStop={(idx) => setCurrentStopIndex(idx)}
        />
      </section>

      {/* 2. MULTI-LANGUAGE AUDIO GUIDE PLAYER (Requirement 5) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center gap-2">
            <Headphones className="w-4 h-4 text-[#B89255]" />
            <h3 className="font-serif text-lg font-bold text-[#FAF8F3]">
              Curated Audio Guide &bull; {activeStop?.name}
            </h3>
          </div>
          <span className="text-xs text-[#9E9689] font-mono">
            Languages: English &bull; Telugu &bull; Hindi
          </span>
        </div>

        <AudioGuidePlayer
          title={activeStop?.name || 'Walkthrough Audio'}
          siteName={currentSite?.name || 'Buddhist Sanctuary'}
          stopName={`Stop #${currentStopIndex + 1}`}
          audioUrl={activeStop?.audioUrl}
        />
      </section>

      {/* 3. ARCHAEOLOGICAL FIELD ELEMENTS GUIDE */}
      <div className="bg-[#191B20] border border-[#2E333D] p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-[#2E333D]">
          <div>
            <h3 className="font-serif text-xl font-bold text-[#FAF8F3]">
              What to Look For in {currentSite?.name}
            </h3>
            <p className="text-xs text-[#D5C5AE] mt-1">
              Archaeological elements identifiable within the 360° photogrammetry scene.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate(`/sites/${activeSiteSlug}`)}
            className="text-xs"
          >
            <span>View Full Site Record</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#D5C5AE]">
          <div className="p-4 bg-[#121316] border border-[#2E333D]">
            <span className="text-[#B89255] font-semibold uppercase tracking-wider block mb-1.5">
              1. Ayaka Pillars & Platforms
            </span>
            <p className="leading-relaxed">
              Cardinal projections extending from the circular stupa base, dedicated by royal donors of the Satavahana and Ikshvaku courts.
            </p>
          </div>
          <div className="p-4 bg-[#121316] border border-[#2E333D]">
            <span className="text-[#B89255] font-semibold uppercase tracking-wider block mb-1.5">
              2. Carved Torana Gateways
            </span>
            <p className="leading-relaxed">
              Ornamental limestone and sandstone arches illustrating Jataka narratives, Mara’s temptation, and sacred symbols like the Dharmachakra.
            </p>
          </div>
          <div className="p-4 bg-[#121316] border border-[#2E333D]">
            <span className="text-[#B89255] font-semibold uppercase tracking-wider block mb-1.5">
              3. Vihara Cells & Water Cisterns
            </span>
            <p className="leading-relaxed">
              Monastic living quarters carved with stone beds, drain channels, and rock-cut cisterns designed for self-sustaining retreat life.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
