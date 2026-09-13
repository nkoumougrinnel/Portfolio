import React from 'react';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { Language } from '../types';

interface CertificationsSectionProps {
  language: Language;
  certImageUrl: string;
  onOpenDetailsModal: () => void;
}

export const CertificationsSection: React.FC<CertificationsSectionProps> = ({
  language,
  certImageUrl,
  onOpenDetailsModal,
}) => {
  return (
    <section id="certifications" className="px-5 py-10 bg-white border-b border-[#e5eeff]/70">
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="font-mono text-lg text-[#2563eb] font-bold">06 /</span>
            <h2 className="text-lg sm:text-xl font-bold text-[#0b1c30] tracking-tight">
              {language === 'fr' ? 'Certifications & Accréditations' : 'Certifications'}
            </h2>
          </div>
        </div>

        {/* Grid max 3 per row instead of full-width stretching */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            onClick={onOpenDetailsModal}
            className="rounded-2xl bg-white border border-[#e5eeff] shadow-xs overflow-hidden hover:shadow-md hover:border-[#2563eb]/40 transition-all flex flex-col justify-between group cursor-pointer"
          >
            <div>
              {/* Photo 16:9 like projects / activities */}
              <div className="w-full aspect-[16/9] overflow-hidden border-b border-[#e5eeff] bg-slate-900 relative">
                <img
                  alt="Certification OIF / D-CLIC CNFFDP"
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  src={certImageUrl}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent flex items-end justify-between p-3.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-[11px] text-white flex items-center gap-1.5 bg-black/60 px-2 py-1 rounded backdrop-blur-xs">
                    {language === 'fr' ? 'Cliquer pour les détails' : 'Click for details'}
                  </span>
                  <span className="font-mono text-[10px] text-white/80 bg-black/40 px-2 py-0.5 rounded">
                    400h
                  </span>
                </div>
              </div>

              {/* Text content */}
              <div className="p-4 sm:p-5">
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="text-sm sm:text-base font-bold text-[#0b1c30] group-hover:text-[#2563eb] transition-colors leading-snug">
                    Electronic Programming & Embedded Systems
                  </h3>
                  <span className="font-mono text-[11px] text-[#2563eb] font-semibold bg-blue-50 px-2.5 py-0.5 rounded-full border border-[#2563eb]/20 shrink-0">
                    400h
                  </span>
                </div>

                <p className="font-mono text-[11.5px] text-[#2563eb] font-semibold flex items-center gap-1 mb-2">
                  <Award className="w-3.5 h-3.5 shrink-0" />
                  <span>OIF / D-CLIC — CNFFDP</span>
                </p>

                <p className="text-[12.5px] sm:text-[13px] text-[#565e74] leading-relaxed line-clamp-3">
                  {language === 'fr'
                    ? 'Formation intensive d’excellence aux systèmes embarqués industriels, firmware bas-niveau en C/C++, IoT et protocoles matériels.'
                    : 'Intensive excellence program in industrial embedded systems, low-level C/C++ firmware, IoT and hardware communication.'}
                </p>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-4 sm:px-5 pt-0 pb-4 flex items-center justify-between border-t border-[#e5eeff]/80 mt-2">
              <span className="font-mono text-[11px] text-[#565e74] flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#2563eb]" />
                <span>2025 — 2026</span>
              </span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetailsModal();
                }}
                className="px-3.5 py-1.5 rounded-xl bg-blue-50/80 hover:bg-[#2563eb] hover:text-white text-[#2563eb] border border-[#2563eb]/25 font-mono text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 shadow-xs"
              >
                <span>{language === 'fr' ? 'Détails' : 'Details'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
