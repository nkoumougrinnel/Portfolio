export type Language = 'fr' | 'en';

export type ProjectCategory =
  | 'featured'
  | 'more'
  | 'early'
  | 'lab'
  | 'academic'
  | 'training'
  | 'competition'
  | 'personal'
  | 'professional'
  | 'embedded'
  | 'ai'
  | 'cyber'
  | 'web'
  | 'network';

export interface ProjectLink {
  label: string;
  url?: string;
  placeholder?: boolean;
}

export interface Project {
  id: string;
  title: string;
  categories: ProjectCategory[];
  track?: string;
  status: string;
  period?: string;
  description: {
    fr: string;
    en: string;
  };
  longDescription?: {
    fr: string;
    en: string;
  };
  features?: {
    fr: string[];
    en: string[];
  };
  architectureNotes?: {
    fr: string;
    en: string;
  };
  context?: {
    fr: string;
    en: string;
  };
  role?: {
    fr: string;
    en: string;
  };
  tags: string[];
  imageUrl: string;
  screenshots?: string[];
  gallery?: string[];
  videos?: string[];
  links?: ProjectLink[];
  demoAssets?: boolean;
  draftDetails?: boolean;
  link?: string;
  github?: string;
}

export interface Skill {
  name: string;
  icon: string;
  context?: {
    fr: string;
    en: string;
  };
  relatedProjects?: string[];
}

export type SkillItem = Skill;

export interface SkillCategory {
  id: 'software' | 'networks' | 'ai-data' | 'systems' | 'cybersecurity';
  title: {
    fr: string;
    en: string;
  };
  skills: SkillItem[];
}

export interface ExperienceItem {
  company: string;
  role: {
    fr: string;
    en: string;
  };
  department: {
    fr: string;
    en: string;
  };
  location: string;
  period: string;
  description: {
    fr: string;
    en: string;
  };
}

export interface EducationItem {
  institution: string;
  degree: {
    fr: string;
    en: string;
  };
  specialty: {
    fr: string;
    en: string;
  };
  period: string;
}

export type CertificationCategory =
  | 'certification'
  | 'training'
  | 'competition'
  | 'conference'
  | 'course';

export type CertificationKind = 'official' | 'participation' | 'completion';

export interface CertificationMomentPhoto {
  src: string;
  label?: {
    fr: string;
    en: string;
  };
}

export interface CertificationItem {
  id: string;
  title: {
    fr: string;
    en: string;
  };
  issuer: {
    fr: string;
    en: string;
  };
  period: string;
  duration?: string;
  imageUrl: string;
  description: {
    fr: string;
    en: string;
  };
  categories: CertificationCategory[];
  kind: CertificationKind;
  skills?: string[];
  relatedProjectIds?: string[];
  relatedProjectsContext?: {
    fr: string;
    en: string;
  };
  momentPhotos?: Array<string | CertificationMomentPhoto>;
}

export type ActivityCategory = 'competition' | 'leadership' | 'learning' | 'community';

export interface ActivityItem {
  id: string;
  title: string;
  year: string;
  description: {
    fr: string;
    en: string;
  };
  details?: {
    fr: string;
    en: string;
  };
  role?: {
    fr: string;
    en: string;
  };
  highlights?: {
    fr: string[];
    en: string[];
  };
  imageUrl: string;
  momentPhotos?: string[];
  certificateImageUrl?: string;
  relatedProjectIds?: string[];
  videoUrls?: string[];
  tag?: string;
  categories: ActivityCategory[];
}

export interface CyberLab {
  title: string;
  type: { fr: string; en: string };
  topics: string[];
  status: 'active' | 'done' | 'planned';
  note?: { fr: string; en: string };
}

export type CtfEntry = {
  id: string;
  title: { fr: string; en: string };
  imageUrl: string;
  platform: string;
  category: string;
  difficulty: string;
  date: string;
  description: { fr: string; en: string };
  content?: {
    steps?: { command: string; fr: string; en: string }[];
    learned?: { fr: string[]; en: string[] };
  };
};