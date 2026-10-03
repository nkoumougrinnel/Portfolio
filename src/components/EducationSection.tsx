import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Language } from '../types';
import { EDUCATION_DATA } from '../data/portfolioData';

interface EducationSectionProps {
  language: Language;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ language }) => {
  return (
    <section id="education" className="px-5 py-10">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text-main)] tracking-tight">
            {language === 'fr' ? 'Formation Académique' : 'Education'}
          </h2>
        </div>

        <div className="space-y-3">
          {EDUCATION_DATA.map((edu, idx) => {
            const isCurrent = idx === 0;
            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl glass-card transition-all hover:border-[var(--color-accent)]/40 ${
                  isCurrent
                    ? 'border-[var(--color-accent)]/30 ring-1 ring-[var(--color-accent)]/10'
                    : 'border-[var(--color-border)]'
                }`}
              >
                <div className="flex justify-between items-center text-[var(--color-accent)] text-[11px] mb-1 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[var(--color-accent)]" />
                    {edu.institution}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full ${isCurrent ? 'bg-[var(--color-bg-accent)]/40 text-[var(--color-accent)] font-bold' : 'text-[var(--color-text-muted)]'}`}>
                    {edu.period}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[var(--color-text-main)]">
                  {edu.degree[language]}
                </h3>

                <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
                  {edu.specialty[language]}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
