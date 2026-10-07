import React, { useEffect, useState } from 'react';
import { X, Maximize2, Award, BookOpen, ChevronRight } from 'lucide-react';
import { CertificationItem, Language, Project } from '../types';

interface CertificationModalProps {
  certification: CertificationItem | null;
  language: Language;
  certificateImageUrl: string;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onClose: () => void;
}

export const CertificationModal: React.FC<CertificationModalProps> = ({
  certification,
  language,
  certificateImageUrl,
  projects,
  onSelectProject,
  onClose,
}) => {
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!certification) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [certification]);

  useEffect(() => {
    if (!enlargedImage) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setEnlargedImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enlargedImage]);

  if (!certification) return null;

  const momentPhotos = certification.momentPhotos ?? [];
  const relatedProjects = certification.relatedProjectIds
    ?.map((projectId) => projects.find((project) => project.id === projectId))
    .filter((project): project is Project => Boolean(project)) ?? [];

  // A "training" with many projects = list style; a "certif/competition" with 1 project = card style
  const isMultiProject = relatedProjects.length > 1;
  const relatedLabel = certification.relatedProjectsContext?.[language]
    ?? (language === 'fr' ? 'Projets liés' : 'Related projects');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-5 bg-[var(--color-media-overlay)]/90 animate-in fade-in duration-200">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden border-0 bg-[var(--color-bg-main)] shadow-2xl sm:h-auto sm:max-h-[92vh] sm:max-w-2xl sm:rounded-2xl sm:border sm:border-[var(--color-border)]">

        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[var(--color-border)] flex items-start justify-between bg-[var(--color-bg-main)] sticky top-0 z-20">
          <div className="min-w-0 flex-1">
            <h3 className="text-base sm:text-lg font-bold text-[var(--color-text-main)] leading-tight">
              {certification.title[language]}
            </h3>
            <p className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-[var(--color-text-muted)]">
              <span className="flex items-center gap-1">
                <Award className="h-3 w-3 text-[var(--color-accent)]" />
                {certification.issuer[language]}
              </span>
              {certification.period && (
                <>
                  <span aria-hidden="true" className="text-[var(--color-border-muted)]">·</span>
                  <span>{certification.period}</span>
                </>
              )}
              {certification.duration && (
                <span className="rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] font-semibold text-[var(--color-accent)]">
                  {certification.duration}
                </span>
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={language === 'fr' ? 'Fermer' : 'Close'}
            className="w-9 h-9 rounded-full bg-[var(--color-bg-soft)] hover:bg-[var(--color-bg-accent)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] flex items-center justify-center transition-colors shrink-0 ml-3"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-[var(--color-text-main)]">

          {/* Certificate image */}
          <div className="relative aspect-video max-h-[52vh] w-full overflow-hidden rounded-xl bg-[var(--color-media-panel)]">
            <img src={certificateImageUrl} alt={certification.title[language]} className="w-full h-full object-contain" />
            <button
              type="button"
              onClick={() => setEnlargedImage({ src: certificateImageUrl, alt: certification.title[language] })}
              className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-media-panel)]/75 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm hover:bg-[var(--color-media-panel)] transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              {language === 'fr' ? 'Agrandir' : 'Enlarge'}
            </button>
          </div>

          {/* Description */}
          <section className="space-y-2">
            <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
              {language === 'fr' ? 'À propos' : 'About'}
            </h4>
            <p className="text-[13.5px] text-[var(--color-text-muted)] leading-relaxed">
              {certification.description[language]}
            </p>
          </section>

          {/* Skills — pill badges */}
          {certification.skills && certification.skills.length > 0 && (
            <section className="space-y-3 border-t border-[var(--color-border)] pt-5">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                {language === 'fr' ? 'Compétences acquises' : 'Validated skills'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {certification.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[var(--color-accent)]/20 bg-[var(--color-accent)]/10 px-2.5 py-1 text-[11px] font-semibold text-[var(--color-accent)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {/* Related projects */}
          {relatedProjects.length > 0 && (
            <section className="space-y-3 border-t border-[var(--color-border)] pt-5">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[var(--color-accent)]" />
                <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                  {relatedLabel}
                </h4>
                {/* Badge showing count if multiple */}
                {isMultiProject && (
                  <span className="rounded-full bg-[var(--color-bg-soft)] border border-[var(--color-border)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-text-muted)]">
                    {relatedProjects.length}
                  </span>
                )}
              </div>

              {isMultiProject ? (
                /* Training with many projects → compact list */
                <ul className="space-y-2">
                  {relatedProjects.map((project) => (
                    <li key={project.id}>
                      <button
                        type="button"
                        onClick={() => onSelectProject(project)}
                        className="group flex w-full items-center justify-between rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)]/60 px-4 py-2.5 text-left transition-all hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/5"
                      >
                        <span className="text-[13px] font-medium text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors">
                          {project.title}
                        </span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] transition-colors" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                /* Certif / event with 1 project → featured card */
                <button
                  type="button"
                  onClick={() => onSelectProject(relatedProjects[0])}
                  className="group flex w-full items-center gap-4 rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/5 px-4 py-4 text-left transition-all hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-accent)]/10 hover:shadow-sm"
                >
                  <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--color-bg-panel)] border border-[var(--color-border)]">
                    <img
                      src={relatedProjects[0].imageUrl}
                      alt={relatedProjects[0].title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                      {relatedProjects[0].title}
                    </p>
                    <p className="mt-0.5 text-[11.5px] text-[var(--color-text-muted)] line-clamp-2 leading-snug">
                      {relatedProjects[0].description[language]}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 shrink-0 text-[var(--color-accent)] opacity-70 group-hover:opacity-100 transition-opacity" />
                </button>
              )}
            </section>
          )}

          {/* Moment photos */}
          {momentPhotos.length > 0 && (
            <div className="space-y-3 border-t border-[var(--color-border)] pt-5">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                {language === 'fr' ? "Photos de l'événement" : 'Event photos'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {momentPhotos.map((photo, index) => {
                  const photoData = typeof photo === 'string' ? { src: photo } : photo;
                  const photoAlt = `${certification.title[language]} — photo ${index + 1}`;
                  return (
                    <figure key={photoData.src} className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => setEnlargedImage({ src: photoData.src, alt: photoAlt })}
                        className="group relative block w-full overflow-hidden rounded-xl border border-[var(--color-border)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                      >
                        <img src={photoData.src} alt={photoAlt} className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105" />
                      </button>
                      {photoData.label && (
                        <figcaption className="text-center font-mono text-[11px] text-[var(--color-text-muted)]">
                          {photoData.label[language]}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
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
