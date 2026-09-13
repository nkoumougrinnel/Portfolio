import React, { useState } from 'react';
import { Menu, X, FileText, Globe } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenCvModal: () => void;
  avatarUrl: string;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenCvModal,
  avatarUrl,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Exact navigation items requested
  const navItems = [
    { href: '#hero', label: language === 'fr' ? 'Accueil' : 'Home' },
    { href: '#about', label: language === 'fr' ? 'À propos' : 'About' },
    { href: '#skills', label: language === 'fr' ? 'Compétences' : 'Skills' },
    { href: '#projects', label: language === 'fr' ? 'Projets' : 'Projects' },
    { href: '#experience', label: language === 'fr' ? 'Expérience' : 'Experience' },
    { href: '#certifications', label: language === 'fr' ? 'Certifications' : 'Certifications' },
    { href: '#contact', label: language === 'fr' ? 'Contact' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 w-full z-40 bg-white/95 backdrop-blur-md border-b border-[#e5eeff]/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)]">
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo + Nom */}
        <a href="#hero" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative shrink-0">
            <img
              alt="Nkoumou Tjade"
              className="h-9 w-9 rounded-full object-cover border border-[#c3c6d7]/40 shadow-xs group-hover:scale-105 transition-transform"
              src={avatarUrl}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
              }}
            />
          </div>
          <div className="flex flex-col justify-center text-left">
            <span className="text-[13px] font-semibold tracking-tight text-[#0b1c30] leading-tight group-hover:text-[#2563eb] transition-colors">
              Nkoumou Tjade
            </span>
            <span className="font-mono text-[10px] text-[#565e74]">
              Grinnel Germain
            </span>
          </div>
        </a>

        {/* Desktop Navigation (Grands écrans):
            Accueil · À propos · Compétences · Projets · Expérience · Certifications · Contact   [FR] [CV] */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item, idx) => (
            <React.Fragment key={item.href}>
              <a
                href={item.href}
                className="text-xs font-mono font-medium text-[#565e74] hover:text-[#2563eb] px-2 py-1 rounded-md transition-colors"
              >
                {item.label}
              </a>
              {idx < navItems.length - 1 && (
                <span className="text-[#c3c6d7] text-xs select-none">·</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Action Controls: [FR/EN] and [CV] (always visible), Hamburger (visible only on small screens) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Toggle [FR] / [EN] */}
          <button
            onClick={() => onLanguageChange(language === 'fr' ? 'en' : 'fr')}
            title="Changer de langue / Switch language"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-mono font-semibold text-[#2563eb] bg-[#2563eb]/5 hover:bg-[#2563eb]/10 border border-[#2563eb]/25 rounded-lg transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* CV Button [CV] */}
          <button
            onClick={onOpenCvModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-semibold text-[#2563eb] bg-[#2563eb]/5 hover:bg-[#2563eb] hover:text-white border border-[#2563eb]/30 rounded-full shadow-xs transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>

          {/* Hamburger Menu (visible only on mobile/tablet < lg) */}
          <button
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 rounded-lg bg-[#f4f7fc] border border-[#c3c6d7]/50 flex items-center justify-center text-[#0b1c30] hover:text-[#2563eb] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu on Hamburger Click */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#e5eeff] bg-white/98 px-5 py-4 font-mono text-xs text-[#565e74] shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col divide-y divide-[#e5eeff]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-[#0b1c30] hover:text-[#2563eb] transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
