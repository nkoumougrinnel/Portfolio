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
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section based on scroll position
      const sections = ['about', 'experience', 'projects', 'cybersecurity', 'skills', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Desktop navigation: editorial, shortened list
  const desktopNavItems = [
    { href: '#about', label: language === 'fr' ? 'À propos' : 'About' },
    { href: '#experience', label: language === 'fr' ? 'Expérience' : 'Experience' },
    { href: '#projects', label: language === 'fr' ? 'Projets' : 'Projects' },
    { href: '#cybersecurity', label: language === 'fr' ? 'Cybersécurité' : 'Cybersecurity' },
    { href: '#skills', label: language === 'fr' ? 'Compétences' : 'Skills' },
    { href: '#contact', label: language === 'fr' ? 'Contact' : 'Contact' },
  ];

  // Mobile navigation: complete list of all sections
  const mobileNavItems = [
    { href: '#hero', label: language === 'fr' ? 'Accueil' : 'Home' },
    { href: '#about', label: language === 'fr' ? 'À propos' : 'About' },
    { href: '#experience', label: language === 'fr' ? 'Expérience' : 'Experience' },
    { href: '#projects', label: language === 'fr' ? 'Projets' : 'Projects' },
    { href: '#cybersecurity', label: language === 'fr' ? 'Cybersécurité' : 'Cybersecurity' },
    { href: '#skills', label: language === 'fr' ? 'Compétences' : 'Skills' },
    { href: '#education', label: language === 'fr' ? 'Formation' : 'Education' },
    { href: '#certifications', label: language === 'fr' ? 'Certifications' : 'Certifications' },
    { href: '#activities', label: language === 'fr' ? 'Activités & Leadership' : 'Activities & Leadership' },
    { href: '#direction', label: language === 'fr' ? 'Direction Actuelle' : 'Current Direction' },
    { href: '#resources', label: language === 'fr' ? 'Ressources' : 'Resources' },
    { href: '#contact', label: language === 'fr' ? 'Contact' : 'Contact' },
  ];

  const isActive = (href: string) => {
    const sectionId = href.substring(1);
    return activeSection === sectionId;
  };

  return (
    <header
      className={`fixed top-0 w-full z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[var(--color-bg-main)]/90 border-b border-[var(--color-border)]/60 shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
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

        {/* Desktop Navigation: editorial, shortened */}
        <nav className="hidden lg:flex items-center gap-6">
          {desktopNavItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`relative font-sans text-xs font-medium transition-colors ${
                isActive(item.href)
                  ? 'text-[var(--color-accent)]'
                  : 'text-[var(--color-text-muted)] hover:text-[var(--color-accent)]'
              }`}
            >
              {item.label}
              {/* Discrete underline indicator for active section */}
              {isActive(item.href) && (
                <span className="absolute bottom-[-4px] left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-full"></span>
              )}
            </a>
          ))}
        </nav>

        {/* Action Controls: Language, Theme, CV */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Language Toggle */}
          <button
            onClick={() => onLanguageChange(language === 'fr' ? 'en' : 'fr')}
            title="Changer de langue / Switch language"
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-sans font-semibold text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-md shadow-xs transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language.toUpperCase()}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
            className="inline-flex items-center justify-center w-8 h-8 text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] bg-[var(--color-bg-soft)] border border-[var(--color-border)] rounded-md shadow-xs transition-colors"
          >
            {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
          </button>

          {/* CV Button: separated, prioritized */}
          <button
            onClick={onOpenCvModal}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-mono font-semibold text-white bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] rounded-md shadow-sm transition-colors"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV</span>
          </button>

          {/* Hamburger Menu (mobile/tablet < lg) */}
          <button
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 rounded-md bg-[var(--color-bg-soft)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] shadow-xs transition-colors ml-1"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer: complete navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-main)]/98 px-5 py-4 font-sans text-xs text-[var(--color-text-muted)] shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col divide-y divide-[var(--color-border)]">
            {mobileNavItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2.5 text-sm font-medium transition-colors ${
                  isActive(item.href)
                    ? 'text-[var(--color-accent)]'
                    : 'text-[var(--color-text-main)] hover:text-[var(--color-accent)]'
                }`}
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