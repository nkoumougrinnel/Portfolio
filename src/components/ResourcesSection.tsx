import React from 'react';
import { Download, Eye, Github, Linkedin } from 'lucide-react';
import { Language } from '../types';

interface ResourcesSectionProps {
  language: Language;
  onOpenCvModal: () => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  language,
  onOpenCvModal,
}) => {
  const githubUrl = "https://github.com/nkoumougrinnel";
  const linkedinUrl = "https://cm.linkedin.com/in/nkoumougrinnel";

  return (
    <section id="resources" className="px-5 py-10">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text-main)] tracking-tight">
            {language === 'fr' ? 'Ressources' : 'Resources'}
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
                  ? 'Mon parcours académique, mes compétences, mes expériences et mes projets en un seul document.'
                  : 'My academic background, skills, experiences, and projects in one document.'}
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
                {language === 'fr' ? 'Portfolio' : 'Portfolio'}
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-snug">
                {language === 'fr'
                  ? 'Une version complète de mon parcours et de mes travaux, avec davantage de contexte sur les projets réalisés.'
                  : 'A complete version of my background and work, with more context on the projects completed.'}
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

          {/* GitHub */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 rounded-2xl glass-card flex items-center justify-between gap-3 hover:border-[var(--color-accent)]/40 transition-all"
          >
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-main)] truncate">
                GitHub
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-snug">
                {language === 'fr'
                  ? 'Mes dépôts, expérimentations et projets open source.'
                  : 'My repositories, experiments, and open source projects.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)]">
                <span>{language === 'fr' ? 'Consulter' : 'Visit'}</span>
                <Github className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 sm:p-5 rounded-2xl glass-card flex items-center justify-between gap-3 hover:border-[var(--color-accent)]/40 transition-all"
          >
            <div className="min-w-0">
              <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-main)] truncate">
                LinkedIn
              </h3>
              <p className="text-xs text-[var(--color-text-muted)] mt-0.5 leading-snug">
                {language === 'fr'
                  ? 'Mon parcours professionnel, mes activités et les projets sur lesquels je travaille.'
                  : 'My professional background, activities, and the projects I work on.'}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)]">
                <span>{language === 'fr' ? 'Consulter' : 'Visit'}</span>
                <Linkedin className="w-3.5 h-3.5" />
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
