import React from 'react';
import { Calendar, Compass } from 'lucide-react';

interface TimelineEvent {
  era: string;
  event: string;
  details: string;
}

interface TimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ events, className = '' }) => {
  return (
    <div className={`relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-[2px] before:bg-gradient-to-b before:from-[#B89255] before:via-[#B89255]/40 before:to-transparent ${className}`}>
      {events.map((evt, idx) => (
        <div key={idx} className="relative group">
          {/* Milestone Node */}
          <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full bg-[#121316] border-2 border-[#B89255] group-hover:bg-[#B89255] transition-colors" />

          <div className="bg-[#191B20] border border-[#2E333D] p-4 sm:p-5 group-hover:border-[#B89255]/60 transition-colors">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-[#B89255]/15 text-[#E8C868] border border-[#B89255]/30">
                {evt.era}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-[#9E9689]">
                <Calendar className="w-3 h-3 text-[#B89255]" />
                <span>Historical Milestone</span>
              </div>
            </div>

            <h4 className="font-serif text-lg font-semibold text-[#FAF8F3] mt-1">
              {evt.event}
            </h4>

            <p className="mt-1.5 text-xs sm:text-sm text-[#D5C5AE] leading-relaxed">
              {evt.details}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};
