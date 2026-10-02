import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
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
      {/* Top spacer for perfect vertical balancing on large screens */}
      <div className="hidden sm:block h-2 pointer-events-none"></div>

      {/* Main Hero Container:
          - Mobile: centered stacked layout (photo top, text bottom)
          - Large screens (lg): 2 columns (text/actions on the left, large photo on the right) */}
      <div className="w-full max-w-7xl mx-auto relative z-10 my-auto py-4 sm:py-6 px-2 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 xl:gap-16">
        
        {/* Mobile Portrait (visible on mobile/tablet, hidden on desktop lg) */}
        <div className="flex lg:hidden justify-center items-center pointer-events-none select-none">
          <div className="relative h-72 w-72 flex items-center justify-center">
            <div className="relative h-72 w-72 rounded-full overflow-hidden border-2 border-white shadow-md bg-[#f4f7fc]">
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
          <div className="mb-3 text-sm font-medium text-[#565e74]">
            {language === 'fr' ? 'Étudiant ingénieur en 3e année · SUP’PTIC' : '3rd-year engineering student · SUP’PTIC'}
          </div>

          {/* Titles & Name */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-[#0b1c30] uppercase mb-1">
            NKOUMOU TJADE
          </h1>
          <h2 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#2563eb] mb-4">
            Grinnel Germain
          </h2>

          <p className="my-2 max-w-lg text-[15px] leading-relaxed text-[#565e74]">
            {language === 'fr'
              ? 'Je m’intéresse au développement, aux systèmes et aux réseaux, avec un intérêt grandissant pour la cybersécurité.'
              : 'I’m interested in software development, systems, and networks, with a growing interest in cybersecurity.'}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start w-full gap-3 max-w-sm lg:max-w-md mt-5">
            <a
              href="#projects"
              className="w-full sm:flex-1 h-11 px-5 bg-[#2563eb] hover:bg-blue-700 text-white font-medium rounded-xl flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all active:scale-98"
            >
              <span className="text-sm font-semibold">
                {language === 'fr' ? 'Voir mes projets' : 'View my projects'}
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

    </section>
  );
};
