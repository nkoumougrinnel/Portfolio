import React from 'react';
import { Download, Eye } from 'lucide-react';
import { Language } from '../types';

interface ResourcesSectionProps {
  language: Language;
  onOpenCvModal: () => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  language,
  onOpenCvModal,
}) => {
  return (
    <section id="resources" className="px-5 py-10">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text-main)] tracking-tight">
            {language === 'fr' ? 'Ressources & Documents' : 'Resources'}
          </h2>
        </div>

        <div className="space-y-3">
          {/* CV Download & Interactive View */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card flex items-center justify-between gap-3 hover:border-[var(--color-accent)]/40 transition-all">
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-main)] truncate">
                Curriculum Vitae (CV)
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-snug">
                {language === 'fr'
                  ? 'Parcours académique, compétences et expériences détaillées.'
                  : 'Detailed professional background and academic record.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenCvModal}
                className="px-3.5 py-2 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-98"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{language === 'fr' ? 'Consulter' : 'View'}</span>
              </button>
            </div>
          </div>

          {/* Portfolio PDF Download */}
          <div className="p-4 sm:p-5 rounded-2xl glass-card flex items-center justify-between gap-3 hover:border-[var(--color-accent)]/40 transition-all">
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-main)] truncate">
                {language === 'fr' ? 'Version Imprimable / PDF' : 'Portfolio PDF Document'}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-snug">
                {language === 'fr'
                  ? 'Format condensé pour impression ou archivage hors-ligne.'
                  : 'A condensed, printable version of this interactive portfolio.'}
              </p>
            </div>

            <button
              onClick={onOpenCvModal}
              className="px-3.5 py-2 rounded-xl bg-[var(--color-bg-soft)] border border-[var(--color-border-muted)]/40 hover:bg-[var(--color-bg-accent)] text-[var(--color-text-main)] hover:text-[var(--color-accent)] text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs shrink-0 active:scale-98"
            >
              <Download className="w-3.5 h-3.5 text-[var(--color-accent)]" />
              <span>
                {language === 'fr' ? 'Télécharger' : 'Download'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
