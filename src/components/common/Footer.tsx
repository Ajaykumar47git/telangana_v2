import React from 'react';
import { useHeritage } from '../../context/HeritageContext';
import { Landmark, Compass, Database, Bot, BookOpen, Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useHeritage();

  return (
    <footer className="bg-[#0D0E10] border-t border-[#2E333D] text-[#D5C5AE] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#2E333D]/60">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-[#191B20] border border-[#B89255]/50">
                <svg className="w-4 h-4 text-[#B89255]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="9" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="12" y1="3" x2="12" y2="21" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold text-[#FAF8F3]">
                SanghaTelangana
              </span>
            </div>

            <p className="font-serif text-lg italic text-[#B89255]">
              Preserving the Past. Inspiring the Future.
            </p>

            <p className="text-xs text-[#9E9689] leading-relaxed max-w-sm">
              An open digital heritage initiative documenting the Buddhist monuments, inscriptions, and art historical evolution across Telangana, from the 3rd Century BCE Satavahana era through the Ikshvaku dynasty.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#9E9689]">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#B89255]" />
                Archaeological Integrity
              </span>
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5 text-[#B89255]" />
                Open Access Archives
              </span>
            </div>
          </div>

          {/* Nav Col 1 */}
          <div>
            <h4 className="text-xs font-semibold text-[#FAF8F3] uppercase tracking-wider mb-4">
              Exploration
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigate('/sites')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  Heritage Sites
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/map')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  Interactive Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/virtual-tours')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  360° Virtual Tours
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/plan')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  Plan Your Journey
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/calendar')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  Cultural Calendar
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 2 */}
          <div>
            <h4 className="text-xs font-semibold text-[#FAF8F3] uppercase tracking-wider mb-4">
              Research & AI
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigate('/archive')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  Digital Archive
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/ai-guide')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  AI Heritage Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/favorites')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  Saved Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/contribute')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  Contribute Research
                </button>
              </li>
            </ul>
          </div>

          {/* Nav Col 3 */}
          <div>
            <h4 className="text-xs font-semibold text-[#FAF8F3] uppercase tracking-wider mb-4">
              Institution
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => navigate('/about')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  About the Project
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about#contact')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  Contact & Scholarly Inquiries
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about#privacy')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  Privacy & Data Stewardship
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate('/about#terms')}
                  className="hover:text-[#B89255] transition-colors cursor-pointer"
                >
                  Terms of Cultural Use
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#9E9689] gap-4">
          <p>© {new Date().getFullYear()} SanghaTelangana. Digital Heritage Repository.</p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-[#B89255]/80">
              Digitize. Preserve. Reconstruct. Explore.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
