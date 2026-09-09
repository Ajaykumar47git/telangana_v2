import React from 'react';
import { Heart, ArrowUpRight, MapPin } from 'lucide-react';
import { Artifact } from '../../types/heritage';
import { useHeritage } from '../../context/HeritageContext';
import { VerificationBadge } from '../common/VerificationBadge';

interface ArtifactCardProps {
  artifact: Artifact;
  className?: string;
}

export const ArtifactCard: React.FC<ArtifactCardProps> = ({ artifact, className = '' }) => {
  const { navigate, isFavoriteArtifact, toggleFavoriteArtifact } = useHeritage();
  const isFav = isFavoriteArtifact(artifact.id);

  return (
    <div
      onClick={() => navigate(`/archive/artifacts/${artifact.id}`)}
      className={`group relative bg-[#191B20] border border-[#2E333D] hover:border-[#B89255]/70 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden ${className}`}
    >
      {/* Artifact Image */}
      <div className="relative aspect-square overflow-hidden bg-[#121316]">
        <img
          src={artifact.image}
          alt={artifact.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          referrerPolicy="no-referrer"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#191B20] via-transparent to-black/20" />

        {/* Category Pill */}
        <div className="absolute top-2.5 left-2.5">
          <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold bg-[#121316]/90 text-[#E8C868] border border-[#2E333D]">
            {artifact.category}
          </span>
        </div>

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteArtifact(artifact.id);
          }}
          className={`absolute top-2.5 right-2.5 p-1.5 backdrop-blur-xs border transition-colors cursor-pointer ${
            isFav
              ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255]'
              : 'bg-[#121316]/80 text-[#FAF8F3] hover:text-[#B89255] border-[#2E333D]'
          }`}
          aria-label="Save artifact"
        >
          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-current' : ''}`} />
        </button>

        {/* Accession Number Tag */}
        <div className="absolute bottom-2 left-2.5 text-[9px] font-mono text-[#9E9689] bg-[#121316]/80 px-1.5 py-0.5">
          {artifact.accessionNumber}
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="mb-2">
            <VerificationBadge status={artifact.verificationStatus} />
          </div>

          <h4 className="font-serif text-base font-semibold text-[#FAF8F3] group-hover:text-[#B89255] transition-colors leading-snug line-clamp-2">
            {artifact.name}
          </h4>

          <div className="mt-2 text-xs text-[#D5C5AE] flex items-center gap-1">
            <MapPin className="w-3 h-3 text-[#B89255] shrink-0" />
            <span className="truncate">{artifact.siteName}</span>
          </div>

          <p className="text-[11px] text-[#9E9689] mt-0.5">
            {artifact.period} • {artifact.material}
          </p>
        </div>

        <div className="mt-4 pt-2.5 border-t border-[#2E333D]/60 flex items-center justify-between text-xs text-[#B89255] font-medium">
          <span>View Archive Record</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>
    </div>
  );
};
