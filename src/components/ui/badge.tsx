import React from 'react';
import { cn } from '../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline' | 'gold' | 'verified' | 'illustrative' | 'muted';
}

export const Badge: React.FC<BadgeProps> = ({ className, variant = 'default', children, ...props }) => {
  const variants = {
    default: 'bg-[#22262E] text-[#EADBCA] border border-[#2E333D]',
    outline: 'border border-[#B89255]/40 text-[#D8B98F] bg-transparent',
    gold: 'bg-[#B89255]/15 text-[#E8C868] border border-[#B89255]/40 font-medium',
    verified: 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40 font-medium',
    illustrative: 'bg-amber-950/40 text-amber-300 border border-amber-800/40 font-medium',
    muted: 'bg-[#191B20] text-[#9E9689] border border-white/5'
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium tracking-wider uppercase transition-colors select-none whitespace-nowrap',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
