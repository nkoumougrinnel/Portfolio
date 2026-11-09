import React, { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import { ChevronRight, Maximize2, X } from 'lucide-react';
import { Language, Project } from '../types';

/*
 * Briques communes à toutes les fenêtres de détail (projet, certification,
 * activité, CTF) : même coque, même en-tête, mêmes sections, même lightbox.
 */

type Lightbox = { src: string; alt: string } | null;
const LightboxContext = createContext<(src: string, alt: string) => void>(() => {});
export const useLightbox = () => useContext(LightboxContext);

interface ModalShellProps {
  open: boolean;
  onClose: () => void;
  language: Language;
  /** Type de contenu, affiché en petit au-dessus du titre (ex. « projet »). */
  eyebrow: string;
  title: string;
  /** Ligne d'informations sous le titre (dates, émetteur…). */
  meta?: React.ReactNode;
  children: React.ReactNode;
}

export const ModalShell: React.FC<ModalShellProps> = ({ open, onClose, language, eyebrow, title, meta, children }) => {
  const [lightbox, setLightbox] = useState<Lightbox>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const fr = language === 'fr';

  const openLightbox = useCallback((src: string, alt: string) => setLightbox({ src, alt }), []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (lightbox) setLightbox(null);
      else onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, lightbox, onClose]);

  useEffect(() => {
    if (!open) setLightbox(null);
  }, [open]);

  if (!open) return null;

  return (
    <LightboxContext.Provider value={openLightbox}>
      <div
        className="modal-overlay fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="modal-panel relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[var(--color-bg-main)] sm:h-auto sm:max-h-[90vh] sm:max-w-3xl sm:rounded-[1.25rem] sm:border sm:border-[var(--color-border)] sm:shadow-2xl"
        >
          <header className="flex items-start justify-between gap-4 border-b border-[var(--color-border)] px-5 py-4 sm:px-7 sm:py-5">
            <div className="min-w-0">
              <p className="section-eyebrow">{eyebrow}</p>
              <h3 id={titleId} className="mt-1 text-lg font-extrabold leading-snug tracking-tight text-[var(--color-text-main)] sm:text-xl">
                {title}
              </h3>
              {meta && <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1.5">{meta}</div>}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={fr ? 'Fermer' : 'Close'}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <X className="h-4 w-4" />
            </button>
          </header>

          <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-6 sm:px-7 sm:py-7">
            <div className="space-y-8">{children}</div>
          </div>
        </div>
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
          className="modal-overlay fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-10"
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label={fr ? "Fermer l'image agrandie" : 'Close enlarged image'}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full rounded-lg object-contain shadow-2xl"
          />
        </div>
      )}
    </LightboxContext.Provider>
  );
};

/** Bouton « Agrandir » posé sur un média. */
export const EnlargeButton: React.FC<{ src: string; alt: string; language: Language }> = ({ src, alt, language }) => {
  const open = useLightbox();
  return (
    <button
      type="button"
      onClick={() => open(src, alt)}
      className="absolute bottom-3 right-3 z-10 inline-flex items-center gap-1.5 rounded-full bg-[rgba(11,18,32,0.7)] px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-[rgba(11,18,32,0.9)]"
    >
      <Maximize2 className="h-3.5 w-3.5" />
      {language === 'fr' ? 'Agrandir' : 'Enlarge'}
    </button>
  );
};

/** Image principale d'une fenêtre (photo, certificat…). */
export const ModalMedia: React.FC<{ src: string; alt: string; language: Language; contain?: boolean }> = ({
  src,
  alt,
  language,
  contain,
}) => (
  <div className="card-media relative !aspect-[16/9]">
    <img src={src} alt={alt} className={contain ? '!object-contain' : ''} />
    <EnlargeButton src={src} alt={alt} language={language} />
  </div>
);

/** Section d'une fenêtre : même titre que les sous-sections du site. */
export const ModalSection: React.FC<{ title: string; count?: number; children: React.ReactNode }> = ({ title, count, children }) => (
  <section>
    <h4 className="subsection-title">
      {title}
      {typeof count === 'number' && <span className="tag tag-neutral !py-0.5">{count}</span>}
    </h4>
    {children}
  </section>
);

export const ModalText: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[14.5px] leading-[1.75] text-[var(--color-text-muted)]">{children}</p>
);

export const BulletList: React.FC<{ items: string[] }> = ({ items }) => (
  <ul className="space-y-2.5">
    {items.map((item, index) => (
      <li key={`${item}-${index}`} className="flex gap-3 text-[14px] leading-relaxed text-[var(--color-text-muted)]">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
        {item}
      </li>
    ))}
  </ul>
);

export const TagList: React.FC<{ items: string[] }> = ({ items }) => (
  <div className="flex flex-wrap gap-1.5">
    {items.map((item) => (
      <span key={item} className="tag">{item}</span>
    ))}
  </div>
);

/** Grille de photos cliquables (ouvre la lightbox). */
export const PhotoGrid: React.FC<{ photos: { src: string; caption?: string }[]; alt: string }> = ({ photos, alt }) => {
  const open = useLightbox();
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {photos.map((photo, index) => (
        <figure key={photo.src} className="space-y-1.5">
          <button
            type="button"
            onClick={() => open(photo.src, `${alt} — ${index + 1}`)}
            className="card-media group block w-full !aspect-[4/3] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
          >
            <img src={photo.src} alt={`${alt} — ${index + 1}`} loading="lazy" className="group-hover:scale-105" />
          </button>
          {photo.caption && <figcaption className="meta justify-center">{photo.caption}</figcaption>}
        </figure>
      ))}
    </div>
  );
};

/** Liste des projets liés (même rendu partout). */
export const RelatedProjects: React.FC<{
  projects: Project[];
  language: Language;
  onSelect: (project: Project) => void;
}> = ({ projects, language, onSelect }) => (
  <ul className="space-y-2.5">
    {projects.map((project) => (
      <li key={project.id}>
        <button
          type="button"
          onClick={() => onSelect(project)}
          className="card card-interactive group flex w-full items-center gap-4 p-3 text-left"
        >
          <span className="h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-accent)]">
            <img src={project.imageUrl} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="card-title block !text-[15px]">{project.title}</span>
            <span className="mt-0.5 line-clamp-1 text-[12.5px] text-[var(--color-text-muted)]">
              {project.description[language]}
            </span>
          </span>
          <ChevronRight className="h-5 w-5 shrink-0 text-[var(--color-text-subtle)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]" />
        </button>
      </li>
    ))}
  </ul>
);
