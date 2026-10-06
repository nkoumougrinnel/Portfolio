import React from 'react';
import { Language } from '../types';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  return (
    <section
      id="about"
      className="about-section px-5 py-10"
    >
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text-main)] tracking-tight">
            {language === 'fr' ? 'À propos de moi' : 'About Me'}
          </h2>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl glass-card">
          <div className="pb-3 mb-4 border-b border-[var(--color-border)]/80">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[var(--color-accent)]">
              {language === 'fr' ? 'À PROPOS' : 'ABOUT'}
            </span>
          </div>

<div className="space-y-4 font-sans text-[13px] leading-relaxed text-[var(--color-text-muted)] text-justify">
            {language === 'fr' ? (
              <>
                <p>
                  Je me suis construit en passant par plusieurs facettes de l'ingénierie informatique : le développement logiciel, les réseaux, les systèmes embarqués et l'intelligence artificielle. Ce qui les relie, ce n'est pas seulement la technologie, mais l'envie de comprendre ce qu'il y a derrière un système et de voir jusqu'où il peut aller.
                </p>
                <p>
                  Je préfère apprendre en construisant. Je pars d'un problème, je cherche à comprendre ce qui se passe sous le capot, puis je transforme cette compréhension en quelque chose de concret. Au fil de mes projets, cette approche m'a amené à regarder les systèmes autrement : comment ils communiquent, où ils dépendent les uns des autres, ce qui peut mal fonctionner et, surtout, ce qui pourrait être fait pour les rendre plus fiables et plus sûrs.
                </p>
                <p>
                  C'est ce qui marque aujourd'hui un changement de direction dans mon parcours. Après avoir consacré beaucoup de temps à construire des systèmes, je veux désormais consacrer la même rigueur à leur sécurité. Je développe mes bases en cybersécurité et je me dirige vers une compréhension plus profonde de la sécurité des systèmes, des réseaux et des infrastructures.
                </p>
                <p>
                  Je ne considère pas ce parcours comme terminé. Mon objectif est de continuer à apprendre par la pratique, d'explorer différents environnements techniques et de confronter mes connaissances à des problèmes réels.
                </p>
              </>
            ) : (
              <>
                <p>
                  I've built myself through several facets of computer engineering: software development, networks, embedded systems, and artificial intelligence. What connects them is not just the technology, but the desire to understand what's behind a system and how far it can go.
                </p>
                <p>
                  I prefer to learn by building. I start with a problem, seek to understand what's happening beneath the surface, then transform that understanding into something concrete. Through my projects, this approach has taught me to look at systems differently: how they communicate, where they depend on each other, what can go wrong, and most importantly, what could be done to make them more reliable and secure.
                </p>
                <p>
                  This marks a shift in direction in my journey today. After spending considerable time building systems, I want to now apply the same rigor to their security. I'm developing my foundations in cybersecurity and moving toward a deeper understanding of systems, network, and infrastructure security.
                </p>
                <p>
                  I don't consider this journey complete. My goal is to continue learning through practice, exploring different technical environments, and confronting my knowledge with real problems.
                </p>
              </>
            )}
          </div>

          <div className="pt-5 mt-5 border-t border-[var(--color-border)]">
            <div className="mb-3">
              <span className="text-[11px] text-[var(--color-accent)] font-bold uppercase tracking-wider">
                {language === 'fr' ? 'Au-delà du code' : 'Beyond the Code'}
              </span>
            </div>
            <p className="text-[13px] leading-relaxed text-[var(--color-text-muted)]">
              {language === 'fr'
                ? 'En dehors de la technologie, je passe du temps à jouer aux jeux vidéo, regarder des anime, jouer aux échecs et faire du basketball.'
                : 'Outside of technology, I enjoy video games, anime, chess, and basketball.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
