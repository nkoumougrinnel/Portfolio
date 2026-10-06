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
                  Je me dirige aujourd'hui vers la cybersécurité avec une priorité particulière donnée à la sécurité des systèmes, des réseaux et des infrastructures.
                </p>
                <p>
                  La prochaine étape est de transformer cette orientation en expérience concrète : approfondir les fondamentaux, multiplier les labs et les CTF, construire des projets de sécurité et développer une meilleure compréhension des mécanismes d'attaque et de défense.
                </p>
                <p>
                  Je veux continuer à m'appuyer sur mes bases en développement, en réseaux et en systèmes pour aller plus loin. La cybersécurité devient mon axe principal, sans pour autant fermer les autres dimensions de l'ingénierie qui font partie de mon parcours.
                </p>
                <p>
                  À plus long terme, je souhaite approfondir cette expertise dans des environnements où logiciel, réseaux, systèmes et sécurité se rencontrent, que ce soit dans l'industrie, la recherche ou une formation d'ingénierie avancée.
                </p>
              </>
            ) : (
              <>
                <p>
                  I'm moving today toward cybersecurity with particular focus on systems, network, and infrastructure security.
                </p>
                <p>
                  The next step is to transform this direction into concrete experience: deepen fundamentals, increase labs and CTFs, build security projects, and develop a better understanding of attack and defense mechanisms.
                </p>
                <p>
                  I want to continue building on my foundations in development, networks, and systems to go further. Cybersecurity becomes my primary focus, without closing off the other dimensions of engineering that are part of my journey.
                </p>
                <p>
                  In the longer term, I want to deepen this expertise in environments where software, networks, systems, and security meet, whether in industry, research, or advanced engineering study.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
