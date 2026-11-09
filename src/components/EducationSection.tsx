import React from 'react';
import { GraduationCap } from 'lucide-react';
import { Language } from '../types';
import { EDUCATION_DATA } from '../data/portfolioData';
import { localizePeriod } from '../data/site';

interface EducationSectionProps {
  language: Language;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ language }) => (
  <section id="education" className="section">
    <div className="section-inner">
      <div className="section-head">
        <span className="section-eyebrow">06 <span aria-hidden="true">/</span> education</span>
        <h2 className="section-title">{language === 'fr' ? 'Formation' : 'Education'}</h2>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {EDUCATION_DATA.map((edu, idx) => {
          const isCurrent = idx === 0;
          return (
            <article
              key={edu.institution}
              className={`card card-body flex flex-col p-6 ${isCurrent ? 'border-[color-mix(in_srgb,var(--color-accent)_40%,transparent)]' : ''}`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-accent)] text-[var(--color-accent)]">
                  <GraduationCap className="h-5 w-5" />
                </span>
                {isCurrent ? (
                  <span className="tag">{language === 'fr' ? 'En cours' : 'Current'}</span>
                ) : null}
              </div>
              <h3 className="card-title mt-5">{edu.degree[language]}</h3>
              <p className="mt-1 text-sm font-semibold text-[var(--color-accent)]">{edu.institution}</p>
              <p className="card-text mt-2">{edu.specialty[language]}</p>
              <div className="card-footer mt-5">
                <span className="meta">{localizePeriod(edu.period, language)}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);
