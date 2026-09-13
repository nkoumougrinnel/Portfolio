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
    <footer className="w-full py-8 px-5 border-t border-[#e5eeff] bg-white flex flex-col items-center justify-center text-center gap-2 font-mono text-xs text-[#565e74]">
      <p className="text-[11.5px] text-[#0b1c30] font-medium">
        © 2026 Nkoumou Tjade Grinnel Germain. {language === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
      </p>

      {/* Scroll to Top floating button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-6 right-5 z-30 w-11 h-11 rounded-full bg-white border border-[#c3c6d7]/50 shadow-lg flex items-center justify-center text-[#2563eb] hover:bg-blue-50 transition-all active:scale-95 group"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
};
