import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  onClear?: () => void;
  resultsCount?: number;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Search inscriptions, artifacts, or sites...',
  className = '',
  onClear,
  resultsCount
}) => {
  return (
    <div className={`relative flex items-center w-full ${className}`}>
      <div className="absolute left-3.5 text-[#B89255] pointer-events-none">
        <Search className="w-4 h-4" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#191B20] text-[#FAF8F3] placeholder:text-[#9E9689] pl-10 pr-20 py-2.5 text-sm border border-[#2E333D] transition-colors focus:outline-none focus:border-[#B89255] focus:ring-1 focus:ring-[#B89255]"
      />
      <div className="absolute right-3 flex items-center gap-2">
        {resultsCount !== undefined && value.trim() !== '' && (
          <span className="text-[10px] uppercase tracking-wider text-[#B89255] font-medium hidden sm:inline">
            {resultsCount} {resultsCount === 1 ? 'record' : 'records'}
          </span>
        )}
        {value && (
          <button
            onClick={() => {
              onChange('');
              if (onClear) onClear();
            }}
            className="text-[#9E9689] hover:text-[#FAF8F3] p-1 transition-colors cursor-pointer"
            aria-label="Clear search query"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
