import React from 'react';
import { X, CheckCircle, ExternalLink, Sparkles, Layers, Cpu, Check } from 'lucide-react';
import { Language, Project } from '../types';
import { DEFAULT_FEATURED_MOCKUP, DEFAULT_MORE_MOCKUP } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  language: Language;
  onClose: () => void;
  onUpdateProjectImage?: (projectId: string, newUrl: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  language,
  onClose,
}) => {
  if (!project) return null;

  // Curate 2 to 3 clean screenshots/captures for the project
  const screenshots: { title: string; url: string }[] = project.screenshots && project.screenshots.length > 0
    ? project.screenshots.map((url, idx) => ({
        title: idx === 0 ? (language === 'fr' ? 'Vue principale' : 'Primary View') : `${language === 'fr' ? 'Capture' : 'Screen'} #${idx + 1}`,
        url,
      }))
    : [
        {
          title: language === 'fr' ? 'Vue Principale / Interface' : 'Primary Interface',
          url: project.imageUrl,
        },
        {
          title: language === 'fr' ? 'Écran de Supervision / Données' : 'Dashboard / Data Screen',
          url: DEFAULT_MORE_MOCKUP,
        },
        {
          title: language === 'fr' ? 'Architecture & Flux' : 'Architecture & Workflow',
          url: DEFAULT_FEATURED_MOCKUP,
        },
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0b1c30]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-[#e5eeff] overflow-hidden flex flex-col">
        {/* Sticky Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#e5eeff] flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]"></span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg sm:text-xl font-bold text-[#0b1c30] leading-tight">
                  {project.title}
                </h3>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-[#2563eb] border border-[#2563eb]/20">
                  {project.typeBadge}
                </span>
                <span className="text-[10px] font-mono text-[#565e74] bg-[#f4f7fc] px-2 py-0.5 rounded border border-[#c3c6d7]/40">
                  {project.status}
                </span>
              </div>
              <p className="font-mono text-xs text-[#565e74] mt-0.5">{project.tagline}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full bg-[#f4f7fc] hover:bg-[#e5eeff] text-[#565e74] hover:text-[#0b1c30] flex items-center justify-center transition-colors shrink-0 ml-2"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Centralized Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-[#0b1c30]">
          {/* 2-3 Captures / Screenshots Gallery */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#2563eb] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5" />
                {language === 'fr' ? 'Captures & Écrans du projet (2-3 vues)' : 'Screenshots & UI Previews'}
              </span>
              <span className="font-mono text-[11px] text-[#565e74]">
                {screenshots.length} {language === 'fr' ? 'écrans' : 'screens'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {screenshots.slice(0, 3).map((screen, idx) => (
                <div
                  key={idx}
                  className="group relative rounded-xl overflow-hidden border border-[#c3c6d7]/50 bg-slate-950 aspect-[4/3] shadow-xs flex flex-col"
                >
                  <img
                    src={screen.url}
                    alt={`${project.title} - ${screen.title}`}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent p-2">
                    <span className="text-[10.5px] font-mono text-white/90 font-medium block truncate">
                      {screen.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Résumé Complet */}
          <div className="space-y-1.5 border-t border-[#e5eeff] pt-5">
            <h4 className="font-mono text-xs uppercase font-bold text-[#2563eb]">
              // {language === 'fr' ? 'RÉSUMÉ DU PROJET' : 'PROJECT SUMMARY'}
            </h4>
            <p className="text-[13.5px] text-[#565e74] leading-relaxed">
              {project.longDescription?.[language] || project.description[language]}
            </p>
          </div>

          {/* Fonctionnalités clés */}
          {project.features && (
            <div className="space-y-2 border-t border-[#e5eeff] pt-5">
              <h4 className="font-mono text-xs uppercase font-bold text-[#2563eb]">
                // {language === 'fr' ? 'FONCTIONNALITÉS CLÉS' : 'KEY FEATURES'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.features[language].map((feat, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-xl bg-[#f4f7fc]/80 border border-[#e5eeff] flex items-start gap-2"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs text-[#0b1c30] leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Architecture & Stack */}
          {project.architectureNotes && (
            <div className="space-y-1.5 border-t border-[#e5eeff] pt-5">
              <h4 className="font-mono text-xs uppercase font-bold text-[#0b1c30] flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-[#2563eb]" />
                {language === 'fr' ? 'Architecture & Conception Technique' : 'Architecture & Tech Stack'}
              </h4>
              <div className="p-3.5 rounded-xl bg-[#f4f7fc] border border-[#c3c6d7]/40">
                <p className="text-xs text-[#565e74] leading-relaxed">
                  {project.architectureNotes[language]}
                </p>
              </div>
            </div>
          )}

          {/* Stack & Technologies */}
          <div className="space-y-2 border-t border-[#e5eeff] pt-5">
            <span className="font-mono text-[11px] text-[#565e74] block uppercase tracking-wider font-semibold">
              {language === 'fr' ? 'Stack & Technologies :' : 'Stack & Technologies:'}
            </span>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-[#e5eeff] text-[#2563eb] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Simple Footer without "Nkoumou Tjade Portfolio" */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#f4f7fc]/90 border-t border-[#e5eeff] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0b1c30] hover:bg-[#2563eb] text-white text-xs font-mono font-semibold transition-colors shadow-xs"
          >
            {language === 'fr' ? 'Fermer' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
