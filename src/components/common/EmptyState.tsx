import React from 'react';
import { Compass, FolderSearch, RefreshCw } from 'lucide-react';
import { Button } from '../ui/button';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  icon?: 'search' | 'compass' | 'refresh';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  onAction,
  icon = 'search'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-[#191B20]/60 border border-[#2E333D]/60 my-6">
      <div className="w-14 h-14 flex items-center justify-center bg-[#22262E] text-[#B89255] mb-4 border border-[#B89255]/30">
        {icon === 'search' && <FolderSearch className="w-7 h-7" />}
        {icon === 'compass' && <Compass className="w-7 h-7" />}
        {icon === 'refresh' && <RefreshCw className="w-7 h-7" />}
      </div>
      <h4 className="font-serif text-xl font-semibold text-[#FAF8F3] mb-2">{title}</h4>
      <p className="text-sm text-[#D5C5AE] max-w-md mb-6 leading-relaxed">{description}</p>
      {actionText && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
