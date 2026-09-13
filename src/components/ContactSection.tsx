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
    <section id="contact" className="px-5 py-12 bg-white">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-lg text-[#2563eb] font-bold">10 /</span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0b1c30] tracking-tight">
            {language === 'fr' ? 'Me Contacter' : 'Get in Touch'}
          </h2>
        </div>

        <div className="mb-8">
          <p className="text-base sm:text-lg font-bold text-[#0b1c30]">
            {language === 'fr' ? 'Échangeons directement.' : "Let's connect directly."}
          </p>
          <p className="text-xs sm:text-sm text-[#565e74] mt-1 max-w-2xl">
            {language === 'fr'
              ? 'Disponible pour discuter d’opportunités d’ingénierie logicielle, de télécommunications, de projets IoT et de collaborations en cybersécurité.'
              : 'Available to discuss software engineering opportunities, telecom architectures, IoT systems, and cybersecurity collaborations.'}
          </p>
        </div>

        {/* 3 Clear, interactive connection cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Email Card */}
          <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#c3c6d7]/40 hover:border-[#2563eb]/60 hover:bg-blue-50/20 transition-all flex flex-col justify-between shadow-xs group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-[#2563eb]/20 flex items-center justify-center text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-colors mb-4">
                <Mail className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#565e74] font-semibold block mb-1">
                Email
              </span>
              <a
                href={`mailto:${emailAddress}`}
                className="text-sm sm:text-base font-bold text-[#0b1c30] hover:text-[#2563eb] transition-colors break-all block"
              >
                {emailAddress}
              </a>
              <p className="text-xs text-[#565e74] mt-1.5 leading-relaxed">
                {language === 'fr'
                  ? 'Pour tout échange professionnel, proposition de poste ou collaboration.'
                  : 'For professional inquiries, roles, or project proposals.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#e5eeff] flex items-center justify-between gap-2">
              <a
                href={`mailto:${emailAddress}`}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2563eb] hover:underline"
              >
                <span>{language === 'fr' ? 'Écrire un mail' : 'Send email'}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f4f7fc] hover:bg-[#e5eeff] text-[#565e74] hover:text-[#0b1c30] text-[11px] font-mono transition-colors"
                title={language === 'fr' ? 'Copier l’adresse' : 'Copy address'}
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600 font-semibold">
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
            className="p-5 sm:p-6 rounded-2xl bg-white border border-[#c3c6d7]/40 hover:border-[#2563eb]/60 hover:bg-blue-50/20 transition-all flex flex-col justify-between shadow-xs group"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-[#2563eb]/20 flex items-center justify-center text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-colors mb-4">
                <Github className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#565e74] font-semibold block mb-1">
                GitHub
              </span>
              <span className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#2563eb] transition-colors break-all block">
                github.com/nkoumougrinnel
              </span>
              <p className="text-xs text-[#565e74] mt-1.5 leading-relaxed">
                {language === 'fr'
                  ? 'Code source des projets, dépôts publics, architectures et contributions open source.'
                  : 'Source code, public repositories, system architectures, and open source contributions.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#e5eeff] flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2563eb] group-hover:underline">
                <span>{language === 'fr' ? 'Consulter GitHub' : 'Visit profile'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="text-[11px] font-mono text-[#565e74]">
                @nkoumougrinnel
              </span>
            </div>
          </a>

          {/* LinkedIn Card */}
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 sm:p-6 rounded-2xl bg-white border border-[#c3c6d7]/40 hover:border-[#2563eb]/60 hover:bg-blue-50/20 transition-all flex flex-col justify-between shadow-xs group sm:col-span-2 lg:col-span-1"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-50 border border-[#2563eb]/20 flex items-center justify-center text-[#2563eb] group-hover:bg-[#2563eb] group-hover:text-white transition-colors mb-4">
                <Linkedin className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#565e74] font-semibold block mb-1">
                LinkedIn
              </span>
              <span className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#2563eb] transition-colors break-all block">
                cm.linkedin.com/in/nkoumougrinnel
              </span>
              <p className="text-xs text-[#565e74] mt-1.5 leading-relaxed">
                {language === 'fr'
                  ? 'Réseau professionnel, parcours d’ingénieur, publications et actualités technologiques.'
                  : 'Professional network, engineering trajectory, publications, and technical posts.'}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-[#e5eeff] flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-[#2563eb] group-hover:underline">
                <span>{language === 'fr' ? 'Se connecter sur LinkedIn' : 'Connect on LinkedIn'}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
              <span className="text-[11px] font-mono text-[#565e74]">
                in/nkoumougrinnel
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
