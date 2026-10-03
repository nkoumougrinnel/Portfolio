import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Language } from '../types';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full py-8 px-5 flex flex-col items-center justify-center text-center gap-2 font-sans text-xs text-[var(--color-text-main)]">
      <p className="text-[11.5px] text-[var(--color-text-muted)] font-medium">
        © 2026 Nkoumou Tjade Grinnel Germain. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
      </p>

      {/* Scroll to Top floating button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-5 z-30 w-11 h-11 rounded-full bg-[var(--color-bg-accent)]/40 border border-[var(--color-border-muted)] shadow-lg flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-bg-accent)] transition-all active:scale-95 group"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
};
