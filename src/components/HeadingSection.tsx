import React from 'react';
import { Language } from '../types';

interface HeadingSectionProps {
  language: Language;
}

export const HeadingSection: React.FC<HeadingSectionProps> = ({ language }) => {
  return (
    <section id="heading" className="px-5 py-10">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text-main)] tracking-tight">
              {language === 'fr' ? 'Direction Actuelle' : 'Current Direction'}
            </h2>
          </div>
        </div>

        <div className="rounded-2xl glass-card p-5 sm:p-6">
          <div className="space-y-4 text-[13.5px] leading-relaxed text-[var(--color-text-muted)]">
            {language === 'fr' ? (
              <>
                <p>
                  Je souhaite désormais approfondir la cybersécurité, en
                  particulier la compréhension des vulnérabilités, des réseaux
                  et des systèmes.
                </p>

                <p>
                  La prochaine étape est de transformer cette orientation en
                  expérience concrète : approfondir les fondamentaux,
                  pratiquer dans différents environnements, participer à des
                  labs et des CTF, puis construire mes propres projets de
                  sécurité.
                </p>

                <p>
                  À plus long terme, je souhaite évoluer dans des
                  environnements où logiciel, réseaux, systèmes et sécurité se
                  rencontrent, que ce soit dans l’industrie, la recherche ou
                  une formation d’ingénierie avancée.
                </p>
              </>
            ) : (
              <>
                <p>
                  I now want to deepen my understanding of cybersecurity, with
                  a particular focus on vulnerabilities, networks, and
                  systems.
                </p>

                <p>
                  The next step is to turn this direction into concrete
                  experience: strengthen my fundamentals, practice in
                  different environments, take part in labs and CTFs, and
                  eventually build my own security projects.
                </p>

                <p>
                  In the longer term, I want to work in environments where
                  software, networks, systems, and security intersect, whether
                  in industry, research, or advanced engineering education.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
