import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { Language, Project, SkillCategory, SkillItem } from '../types';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import './SkillsSection.css';

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

const SKILLS_PER_MARQUEE_GROUP = 16;
const TOOLTIP_WIDTH = 224;

// Pre-compute at module level — pure functions, never change
function buildMarqueeSkills(category: SkillCategory): SkillItem[] {
  const result = [...category.skills];
  while (result.length < SKILLS_PER_MARQUEE_GROUP) result.push(...category.skills);
  return result;
}

// Cloud icons orbit the shared center on staggered radii and phases.
function buildCloudStyles(total: number): React.CSSProperties[] {
  return Array.from({ length: total }, (_, index) => {
    const orbitRadius = 2.5 + ((index * 7) % 8) * 1.25;
    return {
      ['--orbit-radius' as string]: `${orbitRadius}rem`,
      ['--orbit-duration' as string]: `${24 + (index % 5) * 4}s`,
      animationDelay: `${-(index / Math.max(1, total)) * 28}s`,
      opacity: 0.55 + ((total - index) % 5) * 0.08,
    };
  });
}

// Pre-compute marquee data and cloud styles once at module level
const MARQUEE_DATA = SKILL_CATEGORIES.map((cat) => buildMarqueeSkills(cat));
const ALL_SKILLS = SKILL_CATEGORIES.flatMap((cat) => cat.skills);
const CLOUD_STYLES = buildCloudStyles(ALL_SKILLS.length);

// --- Sub-components (memoized to avoid re-renders) ---

interface SkillCardProps {
  skill: SkillItem;
  itemIndex: number;
  categoryIndex: number;
  skillIndex: number;
  isInteractiveCopy: boolean;
  hasTooltip: boolean;
  tooltipId: string;
  hasStarted: boolean;
  activeTooltipId: string | null;
  relatedProjects: Project[];
  onMouseEnter: (id: string, skill: SkillItem, projects: Project[], el: HTMLElement) => void;
  onMouseLeave: (id: string, relatedTarget: EventTarget | null) => void;
  onFocusCapture: (id: string, skill: SkillItem, projects: Project[], el: HTMLElement) => void;
  onBlurCapture: (id: string, relatedTarget: EventTarget | null) => void;
}

const SkillCard = memo(({
  skill,
  itemIndex,
  categoryIndex,
  skillIndex,
  isInteractiveCopy,
  hasTooltip,
  tooltipId,
  hasStarted,
  activeTooltipId,
  relatedProjects,
  onMouseEnter,
  onMouseLeave,
  onFocusCapture,
  onBlurCapture,
}: SkillCardProps) => {
  const scatterX = ((skillIndex * 37 + categoryIndex * 29) % 150) - 75;
  const scatterY = ((skillIndex * 23 + categoryIndex * 17) % 90) - 45;
  const scatterRotation = ((skillIndex * 13 + categoryIndex * 11) % 36) - 18;
  const delay = categoryIndex * 0.09 + skillIndex * 0.025;

  return (
    <div
      className="skills-marquee-item"
      data-started={hasStarted || undefined}
      style={{
        '--scatter-x': `${scatterX}px`,
        '--scatter-y': `${scatterY}px`,
        '--scatter-r': `${scatterRotation}deg`,
        '--enter-delay': `${delay}s`,
      } as React.CSSProperties}
      onMouseEnter={hasTooltip ? (e) => onMouseEnter(tooltipId, skill, relatedProjects, e.currentTarget) : undefined}
      onMouseLeave={hasTooltip ? (e) => onMouseLeave(tooltipId, e.relatedTarget) : undefined}
      onFocusCapture={hasTooltip && isInteractiveCopy ? (e) => onFocusCapture(tooltipId, skill, relatedProjects, e.target as HTMLElement) : undefined}
      onBlurCapture={hasTooltip && isInteractiveCopy ? (e) => onBlurCapture(tooltipId, e.relatedTarget) : undefined}
    >
      <button
        type="button"
        tabIndex={isInteractiveCopy ? 0 : -1}
        aria-label={skill.name}
        aria-haspopup={hasTooltip && isInteractiveCopy ? 'true' : undefined}
        aria-expanded={activeTooltipId === tooltipId}
        className="skills-skill-button"
      >
        <span className="skills-icon-stage">
          <img
            src={`https://cdn.simpleicons.org/${skill.icon}`}
            alt=""
            loading="lazy"
            width="36"
            height="36"
            decoding="async"
            className="skills-icon-img"
            onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
          />
        </span>
        <span className={`skills-skill-name${hasStarted ? ' is-visible' : ''}`}>
          {skill.name}
        </span>
      </button>
    </div>
  );
});
SkillCard.displayName = 'SkillCard';

interface SkillLaneProps {
  category: SkillCategory;
  categoryIndex: number;
  marqueeSkills: SkillItem[];
  direction: 'left' | 'right';
  isPaused: boolean;
  isSettled: boolean;
  hasStarted: boolean;
  prefersReducedMotion: boolean | null;
  language: Language;
  activeTooltipId: string | null;
  projectsMap: Map<string, Project>;
  isInView: boolean;
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
  isSettled,
  hasStarted,
  prefersReducedMotion,
  language,
  activeTooltipId,
  projectsMap,
  isInView,
  onMouseEnter,
  onMouseLeave,
  onFocusCapture,
  onBlurCapture,
}: SkillLaneProps) => {
  const isRunning = isSettled && !prefersReducedMotion && isInView;

  return (
    <section
      aria-label={category.title[language]}
      className="skills-lane"
      data-direction={direction}
      data-paused={isPaused}
    >
      <div className="skills-lane-header">
        <h3 className="skills-lane-title">{category.title[language]}</h3>
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

                return (
                  <SkillCard
                    key={`${copy}-${itemIndex}-${skill.name}`}
                    skill={skill}
                    itemIndex={itemIndex}
                    categoryIndex={categoryIndex}
                    skillIndex={skillIndex}
                    isInteractiveCopy={copy === 0}
                    hasTooltip={hasTooltip}
                    tooltipId={tooltipId}
                    hasStarted={hasStarted}
                    activeTooltipId={activeTooltipId}
                    relatedProjects={relatedProjects}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onFocusCapture={onFocusCapture}
                    onBlurCapture={onBlurCapture}
                  />
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

// --- Main component ---

export const SkillsSection: React.FC<SkillsSectionProps> = ({ language, projects, onSelectProject }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [isInView, setIsInView] = useState(true); // Default to true to prevent initial jump
  const [activeTooltip, setActiveTooltip] = useState<ActiveTooltip | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const closeTooltipTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const settledTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prefersReducedMotion = useReducedMotion();

  // O(1) project lookup — rebuild only when projects change
  const projectsMap = useMemo(
    () => new Map(projects.map((p) => [p.id, p])),
    [projects],
  );

  const pausedCategory = activeTooltip ? activeTooltip.id.split(':')[0] : null;

  const startExperience = useCallback(() => {
    setHasStarted((prev) => {
      if (!prev) {
        settledTimer.current = setTimeout(() => setIsSettled(true), 1200);
        return true;
      }
      return prev;
    });
  }, []);

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
    if (closeTooltipTimer.current) { clearTimeout(closeTooltipTimer.current); closeTooltipTimer.current = null; }

    const rect = target.getBoundingClientRect();
    const estimatedHeight = Math.min(260, 48 + relatedProjects.length * 26);
    const above = rect.top - estimatedHeight - 10;
    const top = above > 8 ? above : Math.min(window.innerHeight - estimatedHeight - 8, rect.bottom + 10);
    const left = Math.max(8, Math.min(rect.left + rect.width / 2 - TOOLTIP_WIDTH / 2, window.innerWidth - TOOLTIP_WIDTH - 8));
    setActiveTooltip({ id, skill, relatedProjects, top: Math.max(8, top), left });
  }, []);

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

  useEffect(() => {
    if (!sectionRef.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        setIsInView(entries[0].isIntersecting);
      },
      { rootMargin: '200px' } // Pre-load slightly before coming into view
    );
    
    observer.observe(sectionRef.current);
    
    return () => {
      observer.disconnect();
      if (closeTooltipTimer.current) clearTimeout(closeTooltipTimer.current);
      if (settledTimer.current) clearTimeout(settledTimer.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="skills-experience-section skills-section"
      data-started={hasStarted}
    >
      <div className="skills-inner">
        <div className="skills-heading-row">
          <h2 className="skills-heading">
            {language === 'fr' ? 'Compétences' : 'Skills'}
          </h2>
        </div>

        <div
          className="skills-content-stage"
          onMouseEnter={startExperience}
          onTouchStart={startExperience}
          onFocusCapture={startExperience}
        >
          {/* Skills orbit individually until the cloud disperses. */}
          <div aria-hidden="true" className="skills-chaos-cloud">
            <div className="skills-chaos-orbit">
              {ALL_SKILLS.map((skill, index) => (
                <img
                  key={skill.name}
                  src={`https://cdn.simpleicons.org/${skill.icon}`}
                  alt=""
                  loading="lazy"
                  width="26"
                  height="26"
                  decoding="async"
                  className="skills-chaos-icon"
                  style={CLOUD_STYLES[index]}
                  onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                />
              ))}
            </div>
          </div>

          <div className="skills-conveyor-content">
            <div className="skills-lanes-stack">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] mb-3">
                {language === 'fr' ? 'Fondations Techniques' : 'Engineering Foundation'}
              </h3>
              {SKILL_CATEGORIES.map((category, categoryIndex) => (
                <>
                  {category.id === 'cybersecurity' && (
                    <div
                      key={`separator-${category.id}`}
                      className="border-t border-[var(--color-border)]/50 my-6 pt-6"
                    >
                      <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)] mb-3">
                        {language === 'fr'
                          ? 'Cybersécurité — Spécialisation en cours'
                          : 'Cybersecurity — Current Focus'}
                      </h3>
                    </div>
                  )}
                  <SkillLane
                    key={category.id}
                    category={category}
                    categoryIndex={categoryIndex}
                    marqueeSkills={MARQUEE_DATA[categoryIndex]}
                    direction={categoryIndex % 2 === 0 ? 'left' : 'right'}
                    isPaused={pausedCategory === category.id}
                    isSettled={isSettled}
                    hasStarted={hasStarted}
                    prefersReducedMotion={prefersReducedMotion}
                    language={language}
                    activeTooltipId={activeTooltip?.id ?? null}
                    projectsMap={projectsMap}
                    isInView={isInView}
                    onMouseEnter={openTooltip}
                    onMouseLeave={handleCardMouseLeave}
                    onFocusCapture={openTooltip}
                    onBlurCapture={handleCardBlur}
                  />
                </>
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
