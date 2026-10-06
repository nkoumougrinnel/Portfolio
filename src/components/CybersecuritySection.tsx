import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';

type TerminalEntry = {
  kind: 'prompt' | 'output';
  text: string;
};

const TERMINAL_ENTRIES: TerminalEntry[] = [
  {
    kind: 'prompt',
    text: 'ip addr',
  },
  {
    kind: 'output',
    text: `eth0    inet 192.168.56.101/24
        state UP`,
  },
  {
    kind: 'prompt',
    text: 'nmap -sV 192.168.56.0/24',
  },
  {
    kind: 'output',
    text: `Nmap scan report for 192.168.56.1
Host is up (0.0021s latency).

PORT    STATE SERVICE VERSION
22/tcp  open  ssh     OpenSSH 9.6
80/tcp  open  http    nginx 1.24.0

3 hosts up`,
  },
  {
    kind: 'prompt',
    text: 'curl -I http://192.168.56.10',
  },
  {
    kind: 'output',
    text: `HTTP/1.1 200 OK
Server: nginx
Content-Type: text/html`,
  },
  {
    kind: 'prompt',
    text: 'ss -tulpn',
  },
  {
    kind: 'output',
    text: `LISTEN 0  128  0.0.0.0:22
LISTEN 0  511  0.0.0.0:80
LISTEN 0  511  0.0.0.0:443`,
  },
  {
    kind: 'prompt',
    text: '',
  },
];

const SecLabTerminal: React.FC<{
  language: Language;
  isHovered: boolean;
}> = ({ language, isHovered }) => {
  const rootRef = useRef<HTMLDivElement>(null);
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

  /*
   * Animation engine.
   *
   * A line is completely finished before the next line begins.
   * There is therefore never a second cursor or a premature prompt.
   */
  useEffect(() => {
    if (!isHovered || !currentEntry) return;

    const targetLength = currentEntry.text.length;

    if (typedText.length < targetLength) {
      const speed = currentEntry.kind === 'prompt' ? 35 : 12;

      timerRef.current = window.setTimeout(() => {
        setTypedText(currentEntry.text.slice(0, typedText.length + 1));
      }, speed);

      return () => clearTimer();
    }

    /*
     * Current line is completely typed.
     * Wait before moving to the next one.
     */
    timerRef.current = window.setTimeout(() => {
      if (entryIndex < TERMINAL_ENTRIES.length - 1) {
        setEntryIndex((current) => current + 1);
        setTypedText('');
      } else {
        /*
         * End of the session:
         * keep the last output visible while hovered.
         * No automatic restart.
         */
      }
    }, currentEntry.kind === 'prompt' ? 500 : 900);

    return () => clearTimer();
  }, [isHovered, entryIndex, typedText, currentEntry]);

  /*
   * Keep only the already completed lines.
   */
  const completedEntries = TERMINAL_ENTRIES.slice(0, entryIndex);

  return (
    <div
      ref={rootRef}
      className="w-full h-[560px] overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-soft)] font-mono text-[10px] shadow-sm sm:text-[11px]"
      aria-label={language === 'fr' ? 'terminal' : 'terminal'}
    >
      {/* Terminal header */}
      <div className="flex h-10 items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg-accent)] px-4">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>

        <span className="ml-2 select-none text-[9px] tracking-widest text-[var(--color-text-faint)]">
          terminal
        </span>
      </div>

      {/* Fixed terminal viewport */}
      <div className="h-[510px] overflow-hidden p-4 sm:p-5">
        <div className="space-y-1.5 leading-relaxed">
          {/* Completed lines */}
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

          {/* Current line */}
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

              {/* Exactly one cursor */}
              <span
                className="terminal-cursor ml-0.5 inline-block h-3 w-[6px] bg-[var(--color-accent)] align-middle"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface CybersecuritySectionProps {
  language: Language;
  cybersecurityData: unknown;
}

export const CybersecuritySection: React.FC<CybersecuritySectionProps> = ({
  language,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="cybersecurity"
      className="cybersecurity-section px-5 py-10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="mx-auto max-w-7xl px-0 sm:px-4 lg:px-6">
        <div className="mb-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[var(--color-text-main)] sm:text-xl">
            {language === 'fr' ? 'Cybersécurité' : 'Cybersecurity'}
          </h2>

          <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--color-text-muted)]">
            <span className="font-semibold text-[var(--color-accent)]">
              {language === 'fr' ? 'Prochainement' : 'Coming soon'}
            </span>
            <span>·</span>
            <span>Security Labs</span>
            <span>·</span>
            <span>CTFs</span>
            <span>·</span>
            <span>Security Projects</span>
            <span>·</span>
            <span>Write-ups</span>
          </div>
        </div>

        <SecLabTerminal language={language} isHovered={isHovered} />
      </div>
    </div>
    </section>
  );
};
