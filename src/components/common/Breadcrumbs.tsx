import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { useHeritage } from '../../context/HeritageContext';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  const { navigate } = useHeritage();

  return (
    <nav aria-label="Breadcrumb" className={`flex items-center space-x-1.5 text-xs text-[#9E9689] ${className}`}>
      <button
        onClick={() => navigate('/')}
        className="flex items-center gap-1 hover:text-[#B89255] transition-colors cursor-pointer"
        title="Home"
      >
        <Home className="w-3.5 h-3.5" />
        <span className="sr-only">Home</span>
      </button>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3 h-3 text-[#2E333D] shrink-0" />
            {isLast || !item.path ? (
              <span className="text-[#EADBCA] font-medium truncate max-w-[200px] sm:max-w-xs">{item.label}</span>
            ) : (
              <button
                onClick={() => item.path && navigate(item.path)}
                className="hover:text-[#B89255] transition-colors cursor-pointer truncate max-w-[150px] sm:max-w-none"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
