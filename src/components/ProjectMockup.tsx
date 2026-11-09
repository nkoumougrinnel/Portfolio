import React, { useRef, useState } from 'react';
import { Project } from '../types';

type Frame = NonNullable<Project['mockup']>;

interface ProjectMockupProps {
  project: Project;
  /** Active l'inclinaison 3D qui suit le pointeur. */
  tilt?: boolean;
  className?: string;
}

export const ProjectMockup: React.FC<ProjectMockupProps> = ({ project, tilt = true, className = '' }) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [tilting, setTilting] = useState(false);
  // Cadre choisi dans les données : phone (capture mobile), browser (web), window (appli desktop), photo (prototype).
  const frame: Frame = project.mockup ?? 'browser';

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!tilt || e.pointerType !== 'mouse' || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    stageRef.current.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`);
    stageRef.current.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`);
    if (!tilting) setTilting(true);
  };

  const handleLeave = () => {
    if (!stageRef.current) return;
    stageRef.current.style.setProperty('--ry', '0deg');
    stageRef.current.style.setProperty('--rx', '0deg');
    setTilting(false);
  };

  const img = (
    <img
      src={project.imageUrl}
      alt={project.title}
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );

  return (
    <div
      ref={stageRef}
      className={`mockup-stage ${className}`}
      data-frame={frame}
      data-tilting={tilting}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div className="mockup-tilt">
        {(frame === 'browser' || frame === 'window') && (
          <div className="mockup-browser">
            <div className="mockup-browser-bar" aria-hidden="true">
              <i /><i /><i />
              {frame === 'browser' && <span />}
            </div>
            {img}
          </div>
        )}
        {frame === 'phone' && (
          <>
            <div className="mockup-phone mockup-phone--ghost" aria-hidden="true">
              <img src={project.imageUrl} alt="" loading="lazy" draggable={false} />
            </div>
            <div className="mockup-phone">{img}</div>
          </>
        )}
        {frame === 'photo' && <div className="mockup-photo">{img}</div>}
      </div>
    </div>
  );
};
