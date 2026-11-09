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
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { CertificationModal } from './components/CertificationModal';
import { ActivityModal } from './components/ActivityModal';

import {
  PROFILE_AVATAR,
  CERTIFICATIONS_DATA,
  PROJECTS,
  ACTIVITIES_DATA,
  CYBERSECURITY_DATA,
} from './data/portfolioData';
import { Language, Project, ActivityItem, CertificationItem } from './types';

function readStoredTheme(): boolean {
  try {
    const saved = localStorage.getItem('nt_theme');
    if (saved) return saved === 'dark';
  } catch {
    /* storage indisponible */
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
}

export default function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [isDark, setIsDark] = useState<boolean>(readStoredTheme);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.setAttribute('data-theme', 'dark');
    } else {
      html.removeAttribute('data-theme');
    }
    html.lang = language;
  }, [isDark, language]);

  const toggleTheme = () => {
    setIsDark((d) => {
      try {
        localStorage.setItem('nt_theme', !d ? 'dark' : 'light');
      } catch {
        /* storage indisponible */
      }
      return !d;
    });
  };

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertification, setSelectedCertification] = useState<CertificationItem | null>(null);
  const [selectedActivity, setSelectedActivity] = useState<ActivityItem | null>(null);

  return (
    <div className="min-h-screen text-[var(--color-text-main)] flex flex-col w-full relative z-0">
      <div className="w-full flex flex-col min-h-screen relative">
        <Header
          language={language}
          onLanguageChange={setLanguage}
          avatarUrl={PROFILE_AVATAR}
          isDark={isDark}
          onToggleTheme={toggleTheme}
        />

        <main className="flex-1 flex flex-col w-full pt-16">
          <HeroSection language={language} avatarUrl={PROFILE_AVATAR} />

          <AboutSection language={language} />

          <ExperienceSection language={language} />

          <ProjectsSection
            language={language}
            projects={PROJECTS}
            onSelectProject={setSelectedProject}
          />

          <CybersecuritySection language={language} cybersecurityData={CYBERSECURITY_DATA} />

          <SkillsSection
            language={language}
            projects={PROJECTS}
            onSelectProject={setSelectedProject}
          />

          <EducationSection language={language} />

          <CertificationsSection
            language={language}
            certifications={CERTIFICATIONS_DATA}
            projects={PROJECTS}
            onSelectCertification={setSelectedCertification}
          />

          <ActivitiesSection
            language={language}
            activities={ACTIVITIES_DATA}
            onSelectActivity={setSelectedActivity}
          />

          <ContactSection language={language} />

          <Footer language={language} />
        </main>
      </div>

      <ProjectModal
        project={selectedProject}
        language={language}
        onClose={() => setSelectedProject(null)}
      />

      <CertificationModal
        certification={selectedCertification}
        language={language}
        certificateImageUrl={selectedCertification?.imageUrl ?? ''}
        projects={PROJECTS}
        onSelectProject={(project) => {
          setSelectedCertification(null);
          setSelectedProject(project);
        }}
        onClose={() => setSelectedCertification(null)}
      />

      <ActivityModal
        activity={selectedActivity}
        language={language}
        projects={PROJECTS}
        onSelectProject={(project) => {
          setSelectedActivity(null);
          setSelectedProject(project);
        }}
        onClose={() => setSelectedActivity(null)}
      />
    </div>
  );
}
