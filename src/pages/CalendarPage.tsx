import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Plus, Check, Share2, Tag } from 'lucide-react';
import { CULTURAL_EVENTS } from '../data/heritageData';
import { CulturalEvent } from '../types/heritage';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { Button } from '../components/ui/button';
import { useHeritage } from '../context/HeritageContext';

export const CalendarPage: React.FC = () => {
  const { showNotification } = useHeritage();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedEvents, setAddedEvents] = useState<string[]>([]);

  const categories = ['All', 'Festival', 'Archaeology', 'Lectures', 'Walking Tour', 'Heritage Week'];

  const filteredEvents = selectedCategory === 'All'
    ? CULTURAL_EVENTS
    : CULTURAL_EVENTS.filter((e) => e.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  const handleAddToCalendar = (evt: CulturalEvent) => {
    if (addedEvents.includes(evt.id)) {
      setAddedEvents((prev) => prev.filter((id) => id !== evt.id));
      showNotification(`Removed ${evt.title} from your personal schedule`);
    } else {
      setAddedEvents((prev) => [...prev, evt.id]);
      showNotification(`Added ${evt.title} to your calendar`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Cultural Calendar' }]} />

      {/* Header */}
      <div className="border-b border-[#2E333D] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-2">
            <CalendarIcon className="w-4 h-4" />
            <span>Monastic Observances & Scholarly Symposia</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F3]">
            Cultural & Archaeological Calendar
          </h1>
          <p className="text-sm sm:text-base text-[#D5C5AE] max-w-2xl mt-3 leading-relaxed">
            Commemorate sacred Buddhist full moon festivals, archaeological excavation milestones, field guided walks, and epigraphy colloquia across Telangana.
          </p>
        </div>

        {/* Saved Count */}
        <div className="px-3.5 py-2 bg-[#191B20] border border-[#2E333D] text-xs text-[#EADBCA] self-start md:self-auto">
          Saved Events: <strong className="text-[#B89255]">{addedEvents.length}</strong>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 text-xs transition-colors cursor-pointer border ${
              selectedCategory === cat
                ? 'bg-[#B89255] text-[#0D0E10] font-semibold border-[#B89255]'
                : 'bg-[#191B20] text-[#D5C5AE] border-[#2E333D] hover:bg-[#22262E]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEvents.map((evt) => {
          const isAdded = addedEvents.includes(evt.id);
          return (
            <div
              key={evt.id}
              className="bg-[#191B20] border border-[#2E333D] hover:border-[#B89255]/70 transition-all p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider bg-[#22262E] text-[#E8C868] border border-[#2E333D]">
                    {evt.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#B89255] font-mono">
                    <CalendarIcon className="w-3.5 h-3.5" />
                    <span>{evt.date}</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-semibold text-[#FAF8F3]">
                  {evt.title}
                </h3>

                <div className="flex items-center gap-2 mt-2 text-xs text-[#D5C5AE]">
                  <MapPin className="w-3.5 h-3.5 text-[#B89255] shrink-0" />
                  <span>{evt.location}</span>
                </div>

                <p className="text-xs sm:text-sm text-[#D5C5AE] mt-3 leading-relaxed">
                  {evt.description}
                </p>
              </div>

              {/* Card Footer */}
              <div className="mt-6 pt-4 border-t border-[#2E333D] flex items-center justify-between">
                <span className="text-[11px] text-[#9E9689]">Open to Public & Scholars</span>

                <Button
                  variant={isAdded ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleAddToCalendar(evt)}
                  className="text-xs"
                >
                  {isAdded ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1 text-emerald-400" />
                      <span>Added to Schedule</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 mr-1 text-[#B89255]" />
                      <span>Add to Calendar</span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
