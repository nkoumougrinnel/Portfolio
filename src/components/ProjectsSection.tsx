import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Language, Project, ProjectCategory } from '../types';

const PROJECT_FILTERS: Array<'all' | ProjectCategory> = [
  'all',
  'featured',
  'web',
  'ai',
  'network',
  'embedded'
];

const FILTER_LABELS: Record<'all' | ProjectCategory, { fr: string; en: string }> = {
  all: { fr: 'Tous', en: 'All' },
  featured: { fr: 'Phares', en: 'Featured' },
  web: { fr: 'Web', en: 'Web' },
  ai: { fr: 'IA', en: 'AI' },
  network: { fr: 'Réseaux', en: 'Networks' },
  embedded: { fr: 'Embarqué', en: 'Embedded' },
  more: { fr: 'Autres', en: 'More' },
  early: { fr: 'Premiers', en: 'Early' },
  lab: { fr: 'Laboratoire', en: 'Lab' },
  academic: { fr: 'Académique', en: 'Academic' },
  training: { fr: 'Formation', en: 'Training' },
  competition: { fr: 'Compétition', en: 'Competition' },
  personal: { fr: 'Personnel', en: 'Personal' },
  professional: { fr: 'Professionnel', en: 'Professional' },
  cyber: { fr: 'Cyber', en: 'Cyber' }
};

interface ProjectsSectionProps {
  language: Language;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onEditProjectImage?: (project: Project) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  language,
  projects,
  onSelectProject,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | ProjectCategory>('featured');
  const visibleProjects = projects.filter((project) =>
    activeFilter === 'all' || project.categories.includes(activeFilter)
  );

  const renderProjectCard = (project: Project) => (
    <article
      key={project.id}
      className="group flex h-full flex-col justify-between gap-3 rounded-2xl glass-card p-4 transition-all hover:border-[var(--color-accent)]/40 hover:shadow-md sm:p-5"
    >
      <div className="flex flex-col gap-3">
        <div className="group/img relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--color-border-muted)]/30 bg-[var(--color-media-surface)] shadow-inner">
          <img
            alt={project.title}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
            src={project.imageUrl}
            onError={(event) => {
              (event.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
            }}
          />
        </div>

        <div className="pt-1">
          <h4 className="text-base font-bold text-[var(--color-text-main)] transition-colors group-hover:text-[var(--color-accent)] sm:text-lg">
            {project.title}
          </h4>
        </div>

        <p className="line-clamp-3 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
          {project.description[language]}
        </p>

        <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-[var(--color-accent)] transition-colors hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
        <span className="min-w-0 truncate font-mono text-[10.5px] text-[var(--color-text-muted)]">
          {project.context?.[language] ?? project.period}
        </span>
        <button
          type="button"
          onClick={() => onSelectProject(project)}
          className="ml-3 inline-flex shrink-0 items-center gap-1.5 rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-bg-accent)]/50 px-3.5 py-1.5 text-xs font-semibold text-[var(--color-accent)] shadow-xs transition-all hover:bg-[var(--color-accent)] hover:text-white active:scale-98"
        >
          <span>{language === 'fr' ? 'Détails' : 'Details'}</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );

  return (
    <section id="projects" className="projects-section px-5 py-10">
      <div className="mx-auto max-w-7xl px-0 sm:px-4 lg:px-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-[var(--color-text-main)] sm:text-xl">
              {language === 'fr' ? 'Réalisations' : 'Realisations'}
            </h2>
          </div>
        </div>

        <div className="relative mb-6 -mx-5 sm:mx-0" aria-label={language === 'fr' ? 'Filtres des projets' : 'Project filters'}>
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap px-5 pb-2 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {PROJECT_FILTERS.map((filter) => (
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
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[var(--color-bg-main)]/95 to-transparent sm:hidden" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map(renderProjectCard)}
        </div>
        {visibleProjects.length === 0 && (
          <p className="py-8 text-center text-sm text-[var(--color-text-muted)]">
            {language === 'fr' ? 'Aucun projet ne correspond à cette combinaison.' : 'No projects match this combination.'}
          </p>
        )}
      </div>
    </section>
  );
};