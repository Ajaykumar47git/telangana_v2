import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B89255] disabled:pointer-events-none disabled:opacity-50 select-none cursor-pointer';

    const variants = {
      primary: 'bg-[#B89255] text-[#0D0E10] hover:bg-[#C89D66] active:bg-[#A87B45] font-semibold shadow-sm',
      gold: 'bg-gradient-to-r from-[#B89255] to-[#D4AF37] text-[#0D0E10] font-semibold hover:brightness-110 shadow-md shadow-[#B89255]/20',
      secondary: 'bg-[#22262E] text-[#F5F1E8] hover:bg-[#2E333D] active:bg-[#191B20] border border-[#2E333D]',
      outline: 'border border-[#B89255]/50 text-[#F5F1E8] hover:bg-[#B89255]/10 hover:border-[#B89255]',
      ghost: 'text-[#EADBCA] hover:bg-[#22262E] hover:text-[#FAF8F3]',
      link: 'text-[#B89255] underline-offset-4 hover:underline p-0 h-auto'
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs tracking-wide uppercase',
      md: 'h-10 px-5 text-sm tracking-wide',
      lg: 'h-12 px-7 text-base tracking-wide',
      icon: 'h-10 w-10 p-0 shrink-0'
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
            </svg>
            <span>Loading...</span>
          </span>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';
