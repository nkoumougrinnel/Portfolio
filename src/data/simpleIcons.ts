// Import explicite : n'embarque que les icônes utilisées (le paquet complet pèse plusieurs Mo).
// Ajouter ici toute nouvelle icône référencée dans portfolioData.ts.
import {
  siArduino,
  siBurpsuite,
  siC,
  siCisco,
  siCplusplus,
  siDjango,
  siDocker,
  siEslint,
  siEspressif,
  siFastapi,
  siGit,
  siGithub,
  siGnubash,
  siHashcat,
  siHtml5,
  siJavascript,
  siKalilinux,
  siLinux,
  siMetasploit,
  siNodedotjs,
  siOpenssl,
  siOpenvpn,
  siOwasp,
  siPostgresql,
  siPostman,
  siPython,
  siRaspberrypi,
  siReact,
  siSqlite,
  siTypescript,
  siUbuntu,
  siVirtualbox,
  siVite,
  siWireshark,
  siTryhackme,
  siHackthebox,
} from 'simple-icons';
import type { SimpleIcon } from 'simple-icons';

function isSimpleIcon(value: unknown): value is SimpleIcon {
  if (!value || typeof value !== 'object') return false;

  const candidate = value as Partial<SimpleIcon>;
  return (
    typeof candidate.title === 'string' &&
    typeof candidate.slug === 'string' &&
    typeof candidate.svg === 'string' &&
    typeof candidate.path === 'string' &&
    typeof candidate.source === 'string' &&
    typeof candidate.hex === 'string'
  );
}

const SIMPLE_ICON_BY_SLUG = new Map(
  [
    siArduino,
    siBurpsuite,
    siC,
    siCisco,
    siCplusplus,
    siDjango,
    siDocker,
    siEslint,
    siEspressif,
    siFastapi,
    siGit,
    siGithub,
    siGnubash,
    siHashcat,
    siHtml5,
    siJavascript,
    siKalilinux,
    siLinux,
    siMetasploit,
    siNodedotjs,
    siOpenssl,
    siOpenvpn,
    siOwasp,
    siPostgresql,
    siPostman,
    siPython,
    siRaspberrypi,
    siReact,
    siSqlite,
    siTypescript,
    siUbuntu,
    siVirtualbox,
    siVite,
    siWireshark,
    siTryhackme,
    siHackthebox,
  ]
    .filter(isSimpleIcon)
    .map((icon) => [icon.slug.toLowerCase(), icon])
);

export function getSimpleIcon(slug: string): SimpleIcon | undefined {
  return SIMPLE_ICON_BY_SLUG.get(slug.toLowerCase());
}

export function getSimpleIconDataUrl(slug: string): string | undefined {
  const icon = getSimpleIcon(slug);
  if (!icon) return undefined;

  // Les icônes blanches (ex. Hashcat) deviennent invisibles sur une tuile claire.
  const fill = /^f{6}$/i.test(icon.hex) ? '64748B' : icon.hex;
  const coloredSvg = icon.svg.replace(
    /^<svg\b([^>]*)>/i,
    `<svg$1 fill="#${fill}">`
  );

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(coloredSvg)}`;
}

export const SIMPLE_ICON_COUNT = SIMPLE_ICON_BY_SLUG.size;
