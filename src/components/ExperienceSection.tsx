import React from 'react';
import { Briefcase, Building2, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { EXPERIENCE_DATA } from '../data/portfolioData';

interface ExperienceSectionProps {
  language: Language;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ language }) => {
  return (
    <section id="experience" className="px-5 py-10 bg-white border-b border-[#e5eeff]/70">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-6">
          <span className="font-mono text-lg text-[#2563eb] font-bold">04 /</span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0b1c30] tracking-tight">
            {language === 'fr' ? 'Expérience Professionnelle' : 'Experience'}
          </h2>
        </div>

        {/* Timeline format matching layout */}
        <div className="relative pl-5 sm:pl-6 border-l-2 border-[#2563eb]/40 space-y-8">
          {EXPERIENCE_DATA.map((exp, idx) => (
            <div key={idx} className="relative flex flex-col gap-2 group">
              {/* Timeline marker node */}
              <div className="absolute -left-[27px] sm:-left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-white border-2 border-[#2563eb] shadow-xs group-hover:scale-125 transition-transform"></div>

              {/* Company & Date */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 font-mono text-xs">
                <span className="text-[#2563eb] font-bold uppercase tracking-wide flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  {exp.company}
                </span>
                <span className="text-[#565e74] text-[11px] flex items-center gap-1 bg-[#f4f7fc] px-2.5 py-0.5 rounded-full border border-[#c3c6d7]/30 w-fit">
                  <Calendar className="w-3 h-3 text-[#2563eb]" />
                  {exp.period}
                </span>
              </div>

              {/* Role */}
              <div className="text-sm sm:text-base font-bold text-[#0b1c30]">
                {exp.role[language]}
              </div>

              {/* Department & Location */}
              <div className="font-mono text-[11px] text-[#565e74] flex items-center gap-1 leading-snug">
                <MapPin className="w-3 h-3 text-[#2563eb] shrink-0" />
                <span>{exp.department[language]}</span>
              </div>

              {/* Description */}
              <p className="text-[12.5px] sm:text-[13px] leading-relaxed text-[#565e74] mt-1 text-justify">
                {exp.description[language]}
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-1.5 mt-2 font-mono text-[11px]">
                {exp.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-2.5 py-0.5 rounded-full bg-[#f4f7fc] text-[#565e74] border border-[#c3c6d7]/40 font-medium"
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
