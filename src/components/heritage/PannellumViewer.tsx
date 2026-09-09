import React, { useEffect, useRef, useState } from 'react';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Volume2,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Compass,
  MapPin,
  BookOpen,
  ArrowRight,
  Layers,
  X,
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/button';
import { useHeritage } from '../../context/HeritageContext';
import { AudioGuidePlayer } from './AudioGuidePlayer';

declare global {
  interface Window {
    pannellum?: any;
  }
}

export interface TourStopData {
  id: string;
  name: string;
  description: string;
  panoramaUrl: string;
  hotspotPosition?: { x: number; y: number };
  audioUrl?: string | null;
  historicalContext?: string;
  relatedArtifact?: {
    name: string;
    id: string;
    type: string;
    image: string;
  };
  hotspots?: {
    id: string;
    pitch: number;
    yaw: number;
    title: string;
    description: string;
    historicalContext: string;
    relatedArtifact?: {
      id: string;
      name: string;
      type: string;
      image: string;
    };
    audioUrl?: string | null;
  }[];
}

interface PannellumViewerProps {
  siteSlug: string;
  siteName: string;
  district: string;
  stops: TourStopData[];
  currentStopIndex: number;
  onSelectStop: (index: number) => void;
  className?: string;
}

export const PannellumViewer: React.FC<PannellumViewerProps> = ({
  siteSlug,
  siteName,
  district,
  stops,
  currentStopIndex,
  onSelectStop,
  className = ''
}) => {
  const { navigate } = useHeritage();
  const containerRef = useRef<HTMLDivElement>(null);
  const pannellumInstanceRef = useRef<any>(null);
  const containerId = useRef(`pannellum-container-${Math.random().toString(36).substr(2, 9)}`);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<any | null>(null);
  const [isAudioModalOpen, setIsAudioModalOpen] = useState(false);
  const [activeAudioStop, setActiveAudioStop] = useState<any | null>(null);
  const [viewerReady, setViewerReady] = useState(false);

  // Fallback drag navigation state if Pannellum WebGL encounters issue
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1);
  const dragStartRef = useRef({ x: 0, y: 0, rotX: 0, rotY: 0 });

  const currentStop = stops[currentStopIndex] || stops[0];
  const prevStop = currentStopIndex > 0 ? stops[currentStopIndex - 1] : null;
  const nextStop = currentStopIndex < stops.length - 1 ? stops[currentStopIndex + 1] : null;

  // Initialize or update Pannellum Viewer
  useEffect(() => {
    let timer: number;

    const initPannellum = () => {
      if (!containerRef.current) return;

      // Check if window.pannellum is loaded
      if (typeof window !== 'undefined' && window.pannellum) {
        try {
          // Destroy previous instance
          if (pannellumInstanceRef.current && typeof pannellumInstanceRef.current.destroy === 'function') {
            pannellumInstanceRef.current.destroy();
            pannellumInstanceRef.current = null;
          }

          // Build hotspot configs
          const pannerHotspots = (currentStop?.hotspots || []).map((hs) => ({
            pitch: hs.pitch,
            yaw: hs.yaw,
            type: 'info',
            text: hs.title,
            clickHandlerFunc: () => {
              setActiveHotspot(hs);
            }
          }));

          // Mount Pannellum
          pannellumInstanceRef.current = window.pannellum.viewer(containerId.current, {
            type: 'equirectangular',
            panorama: currentStop.panoramaUrl,
            autoLoad: true,
            autoRotate: -1.2,
            compass: true,
            showZoomCtrl: false,
            showFullscreenCtrl: false,
            hotSpots: pannerHotspots,
            hfov: 100,
            minHfov: 50,
            maxHfov: 120
          });

          setViewerReady(true);
        } catch (err) {
          console.warn('Pannellum init fallback enabled:', err);
          setViewerReady(false);
        }
      } else {
        // Retry shortly if script is still downloading from CDN
        timer = window.setTimeout(initPannellum, 300);
      }
    };

    initPannellum();

    return () => {
      if (timer) clearTimeout(timer);
      if (pannellumInstanceRef.current && typeof pannellumInstanceRef.current.destroy === 'function') {
        try {
          pannellumInstanceRef.current.destroy();
        } catch (e) {
          // ignore cleanup errors
        }
        pannellumInstanceRef.current = null;
      }
    };
  }, [currentStop?.panoramaUrl, currentStop?.id]);

  // Controls Handlers
  const handleZoom = (delta: number) => {
    if (pannellumInstanceRef.current && typeof pannellumInstanceRef.current.setHfov === 'function') {
      const currentHfov = pannellumInstanceRef.current.getHfov();
      pannellumInstanceRef.current.setHfov(Math.max(50, Math.min(120, currentHfov - delta * 15)));
    } else {
      setZoomLevel((prev) => Math.max(0.8, Math.min(2.5, prev + delta * 0.2)));
    }
  };

  const handleReset = () => {
    if (pannellumInstanceRef.current && typeof pannellumInstanceRef.current.lookAt === 'function') {
      pannellumInstanceRef.current.lookAt(0, 0, 100, 1000);
    } else {
      setRotation({ x: 0, y: 0 });
      setZoomLevel(1);
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Fallback drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (viewerReady) return;
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rotX: rotation.x,
      rotY: rotation.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || viewerReady) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setRotation({
      x: dragStartRef.current.rotX + dy * 0.2,
      y: dragStartRef.current.rotY + dx * 0.2
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full bg-[#090A0C] border border-[#2E333D] overflow-hidden shadow-2xl ${
        isFullscreen ? 'fixed inset-0 z-50 h-screen w-screen border-none' : 'h-[560px] sm:h-[660px]'
      } ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Pannellum Mounting Container */}
      <div id={containerId.current} className="w-full h-full" />

      {/* Robust Fallback Viewport if Pannellum CDN is offline/pending */}
      {!viewerReady && (
        <div className="absolute inset-0 overflow-hidden flex items-center justify-center bg-radial from-[#1A1C23] to-[#0A0B0D] select-none cursor-grab active:cursor-grabbing">
          <div
            className="w-full h-full transition-transform duration-75 ease-out"
            style={{
              transform: `scale(${zoomLevel}) rotateX(${rotation.x * 0.1}deg) rotateY(${rotation.y * 0.1}deg)`
            }}
          >
            <img
              src={currentStop.panoramaUrl}
              alt={currentStop.name}
              className="w-full h-full object-cover brightness-95 filter contrast-105"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Interactive Fallback Hotspot Pins */}
          {(currentStop.hotspots || []).map((hs) => (
            <button
              key={hs.id}
              onClick={(e) => {
                e.stopPropagation();
                setActiveHotspot(hs);
              }}
              style={{
                left: `${50 + (hs.yaw / 180) * 40}%`,
                top: `${50 - (hs.pitch / 90) * 35}%`
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
            >
              <div className="relative flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-[#B89255]/30 border-2 border-[#B89255] animate-ping absolute" />
                <div className="w-8 h-8 rounded-full bg-[#191B20] border-2 border-[#B89255] text-[#FAF8F3] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                  <Sparkles className="w-4 h-4 text-[#E8C868]" />
                </div>
                <div className="hidden group-hover:block absolute top-full mt-1 px-2.5 py-1 bg-[#121316]/95 border border-[#B89255] text-[11px] text-[#FAF8F3] font-serif whitespace-nowrap shadow-xl">
                  {hs.title}
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Top Overlay HUD: Site & Stop Info */}
      <div className="absolute top-4 left-4 right-4 flex items-start justify-between pointer-events-none z-30">
        <div className="bg-[#121316]/90 border border-[#2E333D] backdrop-blur-md p-3 max-w-sm pointer-events-auto">
          <div className="flex items-center gap-2 text-[10px] uppercase font-mono text-[#B89255] font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>360° Photogrammetry Walkthrough &bull; {district}</span>
          </div>
          <h3 className="font-serif text-base sm:text-lg font-bold text-[#FAF8F3] mt-0.5 truncate">
            {siteName}
          </h3>
          <p className="text-xs text-[#D5C5AE] mt-0.5 flex items-center gap-1.5 font-sans">
            <MapPin className="w-3 h-3 text-[#B89255] shrink-0" />
            <span>{currentStop.name}</span>
          </p>
        </div>

        {/* Viewport Control Tools */}
        <div className="flex items-center gap-1 bg-[#121316]/90 border border-[#2E333D] p-1.5 backdrop-blur-md pointer-events-auto shadow-xl">
          <button
            onClick={() => handleZoom(1)}
            className="p-2 text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#191B20] transition-colors cursor-pointer"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleZoom(-1)}
            className="p-2 text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#191B20] transition-colors cursor-pointer"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#191B20] transition-colors cursor-pointer"
            title="Reset View"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsAudioModalOpen(true)}
            className="p-2 text-[#B89255] hover:text-[#E8C868] hover:bg-[#191B20] transition-colors cursor-pointer"
            title="Audio Guide"
          >
            <Volume2 className="w-4 h-4" />
          </button>
          <button
            onClick={toggleFullscreen}
            className="p-2 text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#191B20] transition-colors cursor-pointer"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mini-Tour Navigation Panel (Requirement 4) */}
      <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-30 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        {/* Previous Stop / Current Stop / Next Stop Stepper */}
        <div className="bg-[#121316]/95 border border-[#B89255]/70 p-3 backdrop-blur-md pointer-events-auto shadow-2xl flex items-center gap-3">
          {/* Previous Stop Button */}
          <button
            disabled={!prevStop}
            onClick={() => prevStop && onSelectStop(currentStopIndex - 1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border transition-all cursor-pointer ${
              prevStop
                ? 'bg-[#191B20] border-[#2E333D] hover:border-[#B89255] text-[#FAF8F3]'
                : 'bg-transparent border-[#2E333D]/40 text-[#6B7280] cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous Stop</span>
          </button>

          {/* Current Stop Display */}
          <div className="text-center px-2">
            <span className="text-[10px] uppercase font-mono text-[#B89255] block">
              Current Stop ({currentStopIndex + 1} of {stops.length})
            </span>
            <span className="font-serif text-xs sm:text-sm font-bold text-[#FAF8F3] block truncate max-w-[150px] sm:max-w-[220px]">
              {currentStop.name}
            </span>
          </div>

          {/* Next Stop Button */}
          <button
            disabled={!nextStop}
            onClick={() => nextStop && onSelectStop(currentStopIndex + 1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border transition-all cursor-pointer ${
              nextStop
                ? 'bg-[#191B20] border-[#2E333D] hover:border-[#B89255] text-[#FAF8F3]'
                : 'bg-transparent border-[#2E333D]/40 text-[#6B7280] cursor-not-allowed'
            }`}
          >
            <span className="hidden sm:inline">Next Stop</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mini Stops Thumbnails Strip */}
        <div className="hidden md:flex items-center gap-2 bg-[#121316]/90 border border-[#2E333D] p-2 backdrop-blur-md pointer-events-auto">
          {stops.map((stop, idx) => {
            const isSelected = idx === currentStopIndex;
            return (
              <button
                key={stop.id}
                onClick={() => onSelectStop(idx)}
                className={`group relative w-16 h-11 overflow-hidden border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#B89255] ring-2 ring-[#B89255]/40 scale-105'
                    : 'border-[#2E333D] opacity-70 hover:opacity-100'
                }`}
                title={stop.name}
              >
                <img
                  src={stop.panoramaUrl}
                  alt={stop.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] text-[#FAF8F3] font-mono text-center truncate px-0.5">
                  #{idx + 1}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hotspot Information Panel (Requirement 3) */}
      {activeHotspot && (
        <div className="absolute inset-0 z-40 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#191B20] border border-[#B89255] max-w-lg w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex items-start justify-between pb-3 border-b border-[#2E333D]">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#B89255] block">
                  Archaeological Hotspot &bull; Spatial Analysis
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#FAF8F3] mt-0.5">
                  {activeHotspot.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveHotspot(null)}
                className="p-1.5 text-[#9E9689] hover:text-[#FAF8F3] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Structure Description */}
            <div className="space-y-3 text-xs sm:text-sm text-[#D5C5AE] leading-relaxed">
              <p>{activeHotspot.description}</p>

              {/* Historical Context */}
              {activeHotspot.historicalContext && (
                <div className="p-3 bg-[#121316] border border-[#2E333D] space-y-1">
                  <span className="text-[10px] uppercase font-mono text-[#B89255] font-semibold block">
                    Historical Context
                  </span>
                  <p className="text-xs text-[#FAF8F3] italic">
                    {activeHotspot.historicalContext}
                  </p>
                </div>
              )}

              {/* Related Artifact */}
              {activeHotspot.relatedArtifact && (
                <div className="p-3 bg-[#15171D] border border-[#B89255]/40 flex items-center gap-3">
                  <div className="w-14 h-14 bg-[#0D0E10] border border-[#2E333D] overflow-hidden shrink-0">
                    <img
                      src={activeHotspot.relatedArtifact.image}
                      alt={activeHotspot.relatedArtifact.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase font-mono text-[#B89255] block">
                      Related Artifact ({activeHotspot.relatedArtifact.type})
                    </span>
                    <h5 className="font-serif text-xs font-bold text-[#FAF8F3] truncate">
                      {activeHotspot.relatedArtifact.name}
                    </h5>
                    <button
                      onClick={() => {
                        setActiveHotspot(null);
                        navigate(`/archive/artifacts/${activeHotspot.relatedArtifact.id}`);
                      }}
                      className="text-[10px] text-[#B89255] hover:text-[#E8C868] flex items-center gap-1 mt-1 cursor-pointer font-medium"
                    >
                      <span>Examine in Archive</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hotspot Actions (Audio Button + Close) */}
            <div className="pt-2 border-t border-[#2E333D] flex items-center justify-between gap-3">
              <Button
                variant="gold"
                size="sm"
                onClick={() => {
                  setActiveAudioStop(activeHotspot);
                  setIsAudioModalOpen(true);
                }}
                className="text-xs flex items-center gap-1.5"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>Listen to Audio Guide</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveHotspot(null)}
                className="text-xs"
              >
                Return to Panorama
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Audio Guide Modal (Requirement 5) */}
      {isAudioModalOpen && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full relative">
            <button
              onClick={() => setIsAudioModalOpen(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#191B20] border border-[#B89255] text-[#FAF8F3] flex items-center justify-center shadow-2xl z-10 hover:bg-[#B89255] hover:text-[#0D0E10] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <AudioGuidePlayer
              title={activeAudioStop ? activeAudioStop.title : currentStop.name}
              siteName={siteName}
              stopName={currentStop.name}
              audioUrl={activeAudioStop?.audioUrl || currentStop.audioUrl}
            />
          </div>
        </div>
      )}
    </div>
  );
};
