import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import { CtfEntry, Language } from '../types';
import { CtfModal } from './CtfModal';

type TerminalEntry = {
  kind: 'prompt' | 'output';
  text: string;
};

const TERMINAL_ENTRIES: TerminalEntry[] = [
  { kind: 'prompt', text: 'ip addr' },
  {
    kind: 'output',
    text: `eth0  192.168.56.101/24
state UP`,
  },

  { kind: 'prompt', text: 'nmap -sV 192.168.56.0/24' },
  {
    kind: 'output',
    text: `22/tcp  open  ssh
80/tcp  open  http
443/tcp open  https

3 hosts up`,
  },

  { kind: 'prompt', text: '' },
];

const SecLabTerminal: React.FC<{
  language: Language;
  isHovered: boolean;
}> = ({ language, isHovered }) => {
  const timerRef = useRef<number | null>(null);
  const [entryIndex, setEntryIndex] = useState(0);
  const [typedText, setTypedText] = useState('');

  const currentEntry = TERMINAL_ENTRIES[entryIndex];

  const clearTimer = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (!isHovered || !currentEntry) return;

    const targetLength = currentEntry.text.length;

    if (typedText.length < targetLength) {
      timerRef.current = window.setTimeout(() => {
        setTypedText(
          currentEntry.text.slice(0, typedText.length + 1)
        );
      }, currentEntry.kind === 'prompt' ? 35 : 12);

      return () => clearTimer();
    }

    timerRef.current = window.setTimeout(() => {
      if (entryIndex < TERMINAL_ENTRIES.length - 1) {
        setEntryIndex((current) => current + 1);
        setTypedText('');
      }
    }, currentEntry.kind === 'prompt' ? 500 : 900);

    return () => clearTimer();
  }, [currentEntry, entryIndex, isHovered, typedText]);

  const completedEntries = TERMINAL_ENTRIES.slice(0, entryIndex);

  return (
    <div
      className="
        relative z-10
        h-[270px] w-full
        overflow-hidden
        rounded-2xl
        border border-[var(--color-border)]
        bg-[var(--color-bg-soft)]
        font-mono text-[10px]
        shadow-sm
        sm:text-[11px]
      "
      aria-label={language === 'fr' ? 'terminal' : 'terminal'}
    >
      {/* Terminal header */}
      <div
        className="
          flex h-10 items-center gap-2
          border-b border-[var(--color-border)]
          bg-[var(--color-bg-accent)]
          px-4
        "
      >
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>

        <span className="ml-2 select-none text-[9px] tracking-widest text-[var(--color-text-faint)]">
          terminal
        </span>
      </div>

      {/* Terminal content */}
      <div className="h-[230px] overflow-hidden p-4 sm:p-5">
        <div className="space-y-1.5 leading-relaxed">
          {completedEntries.map((entry, index) => (
            <div
              key={`${entryIndex}-${index}`}
              className="whitespace-pre-line"
            >
              {entry.kind === 'prompt' && (
                <span className="text-[var(--color-accent)]">
                  {entry.text.length === 0
                    ? 'grinnel@lab:~'
                    : 'grinnel@lab:~$'}
                  &nbsp;
                </span>
              )}

              <span
                className={
                  entry.kind === 'prompt'
                    ? 'text-[var(--color-text-muted)]'
                    : 'text-[var(--color-text-subtle)]'
                }
              >
                {entry.text}
              </span>
            </div>
          ))}

          {currentEntry && (
            <div className="whitespace-pre-line">
              {currentEntry.kind === 'prompt' && (
                <span className="text-[var(--color-accent)]">
                  {currentEntry.text.length === 0
                    ? 'grinnel@lab:~'
                    : 'grinnel@lab:~$'}
                  &nbsp;
                </span>
              )}

              <span
                className={
                  currentEntry.kind === 'prompt'
                    ? 'text-[var(--color-text-muted)]'
                    : 'text-[var(--color-text-subtle)]'
                }
              >
                {typedText}
              </span>

              <span
                className="
                  terminal-cursor
                  ml-0.5
                  inline-block
                  h-3
                  w-[6px]
                  bg-[var(--color-accent)]
                  align-middle
                "
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface CybersecurityData {
  ctfs: CtfEntry[];
}

interface CybersecuritySectionProps {
  language: Language;
  cybersecurityData: CybersecurityData;
}

export const CybersecuritySection: React.FC<
  CybersecuritySectionProps
> = ({ language, cybersecurityData }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [openCtf, setOpenCtf] = useState<CtfEntry | null>(null);

  const ctfs = cybersecurityData.ctfs;

  return (
    <section
      id="cybersecurity"
      className="cybersecurity-section px-5 py-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto max-w-7xl px-0 sm:px-4 lg:px-6">

        {/* Section heading */}
        <div className="mb-8 flex items-center gap-2">
          <h2 className="text-lg font-bold tracking-tight text-[var(--color-text-main)] sm:text-xl">
            {language === 'fr'
              ? 'Cybersécurité'
              : 'Cybersecurity'}
          </h2>
        </div>

        <div className="space-y-12">

          {/* ==================================================
              TOP AREA
              Text left / compact terminal right
             ================================================== */}
          <div
            className="
              grid
              items-start
              gap-8
              lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]
              lg:gap-12
            "
          >
            {/* Intro text */}
            <div className="max-w-xl pt-1 lg:pt-2">
              <p
                className="
                  max-w-lg
                  text-sm
                  leading-7
                  text-[var(--color-text-muted)]
                  sm:text-base
                "
              >
                {language === 'fr'
                  ? "Je développe progressivement mes compétences en sécurité des systèmes et des réseaux à travers la pratique, l'expérimentation et l'analyse."
                  : 'I am progressively developing my skills in systems and network security through hands-on practice, experimentation, and analysis.'}
              </p>
            </div>

            {/* Compact terminal */}
            <div className="w-full max-w-[420px] justify-self-end">
              <SecLabTerminal
                language={language}
                isHovered={isHovered}
              />
            </div>
          </div>

          {/* ==================================================
              CTFs
             ================================================== */}
          <div className="space-y-8">
            <div className="mb-2">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                {language === 'fr' ? 'CTFs' : 'CTFs'}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {ctfs.map((ctf) => (
                <article
                  key={ctf.id}
                  onClick={() => setOpenCtf(ctf)}
                  className="
                    group
                    flex h-full
                    cursor-pointer
                    flex-col
                    justify-between
                    gap-2
                    rounded-2xl
                    glass-card
                    p-4
                    transition-all
                    hover:border-[var(--color-accent)]/40
                    hover:shadow-md
                    sm:p-5
                  "
                >
                  <div className="flex flex-col gap-2">

                    {/* CTF visual */}
                    <div
                      className="
                        relative
                        flex
                        aspect-[16/9]
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                        rounded-xl
                        border
                        border-[var(--color-border-muted)]/30
                        bg-[var(--color-bg-panel)]
                      "
                    >                      <img
                        src={ctf.imageUrl}
                        alt={
                          language === 'fr'
                            ? 'Illustration du CTF'
                            : 'Illustration of the CTF'
                        }
                        className="h-full w-full object-cover"
                      />                      <span className="absolute left-3 top-3 rounded-md border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white backdrop-blur-md">
                        {ctf.difficulty}
                      </span>
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-[var(--color-text-main)] transition-colors group-hover:text-[var(--color-accent)] sm:text-lg">
                      {ctf.title[language]}
                    </h4>

                    {/* Description */}
                    <p className="line-clamp-2 text-[13px] leading-relaxed text-[var(--color-text-muted)]">
                      {ctf.description[language]}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-1 flex items-center justify-between border-t border-[var(--color-border)] pt-3">
                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 truncate font-mono text-[10px] text-[var(--color-text-muted)]">
                        <Calendar className="h-3 w-3 shrink-0 text-[var(--color-accent)]" />
                        {ctf.date}
                      </span>

                      <span className="pl-4 text-[10px] font-medium text-[var(--color-text-faint)]">
                        {ctf.platform}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        setOpenCtf(ctf);
                      }}
                      className="
                        ml-3
                        inline-flex
                        shrink-0
                        items-center
                        gap-1.5
                        rounded-xl
                        border
                        border-[var(--color-accent)]/25
                        bg-[var(--color-bg-accent)]/50
                        px-3
                        py-1
                        text-xs
                        font-semibold
                        text-[var(--color-accent)]
                        transition-all
                        hover:bg-[var(--color-accent)]
                        hover:text-white
                      "
                    >
                      <span>
                        {language === 'fr'
                          ? 'Détails'
                          : 'Details'}
                      </span>

                      <ExternalLink className="h-3 w-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      <CtfModal
        ctf={openCtf}
        language={language}
        onClose={() => setOpenCtf(null)}
      />
    </section>
  );
};