import React from 'react';
import { Language } from '../types';

interface AboutSectionProps {
  language: Language;
}

const COPY = {
  fr: [
    'Je suis élève ingénieur en télécommunications à SUP’PTIC, spécialité Informatique & Réseaux. Avant ça, j’ai fait des mathématiques à l’Université de Yaoundé I — c’est de là que me vient l’envie de comprendre comment les choses fonctionnent vraiment, pas seulement comment s’en servir.',
    'Aujourd’hui, je construis : des applications web et mobiles, des API, des prototypes embarqués sur Arduino ou ESP32, et des projets montés en temps limité lors de hackathons. Mon stage chez CAMTEL m’a fait passer de l’exercice au réel, avec CarburFlow, une plateforme pensée pour des données de sites télécoms en exploitation.',
    'Le fil conducteur, c’est la sécurité. Plus je comprends comment un système est construit, du capteur jusqu’à l’application, mieux je vois où il peut céder. C’est ce que je creuse aujourd’hui, entre mes labs, TryHackMe et Hack The Box.',
  ],
  en: [
    'I’m a telecommunications engineering student at SUP’PTIC, majoring in Computer Science & Networks. Before that, I studied mathematics at the University of Yaoundé I — which is where my urge to understand how things really work, not just how to use them, comes from.',
    'Today, I build: web and mobile apps, APIs, embedded prototypes on Arduino or ESP32, and projects shipped against the clock at hackathons. My internship at CAMTEL took me from exercises to the real thing with CarburFlow, a platform designed around data from live telecom sites.',
    'The common thread is security. The better I understand how a system is built, from the sensor up to the application, the better I see where it can break. That’s what I’m digging into now, between my own labs, TryHackMe and Hack The Box.',
  ],
};

const INFO = [
  { k: { fr: 'Formation', en: 'Education' }, v: { fr: 'SUP’PTIC · 3e année', en: 'SUP’PTIC · 3rd year' } },
  { k: { fr: 'Spécialité', en: 'Major' }, v: { fr: 'Informatique & Réseaux', en: 'Computer Science & Networks' } },
  { k: { fr: 'Basé à', en: 'Based in' }, v: { fr: 'Yaoundé, Cameroun', en: 'Yaoundé, Cameroon' } },
  { k: { fr: 'Langues', en: 'Languages' }, v: { fr: 'Français · Anglais (B1)', en: 'French · English (B1)' } },
  { k: { fr: 'Hors écran', en: 'Off screen' }, v: { fr: 'Échecs · Basket · Jeux vidéo · Anime', en: 'Chess · Basketball · Video games · Anime' } },
];

export const AboutSection: React.FC<AboutSectionProps> = ({ language }) => (
  <section id="about" className="section about-section">
    <div className="section-inner">
      <div className="section-head">
        <span className="section-eyebrow">01 <span aria-hidden="true">/</span> about</span>
        <h2 className="section-title">{language === 'fr' ? 'À propos' : 'About'}</h2>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-16">
        <div className="max-w-2xl space-y-5 text-[15px] leading-[1.8] text-[var(--color-text-muted)] sm:text-base">
          {COPY[language].map((paragraph) => (
            <p key={paragraph.slice(0, 20)}>{paragraph}</p>
          ))}
        </div>

        <dl className="card self-start px-6 py-3">
          {INFO.map((row) => (
            <div key={row.k.en} className="info-row">
              <dt>{row.k[language]}</dt>
              <dd>{row.v[language]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
);
