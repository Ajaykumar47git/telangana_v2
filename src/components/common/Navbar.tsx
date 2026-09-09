import React, { useState } from 'react';
import { Search, Heart, User, Menu, X, Compass, BookmarkCheck, Shield, LogOut } from 'lucide-react';
import { useHeritage } from '../../context/HeritageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Button } from '../ui/button';

export const Navbar: React.FC = () => {
  const {
    currentPath,
    navigate,
    favorites,
    setIsSearchOpen,
    setIsLoginOpen,
    currentUser,
    userRole,
    logout
  } = useHeritage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const totalFavorites =
    (favorites.sites?.length || 0) +
    (favorites.artifacts?.length || 0) +
    (favorites.tours?.length || 0) +
    (favorites.itineraries?.length || 0);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Heritage Sites', path: '/sites' },
    { label: 'Explore Map', path: '/map' },
    { label: 'Virtual Tours', path: '/virtual-tours' },
    { label: '3D Experience', path: '/experience' },
    { label: 'Digital Archive', path: '/archive' },
    { label: 'AI Heritage Guide', path: '/ai-guide' },
    { label: 'Plan Your Journey', path: '/plan' },
    { label: 'Cultural Calendar', path: '/calendar' },
    { label: 'About', path: '/about' }
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#121316]/95 backdrop-blur-md border-b border-[#2E333D]/80">
      {/* Top micro-bar for institutional identity */}
      <div className="hidden lg:flex items-center justify-between px-6 py-1 bg-[#0D0E10] text-[11px] text-[#9E9689] border-b border-[#2E333D]/40">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B89255]" />
          <span>Department of Heritage & Archaeological Research • Telangana</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[#D5C5AE]">Preserving 2,300 Years of Buddhist Chronology</span>
          <button
            onClick={() => handleNavClick('/contribute')}
            className="text-[#B89255] hover:underline cursor-pointer"
          >
            Contribute Inscription / Photo
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('/')}
          className="flex items-center gap-3 text-left group cursor-pointer"
          aria-label="SanghaTelangana Home"
        >
          {/* Stylized Dharmachakra / Stupa Icon */}
          <div className="relative w-9 h-9 flex items-center justify-center bg-[#191B20] border border-[#B89255]/50 group-hover:border-[#B89255] transition-colors">
            <svg
              className="w-5 h-5 text-[#B89255] group-hover:rotate-45 transition-transform duration-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="3" />
              <line x1="12" y1="3" x2="12" y2="9" />
              <line x1="12" y1="15" x2="12" y2="21" />
              <line x1="3" y1="12" x2="9" y2="12" />
              <line x1="15" y1="12" x2="21" y2="12" />
              <line x1="5.6" y1="5.6" x2="9.9" y2="9.9" />
              <line x1="14.1" y1="14.1" x2="18.4" y2="18.4" />
              <line x1="5.6" y1="18.4" x2="9.9" y2="14.1" />
              <line x1="14.1" y1="9.9" x2="18.4" y2="5.6" />
            </svg>
          </div>

          <div>
            <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#FAF8F3] group-hover:text-[#B89255] transition-colors block leading-none">
              SanghaTelangana
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[#B89255] font-sans font-medium block mt-1">
              Digital Heritage Platform
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <button
                key={link.path}
                onClick={() => handleNavClick(link.path)}
                className={`px-2.5 py-1.5 text-[13px] font-sans transition-all duration-200 cursor-pointer relative ${
                  active
                    ? 'text-[#FAF8F3] font-medium'
                    : 'text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#191B20]'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#B89255]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Quick Search */}
          <button
            id="nav-search-button"
            onClick={() => setIsSearchOpen(true)}
            className="p-2 text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#191B20] transition-colors border border-transparent hover:border-[#2E333D] cursor-pointer"
            aria-label="Search Heritage Archive"
            title="Search (Ctrl + K)"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Language Selector */}
          <LanguageSwitcher />

          {/* Favorites */}
          <button
            id="nav-favorites-button"
            onClick={() => handleNavClick('/favorites')}
            className="relative p-2 text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#191B20] transition-colors border border-transparent hover:border-[#2E333D] cursor-pointer"
            aria-label="Saved Heritage Items"
            title="Saved Heritage Items"
          >
            <Heart className="w-4 h-4" />
            {totalFavorites > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B89255] text-[#0D0E10] text-[9px] font-bold flex items-center justify-center leading-none">
                {totalFavorites}
              </span>
            )}
          </button>

          {/* User Profile / Login */}
          {currentUser ? (
            <div className="relative">
              <button
                id="nav-user-profile-button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 px-2 bg-[#1A1D24] hover:bg-[#22262E] border border-[#2E333D] hover:border-[#B89255] rounded text-left transition-colors cursor-pointer"
              >
                <div className="w-6 h-6 rounded-full bg-[#B89255]/20 text-[#B89255] border border-[#B89255] flex items-center justify-center text-xs font-semibold">
                  {currentUser.avatar_url ? (
                    <img src={currentUser.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    currentUser.name.charAt(0)
                  )}
                </div>
                <div className="hidden md:block leading-tight">
                  <div className="text-xs text-[#FAF8F3] font-medium max-w-[90px] truncate">{currentUser.name}</div>
                  <div className="text-[9px] text-[#B89255] uppercase tracking-wider font-semibold">{userRole}</div>
                </div>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#1A1D24] border border-[#2E333D] rounded-lg shadow-xl py-2 z-50 animate-in fade-in-50 duration-150">
                  <div className="px-4 py-2 border-b border-[#2E333D]">
                    <p className="text-xs font-semibold text-[#FAF8F3] truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-[#9E9689] truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[9px] px-2 py-0.5 rounded bg-[#B89255]/20 text-[#B89255] font-semibold uppercase">
                      {userRole} Account
                    </span>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => handleNavClick('/profile')}
                      className="w-full px-4 py-2 text-left text-xs text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#22262E] flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-[#B89255]" />
                      <span>User Profile & Submissions</span>
                    </button>
                    <button
                      onClick={() => handleNavClick('/favorites')}
                      className="w-full px-4 py-2 text-left text-xs text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#22262E] flex items-center gap-2 cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5 text-[#B89255]" />
                      <span>Saved Heritage Items</span>
                    </button>
                    <button
                      onClick={() => {
                        setIsLoginOpen(true);
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-[#D5C5AE] hover:text-[#FAF8F3] hover:bg-[#22262E] flex items-center gap-2 cursor-pointer"
                    >
                      <Shield className="w-3.5 h-3.5 text-[#B89255]" />
                      <span>Switch Demo Role (RBAC)</span>
                    </button>
                  </div>

                  <div className="pt-1 border-t border-[#2E333D]">
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-red-400 hover:bg-red-950/30 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Button
              id="nav-login-button"
              variant="outline"
              size="sm"
              onClick={() => setIsLoginOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 border-[#B89255]/40 text-xs text-[#FAF8F3] hover:border-[#B89255]"
            >
              <User className="w-3.5 h-3.5 text-[#B89255]" />
              <span>Login</span>
            </Button>
          )}

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 text-[#FAF8F3] hover:bg-[#191B20] border border-[#2E333D] transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#121316] border-b border-[#2E333D] shadow-2xl px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.path}
                  onClick={() => handleNavClick(link.path)}
                  className={`flex items-center justify-between px-3 py-2.5 text-sm text-left transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#191B20] text-[#FAF8F3] border-l-2 border-[#B89255] font-medium'
                      : 'text-[#D5C5AE] hover:bg-[#191B20] hover:text-[#FAF8F3]'
                  }`}
                >
                  <span>{link.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => handleNavClick('/profile')}
              className={`flex items-center justify-between px-3 py-2.5 text-sm text-left transition-colors cursor-pointer ${
                isActive('/profile')
                  ? 'bg-[#191B20] text-[#FAF8F3] border-l-2 border-[#B89255] font-medium'
                  : 'text-[#D5C5AE] hover:bg-[#191B20] hover:text-[#FAF8F3]'
              }`}
            >
              <span>User Profile & RBAC</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#2E333D]/60 flex flex-col gap-2">
            <Button
              variant="gold"
              size="sm"
              onClick={() => {
                setIsLoginOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>{currentUser ? `Signed in as ${currentUser.name} (${userRole})` : 'Scholar & Member Access'}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavClick('/contribute')}
              className="w-full text-xs"
            >
              Contribute to Heritage Archive
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
