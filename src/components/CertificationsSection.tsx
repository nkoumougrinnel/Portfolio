import React, { useState } from 'react';
import { Award, Calendar, ArrowRight } from 'lucide-react';
import { CertificationCategory, CertificationItem, Language, Project } from '../types';

interface CertificationsSectionProps {
  language: Language;
  certifications: CertificationItem[];
  projects: Project[];
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
  onSelectCertification,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | CertificationCategory>('all');
  const visibleCertifications = certifications.filter((certification) =>
    activeFilter === 'all' || certification.categories.includes(activeFilter)
  );

  return (
    <section id="certifications" className="section">
      <div className="section-inner">
        <div className="section-head">
          <span className="section-eyebrow">07 <span aria-hidden="true">/</span> certifications</span>
          <h2 className="section-title">
            {language === 'fr' ? 'Certifications' : 'Certifications'}
          </h2>
        </div>

        <div className="chip-row" role="group" aria-label={language === 'fr' ? 'Filtres des certifications' : 'Certification filters'}>
          {FILTERS.map((filter) => (
            <button
              key={filter}
              type="button"
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              className="chip"
            >
              {FILTER_LABELS[filter][language]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCertifications.map((certification) => {
            const imageUrl = certification.imageUrl;
            const relatedProjects = certification.relatedProjectIds
              ?.map((projectId) => projects.find((project) => project.id === projectId))
              .filter((project): project is Project => Boolean(project)) ?? [];
            const featuredProject = relatedProjects[0];
            return (
              <article
                key={certification.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectCertification(certification)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    onSelectCertification(certification);
                  }
                }}
                className="card card-interactive group flex h-full flex-col p-3"
              >
                <div className="card-media">
                  <img alt={certification.title[language]} src={imageUrl} loading="lazy" />
                  <span className="media-badge">{FILTER_LABELS[certification.categories[0]][language]}</span>
                </div>

                <div className="card-body flex flex-1 flex-col px-2 pb-1 pt-4">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="card-title">{certification.title[language]}</h3>
                    {certification.duration && <span className="tag shrink-0">{certification.duration}</span>}
                  </div>
                  <p className="meta meta-accent mt-1.5">
                    <Award />
                    <span className="truncate">{certification.issuer[language]}</span>
                  </p>
                  <p className="card-text mt-3 line-clamp-3">{certification.description[language]}</p>

                  {featuredProject && (
                    <p className="mt-4 flex flex-wrap items-center gap-1.5 text-[12.5px] text-[var(--color-text-muted)]">
                      <span>{certification.relatedProjectsContext?.[language] ?? (language === 'fr' ? 'Projet' : 'Project')} :</span>
                      <span className="tag tag-neutral">{featuredProject.title}</span>
                      {relatedProjects.length > 1 && (
                        <span className="tag tag-neutral">+{relatedProjects.length - 1}</span>
                      )}
                    </p>
                  )}

                  <div className="card-footer mt-5">
                    <span className="meta">
                      <Calendar />
                      {certification.period}
                    </span>
                    <span className="btn-more">
                      {language === 'fr' ? 'Détails' : 'Details'}
                      <ArrowRight />
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
