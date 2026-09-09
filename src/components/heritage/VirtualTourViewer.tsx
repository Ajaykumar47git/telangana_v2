import React, { useState } from 'react';
import { Maximize2, Minimize2, ZoomIn, ZoomOut, Compass, Info, MapPin, Eye, Volume2, Sparkles, X } from 'lucide-react';
import { VirtualTour } from '../../types/heritage';
import { Button } from '../ui/button';
import { useHeritage } from '../../context/HeritageContext';
import { AUDIO_STORIES } from '../../data/heritageData';

interface VirtualTourViewerProps {
  tour: VirtualTour;
  className?: string;
}

interface Hotspot {
  id: string;
  xPercent: number;
  yPercent: number;
  title: string;
  description: string;
  tag: string;
}

export const VirtualTourViewer: React.FC<VirtualTourViewerProps> = ({ tour, className = '' }) => {
  const { playAudio, showNotification } = useHeritage();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showInfoPanel, setShowInfoPanel] = useState(true);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);

  // Realistic archaeological hotspots for the 360 panorama viewer
  const demoHotspots: Hotspot[] = [
    {
      id: 'hs-1',
      xPercent: 32,
      yPercent: 48,
      title: 'Torana Architrave Carvings',
      description: 'Superbly preserved sandstone relief architraves showing Prince Siddhartha’s renunciation and celestial attendants.',
      tag: 'Sculptural Masterpiece'
    },
    {
      id: 'hs-2',
      xPercent: 54,
      yPercent: 58,
      title: 'Maha Stupa Drum & Ayaka Base',
      description: 'Solid brick drum encased in limestone Ayaka slabs with Brahmi dedicatory inscriptions by royal ladies of the Ikshvaku court.',
      tag: 'Sacred Architecture'
    },
    {
      id: 'hs-3',
      xPercent: 78,
      yPercent: 44,
      title: 'Apsidal Chaityagriha Vihara',
      description: 'Congregational prayer hall oriented towards the sunrise, with perimeter monastic chambers and water cisterns.',
      tag: 'Monastic Cloister'
    }
  ];

  const handleZoom = (delta: number) => {
    setZoomLevel((prev) => Math.min(2.0, Math.max(0.8, prev + delta)));
  };

  const handlePlayAudioGuide = () => {
    const matched = AUDIO_STORIES.find((a) => a.siteName.toLowerCase().includes(tour.siteName.toLowerCase()));
    if (matched) {
      playAudio(matched);
    } else {
      playAudio(AUDIO_STORIES[0]);
    }
  };

  return (
    <div
      className={`relative w-full bg-[#0D0E10] border border-[#2E333D] overflow-hidden shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen border-none' : 'h-[500px] sm:h-[620px]'
      } ${className}`}
    >
      {/* 360 Simulated Panoramic Viewport */}
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center select-none bg-radial from-[#1A1C23] to-[#0A0B0D]">
        <div
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover brightness-90 filter contrast-105"
            referrerPolicy="no-referrer"
          />

          {/* Panoramic vignette & ambient overlays */}
          <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 pointer-events-none" />

          {/* Interactive Hotspots */}
          {demoHotspots.map((hs) => (
            <div
              key={hs.id}
              style={{ left: `${hs.xPercent}%`, top: `${hs.yPercent}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <button
                onClick={() => setSelectedHotspot(hs)}
                className="relative group p-2 focus:outline-none cursor-pointer"
                aria-label={`Inspect hotspot: ${hs.title}`}
              >
                <span className="absolute inset-0 rounded-full bg-[#B89255]/40 animate-ping" />
                <div className="relative w-8 h-8 rounded-full bg-[#B89255] text-[#0D0E10] border-2 border-[#FAF8F3] shadow-lg flex items-center justify-center font-bold text-xs hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 px-2 py-0.5 bg-[#121316]/95 border border-[#B89255] text-[10px] text-[#FAF8F3] whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium">
                  {hs.title}
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Hotspot Detailed Popover Modal */}
        {selectedHotspot && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-80 sm:w-96 bg-[#191B20]/95 backdrop-blur-md border border-[#B89255] p-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-2 border-b border-[#2E333D]">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#B89255]">
                {selectedHotspot.tag}
              </span>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="text-[#9E9689] hover:text-[#FAF8F3] p-1 cursor-pointer"
                aria-label="Close hotspot"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h4 className="font-serif text-lg font-semibold text-[#FAF8F3] mt-2">
              {selectedHotspot.title}
            </h4>
            <p className="text-xs text-[#D5C5AE] mt-2 leading-relaxed">
              {selectedHotspot.description}
            </p>
            <div className="mt-4 pt-3 border-t border-[#2E333D] flex items-center justify-between">
              <span className="text-[10px] text-[#9E9689]">Photogrammetric Survey Data</span>
              <Button
                size="sm"
                variant="outline"
                className="text-xs h-7 px-2"
                onClick={() => {
                  showNotification(`Added ${selectedHotspot.title} to research notes`);
                  setSelectedHotspot(null);
                }}
              >
                Bookmark Note
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Top Banner / Status Badge */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
        <div className="bg-[#121316]/90 backdrop-blur-md border border-[#2E333D] px-3 py-1.5 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-serif font-medium text-[#FAF8F3]">
            {tour.title}
          </span>
        </div>
        {tour.status !== 'Available' && (
          <span className="px-2.5 py-1 text-[11px] font-medium bg-amber-950/80 text-amber-300 border border-amber-800/60 backdrop-blur-md">
            {tour.status}
          </span>
        )}
      </div>

      {/* Top Right Controls (Fullscreen, Audio, Info Toggle) */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 bg-[#121316]/90 backdrop-blur-md border border-[#2E333D] p-1">
        <button
          onClick={handlePlayAudioGuide}
          className="p-2 text-[#D5C5AE] hover:text-[#B89255] transition-colors cursor-pointer"
          title="Play Audio Field Guide"
          aria-label="Audio Guide"
        >
          <Volume2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => setShowInfoPanel(!showInfoPanel)}
          className={`p-2 transition-colors cursor-pointer ${
            showInfoPanel ? 'text-[#B89255]' : 'text-[#D5C5AE] hover:text-[#FAF8F3]'
          }`}
          title="Toggle Info Panel"
          aria-label="Toggle Info Panel"
        >
          <Info className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 text-[#D5C5AE] hover:text-[#FAF8F3] transition-colors cursor-pointer"
          title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          aria-label="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Bottom Left Zoom Controls & Compass */}
      <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2">
        <div className="bg-[#121316]/90 backdrop-blur-md border border-[#2E333D] flex items-center p-1">
          <button
            onClick={() => handleZoom(0.2)}
            className="p-2 text-[#D5C5AE] hover:text-[#B89255] transition-colors cursor-pointer"
            title="Zoom In"
            aria-label="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <div className="w-[1px] h-4 bg-[#2E333D]" />
          <button
            onClick={() => handleZoom(-0.2)}
            className="p-2 text-[#D5C5AE] hover:text-[#B89255] transition-colors cursor-pointer"
            title="Zoom Out"
            aria-label="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>

        {/* Compass indicator */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#121316]/90 backdrop-blur-md border border-[#2E333D] text-[11px] text-[#D5C5AE]">
          <Compass className="w-3.5 h-3.5 text-[#B89255]" />
          <span>Bearing: 042° NE</span>
        </div>
      </div>

      {/* Bottom Right Information Drawer */}
      {showInfoPanel && (
        <div className="absolute bottom-4 right-4 z-30 max-w-xs bg-[#191B20]/95 backdrop-blur-md border border-[#2E333D] p-4 hidden md:block">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#2E333D]/60 mb-2">
            <span className="text-[10px] uppercase tracking-wider text-[#B89255] font-semibold">
              360° Survey Metadata
            </span>
            <span className="text-[10px] text-[#9E9689]">{tour.district} District</span>
          </div>
          <p className="text-xs text-[#FAF8F3] font-serif font-semibold">{tour.siteName}</p>
          <p className="text-[11px] text-[#D5C5AE] mt-1 line-clamp-2 leading-relaxed">
            {tour.description}
          </p>
          <div className="mt-2.5 pt-2 border-t border-[#2E333D]/60 flex items-center justify-between text-[10px] text-[#9E9689]">
            <span>{tour.hotspotsCount} Hotspots active</span>
            <span className="text-[#B89255]">{tour.duration}</span>
          </div>
        </div>
      )}
    </div>
  );
};
