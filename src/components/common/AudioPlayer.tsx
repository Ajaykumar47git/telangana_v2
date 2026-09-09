import React, { useState, useEffect } from 'react';
import { Play, Pause, X, Volume2, SkipForward, SkipBack, Music } from 'lucide-react';
import { useHeritage } from '../../context/HeritageContext';

export const AudioPlayer: React.FC = () => {
  const { activeAudio, isPlayingAudio, pauseAudio, playAudio, stopAudio } = useHeritage();
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingAudio) {
      interval = setInterval(() => {
        setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlayingAudio]);

  if (!activeAudio) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 w-full max-w-md bg-[#191B20] border border-[#B89255]/40 shadow-2xl p-4 animate-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 shrink-0 bg-[#121316] border border-[#2E333D] overflow-hidden">
          {activeAudio.coverImage ? (
            <img
              src={activeAudio.coverImage}
              alt={activeAudio.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#B89255]">
              <Music className="w-5 h-5" />
            </div>
          )}
          {isPlayingAudio && (
            <div className="absolute inset-0 bg-[#B89255]/20 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-[#E8C868] animate-ping" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-medium tracking-wider uppercase text-[#B89255]">
              Heritage Audio Narration
            </span>
            <button
              onClick={stopAudio}
              className="text-[#9E9689] hover:text-[#FAF8F3] transition-colors p-1"
              aria-label="Close audio player"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="font-serif text-sm font-medium text-[#FAF8F3] truncate">{activeAudio.title}</p>
          <p className="text-xs text-[#9E9689] truncate">
            {activeAudio.siteName} • {activeAudio.narrator}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-3">
        <div className="h-1 w-full bg-[#121316] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#B89255] to-[#D4AF37] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[10px] text-[#9E9689] mt-1">
          <span>01:42</span>
          <span>{activeAudio.duration}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#2E333D]/50">
        <div className="flex items-center gap-1 text-[#D5C5AE] text-xs">
          <Volume2 className="w-3.5 h-3.5 text-[#B89255]" />
          <span>High Fidelity Field Audio</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setProgress((p) => Math.max(0, p - 10))}
            className="p-1 text-[#9E9689] hover:text-[#FAF8F3] transition-colors cursor-pointer"
            aria-label="Rewind 10 seconds"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => (isPlayingAudio ? pauseAudio() : playAudio(activeAudio))}
            className="w-8 h-8 flex items-center justify-center bg-[#B89255] text-[#0D0E10] hover:bg-[#C89D66] transition-colors cursor-pointer"
            aria-label={isPlayingAudio ? 'Pause' : 'Play'}
          >
            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>
          <button
            onClick={() => setProgress((p) => Math.min(100, p + 10))}
            className="p-1 text-[#9E9689] hover:text-[#FAF8F3] transition-colors cursor-pointer"
            aria-label="Forward 10 seconds"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
