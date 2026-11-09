import React from 'react';
import { Award, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';
import { CertificationItem, Language, Project } from '../types';
import { ModalMedia, ModalSection, ModalShell, ModalText, PhotoGrid, RelatedProjects, TagList } from './ModalKit';

interface CertificationModalProps {
  certification: CertificationItem | null;
  language: Language;
  certificateImageUrl: string;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onClose: () => void;
}

const KIND_LABELS = {
  official: { fr: 'certification', en: 'certification' },
  participation: { fr: 'participation', en: 'participation' },
  completion: { fr: 'cours en ligne', en: 'online course' },
} as const;

export const CertificationModal: React.FC<CertificationModalProps> = ({
  certification,
  language,
  certificateImageUrl,
  projects,
  onSelectProject,
  onClose,
}) => {
  if (!certification) return null;

  const fr = language === 'fr';
  const related = (certification.relatedProjectIds ?? [])
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));
  const photos = (certification.momentPhotos ?? []).map((photo) =>
    typeof photo === 'string' ? { src: photo } : { src: photo.src, caption: photo.label?.[language] },
  );
  const title = certification.title[language];

  return (
    <ModalShell
      open
      onClose={onClose}
      language={language}
      eyebrow={KIND_LABELS[certification.kind][language]}
      title={title}
      meta={
        <>
          <span className="meta meta-accent"><Award />{certification.issuer[language]}</span>
          <span className="meta"><Calendar />{certification.period}</span>
          {certification.duration && <span className="tag">{certification.duration}</span>}
        </>
      }
    >
      <ModalMedia src={certificateImageUrl} alt={title} language={language} contain />

      <ModalSection title={fr ? 'À propos' : 'About'}>
        <ModalText>{certification.description[language]}</ModalText>
      </ModalSection>

      {certification.skills && certification.skills.length > 0 && (
        <ModalSection title={fr ? 'Compétences acquises' : 'Skills gained'}>
          <TagList items={certification.skills} />
        </ModalSection>
      )}

      {related.length > 0 && (
        <ModalSection
          title={certification.relatedProjectsContext?.[language] ?? (fr ? 'Projets liés' : 'Related projects')}
          count={related.length > 1 ? related.length : undefined}
        >
          <RelatedProjects projects={related} language={language} onSelect={onSelectProject} />
        </ModalSection>
      )}

      {certification.verifyUrl && (
        <ModalSection title={fr ? 'Vérification' : 'Verification'}>
          <a href={certification.verifyUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
            <ShieldCheck />
            {fr ? 'Vérifier le certificat' : 'Verify certificate'}
            <ExternalLink />
          </a>
        </ModalSection>
      )}

      {photos.length > 0 && (
        <ModalSection title={fr ? "Photos de l'événement" : 'Event photos'}>
          <PhotoGrid photos={photos} alt={title} />
        </ModalSection>
      )}
    </ModalShell>
  );
};
