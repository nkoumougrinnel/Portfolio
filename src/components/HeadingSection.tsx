import React from 'react';
import { Compass, ShieldCheck, Cpu, Search, Layers } from 'lucide-react';
import { Language } from '../types';

interface HeadingSectionProps {
  language: Language;
}

export const HeadingSection: React.FC<HeadingSectionProps> = ({ language }) => {
  const steps = [
    {
      num: '01',
      title: language === 'fr' ? 'Exploration & Fondations' : 'Exploration & Foundations',
      desc:
        language === 'fr'
          ? 'Concevoir et déconstruire des systèmes, du logiciel haut niveau aux microcontrôleurs embarqués.'
          : 'Building and breaking systems from software to low-level embedded hardware.',
      icon: <Cpu className="w-4 h-4 text-[#2563eb]" />,
    },
    {
      num: '02',
      title: language === 'fr' ? 'Architecture Système' : 'System Architecture',
      desc:
        language === 'fr'
          ? 'Maîtriser les interactions entre briques, les frontières d’états et la modélisation des flux de données.'
          : 'Mastering component interactions, state boundaries, and holistic data flows.',
      icon: <Layers className="w-4 h-4 text-[#2563eb]" />,
    },
    {
      num: '03',
      title: language === 'fr' ? 'Analyse de Vulnérabilités' : 'Vulnerability & Analysis',
      desc:
        language === 'fr'
          ? 'Identifier là où émergent les failles logiques, les fuites de données et les comportements anormaux.'
          : 'Identifying where weaknesses, leakage, and anomalous behaviors emerge.',
      icon: <Search className="w-4 h-4 text-[#2563eb]" />,
    },
    {
      num: '04',
      title: language === 'fr' ? 'Résilience & Sécurité' : 'Resilience & Security',
      desc:
        language === 'fr'
          ? 'Sécuriser les réseaux, les infrastructures cloud et les applications distribuées de bout en bout.'
          : 'Securing networks, cloud infrastructure, and distributed applications holistically.',
      icon: <ShieldCheck className="w-4 h-4 text-[#2563eb]" />,
    },
  ];

  return (
    <section id="heading" className="px-5 py-10 bg-white border-b border-[#e5eeff]/70">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg text-[#2563eb] font-bold">08 /</span>
            <h2 className="text-lg sm:text-xl font-bold text-[#0b1c30] tracking-tight">
              {language === 'fr' ? 'Où je vais · Vision d’Avenir' : "Where I'm Heading"}
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* Quote Block */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-[#2563eb]/20 shadow-xs flex flex-col gap-2.5">
            <div className="flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-[#2563eb]" />
              <span className="font-mono text-[11px] text-[#2563eb] uppercase font-bold tracking-wider">
                {language === 'fr' ? 'Direction & Perspectives' : 'Direction & Perspectives'}
              </span>
            </div>
            <blockquote className="text-[13px] text-[#0b1c30] leading-relaxed text-justify italic">
              {language === 'fr'
                ? "« Je ne prétends pas être un expert en cybersécurité aujourd'hui. Je suis encore dans une phase d'exploration, de conception et d'apprentissage continu. Ce qui s'affirme avec netteté, c'est mon envie de comprendre les systèmes dans leur globalité — la façon dont ils sont architecturés, la manière dont leurs composants interagissent, les points de fragilité potentiels et les mécanismes pour les immuniser. Mon but est d'arriver au stade où, face à une architecture, je peux en saisir la structure, en repérer les vulnérabilités et concevoir une défense solide et résiliente. »"
                : "“I'm not presenting myself as a cybersecurity expert. I'm still exploring, building, and learning. What is becoming clearer is my interest in understanding systems as a whole — how they are designed, how their components interact, where weaknesses can appear, and how those systems can be protected. I want to reach a point where I can approach a system, understand its architecture, identify its vulnerabilities, and reason about how it can be made more resilient.”"}
            </blockquote>
          </div>

          {/* 4 sequential roadmap steps (2 columns on md/lg) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#c3c6d7]/35 hover:border-[#2563eb]/40 flex items-start gap-3.5 shadow-xs transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-[#2563eb]/20 flex items-center justify-center shrink-0">
                  <span className="font-mono text-xs font-bold text-[#2563eb]">
                    {step.num}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-[#0b1c30] flex items-center gap-2">
                    {step.title}
                  </h4>
                  <p className="text-[12px] sm:text-[12.5px] text-[#565e74] mt-0.5 leading-snug">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Creed pill */}
          <div className="p-3.5 rounded-xl bg-[#f4f7fc] border border-[#2563eb]/25 flex items-center justify-center text-center shadow-xs">
            <p className="font-mono text-xs font-bold text-[#2563eb] tracking-tight">
              {language === 'fr'
                ? 'Concevoir. Comprendre. Apprendre à sécuriser.'
                : 'Building. Understanding. Learning how to secure.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
