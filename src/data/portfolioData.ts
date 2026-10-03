import { Project, SkillCategory, ExperienceItem, EducationItem, ActivityItem, CertificationItem } from '../types';

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
    tags: ["Django", "React", "PostgreSQL", "Docker", "Anti-Fraud"],
  },
  {
    id: "lekki",
    title: "Lekki",
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
    title: "Robot éviteur d’obstacles",
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

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "software",
    title: { en: "Software", fr: "Software" },
    skills: [
      { name: "Python", icon: "python", relatedProjects: ["lekki", "suponeai", "sango"] },
      { name: "Django", icon: "django", relatedProjects: ["relio", "carburflow", "suponeai"] },
      { name: "FastAPI", icon: "fastapi", relatedProjects: ["lekki"] },
      { name: "React", icon: "react", relatedProjects: ["carburflow", "lekki", "campusflow"] },
      { name: "React Native", icon: "react", relatedProjects: ["relio"] },
      { name: "TypeScript", icon: "typescript", relatedProjects: ["lekki", "campusflow"] },
      { name: "JavaScript", icon: "javascript", relatedProjects: ["campusflow", "lekki"] },
      { name: "PostgreSQL", icon: "postgresql", relatedProjects: ["relio", "carburflow", "campusflow"] },
      { name: "SQLite", icon: "sqlite", relatedProjects: ["tasktrack"] },
      { name: "Docker", icon: "docker", relatedProjects: ["carburflow"] },
      { name: "Git", icon: "git", context: { fr: "Versionnement des projets de développement", en: "Version control for development projects" } },
      { name: "GitHub", icon: "github", context: { fr: "Hébergement et partage de code", en: "Code hosting and collaboration" } },
      { name: "VS Code", icon: "visualstudiocode" },
      { name: "Postman", icon: "postman" },
      { name: "Figma", icon: "figma" },
      { name: "Notion", icon: "notion" }
    ]
  },
  {
    id: "networks",
    title: { en: "Networks", fr: "Réseaux" },
    skills: [
      { name: "GNS3", icon: "gns3", context: { fr: "TP Réseaux — SUP’PTIC", en: "Networking labs — SUP’PTIC" } },
      { name: "Cisco Packet Tracer", icon: "cisco", context: { fr: "TP Réseaux — SUP’PTIC", en: "Networking labs — SUP’PTIC" } },
      { name: "Wireshark", icon: "wireshark", context: { fr: "TP réseau — SUP’PTIC", en: "Network analysis — HackVerse 2026" } },
      { name: "Nmap", icon: "nmap", context: { fr: "TP réseau — SUP’PTIC", en: "Network analysis — HackVerse 2026" } }
    ]
  },
  {
    id: "ai-data",
    title: { en: "AI & Data", fr: "IA & Données" },
    skills: [
      { name: "Scikit-learn", icon: "scikitlearn", relatedProjects: ["suponeai"] },
      { name: "PyTorch", icon: "pytorch" },
      { name: "OpenCV", icon: "opencv", relatedProjects: ["smart-trash"] },
      { name: "Pandas", icon: "pandas", relatedProjects: ["suponeai"] },
      { name: "ONNX", icon: "onnx" }
    ]
  },
  {
    id: "systems",
    title: { en: "Systems & IoT", fr: "Systèmes & IoT" },
    skills: [
      { name: "Arduino", icon: "arduino", relatedProjects: ["bras-robotise", "robot-eviteur", "compteur-7-segments"] },
      { name: "ESP32", icon: "espressif", relatedProjects: ["smart-trash"] },
      { name: "Raspberry Pi", icon: "raspberrypi" },
      { name: "C", icon: "c" },
      { name: "C++", icon: "cplusplus", relatedProjects: ["bras-robotise", "robot-eviteur", "compteur-7-segments", "smart-trash"] },
      { name: "Linux", icon: "linux" },
      { name: "Ubuntu", icon: "ubuntu" }
    ]
  },
  {
    id: "cybersecurity",
    title: { en: "Cybersecurity", fr: "Cybersécurité" },
    skills: [
      { name: "Kali Linux", icon: "kalilinux" },
      { name: "Wireshark", icon: "wireshark", context: { fr: "Analyse réseau — HackVerse 2026", en: "Network analysis — HackVerse 2026" } },
      { name: "Nmap", icon: "nmap", context: { fr: "Analyse réseau — HackVerse 2026", en: "Network analysis — HackVerse 2026" } },
      { name: "Burp Suite", icon: "burpsuite" },
      { name: "Metasploit", icon: "metasploit" },
      { name: "OpenSSL", icon: "openssl" }
    ]
  }
];

export const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    company: "CAMTEL — Cameroon Telecommunications",
    role: {
      en: "Lead & Full-Stack Developer / Intern",
      fr: "Développeur Full-Stack & Lead Technique / Stagiaire"
    },
    department: {
      en: "Direction Régionale du Littoral · Business Unit Fixe · Service de Lutte contre la Fraude",
      fr: "Direction Régionale du Littoral · Business Unit Fixe · Service de Lutte contre la Fraude, Douala"
    },
    location: "Douala, Cameroun",
    period: "July — Sept 2026",
    description: {
      en: "Academic internship during my second year of engineering studies. The internship exposed me to a real production-oriented environment involving system architecture, development, databases, deployment, and teamwork. Designed and developed CarburFlow, a multi-site fuel monitoring platform designed for telecom infrastructure. CarburFlow centralizes fuel readings from generator sites, structures the collected data, calculates consumption and autonomy indicators, and helps identify discrepancies that may require investigation. Effectively took on a lead role managing data modeling, business logic, API development, frontend integration, anomaly detection, containerization, and deployment preparation.",
      fr: "Stage académique de deuxième année d'ingénierie. Immersion dans un environnement de production exigeant : architecture système, bases de données, déploiement et collaboration inter-équipes. Conception et développement de bout en bout de CarburFlow, plateforme de télémétrie et de suivi carburant pour l'infrastructure des générateurs télécoms. Prise d'un rôle de lead technique : modélisation des données, logique métier, détection d'anomalies de soutirage, APIs REST, intégration frontend et conteneurisation Docker."
    },
    tags: ["Django", "React", "PostgreSQL", "Docker", "Telecom Auditing"]
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
    tag: "Cybersecurity Hackathon",
    role: {
      en: "Cybersecurity team participant",
      fr: "Participant au sein de l’équipe cybersécurité"
    },
    description: {
      en: "Participation in a high-intensity cybersecurity hackathon focusing on offensive and defensive strategies, network analysis, and vulnerability mitigation.",
      fr: "Participation à un hackathon intense de cybersécurité centré sur les stratégies offensives et défensives, l'analyse de paquets et la remédiation de failles."
    },
    details: {
      en: "HackVerse 2026 is a 48-hour cybersecurity hackathon focused on security challenges, network analysis, and system defense.",
      fr: "HackVerse 2026 est un hackathon de cybersécurité de 48 heures consacré à des défis de sécurité, à l’analyse réseau et à la défense des systèmes."
    },
    highlights: {
      en: [
        "Network traffic dissection & Wireshark protocol reverse-engineering",
        "Linux server defense & privilege escalation mitigation",
        "Rapid scripting in Python and Bash under strict competition timelines"
      ],
      fr: [
        "Inspection approfondie des trames réseau et analyse de protocoles sous Wireshark",
        "Durcissement de serveurs Linux et remédiation de vulnérabilités critiques",
        "Automatisation de scripts de défense en Python et Bash sous fortes contraintes de temps"
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
      en: "Lead developer for the Lekki project, integrating a hybrid RAG pipeline for sovereign enterprise knowledge management.",
      fr: "Lead développeur sur le projet Lekki, intégrant un pipeline RAG souverain primé pour la recherche sémantique en entreprise."
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
      en: "Leading the computer science club at SUP'PTIC, organizing practical workshops in programming, networks, and technical bootcamps for students.",
      fr: "Direction du Club Informatique de SUP'PTIC, organisation d'ateliers pratiques de code, réseau, IoT et sessions de mentorat pour les étudiants."
    },
    details: {
      en: "The SUP'PTIC Computer Club brings students together through practical workshops and peer learning in software, networks, and embedded technology.",
      fr: "Le Club Informatique de SUP'PTIC réunit les étudiants autour d’ateliers pratiques et du partage de connaissances en développement, réseaux et systèmes embarqués."
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
