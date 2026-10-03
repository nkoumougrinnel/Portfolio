import React, { useState, useEffect } from 'react';
import { Menu, X, FileText, Globe, Moon, Sun } from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenCvModal: () => void;
  avatarUrl: string;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  onOpenCvModal,
  avatarUrl,
  isDark,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <header 
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[var(--color-bg-main)]/95 backdrop-blur-md border-b border-[var(--color-border)]/80 shadow-[0_1px_6px_rgba(0,0,0,0.03)]' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo + Nom */}
        <a href="#hero" className="flex items-center gap-2.5 group shrink-0">
          <div className="relative shrink-0">
            <img
              alt="Nkoumou Tjade"
              className="h-9 w-9 rounded-full object-cover border border-[var(--color-border-muted)]/40 shadow-xs group-hover:scale-105 transition-transform"
              src={avatarUrl}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';
              }}
            />
          </div>
          <div className="flex flex-col justify-center text-left">
            <span className="font-sans text-[13px] font-bold tracking-tight text-[var(--color-text-main)] leading-tight group-hover:text-[var(--color-accent)] transition-colors">
              Nkoumou Tjade
            </span>
            <span className="font-sans text-[10px] text-[var(--color-text-muted)]">
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
                className="font-sans text-xs font-medium text-[var(--color-text-muted)] hover:text-[var(--color-accent)] px-2 py-1 rounded-md transition-colors"
              >
                {item.label}
              </a>
              {idx < navItems.length - 1 && (
                <span className="text-[var(--color-border-muted)] text-xs select-none">·</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Action Controls: [FR/EN] and [CV] (always visible), Hamburger (visible only on small screens) */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={() => onLanguageChange(language === 'fr' ? 'en' : 'fr')}
            title="Changer de langue / Switch language"
            className="inline-flex items-center gap-1 px-2.5 py-1.5 text-[11px] font-sans font-semibold text-[var(--color-accent)] bg-[var(--color-accent)]/5 hover:bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/25 rounded-lg transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Theme Toggle 🌙 / ☀️ */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            className="inline-flex items-center justify-center w-8 h-8 text-[var(--color-accent)] bg-[var(--color-accent)]/5 hover:bg-[var(--color-accent)]/15 border border-[var(--color-accent)]/25 rounded-lg transition-all hover:scale-105"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* CV Button [CV] */}
          <button
            onClick={onOpenCvModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-semibold text-[var(--color-accent)] bg-[var(--color-accent)]/5 hover:bg-[var(--color-accent)] hover:text-white border border-[var(--color-accent)]/30 rounded-full shadow-xs transition-all"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>

          {/* Hamburger Menu (visible only on mobile/tablet < lg) */}
          <button
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 rounded-lg bg-[var(--color-bg-soft)] border border-[var(--color-border-muted)]/50 flex items-center justify-center text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu on Hamburger Click */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-main)]/98 px-5 py-4 font-sans text-xs text-[var(--color-text-muted)] shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col divide-y divide-[var(--color-border)]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 text-sm font-medium text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors"
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
