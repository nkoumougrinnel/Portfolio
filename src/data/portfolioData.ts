import { Project, SkillCategory, ExperienceItem, EducationItem, ActivityItem, CertificationItem } from '../types';
import { getSimpleIcon } from './simpleIcons';

export const PROFILE_AVATAR = "/images/profile/avatar.jpeg";

export const CERTIFICATION_IMAGE = "/images/certs/dclic.jpg";

export const HACKVERSE_IMAGE = "/images/activities/hackverse.jpg";

export const CURSOR_HACKATHON_IMAGE = "/images/activities/cursor.jpg";

export const CLUB_INFO_IMAGE = "/images/activities/club-info.jpeg";

const DEMO_PROJECT_GALLERY = [
  "/images/projects/relio.png",
  "/images/projects/carburflow.png",
  "/images/projects/lekki.png"
];

const DEMO_PROJECT_LINKS = [
  { label: "GitHub (démo)", url: "https://example.com/github-demo", placeholder: true },
  { label: "Démo en ligne (fictive)", url: "https://example.com/deployment-demo", placeholder: true }
];

const DEMO_PROJECT_VIDEO = "/video/video-test.mp4";

export const PROJECTS: Project[] = [
  {
    id: "relio",
    title: "Relio",
    track: "engineering",
    categories: ["featured", "personal", "web"],
    status: "Active MVP",
    imageUrl: "/images/projects/relio.png",
    role: {
      fr: "Proposition à confirmer : contribution à la conception de l’expérience mobile et à l’intégration des services de mise en relation.",
      en: "Draft to confirm: contribution to the mobile experience design and integration of the matching services."
    },
    draftDetails: true,
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    context: { fr: "Projet personnel", en: "Personal project" },
    description: {
      en: "An on-demand service marketplace designed to connect clients with the right service providers through a dynamic matching process. Currently developed as a working MVP focusing on service attribution and platform architecture.",
      fr: "Une place de marché de services à la demande conçue pour connecter les clients aux bons prestataires grâce à un processus d'attribution dynamique. Développé comme MVP fonctionnel centré sur l'architecture plateforme."
    },
    longDescription: {
      en: "RELIO rethinks the local service economy through automated proximity matching, real-time status dispatching, and secure communications between clients and verified artisans.",
      fr: "RELIO repense l'économie des services locaux grâce à un algorithme de mise en relation par proximité, un suivi d'interventions en temps réel et des canaux sécurisés entre clients et artisans certifiés."
    },
    features: {
      en: [
        "Dynamic proximity matching algorithm",
        "Dual-client & provider interface in React Native",
        "RESTful API backend in Django with PostgreSQL",
        "Push notifications and real-time state synchronization via Firebase"
      ],
      fr: [
        "Algorithme de matching géographique et disponibilité en temps réel",
        "Double interface client / prestataire développée avec React Native Expo",
        "API REST robuste sous Django adossée à PostgreSQL",
        "Synchronisation temps réel et notifications push via Firebase"
      ]
    },
    architectureNotes: {
      en: "Built using clean layered service architecture: decoupled React Native mobile frontend communicating with Django REST Framework endpoints, optimized with database indexation on geographic coordinates.",
      fr: "Architecture logicielle en couches découplées : frontend mobile React Native communiquant via API REST avec Django, avec indexation géospatiale pour les requêtes de proximité."
    },
    tags: ["React Native", "Expo", "Django", "PostgreSQL", "Firebase"],
  },
  {
    id: "carburflow",
    title: "Carburflow",
    track: "engineering",
    categories: ["featured", "professional", "web", "network"],
    status: "Production Pilot",
    imageUrl: "/images/projects/carburflow.png",
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    context: { fr: "Stage académique chez CAMTEL", en: "Academic internship at CAMTEL" },
    role: {
      fr: "Lead technique : modélisation des données, logique métier, API, intégration frontend, détection d'anomalies et conteneurisation.",
      en: "Technical lead: data modeling, business logic, APIs, frontend integration, anomaly detection, and containerization."
    },
    description: {
      en: "A system for monitoring fuel levels and consumption across multiple telecom sites, with mechanisms for identifying anomalies such as potential leaks or losses. Built during CAMTEL internship.",
      fr: "Un système de supervision des niveaux et consommations de carburant sur les sites télécoms distants, doté d'algorithmes de détection d'anomalies (fuites, soutirages suspects). Conçu lors du stage chez CAMTEL."
    },
    longDescription: {
      en: "Designed for CAMTEL's generator park across telecom towers. Centralizes telemetry readings, computes consumption rates, models tank autonomy under load, and flags irregular fuel drops for anti-fraud auditing.",
      fr: "Développé pour le parc de groupes électrogènes de CAMTEL. Centralise les télémesures, calcule l'autonomie en charge, corrèle les heures de marche et signale automatiquement les baisses suspectes de niveau."
    },
    features: {
      en: [
        "Multi-site telemetry ingestion and aggregation",
        "Anomaly detection for sudden fuel drops during generator shutdown",
        "Autonomy forecasting and refill planning analytics",
        "Role-based dashboard for regional telecom managers"
      ],
      fr: [
        "Agrégation et ingestion multi-sites de relevés de cuve",
        "Algorithme d'alerte sur baisses suspectes hors fonctionnement groupe",
        "Prévision d'autonomie et planification optimale des réapprovisionnements",
        "Tableau de bord de contrôle avec gestion des droits par région"
      ]
    },
    architectureNotes: {
      en: "Dockerized multi-container setup with Django backend, PostgreSQL time-series storage, and a high-performance React management dashboard.",
      fr: "Déploiement conteneurisé Docker multi-services combinant API Django, stockage optimisé PostgreSQL pour séries temporelles et dashboard React interactif."
    },
    tags: ["Django", "React", "PostgreSQL", "Docker"],
  },
  {
    id: "lekki",
    title: "Lekki",
    track: "engineering",
    categories: ["featured", "competition", "ai", "web"],
    status: "Hackathon Winner / Active",
    imageUrl: "/images/projects/lekki.png",
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    context: { fr: "Hackathon Cursor J.U.I.N 2026", en: "Cursor J.U.I.N Hackathon 2026" },
    role: {
      fr: "Développeur principal, responsable de l'architecture et de l'implémentation du pipeline RAG.",
      en: "Lead developer responsible for the RAG pipeline architecture and implementation."
    },
    description: {
      en: "An organization-oriented knowledge base with AI-powered search. Combines company documentation with a RAG pipeline for conversational queries, source citations, and multi-LLM routing.",
      fr: "Une base de connaissances souveraine d'entreprise boostée par l'IA. Combine la documentation interne à un pipeline RAG pour des requêtes conversationnelles, des citations de sources et du routage multi-LLM."
    },
    longDescription: {
      en: "LEKKI transforms dense organizational documentation into an instant semantic intelligence platform with traceable citations, chunking optimization, and localized search.",
      fr: "LEKKI transforme la documentation dense en une intelligence sémantique instantanée avec citation des sources originales, segmentation adaptative et recherche vectorielle haute fidélité."
    },
    features: {
      en: [
        "RAG pipeline with semantic chunking & vector search",
        "Interactive query interface with exact document citations",
        "FastAPI high-throughput asynchronous inference endpoints",
        "TypeScript / React sleek research interface"
      ],
      fr: [
        "Pipeline RAG complet avec chunking sémantique et embeddings vectoriels",
        "Interface conversationnelle avec surlignage et citation exacte des sources",
        "Backend asynchrone ultra-rapide sous FastAPI",
        "Interface web fluide en TypeScript et React"
      ]
    },
    architectureNotes: {
      en: "Hybrid retriever utilizing dense vector embeddings alongside BM25 keyword matching for optimal recall, routed through FastAPI.",
      fr: "Moteur de recherche hybride combinant recherche sémantique dense et BM25 pour un rappel maximal, servi par une API asynchrone FastAPI."
    },
    tags: ["FastAPI", "React", "TypeScript", "RAG", "Vector Search"],
  },
  {
    id: "suponeai",
    title: "Suponeai",
    track: "engineering",
    categories: ["featured", "academic", "ai"],
    status: "Deployed at SUP'PTIC",
    imageUrl: "/images/projects/suponeai.jpg",
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    context: { fr: "Projet académique pour SUP'PTIC", en: "Academic project for SUP'PTIC" },
    role: {
      fr: "Développement du moteur de recherche sémantique et intégration backend.",
      en: "Development of the semantic retrieval engine and backend integration."
    },
    description: {
      en: "An AI assistant developed for SUP'PTIC, allowing students to query a knowledge base of 1,000+ Q&As through semantic search. Focused on backend retrieval and integration.",
      fr: "Un assistant IA développé pour SUP'PTIC permettant aux étudiants d'interroger une base de 1 000+ questions/réponses académiques via recherche sémantique."
    },
    longDescription: {
      en: "Built to streamline student onboarding and curriculum inquiries at SUP'PTIC, handling course syllabi, exam schedules, administrative requirements, and department FAQs.",
      fr: "Créé pour fluidifier l'accueil et l'orientation des étudiants à SUP'PTIC, répondant aux questions sur les filières, calendriers d'examens et démarches de scolarité."
    },
    features: {
      en: [
        "Natural language search over 1,000+ curated academic Q&As",
        "NLP preprocessing pipeline using Scikit-Learn and Pandas",
        "Django backend with lightweight response caching",
        "Responsive student mobile web interface"
      ],
      fr: [
        "Recherche en langage naturel sur 1 000+ questions/réponses académiques",
        "Pipeline NLP personnalisé avec Scikit-Learn et Pandas",
        "Backend Django avec mise en cache des requêtes fréquentes",
        "Interface web étudiante accessible sur smartphone"
      ]
    },
    tags: ["Django", "Scikit-Learn", "Pandas", "React", "NLP"],
  },
  {
    id: "media-cloud-center",
    title: "Media cloud center",
    track: "engineering",
    categories: ["more", "personal", "network"],
    status: "Completed",
    imageUrl: "/images/projects/mediacloudcenter.jpg",
    role: {
      fr: "Proposition à confirmer : installation et configuration du serveur multimédia et des services accessibles sur le réseau local.",
      en: "Draft to confirm: installation and configuration of the media server and services available over the local network."
    },
    draftDetails: true,
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    context: { fr: "Projet personnel d'infrastructure réseau", en: "Personal network infrastructure project" },
    description: {
      en: "A local media server designed to stream and share files across a network without relying on an internet connection.",
      fr: "Un serveur multimédia local conçu pour diffuser et partager des fichiers sur un réseau local autonome, sans nécessiter d'accès internet."
    },
    longDescription: {
      en: "Allows high-speed multimedia streaming, document sharing, and distributed storage over localized Wi-Fi/LAN setups, ideal for bandwidth-constrained campus environments.",
      fr: "Permet la diffusion multimédia et le partage de documents à haut débit via Wi-Fi/LAN local autonome, idéal pour les environnements de campus déconnectés."
    },
    tags: ["Networking", "Streaming", "Linux", "Docker"],
  },
  {
    id: "smart-trash",
    title: "Smart trash",
    track: "engineering",
    categories: ["more", "personal", "embedded", "ai"],
    status: "Prototype",
    imageUrl: "/images/projects/smart-trash.jpg",
    role: {
      fr: "Proposition à confirmer : assemblage du prototype embarqué et participation à l’intégration de la reconnaissance des déchets.",
      en: "Draft to confirm: assembly of the embedded prototype and contribution to waste-recognition integration."
    },
    draftDetails: true,
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    context: { fr: "Prototype personnel", en: "Personal prototype" },
    description: {
      en: "A smart waste-sorting system combining AI and embedded hardware to recognize and classify waste.",
      fr: "Un système intelligent de tri des déchets combinant vision par ordinateur et électronique embarquée pour classifier automatiquement les matières."
    },
    tags: ["Arduino", "Computer Vision", "C++", "Sensors"],
  },
  {
    id: "campusflow",
    title: "Campusflow",
    track: "engineering",
    categories: ["more", "academic", "web"],
    status: "In Progress",
    imageUrl: "/images/projects/campusflow.jpg",
    role: {
      fr: "Proposition à confirmer : contribution au développement de l’interface et à l’intégration des modules de gestion du campus.",
      en: "Draft to confirm: contribution to the interface development and integration of campus management modules."
    },
    draftDetails: true,
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    context: { fr: "Projet académique", en: "Academic project" },
    description: {
      en: "A unified digital campus management platform connecting students, delegates, and faculty administration.",
      fr: "Plateforme unifiée pour la vie de campus connectant étudiants, délégués et administration universitaire."
    },
    tags: ["React", "Node.js", "PostgreSQL", "Full-Stack"],
  },
  {
    id: "tasktrack",
    title: "Tasktrack",
    track: "engineering",
    categories: ["early", "personal", "web"],
    status: "Completed",
    imageUrl: "/images/projects/tasktrack.jpg",
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    context: { fr: "Projet personnel d'apprentissage", en: "Personal learning project" },
    role: {
      fr: "Développement d'une application desktop de gestion de tâches en Java.",
      en: "Development of a Java desktop task-management application."
    },
    description: {
      en: "A simple task-management application built in Java as a foundational learning project.",
      fr: "Une application desktop de gestion de tâches développée en Java avec Swing et SQLite pour asseoir les bases de la POO."
    },
    tags: ["Java", "Swing", "SQLite"],
  },
  {
    id: "site-club-info",
    title: "Site officiel du club info",
    track: "engineering",
    categories: ["more", "web"],
    status: "Completed",
    imageUrl: "/images/projects/siteclubinfo.png",
    context: { fr: "Projet du Club Informatique de SUP’PTIC", en: "SUP’PTIC Computer Club project" },
    role: {
      fr: "Proposition à confirmer : participation au développement frontend et à la mise en ligne du site.",
      en: "Draft to confirm: contribution to frontend development and website deployment."
    },
    draftDetails: true,
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    description: {
      fr: "Développement et déploiement du site officiel du Club Informatique de SUP'PTIC pour centraliser les ressources et les informations pour les étudiants.",
      en: "Development and deployment of the official SUP'PTIC Computer Club website to centralize resources and information for students."
    },
    tags: ["React", "Tailwind CSS", "TypeScript"]
  },
  {
    id: "sango",
    title: "Sango",
    track: "engineering",
    categories: ["more", "ai", "network"],
    status: "In Progress",
    imageUrl: "/images/projects/sango.jpg",
    context: { fr: "Projet en cours", en: "Ongoing project" },
    role: {
      fr: "Proposition à confirmer : exploration de l’interface de routage et de la visualisation des itinéraires pour les secours.",
      en: "Draft to confirm: exploration of the routing interface and emergency-route visualization."
    },
    draftDetails: true,
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    description: {
      fr: "Système de routage en temps réel pour ambulances et pompiers, capable de s'adapter aux conditions changeantes.",
      en: "A real-time routing system for ambulances and firefighters that adapts to changing conditions."
    },
    longDescription: {
      fr: "Sango explore le routage intelligent pour les véhicules de secours, en tenant compte du trafic, de la météo, des incidents et de la qualité variable des routes.",
      en: "Sango explores intelligent routing for emergency vehicles, taking into account traffic, weather, incidents and variable road quality."
    },
    tags: ["React", "TypeScript", "Python", "Vite"]
  },
  {
    id: "shopkamer",
    title: "Shopkamer",
    track: "engineering",
    categories: ["early", "training", "web"],
    status: "Completed",
    imageUrl: "/images/projects/shopkamer.jpg",
    context: { fr: "Premier atelier du Club Informatique", en: "Computer Club’s first workshop" },
    role: {
      fr: "Proposition à confirmer : réalisation d’une interface e-commerce d’exercice et mise en pratique des bases web.",
      en: "Draft to confirm: building a practice e-commerce interface and applying web fundamentals."
    },
    draftDetails: true,
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    description: {
      fr: "Site e-commerce développé dans le cadre du premier atelier du Club pour mettre en pratique les bases du développement web.",
      en: "An e-commerce website developed during the Club's first workshop to practise web development fundamentals."
    },
    tags: ["HTML", "CSS", "JavaScript", "PHP", "SQL"]
  },
  {
    id: "bras-robotise",
    title: "Bras robotisé",
    track: "engineering",
    categories: ["more", "training", "embedded"],
    status: "Completed",
    imageUrl: "/images/projects/bras-robotise.jpg",
    role: {
      fr: "Proposition à confirmer : câblage des servomoteurs et mise en œuvre de la commande par potentiomètre sur Arduino.",
      en: "Draft to confirm: wiring the servomotors and implementing potentiometer control on Arduino."
    },
    draftDetails: true,
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    context: { fr: "Formation D-CLIC", en: "D-CLIC training" },
    description: {
      fr: "Bras mécanique contrôlé par servomoteurs et potentiomètre, piloté par Arduino.",
      en: "Mechanical arm controlled by servomotors and a potentiometer, powered by Arduino."
    },
    tags: ["Arduino", "Servomoteurs", "C++", "Embedded"]
  },
  {
id: "robot-eviteur",
    title: "Robot éviteur d'obstacles",
    track: "engineering",
    categories: ["more", "training", "embedded"],
    status: "Completed",
    imageUrl: "/images/projects/robot-eviteur.jpg",
    role: {
      fr: "Proposition à confirmer : intégration du capteur HC-SR04 et réglage de la logique d’évitement.",
      en: "Draft to confirm: integrating the HC-SR04 sensor and tuning the obstacle-avoidance logic."
    },
    draftDetails: true,
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    context: { fr: "Formation D-CLIC", en: "D-CLIC training" },
    description: {
      fr: "Robot autonome utilisant un capteur ultrason HC-SR04 pour détecter et éviter les obstacles.",
      en: "Autonomous robot using an HC-SR04 ultrasonic sensor to detect and avoid obstacles."
    },
    tags: ["Arduino", "HC-SR04", "Moteurs", "Embedded"]
  },
  {
    id: "compteur-7-segments",
    title: "Compteur 7 segments",
    track: "engineering",
    categories: ["more", "training", "embedded"],
    status: "Completed",
    imageUrl: "/images/projects/compteur-7-segments.jpg",
    role: {
      fr: "Proposition à confirmer : câblage du registre 74HC595 et programmation de l’affichage des chiffres.",
      en: "Draft to confirm: wiring the 74HC595 shift register and programming digit display."
    },
    draftDetails: true,
    demoAssets: true,
    gallery: DEMO_PROJECT_GALLERY,
    videos: [DEMO_PROJECT_VIDEO],
    links: DEMO_PROJECT_LINKS,
    context: { fr: "Formation D-CLIC", en: "D-CLIC training" },
    description: {
      fr: "Afficheur numérique piloté par registre à décalage 74HC595 et Arduino.",
      en: "Digital display driven by a 74HC595 shift register and Arduino."
    },
    tags: ["Arduino", "74HC595", "7-Segment", "Embedded"]
  },
];

export const CERTIFICATIONS_DATA: CertificationItem[] = [
  {
    id: "dclic",
    title: { fr: "D-CLIC — Programmation Électronique & Systèmes Embarqués", en: "D-CLIC — Electronic Programming & Embedded Systems" },
    issuer: { fr: "OIF / CNFFDP", en: "OIF / CNFFDP" },
    kind: "official",
    duration: "400h",
    period: "2025 — 2026",
    categories: ["certification", "training"],
    imageUrl: CERTIFICATION_IMAGE,
    skills: ["Arduino", "ESP32", "C/C++", "MicroPython", "Électronique", "Capteurs & actionneurs", "Wi-Fi / Bluetooth", "Prototypage"],
    relatedProjectIds: ["bras-robotise", "robot-eviteur", "compteur-7-segments"],
    relatedProjectsContext: { fr: "Projets issus de cette formation", en: "Projects developed during this training" },
    description: {
      fr: "Parcours certifiant de 400 heures consacré à la programmation électronique et aux systèmes embarqués.",
      en: "A 400-hour certification program focused on electronic programming and embedded systems."
    }
  },
  {
    id: "cursor-hackathon-2026",
    title: { fr: "Cursor Hackathon J.U.I.N 2026", en: "Cursor Hackathon J.U.I.N 2026" },
    issuer: { fr: "Université de Yaoundé I", en: "University of Yaoundé I" },
    kind: "participation",
    period: "2026",
    categories: ["competition"],
    imageUrl: "/images/certs/cursor.jpg",
    momentPhotos: ["/images/activities/cursor.jpg"],
    relatedProjectIds: ["lekki"],
    relatedProjectsContext: { fr: "Projet associé à cet événement", en: "Project associated with this event" },
    description: {
      fr: "Certificat de participation au hackathon Cursor J.U.I.N 2026.",
      en: "Certificate of participation in Cursor Hackathon J.U.I.N 2026."
    }
  },
  {
    id: "hackverse-2026",
    title: { fr: "HackVerse 2026", en: "HackVerse 2026" },
    issuer: { fr: "Club GI", en: "Club GI" },
    kind: "participation",
    period: "2026",
    categories: ["competition"],
    imageUrl: "/images/certs/hackverse.jpeg",
    momentPhotos: ["/images/activities/hackverse.jpg"],
    description: {
      fr: "Attestation officielle de participation au HackVerse 2026.",
      en: "Official certificate of participation in HackVerse 2026."
    }
  }
];

const BASE_SKILL_CATEGORIES: SkillCategory[] = [
  {
  id: "development",
  title: {
    en: "Development",
    fr: "Développement"
  },
  skills: [
    { name: "Python", icon: "python", relatedProjects: ["lekki", "suponeai", "sango"] },
    { name: "Django", icon: "django", relatedProjects: ["relio", "carburflow", "suponeai"] },
    { name: "FastAPI", icon: "fastapi", relatedProjects: ["lekki"] },
    { name: "React", icon: "react", relatedProjects: ["carburflow", "lekki", "campusflow"] },
    { name: "TypeScript", icon: "typescript", relatedProjects: ["lekki", "campusflow"] },
    { name: "JavaScript", icon: "javascript", relatedProjects: ["campusflow", "lekki"] },
    { name: "HTML5", icon: "html5", relatedProjects: ["carburflow", "lekki", "campusflow"] },
    { name: "CSS", icon: "css3", relatedProjects: ["carburflow", "lekki", "campusflow"] },
    { name: "PostgreSQL", icon: "postgresql", relatedProjects: ["relio", "carburflow", "campusflow"] },
    { name: "SQLite", icon: "sqlite", relatedProjects: ["tasktrack"] },
    { name: "Docker", icon: "docker", relatedProjects: ["carburflow"] },
    { name: "C", icon: "c" },
    {
      name: "C++",
      icon: "cplusplus",
      relatedProjects: [
        "bras-robotise",
        "robot-eviteur",
        "compteur-7-segments",
        "smart-trash"
      ]
    },
    { name: "Git", icon: "git" },
    { name: "GitHub", icon: "github" },
    { name: "VS Code", icon: "visualstudiocode" },
    { name: "Postman", icon: "postman" },
    { name: "Node.js", icon: "nodedotjs" },
    { name: "Vite", icon: "vite" },
    { name: "ESLint", icon: "eslint" }
  ]
  },
  {
  id: "systems-iot",
  title: {
    en: "Systems & IoT",
    fr: "Systèmes & IoT"
  },
  skills: [
    {
      name: "Linux",
      icon: "linux",
      status: "proficient"
    },
    {
      name: "Ubuntu",
      icon: "ubuntu",
      status: "proficient"
    },
    {
      name: "VirtualBox",
      icon: "virtualbox",
      status: "proficient"
    },
    {
      name: "Cisco",
      icon: "cisco",
      status: "proficient",
      context: {
        fr: "Travaux pratiques de réseaux — SUP’PTIC",
        en: "Networking labs — SUP’PTIC"
      }
    },
    {
      name: "Arduino",
      icon: "arduino",
      relatedProjects: [
        "bras-robotise",
        "robot-eviteur",
        "compteur-7-segments"
      ],
      status: "proficient"
    },
    {
      name: "ESP32",
      icon: "espressif",
      relatedProjects: ["smart-trash"],
      status: "proficient"
    },
    {
      name: "Raspberry Pi",
      icon: "raspberrypi",
      status: "learning"
    },
    {
      name: "GNU Bash",
      icon: "gnubash",
      status: "learning"
    },
    {
      name: "Arduino IDE",
      icon: "arduino",
      status: "proficient"
    }
  ]
},
  {
  id: "cybersecurity",
  title: {
    en: "Cybersecurity",
    fr: "Cybersécurité"
  },
  skills: [
    {
      name: "Kali Linux",
      icon: "kalilinux",
      status: "learning"
    },
    {
      name: "Wireshark",
      icon: "wireshark",
      status: "proficient",
      context: {
        fr: "Analyse réseau — HackVerse 2026",
        en: "Network analysis — HackVerse 2026"
      }
    },
    {
      name: "Burp Suite",
      icon: "burpsuite",
      status: "learning"
    },
    {
      name: "Metasploit",
      icon: "metasploit",
      status: "learning"
    },
    {
      name: "OpenSSL",
      icon: "openssl",
      status: "learning"
    },
    {
      name: "OWASP",
      icon: "owasp",
      status: "learning"
    },
    {
      name: "OpenVPN",
      icon: "openvpn",
      status: "learning"
    },
    {
      name: "Hashcat",
      icon: "hashcat",
      status: "learning"
    },
    { name: "Nmap", icon: "nmap" },
{ name: "Suricata", icon: "suricata" },
{ name: "Hydra", icon: "hydra" },
{ name: "John the Ripper", icon: "johntheripper" },
{ name: "SQLmap", icon: "sqlmap" },
{ name: "Nikto", icon: "nikto" },
{ name: "Gobuster", icon: "gobuster" },
  ]
}
];

export const SKILL_CATEGORIES: SkillCategory[] = BASE_SKILL_CATEGORIES.map((category) => ({
  ...category,
  skills: category.skills.filter((skill) => getSimpleIcon(skill.icon))
}));

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: "CAMTEL — Cameroon Telecommunications",
    role: {
      en: "Lead Tech & Fullstack Developer · Intern",
      fr: "Lead Tech & Fullstack Developer · Stagiaire"
    },
    department: {
      en: "Direction Régionale du Littoral · Business Unit Fixe · Service de Lutte contre la Fraude",
      fr: "Direction Régionale du Littoral · Business Unit Fixe · Service de Lutte contre la Fraude, Douala"
    },
    location: "Douala, Cameroun",
    period: "July — Sept 2026",
    description: {
      en: "During my academic internship at CAMTEL, I worked within the Fraud Prevention Service on a concrete problem related to tracking fuel consumption at telecom sites. I took charge of designing and developing CarburFlow, a web platform to centralize data, track consumption, and facilitate site supervision. The project involved data modeling, business logic, REST APIs, frontend/backend integration, and containerization with Docker. Beyond development, this experience confronted me with the constraints of a system used in a real telecom context: data from multiple sites, business rules, verification needs, and the necessity to keep an architecture clear enough to evolve. It also strengthened my interest in real systems. Understanding how an application integrates into a broader environment, how its components depend on each other, and where its weak points lie has become as important to me as making it work.",
      fr: "Lors de mon stage académique chez CAMTEL, j'ai travaillé au sein du Service de Lutte contre la Fraude sur un problème concret lié au suivi des consommations de carburant des sites télécoms. J'ai pris en charge la conception et le développement de CarburFlow, une plateforme web destinée à centraliser les données, suivre les consommations et faciliter la supervision des sites. Le projet m'a amené à travailler sur la modélisation des données, la logique métier, les APIs REST, l'intégration frontend/backend et la conteneurisation avec Docker. Au-delà du développement, cette expérience m'a surtout confronté aux contraintes d'un système utilisé dans un contexte télécom réel : données provenant de plusieurs sites, règles métier, besoins de vérification et nécessité de garder une architecture suffisamment claire pour pouvoir évoluer. C'est aussi une expérience qui a renforcé mon intérêt pour les systèmes réels. Comprendre comment une application s'intègre dans un environnement plus large, comment ses composants dépendent les uns des autres et où se trouvent ses points de faiblesse est devenu aussi important pour moi que de la faire fonctionner."
    }
  }
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    institution: "SUP'PTIC, Yaoundé",
    degree: {
      en: "Ingénieur des Travaux de Télécommunications",
      fr: "Ingénieur des Travaux de Télécommunications"
    },
    specialty: {
      en: "Specialty: Computer Science & Networks",
      fr: "Spécialité : Informatique & Réseaux"
    },
    period: "2024 — Present · 3rd Year"
  },
  {
    institution: "Université de Yaoundé I",
    degree: {
      en: "Mathematics — Licence level",
      fr: "Mathématiques — Niveau Licence"
    },
    specialty: {
      en: "Discrete Mathematics & Analysis",
      fr: "Mathématiques discrètes, algèbre et analyse"
    },
    period: "2023 — 2025"
  },
  {
    institution: "Collège Adventiste de Yaoundé",
    degree: {
      en: "Baccalauréat C (Scientific)",
      fr: "Baccalauréat C (Scientifique)"
    },
    specialty: {
      en: "Mathematics & Physical Sciences",
      fr: "Mathématiques et Sciences Physiques"
    },
    period: "2023"
  }
];

export const ACTIVITIES_DATA: ActivityItem[] = [
  {
    id: "hackverse",
    title: "HackVerse 2026",
    year: "2026",
    imageUrl: HACKVERSE_IMAGE,
    certificateImageUrl: "/images/certs/hackverse.jpeg",
    categories: ["competition"],
    tag: "Development Hackathon",
    role: {
      en: "Development team participant",
      fr: "Participant au sein de l'équipe développement"
    },
    description: {
      en: "Participation in a team development competition, in a short format that required designing and delivering a functional solution quickly.",
      fr: "Participation à une compétition de développement en équipe, dans un format court qui demandait de concevoir et livrer rapidement une solution fonctionnelle."
    },
    details: {
      en: "HackVerse 2026 is a development hackathon where teams build software solutions within a 48-hour timeframe.",
      fr: "HackVerse 2026 est un hackathon de développement où les équipes construisent des solutions logicielles en 48 heures."
    },
    highlights: {
      en: [
        "Rapid prototyping and MVP development under time pressure",
        "Team coordination and delivery of a working solution",
        "Problem-solving and technical implementation in a competitive environment"
      ],
      fr: [
        "Prototypage rapide et développement d'une solution viable sous contrainte de temps",
        "Coordination d'équipe et livraison d'une application fonctionnelle",
        "Résolution de problèmes techniques dans un environnement compétitif"
      ]
    }
  },
  {
    id: "cursor-hackathon",
    title: "Cursor Hackathon J.U.I.N 2026",
    year: "2026",
    imageUrl: CURSOR_HACKATHON_IMAGE,
    certificateImageUrl: "/images/certs/cursor.jpg",
    categories: ["competition"],
    tag: "AI & Software Hackathon",
    role: {
      en: "Lead developer on LEKKI",
      fr: "Développeur principal sur LEKKI"
    },
    relatedProjectIds: ["lekki"],
    description: {
      en: "Lead developer on Lekki, a knowledge management and semantic search project designed around data sovereignty.",
      fr: "Lead développeur sur Lekki, un projet de gestion des connaissances et de recherche sémantique conçu autour de la souveraineté des données."
    },
    details: {
      en: "The 2026 J.U.I.N Cursor Hackathon challenged teams to build useful software solutions. LEKKI, an AI-assisted knowledge search project, was developed during the event.",
      fr: "Le Hackathon J.U.I.N Cursor 2026 invitait les équipes à concevoir des solutions logicielles utiles. LEKKI, un projet de recherche documentaire assistée par IA, a été développé dans ce cadre."
    },
    highlights: {
      en: [
        "Architected complete RAG workflow (chunking, local embeddings & hybrid BM25 search)",
        "FastAPI asynchronous backend with sub-500ms inference responses",
        "Awarded best enterprise software prototype by the technical evaluation panel"
      ],
      fr: [
        "Conception de bout en bout du pipeline RAG (segmentation, embeddings et recherche hybride BM25)",
        "Développement d'une API backend asynchrone FastAPI répondant en moins de 500ms",
        "Projet primé par le jury technique pour sa robustesse et son applicabilité industrielle"
      ]
    }
  },
  {
    id: "club-info",
    title: "Vice-président Club Informatique",
    year: "2024 – present",
    imageUrl: CLUB_INFO_IMAGE,
    categories: ["leadership", "community"],
    tag: "SUP'PTIC Leadership",
    role: {
      en: "Vice-President of the Computer Science Club",
      fr: "Vice-président du Club Informatique"
    },
    description: {
      en: "Participating in the coordination of the SUP'PTIC Computer Club and setting up activities around technology, learning, and student projects.",
      fr: "Participation à la coordination du Club Informatique de SUP'PTIC et à la mise en place d'activités autour de la technologie, de l'apprentissage et des projets étudiants."
    },
    details: {
      en: "This responsibility taught me to work with different profiles, organize collective initiatives, and advance projects that don't rely solely on technical skills.",
      fr: "Cette responsabilité m'a appris à travailler avec des profils différents, à organiser des initiatives collectives et à faire avancer des projets qui ne reposent pas uniquement sur la technique."
    },
    highlights: {
      en: [
        "Organizing weekly hands-on labs in Linux, web stacks, and Git workflows",
        "Mentoring junior engineering cohorts on project architecture and tooling",
        "Building technical partnerships and university hackathon prep sessions"
      ],
      fr: [
        "Organisation d'ateliers pratiques hebdomadaires sur Linux, le développement moderne et Git",
        "Mentorat technique des promotions cadettes sur l'architecture logicielle et les bonnes pratiques",
        "Coordination des entraînements pour les hackathons nationaux et défis algorithmiques"
      ]
    }
  }
];

export const CYBERSECURITY_DATA = {
  intro: {
    fr: "Je construis depuis plusieurs années des logiciels et des systèmes réseau, puis j'explore aujourd'hui la manière dont ces systèmes peuvent être attaqués, analysés et sécurisés. Cette curiosité m'oriente vers la compréhension des mécanismes d'attaque, de l'observation des risques et de la protection des infrastructures numériques.",
    en: "For several years, I have built software and worked with network systems. Today, I explore how these systems can be attacked, analyzed, and secured, with a focus on understanding attack mechanisms, detecting risks, and protecting digital infrastructure."
  },

  direction: {
    fr: "Je souhaite approfondir la sécurité des systèmes et des réseaux, en conservant un lien constant avec les environnements télécoms, les infrastructures numériques et les systèmes distribués. Mon objectif est de développer une vision complète de la protection des systèmes, depuis l'analyse du trafic et les vulnérabilités jusqu'à la conception de contrôles et de résilience.",
    en: "I want to deepen my understanding of systems and network security while maintaining a close connection with telecom environments, digital infrastructure, and distributed systems. My goal is to develop a complete view of system protection, from traffic analysis and vulnerability assessment to controls and resilience."
  },

  // SECURITY PROJECTS — Ce que tu construis toi-même avec un objectif de sécurité
  securityProjects: [
    {
      id: "mock-network-sentinel",
      title: "Mock Network Sentinel",
      description: {
        fr: "Projet de démonstration pour visualiser la carte d'un outil de surveillance réseau.",
        en: "Mock project to preview the card layout for a network monitoring tool."
      },
      tags: ["Python", "Scapy", "Linux"],
      imageUrl: "/images/projects/relio.png",
      githubUrl: undefined,
      caseStudyUrl: undefined
    },
    // Placeholder for future projects - structure ready
    // {
    //   id: "network-sentinel",
    //   title: "Network Sentinel",
    //   description: {
    //     fr: "Outil léger de surveillance réseau pour identifier des patterns de trafic suspects en réseau local.",
    //     en: "Lightweight network monitoring tool to identify suspicious traffic patterns in a local network."
    //   },
    //   tags: ["Python", "Scapy", "Linux"],
    //   imageUrl: "/images/cyber/network-sentinel.png",
    //   githubUrl: "https://github.com/nkoumougrinnel/network-sentinel",
    //   caseStudyUrl: null,
    //   featured: true
    // },
    // {
    //   id: "web-security-scanner",
    //   title: "Web Security Scanner",
    //   description: {
    //     fr: "Outil expérimental de détection de failles communes dans les applications web.",
    //     en: "Experimental tool for detecting common security issues in web applications."
    //   },
    //   tags: ["Python", "HTTP", "OWASP"],
    //   imageUrl: "/images/cyber/web-scanner.png",
    //   githubUrl: "https://github.com/nkoumougrinnel/web-security-scanner",
    //   caseStudyUrl: null,
    //   featured: false
    // },
    // {
    //   id: "secure-file-exchange",
    //   title: "Secure File Exchange",
    //   description: {
    //     fr: "Système de partage de fichiers sécurisé explorant authentification, chiffrage et contrôle d'accès.",
    //     en: "Secure file-sharing system exploring authentication, encryption and access control."
    //   },
    //   tags: ["Django", "PostgreSQL", "Cryptography"],
    //   imageUrl: "/images/cyber/secure-file-exchange.png",
    //   githubUrl: "https://github.com/nkoumougrinnel/secure-file-exchange",
    //   caseStudyUrl: null,
    //   featured: false
    // }
  ],

  // SECURITY LABS — Expérimentations pratiques dans des environnements contrôlés
  securityLabs: [
    {
      id: "cylab-academy",
      title: "CyLab Security Academy",
      platform: "CyLab Security Academy",
      type: { fr: "Plateforme de cours et labs", en: "Course platform & labs" },
      topics: ["Web Security", "Linux hardening", "Practical challenges"],
      status: "active",
      description: {
        fr: "Fondamentaux et exercices pratiques sur les vulnérabilités web et systèmes via la plateforme CyLab.",
        en: "Foundations and hands-on exercises on web and system vulnerabilities via CyLab platform."
      },
      imageUrl: "/images/cyber/cylab-lab.png"
    },
    {
      id: "network-traffic-analysis",
      title: "Network Traffic Investigation",
      platform: "Personal Lab",
      type: { fr: "Lab personnel", en: "Personal lab" },
      topics: ["Wireshark", "Nmap", "Protocol inspection", "tcpdump"],
      status: "active",
      description: {
        fr: "Capture et analyse de trafic réseau, reconnaissance, inspection de protocoles.",
        en: "Network traffic capture and analysis, reconnaissance, protocol inspection."
      },
      imageUrl: "/images/cyber/network-traffic-lab.png"
    },
    {
      id: "linux-security-experiments",
      title: "Linux Security Experiments",
      platform: "Personal Lab",
      type: { fr: "Lab personnel", en: "Personal lab" },
      topics: ["Permissions", "File system", "Hardening", "SSH config"],
      status: "active",
      description: {
        fr: "Expérimentations sur le durcissement Linux, permissions et configuration système.",
        en: "Experiments on Linux hardening, permissions, and system configuration."
      },
      imageUrl: "/images/cyber/linux-security-lab.png"
    }
  ],

  // CTFs — Challenges de différentes plateformes
  ctfs: [
  {
    id: "le-chat-obeissant",
    title: {
      fr: "Le chat obéissant",
      en: "The Obedient Cat"
    },
    imageUrl: "/images/cybersecurity/ctf/obedient-cat.png",
    platform: "CyLab Security Academy",
    category: "Compétences générales",
    tags: ["Linux", "Terminal", "wget", "cat", "Fichiers"],
    description: {
      fr: "Premier défi pratique de familiarisation avec le terminal Linux. L’objectif consiste à télécharger un fichier fourni dans la description du challenge, puis à afficher son contenu pour retrouver le flag.",
      en: "A first practical challenge introducing the Linux terminal. The goal is to download a file provided in the challenge description and display its contents to retrieve the flag."
    },
    content: {
      steps: [
        {
          command: "man cat",
          fr: "Consulte le manuel de la commande cat afin de comprendre comment afficher le contenu d’un fichier.",
          en: "Opens the manual for the cat command to understand how to display a file's contents."
        },
        {
          command: "wget <lien-vers-le-flag>",
          fr: "Télécharge dans le Webshell le fichier accessible depuis le lien fourni dans la description du challenge. Remplace le texte entre chevrons par le lien réel.",
          en: "Downloads the file into the Webshell using the link provided in the challenge description. Replace the text in angle brackets with the actual link."
        },
        {
          command: "ls",
          fr: "Vérifie que le fichier téléchargé, ici nommé flag, est présent dans le répertoire courant.",
          en: "Checks that the downloaded file, here named flag, is present in the current directory."
        },
        {
          command: "cat flag",
          fr: "Affiche le contenu du fichier flag. Le texte obtenu correspond au flag à soumettre dans l’interface du challenge.",
          en: "Displays the contents of the flag file. The output is the flag to submit in the challenge interface."
        }
      ],
      learned: {
        fr: [
          "Télécharger un fichier depuis le terminal avec wget.",
          "Vérifier la présence d’un fichier avec ls.",
          "Afficher le contenu d’un fichier avec cat.",
        ],
        en: [
          "Downloading a file from the terminal with wget.",
          "Checking whether a file exists with ls.",
          "Displaying a file's contents with cat.",
        ]
      }
    },
    writeupUrl: undefined,
    difficulty: "Facile",
    date: "Octobre 2026"
  },
    // Placeholder for future CTF challenges - structure ready
    // {
    //   id: "auth-bypass",
    //   title: "Authentication Bypass",
    //   platform: "TryHackMe",
    //   category: "Web Security",
    //   tags: ["Authentication", "HTTP", "Burp Suite"],
    //   description: {
    //     fr: "Exploration d'un mécanisme d'authentification défaillant et identification d'un contournement du contrôle d'accès.",
    //     en: "Explored a flawed authentication mechanism and identified a way to bypass the intended access control."
    //   },
    //   writeupUrl: "https://github.com/nkoumougrinnel/writeups/tree/main/auth-bypass",
    //   difficulty: "Easy",
    //   date: "2026"
    // },
    // {
    //   id: "linux-privesc",
    //   title: "Linux Privilege Escalation",
    //   platform: "Hack The Box",
    //   category: "Linux",
    //   tags: ["Privilege Escalation", "Enumeration", "Linux"],
    //   description: {
    //     fr: "Énumération d'un hôte Linux, identification d'un vecteur d'élévation de privilèges et obtention d'un accès élevé.",
    //     en: "Enumerated a Linux host, identified a privilege escalation vector and obtained elevated access."
    //   },
    //   writeupUrl: "https://github.com/nkoumougrinnel/writeups/tree/main/linux-privesc",
    //   difficulty: "Medium",
    //   date: "2026"
    // },
    // {
    //   id: "weak-rsa",
    //   title: "Weak RSA Implementation",
    //   platform: "CyLab Security Academy",
    //   category: "Cryptography",
    //   tags: ["RSA", "Cryptography", "Number Theory"],
    //   description: {
    //     fr: "Investigation des faiblesses dans une implémentation RSA incorrecte.",
    //     en: "Investigated weaknesses in an improperly implemented RSA scheme."
    //   },
    //   writeupUrl: "https://github.com/nkoumougrinnel/writeups/tree/main/weak-rsa",
    //   difficulty: "Medium",
    //   date: "2026"
    // },
    // {
    //   id: "sql-injection",
    //   title: "SQL Injection",
    //   platform: "PortSwigger Web Security Academy",
    //   category: "Web Security",
    //   tags: ["SQL Injection", "Web Security", "Database"],
    //   description: {
    //     fr: "Investigation d'une requête vulnérable et démonstration de comment une gestion d'entrée défaillante permet l'injection SQL.",
    //     en: "Investigated a vulnerable query and demonstrated how improper input handling enables SQL injection."
    //   },
    //   writeupUrl: "https://github.com/nkoumougrinnel/writeups/tree/main/sql-injection",
    //   difficulty: "Easy",
    //   date: "2026"
    // }
  ],

  // RESEARCH & WRITE-UPS — Analyses techniques et documentations
  writeups: [
    // Placeholder for future write-ups - structure ready
    // {
    //   id: "understanding-sql-injection",
    //   title: "Understanding SQL Injection",
    //   description: {
    //     fr: "Investigation sur le fonctionnement de l'injection SQL de la requête HTTP à la requête base de données, patterns d'exploitation et défenses.",
    //     en: "Investigation into how SQL injection works from HTTP request to database query, including common exploitation patterns and defensive mechanisms."
    //   },
    //   tags: ["Web Security", "SQL Injection", "Defense"],
    //   url: "https://github.com/nkoumougrinnel/writeups/tree/main/understanding-sql-injection",
    //   date: "2026"
    // },
    // {
    //   id: "tls-handshake-breakdown",
    //   title: "How HTTPS Protects a Connection",
    //   description: {
    //     fr: "Décomposition du handshake TLS pour comprendre comment authentification, échange de clés et chiffrement travaillent ensemble.",
    //     en: "Breaking down the TLS handshake to understand how authentication, key exchange and encryption work together."
    //   },
    //   tags: ["Cryptography", "TLS", "Network Security"],
    //   url: "https://github.com/nkoumougrinnel/writeups/tree/main/tls-handshake",
    //   date: "2026"
    // },
    // {
    //   id: "pcap-analysis",
    //   title: "Investigating a Suspicious Network Capture",
    //   description: {
    //     fr: "Analyse d'un fichier PCAP pour comprendre la séquence d'événements réseau et identifier un comportement potentiellement malveillant.",
    //     en: "Analysis of a PCAP file to understand the sequence of network events and identify potentially malicious behavior."
    //   },
    //   tags: ["Network Security", "Wireshark", "PCAP Analysis"],
    //   url: "https://github.com/nkoumougrinnel/writeups/tree/main/pcap-analysis",
    //   date: "2026"
    // },
    // {
    //   id: "linux-permissions-privesc",
    //   title: "Linux Permissions & Privilege Escalation",
    //   description: {
    //     fr: "Exploration pratique des permissions Linux et des mécanismes pouvant mener à l'élévation de privilèges.",
    //     en: "Practical exploration of Linux permissions and mechanisms that can lead to privilege escalation."
    //   },
    //   tags: ["Linux", "Privilege Escalation", "System Security"],
    //   url: "https://github.com/nkoumougrinnel/writeups/tree/main/linux-permissions",
    //   date: "2026"
    // }
  ]
};

