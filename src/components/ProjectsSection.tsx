import React, { useState } from 'react';
import { ExternalLink, Layers } from 'lucide-react';
import { Language, Project, ProjectCategory } from '../types';

type ProjectFilterGroup = {
  id: 'hierarchy' | 'origin' | 'domain';
  label: { fr: string; en: string };
  categories: ProjectCategory[];
};

const FILTER_GROUPS: ProjectFilterGroup[] = [
  {
    id: 'hierarchy',
    label: { fr: 'Importance', en: 'Importance' },
    categories: ['featured', 'more', 'early']
  },
  {
    id: 'origin',
    label: { fr: 'Origine', en: 'Origin' },
    categories: ['professional', 'academic', 'training', 'personal', 'competition']
  },
  {
    id: 'domain',
    label: { fr: 'Domaine', en: 'Domain' },
    categories: ['ai', 'web', 'cyber', 'embedded', 'network']
  }
];

const FILTER_LABELS: Record<ProjectCategory, { fr: string; en: string }> = {
  featured: { fr: 'Phares', en: 'Featured' },
  more: { fr: 'Autres', en: 'More' },
  early: { fr: 'Premiers', en: 'Early' },
  lab: { fr: 'Laboratoire', en: 'Lab' },
  academic: { fr: 'Académique', en: 'Academic' },
  training: { fr: 'Formation', en: 'Training' },
  competition: { fr: 'Compétition', en: 'Competition' },
  personal: { fr: 'Personnel', en: 'Personal' },
  professional: { fr: 'Professionnel', en: 'Professional' },
  embedded: { fr: 'Embarqué', en: 'Embedded' },
  ai: { fr: 'IA', en: 'AI' },
  cyber: { fr: 'Cyber', en: 'Cyber' },
  web: { fr: 'Web', en: 'Web' },
  network: { fr: 'Réseaux', en: 'Networks' }
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
  const [selectedFilters, setSelectedFilters] = useState<
    Partial<Record<ProjectFilterGroup['id'], ProjectCategory>>
  >({ hierarchy: 'featured' });

  const selectedCategories = Object.values(selectedFilters).filter(
    (category): category is ProjectCategory => Boolean(category)
  );
  const visibleProjects = projects.filter((project) =>
    selectedCategories.every((category) => project.categories.includes(category))
  );

  const toggleFilter = (groupId: ProjectFilterGroup['id'], category: ProjectCategory) => {
    setSelectedFilters((current) => ({
      ...current,
      [groupId]: current[groupId] === category ? undefined : category
    }));
  };

  const renderProjectCard = (project: Project) => (
    <article
      key={project.id}
      className="group flex h-full flex-col justify-between gap-3 rounded-2xl border border-[#e5eeff] bg-white p-4 shadow-xs transition-all hover:border-[#2563eb]/40 hover:shadow-md sm:p-5"
    >
      <div className="flex flex-col gap-3">
        <div className="group/img relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-[#c3c6d7]/30 bg-slate-900 shadow-inner">
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
          <h4 className="text-base font-bold text-[#0b1c30] transition-colors group-hover:text-[#2563eb] sm:text-lg">
            {project.title}
          </h4>
        </div>

        <p className="line-clamp-3 text-[13px] leading-relaxed text-[#565e74]">
          {project.description[language]}
        </p>

        <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#c3c6d7]/40 bg-[#f4f7fc] px-2.5 py-0.5 text-[#565e74] transition-colors hover:border-[#2563eb]/30 hover:text-[#2563eb]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-1 flex items-center justify-between border-t border-[#e5eeff] pt-3">
        <span className="flex items-center gap-1 font-mono text-[10.5px] text-[#565e74]">
          <Layers className="h-3 w-3 text-[#2563eb]" />
          {project.status}
        </span>
        <button
          type="button"
          onClick={() => onSelectProject(project)}
          className="inline-flex items-center gap-1.5 rounded-xl border border-[#2563eb]/25 bg-blue-50/80 px-3.5 py-1.5 text-xs font-semibold text-[#2563eb] shadow-xs transition-all hover:bg-[#2563eb] hover:text-white active:scale-98"
        >
          <span>{language === 'fr' ? 'Détails' : 'Details'}</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  );

  return (
    <section id="projects" className="border-b border-[#e5eeff]/70 bg-[#f4f7fc]/40 px-5 py-10">
      <div className="mx-auto max-w-7xl px-0 sm:px-4 lg:px-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-[#0b1c30] sm:text-xl">
              {language === 'fr' ? 'Projets & Réalisations' : 'Projects'}
            </h2>
          </div>
        </div>

        <div className="relative mb-6 -mx-5 sm:mx-0" aria-label={language === 'fr' ? 'Filtres des projets' : 'Project filters'}>
          <div className="flex items-center gap-2 overflow-x-auto whitespace-nowrap px-5 pb-2 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              type="button"
              aria-pressed={selectedCategories.length === 0}
              onClick={() => setSelectedFilters({})}
              className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${selectedCategories.length === 0 ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-[#c3c6d7]/50 bg-white text-[#565e74] hover:border-[#2563eb]/50 hover:text-[#2563eb]'}`}
            >
              {language === 'fr' ? 'Tous' : 'All'}
            </button>

            {FILTER_GROUPS.map((group, groupIndex) => (
              <React.Fragment key={group.id}>
                {groupIndex > 0 && <span aria-hidden="true" className="mx-1 h-6 w-px shrink-0 bg-[#c3c6d7]" />}
                <div role="group" aria-label={group.label[language]} className="flex shrink-0 items-center gap-2">
                  {group.categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      aria-pressed={selectedFilters[group.id] === category}
                      onClick={() => toggleFilter(group.id, category)}
                      className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${selectedFilters[group.id] === category ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-[#c3c6d7]/50 bg-white text-[#565e74] hover:border-[#2563eb]/50 hover:text-[#2563eb]'}`}
                    >
                      {FILTER_LABELS[category][language]}
                    </button>
                  ))}
                </div>
              </React.Fragment>
            ))}
          </div>
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#f4f7fc]/95 to-transparent sm:hidden" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleProjects.map(renderProjectCard)}
        </div>
        {visibleProjects.length === 0 && (
          <p className="py-8 text-center text-sm text-[#565e74]">
            {language === 'fr' ? 'Aucun projet ne correspond à cette combinaison.' : 'No projects match this combination.'}
          </p>
        )}
      </div>
    </section>
  );
};