import React from 'react';
import { cn } from '../../lib/utils';

export const LoadingSkeleton: React.FC<{ className?: string; count?: number }> = ({ className, count = 1 }) => {
  return (
    <div className="space-y-3 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={cn(
            'animate-pulse bg-[#22262E]/70 border border-[#2E333D]/40',
            className || 'h-24 w-full'
          )}
        />
      ))}
    </div>
  );
};
