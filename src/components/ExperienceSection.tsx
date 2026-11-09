import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Language } from '../types';
import { EXPERIENCE_DATA } from '../data/portfolioData';
import { localizePeriod } from '../data/site';

interface ExperienceSectionProps {
  language: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ language }) => (
  <section id="experience" className="section">
    <div className="section-inner">
      <div className="section-head">
        <span className="section-eyebrow">02 <span aria-hidden="true">/</span> experience</span>
        <h2 className="section-title">{language === 'fr' ? 'Expérience' : 'Experience'}</h2>
      </div>

      <ol className="relative space-y-6 border-l border-[var(--color-border)] pl-6 sm:pl-8">
        {EXPERIENCE_DATA.map((exp) => (
          <li key={exp.company + exp.period} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[31px] top-7 h-3 w-3 rounded-full border-2 border-[var(--color-accent)] bg-[var(--color-bg-main)] ring-4 ring-[var(--color-bg-main)] sm:-left-[39px]"
            />
            <article className="card p-6 sm:p-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-sm font-semibold text-[var(--color-accent)]">{exp.company}</p>
                  <h3 className="mt-1 text-lg font-bold tracking-tight text-[var(--color-text-main)] sm:text-xl">
                    {exp.role[language]}
                  </h3>
                </div>
                <span className="meta shrink-0 sm:pt-1">
                  <Calendar />
                  {localizePeriod(exp.period, language)}
                </span>
              </div>
              <p className="mt-3 flex items-start gap-1.5 text-[13px] leading-snug text-[var(--color-text-subtle)]">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
                <span>{exp.department[language]}</span>
              </p>
              <p className="card-text mt-4 max-w-4xl">{exp.description[language]}</p>
            </article>
          </li>
        ))}
      </ol>
    </div>
  </section>
);
