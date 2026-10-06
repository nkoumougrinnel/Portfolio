import React, { useState } from 'react';
import { Mail, Github, Linkedin, ArrowUpRight, Copy, Check } from 'lucide-react';
import { Language } from '../types';

interface ContactSectionProps {
  language: Language;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ language }) => {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const emailAddress = "nkoumougrinnel@gmail.com";
  const githubUrl = "https://github.com/nkoumougrinnel";
  const linkedinUrl = "https://cm.linkedin.com/in/nkoumougrinnel";

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(emailAddress);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="contact-section px-5 py-12">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-3">
          <h2 className="text-lg sm:text-xl font-bold text-[var(--color-text-main)] tracking-tight">
            {language === 'fr' ? 'Me Contacter' : 'Get in Touch'}
          </h2>
        </div>

<div className="mb-8">
          <p className="text-xs sm:text-sm text-[var(--color-text-muted)] mt-1 max-w-2xl">
            {language === 'fr'
              ? "Vous souhaitez échanger autour d'un projet, d'une opportunité d'ingénierie ou d'un sujet lié aux systèmes, aux réseaux et à la cybersécurité ? Je suis disponible pour en discuter."
              : 'Do you want to discuss a project, an engineering opportunity, or a topic related to systems, networks, and cybersecurity? I am available to talk.'}
          </p>
        </div>

        {/* 3 Clear, interactive connection cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Email Card */}
          <div className="p-5 sm:p-6 rounded-2xl glass-card hover:border-[var(--color-accent)]/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--color-accent)]/10 transition-all duration-300 ease-out flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-accent)]/40 border border-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-semibold block mb-1">
                Email
              </span>
              <a
                href={`mailto:${emailAddress}`}
                className="text-sm sm:text-base font-bold text-[var(--color-text-main)] hover:text-[var(--color-accent)] transition-colors break-all block"
              >
                {emailAddress}
              </a>
              <p className="text-xs text-[var(--color-text-muted)] mt-1.5 leading-relaxed">
                {language === 'fr'
                  ? 'Pour les échanges professionnels, les opportunités et les collaborations.'
                  : 'For professional exchanges, opportunities, and collaborations.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
              <a
                href={`mailto:${emailAddress}`}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] hover:underline"
              >
                <span>{language === 'fr' ? 'Écrire un mail' : 'Send email'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[var(--color-bg-soft)] hover:bg-[var(--color-bg-accent)] text-[var(--color-text-muted)] hover:text-[var(--color-text-main)] text-[11px] transition-colors"
                title={language === 'fr' ? 'Copier l’adresse' : 'Copy address'}
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[var(--color-success)]" />
                    <span className="text-[var(--color-success)] font-semibold">
                      {language === 'fr' ? 'Copié' : 'Copied'}
                    </span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>{language === 'fr' ? 'Copier' : 'Copy'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* GitHub Card */}
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 sm:p-6 rounded-2xl glass-card hover:border-[var(--color-accent)]/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--color-accent)]/10 transition-all duration-300 ease-out flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-accent)]/40 border border-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors mb-4">
                <Github className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-semibold block mb-1">
                GitHub
              </span>
              <span className="text-sm sm:text-base font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors break-all block">
                github.com/nkoumougrinnel
              </span>
              <p className="text-xs text-[var(--color-text-muted)] mt-1.5 leading-relaxed">
                {language === 'fr'
                  ? 'Projets, expérimentations et code source.'
                  : 'Projects, experiments, and source code.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] group-hover:underline">
                <span>{language === 'fr' ? 'Consulter GitHub' : 'Visit profile'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                @nkoumougrinnel
              </span>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 sm:p-6 rounded-2xl glass-card hover:border-[var(--color-accent)]/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-[var(--color-accent)]/10 transition-all duration-300 ease-out flex flex-col justify-between group sm:col-span-2 lg:col-span-1"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-[var(--color-bg-accent)]/40 border border-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors mb-4">
                <Linkedin className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-wider text-[var(--color-text-muted)] font-semibold block mb-1">
                LinkedIn
              </span>
              <span className="text-sm sm:text-base font-bold text-[var(--color-text-main)] group-hover:text-[var(--color-accent)] transition-colors break-all block">
                cm.linkedin.com/in/nkoumougrinnel
              </span>
<p className="text-xs text-[var(--color-text-muted)] mt-1.5 leading-relaxed">
                {language === 'fr'
                  ? 'Parcours professionnel, activités et actualités.'
                  : 'Professional background, activities, and news.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[var(--color-border)] flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--color-accent)] group-hover:underline">
                <span>{language === 'fr' ? 'Se connecter sur LinkedIn' : 'Connect on LinkedIn'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="text-[11px] font-mono text-[var(--color-text-muted)]">
                in/nkoumougrinnel
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
