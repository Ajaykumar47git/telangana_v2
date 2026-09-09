import React, { useState } from 'react';
import { Compass, Sparkles, Volume2, ArrowRight, Box, Landmark, Search, Shield, ChevronRight } from 'lucide-react';
import { HERITAGE_SITES, DIGITAL_ARTIFACTS, AUDIO_STORIES, DEMO_ITINERARIES } from '../data/heritageData';
import { useHeritage } from '../context/HeritageContext';
import { HeritageSiteCard } from '../components/heritage/HeritageSiteCard';
import { ArtifactCard } from '../components/heritage/ArtifactCard';
import { HeritageMap } from '../components/heritage/HeritageMap';
import { AIChat } from '../components/heritage/AIChat';
import { Button } from '../components/ui/button';
import { Modal } from '../components/common/Modal';

export const HomePage: React.FC = () => {
  const { navigate, playAudio, setIsSearchOpen } = useHeritage();
  const [is3DModalOpen, setIs3DModalOpen] = useState(false);
  const [selectedArchiveCat, setSelectedArchiveCat] = useState<string>('All');

  // Trip planner preview state
  const [planDays, setPlanDays] = useState<number>(3);
  const [planLocation, setPlanLocation] = useState<string>('Hyderabad');
  const [planInterests, setPlanInterests] = useState<string[]>(['Archaeology', 'Buddhism']);
  const [planStyle, setPlanStyle] = useState<string>('Cultural Immersion');

  const featuredSites = HERITAGE_SITES.filter((s) => s.featured);

  const archiveCategories = [
    'All',
    'Inscriptions',
    'Sculptures',
    'Coins',
    'Pottery',
    'Architecture',
    'Manuscripts'
  ];

  const filteredArtifacts = selectedArchiveCat === 'All'
    ? DIGITAL_ARTIFACTS.slice(0, 4)
    : DIGITAL_ARTIFACTS.filter((a) => a.category === selectedArchiveCat);

  const toggleInterest = (interest: string) => {
    setPlanInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 5. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0D0E10]">
        {/* Background Image with Ambient Darkness */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=2000&q=85"
            alt="Telangana Ancient Buddhist Stupa at Phanigiri"
            className="w-full h-full object-cover brightness-[0.38] contrast-110 scale-105 transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
          {/* Subtle gradient vignettes */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121316] via-[#121316]/50 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#0D0E10]/40 to-[#0D0E10]/90" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
          {/* Historical Period Marker */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#191B20]/80 backdrop-blur-md border border-[#B89255]/50 mb-6 text-xs tracking-widest uppercase text-[#E8C868] font-sans animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B89255]" />
            <span>Digital Repository • 3rd Century BCE to 4th Century CE</span>
          </div>

          {/* Hero Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold text-[#FAF8F3] tracking-tight leading-[1.1] max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-3 duration-700">
            Rediscover Telangana&apos;s Buddhist Heritage
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-base sm:text-xl text-[#D5C5AE] max-w-2xl mx-auto mt-6 leading-relaxed font-normal animate-in fade-in slide-in-from-bottom-4 duration-700">
            Explore ancient monasteries, inscriptions, artifacts and sacred landscapes through immersive digital technology.
          </p>

          {/* Hero CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10 animate-in fade-in slide-in-from-bottom-5 duration-700">
            <Button
              id="hero-explore-heritage-btn"
              variant="gold"
              size="lg"
              onClick={() => navigate('/sites')}
              className="w-full sm:w-auto text-sm sm:text-base font-semibold px-8"
            >
              <span>Explore Heritage</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>

            <Button
              id="hero-virtual-tour-btn"
              variant="outline"
              size="lg"
              onClick={() => navigate('/virtual-tours')}
              className="w-full sm:w-auto text-sm sm:text-base px-8 border-[#B89255]/60 hover:bg-[#B89255]/10"
            >
              <Compass className="w-4 h-4 mr-2 text-[#B89255]" />
              <span>Take a Virtual Tour</span>
            </Button>
          </div>

          {/* Key Stat Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto pt-8 border-t border-[#2E333D]/60 text-left">
            <div className="p-3 bg-[#121316]/60 backdrop-blur-xs border border-[#2E333D]/40">
              <span className="font-serif text-2xl font-bold text-[#FAF8F3] block">7+</span>
              <span className="text-[11px] uppercase tracking-wider text-[#9E9689]">Major Stupa Complexes</span>
            </div>
            <div className="p-3 bg-[#121316]/60 backdrop-blur-xs border border-[#2E333D]/40">
              <span className="font-serif text-2xl font-bold text-[#B89255] block">850+</span>
              <span className="text-[11px] uppercase tracking-wider text-[#9E9689]">Catalogued Antiquities</span>
            </div>
            <div className="p-3 bg-[#121316]/60 backdrop-blur-xs border border-[#2E333D]/40">
              <span className="font-serif text-2xl font-bold text-[#FAF8F3] block">2,300</span>
              <span className="text-[11px] uppercase tracking-wider text-[#9E9689]">Years of Chronology</span>
            </div>
            <div className="p-3 bg-[#121316]/60 backdrop-blur-xs border border-[#2E333D]/40">
              <span className="font-serif text-2xl font-bold text-[#B89255] block">360°</span>
              <span className="text-[11px] uppercase tracking-wider text-[#9E9689]">Virtual Explorations</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. HERITAGE MAP PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#2E333D]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Cartographic Visualization</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF8F3]">
              Explore Telangana&apos;s Buddhist Heritage
            </h2>
            <p className="text-sm text-[#D5C5AE] mt-2 max-w-xl">
              Traverse the sacred waterways of the Godavari and Krishna valleys. Click any site pin to inspect excavation findings, historical eras, and 360° tours.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/map')}
            className="mt-4 md:mt-0 self-start md:self-auto text-xs"
          >
            <span>Open Fullscreen Map</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        <HeritageMap heightClass="h-[480px] lg:h-[580px]" />
      </section>

      {/* 7. FEATURED HERITAGE SITES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#2E333D]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-1">
              <Landmark className="w-3.5 h-3.5" />
              <span>Sanctuaries of Significance</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF8F3]">
              Featured Heritage Sites
            </h2>
            <p className="text-sm text-[#D5C5AE] mt-2 max-w-xl">
              Monastic citadels that hosted pilgrims, scholars, and stone-carving ateliers along the Deccan trade routes.
            </p>
          </div>

          <Button
            variant="ghost"
            onClick={() => navigate('/sites')}
            className="mt-4 md:mt-0 self-start md:self-auto text-xs text-[#B89255] hover:underline p-0"
          >
            <span>View All 7 Monastic Sites</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {/* 4 Featured Sites Grid: Phanigiri, Dhulikatta, Nelakondapalli, Nagarjuna Konda */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featuredSites.map((site) => (
            <HeritageSiteCard key={site.id} site={site} variant="featured" />
          ))}
        </div>
      </section>

      {/* 8. EXPERIENCE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest text-[#B89255] font-semibold block mb-2">
            Multi-Sensory Engagement
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF8F3]">
            Immersive Digital Experiences
          </h2>
          <p className="text-sm text-[#D5C5AE] mt-2">
            Step beyond static photographs through spatial photogrammetry, 3D architectural recreations, and spoken oral histories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Virtual Tours */}
          <div className="group bg-[#191B20] border border-[#2E333D] hover:border-[#B89255]/70 p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B89255]/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="w-12 h-12 flex items-center justify-center bg-[#22262E] text-[#B89255] border border-[#B89255]/40 mb-6 group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#FAF8F3]">Virtual Tours</h3>
              <p className="text-sm text-[#D5C5AE] mt-3 leading-relaxed">
                Walk through ancient heritage from anywhere.
              </p>
              <p className="text-xs text-[#9E9689] mt-2">
                High-definition 360° panoramas with interactive architectural hotspot tags across Phanigiri and Dhulikatta.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#2E333D]">
              <Button
                variant="gold"
                size="sm"
                onClick={() => navigate('/virtual-tours')}
                className="w-full text-xs font-semibold"
              >
                <span>Explore Tours</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>

          {/* Card 2: 3D Reconstruction */}
          <div className="group bg-[#191B20] border border-[#2E333D] hover:border-[#B89255]/70 p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B89255]/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="w-12 h-12 flex items-center justify-center bg-[#22262E] text-[#E8C868] border border-[#B89255]/40 mb-6 group-hover:scale-110 transition-transform">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#FAF8F3]">3D Reconstruction</h3>
              <p className="text-sm text-[#D5C5AE] mt-3 leading-relaxed">
                Visualize heritage structures as they may have appeared in the past.
              </p>
              <p className="text-xs text-[#9E9689] mt-2">
                Scholarly architectural models restoring the hemispherical stupa domes, carved toranas, and monastic cloister pillars.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#2E333D]">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIs3DModalOpen(true)}
                className="w-full text-xs font-semibold hover:border-[#B89255]"
              >
                <span>Enter 3D Experience</span>
                <Sparkles className="w-3.5 h-3.5 ml-1.5 text-[#B89255]" />
              </Button>
            </div>
          </div>

          {/* Card 3: Audio Stories */}
          <div className="group bg-[#191B20] border border-[#2E333D] hover:border-[#B89255]/70 p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B89255]/5 rounded-bl-full pointer-events-none" />
            <div>
              <div className="w-12 h-12 flex items-center justify-center bg-[#22262E] text-[#B89255] border border-[#B89255]/40 mb-6 group-hover:scale-110 transition-transform">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-semibold text-[#FAF8F3]">Audio Stories</h3>
              <p className="text-sm text-[#D5C5AE] mt-3 leading-relaxed">
                Listen to heritage stories in your preferred language.
              </p>
              <p className="text-xs text-[#9E9689] mt-2">
                Narrated histories by leading epigraphists and archaeologists in English, Telugu (తెలుగు), and Hindi (हिन्दी).
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-[#2E333D]">
              <Button
                variant="gold"
                size="sm"
                onClick={() => playAudio(AUDIO_STORIES[0])}
                className="w-full text-xs font-semibold"
              >
                <span>Listen Now</span>
                <Volume2 className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. DIGITAL ARCHIVE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#2E333D]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-1">
              <Shield className="w-3.5 h-3.5" />
              <span>Epigraphical & Archaeological Corpus</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF8F3]">
              Digital Archive Preview
            </h2>
            <p className="text-sm text-[#D5C5AE] mt-2 max-w-xl">
              Explore catalogued sculptures, Brahmi inscriptions, punch-marked coins, and terracotta from state excavations.
            </p>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/archive')}
            className="mt-4 md:mt-0 self-start md:self-auto text-xs"
          >
            <span>Search Full Digital Archive</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {archiveCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedArchiveCat(cat)}
              className={`px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                selectedArchiveCat === cat
                  ? 'bg-[#B89255] text-[#0D0E10] font-semibold'
                  : 'bg-[#191B20] text-[#D5C5AE] hover:bg-[#22262E] hover:text-[#FAF8F3] border border-[#2E333D]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Artifact Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredArtifacts.map((art) => (
            <ArtifactCard key={art.id} artifact={art} />
          ))}
        </div>
      </section>

      {/* 10. AI HERITAGE GUIDE PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#15171D] border border-[#2E333D] p-6 sm:p-10">
          <div className="lg:col-span-5 space-y-4">
            <span className="text-xs uppercase tracking-widest text-[#B89255] font-semibold block">
              Scholarly AI Companion
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF8F3] leading-tight">
              Ask the Heritage Guide
            </h2>
            <p className="text-sm text-[#D5C5AE] leading-relaxed">
              Curious about the difference between a Vihara and Chaitya? Want to know which sites belong to the early Satavahanas or decode Brahmi inscriptions? Ask our specialized guide.
            </p>

            <div className="pt-2 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-[#9E9689] font-medium block">
                Popular Sample Questions:
              </span>
              <ul className="space-y-1.5 text-xs text-[#D5C5AE]">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89255]" />
                  <span>&quot;What is Phanigiri famous for?&quot;</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89255]" />
                  <span>&quot;What was a Buddhist vihara?&quot;</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89255]" />
                  <span>&quot;Which sites belong to the Satavahana period?&quot;</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B89255]" />
                  <span>&quot;Show inscriptions from Phanigiri.&quot;</span>
                </li>
              </ul>
            </div>

            <div className="pt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/ai-guide')}
                className="text-xs"
              >
                <span>Launch Fullscreen AI Guide</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <AIChat isCompact={true} />
          </div>
        </div>
      </section>

      {/* 11. TRIP PLANNER PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-[#2E333D]">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span>Cultural Tourism</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#FAF8F3]">
              Plan Your Heritage Journey
            </h2>
            <p className="text-sm text-[#D5C5AE] mt-2 max-w-xl">
              Design a tailored pilgrimage or archaeological exploration based on your days, interests, and preferred travel rhythm.
            </p>
          </div>

          <Button
            variant="gold"
            size="sm"
            onClick={() => navigate('/plan')}
            className="mt-4 md:mt-0 self-start md:self-auto text-xs"
          >
            <span>Open Interactive Trip Planner</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        {/* Planner Preview Interactive Controls */}
        <div className="bg-[#191B20] border border-[#2E333D] p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-6 border-b border-[#2E333D]">
            {/* Input 1: Number of days */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                1. Duration (Days)
              </label>
              <div className="flex gap-2">
                {[1, 3, 5, 7].map((d) => (
                  <button
                    key={d}
                    onClick={() => setPlanDays(d)}
                    className={`flex-1 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                      planDays === d
                        ? 'bg-[#B89255] text-[#0D0E10]'
                        : 'bg-[#121316] text-[#D5C5AE] hover:bg-[#22262E] border border-[#2E333D]'
                    }`}
                  >
                    {d} {d === 1 ? 'Day' : 'Days'}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Starting Location */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                2. Starting Base
              </label>
              <select
                value={planLocation}
                onChange={(e) => setPlanLocation(e.target.value)}
                className="w-full bg-[#121316] text-[#FAF8F3] text-xs px-3 py-2.5 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
              >
                <option value="Hyderabad">Hyderabad (Capital Gateway)</option>
                <option value="Warangal">Warangal (Kakatiya Hub)</option>
                <option value="Karimnagar">Karimnagar (Godavari Basin)</option>
                <option value="Khammam">Khammam (Krishna Gateway)</option>
              </select>
            </div>

            {/* Input 3: Travel Style */}
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2">
                3. Travel Style
              </label>
              <select
                value={planStyle}
                onChange={(e) => setPlanStyle(e.target.value)}
                className="w-full bg-[#121316] text-[#FAF8F3] text-xs px-3 py-2.5 border border-[#2E333D] focus:outline-none focus:border-[#B89255]"
              >
                <option value="Cultural Immersion">Cultural Immersion</option>
                <option value="In-depth Archaeological Study">In-depth Archaeological Study</option>
                <option value="Spiritual Contemplation">Spiritual Contemplation</option>
                <option value="Scenic Photography">Scenic Photography</option>
              </select>
            </div>

            {/* Input 4: Generate Action */}
            <div className="flex flex-col justify-end">
              <Button
                variant="gold"
                onClick={() => navigate('/plan')}
                className="w-full h-10 text-xs font-semibold"
              >
                <span>Generate Itinerary</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </div>
          </div>

          {/* Interests Pills */}
          <div className="pt-6">
            <label className="text-xs font-semibold uppercase tracking-wider text-[#D5C5AE] block mb-2.5">
              Select Your Interests:
            </label>
            <div className="flex flex-wrap gap-2">
              {['Archaeology', 'Buddhism', 'Photography', 'Architecture', 'Spirituality'].map((interest) => {
                const active = planInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1.5 text-xs transition-colors cursor-pointer border ${
                      active
                        ? 'bg-[#B89255]/20 text-[#E8C868] border-[#B89255] font-medium'
                        : 'bg-[#121316] text-[#9E9689] border-[#2E333D] hover:text-[#FAF8F3]'
                    }`}
                  >
                    {active ? '✓ ' : '+ '} {interest}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Real-time generated preview snippet */}
          <div className="mt-8 p-5 bg-[#121316] border border-[#2E333D] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-mono text-[#B89255] uppercase tracking-wider block">
                Previewing: {DEMO_ITINERARIES[0].title}
              </span>
              <p className="font-serif text-lg font-semibold text-[#FAF8F3] mt-0.5">
                {DEMO_ITINERARIES[0].days} Days • {DEMO_ITINERARIES[0].stops.length} Key Monastic Citadels
              </p>
              <p className="text-xs text-[#D5C5AE] mt-1 max-w-xl">
                {DEMO_ITINERARIES[0].overview}
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/plan')}
              className="shrink-0 text-xs"
            >
              <span>View Full Day-by-Day Schedule</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>
      </section>

      {/* 3D Reconstruction Interactive Modal */}
      <Modal
        isOpen={is3DModalOpen}
        onClose={() => setIs3DModalOpen(false)}
        title="3D Heritage Reconstruction"
        subtitle="Illustrative Photogrammetric Model • Phanigiri Maha Stupa & Torana"
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <div className="relative aspect-[16/10] bg-[#121316] border border-[#2E333D] overflow-hidden flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80"
              alt="3D Stupa Model"
              className="w-full h-full object-cover brightness-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80 flex flex-col items-center justify-center p-6 text-center">
              <div className="w-12 h-12 rounded-full bg-[#B89255]/20 border border-[#B89255] flex items-center justify-center text-[#B89255] mb-3">
                <Box className="w-6 h-6 animate-pulse" />
              </div>
              <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-amber-950/80 text-amber-300 border border-amber-800 mb-2">
                Illustrative Reconstruction
              </span>
              <h4 className="font-serif text-xl font-bold text-[#FAF8F3]">
                Phanigiri 3D Digital Twin
              </h4>
              <p className="text-xs text-[#D5C5AE] max-w-md mt-1">
                Rendered using LiDAR survey data and 18,000 high-resolution aerial photogrammetry points collected by the State Archaeology Department.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center text-xs">
            <div className="p-2.5 bg-[#121316] border border-[#2E333D]">
              <span className="text-[10px] text-[#9E9689] uppercase block">LOD Level</span>
              <span className="font-semibold text-[#FAF8F3]">LOD 4 (Architectural)</span>
            </div>
            <div className="p-2.5 bg-[#121316] border border-[#2E333D]">
              <span className="text-[10px] text-[#9E9689] uppercase block">Polygon Mesh</span>
              <span className="font-semibold text-[#B89255]">1.4M Polygons</span>
            </div>
            <div className="p-2.5 bg-[#121316] border border-[#2E333D]">
              <span className="text-[10px] text-[#9E9689] uppercase block">Texture Maps</span>
              <span className="font-semibold text-[#FAF8F3]">8K PBR Stone</span>
            </div>
          </div>

          <div className="pt-2 flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => setIs3DModalOpen(false)}>
              Close
            </Button>
            <Button
              variant="gold"
              size="sm"
              onClick={() => {
                setIs3DModalOpen(false);
                navigate('/virtual-tours/phanigiri');
              }}
            >
              Explore in 360° Tour
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
