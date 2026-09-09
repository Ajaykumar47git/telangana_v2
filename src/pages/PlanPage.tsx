import React, { useState } from 'react';
import {
  Compass,
  Calendar,
  Users,
  MapPin,
  Clock,
  Printer,
  Share2,
  Heart,
  ArrowRight,
  Check,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { DEMO_ITINERARIES, HERITAGE_SITES } from '../data/heritageData';
import { ItineraryPlan } from '../types/heritage';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ItineraryCard } from '../components/heritage/ItineraryCard';
import { Button } from '../components/ui/button';
import { useHeritage } from '../context/HeritageContext';

export const PlanPage: React.FC = () => {
  const { isFavoriteItinerary, toggleFavoriteItinerary, showNotification } = useHeritage();

  // Wizard state
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [startLocation, setStartLocation] = useState('Hyderabad');
  const [durationDays, setDurationDays] = useState(3);
  const [groupSize, setGroupSize] = useState('2-4 Travelers');
  const [pace, setPace] = useState<'Relaxed' | 'Moderate' | 'Archaeological Immersion'>('Moderate');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Archaeology',
    'Buddhism',
    'Architecture'
  ]);

  // Generated Result
  const [activePlan, setActivePlan] = useState<ItineraryPlan>(DEMO_ITINERARIES[0]);

  const interestOptions = [
    'Archaeology',
    'Buddhism',
    'Inscriptions & Epigraphy',
    'Architecture',
    'Photography',
    'Spirituality & Meditation',
    'River Landscapes'
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleGenerate = () => {
    // Select best matching demo itinerary based on duration
    let matched = DEMO_ITINERARIES.find((it) => it.days === durationDays);
    if (!matched) matched = DEMO_ITINERARIES[0];

    // Create customized itinerary
    const customized: ItineraryPlan = {
      ...matched,
      title: `${durationDays}-Day Telangana Buddhist Heritage Circuit`,
      startingLocation: startLocation,
      overview: `A bespoke ${durationDays}-day archaeological itinerary departing from ${startLocation}, curated for ${pace.toLowerCase()} pace and focused on ${selectedInterests.join(', ')}.`
    };

    setActivePlan(customized);
    setStep(3);
    showNotification('Custom itinerary generated successfully');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showNotification('Itinerary link copied to clipboard');
    } else {
      showNotification('Itinerary ready to share');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 pb-24">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Trip Planner' }]} />

      {/* Header */}
      <div className="border-b border-[#2E333D] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-2">
            <Compass className="w-4 h-4" />
            <span>Heritage Travel Architecture</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F3]">
            Plan Your Buddhist Expedition
          </h1>
          <p className="text-sm sm:text-base text-[#D5C5AE] max-w-2xl mt-3 leading-relaxed">
            Create an archaeologically rich pilgrimage across the stupas of Telangana. Choose your starting city, group size, and scholarly interests to generate a curated day-by-day itinerary.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 bg-[#191B20] border border-[#2E333D] p-2 text-xs">
          <span
            className={`px-2.5 py-1 ${
              step === 1 ? 'bg-[#B89255] text-[#0D0E10] font-bold' : 'text-[#9E9689]'
            }`}
          >
            1. Logistics
          </span>
          <span className="text-[#2E333D]">/</span>
          <span
            className={`px-2.5 py-1 ${
              step === 2 ? 'bg-[#B89255] text-[#0D0E10] font-bold' : 'text-[#9E9689]'
            }`}
          >
            2. Interests
          </span>
          <span className="text-[#2E333D]">/</span>
          <span
            className={`px-2.5 py-1 ${
              step === 3 ? 'bg-[#B89255] text-[#0D0E10] font-bold' : 'text-[#9E9689]'
            }`}
          >
            3. Itinerary
          </span>
        </div>
      </div>

      {/* Interactive Multi-Step Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form / Builder Panel */}
        <div className="lg:col-span-5 bg-[#191B20] border border-[#2E333D] p-6 sm:p-8 space-y-6">
          {step === 1 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="font-serif text-xl font-bold text-[#FAF8F3] pb-2 border-b border-[#2E333D]">
                Step 1: Logistics & Base
              </h3>

              {/* Starting location */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                  Starting Gateway Location
                </label>
                <select
                  value={startLocation}
                  onChange={(e) => setStartLocation(e.target.value)}
                  className="w-full bg-[#121316] text-[#FAF8F3] text-sm px-3.5 py-2.5 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
                >
                  <option value="Hyderabad">Hyderabad (Rajiv Gandhi International Airport)</option>
                  <option value="Warangal">Warangal (North-Eastern Hub)</option>
                  <option value="Karimnagar">Karimnagar (Godavari Basin Gateway)</option>
                  <option value="Khammam">Khammam (Krishna River Corridor)</option>
                </select>
              </div>

              {/* Number of Days */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                  Expedition Duration (Days)
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 5].map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDurationDays(d)}
                      className={`py-2 text-xs font-semibold border transition-colors cursor-pointer ${
                        durationDays === d
                          ? 'bg-[#B89255] text-[#0D0E10] border-[#B89255]'
                          : 'bg-[#121316] text-[#D5C5AE] border-[#2E333D] hover:bg-[#22262E]'
                      }`}
                    >
                      {d} {d === 1 ? 'Day' : 'Days'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Group Size */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                  Group Profile
                </label>
                <select
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  className="w-full bg-[#121316] text-[#FAF8F3] text-sm px-3.5 py-2.5 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
                >
                  <option value="Solo Researcher">Solo Researcher / Traveler</option>
                  <option value="2-4 Travelers">Small Group (2-4 Travelers)</option>
                  <option value="Academic Delegation">Academic or Monastic Delegation</option>
                  <option value="Family Heritage Tour">Family Heritage Exploration</option>
                </select>
              </div>

              <div className="pt-4 border-t border-[#2E333D] flex justify-end">
                <Button variant="gold" onClick={() => setStep(2)}>
                  <span>Next: Set Interests</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <h3 className="font-serif text-xl font-bold text-[#FAF8F3] pb-2 border-b border-[#2E333D]">
                Step 2: Interests & Pace
              </h3>

              {/* Preferred Pace */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                  Preferred Travel Pace
                </label>
                <div className="space-y-2">
                  {(['Relaxed', 'Moderate', 'Archaeological Immersion'] as const).map((p) => (
                    <label
                      key={p}
                      className={`flex items-center justify-between p-3 border cursor-pointer transition-colors ${
                        pace === p
                          ? 'bg-[#B89255]/15 border-[#B89255] text-[#FAF8F3]'
                          : 'bg-[#121316] border-[#2E333D] text-[#D5C5AE] hover:bg-[#22262E]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="pace"
                          checked={pace === p}
                          onChange={() => setPace(p)}
                          className="accent-[#B89255]"
                        />
                        <span className="text-xs font-semibold">{p}</span>
                      </div>
                      <span className="text-[10px] text-[#9E9689]">
                        {p === 'Relaxed'
                          ? '1 site/day'
                          : p === 'Moderate'
                          ? '2 sites/day'
                          : 'In-depth excavations'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Specific Interests */}
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                  Focus Areas
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((opt) => {
                    const isSelected = selectedInterests.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleInterest(opt)}
                        className={`px-3 py-1.5 text-xs transition-colors border cursor-pointer ${
                          isSelected
                            ? 'bg-[#B89255] text-[#0D0E10] font-semibold border-[#B89255]'
                            : 'bg-[#121316] text-[#D5C5AE] border-[#2E333D] hover:bg-[#22262E]'
                        }`}
                      >
                        {isSelected ? '✓ ' : '+ '}
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-[#2E333D] flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button variant="gold" onClick={handleGenerate}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span>Generate Itinerary</span>
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-[#2E333D]">
                <h3 className="font-serif text-xl font-bold text-[#FAF8F3]">
                  Configuration Summary
                </h3>
                <button
                  onClick={() => setStep(1)}
                  className="flex items-center gap-1 text-xs text-[#B89255] hover:underline cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reconfigure</span>
                </button>
              </div>

              <div className="space-y-3 text-xs text-[#D5C5AE]">
                <div className="flex justify-between py-1.5 border-b border-[#2E333D]/60">
                  <span className="text-[#9E9689]">Starting Hub:</span>
                  <span className="font-semibold text-[#FAF8F3]">{startLocation}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#2E333D]/60">
                  <span className="text-[#9E9689]">Duration:</span>
                  <span className="font-semibold text-[#FAF8F3]">{durationDays} Days</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#2E333D]/60">
                  <span className="text-[#9E9689]">Travel Pace:</span>
                  <span className="font-semibold text-[#FAF8F3]">{pace}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-[#2E333D]/60">
                  <span className="text-[#9E9689]">Group Size:</span>
                  <span className="font-semibold text-[#FAF8F3]">{groupSize}</span>
                </div>
              </div>

              {/* Action Buttons: Print, Share, Save */}
              <div className="pt-2 space-y-2">
                <Button
                  variant="outline"
                  onClick={handlePrint}
                  className="w-full text-xs flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-[#B89255]" />
                  <span>Print Itinerary / Export PDF</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={handleShare}
                  className="w-full text-xs flex items-center justify-center gap-2"
                >
                  <Share2 className="w-4 h-4 text-[#B89255]" />
                  <span>Share Travel Plan</span>
                </Button>
              </div>

              {/* Field Guide Practical Tips */}
              <div className="p-4 bg-[#121316] border border-[#2E333D] text-xs text-[#D5C5AE] space-y-2">
                <strong className="text-[#E8C868] block uppercase text-[10px] tracking-wider">
                  Archaeological Field Tips:
                </strong>
                <ul className="space-y-1 list-disc list-inside text-[11px] text-[#9E9689]">
                  <li>Wear sturdy trekking footwear for hillocks like Phanigiri.</li>
                  <li>Carry sun protection; stone complexes have minimal shade.</li>
                  <li>Early mornings (08:00–11:00 AM) offer prime photography light.</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Right Output: Curated Itinerary Display */}
        <div className="lg:col-span-7">
          <ItineraryCard itinerary={activePlan} isDetailed={true} />
        </div>
      </div>
    </div>
  );
};
