import React from 'react';
import { Calendar } from 'lucide-react';
import { Language, ActivityItem, Project } from '../types';
import { localizePeriod } from '../data/site';
import { BulletList, ModalMedia, ModalSection, ModalShell, ModalText, PhotoGrid, RelatedProjects } from './ModalKit';

interface ActivityModalProps {
  activity: ActivityItem | null;
  language: Language;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onClose: () => void;
}

const CATEGORY_LABELS = {
  competition: { fr: 'compétition', en: 'competition' },
  leadership: { fr: 'leadership', en: 'leadership' },
  learning: { fr: 'apprentissage', en: 'learning' },
  community: { fr: 'communauté', en: 'community' },
} as const;

export const ActivityModal: React.FC<ActivityModalProps> = ({ activity, language, projects, onSelectProject, onClose }) => {
  if (!activity) return null;

  const fr = language === 'fr';
  const photos = [...new Set(activity.momentPhotos ?? [])].filter((photo) => photo !== activity.imageUrl);
  const related = (activity.relatedProjectIds ?? [])
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));
  const highlights = activity.highlights?.[language] ?? [];
  const category = activity.categories[0];

  return (
    <ModalShell
      open
      onClose={onClose}
      language={language}
      eyebrow={`${fr ? 'activité' : 'activity'}${category ? ` · ${CATEGORY_LABELS[category][language]}` : ''}`}
      title={activity.title}
      meta={
        <span className="meta">
          <Calendar />
          {localizePeriod(activity.year.replace('present', 'Present'), language)}
        </span>
      }
    >
      <ModalMedia src={activity.imageUrl} alt={activity.title} language={language} />

      <ModalSection title={fr ? 'À propos' : 'About'}>
        <ModalText>{activity.details?.[language] || activity.description[language]}</ModalText>
      </ModalSection>

      {activity.role && (
        <ModalSection title={fr ? 'Mon rôle' : 'My role'}>
          <ModalText>{activity.role[language]}</ModalText>
        </ModalSection>
      )}

      {highlights.length > 0 && (
        <ModalSection title={fr ? 'Points clés' : 'Highlights'}>
          <BulletList items={highlights} />
        </ModalSection>
      )}

      {related.length > 0 && (
        <ModalSection title={fr ? 'Projet lié' : 'Related project'}>
          <RelatedProjects projects={related} language={language} onSelect={onSelectProject} />
        </ModalSection>
      )}

      {(photos.length > 0 || activity.certificateImageUrl) && (
        <ModalSection title={fr ? 'Photos & attestation' : 'Photos & certificate'}>
          <PhotoGrid
            alt={activity.title}
            photos={[
              ...photos.map((src) => ({ src })),
              ...(activity.certificateImageUrl
                ? [{ src: activity.certificateImageUrl, caption: fr ? 'Attestation' : 'Certificate' }]
                : []),
            ]}
          />
        </ModalSection>
      )}
    </ModalShell>
  );
};
