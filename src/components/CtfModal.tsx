import React from 'react';
import { Calendar } from 'lucide-react';
import { CtfEntry, Language } from '../types';
import { BulletList, ModalMedia, ModalSection, ModalShell, ModalText } from './ModalKit';

interface CtfModalProps {
  ctf: CtfEntry | null;
  language: Language;
  onClose: () => void;
}

export const CtfModal: React.FC<CtfModalProps> = ({ ctf, language, onClose }) => {
  if (!ctf) return null;

  const fr = language === 'fr';
  const steps = ctf.content?.steps ?? [];
  const learned = ctf.content?.learned?.[language] ?? [];

  return (
    <ModalShell
      open
      onClose={onClose}
      language={language}
      eyebrow={fr ? 'write-up ctf' : 'ctf write-up'}
      title={ctf.title[language]}
      meta={
        <>
          <span className="meta meta-accent">{ctf.platform}</span>
          <span className="tag tag-neutral">{ctf.difficulty}</span>
          <span className="meta"><Calendar />{ctf.date}</span>
        </>
      }
    >
      <ModalMedia src={ctf.imageUrl} alt={ctf.title[language]} language={language} />

      <ModalSection title={fr ? 'Objectif' : 'Objective'}>
        <ModalText>{ctf.description[language]}</ModalText>
      </ModalSection>

      {steps.length > 0 && (
        <ModalSection title={fr ? 'Démarche' : 'Walkthrough'}>
          <ol className="space-y-4">
            {steps.map((step, index) => (
              <li key={`${step.command}-${index}`} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-accent)_12%,transparent)] font-mono text-[11px] font-bold text-[var(--color-accent)]">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  {step.command && (
                    <code className="term block overflow-x-auto rounded-lg px-3 py-2 font-mono text-[12px]">
                      <span style={{ color: 'var(--term-prompt)' }}>$ </span>
                      {step.command}
                    </code>
                  )}
                  <p className="mt-2 text-[14px] leading-relaxed text-[var(--color-text-muted)]">{step[language]}</p>
                </div>
              </li>
            ))}
          </ol>
        </ModalSection>
      )}

      {learned.length > 0 && (
        <ModalSection title={fr ? 'Ce que j’ai appris' : 'What I learned'}>
          <BulletList items={learned} />
        </ModalSection>
      )}
    </ModalShell>
  );
};
