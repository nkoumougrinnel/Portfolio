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

/**
 * Each orbit config maps to SKILL_CATEGORIES[i].
 * --orbit-r is read from CSS (set per breakpoint via .orbit-ring-N).
 * durationBase controls animation speed in seconds.
 * The CSS variables --orbit-r are defined in the .orbit-ring-N selectors,
 * so we only need the duration here.
 */
const ORBIT_DURATION = [28, 38, 48] as const; // seconds per category

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
                        transition={{ type: 'spring', bounce: 0.15, duration: 0.65 }}
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

// ─── Orbital view ─────────────────────────────────────────────────

interface OrbitalViewProps {
  onActivate: () => void;
}

const OrbitalView = memo(({ onActivate }: OrbitalViewProps) => (
  <motion.div
    className="atomic-system"
    exit={{ opacity: 0, transition: { duration: 0.4 } }}
  >
    {/*
      Circular hitbox sized to cover the outermost orbit.
      Uses pointer events (works on both mouse and touch/stylus).
    */}
    <div
      className="atomic-system-hitbox"
      onPointerEnter={onActivate}
    />

    {/* Glowing nucleus */}
    <div className="atomic-core-point" />

    {SKILL_CATEGORIES.map((category, categoryIndex) => {
      const duration = ORBIT_DURATION[categoryIndex];

      return (
        <div key={`orbit-${category.id}`} className="orbit-container">
          {/* Visible tilted ring */}
          <div className={`orbit-ring orbit-ring-${categoryIndex}`}>
            {category.skills.map((skill, skillIndex) => {
              /*
               * Distribute electrons evenly around the orbit by staggering
               * the animation delay. Negative delay starts the animation
               * partway through its cycle.
               */
              const delay = -((skillIndex / category.skills.length) * duration);

              return (
                <div
                  key={skill.name}
                  className="electron-wrapper"
                  style={{
                    '--orbit-duration': `${duration}s`,
                    '--orbit-delay': `${delay}s`,
                  } as React.CSSProperties}
                >
                  <div className="electron-arm">
                    {/*
                      layoutId links this element to its counterpart in the lane.
                      On activate, Framer Motion smoothly animates it there.
                    */}
                    <motion.div
                      layoutId={`skill-${skill.name}`}
                      className="electron-content"
                      transition={{ type: 'spring', bounce: 0.15, duration: 0.65 }}
                    >
                      <SkillCard
                        skill={skill}
                        isInteractiveCopy={false}
                        hasTooltip={false}
                        tooltipId=""
                        isOrdered={false}
                        activeTooltipId={null}
                        relatedProjects={[]}
                        onMouseEnter={() => {/* noop in orbit state */}}
                        onMouseLeave={() => {}}
                        onFocusCapture={() => {}}
                        onBlurCapture={() => {}}
                      />
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    })}
  </motion.div>
));
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
      marqueeTimer.current = setTimeout(() => setMarqueeRunning(true), 800);
    }
  }, [isOrdered, prefersReducedMotion]);

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
          <h2 className="skills-heading">
            {language === 'fr' ? 'Compétences' : 'Skills'}
          </h2>
        </div>

        <div className="skills-content-stage">
          {/* ── Orbital (chaos) state ── */}
          <AnimatePresence>
            {!isOrdered && (
              <OrbitalView onActivate={activate} />
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
