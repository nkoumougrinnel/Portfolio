import React from 'react';
import { Building2, MapPin, Calendar } from 'lucide-react';
import { Language } from '../types';
import { EXPERIENCE_DATA } from '../data/portfolioData';

interface ExperienceSectionProps {
  language: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ language }) => {
  return (
    <section id="experience" className="px-5 py-10">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text-main)] tracking-tight">
            {language === 'fr' ? 'Expérience Professionnelle' : 'Experience'}
          </h2>
        </div>

        {/* Timeline format matching layout */}
        <div className="relative pl-5 sm:pl-6 border-l-2 border-[var(--color-accent)]/40 space-y-8">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div key={idx} className="relative flex flex-col gap-2 group glass-card p-4 sm:p-5 rounded-2xl">
              {/* Timeline marker node */}
              <div className="absolute -left-[43px] sm:-left-[51px] top-5 sm:top-6 w-3.5 h-3.5 rounded-full bg-[var(--color-bg-main)] border-2 border-[var(--color-accent)] shadow-xs group-hover:scale-125 transition-transform"></div>

              {/* Company & Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                <span className="text-sm text-[var(--color-accent)] font-bold flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  {exp.company}
                </span>
                <span className="text-[var(--color-text-muted)] text-[11px] flex items-center gap-1 bg-[var(--color-bg-soft)] px-2.5 py-0.5 rounded-full border border-[var(--color-border-muted)]/30 w-fit">
                  <Calendar className="w-3 h-3 text-[var(--color-accent)]" />
                  {exp.period}
                </span>
              </div>

              {/* Role */}
              <div className="text-sm sm:text-base font-bold text-[var(--color-text-main)]">
                {exp.role[language]}
              </div>

              {/* Department & Location */}
              <div className="text-[11px] text-[var(--color-text-muted)] flex items-center gap-1 leading-snug">
                <MapPin className="w-3 h-3 text-[var(--color-accent)] shrink-0" />
                <span>{exp.department[language]}</span>
              </div>

              {/* Description */}
              <p className="text-[12.5px] sm:text-[13px] leading-relaxed text-[var(--color-text-muted)] mt-1 text-justify">
                {exp.description[language]}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mt-2 font-mono text-[11px]">
                {exp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] border border-[var(--color-accent)]/20 font-medium transition-colors hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-accent)]/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
