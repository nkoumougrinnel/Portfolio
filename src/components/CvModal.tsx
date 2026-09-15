import React, { useEffect, useRef } from 'react';
import { X, Download, Phone, Mail, Github, Globe, Linkedin, ArrowUpRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Language } from '../types';

/** Largeur desktop du CV (équivalent max-w-4xl) — utilisée pour l'export PDF sur tous les écrans */
const PDF_LAYOUT_WIDTH_PX = 896;

function sanitizeCssForCanvas(clonedDocument: Document) {
  const root = clonedDocument.documentElement;

  const cleanCSS = (css: string) =>
    css
      .replace(/oklab\([^)]*\)/g, '#0b1c30')
      .replace(/oklch\([^)]*\)/g, '#0b1c30')
      .replace(/color-mix\([^)]*\)/g, '#0b1c30');

  clonedDocument.querySelectorAll('style').forEach((tag) => {
    if (tag.textContent) {
      tag.textContent = cleanCSS(tag.textContent);
    }
  });

  const allElements = [root, ...Array.from(clonedDocument.querySelectorAll('*'))];
  allElements.forEach((el) => {
    if (!(el instanceof HTMLElement)) return;

    if (el.getAttribute('style')) {
      el.setAttribute('style', cleanCSS(el.getAttribute('style')!));
    }

    const computed = window.getComputedStyle(el);
    ['color', 'backgroundColor', 'borderColor', 'boxShadow', 'textShadow'].forEach((prop) => {
      const val = computed.getPropertyValue(prop);
      if (val && (val.includes('oklab') || val.includes('oklch') || val.includes('color-mix'))) {
        el.style.setProperty(prop, prop === 'color' ? '#0b1c30' : '#ffffff', 'important');
      }
    });
  });
}

/** Force la mise en page 2 colonnes desktop, indépendamment du viewport (preview mobile incluse) */
function applyDesktopPdfLayout(clonedDocument: Document) {
  const cvDoc = clonedDocument.querySelector('[data-cv-document]');
  if (!(cvDoc instanceof HTMLElement)) return;

  cvDoc.style.setProperty('width', `${PDF_LAYOUT_WIDTH_PX}px`, 'important');
  cvDoc.style.setProperty('overflow', 'visible', 'important');
  cvDoc.style.setProperty('height', 'auto', 'important');
  cvDoc.style.setProperty('max-height', 'none', 'important');

  const layout = cvDoc.firstElementChild;
  if (layout instanceof HTMLElement) {
    layout.style.setProperty('display', 'flex', 'important');
    layout.style.setProperty('flex-direction', 'row', 'important');
  }

  const aside = cvDoc.querySelector('aside');
  if (aside instanceof HTMLElement) {
    aside.style.setProperty('width', '30%', 'important');
    aside.style.setProperty('flex-shrink', '0', 'important');
    aside.style.setProperty('border-bottom', 'none', 'important');
    aside.style.setProperty('border-right', '1px solid #e5eeff', 'important');
    aside.style.setProperty('padding', '1.5rem', 'important');
  }

  const main = cvDoc.querySelector('main');
  if (main instanceof HTMLElement) {
    main.style.setProperty('width', '70%', 'important');
    main.style.setProperty('flex', '1 1 0%', 'important');
    main.style.setProperty('padding', '2rem', 'important');
  }

  cvDoc.querySelectorAll('div.flex.flex-col.justify-between').forEach((el) => {
    if (el instanceof HTMLElement) {
      el.style.setProperty('flex-direction', 'row', 'important');
      el.style.setProperty('align-items', 'baseline', 'important');
    }
  });

  const title = cvDoc.querySelector('h1');
  if (title instanceof HTMLElement) {
    title.style.setProperty('font-size', '1.5rem', 'important');
  }
}

interface CvModalProps {
  isOpen: boolean;
  language: Language;
  onClose: () => void;
  avatarUrl: string;
}

export const CvModal: React.FC<CvModalProps> = ({
  isOpen,
  language,
  onClose,
  avatarUrl,
}) => {
  const documentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleDownload = async () => {
    if (!documentRef.current) return;

    const element = documentRef.current;
    const originalScrollTop = element.scrollTop;
    element.scrollTop = 0;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        windowWidth: PDF_LAYOUT_WIDTH_PX,
        width: PDF_LAYOUT_WIDTH_PX,
        scrollY: 0,
        scrollX: 0,
        onclone: (clonedDocument, clonedElement) => {
          applyDesktopPdfLayout(clonedDocument);
          sanitizeCssForCanvas(clonedDocument);

          if (clonedElement instanceof HTMLElement) {
            clonedElement.style.overflow = 'visible';
            clonedElement.style.width = `${PDF_LAYOUT_WIDTH_PX}px`;
            clonedElement.style.height = `${clonedElement.scrollHeight}px`;
          }
        },
      });

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 10;
      const contentWidth = pageWidth - margin * 2;
      const contentHeight = pageHeight - margin * 2;
      const imgWidth = contentWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      const imgData = canvas.toDataURL('image/jpeg', 0.95);

      let heightLeft = imgHeight;
      let position = margin;

      pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
      heightLeft -= contentHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight + margin;
        pdf.addPage();
        pdf.addImage(imgData, 'JPEG', margin, position, imgWidth, imgHeight);
        heightLeft -= contentHeight;
      }

      pdf.save('CV-Nkoumou-Tjade-Grinnel-Germain.pdf');
    } finally {
      element.scrollTop = originalScrollTop;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1c30]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full h-full sm:h-auto sm:max-h-[92vh] sm:max-w-4xl bg-white sm:rounded-2xl shadow-2xl border border-[#e5eeff] overflow-hidden flex flex-col">
        {/* Modal Header Controls */}
        <div className="px-5 py-3 border-b border-[#e5eeff] flex items-center justify-between bg-[#f4f7fc] sticky top-0 z-20 print:hidden">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-mono text-xs font-bold text-[#0b1c30] tracking-wider uppercase">
              <span className="sm:hidden">CV</span>
              <span className="hidden sm:inline">Curriculum Vitae</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-white border border-[#c3c6d7]/50 hover:bg-[#e5eeff] text-[#2563eb] text-xs font-mono font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{language === 'fr' ? 'Télécharger' : 'Download'}</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="w-8 h-8 rounded-full bg-white border border-[#c3c6d7]/50 hover:bg-[#e5eeff] text-[#565e74] hover:text-[#0b1c30] flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CV Document Container: 2 COLUMNS (30% GAUCHE / 70% DROITE) */}
        <div ref={documentRef} data-cv-document className="overflow-y-auto flex-1 bg-white text-[#0b1c30]">
          <div className="flex flex-col md:flex-row min-h-full">
            {/* ========================================================= */}
            {/* COLONNE GAUCHE — 30% */}
            {/* ========================================================= */}
            <aside className="w-full md:w-[32%] lg:w-[30%] bg-[#f8fafc] p-5 sm:p-6 border-b md:border-b-0 md:border-r border-[#e5eeff] flex flex-col gap-6 text-xs font-sans shrink-0">
              {/* Photo & Mini ID */}
              <div className="flex flex-col items-center text-center pb-2 border-b border-[#e5eeff]/80">
                <img
                  src={avatarUrl}
                  alt="Nkoumou Tjade Grinnel Germain"
                  className="w-20 h-20 rounded-full object-cover border-2 border-[#2563eb] shadow-sm mb-2.5"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>

              {/* CONTACT */}
              <div>
                <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#2563eb] pb-1.5 mb-2.5 border-b border-[#2563eb]/20">
                  Contact
                </h3>
                <div className="space-y-2 text-[#565e74]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                    <a href="tel:+237694316630" className="hover:text-[#2563eb] font-mono">
                      +237 694 316 630
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#2563eb] shrink-0" />
                    <a href="mailto:nkoumougrinnel@gmail.com" className="hover:text-[#2563eb] break-all font-mono">
                      nkoumougrinnel@gmail.com
                    </a>
                  </div>

                  {/* GitHub · Portfolio · LinkedIn */}
                  <div className="pt-2 border-t border-[#e5eeff] space-y-1.5 font-mono text-[11px]">
                    <a
                      href="https://github.com/nkoumougrinnel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-[#0b1c30] hover:text-[#2563eb] group"
                    >
                      <span className="flex items-center gap-1.5">
                        <Github className="w-3 h-3 text-[#2563eb]" />
                        <span>GitHub</span>
                      </span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a
                      href="https://vercel.com/nkoumougrinnel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-[#0b1c30] hover:text-[#2563eb] group"
                    >
                      <span className="flex items-center gap-1.5">
                        <Globe className="w-3 h-3 text-[#2563eb]" />
                        <span>Portfolio</span>
                      </span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                    <a
                      href="https://cm.linkedin.com/in/nkoumougrinnel"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between text-[#0b1c30] hover:text-[#2563eb] group"
                    >
                      <span className="flex items-center gap-1.5">
                        <Linkedin className="w-3 h-3 text-[#2563eb]" />
                        <span>LinkedIn</span>
                      </span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </div>
                </div>
              </div>

              {/* COMPÉTENCES */}
              <div>
                <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#2563eb] pb-1.5 mb-2.5 border-b border-[#2563eb]/20">
                  {language === 'fr' ? 'COMPÉTENCES' : 'SKILLS'}
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-mono font-bold text-[#0b1c30] block text-[11.5px]">
                      {language === 'fr' ? 'Développement' : 'Development'}
                    </span>
                    <p className="text-[#565e74] leading-snug mt-0.5">
                      Python · React · PostgreSQL · Docker
                    </p>
                  </div>

                  <div>
                    <span className="font-mono font-bold text-[#0b1c30] block text-[11.5px]">
                      {language === 'fr' ? 'Réseaux' : 'Networking'}
                    </span>
                    <p className="text-[#565e74] leading-snug mt-0.5">
                      IPv4/IPv6 · VLAN · OSPF · ACL
                    </p>
                  </div>

                  <div>
                    <span className="font-mono font-bold text-[#0b1c30] block text-[11.5px]">
                      Embedded & IoT
                    </span>
                    <p className="text-[#565e74] leading-snug mt-0.5">
                      C/C++ · Arduino · ESP32 · Capteurs
                    </p>
                  </div>

                  <div>
                    <span className="font-mono font-bold text-[#0b1c30] block text-[11.5px]">
                      {language === 'fr' ? 'Cybersécurité' : 'Cybersecurity'}
                    </span>
                    <p className="text-[#565e74] leading-snug mt-0.5">
                      Wireshark · Nmap
                    </p>
                  </div>

                  <div>
                    <span className="font-mono font-bold text-[#0b1c30] block text-[11.5px]">
                      IA & Data
                    </span>
                    <p className="text-[#565e74] leading-snug mt-0.5">
                      NLP · RAG · Scikit-Learn
                    </p>
                  </div>
                </div>
              </div>

              {/* LANGUES */}
              <div>
                <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#2563eb] pb-1.5 mb-2.5 border-b border-[#2563eb]/20">
                  {language === 'fr' ? 'LANGUES' : 'LANGUAGES'}
                </h3>
                <div className="space-y-1.5 text-[#565e74]">
                  <p>
                    <strong className="text-[#0b1c30] font-semibold">Français</strong> — {language === 'fr' ? 'langue maternelle' : 'Native'}
                  </p>
                  <p>
                    <strong className="text-[#0b1c30] font-semibold">Anglais</strong> — B1
                  </p>
                </div>
              </div>

              {/* INTÉRÊTS */}
              <div>
                <h3 className="font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#2563eb] pb-1.5 mb-2.5 border-b border-[#2563eb]/20">
                  {language === 'fr' ? 'INTÉRÊTS' : 'INTERESTS'}
                </h3>
                <p className="text-[#565e74] leading-relaxed">
                  Échecs · Basketball · Jeux vidéo · Anime
                </p>
              </div>
            </aside>

            {/* ========================================================= */}
            {/* COLONNE DROITE — 70% */}
            {/* ========================================================= */}
            <main className="w-full md:w-[68%] lg:w-[70%] p-6 sm:p-8 space-y-6 flex-1 text-justify">
              {/* 1. IDENTITÉ / POSITIONNEMENT */}
              <section className="border-b border-[#e5eeff] pb-5">
                <span className="font-mono text-[10px] font-bold text-[#2563eb] uppercase tracking-widest block mb-1">
                  1. {language === 'fr' ? 'IDENTITÉ / POSITIONNEMENT' : 'IDENTITY / PROFILE'}
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-[#0b1c30] tracking-tight">
                  NKOUMOU Tjade Grinnel Germain
                </h1>
                <h2 className="text-sm font-bold text-[#2563eb] mt-0.5 mb-3 font-mono">
                  {language === 'fr'
                    ? 'Étudiant ingénieur en Télécommunications — Informatique & Réseaux'
                    : 'Telecommunications Engineering Student — IT & Networks'}
                </h2>
                <p className="text-[12.5px] sm:text-[13px] text-[#565e74] leading-relaxed">
                  {language === 'fr'
                    ? "Étudiant ingénieur en 3e année à SUP'PTIC, je m'intéresse à l'informatique et aux technologies qui permettent de concevoir, connecter et faire fonctionner les systèmes. Mes projets m'ont permis d'explorer différents domaines, notamment les réseaux, le développement logiciel et les systèmes embarqués/IoT. J'expérimente également avec des technologies d'IA et m'intéresse particulièrement aux problématiques de cybersécurité."
                    : "As a 3rd-year engineering student at SUP'PTIC, I am deeply interested in computer systems and the technologies that design, connect, and power them. Through my projects, I explore multiple domains including networking, software development, and embedded/IoT systems. I also experiment with AI architectures and maintain a strong focus on cybersecurity issues."}
                </p>
              </section>

              {/* 2. EXPÉRIENCE */}
              <section className="border-b border-[#e5eeff] pb-5">
                <span className="font-mono text-[10px] font-bold text-[#2563eb] uppercase tracking-widest block mb-2">
                  2. {language === 'fr' ? 'EXPÉRIENCE' : 'EXPERIENCE'}
                </span>

                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-bold text-[#0b1c30]">
                      STAGIAIRE — CAMTEL
                    </h3>
                    <span className="font-mono text-xs text-[#2563eb] font-semibold">
                      Juillet — Septembre 2026
                    </span>
                  </div>
                  <p className="font-mono text-xs text-[#565e74]">
                    Service de la Lutte contre la Fraude · Douala
                  </p>
                  <p className="text-xs sm:text-[12.5px] text-[#565e74] pt-1 leading-relaxed">
                    Conception et développement de CarburFlow pour le Service de Lutte contre la Fraude.
                  </p>
                </div>
              </section>

              {/* 3. FORMATION */}
              <section className="border-b border-[#e5eeff] pb-5">
                <span className="font-mono text-[10px] font-bold text-[#2563eb] uppercase tracking-widest block mb-2.5">
                  3. {language === 'fr' ? 'FORMATION' : 'EDUCATION'}
                </span>

                <div className="space-y-3">
                  {/* SUP'PTIC */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                    <div>
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#0b1c30]">
                        SUP'PTIC — Yaoundé
                      </h4>
                      <p className="text-xs text-[#565e74]">
                        Ingénieur des Travaux de Télécommunication — Informatique & Réseaux
                      </p>
                    </div>
                    <span className="font-mono text-xs text-[#2563eb] font-semibold shrink-0">
                      2024 — présent · 3e année
                    </span>
                  </div>

                  {/* Université de Yaoundé I */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                    <div>
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#0b1c30]">
                        Université de Yaoundé I
                      </h4>
                      <p className="text-xs text-[#565e74]">
                        Mathématiques — niveau Licence 3
                      </p>
                    </div>
                    <span className="font-mono text-xs text-[#565e74] shrink-0">
                      2023 — 2025
                    </span>
                  </div>

                  {/* Collège Adventiste */}
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-0.5">
                    <div>
                      <h4 className="text-xs sm:text-[13px] font-bold text-[#0b1c30]">
                        Collège Adventiste de Yaoundé
                      </h4>
                      <p className="text-xs text-[#565e74]">
                        Baccalauréat C
                      </p>
                    </div>
                    <span className="font-mono text-xs text-[#565e74] shrink-0">
                      2023
                    </span>
                  </div>
                </div>
              </section>

              {/* 4. CERTIFICATION */}
              <section className="border-b border-[#e5eeff] pb-5">
                <span className="font-mono text-[10px] font-bold text-[#2563eb] uppercase tracking-widest block mb-2">
                  4. {language === 'fr' ? 'CERTIFICATION' : 'CERTIFICATION'}
                </span>

                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <div>
                    <h4 className="text-xs sm:text-[13px] font-bold text-[#0b1c30]">
                      Programmeur Électronique & Systèmes Embarqués
                    </h4>
                    <p className="text-xs text-[#565e74]">
                      OIF / D-CLIC — CNFFDP
                    </p>
                  </div>
                  <span className="font-mono text-xs text-[#2563eb] font-semibold shrink-0">
                    400 h · Oct. 2025 — Avr. 2026
                  </span>
                </div>
              </section>

              {/* 5. PROJETS */}
              <section className="space-y-4">
                <span className="font-mono text-[10px] font-bold text-[#2563eb] uppercase tracking-widest block">
                  5. {language === 'fr' ? 'PROJETS' : 'PROJECTS'}
                </span>

                {/* CARBURFLOW */}
                <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e5eeff] space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                      CARBURFLOW
                    </h4>
                    <span className="font-mono text-[11px] text-[#2563eb] font-semibold">
                      Juillet — Septembre 2026
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-[#2563eb] font-medium">
                    Lead & Fullstack Developer | Projet de stage livré
                  </p>
                  <p className="text-xs text-[#565e74] leading-relaxed">
                    Système de supervision des niveaux et consommations de carburant sur plusieurs sites, avec détection d'anomalies (fuites/vols).
                  </p>
                  <p className="font-mono text-[10.5px] text-[#0b1c30] pt-1">
                    <span className="text-[#565e74]">Technologies : </span>
                    PostgreSQL · Django · React · Docker
                  </p>
                </div>

                {/* LEKKI */}
                <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e5eeff] space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                      LEKKI
                    </h4>
                    <span className="font-mono text-[11px] text-[#2563eb] font-semibold">
                      Juin 2026
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-[#2563eb] font-medium">
                    Lead & Backend Developer | Wiki d'entreprise avec IA
                  </p>
                  <p className="text-xs text-[#565e74] leading-relaxed">
                    Base de connaissances intelligente permettant d'interroger sa documentation via un chatbot. Implémentation d'un pipeline RAG complet avec citations de sources, score de confiance et système de bascule automatique entre plusieurs LLM (Gemini, Groq, Cerebras).
                  </p>
                  <p className="font-mono text-[10.5px] text-[#0b1c30] pt-1">
                    <span className="text-[#565e74]">Technologies : </span>
                    FastAPI · React · TypeScript · RAG
                  </p>
                </div>

                {/* SUPONEAI */}
                <div className="p-3.5 rounded-xl bg-[#f8fafc] border border-[#e5eeff] space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#0b1c30]">
                      SUPONEAI
                    </h4>
                    <span className="font-mono text-[11px] text-[#2563eb] font-semibold">
                      Fevrier — Mai 2026
                    </span>
                  </div>
                  <p className="font-mono text-[11px] text-[#2563eb] font-medium">
                    Lead & Backend Developer | Chatbot SUP'PTIC
                  </p>
                  <p className="text-xs text-[#565e74] leading-relaxed">
                    Assistant intelligent permettant aux étudiants d'interroger une base de plus de 1 000 questions/réponses via recherche sémantique.
                  </p>
                  <p className="font-mono text-[10.5px] text-[#0b1c30] pt-1">
                    <span className="text-[#565e74]">Technologies : </span>
                    Django · Scikit-Learn · Pandas · React
                  </p>
                </div>
              </section>
            </main>
          </div>
        </div>

      </div>
    </div>
  );
};
