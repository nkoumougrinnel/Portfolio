import React, { useEffect, useState } from 'react';
import { X, Terminal, Lightbulb, Maximize2, Book } from 'lucide-react';
import { CtfEntry, Language } from '../types';

interface CtfModalProps {
  ctf: CtfEntry | null;
  language: Language;
  onClose: () => void;
}

export const CtfModal: React.FC<CtfModalProps> = ({
  ctf,
  language,
  onClose,
}) => {
  const [enlargedImage, setEnlargedImage] = useState<{ src: string; alt: string } | null>(null);

  useEffect(() => {
    if (!ctf) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ctf, onClose]);

  useEffect(() => {
    if (!enlargedImage) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setEnlargedImage(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enlargedImage]);

  if (!ctf) return null;

  const steps = ctf.content?.steps ?? [];
  const learned = ctf.content?.learned?.[language] ?? [];
  const imageAlt = language === 'fr'
    ? `Illustration du CTF ${ctf.title.fr}`
    : `Illustration of the CTF ${ctf.title.en}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-5 bg-[var(--color-media-overlay)]/90 animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ctf-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative flex h-[100dvh] w-full flex-col overflow-hidden border-0 bg-[var(--color-bg-main)] shadow-2xl sm:h-auto sm:max-h-[92vh] sm:max-w-2xl sm:rounded-2xl sm:border sm:border-[var(--color-border)]">
        <div className="flex items-start justify-between border-b border-[var(--color-border)] bg-[var(--color-bg-main)] px-5 py-4 sm:px-6">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              {language === 'fr' ? 'Write-up CTF' : 'CTF write-up'}
            </p>
            <h3 id="ctf-modal-title" className="mt-1 text-lg font-bold leading-tight text-[var(--color-text-main)]">
              {ctf.title[language]}
            </h3>
            <p className="mt-1.5 text-xs text-[var(--color-text-muted)]">
              {ctf.platform} · {ctf.difficulty} · {ctf.date}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={language === 'fr' ? 'Fermer' : 'Close'}
            className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--color-bg-soft)] text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-accent)] hover:text-[var(--color-text-main)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 space-y-6 overflow-y-auto p-5 text-[var(--color-text-main)] sm:p-6">
          <div className="relative h-[260px] overflow-hidden rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] sm:h-[320px]">
            <img
              src={ctf.imageUrl}
              alt={imageAlt}
              className="h-full w-full object-cover"
            />
            <button
              type="button"
              onClick={() => setEnlargedImage({ src: ctf.imageUrl, alt: imageAlt })}
              aria-label={language === 'fr' ? 'Agrandir l’image du CTF' : 'Enlarge CTF image'}
              className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-lg bg-[var(--color-media-panel)]/75 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-[var(--color-media-panel)]"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              {language === 'fr' ? 'Agrandir' : 'Enlarge'}
            </button>
          </div>

          <section className="space-y-2">
            <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
              {language === 'fr' ? 'Objectif' : 'Objective'}
            </h4>
            <p className="text-[13.5px] leading-relaxed text-[var(--color-text-muted)]">
              {ctf.description[language]}
            </p>
          </section>

          {steps.length > 0 && (
            <section className="space-y-3 border-t border-[var(--color-border)] pt-5">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-[var(--color-accent)]" />
                <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                  {language === 'fr' ? 'Étapes prises' : 'Steps taken'}
                </h4>
              </div>
              <ol className="space-y-3">
                {steps.map((step, index) => (
                  <li key={`${step.command}-${index}`} className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/10 font-mono text-[10px] font-bold text-[var(--color-accent)]">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      {step.command && (
                        <code className="block overflow-x-auto rounded-md bg-[var(--color-bg-soft)] px-2.5 py-1.5 font-mono text-[11px] text-[var(--color-text-main)]">
                          {step.command}
                        </code>
                      )}
                      <p className="mt-1.5 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                        {step[language]}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {learned.length > 0 && (
            <section className="space-y-3 border-t border-[var(--color-border)] pt-5">
              <div className="flex items-center gap-2">
                <Book className="h-4 w-4 text-[var(--color-accent)]" />
                <h4 className="text-sm font-semibold text-[var(--color-text-main)]">
                  {language === 'fr' ? 'Ce que j’ai appris' : 'What I learned'}
                </h4>
              </div>
              <ul className="space-y-2">
                {learned.map((item, index) => (
                  <li key={`${item}-${index}`} className="flex gap-2.5 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-accent)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>

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
