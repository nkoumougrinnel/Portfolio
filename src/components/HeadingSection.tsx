import React from 'react';
import { Language } from '../types';

interface HeadingSectionProps {
  language: Language;
}

export const HeadingSection: React.FC<HeadingSectionProps> = ({ language }) => {
  return (
    <section id="heading" className="px-5 py-10 bg-white border-b border-[#e5eeff]/70">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-[#0b1c30] tracking-tight">
              {language === 'fr' ? 'Où je vais' : "Where I'm Heading"}
            </h2>
          </div>
        </div>

        <div className="rounded-2xl border border-[#e5eeff] bg-white p-5 shadow-xs sm:p-6">
          <div className="space-y-4 text-[13.5px] leading-relaxed text-[#565e74]">
            {language === 'fr' ? (
              <>
                <p>
                  Je m’intéresse de plus en plus à la cybersécurité, notamment à la protection des systèmes, des réseaux et des infrastructures. Les environnements télécoms m’intéressent particulièrement, car ils reposent sur de nombreux systèmes et moyens de communication qui doivent fonctionner de manière fiable et sécurisée.
                </p>
                <p>
                  Je suis encore en phase d’apprentissage dans ce domaine, mais j’ai envie d’aller plus loin et de mieux comprendre comment un système peut être compromis, quelles faiblesses peuvent être exploitées et comment les prévenir.
                </p>
                <p>
                  Mon objectif est de développer progressivement une compréhension solide de la sécurité des systèmes et des infrastructures, en m’appuyant sur mes bases en développement, en réseaux et en systèmes embarqués.
                </p>
              </>
            ) : (
              <>
                <p>
                  I’m becoming increasingly interested in cybersecurity, particularly in protecting systems, networks, and infrastructure. Telecommunications environments especially interest me because they rely on many systems and communication channels that need to operate reliably and securely.
                </p>
                <p>
                  I’m still learning in this field, but I want to go further and better understand how systems can be compromised, which weaknesses can be exploited, and how they can be prevented.
                </p>
                <p>
                  My goal is to progressively build a solid understanding of systems and infrastructure security, drawing on my foundations in software development, networking, and embedded systems.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
