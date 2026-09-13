import React from 'react';
import { X, Award, CheckCircle2, Calendar, ShieldCheck, Cpu } from 'lucide-react';
import { Language } from '../types';

interface CertificationModalProps {
  isOpen: boolean;
  language: Language;
  certImageUrl: string;
  onClose: () => void;
}

export const CertificationModal: React.FC<CertificationModalProps> = ({
  isOpen,
  language,
  certImageUrl,
  onClose,
}) => {
  if (!isOpen) return null;

  const competencies = language === 'fr'
    ? [
        "Architecture des microcontrôleurs (ARM Cortex, ESP32, AVR)",
        "Développement embarqué bas niveau en C / C++ (Bare-metal & RTOS)",
        "Protocoles de communication industriels et bus série (I2C, SPI, UART, CAN)",
        "Interfaçage de capteurs de précision et actionneurs pour l'IoT industriel",
        "Conception schématique, routage PCB et débogage matériel (oscilloscope, analyseur logique)"
      ]
    : [
        "Microcontroller architectures (ARM Cortex, ESP32, AVR)",
        "Low-level embedded firmware in C / C++ (Bare-metal & RTOS)",
        "Industrial communication buses & protocols (I2C, SPI, UART, CAN)",
        "Precision sensor and actuator interfacing for Industrial IoT",
        "Schematic design, PCB layout & hardware debugging (oscilloscopes, logic analyzers)"
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-[#0b1c30]/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl border border-[#e5eeff] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 sm:px-6 py-4 border-b border-[#e5eeff] flex items-center justify-between bg-white sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#2563eb]"></span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-bold text-[#0b1c30] leading-tight">
                  Electronic Programming & Embedded Systems
                </h3>
                <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-[#2563eb] border border-[#2563eb]/20">
                  OIF / D-CLIC — CNFFDP
                </span>
              </div>
              <p className="font-mono text-xs text-[#565e74] flex items-center gap-1.5 mt-0.5">
                <Calendar className="w-3.5 h-3.5 text-[#2563eb]" />
                <span>400h · Octobre 2025 — Avril 2026</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-8 h-8 rounded-full bg-[#f4f7fc] hover:bg-[#e5eeff] text-[#565e74] hover:text-[#0b1c30] flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body with Image & Description (No mock image editing link!) */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1 text-[#0b1c30]">
          {/* Certificate Credential Image */}
          <div className="relative w-full aspect-[21/9] sm:aspect-[16/8] rounded-xl overflow-hidden border border-[#c3c6d7]/50 bg-slate-950 shadow-inner">
            <img
              src={certImageUrl}
              alt="Diplôme OIF D-CLIC CNFFDP"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1523289333742-be1143f6b766?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="font-mono text-xs uppercase font-bold text-[#2563eb]">
              // {language === 'fr' ? 'PRÉSENTATION DU PROGRAMME' : 'PROGRAM OVERVIEW'}
            </h4>
            <p className="text-[13.5px] text-[#565e74] leading-relaxed">
              {language === 'fr'
                ? "Parcours intensif certifiant d'excellence de 400 heures dispensé par l'Organisation Internationale de la Francophonie (OIF) à travers le programme D-CLIC en partenariat avec le CNFFDP. Ce cursus forme aux méthodologies de pointe en ingénierie matérielle et logicielle embarquée, alliant rigueur algorithmique, contraintes temps-réel et sécurité des systèmes communicants."
                : "An intensive 400-hour excellence certification delivered by the Organisation Internationale de la Francophonie (OIF) under the D-CLIC initiative in partnership with CNFFDP. The curriculum trains engineers in modern hardware-software embedded engineering, combining real-time constraints, algorithmic precision, and IoT cybersecurity."}
            </p>
          </div>

          {/* Validated Competencies */}
          <div className="space-y-2 border-t border-[#e5eeff] pt-4">
            <h4 className="font-mono text-xs uppercase font-bold text-[#0b1c30] flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-[#2563eb]" />
              {language === 'fr' ? 'Compétences Techniques Validées' : 'Validated Technical Competencies'}
            </h4>
            <ul className="space-y-2">
              {competencies.map((comp, idx) => (
                <li
                  key={idx}
                  className="p-2.5 rounded-xl bg-[#f4f7fc]/80 border border-[#e5eeff] flex items-start gap-2 text-xs text-[#0b1c30] leading-snug"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{comp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#f4f7fc]/90 border-t border-[#e5eeff] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#0b1c30] hover:bg-[#2563eb] text-white text-xs font-mono font-semibold transition-colors shadow-xs"
          >
            {language === 'fr' ? 'Fermer' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};
