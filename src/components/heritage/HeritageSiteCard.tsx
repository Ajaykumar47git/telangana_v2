import React from 'react';
import { MapPin, Calendar, ArrowRight, Heart } from 'lucide-react';
import { HeritageSite } from '../../types/heritage';
import { useHeritage } from '../../context/HeritageContext';
import { Button } from '../ui/button';

interface HeritageSiteCardProps {
  site: HeritageSite;
  className?: string;
  variant?: 'featured' | 'standard';
}

export const HeritageSiteCard: React.FC<HeritageSiteCardProps> = ({ site, className = '', variant = 'standard' }) => {
  const { navigate, isFavoriteSite, toggleFavoriteSite } = useHeritage();
  const isFav = isFavoriteSite(site.id);

  return (
    <div
      className={`group relative bg-[#191B20] border border-[#2E333D] hover:border-[#B89255]/70 transition-all duration-300 flex flex-col overflow-hidden ${
        variant === 'featured' ? 'shadow-xl' : 'shadow-md'
      } ${className}`}
    >
      {/* Image Container with subtle zoom on hover */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#121316]">
        <img
          src={site.image}
          alt={site.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191B20] via-transparent to-black/30" />

        {/* District & Period Chip */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          <span className="px-2.5 py-1 text-[11px] font-sans font-medium uppercase tracking-wider bg-[#121316]/85 backdrop-blur-xs text-[#EADBCA] border border-[#2E333D] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#B89255]" />
            {site.district} District
          </span>
        </div>

        {/* Favorite Bookmark button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteSite(site.id);
          }}
          className={`absolute top-3 right-3 p-2 backdrop-blur-xs border transition-colors cursor-pointer ${
            isFav
              ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255]'
              : 'bg-[#121316]/80 text-[#FAF8F3] hover:text-[#B89255] border-[#2E333D]'
          }`}
          aria-label={isFav ? 'Remove from favorites' : 'Save to favorites'}
        >
          <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
        </button>

        {/* Telugu name subtitle overlay */}
        {site.nameTelugu && (
          <div className="absolute bottom-2 left-4 text-xs font-sans text-[#D5C5AE]/80 tracking-wide">
            {site.nameTelugu}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#B89255] font-sans font-medium mb-1.5">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            <span>{site.period}</span>
          </div>

          <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#FAF8F3] group-hover:text-[#B89255] transition-colors leading-snug">
            {site.name}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-[#D5C5AE] line-clamp-3 leading-relaxed">
            {site.shortDescription}
          </p>
        </div>

        {/* Key structures preview pill */}
        <div className="mt-5 pt-4 border-t border-[#2E333D]/60 flex items-center justify-between">
          <span className="text-[11px] text-[#9E9689] uppercase tracking-wider">
            {site.artifactsCount} Catalogued Antiquities
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate(`/sites/${site.slug}`)}
            className="text-xs text-[#FAF8F3] group-hover:text-[#B89255] p-0 hover:bg-transparent flex items-center gap-1 font-medium"
          >
            <span>Explore Site</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </div>
  );
};
