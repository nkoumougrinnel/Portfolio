import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { CybersecuritySection } from './components/CybersecuritySection';
import { EducationSection } from './components/EducationSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ActivitiesSection } from './components/ActivitiesSection';
import { HeadingSection } from './components/HeadingSection';
import { ResourcesSection } from './components/ResourcesSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { DynamicImageModal } from './components/DynamicImageModal';
import { CvModal } from './components/CvModal';
import { ImagePreviewModal } from './components/ImagePreviewModal';
import { CertificationModal } from './components/CertificationModal';
import { ActivityModal } from './components/ActivityModal';

import {
  PROFILE_AVATAR,
  CERTIFICATION_IMAGE,
  CERTIFICATIONS_DATA,
  PROJECTS,
  ACTIVITIES_DATA,
  CYBERSECURITY_DATA,
} from './data/portfolioData';
import { Language, Project, ActivityItem, CertificationItem } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('nt_theme');
    return saved ? saved === 'dark' : false; // default = light (menuisier)
  });

  // Apply theme to <html> on mount and on change
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    localStorage.setItem('nt_theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Dynamic Image state storage
  const [avatarUrl, setAvatarUrl] = useState<string>(PROFILE_AVATAR);

  const [certImageUrl, setCertImageUrl] = useState<string>(() => {
    return localStorage.getItem('nt_cert_url') || CERTIFICATION_IMAGE;
  });

  const [projectsList, setProjectsList] = useState<Project[]>(() => {
    const saved = localStorage.getItem('nt_projects');
    if (saved) {
      try {
        const savedProjects = JSON.parse(saved) as Array<Project & { category?: Project['categories'][number] }>;
        return [
          ...PROJECTS.map((project) => {
            const savedProject = savedProjects.find((item) => item.id === project.id);
            return savedProject
              ? { ...project, imageUrl: savedProject.imageUrl ?? project.imageUrl }
              : project;
          }),
          ...savedProjects.filter((item) => !PROJECTS.some((project) => project.id === item.id)).map((item) => ({
            ...item,
            categories: item.categories ?? (item.category ? [item.category] : ['more'])
          }))
        ];
      } catch {
        return PROJECTS;
      }
    }
    return PROJECTS;
  });

  const [activitiesList, setActivitiesList] = useState<ActivityItem[]>(() => {
    const saved = localStorage.getItem('nt_activities');
    if (saved) {
      try {
        const savedActivities = JSON.parse(saved) as ActivityItem[];
        return ACTIVITIES_DATA.map((activity) => {
          const savedActivity = savedActivities.find((item) => item.id === activity.id);
          return savedActivity
            ? { ...activity, ...savedActivity, categories: savedActivity.categories ?? activity.categories, imageUrl: activity.imageUrl }
            : activity;
        });
      } catch {
        return ACTIVITIES_DATA;
      }
    }
    return ACTIVITIES_DATA;
  });

  // Modal states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<CertificationItem | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);
  const [isImageStudioOpen, setIsImageStudioOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [imagePreviewState, setImagePreviewState] = useState<{
    isOpen: boolean;
    title: string;
    imageUrl: string;
    onUpdate?: (newUrl: string) => void;
  } | null>(null);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('nt_avatar_url', avatarUrl);
  }, [avatarUrl]);

  useEffect(() => {
    localStorage.setItem('nt_cert_url', certImageUrl);
  }, [certImageUrl]);

  useEffect(() => {
    localStorage.setItem('nt_projects', JSON.stringify(projectsList));
  }, [projectsList]);

  useEffect(() => {
    localStorage.setItem('nt_activities', JSON.stringify(activitiesList));
  }, [activitiesList]);

  useEffect(() => {
    if (!isCvModalOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCvModalOpen]);

  // Project Image update handler
  const handleUpdateProjectImage = (projectId: string, newUrl: string) => {
    setProjectsList((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, imageUrl: newUrl } : p))
    );
    if (selectedProject && selectedProject.id === projectId) {
      setSelectedProject((prev) => (prev ? { ...prev, imageUrl: newUrl } : null));
    }
  };

  const handleResetImages = () => {
    setAvatarUrl(PROFILE_AVATAR);
    setCertImageUrl(CERTIFICATION_IMAGE);
    setProjectsList(PROJECTS);
    setActivitiesList(ACTIVITIES_DATA);
    localStorage.removeItem('nt_avatar_url');
    localStorage.removeItem('nt_cert_url');
    localStorage.removeItem('nt_projects');
    localStorage.removeItem('nt_activities');
  };

  const handleOpenImageModal = (title: string, url: string, onUpdate?: (newUrl: string) => void) => {
    setImagePreviewState({
      isOpen: true,
      title,
      imageUrl: url,
      onUpdate,
    });
  };

  return (
    <div className="min-h-screen text-[var(--color-text-main)] flex flex-col w-full relative z-0">


      <div className="w-full flex flex-col min-h-screen relative">
        {/* Header */}
        <Header
          language={language}
          onLanguageChange={setLanguage}
          onOpenCvModal={() => setIsCvModalOpen(true)}
          avatarUrl={avatarUrl}
          isDark={isDark}
          onToggleTheme={() => setIsDark((d) => !d)}
        />

        {/* Main Content Body */}
        <main className="flex-1 flex flex-col w-full pt-16">
          <HeroSection
            language={language}
            avatarUrl={avatarUrl}
            onOpenImageStudio={() => setIsImageStudioOpen(true)}
            onOpenCvModal={() => setIsCvModalOpen(true)}
          />

          <AboutSection language={language} />

          <ExperienceSection language={language} />

          <ProjectsSection
            language={language}
            projects={projectsList}
            onSelectProject={(project) => setSelectedProject(project)}
            onEditProjectImage={(project) => {
              setSelectedProject(project);
            }}
          />

          <CybersecuritySection
            language={language}
            cybersecurityData={CYBERSECURITY_DATA}
          />

          <SkillsSection
            language={language}
            projects={projectsList}
            onSelectProject={(project) => setSelectedProject(project)}
          />

          <EducationSection language={language} />

          <CertificationsSection
            language={language}
            certifications={CERTIFICATIONS_DATA}
            projects={projectsList}
            certImageUrl={certImageUrl}
            onSelectCertification={setSelectedCertification}
          />

          <ActivitiesSection
            language={language}
            activities={activitiesList}
            onSelectActivity={(act) => setSelectedActivity(act)}
          />

          <HeadingSection language={language} />

          <ContactSection language={language} />

          <Footer language={language} />
        </main>
      </div>

      {/* Interactive Project Deep-dive Modal (Centralized, 2-3 screenshots, full summary) */}
      <ProjectModal
        project={selectedProject}
        language={language}
        onClose={() => setSelectedProject(null)}
      />

      {/* Dedicated Certification Details Modal */}
      <CertificationModal
        certification={selectedCertification}
        language={language}
        certificateImageUrl={selectedCertification?.id === 'dclic' ? certImageUrl : selectedCertification?.imageUrl ?? ''}
        projects={projectsList}
        onSelectProject={(project) => {
          setSelectedCertification(null);
          setSelectedProject(project);
        }}
        onClose={() => setSelectedCertification(null)}
      />

      {/* Dedicated Activity & Hackathon Details Modal */}
      <ActivityModal
        activity={selectedActivity}
        language={language}
        projects={projectsList}
        onSelectProject={(project) => {
          setSelectedActivity(null);
          setSelectedProject(project);
        }}
        onClose={() => setSelectedActivity(null)}
      />

      {/* Dynamic Image Link Studio Modal */}
      <DynamicImageModal
        isOpen={isImageStudioOpen}
        language={language}
        onClose={() => setIsImageStudioOpen(false)}
        currentAvatar={avatarUrl}
        onUpdateAvatar={setAvatarUrl}
        currentCertImage={certImageUrl}
        onUpdateCertImage={setCertImageUrl}
        onResetImages={handleResetImages}
      />

      {/* Interactive CV Modal */}
      <CvModal
        isOpen={isCvModalOpen}
        language={language}
        onClose={() => setIsCvModalOpen(false)}
        avatarUrl={avatarUrl}
      />

      {/* Image Lightbox & Link Modifier */}
      {imagePreviewState && (
        <ImagePreviewModal
          isOpen={imagePreviewState.isOpen}
          title={imagePreviewState.title}
          imageUrl={imagePreviewState.imageUrl}
          language={language}
          onClose={() => setImagePreviewState(null)}
          onUpdateImage={imagePreviewState.onUpdate}
        />
      )}
    </div>
  );
}
