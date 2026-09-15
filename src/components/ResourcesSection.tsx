import React from 'react';
import { Download, FileText, FileDown, Eye, Check } from 'lucide-react';
import { Language } from '../types';

interface ResourcesSectionProps {
  language: Language;
  onOpenCvModal: () => void;
}

export const ResourcesSection: React.FC<ResourcesSectionProps> = ({
  language,
  onOpenCvModal,
}) => {
  return (
    <section id="resources" className="px-5 py-10 bg-[#f4f7fc]/40 border-b border-[#e5eeff]/70">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-mono text-lg text-[#2563eb] font-bold">09 /</span>
          <h2 className="text-lg sm:text-xl font-bold text-[#0b1c30] tracking-tight">
            {language === 'fr' ? 'Ressources & Documents' : 'Resources'}
          </h2>
        </div>

        <div className="space-y-3">
          {/* CV Download & Interactive View */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex items-center justify-between gap-3 hover:border-[#2563eb]/40 transition-all">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-[#2563eb]/25 flex items-center justify-center text-[#2563eb] shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-[#0b1c30] truncate">
                  Curriculum Vitae (CV)
                </h3>
                <p className="text-xs text-[#565e74] mt-0.5 leading-snug">
                  {language === 'fr'
                    ? 'Parcours académique, compétences et expériences détaillées.'
                    : 'Detailed professional background and academic record.'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onOpenCvModal}
                className="px-3.5 py-2 rounded-xl bg-[#2563eb] hover:bg-blue-700 text-white font-mono text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs active:scale-98"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{language === 'fr' ? 'Consulter' : 'View'}</span>
              </button>
            </div>
          </div>

          {/* Portfolio PDF Download */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e5eeff] shadow-xs flex items-center justify-between gap-3 hover:border-[#2563eb]/40 transition-all">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#f4f7fc] border border-[#c3c6d7]/40 flex items-center justify-center text-[#565e74] shrink-0">
                <FileDown className="w-5 h-5 text-[#2563eb]" />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-[#0b1c30] truncate">
                  {language === 'fr' ? 'Version Imprimable / PDF' : 'Portfolio PDF Document'}
                </h3>
                <p className="text-xs text-[#565e74] mt-0.5 leading-snug">
                  {language === 'fr'
                    ? 'Format condensé pour impression ou archivage hors-ligne.'
                    : 'A condensed, printable version of this interactive portfolio.'}
                </p>
              </div>
            </div>

            <button
              onClick={onOpenCvModal}
              className="px-3.5 py-2 rounded-xl bg-[#f4f7fc] border border-[#c3c6d7]/40 hover:bg-[#e5eeff] text-[#0b1c30] hover:text-[#2563eb] font-mono text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs shrink-0 active:scale-98"
            >
              <Download className="w-3.5 h-3.5 text-[#2563eb]" />
              <span>
                {language === 'fr' ? 'Télécharger' : 'Download'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
