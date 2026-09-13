import React from 'react';
import { ArrowRight, Download, ChevronDown } from 'lucide-react';
import { Language } from '../types';

interface HeroSectionProps {
  language: Language;
  avatarUrl: string;
  onOpenImageStudio?: () => void;
  onOpenCvModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  language,
  avatarUrl,
  onOpenCvModal,
}) => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-[calc(100vh-4rem)] min-h-[calc(100dvh-4rem)] flex flex-col justify-between items-center px-5 py-6 sm:py-8 overflow-hidden bg-white border-b border-[#e5eeff]/70"
    >
      {/* Background subtle radial ambient glows */}
      <div className="absolute -top-16 -right-16 w-80 h-80 bg-blue-100/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 -left-20 w-64 h-64 bg-[#e5eeff]/70 rounded-full blur-2xl pointer-events-none"></div>

      {/* Top spacer for perfect vertical balancing on large screens */}
      <div className="hidden sm:block h-2 pointer-events-none"></div>

      {/* Main Hero Container:
          - Mobile: centered stacked layout (photo top, text bottom)
          - Large screens (lg): 2 columns (text/actions on the left, large photo on the right) */}
      <div className="w-full max-w-7xl mx-auto relative z-10 my-auto py-4 sm:py-6 px-2 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 xl:gap-16">
        
        {/* Mobile Portrait (visible on mobile/tablet, hidden on desktop lg) */}
        <div className="flex lg:hidden justify-center items-center pointer-events-none select-none">
          <div className="relative w-32 h-32 sm:w-36 sm:h-36 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-100/60 rounded-full blur-xl"></div>
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-white shadow-md bg-[#f4f7fc]">
              <img
                alt="Portrait de NKOUMOU TJADE Grinnel Germain"
                className="w-full h-full rounded-full object-cover"
                src={avatarUrl}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80';
                }}
              />
            </div>
          </div>
        </div>

        {/* Left Column (Desktop) / Main Text Details (Mobile) */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left flex-1 max-w-2xl">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-[#2563eb]/20 text-xs font-mono text-[#0b1c30] mb-3 shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2563eb] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2563eb]"></span>
            </span>
            <span className="font-semibold tracking-tight">
              {language === 'fr' ? 'Élève-Ingénieur 3ème Année' : '3rd Year Engineering Student'}
            </span>
            <span className="text-[#565e74] opacity-50">·</span>
            <span className="font-bold text-[#2563eb]">SUP'PTIC</span>
          </div>

          {/* Titles & Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#0b1c30] uppercase mb-1">
            NKOUMOU TJADE
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#2563eb] mb-4">
            Grinnel Germain
          </h2>

          {/* Hero Quote / Statement */}
          <div className="w-full max-w-md lg:max-w-xl my-2 p-4 rounded-xl bg-gradient-to-r from-blue-50/80 via-[#f4f7fc]/70 to-white border-l-3 border-l-[#2563eb] border border-[#c3c6d7]/35 shadow-xs text-left">
            <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold text-[#2563eb] tracking-widest mb-1.5">
              <span>{language === 'fr' ? 'MOTO & VISION' : 'CORE CREED'}</span>
            </div>
            <p className="text-[13.5px] sm:text-[14.5px] leading-relaxed italic text-[#0b1c30] font-medium">
              {language === 'fr'
                ? '« Concevoir des systèmes. Comprendre leur fonctionnement profond. Apprendre à les sécuriser. »'
                : '“Building systems. Understanding how they work. Learning how to secure them.”'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start w-full gap-3 max-w-sm lg:max-w-md mt-5">
            <a
              href="#projects"
              className="w-full sm:flex-1 h-11 px-5 bg-[#2563eb] hover:bg-blue-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-98"
            >
              <span className="text-sm font-semibold">
                {language === 'fr' ? 'Explorer les Projets' : 'View Projects'}
              </span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenCvModal}
              className="w-full sm:flex-1 h-11 px-5 bg-[#f4f7fc] hover:bg-[#e5eeff] border border-[#c3c6d7]/50 text-[#0b1c30] hover:text-[#2563eb] font-medium rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs active:scale-98"
            >
              <Download className="w-4 h-4 text-[#2563eb]" />
              <span className="text-sm font-semibold">
                {language === 'fr' ? 'Consulter le CV' : 'Download CV'}
              </span>
            </button>
          </div>
        </div>

        {/* Desktop Large Portrait (visible on lg screens, placed on the right side) */}
        <div className="hidden lg:flex justify-end items-center shrink-0 pointer-events-none select-none">
          <div className="relative w-72 h-72 xl:w-96 xl:h-96 2xl:w-[420px] 2xl:h-[420px] flex items-center justify-center">
            {/* Subtle multi-layer ambient glow */}
            <div className="absolute inset-0 bg-blue-100/70 rounded-full blur-3xl transform scale-110"></div>
            <div className="absolute -inset-3 bg-[#2563eb]/10 rounded-full blur-2xl"></div>

            {/* Large static portrait, crisp border, zero hover animation */}
            <div className="relative w-72 h-72 xl:w-96 xl:h-96 2xl:w-[420px] 2xl:h-[420px] rounded-full overflow-hidden border-4 border-white shadow-2xl bg-[#f4f7fc]">
              <img
                alt="Portrait de NKOUMOU TJADE Grinnel Germain"
                className="w-full h-full rounded-full object-cover object-center"
                src={avatarUrl}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80';
                }}
              />
            </div>
          </div>
        </div>

      </div>

      {/* Subtle Scroll Cue at the bottom */}
      <a
        href="#about"
        className="relative z-10 mt-auto pt-2 pb-1 flex flex-col items-center text-[#565e74] hover:text-[#2563eb] transition-colors group cursor-pointer"
      >
        <span className="font-mono text-[10px] tracking-wider uppercase mb-1 opacity-75 group-hover:opacity-100">
          {language === 'fr' ? 'Défiler pour découvrir' : 'Scroll down'}
        </span>
        <ChevronDown className="w-4 h-4 text-[#2563eb] animate-bounce" />
      </a>
    </section>
  );
};
