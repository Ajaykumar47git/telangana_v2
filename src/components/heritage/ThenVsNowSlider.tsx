import React, { useState, useRef, useCallback } from 'react';
import {
  Sparkles,
  Layers,
  Info,
  AlertTriangle,
  Eye,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
  Maximize2
} from 'lucide-react';

interface ThenVsNowSliderProps {
  siteName: string;
  historicalImage: string;
  historicalLabel?: string;
  historicalPeriod?: string;
  historicalDescription?: string;
  presentImage: string;
  presentLabel?: string;
  presentDescription?: string;
  aspectRatioClass?: string;
  className?: string;
}

export const ThenVsNowSlider: React.FC<ThenVsNowSliderProps> = ({
  siteName,
  historicalImage,
  historicalLabel = 'Historical Reconstruction (3rd c. CE)',
  historicalPeriod = 'Ikshvaku / Satavahana Zenith',
  historicalDescription = 'Illustrative digital spatial reconstruction showing whitewashed lime plaster, gilded umbrella spire (Chhatravali), carved Torana gateway, and painted monastic cloisters based on excavated architectural fragments and Jataka narrative reliefs.',
  presentImage,
  presentLabel = 'Present-Day Archaeological Site',
  presentDescription = 'Excavated brick foundations, surviving Ayaka platform bases, and conserved monument core under the protection of the Archaeological Survey of India.',
  aspectRatioClass = 'aspect-[16/10] sm:aspect-[16/9]',
  className = ''
}) => {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage (0 - 100)
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    []
  );

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Strict Archaeological Transparency Banner (Requirement 9) */}
      <div className="bg-[#191B20] border-l-4 border-amber-500 border border-[#2E333D] p-3 sm:p-4 shadow-md flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase font-bold tracking-wider text-amber-400">
              Digital Reconstruction — Illustrative Visualization
            </span>
            <span className="text-[10px] bg-amber-950/80 text-amber-300 border border-amber-800 px-2 py-0.5 font-mono">
              Scientific Hypothesis
            </span>
          </div>
          <p className="text-xs text-[#D5C5AE] leading-relaxed">
            Never represent reconstruction imagery as an authentic historical photograph. The historical visualization represents an illustrative architectural interpretation grounded in epigraphical records, stratified brick alignments, and contemporary sculptural analogies.
          </p>
        </div>
      </div>

      {/* Interactive Split Comparison Slider */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchMove={handleTouchMove}
        className={`relative w-full ${aspectRatioClass} bg-[#0D0E10] border border-[#2E333D] overflow-hidden select-none cursor-ew-resize shadow-2xl group`}
      >
        {/* RIGHT LAYER: Present-Day Site */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src={presentImage}
            alt={presentLabel}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Label Bottom Right */}
          <div className="absolute bottom-3 right-3 bg-[#121316]/90 border border-[#2E333D] px-3 py-1.5 backdrop-blur-md text-right z-10 pointer-events-none">
            <span className="text-[9px] uppercase font-mono text-[#9E9689] block">
              Survey Condition
            </span>
            <span className="font-serif text-xs sm:text-sm font-bold text-[#FAF8F3]">
              {presentLabel}
            </span>
          </div>
        </div>

        {/* LEFT LAYER: Historical Reconstruction (Clipped to sliderPosition) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="relative h-full"
            style={{ width: containerRef.current?.offsetWidth || '100%' }}
          >
            <img
              src={historicalImage}
              alt={historicalLabel}
              className="w-full h-full object-cover brightness-105 filter contrast-105"
              referrerPolicy="no-referrer"
            />
            {/* Label Bottom Left */}
            <div className="absolute bottom-3 left-3 bg-[#121316]/90 border border-[#B89255] px-3 py-1.5 backdrop-blur-md text-left z-10 pointer-events-none">
              <span className="text-[9px] uppercase font-mono text-[#B89255] block font-semibold">
                Illustrative Model
              </span>
              <span className="font-serif text-xs sm:text-sm font-bold text-[#FAF8F3]">
                {historicalLabel}
              </span>
            </div>
          </div>
        </div>

        {/* DRAGGABLE DIVIDER LINE & HANDLE */}
        <div
          className="absolute inset-y-0 z-20 pointer-events-none flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical Bar */}
          <div className="w-0.5 h-full bg-[#FAF8F3] shadow-[0_0_10px_rgba(0,0,0,0.8)]" />

          {/* Grab Handle */}
          <div className="absolute w-10 h-10 rounded-full bg-[#191B20] border-2 border-[#B89255] text-[#FAF8F3] flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
            <div className="flex items-center gap-0.5">
              <ChevronLeft className="w-3.5 h-3.5 text-[#B89255]" />
              <ChevronRight className="w-3.5 h-3.5 text-[#B89255]" />
            </div>
          </div>
        </div>

        {/* Top Floating Helper Tag */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-[#121316]/90 border border-[#2E333D] px-3 py-1 text-[10px] font-mono text-[#D5C5AE] uppercase tracking-wider backdrop-blur-md z-10 pointer-events-none">
          Drag horizontally to compare eras
        </div>
      </div>

      {/* Control Buttons (Quick Split Presets) */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#9E9689] font-mono">View Preset:</span>
          <button
            onClick={() => setSliderPosition(100)}
            className={`px-2.5 py-1 text-xs border transition-colors cursor-pointer ${
              sliderPosition > 85
                ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-semibold'
                : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]'
            }`}
          >
            100% Historical
          </button>
          <button
            onClick={() => setSliderPosition(50)}
            className={`px-2.5 py-1 text-xs border transition-colors cursor-pointer ${
              sliderPosition >= 40 && sliderPosition <= 60
                ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-semibold'
                : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]'
            }`}
          >
            50 / 50 Split
          </button>
          <button
            onClick={() => setSliderPosition(0)}
            className={`px-2.5 py-1 text-xs border transition-colors cursor-pointer ${
              sliderPosition < 15
                ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255] font-semibold'
                : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:border-[#B89255]'
            }`}
          >
            100% Present-Day
          </button>
        </div>

        <div className="text-xs text-[#B89255] font-mono">
          Split Position: <strong className="text-[#FAF8F3]">{Math.round(sliderPosition)}%</strong> Historical
        </div>
      </div>

      {/* Comparative Archaeological Notes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
        <div className="p-4 bg-[#15171D] border border-[#2E333D]">
          <span className="text-[10px] font-mono uppercase text-[#B89255] font-semibold block mb-1">
            Historical Reconstruction Details ({historicalPeriod})
          </span>
          <p className="text-xs text-[#D5C5AE] leading-relaxed">
            {historicalDescription}
          </p>
        </div>
        <div className="p-4 bg-[#15171D] border border-[#2E333D]">
          <span className="text-[10px] font-mono uppercase text-[#9E9689] font-semibold block mb-1">
            Present Excavation Reality
          </span>
          <p className="text-xs text-[#D5C5AE] leading-relaxed">
            {presentDescription}
          </p>
        </div>
      </div>
    </div>
  );
};
