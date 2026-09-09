import React from 'react';
import { ShieldCheck, FileCheck2, AlertCircle } from 'lucide-react';
import { Badge } from '../ui/badge';

interface VerificationBadgeProps {
  status: 'Archaeologically Verified' | 'ASI Catalogued' | 'Under Scholarly Review' | 'Illustrative Reconstruction';
  className?: string;
  size?: 'sm' | 'md';
}

export const VerificationBadge: React.FC<VerificationBadgeProps> = ({ status, className }) => {
  if (status === 'Archaeologically Verified') {
    return (
      <Badge variant="verified" className={className}>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Archaeologically Verified</span>
      </Badge>
    );
  }

  if (status === 'ASI Catalogued') {
    return (
      <Badge variant="gold" className={className}>
        <FileCheck2 className="w-3.5 h-3.5 text-[#E8C868] shrink-0" />
        <span>ASI Catalogued</span>
      </Badge>
    );
  }

  if (status === 'Illustrative Reconstruction') {
    return (
      <Badge variant="illustrative" className={className}>
        <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        <span>Illustrative Reconstruction</span>
      </Badge>
    );
  }

  return (
    <Badge variant="default" className={className}>
      <AlertCircle className="w-3.5 h-3.5 text-[#D5C5AE] shrink-0" />
      <span>Under Scholarly Review</span>
    </Badge>
  );
};
