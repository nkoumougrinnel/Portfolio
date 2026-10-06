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
                  Je suis étudiant ingénieur en Informatique et Réseaux à
                  SUP’PTIC, avec une approche très orientée pratique. Je
                  construis des applications, travaille avec les réseaux et
                  explore les systèmes embarqués pour mieux comprendre leur
                  fonctionnement et leurs contraintes.
                </p>

                <p>
                  J’apprends principalement en expérimentant : partir d’un
                  problème, construire, tester, chercher ce qui ne fonctionne
                  pas et approfondir jusqu’à comprendre le système. Cette
                  manière de travailler m’a permis d’explorer plusieurs
                  domaines tout en développant une vision plus globale des
                  systèmes informatiques.
                </p>
              </>
            ) : (
              <>
                <p>
                  I’m an engineering student in Computer Science and Networks
                  at SUP’PTIC, with a strongly hands-on approach. I build
                  applications, work with networks, and explore embedded
                  systems to better understand how they work and the
                  constraints they involve.
                </p>

                <p>
                  I mainly learn by experimenting: starting with a problem,
                  building, testing, investigating what does not work, and
                  digging deeper until I understand the system. This approach
                  has allowed me to explore different areas while developing a
                  broader understanding of computer systems.
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
