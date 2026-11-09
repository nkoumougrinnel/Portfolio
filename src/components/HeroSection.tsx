import React from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { Language } from '../types';
import { CV_URL, CV_FILENAME } from '../data/site';

interface HeroSectionProps {
  language: Language;
  avatarUrl: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ language, avatarUrl }) => {
  const fr = language === 'fr';

  return (
    <section
      id="hero"
      className="hero-section relative flex min-h-[calc(100vh-4rem)] min-h-[calc(100svh-4rem)] w-full items-center overflow-hidden px-5 py-10"
    >
      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col-reverse items-center gap-10 px-0 sm:px-4 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-6">
        {/* Texte */}
        <div className="flex max-w-2xl flex-1 flex-col items-center text-center lg:items-start lg:text-left">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)] px-3 py-1 font-mono text-[11px] text-[var(--color-text-muted)]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-success)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-success)]" />
            </span>
            <span className="sm:hidden">{fr ? '3e année · SUP’PTIC' : '3rd year · SUP’PTIC'}</span>
            <span className="hidden sm:inline">{fr ? 'Élève ingénieur · 3e année · SUP’PTIC' : '3rd-year engineering student · SUP’PTIC'}</span>
          </div>

          <h1 className="text-4xl font-extrabold uppercase leading-[1.02] tracking-tight text-[var(--color-text-main)] sm:text-5xl xl:text-6xl">
            Nkoumou Tjade
            <span className="mt-1 block text-[0.62em] normal-case leading-tight text-[var(--color-accent)]">
              Grinnel Germain
            </span>
          </h1>

          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[var(--color-text-muted)] sm:text-base">
            {fr
              ? 'J’explore le logiciel, les réseaux, les systèmes et l’embarqué, avec un intérêt particulier pour la cybersécurité.'
              : 'I explore software, networks, systems, and embedded technology, with a particular interest in cybersecurity.'}
          </p>


          <div className="mt-8 flex w-full max-w-sm flex-col items-center gap-3 sm:flex-row lg:max-w-md">
            <a
              href="#projects"
              className="btn btn-primary w-full sm:flex-1"
            >
              {fr ? 'Voir mes projets' : 'View my projects'}
              <ArrowRight />
            </a>
            <a
              href={CV_URL}
              download={CV_FILENAME}
              className="btn btn-secondary w-full sm:flex-1"
            >
              <Download />
              {fr ? 'Télécharger le CV' : 'Download resume'}
            </a>
          </div>

        </div>

        {/* Portrait */}
        <div className="hero-portrait relative shrink-0 select-none" aria-hidden="false">
          <div className="hero-orbit" aria-hidden="true" />
          <div className="hero-orbit hero-orbit--inner" aria-hidden="true" />
          <div className="relative h-64 w-64 overflow-hidden rounded-full border-4 border-[var(--color-bg-soft)] bg-[var(--color-bg-soft)] shadow-2xl sm:h-80 sm:w-80 lg:h-[22rem] lg:w-[22rem] xl:h-[26rem] xl:w-[26rem]">
            <img
              alt={fr ? 'Portrait de Nkoumou Tjade Grinnel Germain' : 'Portrait of Nkoumou Tjade Grinnel Germain'}
              className="h-full w-full object-cover object-center"
              src={avatarUrl}
            />
          </div>
          <span className="hero-tag absolute -left-4 top-8 sm:-left-8" aria-hidden="true">
            <span className="text-[var(--color-accent)]">$</span> whoami
          </span>
          <span className="hero-tag hero-tag--late absolute -right-2 bottom-10 sm:-right-6" aria-hidden="true">
            Yaoundé · CM
          </span>
        </div>
      </div>
    </section>
  );
};
