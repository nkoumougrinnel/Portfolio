export type Language = 'fr' | 'en';

export type ProjectCategory = 'all' | 'featured' | 'mobile' | 'web' | 'ai' | 'systems';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: 'featured' | 'more' | 'early';
  typeBadge: string;
  status: string;
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
  tags: string[];
  imageUrl: string;
  screenshots?: string[];
  screenMockup?: {
    themeColor: string;
    stats?: { label: string; value: string }[];
    previewType: 'mobile-app' | 'dashboard' | 'chat-rag' | 'terminal' | 'iot';
  };
  link?: string;
  github?: string;
}

export interface SkillItem {
  name: string;
  tag?: string;
  icon?: string;
  activeDot?: boolean;
}

export interface SkillCategory {
  title: {
    fr: string;
    en: string;
  };
  iconName: string;
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
  tags: string[];
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
  highlights?: {
    fr: string[];
    en: string[];
  };
  imageUrl: string;
  tag?: string;
}
