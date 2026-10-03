import React, { useState } from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { CertificationCategory, CertificationItem, Language, Project } from '../types';

interface CertificationsSectionProps {
  language: Language;
  certifications: CertificationItem[];
  projects: Project[];
  certImageUrl: string;
  onSelectCertification: (certification: CertificationItem) => void;
}

const FILTERS: Array<'all' | CertificationCategory> = [
  'all',
  'certification',
  'training',
  'competition',
  'conference',
  'course'
];

const FILTER_LABELS: Record<'all' | CertificationCategory, { fr: string; en: string }> = {
  all: { fr: 'Toutes', en: 'All' },
  certification: { fr: 'Certifications', en: 'Certifications' },
  training: { fr: 'Formation', en: 'Training' },
  competition: { fr: 'Compétition', en: 'Competition' },
  conference: { fr: 'Conférence', en: 'Conference' },
  course: { fr: 'Cours', en: 'Course' }
};

const CATEGORY_BADGE_CLASSES: Record<CertificationCategory, string> = {
  competition: 'bg-[var(--color-category-competition)]/90',
  training: 'bg-[var(--color-accent)]/90',
  certification: 'bg-[var(--color-success)]/90',
  conference: 'bg-[var(--color-category-neutral)]/90',
  course: 'bg-violet-600/90'
};

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  language,
  certifications,
  projects,
  certImageUrl,
  onSelectCertification,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | CertificationCategory>('all');
  const visibleCertifications = certifications.filter((certification) =>
    activeFilter === 'all' || certification.categories.includes(activeFilter)
  );

  return (
    <section id="certifications" className="px-5 py-10">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text-main)] tracking-tight">
            Certifications
          </h2>
        </div>

        <div className="relative mb-6 -mx-5 sm:mx-0" aria-label={language === 'fr' ? 'Filtres des certifications' : 'Certification filters'}>
          <div className="flex gap-2 overflow-x-auto whitespace-nowrap px-5 pb-2 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${activeFilter === filter ? 'border-[var(--color-accent)] bg-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-accent)]/25' : 'border-[var(--color-border)]/50 bg-[var(--color-bg-soft)]/50 backdrop-blur-sm text-[var(--color-text-muted)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)]'}`}
              >
                {FILTER_LABELS[filter][language]}
              </button>
            ))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--color-bg-main)] to-transparent sm:hidden" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCertifications.map((certification) => {
            const imageUrl = certification.id === 'dclic' ? certImageUrl : certification.imageUrl;
            const relatedProjects = certification.relatedProjectIds
              ?.map((projectId) => projects.find((project) => project.id === projectId))
              .filter((project): project is Project => Boolean(project)) ?? [];
            const featuredProject = relatedProjects[0];
            return (
              <article
                key={certification.id}
                onClick={() => onSelectCertification(certification)}
                className="rounded-2xl glass-card overflow-hidden hover:shadow-md hover:border-[var(--color-accent)]/40 transition-all flex flex-col justify-between group cursor-pointer"
              >
                <div className="flex flex-1 flex-col">
                  <div className="w-full aspect-[16/9] overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg-panel)] relative">
                    <img
                      alt={certification.title[language]}
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      src={imageUrl}
                    />
                    <span className={`absolute left-3 top-3 font-mono text-[10px] text-white px-2.5 py-1 rounded-md backdrop-blur-md border border-white/20 bg-black/40 shadow-sm`}>
                      {FILTER_LABELS[certification.categories[0]][language]}
                    </span>
                  </div>
                  <div className="p-4 sm:p-5 flex flex-1 flex-col">
                    <div className="flex justify-between items-start mb-2 gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                        {certification.title[language]}
                      </h3>
                      {certification.duration && (
                        <span className="font-mono text-[11px] text-[var(--color-accent)] font-semibold bg-[var(--color-accent)]/10 px-2.5 py-0.5 rounded-full border border-[var(--color-accent)]/20 shrink-0">
                          {certification.duration}
                        </span>
                      )}
                    </div>
                    <p className="font-mono text-[11.5px] text-[var(--color-accent)] font-semibold flex items-center gap-1 mb-2">
                      <Award className="w-3.5 h-3.5 shrink-0" />
                      <span>{certification.issuer[language]}</span>
                    </p>
                    <div className="flex flex-1 flex-col">
                      <p className="text-[12.5px] sm:text-[13px] text-[var(--color-text-muted)] leading-relaxed line-clamp-3">
                        {certification.description[language]}
                      </p>
                    {featuredProject && (
                      <div className="mt-auto pt-4">
                        <p className="inline-flex items-center gap-1.5 pt-3 text-[11.5px] text-[var(--color-text-muted)]">
                          <span>{certification.relatedProjectsContext?.[language] ?? (language === 'fr' ? 'Projet' : 'Project')} :</span>
                          <span className="font-semibold text-[var(--color-text-main)]">{featuredProject.title}</span>
                          {relatedProjects.length > 1 && (
                            <span className="shrink-0 rounded-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                              +{relatedProjects.length - 1}
                            </span>
                          )}
                        </p>
                      </div>
                    )}
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:px-5 pt-3 pb-4 flex items-center justify-between border-t border-[var(--color-border)]/80">
                  <span className="font-mono text-[11px] text-[var(--color-text-muted)] flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[var(--color-accent)]" />
                    {certification.period}
                  </span>
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      onSelectCertification(certification);
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-[var(--color-bg-accent)]/50 hover:bg-[var(--color-accent)] hover:text-white text-[var(--color-accent)] border border-[var(--color-accent)]/25 text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 shadow-xs"
                  >
                    <span>{language === 'fr' ? 'Détails' : 'Details'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
