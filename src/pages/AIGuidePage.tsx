import React from 'react';
import { Bot, Sparkles, BookOpen, Shield, HelpCircle, Layers } from 'lucide-react';
import { AIChat } from '../components/heritage/AIChat';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const AIGuidePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'AI Heritage Guide' }]} />

      {/* Header */}
      <div className="border-b border-[#2E333D] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89255] font-semibold mb-2">
            <Bot className="w-4 h-4" />
            <span>Interactive Epigraphical & Monastic Intelligence</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#FAF8F3]">
            Ask SanghaTelangana AI
          </h1>
          <p className="text-sm sm:text-base text-[#D5C5AE] max-w-2xl mt-2 leading-relaxed">
            Query our archaeological knowledge base. Explore Buddhist monastic architecture, decipher Brahmi inscriptions, and discover the history of the Satavahana and Ikshvaku dynasties.
          </p>
        </div>

        {/* Status pill */}
        <div className="px-3.5 py-1.5 bg-[#191B20] border border-[#2E333D] flex items-center gap-2 self-start md:self-auto text-xs text-[#EADBCA]">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>Archaeological Corpus v1.2</span>
        </div>
      </div>

      {/* Main Grid: Guide Chat + Scholarly Knowledge Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Chat Area */}
        <div className="lg:col-span-8">
          <AIChat isCompact={false} />
        </div>

        {/* Sidebar Info & Topics */}
        <div className="lg:col-span-4 space-y-6">
          {/* Research Corpus Card */}
          <div className="bg-[#191B20] border border-[#2E333D] p-5 space-y-3 text-xs">
            <div className="flex items-center gap-2 text-xs font-serif font-semibold text-[#FAF8F3] pb-2 border-b border-[#2E333D]">
              <BookOpen className="w-4 h-4 text-[#B89255]" />
              <span>Corpus Foundations</span>
            </div>
            <p className="text-[#D5C5AE] leading-relaxed">
              Trained on scholarly excavations published by the Archaeological Survey of India (ASI) and the Department of Heritage Telangana, covering epigraphical records from 300 BCE to 400 CE.
            </p>
            <div className="pt-2 border-t border-[#2E333D]/60 flex items-center gap-2 text-[11px] text-[#9E9689]">
              <Shield className="w-3.5 h-3.5 text-[#B89255]" />
              <span>Archaeological Fact-Checked</span>
            </div>
          </div>

          {/* Research Inquiries */}
          <div className="bg-[#191B20] border border-[#2E333D] p-5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-serif font-semibold text-[#FAF8F3] pb-2 border-b border-[#2E333D]">
              <HelpCircle className="w-4 h-4 text-[#B89255]" />
              <span>Core Exploration Themes</span>
            </div>
            <ul className="space-y-2.5 text-xs text-[#D5C5AE]">
              <li className="p-2 bg-[#121316] border border-[#2E333D]/70">
                <strong className="text-[#FAF8F3] block">Monastic Layouts:</strong>
                Understand the functional roles of Chaityagriha, Vihara cells, and Ayaka platforms.
              </li>
              <li className="p-2 bg-[#121316] border border-[#2E333D]/70">
                <strong className="text-[#FAF8F3] block">Epigraphy & Brahmi:</strong>
                Analyze donor inscriptions carved into limestone stupa casing slabs.
              </li>
              <li className="p-2 bg-[#121316] border border-[#2E333D]/70">
                <strong className="text-[#FAF8F3] block">Trade Corridors:</strong>
                Track Dakshinapatha commercial routes bridging inland Telangana with maritime ports.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
