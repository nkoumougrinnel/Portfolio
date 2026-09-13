import React from 'react';
import { Target, Compass } from 'lucide-react';
import { Language } from '../types';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  const hobbies = [
    {
      name: language === 'fr' ? 'Échecs' : 'Chess',
      desc: language === 'fr' ? 'Tactique & Sang-froid' : 'Tactics & Calm',
    },
    {
      name: language === 'fr' ? 'Basketball' : 'Basketball',
      desc: language === 'fr' ? 'Collectif & Rythme' : 'Team Spirit',
    },
    {
      name: language === 'fr' ? 'Jeux Vidéo' : 'Video Games',
      desc: language === 'fr' ? 'Systèmes & Logique' : 'Systems & Logic',
    },
    {
      name: language === 'fr' ? 'Anime & Mangas' : 'Anime',
      desc: language === 'fr' ? 'Art & Worldbuilding' : 'Art & Worldbuilding',
    },
  ];

  return (
    <section id="about" className="px-5 py-10 bg-[#f4f7fc]/50 border-b border-[#e5eeff]/70">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-lg text-[#2563eb] font-bold">01 /</span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0b1c30] tracking-tight">
            {language === 'fr' ? 'À propos de moi' : 'About Me'}
          </h2>
        </div>

        {/* Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1 border-b border-[#e5eeff]/80">
            <span className="font-mono text-[11px] text-[#2563eb] tracking-widest uppercase font-bold">
              {language === 'fr' ? 'PHILOSOPHIE & PARCOURS' : 'PHILOSOPHY & BACKGROUND'}
            </span>
          </div>

          <div className="space-y-3 font-sans text-[13px] leading-relaxed text-[#565e74] text-justify">
            {language === 'fr' ? (
              <>
                <p>
                  J'ai toujours été passionné par l'informatique — pas seulement pour consommer des outils, mais pour décortiquer précisément ce qui se passe sous le capot. J'évolue à la croisée de plusieurs domaines technologiques :{' '}
                  <strong className="text-[#0b1c30] font-semibold">
                    le développement logiciel, les réseaux, l'intelligence artificielle, les systèmes embarqués et la cybersécurité
                  </strong>
                  . Je refuse de m'enfermer dans une unique pile technique.
                </p>
                <p>
                  Ce qui m'anime, c'est de saisir comment les différentes briques d'un système complexe dialoguent et s'articulent. Ma démarche s'est forgée lors de mon stage chez{' '}
                  <strong className="text-[#0b1c30] font-semibold">CAMTEL</strong>, où j'ai approfondi l'importance de{' '}
                  <span className="text-[#2563eb] font-medium">l'architecture logicielle, des flux de données et de la logique métier</span>{' '}
                  avant d'écrire la moindre ligne de code.
                </p>
                <p>
                  J'aborde chaque défi avec une vision systémique globale — en exploitant la documentation, des expérimentations itératives et les outils d'IA — pour ensuite plonger dans le code et les tests pratiques. Curieux, autonome et prêt à assumer une responsabilité de bout en bout.
                </p>
              </>
            ) : (
              <>
                <p>
                  I've always been interested in computers — not just using them, but understanding what happens underneath. I move across several areas of technology:{' '}
                  <strong className="text-[#0b1c30] font-semibold">
                    software development, networks, artificial intelligence, embedded systems, and cybersecurity
                  </strong>
                  . I don't want to be defined by a single stack or a single technology.
                </p>
                <p>
                  What drives me is understanding how different parts of a complex system connect and interact. My way of building has matured: earlier, I mainly wanted to make an idea work quickly. During my internship at{' '}
                  <strong className="text-[#0b1c30] font-semibold">CAMTEL</strong>, I began rigorously focusing on{' '}
                  <span className="text-[#2563eb] font-medium">architecture, data flow, business logic</span>, and how each component integrates before writing code.
                </p>
                <p>
                  I usually start with the big picture — leveraging documentation, rapid experimentation, and AI tools — then go deeper by building and testing things myself. Curious, autonomous, and comfortable taking end-to-end ownership when a project demands it.
                </p>
              </>
            )}
          </div>

          {/* Pillars Highlights */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            <div className="p-3 rounded-xl bg-[#f4f7fc]/70 border border-[#c3c6d7]/30 flex flex-col gap-1">
              <div className="flex items-center gap-1 text-[#2563eb]">
                <Target className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
                  {language === 'fr' ? 'Esprit Clé' : 'Core Mindset'}
                </span>
              </div>
              <span className="text-[12px] font-semibold text-[#0b1c30]">
                {language === 'fr' ? 'Systémique & Autonome' : 'Systemic & Autonomous'}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-[#f4f7fc]/70 border border-[#c3c6d7]/30 flex flex-col gap-1">
              <div className="flex items-center gap-1 text-[#2563eb]">
                <Compass className="w-3.5 h-3.5" />
                <span className="font-mono text-[10px] uppercase font-bold tracking-wider">
                  {language === 'fr' ? 'Méthode' : 'Approach'}
                </span>
              </div>
              <span className="text-[12px] font-semibold text-[#0b1c30]">
                {language === 'fr' ? 'Vision Globale → Pratique' : 'Big Picture → Deep Hands-on'}
              </span>
            </div>
          </div>

          {/* Beyond the Code */}
          <div className="pt-3 border-t border-[#e5eeff]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="font-mono text-[11px] text-[#2563eb] font-bold uppercase tracking-wider">
                {language === 'fr' ? 'Au-delà du code' : 'Beyond the Code'}
              </span>
              <span className="font-mono text-[10px] text-[#565e74]">
                {language === 'fr' ? 'Équilibre & Intérêts' : 'Interests & Balance'}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {hobbies.map((hobby, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-[#f4f7fc]/80 border border-[#c3c6d7]/35 flex flex-col justify-center hover:border-[#2563eb]/40 hover:bg-blue-50/30 transition-all shadow-2xs"
                >
                  <p className="text-xs font-bold text-[#0b1c30] truncate">{hobby.name}</p>
                  <span className="text-[10.5px] text-[#565e74] font-mono block truncate mt-0.5">
                    {hobby.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
