import React, { useEffect, useState } from 'react';
import { X, Maximize2, ExternalLink } from 'lucide-react';
import { Language, Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  language: Language;
  onClose: () => void;
  onUpdateProjectImage?: (projectId: string, newUrl: string) => void;
}

const STATUS_LABELS: Record<string, { fr: string; en: string }> = {
  'Active MVP': { fr: 'MVP en cours', en: 'Active MVP' },
  'Production Pilot': { fr: 'Pilote en production', en: 'Production pilot' },
  'Hackathon Winner / Active': { fr: 'Lauréat de hackathon · Actif', en: 'Hackathon winner · Active' },
  "Deployed at SUP'PTIC": { fr: "Déployé à SUP’PTIC", en: "Deployed at SUP'PTIC" },
  Completed: { fr: 'Projet livré', en: 'Delivered' },
  Prototype: { fr: 'Prototype', en: 'Prototype' },
  'In Progress': { fr: 'En cours', en: 'In progress' }
};

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, language, onClose }) => {
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!project) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [project]);

  useEffect(() => {
    if (!enlargedImage) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setEnlargedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enlargedImage]);

  if (!project) return null;

  const gallery = [...new Set(project.gallery ?? project.screenshots ?? [])]
    .filter((image) => image !== project.imageUrl);
  const video = project.videos?.[0];
  const links = [
    ...(project.links ?? []).filter((link) => Boolean(link.url)),
    ...(project.github && !project.links?.some((link) => link.url === project.github)
      ? [{ label: 'GitHub', url: project.github }]
      : []),
    ...(project.link && !project.links?.some((link) => link.url === project.link)
      ? [{ label: language === 'fr' ? 'Démo' : 'Live demo', url: project.link }]
      : [])
  ];
  const status = STATUS_LABELS[project.status]?.[language] ?? project.status;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1c30]/75 p-0 backdrop-blur-sm animate-in fade-in duration-200 sm:p-5">
      <div className="relative flex h-[100dvh] w-screen flex-col overflow-hidden border-0 bg-white shadow-2xl sm:h-auto sm:max-h-[92vh] sm:w-full sm:max-w-3xl sm:rounded-2xl sm:border">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#e5eeff] bg-white px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-tight text-[#0b1c30] sm:text-xl">{project.title}</h3>
            <p className="mt-1 text-xs text-[#565e74]">
              <span>{status}</span>
              {project.period && <><span className="mx-2 text-[#c3c6d7]">·</span><span>{project.period}</span></>}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={language === 'fr' ? 'Fermer' : 'Close'}
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f4f7fc] text-[#565e74] transition-colors hover:bg-[#e5eeff] hover:text-[#0b1c30]"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        <div className="flex-1 space-y-7 overflow-y-auto px-5 py-5 text-[#0b1c30] sm:px-7 sm:py-6">
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950">
            <img src={project.imageUrl} alt={project.title} className="h-full w-full object-contain" />
            <button
              type="button"
              onClick={() => setEnlargedImage({ src: project.imageUrl, alt: project.title })}
              aria-label={language === 'fr' ? 'Agrandir l’image principale' : 'Enlarge main image'}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-950/75 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-slate-950"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              {language === 'fr' ? 'Agrandir' : 'Enlarge'}
            </button>
          </div>

          <section className="space-y-2">
            <h4 className="text-sm font-semibold text-[#0b1c30]">
              {language === 'fr' ? 'À propos du projet' : 'About the project'}
            </h4>
            <p className="text-[13.5px] leading-relaxed text-[#565e74]">
              {project.longDescription?.[language] || project.description[language]}
            </p>
            {project.context && (
              <p className="text-xs leading-relaxed text-[#7a8298]">
                <span className="font-medium text-[#565e74]">{language === 'fr' ? 'Contexte · ' : 'Context · '}</span>
                {project.context[language]}
              </p>
            )}
          </section>

          {project.role && (
            <section className="space-y-2">
              <h4 className="text-sm font-semibold text-[#0b1c30]">
                {language === 'fr' ? 'Mon rôle' : 'My role'}
                {project.draftDetails && (
                  <span className="ml-2 text-[10px] font-normal text-[#8a91a4]">
                    {language === 'fr' ? '(à confirmer)' : '(to confirm)'}
                  </span>
                )}
              </h4>
              <p className="text-[13px] leading-relaxed text-[#565e74]">{project.role[language]}</p>
            </section>
          )}

          {project.architectureNotes && (
            <section className="space-y-2">
              <h4 className="text-sm font-semibold text-[#0b1c30]">
                {language === 'fr' ? 'Conception' : 'Design & implementation'}
              </h4>
              <p className="text-[13px] leading-relaxed text-[#565e74]">{project.architectureNotes[language]}</p>
            </section>
          )}

          <section className="space-y-2">
            <h4 className="text-sm font-semibold text-[#0b1c30]">{language === 'fr' ? 'Technologies' : 'Technologies'}</h4>
            <p className="text-[12px] leading-relaxed text-[#565e74]">{project.tags.join(' · ')}</p>
          </section>

          {gallery.length > 0 && (
            <section className="space-y-3">
              <h4 className="text-sm font-semibold text-[#0b1c30]">
                {project.demoAssets
                  ? (language === 'fr' ? 'Captures de démonstration' : 'Demo captures')
                  : (language === 'fr' ? 'Captures du projet' : 'Project screenshots')}
              </h4>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {gallery.map((image, index) => {
                  const alt = `${project.title} — ${language === 'fr' ? 'capture' : 'screenshot'} ${index + 1}`;
                  return (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setEnlargedImage({ src: image, alt })}
                      className="overflow-hidden rounded-lg bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#2563eb]"
                    >
                      <img src={image} alt={alt} className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105" />
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {video && (
            <section className="space-y-3">
              <h4 className="text-sm font-semibold text-[#0b1c30]">
                {language === 'fr' ? 'Vidéo de démonstration' : 'Demo video'}
                {project.demoAssets && <span className="ml-2 text-[10px] font-normal text-[#8a91a4]">{language === 'fr' ? '(aperçu)' : '(preview)'}</span>}
              </h4>
              <video src={video} controls preload="metadata" className="aspect-video w-full rounded-xl bg-black" />
              {links.length > 0 && (
                <nav aria-label={language === 'fr' ? 'Liens du projet' : 'Project links'} className="flex flex-wrap gap-2 pt-1">
                  {links.map((link) => (
                    <a
                      key={`${link.label}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-[#2563eb]/20 bg-blue-50/70 px-3.5 py-2 text-xs font-semibold text-[#2563eb] transition-colors hover:border-[#2563eb] hover:bg-[#2563eb] hover:text-white"
                    >
                      {link.label}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  ))}
                </nav>
              )}
            </section>
          )}

          {!video && links.length > 0 && (
            <nav aria-label={language === 'fr' ? 'Liens du projet' : 'Project links'} className="flex flex-wrap gap-x-6 gap-y-2 border-t border-[#e5eeff] pt-5">
              {links.map((link) => (
                <a
                  key={`${link.label}-${link.url}`}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#2563eb] transition-colors hover:text-[#0b1c30]"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>

      {enlargedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={enlargedImage.alt}
          onClick={() => setEnlargedImage(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setEnlargedImage(null)}
            aria-label={language === 'fr' ? 'Fermer l’image agrandie' : 'Close enlarged image'}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={enlargedImage.src}
            alt={enlargedImage.alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
};
