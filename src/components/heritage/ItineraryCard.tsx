import React from 'react';
import { Calendar, Clock, MapPin, Compass, ArrowRight, Heart, Share2, Check } from 'lucide-react';
import { ItineraryPlan } from '../../types/heritage';
import { useHeritage } from '../../context/HeritageContext';
import { Button } from '../ui/button';

interface ItineraryCardProps {
  itinerary: ItineraryPlan;
  className?: string;
  isDetailed?: boolean;
}

export const ItineraryCard: React.FC<ItineraryCardProps> = ({
  itinerary,
  className = '',
  isDetailed = false
}) => {
  const { navigate, isFavoriteItinerary, toggleFavoriteItinerary, showNotification } = useHeritage();
  const isFav = isFavoriteItinerary(itinerary.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showNotification('Itinerary link copied to clipboard');
    } else {
      showNotification('Itinerary ready to share');
    }
  };

  return (
    <div className={`bg-[#191B20] border border-[#2E333D] overflow-hidden shadow-xl ${className}`}>
      {/* Header */}
      <div className="p-6 border-b border-[#2E333D] bg-[#121316]">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 text-xs font-semibold bg-[#B89255]/20 text-[#E8C868] border border-[#B89255]/40 uppercase tracking-wider">
              {itinerary.days} Days Expedition
            </span>
            <span className="text-xs text-[#9E9689]">• Starting from {itinerary.startingLocation}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-1.5 text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#22262E] transition-colors cursor-pointer"
              title="Share Itinerary"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => toggleFavoriteItinerary(itinerary.id)}
              className={`p-1.5 transition-colors cursor-pointer ${
                isFav ? 'text-[#B89255]' : 'text-[#D5C5AE] hover:text-[#FAF8F3]'
              }`}
              title={isFav ? 'Remove from saved' : 'Save itinerary'}
            >
              <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        <h3 className="font-serif text-2xl font-semibold text-[#FAF8F3] mt-2">
          {itinerary.title}
        </h3>

        <p className="text-xs sm:text-sm text-[#D5C5AE] mt-2 leading-relaxed">
          {itinerary.overview}
        </p>

        {/* Interests Badges */}
        <div className="flex flex-wrap gap-1.5 mt-4">
          {itinerary.interests.map((interest) => (
            <span
              key={interest}
              className="px-2 py-0.5 text-[11px] bg-[#22262E] text-[#D5C5AE] border border-[#2E333D]"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      {/* Stops Timeline */}
      <div className="p-6 space-y-6">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#B89255] mb-4">
          Expedition Stops & Archaeological Highlights
        </h4>

        <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-[#2E333D]">
          {itinerary.stops.map((stop) => (
            <div key={stop.day} className="relative group">
              <div className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-[#121316] border-2 border-[#B89255] flex items-center justify-center text-[9px] font-bold text-[#E8C868]">
                {stop.day}
              </div>

              <div className="bg-[#121316]/70 border border-[#2E333D] p-4 group-hover:border-[#B89255]/50 transition-colors">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-mono uppercase text-[#B89255] font-semibold">
                    Day {stop.day} • {stop.district} District
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-[#9E9689]">
                    <Clock className="w-3 h-3 text-[#B89255]" />
                    <span>{stop.timeEstimate}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <h5 className="font-serif text-base font-semibold text-[#FAF8F3]">
                    {stop.siteName}
                  </h5>
                  <button
                    onClick={() => navigate(`/sites/${stop.siteSlug}`)}
                    className="text-xs text-[#B89255] hover:underline flex items-center gap-0.5 cursor-pointer"
                  >
                    <span>View Site</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <p className="text-xs text-[#D5C5AE] mt-1.5 leading-relaxed">
                  <strong className="text-[#FAF8F3]">Key Focus:</strong> {stop.activity}
                </p>

                <p className="text-xs text-[#E8C868]/90 mt-1 italic">
                  ★ Highlight: {stop.highlight}
                </p>

                <p className="text-[11px] text-[#9E9689] mt-2 pt-2 border-t border-[#2E333D]/50 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#B89255] shrink-0" />
                  <span>Transit: {stop.travelNote}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Travel Advice Box */}
        <div className="mt-6 p-4 bg-[#121316] border border-[#B89255]/30 flex flex-col sm:flex-row justify-between gap-4 text-xs">
          <div>
            <span className="text-[#B89255] font-semibold uppercase tracking-wider block mb-1">
              Best Season & Weather
            </span>
            <span className="text-[#D5C5AE]">{itinerary.recommendedSeason}</span>
          </div>
          <div>
            <span className="text-[#B89255] font-semibold uppercase tracking-wider block mb-1">
              Logistical Advice
            </span>
            <span className="text-[#D5C5AE]">{itinerary.transportAdvice}</span>
          </div>
        </div>

        {/* Bottom Actions */}
        {!isDetailed && (
          <div className="pt-2 flex justify-end">
            <Button
              variant="gold"
              size="sm"
              onClick={() => navigate('/plan')}
              className="text-xs"
            >
              <span>Customize This Route</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
