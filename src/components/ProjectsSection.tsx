import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, Project, ProjectCategory } from '../types';
import { ProjectMockup } from './ProjectMockup';

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
      role="button"
      tabIndex={0}
      onClick={() => onSelectProject(project)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          onSelectProject(project);
        }
      }}
      className="project-card card card-interactive group flex h-full flex-col p-3"
    >
      <ProjectMockup project={project} />

      <div className="card-body flex flex-1 flex-col px-2 pb-1 pt-4">
        <h3 className="card-title">{project.title}</h3>
        <p className="card-text mt-2 line-clamp-3">{project.description[language]}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>

        <div className="card-footer mt-5">
          <span className="meta truncate">{project.context?.[language] ?? project.period}</span>
          <span className="btn-more">
            {language === 'fr' ? 'Détails' : 'Details'}
            <ArrowRight />
          </span>
        </div>
      </div>
    </article>
  );

  return (
    <section id="projects" className="section projects-section">
      <div className="section-inner">
        <div className="section-head">
          <span className="section-eyebrow">03 <span aria-hidden="true">/</span> projects</span>
          <h2 className="section-title">{language === 'fr' ? 'Projets' : 'Projects'}</h2>
        </div>

        <div className="chip-row" role="group" aria-label={language === 'fr' ? 'Filtres des projets' : 'Project filters'}>
          {PROJECT_FILTERS.map((filter) => (
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

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map(renderProjectCard)}
        </div>
        {visibleProjects.length === 0 && (
          <p className="py-8 text-center text-sm text-[var(--color-text-muted)]">
            {language === 'fr' ? 'Aucun projet dans cette catégorie.' : 'No projects in this category.'}
          </p>
        )}
      </div>
    </section>
  );
};
