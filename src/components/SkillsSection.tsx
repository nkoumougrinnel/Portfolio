import React, { useState } from 'react';
import { Code, Network, Brain, Shield, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface SkillsSectionProps {
  language: Language;
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ language }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-4 h-4 text-[#2563eb]" />;
      case 'network':
        return <Network className="w-4 h-4 text-[#2563eb]" />;
      case 'brain':
        return <Brain className="w-4 h-4 text-[#2563eb]" />;
      case 'shield':
        return <Shield className="w-4 h-4 text-[#2563eb]" />;
      default:
        return <Code className="w-4 h-4 text-[#2563eb]" />;
    }
  };

  const quickBadges = [
    { label: 'Python', tag: 'PY', active: true },
    { label: 'React', icon: true, active: true },
    { label: 'React Native', icon: true },
    { label: 'TypeScript', tag: 'TS' },
    { label: 'Django', tag: 'DJ', active: true },
    { label: 'FastAPI', icon: true },
    { label: 'RAG & LLMs', icon: true, active: true },
    { label: 'PostgreSQL', icon: true },
    { label: 'Docker', icon: true },
    { label: 'Linux', icon: true },
  ];

  return (
    <section id="skills" className="px-5 py-10 bg-white border-b border-[#e5eeff]/70">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        {/* Header without filters */}
        <div className="flex items-center gap-2 mb-5">
          <span className="font-mono text-lg text-[#2563eb] font-bold">02 /</span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0b1c30] tracking-tight">
            {language === 'fr' ? 'Compétences Techniques' : 'Skills'}
          </h2>
        </div>

        {/* Horizontal Quick Highlights */}
        <div className="mb-6 overflow-x-auto flex items-center gap-2.5 py-1 scrollbar-none">
          {quickBadges.map((badge, idx) => (
            <div
              key={idx}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#c3c6d7]/40 shadow-xs shrink-0 hover:border-[#2563eb]/40 transition-colors"
            >
              {badge.tag && (
                <span className="font-mono text-xs text-[#2563eb] font-bold">
                  {badge.tag}
                </span>
              )}
              <span className="text-[12px] font-semibold text-[#0b1c30]">
                {badge.label}
              </span>
              {badge.active && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </div>
          ))}
        </div>

        {/* Detailed Category Grids (2 columns on medium/large screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SKILL_CATEGORIES.map((category, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-[#f4f7fc]/60 border border-[#c3c6d7]/35 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-blue-50 border border-[#2563eb]/20 flex items-center justify-center">
                      {getIcon(category.iconName)}
                    </div>
                    <h3 className="text-sm font-bold text-[#0b1c30]">
                      {category.title[language]}
                    </h3>
                  </div>
                  <span className="font-mono text-[10px] text-[#565e74] hidden sm:inline">
                    {category.skills.length} {language === 'fr' ? 'modules' : 'items'}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => {
                    const isHighlighted = skill.activeDot;
                    return (
                      <div
                        key={sIdx}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs shadow-xs transition-all hover:scale-102 ${
                          isHighlighted
                            ? 'bg-blue-50/80 border-[#2563eb]/30 text-[#0b1c30]'
                            : 'bg-white border-[#c3c6d7]/40 text-[#0b1c30]'
                        }`}
                      >
                        {skill.tag ? (
                          <span className="font-mono text-[11px] text-[#2563eb] font-bold">
                            {skill.tag}
                          </span>
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#2563eb]/60"></span>
                        )}
                        <span className="font-semibold text-[12px] text-[#0b1c30]">
                          {skill.name}
                        </span>
                        {skill.activeDot && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
