import React from 'react';
import { GraduationCap, Calendar, Award } from 'lucide-react';
import { Language } from '../types';
import { EDUCATION_DATA } from '../data/portfolioData';

interface EducationSectionProps {
  language: Language;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ language }) => {
  return (
    <section id="education" className="px-5 py-10 bg-[#f4f7fc]/40 border-b border-[#e5eeff]/70">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-lg text-[#2563eb] font-bold">05 /</span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0b1c30] tracking-tight">
            {language === 'fr' ? 'Formation Académique' : 'Education'}
          </h2>
        </div>

        <div className="space-y-3">
          {EDUCATION_DATA.map((edu, idx) => {
            const isCurrent = idx === 0;
            return (
              <div
                key={idx}
                className={`p-4 sm:p-5 rounded-2xl bg-white border shadow-xs transition-all hover:border-[#2563eb]/40 ${
                  isCurrent
                    ? 'border-[#2563eb]/30 ring-1 ring-[#2563eb]/10'
                    : 'border-[#e5eeff]'
                }`}
              >
                <div className="flex justify-between items-center text-[#2563eb] font-mono text-[11px] mb-1 font-semibold">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-[#2563eb]" />
                    {edu.institution}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full ${isCurrent ? 'bg-blue-50 text-[#2563eb] font-bold' : 'text-[#565e74]'}`}>
                    {edu.period}
                  </span>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-[#0b1c30]">
                  {edu.degree[language]}
                </h3>

                <p className="text-xs text-[#565e74] mt-0.5">
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
