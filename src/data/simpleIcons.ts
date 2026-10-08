import * as simpleIcons from 'simple-icons';
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
  Object.values(simpleIcons)
    .filter(isSimpleIcon)
    .map((icon) => [icon.slug.toLowerCase(), icon])
);

export function getSimpleIcon(slug: string): SimpleIcon | undefined {
  return SIMPLE_ICON_BY_SLUG.get(slug.toLowerCase());
}

export function getSimpleIconDataUrl(slug: string): string | undefined {
  const icon = getSimpleIcon(slug);
  if (!icon) return undefined;

  const coloredSvg = icon.svg.replace(
    /^<svg\b([^>]*)>/i,
    `<svg$1 fill="#${icon.hex}">`
  );

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(coloredSvg)}`;
}

export const SIMPLE_ICON_COUNT = SIMPLE_ICON_BY_SLUG.size;
