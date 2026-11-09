import React from 'react';
import { getSimpleIcon } from '../data/simpleIcons';

// Logos absents de simple-icons (LinkedIn a été retiré du paquet).
const EXTRA_PATHS: Record<string, string> = {
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  shield: 'M12 1 3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-1.4 15.2-4.2-4.2 1.4-1.4 2.8 2.8 5.8-5.8 1.4 1.4-7.2 7.2z',
};

interface BrandMarkProps {
  slug?: string;
  color?: string;
  className?: string;
}

/** Logo de marque en SVG plein (simple-icons ou chemin de secours). */
export const BrandMark: React.FC<BrandMarkProps> = ({ slug, color, className }) => {
  const icon = slug ? getSimpleIcon(slug) : undefined;
  const path = icon?.path ?? (slug && EXTRA_PATHS[slug]) ?? EXTRA_PATHS.shield;
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill={color ?? 'currentColor'}>
      <path d={path} />
    </svg>
  );
};
