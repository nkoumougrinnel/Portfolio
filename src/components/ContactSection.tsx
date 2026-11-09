import React, { useState } from 'react';
import { ArrowUpRight, Copy, Check, Download, MapPin, Send } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { Language } from '../types';
import { CV_URL, CV_FILENAME } from '../data/site';

interface ContactSectionProps {
  language: Language;
}

const EMAIL = 'nkoumougrinnel@gmail.com';

// Libellé court du bouton + objet complet envoyé dans le mail.
const SUBJECTS = [
  { fr: 'Stage', en: 'Internship', subject: { fr: 'Proposition de stage', en: 'Internship opportunity' } },
  { fr: 'Projet', en: 'Project', subject: { fr: 'Projet / collaboration', en: 'Project / collaboration' } },
  { fr: 'Question', en: 'Question', subject: { fr: 'Question', en: 'Question' } },
];

const LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@nkoumougrinnel',
    url: 'https://github.com/nkoumougrinnel',
    slug: 'github',
    color: 'var(--color-text-main)',
    desc: { fr: 'Code source, projets et expérimentations', en: 'Source code, projects and experiments' },
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/nkoumougrinnel',
    url: 'https://cm.linkedin.com/in/nkoumougrinnel',
    slug: 'linkedin',
    color: '#0A66C2',
    desc: { fr: 'Parcours, activités et actualités', en: 'Background, activities and news' },
  },
  {
    id: 'tryhackme',
    label: 'TryHackMe',
    handle: 'nkoumougrinnel',
    url: 'https://tryhackme.com/p/nkoumougrinnel',
    slug: 'tryhackme',
    color: '#EA262A',
    desc: { fr: 'Progression et labs de cybersécurité', en: 'Cybersecurity labs and progress' },
  },
];

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const fr = language === 'fr';
  const [copied, setCopied] = useState(false);
  const [subjectIndex, setSubjectIndex] = useState(0);
  const [message, setMessage] = useState('');
  const mailtoHref = `mailto:${EMAIL}?subject=${encodeURIComponent(`${SUBJECTS[subjectIndex].subject[language]} — via portfolio`)}${
    message.trim() ? `&body=${encodeURIComponent(message.trim())}` : ''
  }`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="section-inner">
        <div className="section-head">
          <span className="section-eyebrow">09 <span aria-hidden="true">/</span> contact</span>
          <h2 className="section-title">{fr ? 'Me contacter' : 'Get in touch'}</h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
          {/* Bloc principal : fenêtre « nouveau message » */}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              window.location.href = mailtoHref;
            }}
            className="contact-hero relative flex flex-col overflow-hidden rounded-[1.25rem]"
          >
            <div className="contact-hero-grid" aria-hidden="true" />

            {/* Barre de titre */}
            <div className="relative flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-5 py-3">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </span>
              <span className="ml-2 font-mono text-[11px] text-[var(--contact-dim)]">
                {fr ? 'nouveau message' : 'new message'}
              </span>
              <span className="ml-auto hidden items-center gap-1.5 font-mono text-[11px] text-[var(--contact-dim)] sm:inline-flex">
                <MapPin className="h-3.5 w-3.5" /> Yaoundé · UTC+1
              </span>
            </div>

            <div className="relative flex flex-1 flex-col p-5 sm:p-7">
              <h3 className="max-w-md text-2xl font-extrabold leading-tight tracking-tight text-white sm:text-[1.75rem]">
                {fr ? 'Un projet, un stage ou une question ?' : 'A project, an internship or a question?'}
              </h3>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-[var(--contact-dim)]">
                {fr
                  ? 'Écrivez-moi directement : je réponds aux échanges autour des systèmes, des réseaux et de la cybersécurité.'
                  : 'Write to me directly: happy to talk systems, networks and cybersecurity.'}
              </p>

              <div className="mt-6 divide-y divide-white/10 rounded-xl border border-white/10 bg-black/20">
                {/* À */}
                <div className="flex items-center gap-2.5 px-3 py-2.5 sm:gap-3 sm:px-4">
                  <span className="hidden w-auto shrink-0 font-mono text-[11px] uppercase tracking-wider text-[var(--contact-dim)] min-[380px]:inline sm:w-12">{fr ? 'À' : 'To'}</span>
                  <span className="min-w-0 flex-1 break-all font-mono text-[11px] text-white min-[380px]:text-[13px] sm:text-sm">{EMAIL}</span>
                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-live="polite"
                    className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2.5 text-[11px] font-semibold text-[var(--contact-dim)] transition-colors hover:bg-white/[0.06] hover:text-white"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    <span className="hidden sm:inline">{copied ? (fr ? 'Copié' : 'Copied') : fr ? 'Copier' : 'Copy'}</span>
                  </button>
                </div>

                {/* Objet */}
                <div className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-3">
                  <span className="w-auto shrink-0 font-mono text-[11px] uppercase tracking-wider text-[var(--contact-dim)] sm:w-12">{fr ? 'Objet' : 'Subject'}</span>
                  <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={fr ? 'Objet du message' : 'Message subject'}>
                    {SUBJECTS.map((subject, i) => (
                      <button
                        key={subject.en}
                        type="button"
                        role="radio"
                        aria-checked={subjectIndex === i}
                        onClick={() => setSubjectIndex(i)}
                        className={`h-7 rounded-full border px-3 text-[12px] font-semibold transition-colors ${
                          subjectIndex === i
                            ? 'border-[var(--contact-accent)] bg-[var(--contact-accent)] text-[#0b1220]'
                            : 'border-white/15 text-[var(--contact-dim)] hover:border-white/35 hover:text-white'
                        }`}
                      >
                        {subject[language]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <label className="block px-4 py-3">
                  <span className="sr-only">{fr ? 'Votre message' : 'Your message'}</span>
                  <textarea
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={3}
                    placeholder={fr ? 'Bonjour Grinnel, …' : 'Hi Grinnel, …'}
                    className="w-full resize-none bg-transparent text-sm leading-relaxed text-white placeholder:text-white/30 focus:outline-none"
                  />
                </label>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
                <button type="submit" className="btn bg-[var(--contact-accent)] text-[#0b1220] hover:-translate-y-px">
                  {fr ? 'Envoyer' : 'Send'}
                  <Send />
                </button>
                <a
                  href={CV_URL}
                  download={CV_FILENAME}
                  className="btn border border-white/15 text-white hover:border-white/35"
                >
                  <Download />
                  {fr ? 'Télécharger le CV' : 'Download resume'}
                </a>
                <span className="text-[11px] text-[var(--contact-dim)] sm:ml-auto">
                  {fr ? 'Ouvre votre messagerie' : 'Opens your mail app'}
                </span>
              </div>
            </div>
          </form>

          {/* Liens */}
          <div className="grid grid-rows-3 gap-4">
            {LINKS.map(({ id, label, handle, url, slug, color, desc }) => (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-interactive group relative flex items-center gap-4 overflow-hidden p-5 sm:p-6"
              >
                <span className="card-watermark-strip" style={{ background: color }} aria-hidden="true" />
                <BrandMark slug={slug} color={color} className="card-watermark !bottom-[-2.5rem] !h-32 !w-32" />
                <span className="relative min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="card-title">{label}</span>
                    <span className="meta truncate">{handle}</span>
                  </span>
                  <span className="card-text mt-0.5 block">{desc[language]}</span>
                </span>
                <ArrowUpRight className="relative h-5 w-5 shrink-0 text-[var(--color-text-subtle)] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--color-accent)]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
