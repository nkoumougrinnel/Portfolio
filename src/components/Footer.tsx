import React, { useEffect, useState } from 'react';
import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

const NAV = [
  { href: '#about', fr: 'À propos', en: 'About' },
  { href: '#experience', fr: 'Expérience', en: 'Experience' },
  { href: '#projects', fr: 'Projets', en: 'Projects' },
  { href: '#cybersecurity', fr: 'Cybersécurité', en: 'Security' },
  { href: '#skills', fr: 'Stack', en: 'Stack' },
  { href: '#contact', fr: 'Contact', en: 'Contact' },
];

const SOCIAL = [
  { href: 'https://github.com/nkoumougrinnel', label: 'GitHub', Icon: Github },
  { href: 'https://cm.linkedin.com/in/nkoumougrinnel', label: 'LinkedIn', Icon: Linkedin },
  { href: 'mailto:nkoumougrinnel@gmail.com', label: 'Email', Icon: Mail },
];

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <footer className="border-t border-[var(--color-border)] px-5 pb-10 pt-12">
      <div className="section-inner flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xs">
          <a href="#hero" className="text-base font-extrabold tracking-tight text-[var(--color-text-main)]">
            Nkoumou Tjade <span className="text-[var(--color-accent)]">Grinnel</span>
          </a>
          <p className="mt-2 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
            {language === 'fr'
              ? 'Élève ingénieur — logiciel, réseaux, embarqué et cybersécurité.'
              : 'Engineering student — software, networks, embedded and security.'}
          </p>
        </div>

        <nav aria-label={language === 'fr' ? 'Plan du site' : 'Site map'} className="grid grid-cols-2 gap-x-10 gap-y-2 whitespace-nowrap sm:grid-cols-3">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[13px] text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent)]"
            >
              {item[language]}
            </a>
          ))}
        </nav>

        <div className="flex gap-2">
          {SOCIAL.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              aria-label={label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>

      <div className="section-inner mt-10 flex flex-col gap-2 border-t border-dashed border-[var(--color-border)] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="meta">© {new Date().getFullYear()} Nkoumou Tjade Grinnel Germain</p>
        <p className="meta">
          <span className="meta-accent">$</span> built with React · Vite · Tailwind
        </p>
      </div>

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label={language === 'fr' ? 'Revenir en haut' : 'Back to top'}
        tabIndex={showTop ? 0 : -1}
        className={`fixed bottom-6 right-5 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)] text-[var(--color-accent)] shadow-lg transition-all duration-300 hover:border-[var(--color-accent)] ${
          showTop ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <ArrowUp className="h-5 w-5" />
      </button>
    </footer>
  );
};
