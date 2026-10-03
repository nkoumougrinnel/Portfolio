import React, { useEffect, useState } from 'react';
import { X, Maximize2, ExternalLink, Github, Globe, Code2 } from 'lucide-react';
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
  "Deployed at SUP'PTIC": { fr: "Déployé à SUP'PTIC", en: "Deployed at SUP'PTIC" },
  Completed: { fr: 'Projet livré', en: 'Delivered' },
  Prototype: { fr: 'Prototype', en: 'Prototype' },
  'In Progress': { fr: 'En cours', en: 'In progress' }
};

function getLinkIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('github')) return <Github className="h-4 w-4" />;
  if (l.includes('demo') || l.includes('live') || l.includes('site') || l.includes('web')) return <Globe className="h-4 w-4" />;
  return <ExternalLink className="h-4 w-4" />;
}

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
      ? [{ label: language === 'fr' ? 'Démo live' : 'Live demo', url: project.link }]
      : [])
  ];
  const status = STATUS_LABELS[project.status]?.[language] ?? project.status;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-text-main)]/75 p-0 backdrop-blur-sm animate-in fade-in duration-200 sm:p-5">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden border-0 bg-[var(--color-bg-main)] shadow-2xl sm:h-auto sm:max-h-[92vh] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-[var(--color-border)]">

        {/* Header */}
        <header className="sticky top-0 z-20 flex items-start justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-main)] px-5 py-4 sm:px-7">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold leading-tight text-[var(--color-text-main)] sm:text-xl">{project.title}</h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-[var(--color-accent)]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[var(--color-accent)] border border-[var(--color-accent)]/20">
                {status}
              </span>
              {project.period && (
                <span className="text-xs text-[var(--color-text-muted)]">{project.period}</span>
              )}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={language === 'fr' ? 'Fermer' : 'Close'}
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-accent)] hover:text-[var(--color-text-main)]"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-5 text-[var(--color-text-main)] sm:px-7 sm:py-6 space-y-6">

          {/* Hero image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-[var(--color-media-panel)]">
            <img src={project.imageUrl} alt={project.title} className="h-full w-full object-contain" />
            <button
              type="button"
              onClick={() => setEnlargedImage({ src: project.imageUrl, alt: project.title })}
              aria-label={language === 'fr' ? "Agrandir l'image principale" : 'Enlarge main image'}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-media-panel)]/75 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-[var(--color-media-panel)]"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              {language === 'fr' ? 'Agrandir' : 'Enlarge'}
            </button>
          </div>

          {/* Description */}
          <section className="space-y-2">
            <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
              {language === 'fr' ? 'À propos du projet' : 'About the project'}
            </h4>
            <p className="text-[13.5px] leading-relaxed text-[var(--color-text-muted)]">
              {project.longDescription?.[language] || project.description[language]}
            </p>
          </section>

          {/* Context — distinct block with left accent border */}
          {project.context && (
            <div className="rounded-xl border border-[var(--color-accent)]/15 bg-[var(--color-accent)]/5 px-4 py-3">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">
                {language === 'fr' ? 'Contexte' : 'Context'}
              </p>
              <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                {project.context[language]}
              </p>
            </div>
          )}

          {/* Role */}
          {project.role && (
            <section className="space-y-1.5">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                {language === 'fr' ? 'Mon rôle' : 'My role'}
                {project.draftDetails && (
                  <span className="ml-2 text-[10px] font-normal text-[var(--color-text-muted)]">
                    {language === 'fr' ? '(à confirmer)' : '(to confirm)'}
                  </span>
                )}
              </h4>
              <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">{project.role[language]}</p>
            </section>
          )}

          {/* Architecture notes */}
          {project.architectureNotes && (
            <section className="space-y-1.5">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                {language === 'fr' ? 'Conception' : 'Design & implementation'}
              </h4>
              <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">{project.architectureNotes[language]}</p>
            </section>
          )}

          {/* Technologies — tags as pills */}
          <section className="space-y-2.5">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-[var(--color-text-main)]">
              <Code2 className="h-4 w-4 text-[var(--color-accent)]" />
              {language === 'fr' ? 'Technologies' : 'Technologies'}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-2.5 py-1 text-[11px] font-semibold text-[var(--color-accent)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          {/* Gallery */}
          {gallery.length > 0 && (
            <section className="space-y-3">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
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
                      className="overflow-hidden rounded-lg bg-[var(--color-bg-panel)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                    >
                      <img src={image} alt={alt} className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105" />
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* Video */}
          {video && (
            <section className="space-y-3">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                {language === 'fr' ? 'Vidéo de démonstration' : 'Demo video'}
                {project.demoAssets && <span className="ml-2 text-[10px] font-normal text-[var(--color-text-muted)]">{language === 'fr' ? '(aperçu)' : '(preview)'}</span>}
              </h4>
              <video src={video} controls preload="metadata" className="aspect-video w-full rounded-xl bg-[var(--color-media-overlay)]" />
            </section>
          )}

          {/* Links — prominent buttons at the bottom */}
          {links.length > 0 && (
            <div className="border-t border-[var(--color-border)] pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                {language === 'fr' ? 'Liens du projet' : 'Project links'}
              </p>
              <nav aria-label={language === 'fr' ? 'Liens du projet' : 'Project links'} className="flex flex-wrap gap-3">
                {links.map((link) => (
                  <a
                    key={`${link.label}-${link.url}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-2.5 text-sm font-semibold text-[var(--color-accent)] transition-all hover:border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white hover:shadow-lg hover:shadow-[var(--color-accent)]/20 hover:-translate-y-0.5"
                  >
                    {getLinkIcon(link.label)}
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {enlargedImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={enlargedImage.alt}
          onClick={() => setEnlargedImage(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--color-media-panel)]/90 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setEnlargedImage(null)}
            aria-label={language === 'fr' ? "Fermer l'image agrandie" : 'Close enlarged image'}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bg-main)]/10 text-white hover:bg-[var(--color-bg-main)]/20"
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
