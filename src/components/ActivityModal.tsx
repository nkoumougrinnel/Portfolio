import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-5 bg-[#0b1c30]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex h-[100dvh] w-screen flex-col overflow-hidden border-0 bg-white shadow-2xl sm:h-auto sm:max-h-[92vh] sm:w-full sm:max-w-2xl sm:rounded-2xl sm:border sm:border-[#e5eeff]">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#e5eeff] flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-[#0b1c30] leading-tight">
              {activity.title}
            </h3>
            <p className="mt-1 text-xs text-[#565e74]">{activity.year}</p>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full bg-[#f4f7fc] hover:bg-[#e5eeff] text-[#565e74] hover:text-[#0b1c30] flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-[#0b1c30]">
          <div className="overflow-hidden rounded-xl bg-slate-950">
            <button type="button" onClick={() => setLightboxImage(activity.imageUrl)} className="block w-full focus-visible:outline-2 focus-visible:outline-[#2563eb]">
              <img
                src={activity.imageUrl}
                alt={activity.title}
                className="aspect-video w-full object-cover"
                onError={(event) => {
                  (event.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </button>
          </div>

          {momentPhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {momentPhotos.map((photo, index) => (
                <button
                  key={photo}
                  type="button"
                  onClick={() => setLightboxImage(photo)}
                  className="group overflow-hidden rounded-xl border border-[#c3c6d7]/40 bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#2563eb]"
                >
                  <img
                    src={photo}
                    alt={`${activity.title} — ${language === 'fr' ? 'photo' : 'photo'} ${index + 1}`}
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

          <section className="space-y-2">
            <h4 className="text-sm font-semibold text-[#0b1c30]">
              {language === 'fr' ? 'À propos' : 'About'}
            </h4>
            <p className="text-[13.5px] text-[#565e74] leading-relaxed">
              {activity.details?.[language] || activity.description[language]}
            </p>
          </section>

          {activity.role && (
            <section className="space-y-2">
              <h4 className="text-sm font-semibold text-[#0b1c30]">
                {language === 'fr' ? 'Ma participation' : 'My participation'}
              </h4>
              <p className="text-[13px] leading-relaxed text-[#565e74]">{activity.role[language]}</p>
            </section>
          )}

          {relatedProjects.length > 0 && (
            <section className="space-y-2 border-t border-[#e5eeff] pt-4">
              <h4 className="text-sm font-semibold text-[#0b1c30]">
                {language === 'fr' ? 'Projets liés' : 'Related projects'}
              </h4>
              <ul className="space-y-1.5">
                {relatedProjects.map((project) => (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="text-[13px] font-medium text-[#2563eb] transition-colors hover:text-[#0b1c30] hover:underline"
                    >
                      {project.title} <span aria-hidden="true">→</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {activity.certificateImageUrl && (
            <section className="space-y-2 border-t border-[#e5eeff] pt-4">
              <h4 className="text-sm font-semibold text-[#0b1c30]">
                {language === 'fr' ? 'Attestation' : 'Certificate'}
              </h4>
              <button
                type="button"
                onClick={() => setLightboxImage(activity.certificateImageUrl!)}
                className="block max-w-xs overflow-hidden rounded-lg bg-slate-100 focus-visible:outline-2 focus-visible:outline-[#2563eb]"
              >
                <img src={activity.certificateImageUrl} alt={`${activity.title} certificate`} className="aspect-video w-full object-contain" />
              </button>
            </section>
          )}
        </div>

      </div>
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activity.title}
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 p-4 sm:p-8"
        >
          <button
            type="button"
            onClick={() => setLightboxImage(null)}
            aria-label={language === 'fr' ? 'Fermer l’image agrandie' : 'Close enlarged image'}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <img src={lightboxImage} alt={activity.title} onClick={(event) => event.stopPropagation()} className="max-h-full max-w-full object-contain" />
        </div>
      )}
    </div>
  );
};
