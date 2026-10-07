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

        <div className="space-y-6">
          <div className="space-y-4 font-sans text-[13px] leading-relaxed text-[var(--color-text-muted)] text-justify">
            {language === 'fr' ? (
              <>
                <p>
                  Étudiant ingénieur à SUP’PTIC, je privilégie une approche
                  concrète : concevoir des applications, configurer des
                  infrastructures réseau et explorer les systèmes embarqués
                  pour en maîtriser les contraintes et les vulnérabilités.
                </p>

                <p>
                  Cette démarche d’expérimentation me permet d’appréhender les
                  systèmes informatiques dans leur globalité, de la couche
                  matérielle jusqu’à l’application, ce qui me permettra de
                  relever les défis techniques liés à la sécurisation
                  d’environnements complexes.
                </p>

                <p className="pt-4 italic opacity-80">
                  En dehors de la technologie, je passe du temps à jouer aux jeux vidéo, regarder des anime, jouer aux échecs et faire du basketball.
                </p>
              </>
            ) : (
              <>
                <p>
                  Engineering student at SUP’PTIC, I favor a concrete approach:
                  designing applications, configuring network infrastructure,
                  and exploring embedded systems to master their constraints and
                  vulnerabilities.
                </p>

                <p>
                  This experimental approach lets me understand computer systems
                  in their entirety, from the hardware layer up to the
                  application, helping me tackle technical challenges related to
                  securing complex environments.
                </p>

                <p className="pt-4 italic opacity-80">
                  Outside of technology, I enjoy video games, anime, chess, and basketball.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
