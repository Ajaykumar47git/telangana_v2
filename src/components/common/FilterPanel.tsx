import React from 'react';
import { Filter, RotateCcw, X } from 'lucide-react';
import { Button } from '../ui/button';

export interface FilterState {
  site: string;
  district: string;
  period: string;
  category: string;
  language: string;
  verificationStatus: string;
}

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
  sites: { id: string; name: string }[];
  districts: string[];
  periods: string[];
  categories: string[];
  languages?: string[];
  className?: string;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  filters,
  onFilterChange,
  onReset,
  sites,
  districts,
  periods,
  categories,
  languages = ['Prakrit', 'Sanskrit', 'Old Telugu'],
  className = '',
  isOpenMobile,
  onCloseMobile
}) => {
  const activeCount = Object.values(filters).filter(Boolean).length;

  const content = (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-[#2E333D]">
        <div className="flex items-center gap-2 text-sm font-serif font-semibold text-[#FAF8F3]">
          <Filter className="w-4 h-4 text-[#B89255]" />
          <span>Archive Filters</span>
          {activeCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-[#B89255] text-[#0D0E10] text-[10px] font-bold flex items-center justify-center">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onReset}
            className="flex items-center gap-1 text-[11px] text-[#B89255] hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-[#D5C5AE] uppercase tracking-wider block">
          Artifact Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange('category', e.target.value)}
          className="w-full bg-[#121316] text-[#FAF8F3] text-xs px-3 py-2 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
        >
          <option value="">All Categories ({categories.length})</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Associated Site */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-[#D5C5AE] uppercase tracking-wider block">
          Heritage Site
        </label>
        <select
          value={filters.site}
          onChange={(e) => onFilterChange('site', e.target.value)}
          className="w-full bg-[#121316] text-[#FAF8F3] text-xs px-3 py-2 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
        >
          <option value="">All Heritage Sites</option>
          {sites.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* District */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-[#D5C5AE] uppercase tracking-wider block">
          District
        </label>
        <select
          value={filters.district}
          onChange={(e) => onFilterChange('district', e.target.value)}
          className="w-full bg-[#121316] text-[#FAF8F3] text-xs px-3 py-2 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
        >
          <option value="">All Districts</option>
          {districts.map((d) => (
            <option key={d} value={d}>
              {d} District
            </option>
          ))}
        </select>
      </div>

      {/* Period */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-[#D5C5AE] uppercase tracking-wider block">
          Chronological Period
        </label>
        <select
          value={filters.period}
          onChange={(e) => onFilterChange('period', e.target.value)}
          className="w-full bg-[#121316] text-[#FAF8F3] text-xs px-3 py-2 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
        >
          <option value="">All Chronological Eras</option>
          {periods.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {/* Language */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-[#D5C5AE] uppercase tracking-wider block">
          Language / Epigraphy
        </label>
        <select
          value={filters.language}
          onChange={(e) => onFilterChange('language', e.target.value)}
          className="w-full bg-[#121316] text-[#FAF8F3] text-xs px-3 py-2 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
        >
          <option value="">All Languages</option>
          {languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>

      {/* Verification Status */}
      <div className="space-y-2">
        <label className="text-[11px] font-semibold text-[#D5C5AE] uppercase tracking-wider block">
          Verification Status
        </label>
        <select
          value={filters.verificationStatus}
          onChange={(e) => onFilterChange('verificationStatus', e.target.value)}
          className="w-full bg-[#121316] text-[#FAF8F3] text-xs px-3 py-2 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
        >
          <option value="">All Records</option>
          <option value="Archaeologically Verified">Archaeologically Verified</option>
          <option value="ASI Catalogued">ASI Catalogued</option>
          <option value="Illustrative Reconstruction">Illustrative Reconstruction</option>
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop side panel */}
      <div className={`hidden lg:block bg-[#191B20] border border-[#2E333D] p-5 ${className}`}>
        {content}
      </div>

      {/* Mobile drawer */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={onCloseMobile} />
          <div className="relative w-80 max-w-full bg-[#191B20] border-l border-[#2E333D] p-6 h-full overflow-y-auto z-10 animate-in slide-in-from-right duration-200">
            <div className="flex justify-between items-center mb-4">
              <span className="font-serif text-lg font-bold text-[#FAF8F3]">Filter Archives</span>
              <button onClick={onCloseMobile} className="p-1 text-[#9E9689] hover:text-[#FAF8F3]">
                <X className="w-5 h-5" />
              </button>
            </div>
            {content}
            <div className="mt-8 pt-4 border-t border-[#2E333D]">
              <Button variant="primary" className="w-full" onClick={onCloseMobile}>
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
