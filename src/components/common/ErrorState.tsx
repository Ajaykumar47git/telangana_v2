import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = 'Information Unavailable',
  message,
  onRetry
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-[#191B20] border border-amber-900/40 my-6">
      <div className="w-12 h-12 flex items-center justify-center bg-amber-950/40 text-amber-400 mb-4 border border-amber-800/40">
        <AlertTriangle className="w-6 h-6" />
      </div>
      <h4 className="font-serif text-lg font-semibold text-[#FAF8F3] mb-1">{title}</h4>
      <p className="text-sm text-[#D5C5AE] max-w-sm mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );
};
