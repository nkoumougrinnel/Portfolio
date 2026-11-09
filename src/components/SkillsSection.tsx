import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion, motion, AnimatePresence } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Language, Project, SkillCategory, SkillItem } from '../types';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { getSimpleIconDataUrl } from '../data/simpleIcons';
import './SkillsSection.css';

// ─── Types ────────────────────────────────────────────────────────

interface SkillsSectionProps {
  language: Language;
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

interface ActiveTooltip {
  id: string;
  skill: SkillItem;
  relatedProjects: Project[];
  top: number;
  left: number;
}

// ─── Constants ────────────────────────────────────────────────────

const SKILLS_PER_MARQUEE_GROUP = 16;
const TOOLTIP_WIDTH = 224;


// ─── Module-level precomputed data (never changes) ─────────────────

function buildMarqueeSkills(category: SkillCategory): SkillItem[] {
  const result = [...category.skills];
  while (result.length < SKILLS_PER_MARQUEE_GROUP) result.push(...category.skills);
  return result;
}

const MARQUEE_DATA = SKILL_CATEGORIES.map(buildMarqueeSkills);

// ─── SkillCard ────────────────────────────────────────────────────

interface SkillCardProps {
  skill: SkillItem;
  isInteractiveCopy: boolean;
  hasTooltip: boolean;
  tooltipId: string;
  isOrdered: boolean;
  activeTooltipId: string | null;
  relatedProjects: Project[];
  onMouseEnter: (id: string, skill: SkillItem, projects: Project[], el: HTMLElement) => void;
  onMouseLeave: (id: string, relatedTarget: EventTarget | null) => void;
  onFocusCapture: (id: string, skill: SkillItem, projects: Project[], el: HTMLElement) => void;
  onBlurCapture: (id: string, relatedTarget: EventTarget | null) => void;
}

const SkillCard = memo(({
  skill,
  isInteractiveCopy,
  hasTooltip,
  tooltipId,
  isOrdered,
  activeTooltipId,
  relatedProjects,
  onMouseEnter,
  onMouseLeave,
  onFocusCapture,
  onBlurCapture,
}: SkillCardProps) => {
  // Only wire tooltip events when the lane is visible and interactive
  const tooltipEvents = hasTooltip && isOrdered
    ? {
        onMouseEnter: (e: React.MouseEvent<HTMLButtonElement>) =>
          onMouseEnter(tooltipId, skill, relatedProjects, e.currentTarget),
        onMouseLeave: (e: React.MouseEvent<HTMLButtonElement>) =>
          onMouseLeave(tooltipId, e.relatedTarget),
      }
    : {};

  const focusEvents = hasTooltip && isInteractiveCopy && isOrdered
    ? {
        onFocusCapture: (e: React.FocusEvent<HTMLButtonElement>) =>
          onFocusCapture(tooltipId, skill, relatedProjects, e.target as HTMLElement),
        onBlurCapture: (e: React.FocusEvent<HTMLButtonElement>) =>
          onBlurCapture(tooltipId, e.relatedTarget),
      }
    : {};

  return (
    <button
      type="button"
      tabIndex={isInteractiveCopy && isOrdered ? 0 : -1}
      aria-label={skill.name}
      aria-haspopup={hasTooltip && isInteractiveCopy && isOrdered ? 'true' : undefined}
      aria-expanded={isOrdered && activeTooltipId === tooltipId}
      className="skills-skill-button"
      {...tooltipEvents}
      {...focusEvents}
    >
      <span className="skills-icon-stage">
        <img
          src={getSimpleIconDataUrl(skill.icon)}
          alt=""
          loading="lazy"
          width="36"
          height="36"
          decoding="async"
          className="skills-icon-img"
        />
      </span>
      {/* Always render name in DOM to avoid layout shift; hide via CSS */}
      <span className={`skills-skill-name${isOrdered ? '' : ' hidden'}`}>
        {skill.name}
      </span>
    </button>
  );
});
SkillCard.displayName = 'SkillCard';

// ─── SkillLane ────────────────────────────────────────────────────

interface SkillLaneProps {
  category: SkillCategory;
  categoryIndex: number;
  marqueeSkills: SkillItem[];
  direction: 'left' | 'right';
  isPaused: boolean;
  isOrdered: boolean;
  isRunning: boolean; // computed outside to avoid recalc per-lane
  language: Language;
  activeTooltipId: string | null;
  projectsMap: Map<string, Project>;
  onMouseEnter: (id: string, skill: SkillItem, projects: Project[], el: HTMLElement) => void;
  onMouseLeave: (id: string, relatedTarget: EventTarget | null) => void;
  onFocusCapture: (id: string, skill: SkillItem, projects: Project[], el: HTMLElement) => void;
  onBlurCapture: (id: string, relatedTarget: EventTarget | null) => void;
}

const SkillLane = memo(({
  category,
  categoryIndex,
  marqueeSkills,
  direction,
  isPaused,
  isOrdered,
  isRunning,
  language,
  activeTooltipId,
  projectsMap,
  onMouseEnter,
  onMouseLeave,
  onFocusCapture,
  onBlurCapture,
}: SkillLaneProps) => {
  const isCybersecurity = category.id === 'cybersecurity';
  const laneTitle = isCybersecurity ? 'Cybersécurité' : category.title[language];

  return (
    <section
      aria-label={category.title[language]}
      className="skills-lane"
      data-direction={direction}
      data-paused={isPaused || undefined}
    >
      <div className="skills-lane-header">
        {isCybersecurity && (
          <span className="skills-lane-marker" aria-hidden="true">
            <span className="skills-lane-marker-dot" />
          </span>
        )}
        <h3 className="skills-lane-title">{laneTitle}</h3>
      </div>

      <div className="skills-marquee-viewport">
        <div
          className={`skills-marquee-track skills-marquee-${direction}`}
          style={{ animationPlayState: isRunning ? 'running' : 'paused' }}
        >
          {[0, 1].map((copy) => (
            <div
              key={copy}
              className="skills-marquee-group"
              aria-hidden={copy === 1 ? 'true' : undefined}
            >
              {marqueeSkills.map((skill, itemIndex) => {
                const skillIndex = itemIndex % category.skills.length;
                const relatedProjects = skill.relatedProjects
                  ? skill.relatedProjects.flatMap((id) => {
                      const p = projectsMap.get(id);
                      return p ? [p] : [];
                    })
                  : [];
                const hasTooltip = relatedProjects.length > 0 || Boolean(skill.context);
                const tooltipId = `${category.id}:${skill.name}:${skillIndex}`;

                // Only the first copy and first iteration of skills get a layoutId
                // AND only when isOrdered is true, to avoid conflicts with OrbitalView on page load.
                const hasLayoutId = copy === 0 && itemIndex < category.skills.length && isOrdered;

                const card = (
                  <SkillCard
                    skill={skill}
                    isInteractiveCopy={copy === 0}
                    hasTooltip={hasTooltip}
                    tooltipId={tooltipId}
                    isOrdered={isOrdered}
                    activeTooltipId={activeTooltipId}
                    relatedProjects={relatedProjects}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onFocusCapture={onFocusCapture}
                    onBlurCapture={onBlurCapture}
                  />
                );

                return (
                  <div key={`${copy}-${itemIndex}-${skill.name}`}>
                    {hasLayoutId ? (
                      <motion.div
                        layoutId={`skill-${skill.name}`}
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.85, delay: (categoryIndex * 6 + itemIndex) * 0.012 }}
                        style={{ borderRadius: 8 }}
                      >
                        {card}
                      </motion.div>
                    ) : (
                      card
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});
SkillLane.displayName = 'SkillLane';

// ─── Tooltip ──────────────────────────────────────────────────────

interface TooltipProps {
  tooltip: ActiveTooltip;
  language: Language;
  prefersReducedMotion: boolean | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocusCapture: () => void;
  onBlurCapture: (e: React.FocusEvent) => void;
  onSelectProject: (p: Project) => void;
  onClose: () => void;
}

const SkillTooltip = memo(({
  tooltip,
  language,
  prefersReducedMotion,
  onMouseEnter,
  onMouseLeave,
  onFocusCapture,
  onBlurCapture,
  onSelectProject,
  onClose,
}: TooltipProps) => (
  <div
    data-skill-tooltip={tooltip.id}
    role="group"
    aria-label={tooltip.skill.name}
    className={`skills-tooltip${prefersReducedMotion ? ' no-motion' : ''}`}
    style={{ top: tooltip.top, left: tooltip.left, width: TOOLTIP_WIDTH }}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
    onFocusCapture={onFocusCapture}
    onBlurCapture={onBlurCapture}
  >
    {tooltip.relatedProjects.length > 0 ? (
      <>
        <p className="skills-tooltip-label">
          {language === 'fr' ? 'Projets :' : 'Projects:'}
        </p>
        <div className="skills-tooltip-list">
          {tooltip.relatedProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => { onSelectProject(project); onClose(); }}
              className="skills-tooltip-link"
            >
              <ArrowRight className="skills-tooltip-arrow" />
              {project.title}
            </button>
          ))}
        </div>
      </>
    ) : tooltip.skill.context ? (
      <>
        <p className="skills-tooltip-label">
          {language === 'fr' ? 'Utilisé dans :' : 'Used in:'}
        </p>
        <p className="skills-tooltip-context">{tooltip.skill.context[language]}</p>
      </>
    ) : null}
  </div>
));
SkillTooltip.displayName = 'SkillTooltip';

// ─── Orbital view (atome 3D) ──────────────────────────────────────
//
// Chaque compétence est un électron sur une orbite inclinée dans l'espace.
// Les positions sont calculées en 3D puis projetées en perspective à chaque
// frame : l'icône reste face à l'écran, sa taille et son opacité traduisent
// la profondeur, et tout l'atome tourne lentement (et suit la souris).

interface OrbitalViewProps {
  onActivate: () => void;
  hint: string;
}

/** Plans des orbites : symbole atomique classique (3 ellipses à 60°). */
const ORBITS = [
  { inc: 72, node: 0, speed: 0.22, color: 'var(--color-accent)' },
  { inc: 72, node: 60, speed: -0.17, color: '#14b8a6' },
  { inc: 72, node: 120, speed: 0.13, color: '#a855f7' },
] as const;
/** Rayon relatif (par rapport au demi-côté de la scène), du plus petit au plus grand. */
const RADII = [0.6, 0.8, 0.98];
const FOCAL = 950;
const DEG = Math.PI / 180;

// Les catégories les plus fournies vont sur les orbites les plus larges.
const ORBIT_ORDER = SKILL_CATEGORIES
  .map((c, i) => ({ i, n: c.skills.length }))
  .sort((a, b) => a.n - b.n)
  .map((x) => x.i);

type Projected = { x: number; y: number; z: number; s: number };

function project(
  r: number, theta: number, inc: number, node: number, yaw: number, pitch: number,
): Projected {
  // Point sur l'orbite (plan XY), puis inclinaison autour de X.
  const x0 = r * Math.cos(theta);
  const y0 = r * Math.sin(theta);
  const y1 = y0 * Math.cos(inc);
  const z1 = y0 * Math.sin(inc);
  // Rotation du plan autour de l'axe de vue (Z).
  const x2 = x0 * Math.cos(node) - y1 * Math.sin(node);
  const y2 = x0 * Math.sin(node) + y1 * Math.cos(node);
  // Rotation globale : lacet (Y) puis tangage (X).
  const x3 = x2 * Math.cos(yaw) + z1 * Math.sin(yaw);
  const z3 = -x2 * Math.sin(yaw) + z1 * Math.cos(yaw);
  const y4 = y2 * Math.cos(pitch) - z3 * Math.sin(pitch);
  const z4 = y2 * Math.sin(pitch) + z3 * Math.cos(pitch);
  const s = FOCAL / (FOCAL - z4);
  return { x: x3 * s, y: y4 * s, z: z4, s };
}

const OrbitalView = memo(({ onActivate, hint }: OrbitalViewProps) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const electronRefs = useRef<(HTMLDivElement | null)[][]>(SKILL_CATEGORIES.map(() => []));
  const ringRefs = useRef<(SVGPathElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);
  const reduceMotion = useReducedMotion();

  // État d'animation mutable (pas de re-render à chaque frame).
  const anim = useRef({
    t: 0, last: 0, size: 520,
    yaw: 0, pitch: -0.18, targetPitch: -0.18, yawBoost: 0, hover: false, speed: 1,
  });

  const draw = useCallback(() => {
    const a = anim.current;
    const half = a.size / 2;
    // Électrons plus petits quand la scène est étroite (mobile).
    const k = Math.max(0.55, Math.min(1, a.size / 560));
    SKILL_CATEGORIES.forEach((category, ci) => {
      const o = ORBITS[ci % ORBITS.length];
      const r = RADII[ORBIT_ORDER.indexOf(ci)] * half;
      const inc = o.inc * DEG;
      const node = o.node * DEG;
      const yaw = a.yaw + a.yawBoost;

      // Anneau : polyligne projetée.
      const ring = ringRefs.current[ci];
      if (ring) {
        let d = '';
        for (let k = 0; k <= 72; k++) {
          const p = project(r, (k / 72) * Math.PI * 2, inc, node, yaw, a.pitch);
          d += `${k ? 'L' : 'M'}${(p.x + half).toFixed(1)} ${(p.y + half).toFixed(1)}`;
        }
        ring.setAttribute('d', d);
      }

      // Électrons.
      const n = category.skills.length;
      category.skills.forEach((_, si) => {
        const el = electronRefs.current[ci][si];
        if (!el) return;
        const theta = a.t * o.speed + (si / n) * Math.PI * 2;
        const p = project(r, theta, inc, node, yaw, a.pitch);
        const depth = (p.z / r + 1) / 2; // 0 = derrière, 1 = devant
        el.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) scale(${((0.62 + p.s * 0.32) * k).toFixed(3)})`;
        el.style.opacity = (0.28 + depth * 0.72).toFixed(2);
        el.style.zIndex = String(Math.round(1000 + p.z));
      });
    });
  }, []);

  // Taille de la scène.
  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const update = () => {
      const rect = node.getBoundingClientRect();
      anim.current.size = Math.min(rect.width * 0.88, rect.height * 0.96);
      if (svgRef.current) {
        svgRef.current.setAttribute('viewBox', `0 0 ${anim.current.size} ${anim.current.size}`);
        svgRef.current.style.width = `${anim.current.size}px`;
        svgRef.current.style.height = `${anim.current.size}px`;
      }
      draw();
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(node);
    return () => ro.disconnect();
  }, [draw]);

  // Boucle d'animation.
  useEffect(() => {
    if (reduceMotion) { draw(); return; }
    let raf = 0;
    const loop = (now: number) => {
      const a = anim.current;
      const dt = a.last ? Math.min(0.05, (now - a.last) / 1000) : 0;
      a.last = now;
      a.speed += ((a.hover ? 2.2 : 1) - a.speed) * 0.06;
      a.t += dt * a.speed;
      a.yaw += dt * 0.12 * a.speed;
      a.pitch += (a.targetPitch - a.pitch) * 0.06;
      draw();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [draw, reduceMotion]);

  const handlePointerMove = (e: React.PointerEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    anim.current.targetPitch = -0.18 + ny * 0.7;
    anim.current.yawBoost += (nx * 0.6 - anim.current.yawBoost) * 0.1;
  };

  return (
    <motion.div
      ref={stageRef}
      className="atomic-system"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
    >
      <div
        className="atomic-system-hitbox"
        role="button"
        tabIndex={0}
        aria-label={hint}
        onPointerEnter={() => { anim.current.hover = true; }}
        onPointerLeave={() => { anim.current.hover = false; anim.current.targetPitch = -0.18; }}
        onPointerMove={handlePointerMove}
        onClick={onActivate}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onActivate(); } }}
      />

      <svg ref={svgRef} className="atomic-rings" aria-hidden="true">
        {SKILL_CATEGORIES.map((c, ci) => (
          <path
            key={c.id}
            ref={(el) => { ringRefs.current[ci] = el; }}
            stroke={ORBITS[ci % ORBITS.length].color}
          />
        ))}
      </svg>

      <div className="atomic-nucleus" aria-hidden="true">
        <span /><span /><span /><span />
      </div>

      {SKILL_CATEGORIES.map((category, ci) =>
        category.skills.map((skill, si) => (
          <div
            key={`${category.id}-${skill.name}`}
            ref={(el) => { electronRefs.current[ci][si] = el; }}
            className="atomic-electron"
          >
            <motion.div
              layoutId={`skill-${skill.name}`}
              transition={{ type: 'spring', bounce: 0.18, duration: 0.85, delay: (ci * 6 + si) * 0.012 }}
              className="electron-content"
            >
              <SkillCard
                skill={skill}
                isInteractiveCopy={false}
                hasTooltip={false}
                tooltipId=""
                isOrdered={false}
                activeTooltipId={null}
                relatedProjects={[]}
                onMouseEnter={() => {}}
                onMouseLeave={() => {}}
                onFocusCapture={() => {}}
                onBlurCapture={() => {}}
              />
            </motion.div>
          </div>
        )),
      )}

      <button type="button" className="atomic-hint" onClick={onActivate}>
        <span aria-hidden="true">›</span> {hint}
      </button>
    </motion.div>
  );
});
OrbitalView.displayName = 'OrbitalView';

// ─── Main component ───────────────────────────────────────────────

export const SkillsSection: React.FC<SkillsSectionProps> = ({
  language,
  projects,
  onSelectProject,
}) => {
  const [isOrdered, setIsOrdered] = useState(false);
  /*
   * Delay marquee start so it doesn't compete with Framer Motion layout
   * animations, which would cause visible jumps.
   */
  const [marqueeRunning, setMarqueeRunning] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const [activeTooltip, setActiveTooltip] = useState<ActiveTooltip | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const closeTooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const marqueeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // O(1) lookup — rebuilt only when projects prop changes
  const projectsMap = useMemo(
    () => new Map(projects.map((p) => [p.id, p])),
    [projects],
  );

  const pausedCategory = activeTooltip ? activeTooltip.id.split(':')[0] : null;

  // ── Activation ─────────────────────────────────────────────────

  const activate = useCallback(() => {
    if (isOrdered) return;
    setIsOrdered(true);

    if (prefersReducedMotion) {
      // Skip animation delay for users who prefer reduced motion
      setMarqueeRunning(true);
    } else {
      // Wait for layout animation to complete before scrolling
      marqueeTimer.current = setTimeout(() => setMarqueeRunning(true), 1400);
    }
  }, [isOrdered, prefersReducedMotion]);

  const deactivate = useCallback(() => {
    if (marqueeTimer.current) clearTimeout(marqueeTimer.current);
    setActiveTooltip(null);
    setMarqueeRunning(false);
    setIsOrdered(false);
  }, []);

  // ── Tooltip helpers ────────────────────────────────────────────

  const cancelTooltipClose = useCallback(() => {
    if (closeTooltipTimer.current) {
      clearTimeout(closeTooltipTimer.current);
      closeTooltipTimer.current = null;
    }
  }, []);

  const scheduleTooltipClose = useCallback(() => {
    if (closeTooltipTimer.current) clearTimeout(closeTooltipTimer.current);
    closeTooltipTimer.current = setTimeout(() => setActiveTooltip(null), 140);
  }, []);

  const openTooltip = useCallback((
    id: string,
    skill: SkillItem,
    relatedProjects: Project[],
    target: HTMLElement,
  ) => {
    if (!relatedProjects.length && !skill.context) return;
    cancelTooltipClose();

    const rect = target.getBoundingClientRect();
    const estimatedHeight = Math.min(260, 48 + relatedProjects.length * 26);
    const above = rect.top - estimatedHeight - 10;
    const top = above > 8
      ? above
      : Math.min(window.innerHeight - estimatedHeight - 8, rect.bottom + 10);
    const left = Math.max(
      8,
      Math.min(rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2, window.innerWidth - TOOLTIP_WIDTH - 8),
    );

    setActiveTooltip({ id, skill, relatedProjects, top: Math.max(8, top), left });
  }, [cancelTooltipClose]);

  const handleCardMouseLeave = useCallback((id: string, relatedTarget: EventTarget | null) => {
    if (relatedTarget instanceof Element && relatedTarget.closest(`[data-skill-tooltip="${id}"]`)) return;
    scheduleTooltipClose();
  }, [scheduleTooltipClose]);

  const handleCardBlur = useCallback((id: string, relatedTarget: EventTarget | null) => {
    if (relatedTarget instanceof Element && relatedTarget.closest(`[data-skill-tooltip="${id}"]`)) return;
    scheduleTooltipClose();
  }, [scheduleTooltipClose]);

  const handleTooltipBlur = useCallback((e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node | null)) scheduleTooltipClose();
  }, [scheduleTooltipClose]);

  const closeTooltip = useCallback(() => setActiveTooltip(null), []);

  // ── Intersection Observer (pause marquee when off-screen) ──────

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => setIsInView(entries[0].isIntersecting),
      { rootMargin: '200px' },
    );

    observer.observe(sectionRef.current);

    return () => {
      observer.disconnect();
      if (closeTooltipTimer.current) clearTimeout(closeTooltipTimer.current);
      if (marqueeTimer.current) clearTimeout(marqueeTimer.current);
    };
  }, []);

  // ── Computed marquee state ─────────────────────────────────────

  const marqueeCanRun = marqueeRunning && !prefersReducedMotion && isInView;

  // ── Render ─────────────────────────────────────────────────────

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="skills-experience-section skills-section"
    >
      <div className="skills-inner">
        <div className="skills-heading-row">
          <span className="section-eyebrow">05 <span aria-hidden="true">/</span> stack</span>
          <h2 className="section-title">
            {language === 'fr' ? 'Stack technique' : 'Tech stack'}
          </h2>
        </div>

        <div className="skills-content-stage">
          {/* ── Orbital (chaos) state ── */}
          <AnimatePresence>
            {!isOrdered && (
              <OrbitalView
                onActivate={activate}
                hint={language === 'fr' ? 'cliquer sur l’atome pour ranger la stack' : 'click the atom to sort the stack'}
              />
            )}
          </AnimatePresence>

          {/* ── Lane (ordered) state ── */}
          {/*
            Always mounted so Framer Motion layoutId targets are always present
            in the DOM for the FLIP animation to work correctly.
            Visibility and pointer-events are controlled via inline style.
          */}
          <div
            className="skills-conveyor-content"
            style={{
              opacity: isOrdered ? 1 : 0,
              pointerEvents: isOrdered ? 'auto' : 'none',
              // The CSS transition has a 0.3s delay (see stylesheet) so
              // it reveals AFTER the layout animation starts.
            }}
          >
            <button type="button" className="skills-back" onClick={deactivate} tabIndex={isOrdered ? 0 : -1}>
              <span aria-hidden="true">↺</span> {language === 'fr' ? 'vue atome' : 'atom view'}
            </button>
            <div className="skills-lanes-stack">
              {SKILL_CATEGORIES.map((category, categoryIndex) => (
                <SkillLane
                  key={category.id}
                  category={category}
                  categoryIndex={categoryIndex}
                  marqueeSkills={MARQUEE_DATA[categoryIndex]}
                  direction={categoryIndex % 2 === 0 ? 'left' : 'right'}
                  isPaused={pausedCategory === category.id}
                  isOrdered={isOrdered}
                  isRunning={marqueeCanRun}
                  language={language}
                  activeTooltipId={activeTooltip?.id ?? null}
                  projectsMap={projectsMap}
                  onMouseEnter={openTooltip}
                  onMouseLeave={handleCardMouseLeave}
                  onFocusCapture={openTooltip}
                  onBlurCapture={handleCardBlur}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeTooltip && createPortal(
        <SkillTooltip
          key={activeTooltip.id}
          tooltip={activeTooltip}
          language={language}
          prefersReducedMotion={prefersReducedMotion}
          onMouseEnter={cancelTooltipClose}
          onMouseLeave={scheduleTooltipClose}
          onFocusCapture={cancelTooltipClose}
          onBlurCapture={handleTooltipBlur}
          onSelectProject={onSelectProject}
          onClose={closeTooltip}
        />,
        document.body,
      )}
    </section>
  );
};
