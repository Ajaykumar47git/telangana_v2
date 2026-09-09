import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  RotateCcw,
  Languages,
  Radio,
  Headphones,
  Check
} from 'lucide-react';

export type AudioLanguage = 'English' | 'Telugu' | 'Hindi';

interface AudioGuidePlayerProps {
  title: string;
  siteName: string;
  stopName?: string;
  audioUrl?: string | null;
  transcripts?: {
    English: string;
    Telugu: string;
    Hindi: string;
  };
  durationSeconds?: number;
  autoPlay?: boolean;
  className?: string;
}

const DEFAULT_TRANSCRIPTS: Record<AudioLanguage, string> = {
  English:
    'Welcome to this ancient sanctuary of Buddhist devotion in Telangana. Stand here at the sacred pradakshinapatha, the circumambulation pathway. Notice the finely dressed limestone ayaka platforms facing the cardinal directions. Here, royal patrons and wandering monks gathered during the Satavahana and Ikshvaku dynasties to recite the Dharma and reflect upon universal compassion.',
  Telugu:
    'తెలంగాణలోని ఈ ప్రాచీన బౌద్ధ పుణ్యక్షేత్రానికి స్వాగతం. శాతవాహన, ఇక్ష్వాకు రాజులు మరియు భిక్షువులు ధర్మ ప్రచారం కోసం ఇక్కడ సమావేశమయ్యేవారు. నాలుగు దిక్కులా విస్తరించిన ఆయక స్తంభాలు, ప్రదక్షిణాపథం మరియు అద్భుతమైన సున్నపురాయి శిల్పాలు ఈ క్షేత్ర విశిష్టతను చాటుతున్నాయి.',
  Hindi:
    'तेलंगाना के इस प्राचीन बौद्ध महाविहार में आपका स्वागत है। सातवाहन और इक्ष्वाकु वंश के काल में यह स्थल बौद्ध भिक्षुओं की साधना और धर्मोपदेश का प्रमुख केंद्र था। यहाँ स्थित महास्तूप, आयक स्तम्भ और पाषाण कलाकृतियां शांति एवं करुणा का संदेश देती हैं।'
};

export const AudioGuidePlayer: React.FC<AudioGuidePlayerProps> = ({
  title,
  siteName,
  stopName,
  audioUrl,
  transcripts = DEFAULT_TRANSCRIPTS,
  durationSeconds = 90,
  autoPlay = false,
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [language, setLanguage] = useState<AudioLanguage>('English');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationSeconds);
  const [volume, setVolume] = useState(0.85);
  const [isMuted, setIsMuted] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [synthSpeaking, setSynthSpeaking] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  // Initialize audio / speech synthesis
  useEffect(() => {
    return () => {
      stopPlayback();
    };
  }, []);

  // Handle language change during playback
  useEffect(() => {
    if (isPlaying) {
      stopPlayback();
      startPlayback();
    }
  }, [language]);

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    if (progressTimerRef.current) {
      clearInterval(progressTimerRef.current);
      progressTimerRef.current = null;
    }
    setIsPlaying(false);
    setSynthSpeaking(false);
    setCurrentTime(0);
  };

  const startPlayback = () => {
    setIsPlaying(true);

    // If real audio URL exists and is playable, try native HTML5 audio
    if (audioUrl && audioUrl.startsWith('http') && !audioUrl.includes('#')) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
      } else {
        audioRef.current.src = audioUrl;
      }
      audioRef.current.volume = isMuted ? 0 : volume;
      audioRef.current
        .play()
        .then(() => {
          audioRef.current!.onended = () => {
            setIsPlaying(false);
            setCurrentTime(0);
          };
        })
        .catch(() => {
          // Fallback to speech synthesis narration
          playWithSpeechSynthesis();
        });
    } else {
      // Use SpeechSynthesis with localized Telugu/Hindi/English voice
      playWithSpeechSynthesis();
    }

    // Start progress timer
    if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    progressTimerRef.current = window.setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= duration) {
          stopPlayback();
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  const playWithSpeechSynthesis = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    const textToSpeak = transcripts[language] || DEFAULT_TRANSCRIPTS[language];
    const utterance = new SpeechSynthesisUtterance(textToSpeak);

    // Language locale mapping
    if (language === 'Telugu') {
      utterance.lang = 'te-IN';
      utterance.rate = 0.9;
    } else if (language === 'Hindi') {
      utterance.lang = 'hi-IN';
      utterance.rate = 0.95;
    } else {
      utterance.lang = 'en-IN';
      utterance.rate = 1.0;
    }

    utterance.volume = isMuted ? 0 : volume;

    utterance.onend = () => {
      setIsPlaying(false);
      setSynthSpeaking(false);
      setCurrentTime(0);
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setSynthSpeaking(false);
    };

    synthUtteranceRef.current = utterance;
    setSynthSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) audioRef.current.pause();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
      if (progressTimerRef.current) {
        clearInterval(progressTimerRef.current);
        progressTimerRef.current = null;
      }
      setIsPlaying(false);
    } else {
      if (currentTime > 0 && typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        progressTimerRef.current = window.setInterval(() => {
          setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
        }, 1000);
      } else {
        startPlayback();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = Number(e.target.value);
    setVolume(newVol);
    setIsMuted(newVol === 0);
    if (audioRef.current) {
      audioRef.current.volume = newVol;
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) audioRef.current.volume = volume;
    } else {
      setIsMuted(true);
      if (audioRef.current) audioRef.current.volume = 0;
    }
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div
      className={`bg-[#191B20] border border-[#2E333D] p-4 sm:p-5 shadow-2xl backdrop-blur-md ${className}`}
    >
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#2E333D]/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#B89255]/20 border border-[#B89255] flex items-center justify-center text-[#B89255] shrink-0">
            <Headphones className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#B89255] uppercase tracking-wider">
                Official Archaeological Audio Guide
              </span>
              <span className="inline-flex items-center px-1.5 py-0.2 bg-emerald-950/80 border border-emerald-700/50 text-[9px] text-emerald-400 font-mono">
                Live
              </span>
            </div>
            <h4 className="font-serif text-sm sm:text-base font-bold text-[#FAF8F3] truncate max-w-[280px] sm:max-w-md">
              {stopName ? `${stopName} — ` : ''}{title}
            </h4>
          </div>
        </div>

        {/* Language Selection */}
        <div className="relative self-start sm:self-auto">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#121316] border border-[#2E333D] hover:border-[#B89255] text-xs text-[#FAF8F3] transition-colors cursor-pointer"
          >
            <Languages className="w-3.5 h-3.5 text-[#B89255]" />
            <span className="font-medium">{language}</span>
          </button>

          {showLanguageDropdown && (
            <div className="absolute right-0 top-full mt-1 w-36 bg-[#121316] border border-[#B89255] shadow-2xl z-50 py-1">
              {(['English', 'Telugu', 'Hindi'] as AudioLanguage[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguageDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#191B20] transition-colors cursor-pointer ${
                    language === lang ? 'text-[#B89255] font-semibold' : 'text-[#D5C5AE]'
                  }`}
                >
                  <span>{lang}</span>
                  {language === lang && <Check className="w-3 h-3 text-[#B89255]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Scrubbable Progress Bar */}
      <div className="pt-4 space-y-1.5">
        <div className="relative flex items-center">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1.5 bg-[#2E333D] rounded-lg appearance-none cursor-pointer accent-[#B89255]"
          />
        </div>
        <div className="flex items-center justify-between text-[11px] font-mono text-[#9E9689]">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Audio Controls */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-3">
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-[#B89255] hover:bg-[#C9A265] text-[#0D0E10] flex items-center justify-center shadow-lg transition-transform active:scale-95 cursor-pointer"
            aria-label={isPlaying ? 'Pause Audio' : 'Play Audio'}
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          {/* Reset */}
          <button
            onClick={() => {
              stopPlayback();
            }}
            className="p-2 text-[#9E9689] hover:text-[#FAF8F3] transition-colors cursor-pointer"
            title="Restart Audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Volume Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMute}
            className="text-[#9E9689] hover:text-[#FAF8F3] transition-colors cursor-pointer"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={isMuted ? 0 : volume}
            onChange={handleVolumeChange}
            className="w-16 sm:w-24 h-1 bg-[#2E333D] rounded-lg appearance-none cursor-pointer accent-[#B89255]"
          />
        </div>
      </div>

      {/* Educational Transcript Subtitle Preview */}
      <div className="mt-3 pt-3 border-t border-[#2E333D]/60 text-xs text-[#D5C5AE] leading-relaxed italic bg-[#121316]/60 p-2.5 border border-[#2E333D]/40">
        <p className="line-clamp-2">"{transcripts[language] || DEFAULT_TRANSCRIPTS[language]}"</p>
      </div>
    </div>
  );
};
