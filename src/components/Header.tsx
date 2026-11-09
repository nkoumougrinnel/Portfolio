import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Moon, Sun } from 'lucide-react';
import { Language } from '../types';
import { CV_URL, CV_FILENAME } from '../data/site';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  avatarUrl: string;
  isDark: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
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
      const sections = ['hero', 'about', 'experience', 'projects', 'cybersecurity', 'skills', 'education', 'certifications', 'activities', 'contact'];
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
    { href: '#skills', label: language === 'fr' ? 'Stack' : 'Stack' },
    { href: '#contact', label: language === 'fr' ? 'Contact' : 'Contact' },
  ];

  // Mobile navigation: complete list of all sections
  const mobileNavItems = [
    { href: '#hero', label: language === 'fr' ? 'Accueil' : 'Home' },
    { href: '#about', label: language === 'fr' ? 'À propos' : 'About' },
    { href: '#experience', label: language === 'fr' ? 'Expérience' : 'Experience' },
    { href: '#projects', label: language === 'fr' ? 'Projets' : 'Projects' },
    { href: '#cybersecurity', label: language === 'fr' ? 'Cybersécurité' : 'Cybersecurity' },
    { href: '#skills', label: language === 'fr' ? 'Stack' : 'Stack' },
    { href: '#education', label: language === 'fr' ? 'Formation' : 'Education' },
    { href: '#certifications', label: language === 'fr' ? 'Certifications' : 'Certifications' },
    { href: '#activities', label: language === 'fr' ? 'Activités & Leadership' : 'Activities & Leadership' },
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
          {/* Langue + thème : un seul groupe compact */}
          <div className="flex h-9 items-center gap-0.5 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)] p-1 shadow-xs">
            <div role="group" aria-label={language === 'fr' ? 'Langue' : 'Language'} className="relative flex h-full items-center">
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-1/2 rounded-full bg-[var(--color-accent)] transition-transform duration-300 ease-out"
                style={{ transform: language === 'en' ? 'translateX(100%)' : 'none' }}
              />
              {(['fr', 'en'] as const).map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => onLanguageChange(lang)}
                  aria-pressed={language === lang}
                  className={`relative z-10 h-full w-8 rounded-full font-mono text-[10.5px] font-semibold uppercase transition-colors ${
                    language === lang ? 'text-white' : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-main)]'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
            <span className="mx-1 h-4 w-px bg-[var(--color-border)]" aria-hidden="true" />
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              title={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
              className="flex h-full w-7 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-accent)] hover:text-[var(--color-text-main)]"
            >
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>
          </div>

          {/* CV */}
          <a
            href={CV_URL}
            download={CV_FILENAME}
            title={language === 'fr' ? 'Télécharger mon CV (PDF)' : 'Download my resume (PDF)'}
            className="btn btn-primary group !hidden !h-9 !gap-1.5 !pl-4 !pr-3.5 !text-xs sm:!inline-flex"
          >
            CV
            <Download className="!h-3.5 !w-3.5 transition-transform group-hover:translate-y-0.5" />
          </a>

          {/* Hamburger Menu (mobile/tablet < lg) */}
          <button
            aria-label="Toggle Navigation Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] shadow-xs transition-colors"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer: complete navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-bg-main)]/98 px-5 py-4 font-sans text-xs text-[var(--color-text-muted)] shadow-lg animate-in fade-in duration-200">
          <div className="flex flex-col divide-y divide-[var(--color-border)]">
            <a
              href={CV_URL}
              download={CV_FILENAME}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-2.5 text-sm font-semibold text-[var(--color-accent)] sm:hidden"
            >
              {language === 'fr' ? 'Télécharger le CV' : 'Download resume'}
              <Download className="h-4 w-4" />
            </a>
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