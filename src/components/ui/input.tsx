import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full bg-[#121316] px-3.5 py-2 text-sm text-[#F5F1E8] placeholder:text-[#9E9689] border border-[#2E333D] transition-colors focus-visible:outline-none focus-visible:border-[#B89255] focus-visible:ring-1 focus-visible:ring-[#B89255] disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';
