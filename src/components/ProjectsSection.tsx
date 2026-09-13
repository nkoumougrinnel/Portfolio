import React from 'react';
import { ExternalLink, Layers } from 'lucide-react';
import { Language, Project } from '../types';

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
  const featured = projects.filter((p) => p.category === 'featured');
  const moreWork = projects.filter((p) => p.category === 'more');
  const earlyBuilds = projects.filter((p) => p.category === 'early');

  const renderProjectCard = (project: Project) => {
    return (
      <article
        key={project.id}
        className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e5eeff] shadow-xs hover:shadow-md hover:border-[#2563eb]/40 transition-all flex flex-col justify-between gap-3 group h-full"
      >
        <div className="flex flex-col gap-3">
          {/* Mockup Container with dynamic link */}
          <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border border-[#c3c6d7]/30 bg-slate-900 shadow-inner group/img">
            <img
              alt={`${project.title} Mockup`}
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
              src={project.imageUrl}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80';
              }}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
              <span className="font-mono text-[10px] text-white/90 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                {project.status}
              </span>
            </div>

            {/* Top category chip */}
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md border border-white/40 text-[10px] font-mono font-bold text-[#0b1c30] shadow-xs">
              {project.typeBadge}
            </div>
          </div>

          {/* Title and Tagline */}
          <div className="flex items-baseline justify-between pt-1">
            <h4 className="text-base sm:text-lg font-bold text-[#0b1c30] group-hover:text-[#2563eb] transition-colors">
              {project.title}
            </h4>
            <span className="font-mono text-[10.5px] text-[#565e74] font-medium">
              {project.tagline}
            </span>
          </div>

          {/* Description */}
          <p className="text-[13px] text-[#565e74] leading-relaxed line-clamp-3">
            {project.description[language]}
          </p>

          {/* Tech Badges */}
          <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-0.5 rounded-full bg-[#f4f7fc] text-[#565e74] border border-[#c3c6d7]/40 hover:border-[#2563eb]/30 hover:text-[#2563eb] transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="pt-3 mt-1 border-t border-[#e5eeff] flex items-center justify-between">
          <span className="font-mono text-[10.5px] text-[#565e74] flex items-center gap-1">
            <Layers className="w-3 h-3 text-[#2563eb]" />
            {project.status}
          </span>

          <button
            onClick={() => onSelectProject(project)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50/80 hover:bg-[#2563eb] hover:text-white text-[#2563eb] border border-[#2563eb]/25 text-xs font-semibold font-mono transition-all shadow-xs active:scale-98"
          >
            <span>{language === 'fr' ? 'Détails' : 'Details'}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        </div>
      </article>
    );
  };

  return (
    <section id="projects" className="px-5 py-10 bg-[#f4f7fc]/40 border-b border-[#e5eeff]/70">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        {/* Section Header without filters */}
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-lg text-[#2563eb] font-bold">03 /</span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0b1c30] tracking-tight">
            {language === 'fr' ? 'Projets & Réalisations' : 'Projects'}
          </h2>
        </div>

        {/* 3.1 FEATURED WORK (grid 3 max) */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]"></span>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#565e74] font-bold">
              {language === 'fr' ? '3.1 Projets Phares' : 'Featured Work'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map(renderProjectCard)}
          </div>
        </div>

        {/* 3.2 MORE WORK (grid 3 max) */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#565e74]"></span>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#565e74] font-bold">
              {language === 'fr' ? '3.2 Autres Réalisations' : 'More Work'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {moreWork.map(renderProjectCard)}
          </div>
        </div>

        {/* 3.3 EARLY BUILDS (grid 3 max) */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c3c6d7]"></span>
            <h3 className="font-mono text-xs uppercase tracking-wider text-[#565e74] font-bold">
              {language === 'fr' ? '3.3 Premiers Projets' : 'Early Builds'}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {earlyBuilds.map(renderProjectCard)}
          </div>
        </div>
      </div>
    </section>
  );
};
