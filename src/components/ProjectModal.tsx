import React, { useEffect, useState } from 'react';
import { X, Maximize2, ExternalLink, Github, Globe, Code2 } from 'lucide-react';
import { Language, Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  language: Language;
  onClose: () => void;
  onUpdateProjectImage?: (projectId: string, newUrl: string) => void;
}

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
  const contributions = project.features?.[language] ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--color-media-overlay)]/90 p-0 animate-in fade-in duration-200 pointer-events-none sm:p-5">
      <div className="relative pointer-events-auto flex h-[100dvh] w-full flex-col overflow-hidden border-0 bg-[var(--color-bg-main)] shadow-2xl sm:h-auto sm:max-h-[92vh] sm:max-w-3xl sm:rounded-2xl sm:border sm:border-[var(--color-border)]">

        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[var(--color-border)] bg-[var(--color-bg-main)] px-5 py-4 sm:px-7">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold leading-tight text-[var(--color-text-main)] sm:text-xl">{project.title}</h3>
            <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--color-text-muted)]">
              {project.context && <span>{project.context[language]}</span>}
              {project.context && project.period && <span aria-hidden="true">·</span>}
              {project.period && <span>{project.period}</span>}
              {project.role && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-[var(--color-text-main)]">{project.role[language]}</span>
                </>
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

          {project.context && (
            <section className="space-y-1.5 border-t border-[var(--color-border)] pt-5">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                {language === 'fr' ? 'Contexte' : 'Context'}
              </h4>
              <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                {project.context[language]}
              </p>
            </section>
          )}

          {contributions.length > 0 && (
            <section className="space-y-3 border-t border-[var(--color-border)] pt-5">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                {language === 'fr' ? 'Contribution' : 'Contribution'}
              </h4>
              <ul className="space-y-2">
                {contributions.map((contribution, index) => (
                  <li key={`${contribution}-${index}`} className="flex gap-2.5 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
                    {contribution}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {project.architectureNotes && (
            <section className="space-y-1.5 border-t border-[var(--color-border)] pt-5">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                {language === 'fr' ? 'Architecture & implémentation' : 'Architecture & implementation'}
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

          {/* Links — GitHub on the left, demo on the right */}
          {links.length > 0 && (
            <div className="border-t border-[var(--color-border)] pt-5">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                {language === 'fr' ? 'Liens du projet' : 'Project links'}
              </p>
              <div className="flex w-full max-w-full items-end justify-between gap-3">
                <nav aria-label={language === 'fr' ? 'Liens du projet' : 'Project links'} className="flex min-w-0 flex-1 flex-wrap items-center justify-start gap-2.5">
                  {links
                    .filter((link) => link.label.toLowerCase().includes('github') || (!link.label.toLowerCase().includes('demo') && !link.label.toLowerCase().includes('live')))
                    .map((link) => (
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
                <div className="flex shrink-0 flex-wrap items-center justify-end gap-2.5">
                  {links
                    .filter((link) => link.label.toLowerCase().includes('demo') || link.label.toLowerCase().includes('live'))
                    .map((link) => (
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
                </div>
              </div>
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
