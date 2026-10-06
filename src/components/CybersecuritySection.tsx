import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Terminal } from 'lucide-react';
import { Language } from '../types';

/* ══════════════════════════════════════════════════════════
   SecLabTerminal — animated typewriter + persistent cursor
══════════════════════════════════════════════════════════ */

/** Each entry in the script:
 *  - `prompt`   renders "$ <text>" (accent colour)
 *  - `output`   renders a plain response line (muted)
 *  - `comment`  renders a # comment line (faint, instant)
 */
type LineKind = 'prompt' | 'output' | 'comment';

interface ScriptLine {
  kind: LineKind;
  text: string;
  /** ms delay before this line starts typing (after prev line finished) */
  preDelay?: number;
  /** chars per second — defaults to 60 */
  speed?: number;
}

const SCRIPT: ScriptLine[] = [
  { kind: 'comment', text: '# system reconnaissance',       preDelay: 300  },
  { kind: 'prompt',  text: 'nmap -sS -O target.local',      preDelay: 200, speed: 55 },
  { kind: 'output',  text: 'Starting Nmap 7.95 …',          preDelay: 120  },
  { kind: 'prompt',  text: 'tcpdump -i eth0 -c 10',         preDelay: 350, speed: 60 },
  { kind: 'output',  text: '10 packets captured',           preDelay: 100  },
  { kind: 'prompt',  text: 'curl -sI http://target',        preDelay: 400, speed: 58 },
  { kind: 'output',  text: 'HTTP/1.1 200 OK',               preDelay: 120  },
];

interface RenderedLine {
  kind: LineKind;
  text: string;       // fully revealed text so far
  done: boolean;      // typing finished for this line
}

const SecLabTerminal: React.FC = () => {
  const rootRef   = useRef<HTMLDivElement>(null);
  const bodyRef   = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [lines, setLines]           = useState<RenderedLine[]>([]);
  const [cursorVisible, setCursor]  = useState(false);
  const startedRef                  = useRef(false);

  /* Auto-scroll terminal body to bottom */
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  /* Typewriter engine */
  const runScript = useCallback(() => {
    let lineIdx = 0;
    let charIdx = 0;
    let accumulated = 0; // elapsed within current line (ms)
    let lastTime = performance.now();

    const tick = (currentTime: number) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (lineIdx >= SCRIPT.length) {
        // All done — just keep cursor blinking
        return;
      }

      const scriptLine = SCRIPT[lineIdx];
      const preDelay   = scriptLine.preDelay ?? 0;
      const speed      = scriptLine.speed    ?? 60;
      const msPerChar  = 1000 / speed;

      accumulated += delta;

      // Waiting for preDelay before typing starts
      if (charIdx === 0 && accumulated < preDelay) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Instant lines (comment / output): reveal all at once after preDelay
      if (scriptLine.kind !== 'prompt') {
        setLines((prev) => {
          const next = [...prev];
          // Fill potential gaps just in case
          while (next.length < lineIdx) {
            next.push({ kind: 'output', text: '', done: true });
          }
          next[lineIdx] = { kind: scriptLine.kind, text: scriptLine.text, done: true };
          return next;
        });
        lineIdx++;
        charIdx = 0;
        accumulated = 0;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      // Prompt lines: character-by-character typing
      const charsToType = Math.floor((accumulated - preDelay) / msPerChar);
      const newCharIdx  = Math.min(charsToType, scriptLine.text.length);

      if (newCharIdx > charIdx) {
        charIdx = newCharIdx;
        const partial = scriptLine.text.slice(0, charIdx);
        setLines((prev) => {
          const next = [...prev];
          // Fill potential gaps just in case
          while (next.length < lineIdx) {
            next.push({ kind: 'output', text: '', done: true });
          }
          next[lineIdx] = { kind: 'prompt', text: partial, done: charIdx >= scriptLine.text.length };
          return next;
        });
      }

      if (charIdx >= scriptLine.text.length) {
        lineIdx++;
        charIdx = 0;
        accumulated = 0;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame((time) => {
      lastTime = time;
      tick(time);
    });
  }, []);

  /* IntersectionObserver — trigger on first entry, cursor on/off */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCursor(true);
          if (!startedRef.current) {
            startedRef.current = true;
            // Small delay so user sees the terminal before typing starts
            timerRef.current = setTimeout(runScript, 400);
          }
        } else {
          setCursor(false);
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafRef.current)   cancelAnimationFrame(rafRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [runScript]);

  return (
    <div ref={rootRef} className="rounded-2xl glass-card overflow-hidden font-mono text-[11px]">
      {/* ── Title bar ── */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-bg-accent)]">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="ml-2 select-none tracking-widest text-[10px] text-[var(--color-text-faint)] uppercase">
          sec-lab — bash
        </span>
      </div>

      {/* ── Body ── */}
      <div
        ref={bodyRef}
        className="p-4 space-y-1.5 bg-[var(--color-bg-soft)] min-h-[148px] overflow-hidden"
      >
        {lines.map((line, i) => {
          if (!line) return null;
          const isLastLine = i === lines.length - 1;

          if (line.kind === 'comment') {
            return (
              <p key={i} className="text-[var(--color-text-faint)] select-none">
                {line.text}
              </p>
            );
          }

          if (line.kind === 'output') {
            return (
              <p key={i} className="text-[var(--color-text-subtle)] pl-2">
                {line.text}
              </p>
            );
          }

          // prompt
          return (
            <p key={i} className="flex items-baseline gap-1">
              <span className="text-[var(--color-accent)] shrink-0">$</span>
              <span className="text-[var(--color-text-muted)]">{line.text}</span>
              {/* Cursor: blinks on active last line, or steady on typing line */}
              {isLastLine && (
                <span
                  className={
                    line.done && cursorVisible
                      ? 'text-[var(--color-accent)] animate-[blink_1s_step-end_infinite]'
                      : line.done
                        ? 'opacity-0'
                        : 'text-[var(--color-accent)]'
                  }
                  aria-hidden="true"
                >
                  ▌
                </span>
              )}
            </p>
          );
        })}

        {/* Prompt line before animation starts */}
        {lines.length === 0 && (
          <p className="flex items-baseline gap-1">
            <span className="text-[var(--color-accent)] shrink-0">$</span>
            <span
              className={cursorVisible ? 'text-[var(--color-accent)] animate-[blink_1s_step-end_infinite]' : 'opacity-0'}
              aria-hidden="true"
            >
              ▌
            </span>
          </p>
        )}
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
}) => (
  <section id="cybersecurity" className="cybersecurity-section px-5 py-10">
    <div className="mx-auto max-w-7xl px-0 sm:px-4 lg:px-6">
      <div className="mb-10 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[var(--color-text-main)] sm:text-xl">
            {language === 'fr' ? 'Cybersécurité' : 'Cybersecurity'}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--color-text-muted)]">
            {language === 'fr'
              ? "Je construis et analyse des systèmes pour mieux comprendre comment ils peuvent être sécurisés."
              : "I build and analyse systems to better understand how they can be secured."}
          </p>
        </div>
        <SecLabTerminal />
      </div>
    </div>
  </section>
);
