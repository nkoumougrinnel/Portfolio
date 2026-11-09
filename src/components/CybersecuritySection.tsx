import React, { useEffect, useRef, useState } from 'react';
import { Calendar, ArrowRight, ArrowUpRight } from 'lucide-react';
import { CtfEntry, CyberPlatformProfile, Language } from '../types';
import { CtfModal } from './CtfModal';
import { BrandMark } from './BrandMark';

const SEC_FOCUS = [
  {
    k: 'recon',
    title: { fr: 'Reconnaissance réseau', en: 'Network recon' },
    desc: { fr: 'Cartographier hôtes, ports et services.', en: 'Map hosts, ports and services.' },
    tools: ['nmap'],
  },
  {
    k: 'traffic',
    title: { fr: 'Analyse de trafic', en: 'Traffic analysis' },
    desc: { fr: 'Lire ce qui circule vraiment sur le réseau.', en: 'Read what actually crosses the wire.' },
    tools: ['wireshark', 'tcpdump'],
  },
  {
    k: 'linux',
    title: { fr: 'Systèmes Linux', en: 'Linux systems' },
    desc: { fr: 'Shell, droits, services et durcissement.', en: 'Shell, permissions, services, hardening.' },
    tools: ['bash', 'permissions'],
  },
  {
    k: 'ctf',
    title: { fr: 'CTF & labs', en: 'CTFs & labs' },
    desc: { fr: 'S’entraîner sur des cas concrets.', en: 'Practice on hands-on scenarios.' },
    tools: ['TryHackMe', 'Hack The Box', 'CyLab'],
  },
] as const;

type TerminalEntry = {
  kind: 'prompt' | 'output';
  text: string;
  /** Ligne mise en évidence (résultat clé). */
  hl?: boolean;
};

const TERMINAL_ENTRIES: TerminalEntry[] = [
  { kind: 'prompt', text: 'ip -br addr show eth0' },
  { kind: 'output', text: 'eth0   UP   192.168.56.101/24' },
  { kind: 'prompt', text: 'nmap -sV 192.168.56.0/24' },
  {
    kind: 'output',
    text: `PORT    STATE  SERVICE  VERSION
22/tcp  open   ssh      OpenSSH 8.9p1
80/tcp  open   http     nginx 1.18.0
443/tcp open   https    nginx 1.18.0`,
  },
  { kind: 'output', text: 'Nmap done: 256 IP addresses (3 hosts up)', hl: true },
  { kind: 'prompt', text: 'sudo tcpdump -c 3 port 443' },
  {
    kind: 'output',
    text: `IP lab.51544 > srv.https: Flags [S]
IP srv.https > lab.51544: Flags [S.]
3 packets captured`,
  },
  { kind: 'prompt', text: 'echo "understand it, then secure it."' },
  { kind: 'output', text: 'understand it, then secure it.', hl: true },
];

const Prompt: React.FC = () => (
  <span className="select-none">
    <span style={{ color: 'var(--term-prompt)' }}>grinnel@lab</span>
    <span style={{ color: 'var(--term-dim)' }}>:</span>
    <span style={{ color: 'var(--term-path)' }}>~</span>
    <span style={{ color: 'var(--term-dim)' }}>$ </span>
  </span>
);

const SecLabTerminal: React.FC<{ language: Language }> = ({ language }) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [entryIndex, setEntryIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  // Démarre quand le terminal devient visible, se met en pause hors écran.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), { threshold: 0.35 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const done = entryIndex >= TERMINAL_ENTRIES.length;
  const currentEntry = done ? undefined : TERMINAL_ENTRIES[entryIndex];

  useEffect(() => {
    if (reduceMotion) {
      setEntryIndex(TERMINAL_ENTRIES.length);
      return;
    }
    if (!isVisible) return;

    let timer: number;
    if (done) {
      // Pause puis relance la session.
      timer = window.setTimeout(() => {
        setEntryIndex(0);
        setTypedText('');
      }, 6000);
    } else if (currentEntry && currentEntry.kind === 'prompt' && typedText.length < currentEntry.text.length) {
      timer = window.setTimeout(
        () => setTypedText(currentEntry.text.slice(0, typedText.length + 1)),
        28 + Math.random() * 45,
      );
    } else {
      timer = window.setTimeout(() => {
        setEntryIndex((i) => i + 1);
        setTypedText('');
      }, currentEntry?.kind === 'prompt' ? 380 : 650);
    }
    return () => window.clearTimeout(timer);
  }, [currentEntry, done, isVisible, reduceMotion, typedText]);

  const shown = TERMINAL_ENTRIES.slice(0, entryIndex);

  return (
    <div
      ref={rootRef}
      className="term relative z-10 w-full overflow-hidden rounded-2xl font-mono text-[9px] min-[380px]:text-[10px] sm:text-[11.5px]"
      role="img"
      aria-label={
        language === 'fr'
          ? 'Terminal animé : reconnaissance réseau sur un lab local (ip, nmap, tcpdump)'
          : 'Animated terminal: network reconnaissance on a local lab (ip, nmap, tcpdump)'
      }
    >
      <div className="flex h-9 items-center gap-2 border-b px-4" style={{ background: 'var(--term-bar)', borderColor: 'var(--term-border)' }}>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <span className="ml-2 select-none text-[10px] tracking-wider" style={{ color: 'var(--term-dim)' }}>
          grinnel@lab — bash — 80×24
        </span>
      </div>

      {/*
        Hauteur fixée par une copie invisible de la session complète :
        le terminal a d'emblée sa taille finale et ne défile jamais.
      */}
      <div className="relative p-4 sm:p-5" aria-hidden="true">
        <div className="invisible space-y-1 leading-relaxed">
          {TERMINAL_ENTRIES.map((entry, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {entry.kind === 'prompt' ? <><Prompt />{entry.text}</> : entry.text}
            </div>
          ))}
          <div><Prompt /></div>
        </div>

        <div className="absolute inset-0 space-y-1 p-4 leading-relaxed sm:p-5">
          {shown.map((entry, index) => (
            <div key={index} className="whitespace-pre-wrap">
              {entry.kind === 'prompt' ? (
                <>
                  <Prompt />
                  <span>{entry.text}</span>
                </>
              ) : (
                <span style={{ color: entry.hl ? 'var(--term-hl)' : 'var(--term-dim)' }}>{entry.text}</span>
              )}
            </div>
          ))}

          <div className="whitespace-pre-wrap">
            {(done || currentEntry?.kind === 'prompt') && <Prompt />}
            {currentEntry?.kind === 'prompt' && <span>{typedText}</span>}
            <span
              className="terminal-cursor ml-0.5 inline-block h-3 w-[6px] align-middle"
              style={{ background: 'var(--term-prompt)' }}
            />
          </div>
        </div>
      </div>
      <div className="term-scanlines" aria-hidden="true" />
    </div>
  );
};

interface CybersecurityData {
  ctfs: CtfEntry[];
  platforms?: CyberPlatformProfile[];
}

interface CybersecuritySectionProps {
  language: Language;
  cybersecurityData: CybersecurityData;
}

export const CybersecuritySection: React.FC<
  CybersecuritySectionProps
> = ({ language, cybersecurityData }) => {
  const [openCtf, setOpenCtf] = useState<CtfEntry | null>(null);

  const ctfs = cybersecurityData.ctfs;
  const platforms = cybersecurityData.platforms || [];

  return (
    <section
      id="cybersecurity"
      className="section cybersecurity-section"
    >
      <div className="section-inner">

        {/* Section heading */}
        <div className="section-head">
          <span className="section-eyebrow">04 <span aria-hidden="true">/</span> security</span>
          <h2 className="section-title">
            {language === 'fr' ? 'Cybersécurité' : 'Cybersecurity'}
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
              items-center
              gap-8
              lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]
              lg:gap-12
            "
          >
            {/* Intro text */}
            <div className="max-w-xl">
              <p className="text-2xl font-extrabold leading-tight tracking-tight text-[var(--color-text-main)] sm:text-3xl">
                {language === 'fr' ? (
                  <>Comprendre comment un système est construit, <span className="text-[var(--color-accent)]">c’est voir où il peut céder.</span></>
                ) : (
                  <>Understanding how a system is built <span className="text-[var(--color-accent)]">shows you where it can break.</span></>
                )}
              </p>
              <p className="mt-5 max-w-lg text-[15px] leading-[1.8] text-[var(--color-text-muted)] sm:text-base">
                {language === 'fr'
                  ? "Je développe progressivement mes compétences en sécurité des systèmes et des réseaux à travers la pratique, l'expérimentation et l'analyse."
                  : 'I am progressively developing my skills in systems and network security through hands-on practice, experimentation, and analysis.'}
              </p>
            </div>

            {/* Compact terminal */}
            <div className="w-full lg:max-w-[420px] lg:justify-self-end">
              <SecLabTerminal language={language} />
            </div>
          </div>

          {/* Domaines de pratique : bande éditoriale en 4 colonnes */}
          <ol className="card grid grid-cols-1 overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
            {SEC_FOCUS.map(({ k, title, desc, tools }, index) => (
              <li
                key={k}
                className="group relative flex flex-col p-6 transition-colors hover:bg-[color-mix(in_srgb,var(--color-accent)_5%,transparent)] [&:not(:last-child)]:border-b [&:not(:last-child)]:border-[var(--color-border)] sm:[&:nth-child(odd)]:border-r lg:[&:not(:last-child)]:border-b-0 lg:[&:not(:last-child)]:border-r"
              >
                <span className="font-mono text-[12px] font-semibold text-[var(--color-accent)]">
                  {String(index + 1).padStart(2, '0')}
                  <span className="ml-2 inline-block h-px w-8 translate-y-[-3px] bg-[var(--color-accent)] opacity-40 transition-all group-hover:w-12 group-hover:opacity-100" aria-hidden="true" />
                </span>
                <h4 className="mt-4 text-[15px] font-bold text-[var(--color-text-main)]">{title[language]}</h4>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-[var(--color-text-muted)]">{desc[language]}</p>
                <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                  {tools.map((tool) => (
                    <span key={tool} className="tag tag-neutral">{tool}</span>
                  ))}
                </div>
              </li>
            ))}
          </ol>

          {/* ==================================================
              CTFs
             ================================================== */}
          {ctfs.length > 0 && (
          <div className="space-y-8">
            <div className="mb-2">
              {/*<h3 className="text-sm font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                {language === 'fr' ? 'CTFs' : 'CTFs'}
              </h3>*/}
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {ctfs.map((ctf) => (
                <article
                  key={ctf.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenCtf(ctf)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setOpenCtf(ctf);
                    }
                  }}
                  className="card card-interactive group flex h-full flex-col p-3"
                >
                  <div className="card-media">
                    <img src={ctf.imageUrl} alt={ctf.title[language]} loading="lazy" />
                    <span className="media-badge">{ctf.difficulty}</span>
                  </div>
                  <div className="card-body flex flex-1 flex-col px-2 pb-1 pt-4">
                    <h4 className="card-title">{ctf.title[language]}</h4>
                    <p className="meta mt-1.5">{ctf.platform}</p>
                    <p className="card-text mt-3 line-clamp-2">{ctf.description[language]}</p>
                    <div className="card-footer mt-5">
                      <span className="meta"><Calendar />{ctf.date}</span>
                      <span className="btn-more">
                        {language === 'fr' ? 'Détails' : 'Details'}
                        <ArrowRight />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
          )}
        </div>

        {/* ==================================================
              PRACTICE PLATFORMS & PROFILES
             ================================================== */}
          {platforms.length > 0 && (
            <div className="mt-16">
              <h3 className="subsection-title">{language === 'fr' ? 'Plateformes de pratique' : 'Practice platforms'}</h3>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {platforms.map((platform) => {
                  const color = platform.brandColor || 'var(--color-accent)';
                  return (
                    <a
                      key={platform.id}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="card card-interactive card-body group relative flex flex-col overflow-hidden p-6"
                    >
                      <span className="card-watermark-strip" style={{ background: color }} aria-hidden="true" />
                      <BrandMark slug={platform.iconSlug} color={color} className="card-watermark" />
                      <div className="relative">
                        <h4 className="card-title">{platform.name}</h4>
                        <p className="meta mt-1"><span className="meta-accent">@</span>{platform.username}</p>
                      </div>
                      {platform.description && (
                        <p className="card-text relative mt-4 line-clamp-3 pr-6">{platform.description[language]}</p>
                      )}
                      <div className="card-footer relative mt-5">
                        <span className="meta">{platform.badge?.[language] ?? ''}</span>
                        <span className="btn-more">
                          {language === 'fr' ? 'Profil' : 'Profile'}
                          <ArrowUpRight />
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
      </div>

      <CtfModal
        ctf={openCtf}
        language={language}
        onClose={() => setOpenCtf(null)}
      />

    </section>
  );
};