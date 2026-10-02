import React, { useEffect, useState } from 'react';
import { X, Maximize2 } from 'lucide-react';
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-5 bg-[#0b1c30]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative flex h-[100dvh] w-screen flex-col overflow-hidden border-0 bg-white shadow-2xl sm:h-auto sm:max-h-[92vh] sm:w-full sm:max-w-2xl sm:rounded-2xl sm:border sm:border-[#e5eeff]">
        <div className="px-5 sm:px-6 py-4 border-b border-[#e5eeff] flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] leading-tight">
              {certification.title[language]}
            </h3>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 text-xs text-[#565e74]">
              <span>{certification.issuer[language]}</span>
              {certification.period && <><span aria-hidden="true" className="text-[#c3c6d7]">·</span><span>{certification.period}</span></>}
              {certification.duration && <><span aria-hidden="true" className="text-[#c3c6d7]">·</span><span>{certification.duration}</span></>}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={language === 'fr' ? 'Fermer' : 'Close'}
            className="w-8 h-8 rounded-full bg-[#f4f7fc] hover:bg-[#e5eeff] text-[#565e74] hover:text-[#0b1c30] flex items-center justify-center transition-colors shrink-0 ml-3"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-[#0b1c30]">
          <div className="relative aspect-video max-h-[52vh] w-full overflow-hidden rounded-xl bg-slate-950">
            <img src={certificateImageUrl} alt={certification.title[language]} className="w-full h-full object-contain" />
            <button
              type="button"
              onClick={() => setEnlargedImage({ src: certificateImageUrl, alt: certification.title[language] })}
              className="absolute right-3 bottom-3 inline-flex items-center gap-1.5 rounded-lg bg-slate-950/75 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm hover:bg-slate-950 transition-colors"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              {language === 'fr' ? 'Agrandir' : 'Enlarge'}
            </button>
          </div>

          <section className="space-y-2">
            <h4 className="text-sm font-semibold text-[#0b1c30]">
              {language === 'fr' ? 'À propos' : 'About'}
            </h4>
            <p className="text-[13.5px] text-[#565e74] leading-relaxed">
              {certification.description[language]}
            </p>
          </section>

          {certification.skills && certification.skills.length > 0 && (
            <section className="space-y-3 border-t border-[#e5eeff] pt-4">
              <h4 className="text-sm font-semibold text-[#0b1c30]">
                {language === 'fr' ? 'Compétences acquises' : 'Validated skills'}
              </h4>
              <p className="text-[13px] leading-relaxed text-[#565e74]">{certification.skills.join(' · ')}</p>
            </section>
          )}

          {relatedProjects.length > 0 && (
            <section className="space-y-3 border-t border-[#e5eeff] pt-5">
              <h4 className="text-sm font-semibold text-[#0b1c30]">
                {language === 'fr' ? 'Projets liés' : 'Related projects'}
              </h4>
              <ul className="space-y-2">
                {relatedProjects.map((project) => (
                  <li key={project.id}>
                    <button
                      type="button"
                      onClick={() => onSelectProject(project)}
                      className="text-left text-[13px] font-medium text-[#2563eb] transition-colors hover:text-[#0b1c30] hover:underline"
                    >
                      {project.title} <span aria-hidden="true">→</span>
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {momentPhotos.length > 0 && (
            <div className="space-y-3 border-t border-[#e5eeff] pt-4">
              <h4 className="text-sm font-semibold text-[#0b1c30]">
                {language === 'fr' ? 'Photos de l’événement' : 'Event photos'}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {momentPhotos.map((photo, index) => {
                  const photoData = typeof photo === 'string' ? { src: photo } : photo;
                  const photoAlt = `${certification.title[language]} — ${language === 'fr' ? 'photo' : 'photo'} ${index + 1}`;
                  return (
                    <figure key={photoData.src} className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => setEnlargedImage({ src: photoData.src, alt: photoAlt })}
                        className="group relative block w-full overflow-hidden rounded-xl border border-[#e5eeff] focus-visible:outline-2 focus-visible:outline-[#2563eb]"
                      >
                        <img src={photoData.src} alt={photoAlt} className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105" />
                      </button>
                      {photoData.label && (
                        <figcaption className="text-center font-mono text-[11px] text-[#565e74]">
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
