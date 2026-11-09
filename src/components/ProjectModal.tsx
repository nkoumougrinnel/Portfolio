import React from 'react';
import { ExternalLink, Github, Globe } from 'lucide-react';
import { Language, Project } from '../types';
import { ProjectMockup } from './ProjectMockup';
import { BulletList, EnlargeButton, ModalSection, ModalShell, ModalText, PhotoGrid, TagList } from './ModalKit';

interface ProjectModalProps {
  project: Project | null;
  language: Language;
  onClose: () => void;
}

function linkIcon(label: string) {
  const l = label.toLowerCase();
  if (l.includes('github')) return <Github />;
  if (l.includes('demo') || l.includes('démo') || l.includes('live') || l.includes('site')) return <Globe />;
  return <ExternalLink />;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, language, onClose }) => {
  if (!project) return null;

  const fr = language === 'fr';
  const gallery = [...new Set(project.gallery ?? project.screenshots ?? [])].filter((image) => image !== project.imageUrl);
  const video = project.videos?.[0];
  const features = project.features?.[language] ?? [];
  const links = [
    ...(project.links ?? []).filter((link) => Boolean(link.url) && !link.placeholder),
    ...(project.github && !project.links?.some((link) => link.url === project.github) ? [{ label: 'GitHub', url: project.github }] : []),
    ...(project.link && !project.links?.some((link) => link.url === project.link)
      ? [{ label: fr ? 'Démo en ligne' : 'Live demo', url: project.link }]
      : []),
  ];

  return (
    <ModalShell
      open
      onClose={onClose}
      language={language}
      eyebrow={fr ? 'projet' : 'project'}
      title={project.title}
      meta={
        <>
          {project.context && <span className="meta meta-accent">{project.context[language]}</span>}
          {project.period && <span className="meta">{project.period}</span>}
        </>
      }
    >
      <div className="relative">
        <ProjectMockup project={project} />
        <EnlargeButton src={project.imageUrl} alt={project.title} language={language} />
      </div>

      <ModalSection title={fr ? 'Présentation' : 'Overview'}>
        <div className="space-y-3">
          <ModalText>{project.description[language]}</ModalText>
          {project.longDescription && <ModalText>{project.longDescription[language]}</ModalText>}
        </div>
      </ModalSection>

      {project.role && !project.draftDetails && (
        <ModalSection title={fr ? 'Mon rôle' : 'My role'}>
          <ModalText>{project.role[language]}</ModalText>
        </ModalSection>
      )}

      {features.length > 0 && (
        <ModalSection title={fr ? 'Fonctionnalités clés' : 'Key features'}>
          <BulletList items={features} />
        </ModalSection>
      )}

      {project.architectureNotes && (
        <ModalSection title={fr ? 'Architecture' : 'Architecture'}>
          <ModalText>{project.architectureNotes[language]}</ModalText>
        </ModalSection>
      )}

      <ModalSection title={fr ? 'Technologies' : 'Tech stack'}>
        <TagList items={project.tags} />
      </ModalSection>

      {gallery.length > 0 && (
        <ModalSection title={fr ? 'Captures' : 'Screenshots'}>
          <PhotoGrid photos={gallery.map((src) => ({ src }))} alt={project.title} />
        </ModalSection>
      )}

      {video && (
        <ModalSection title={fr ? 'Vidéo' : 'Video'}>
          <video src={video} controls preload="metadata" className="aspect-video w-full rounded-xl bg-black" />
        </ModalSection>
      )}

      {links.length > 0 && (
        <ModalSection title={fr ? 'Liens' : 'Links'}>
          <div className="flex flex-wrap gap-3">
            {links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer" className="btn btn-secondary">
                {linkIcon(link.label)}
                {link.label}
              </a>
            ))}
          </div>
        </ModalSection>
      )}
    </ModalShell>
  );
};
