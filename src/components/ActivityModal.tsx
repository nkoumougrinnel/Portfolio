import React, { useEffect, useState } from 'react';
import { X, Maximize2, ChevronRight } from 'lucide-react';
import { Language, ActivityItem, Project } from '../types';

interface ActivityModalProps {
  activity: ActivityItem | null;
  language: Language;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onClose: () => void;
}

export const ActivityModal: React.FC<ActivityModalProps> = ({
  activity,
  language,
  projects,
  onSelectProject,
  onClose,
}) => {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  useEffect(() => {
    if (!activity) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activity]);

  useEffect(() => {
    if (!lightboxImage) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  if (!activity) return null;

  const momentPhotos = [...new Set(activity.momentPhotos ?? [])].filter((photo) => photo !== activity.imageUrl);
  const relatedProjects = activity.relatedProjectIds
    ?.map((projectId) => projects.find((project) => project.id === projectId))
    .filter((project): project is Project => Boolean(project)) ?? [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-5 bg-[var(--color-media-overlay)]/90 animate-in fade-in duration-200">
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden border-0 bg-[var(--color-bg-main)] shadow-2xl sm:h-auto sm:max-h-[92vh] sm:max-w-2xl sm:rounded-2xl sm:border sm:border-[var(--color-border)]">

        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[var(--color-border)] flex items-start justify-between bg-[var(--color-bg-main)] sticky top-0 z-20">
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-bold text-[var(--color-text-main)] leading-tight">
              {activity.title}
            </h3>
            <p className="mt-1 text-xs text-[var(--color-text-muted)]">{activity.year}</p>
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

        {/* Scrollable content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-[var(--color-text-main)]">

          {/* Hero image with lightbox button */}
          <div className="relative overflow-hidden rounded-xl bg-[var(--color-media-panel)]">
            <img
              src={activity.imageUrl}
              alt={activity.title}
              className="aspect-video w-full object-cover"
              onError={(event) => {
                (event.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80';
              }}
            />
            <button
              type="button"
              onClick={() => setLightboxImage(activity.imageUrl)}
              aria-label={language === 'fr' ? 'Agrandir' : 'Enlarge'}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-black/40 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/60"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              {language === 'fr' ? 'Agrandir' : 'Enlarge'}
            </button>
          </div>

          {/* Photo grid */}
          {momentPhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {momentPhotos.map((photo, index) => (
                <button
                  key={photo}
                  type="button"
                  onClick={() => setLightboxImage(photo)}
                  className="group overflow-hidden rounded-xl border border-[var(--color-border-muted)]/40 bg-[var(--color-bg-panel)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
                >
                  <img
                    src={photo}
                    alt={`${activity.title} — photo ${index + 1}`}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(event) => {
                      (event.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                </button>
              ))}
            </div>
          )}

          {/* Description */}
          <section className="space-y-2">
            <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
              {language === 'fr' ? 'À propos' : 'About'}
            </h4>
            <p className="text-[13.5px] text-[var(--color-text-muted)] leading-relaxed">
              {activity.details?.[language] || activity.description[language]}
            </p>
          </section>

          {/* Role */}
          {activity.role && (
            <section className="space-y-2">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                {language === 'fr' ? 'Ma participation' : 'My participation'}
              </h4>
              <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">{activity.role[language]}</p>
            </section>
          )}

          {/* Related projects — always a featured card (activities link to 1 project) */}
          {relatedProjects.length > 0 && (
            <section className="space-y-3 border-t border-[var(--color-border)] pt-5">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                {language === 'fr' ? 'Projet lié' : 'Related project'}
              </h4>
              <div className="space-y-2">
                {relatedProjects.map((project) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => onSelectProject(project)}
                    className="group flex w-full items-center gap-4 rounded-xl border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/5 px-4 py-4 text-left transition-all hover:border-[var(--color-accent)]/60 hover:bg-[var(--color-accent)]/10 hover:shadow-sm"
                  >
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-[var(--color-bg-panel)] border border-[var(--color-border)]">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                        {project.title}
                      </p>
                      <p className="mt-0.5 text-[11.5px] text-[var(--color-text-muted)] line-clamp-2 leading-snug">
                        {project.description[language]}
                      </p>
                    </div>
                    <ChevronRight className="h-5 w-5 shrink-0 text-[var(--color-accent)] opacity-70 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </section>
          )}

          {/* Certificate image */}
          {activity.certificateImageUrl && (
            <section className="space-y-3 border-t border-[var(--color-border)] pt-5">
              <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                {language === 'fr' ? 'Attestation' : 'Certificate'}
              </h4>
              <button
                type="button"
                onClick={() => setLightboxImage(activity.certificateImageUrl!)}
                className="group relative block max-w-xs overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-panel)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)]"
              >
                <img src={activity.certificateImageUrl} alt={`${activity.title} certificate`} className="aspect-video w-full object-contain transition-transform duration-300 group-hover:scale-105" />
              </button>
            </section>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activity.title}
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-[var(--color-media-panel)]/90 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            aria-label={language === 'fr' ? "Fermer l'image agrandie" : 'Close enlarged image'}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-bg-main)]/10 text-white hover:bg-[var(--color-bg-main)]/20"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightboxImage}
            alt={activity.title}
            onClick={(event) => event.stopPropagation()}
            className="max-h-full max-w-full object-contain"
          />
        </div>
      )}
    </div>
  );
};
