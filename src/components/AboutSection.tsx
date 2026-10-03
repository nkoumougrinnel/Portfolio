import React from 'react';
import { Language } from '../types';

interface AboutSectionProps {
  language: Language;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => {
  return (
    <section
      id="about"
      className="px-5 py-10"
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
                  J’ai toujours été intéressé par l’informatique, surtout par ce qui se passe derrière les outils que l’on utilise. J’aime comprendre comment les différentes technologies fonctionnent et essayer de les mettre en pratique à travers mes projets.
                </p>
                <p>
                  Je me suis intéressé au développement logiciel, aux réseaux et aux systèmes embarqués, avec l’envie de ne pas rester limité à un seul domaine. Ces expériences m’ont aussi amené à m’intéresser davantage à la manière dont les systèmes sont conçus, communiquent entre eux et peuvent être protégés.
                </p>
                <p>
                  J’apprends surtout en faisant. Quand je rencontre un sujet que je ne connais pas, je commence par chercher à comprendre les bases, puis je passe rapidement à la pratique. C’est cette façon d’apprendre qui me pousse aujourd’hui à continuer d’explorer différents domaines de l’informatique.
                </p>
              </>
            ) : (
              <>
                <p>
                  I’ve always been interested in computing, especially what happens behind the tools we use. I like understanding how different technologies work and putting that knowledge into practice through my projects.
                </p>
                <p>
                  I’ve explored software development, networks, and embedded systems, with the goal of not limiting myself to a single area. These experiences have also made me more interested in how systems are designed, communicate with one another, and can be protected.
                </p>
                <p>
                  I learn best by doing. When I encounter an unfamiliar subject, I first work to understand the fundamentals, then move quickly into practice. This way of learning keeps me exploring different areas of computing.
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
