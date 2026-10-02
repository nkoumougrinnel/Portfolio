import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Language, Project } from '../types';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface SkillsSectionProps {
  language: Language;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ language, projects, onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const visibleCategories = activeCategory === 'all'
    ? SKILL_CATEGORIES
    : SKILL_CATEGORIES.filter((category) => category.id === activeCategory);
  const categoryFilters = [
    { id: 'all', label: { fr: 'Tous', en: 'All' } },
    ...SKILL_CATEGORIES.map((category) => ({ id: category.id, label: category.title }))
  ];

  return (
    <section id="skills" className="px-5 py-10 bg-white border-b border-[#e5eeff]/70">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-5">
          <h2 className="text-lg sm:text-xl font-bold text-[#0b1c30] tracking-tight">
            {language === 'fr' ? 'Compétences' : 'Skills'}
          </h2>
        </div>

        <div className="mb-6 flex flex-wrap gap-2" aria-label={language === 'fr' ? 'Filtres des compétences' : 'Skill filters'}>
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              aria-pressed={activeCategory === filter.id}
              onClick={() => {
                setActiveCategory(filter.id);
              }}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${activeCategory === filter.id ? 'border-[#2563eb] bg-[#2563eb] text-white' : 'border-[#c3c6d7]/50 bg-white text-[#565e74] hover:border-[#2563eb]/50 hover:text-[#2563eb]'}`}
            >
              {filter.label[language]}
            </button>
          ))}
        </div>

        <div className="space-y-8">
          {visibleCategories.map((category) => (
            <section key={category.id}>
              <h3 className="mb-4 flex items-center gap-3 text-sm font-bold text-[#0b1c30]">
                {category.title[language]}
                <span className="h-px flex-1 bg-[#e5eeff]" />
              </h3>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                {category.skills.map((skill) => {
                  const relatedProjects = skill.relatedProjects
                    ?.map((projectId) => projects.find((project) => project.id === projectId))
                    .filter((project): project is Project => Boolean(project)) ?? [];
                  const hasTooltip = relatedProjects.length > 0 || Boolean(skill.context);

                  return (
                    <div key={skill.name} className="group relative z-0 hover:z-30 focus-within:z-30">
                      <button
                        type="button"
                        aria-label={skill.name}
                        aria-haspopup={hasTooltip ? 'true' : undefined}
                        className="flex min-h-24 w-full flex-col items-center justify-center gap-2 rounded-xl border border-[#e5eeff] bg-white p-3 text-center shadow-xs transition-all hover:-translate-y-0.5 hover:border-[#2563eb]/50 hover:shadow-md focus-visible:outline-2 focus-visible:outline-[#2563eb]"
                      >
                        <img
                          src={`https://cdn.simpleicons.org/${skill.icon}`}
                          alt=""
                          loading="lazy"
                          className="h-8 w-8 object-contain"
                          onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
                        />
                        <span className="text-[11px] font-semibold leading-tight text-[#0b1c30]">{skill.name}</span>
                      </button>

                      {hasTooltip && (
                        <div
                          id={`skill-tooltip-${category.id}-${skill.name.replace(/[^a-zA-Z0-9]/g, '-')}`}
                          role="group"
                          aria-label={skill.name}
                          className="invisible pointer-events-none absolute bottom-[calc(100%-0.5rem)] left-1/2 z-40 w-56 max-w-[calc(100vw-2rem)] -translate-x-1/2 translate-y-1 rounded-xl border border-[#e5eeff] bg-white/90 p-3 opacity-0 shadow-lg backdrop-blur-sm transition-all duration-150 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100"
                        >
                          {relatedProjects.length > 0 ? (
                            <>
                              <p className="mb-2 font-mono text-[10px] text-[#565e74]">
                                {language === 'fr' ? 'Projets :' : 'Projects:'}
                              </p>
                              <div className="flex flex-col gap-1.5">
                                {relatedProjects.map((project) => (
                                  <button
                                    key={project.id}
                                    type="button"
                                    onClick={() => onSelectProject(project)}
                                    className="inline-flex items-center gap-1.5 text-left font-mono text-[11px] font-semibold text-[#2563eb] hover:text-[#0b1c30]"
                                  >
                                    <ArrowRight className="h-3 w-3 shrink-0" />
                                    {project.title}
                                  </button>
                                ))}
                              </div>
                            </>
                          ) : skill.context ? (
                            <>
                              <p className="mb-1 font-mono text-[10px] text-[#565e74]">
                                {language === 'fr' ? 'Utilisé dans :' : 'Used in:'}
                              </p>
                              <p className="font-mono text-[11px] font-semibold leading-relaxed text-[#2563eb]">
                                {skill.context[language]}
                              </p>
                            </>
                          ) : null}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};
