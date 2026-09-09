import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useHeritage } from '../../context/HeritageContext';
import { SupportedLanguage } from '../../types/heritage';

export const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage, showNotification } = useHeritage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const languages: { code: SupportedLanguage; label: string; sub: string }[] = [
    { code: 'en', label: 'English', sub: 'Default' },
    { code: 'te', label: 'తెలుగు', sub: 'Telugu' },
    { code: 'hi', label: 'हिन्दी', sub: 'Hindi' }
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectLanguage = (code: SupportedLanguage, label: string) => {
    setLanguage(code);
    setIsOpen(false);
    showNotification(`Language switched to ${label}`);
  };

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        id="language-switcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs text-[#EADBCA] hover:text-[#FAF8F3] hover:bg-[#22262E] transition-colors border border-[#2E333D]/70 cursor-pointer"
        aria-label="Select Language"
        aria-expanded={isOpen}
      >
        <Globe className="w-3.5 h-3.5 text-[#B89255]" />
        <span className="font-medium tracking-wider">{currentLang.label}</span>
        <ChevronDown className={`w-3 h-3 text-[#9E9689] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-40 bg-[#191B20] border border-[#2E333D] shadow-xl py-1 z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-3 py-1 text-[10px] uppercase tracking-widest text-[#9E9689] border-b border-[#2E333D]/50 font-medium">
            Language / భాష
          </div>
          {languages.map((item) => (
            <button
              key={item.code}
              onClick={() => selectLanguage(item.code, item.label)}
              className="w-full flex items-center justify-between px-3 py-2 text-left text-xs text-[#F5F1E8] hover:bg-[#22262E] transition-colors cursor-pointer"
            >
              <div>
                <span className="font-medium">{item.label}</span>
                <span className="text-[10px] text-[#9E9689] ml-1.5">({item.sub})</span>
              </div>
              {language === item.code && <Check className="w-3.5 h-3.5 text-[#B89255]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
