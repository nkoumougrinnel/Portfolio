import { Project, SkillCategory, ExperienceItem, EducationItem, ActivityItem } from '../types';

export const PROFILE_AVATAR = "/moi.jpeg";

export const DEFAULT_FEATURED_MOCKUP = "https://lh3.googleusercontent.com/aida-public/AB6AXuBHQ3lRjT2iUyteB1MmgW2IeZ5zHWRo1oUR2FnkxtLoNgBqFm1HuIg2YACtRsc8yzkDcbS3ltTJ8xBGf5K5i7F9YhSLABS0bSCK1XT-n2WksvoBOILD_tM3kpvdZX4gsYIg1jyC1kgetBZVdsoKBPz-mx6ZsrBVYjDE9WaCDoGi4jjL5f_lezdl2A7FDQJVCi8xHXeYmgSBl0h3J0o2Ii-UZxWK4zrgGG8EaSxmdjG9EuXD4s-b5WY";

export const DEFAULT_MORE_MOCKUP = "https://lh3.googleusercontent.com/aida/AEtjO1XfbdpNwAaF-LRp-TerdTIyzgfYJEDRysW4gOL_IEdUYGH2eFR4jyc4JQ8DYDOeFTkRrJCl96V2DTGHpDFwLrHjIWCF-TuiBDGnuaQstfYCURxT8c8sFrUJFUrZ1ponjCtPZhh9VAuoIlmmmhLinFIlWrIJDdDQQwbZhOh0TCYt0J9LLZdi0oxpX8NKZYXDRFzQBX4aQ5fQN3Phkp0EdHRQv40pUue4gnssXzP7zkyRRCpDEYI4sTZ4tg";

export const CERTIFICATION_IMAGE = "https://lh3.googleusercontent.com/aida/AEtjO1UCBn5WplJlOKfc8Srct_PmeBA6cag14Iwyeg_wlOUyWr3lsBw4F03vUhnrxTDObDLl3FBTpPp0QwaMBc0ONqplzN7hR4ag9puEljLYFStyOPe51NIJ5Uat5hR7mncBP8ym09n4JK7g5BoULu9d7U6f8PVVY9yAEtcl71jJhfe3OHhaBmj7XIcxxBNO__g1QRo9DgSA6ZTghWYVlppEqScdHCbGxSgsC5VqZ6vq2OpPl-kP-Csssu1a";

export const HACKVERSE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuAu3506-NuY9tUQcbTVSzIXOlRmLel9fBkrKDwGymWEjznpxSHuSfKYoRgn_mkt7Dp6CY0o4arOWVmC3oGLAINQWA80xVjn6r4k47KB-QEh2LSfqZN4NqBcSxyZVLTu0GqNbaS0eClGSNQdpuNgff1brYUVBh72e-L3cvZmC4gJ6_G5u4_jZGLh5ixuQPCxGFL9IOdcE2KayQcTnaY0-Wx5QsdM3UZJs8zUBnuLXcTigCJf2jCiP6Y";

export const CURSOR_HACKATHON_IMAGE = "https://lh3.googleusercontent.com/aida/AEtjO1X3Z7PtOOAuUD_3FdULCpUoISxj0jHw7x_boOL6SsIisseTtTkRHZYRklGwpYXYEe5acsNN69byYU7JADE74Qo_g1P9NGJQIvaB8_LADx_THup89ul_Qak9YNBTSz0bZa6f3yIMGo5d0shcPPsozGxI7-I_hkgzYmhh8xZOvwZNf7_OraMBuDRA3vvogtQvQux3tkFo138CeWCYSpjlWdMtB-evhP5U-Tjclkz-97YCDCS0WkfTdXtyag";

export const CLUB_INFO_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCPtqkQDxVZZxGSrypYAL1oUvCnJ6lwsC9amINVFgPVAoQFddE_WbM16eNLB7QL4VuZZ8o24Jma3Y0AcIacD328LLiyrp_wakebzRCOVdSTSDylXJSRBewa56DPqwNHemGxszDv_X3uGtE0-UdoOdEmkGXexjMAuXVh01hwGGjKE4ElLxXVAuQhIvdNivL6NmLnL33RCQ7RIF3ivVl3TQNh-BXx-6JxyDGKnlRWYLcPXPPp8sAEe2o";

export const PROJECTS: Project[] = [
  {
    id: "relio",
    title: "RELIO",
    tagline: "Architecture & MVP",
    category: "featured",
    typeBadge: "Marketplace & Matching",
    status: "Active MVP",
    imageUrl: DEFAULT_FEATURED_MOCKUP,
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
    screenMockup: {
      themeColor: "#2563eb",
      previewType: "mobile-app",
      stats: [
        { label: "Latency", value: "<120ms" },
        { label: "Matches", value: "Real-time" },
        { label: "Platform", value: "iOS / Android" }
      ]
    }
  },
  {
    id: "carburflow",
    title: "CARBURFLOW",
    tagline: "Telemetry & Auditing",
    category: "featured",
    typeBadge: "Industrial IoT & Analytics",
    status: "Production Pilot",
    imageUrl: DEFAULT_FEATURED_MOCKUP,
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
    screenMockup: {
      themeColor: "#059669",
      previewType: "dashboard",
      stats: [
        { label: "Sites Monitored", value: "48+" },
        { label: "Leak Detection", value: "Instant" },
        { label: "Data Pipeline", value: "Dockerized" }
      ]
    }
  },
  {
    id: "lekki",
    title: "LEKKI",
    tagline: "AI Semantic Pipeline",
    category: "featured",
    typeBadge: "RAG & LLMs",
    status: "Hackathon Winner / Active",
    imageUrl: DEFAULT_FEATURED_MOCKUP,
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
    screenMockup: {
      themeColor: "#7c3aed",
      previewType: "chat-rag",
      stats: [
        { label: "Precision", value: "96.4%" },
        { label: "Response Time", value: "<450ms" },
        { label: "Routing", value: "Multi-Model" }
      ]
    }
  },
  {
    id: "suponeai",
    title: "SUPONEAI",
    tagline: "Retrieval Engine",
    category: "featured",
    typeBadge: "Campus Assistant",
    status: "Deployed at SUP'PTIC",
    imageUrl: DEFAULT_FEATURED_MOCKUP,
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
    screenMockup: {
      themeColor: "#2563eb",
      previewType: "chat-rag",
      stats: [
        { label: "Indexed Q&As", value: "1,000+" },
        { label: "Target Audience", value: "SUP'PTIC" },
        { label: "Accuracy", value: "High" }
      ]
    }
  },
  {
    id: "media-cloud-center",
    title: "MEDIA CLOUD CENTER",
    tagline: "Local Infrastructure",
    category: "more",
    typeBadge: "Network Streaming",
    status: "Completed",
    imageUrl: DEFAULT_MORE_MOCKUP,
    description: {
      en: "A local media server designed to stream and share files across a network without relying on an internet connection.",
      fr: "Un serveur multimédia local conçu pour diffuser et partager des fichiers sur un réseau local autonome, sans nécessiter d'accès internet."
    },
    longDescription: {
      en: "Allows high-speed multimedia streaming, document sharing, and distributed storage over localized Wi-Fi/LAN setups, ideal for bandwidth-constrained campus environments.",
      fr: "Permet la diffusion multimédia et le partage de documents à haut débit via Wi-Fi/LAN local autonome, idéal pour les environnements de campus déconnectés."
    },
    tags: ["Networking", "Streaming", "Python", "Local LAN"],
    screenMockup: {
      themeColor: "#0284c7",
      previewType: "terminal",
      stats: [
        { label: "Internet Required", value: "None (0%)" },
        { label: "Protocol", value: "HTTP / UPnP" },
        { label: "Throughput", value: "LAN Max" }
      ]
    }
  },
  {
    id: "smart-trash",
    title: "SMART TRASH",
    tagline: "Embedded AI",
    category: "more",
    typeBadge: "AI & Embedded",
    status: "Prototype",
    imageUrl: DEFAULT_MORE_MOCKUP,
    description: {
      en: "A smart waste-sorting system combining AI and embedded hardware to recognize and classify waste.",
      fr: "Un système intelligent de tri des déchets combinant vision par ordinateur et électronique embarquée pour classifier automatiquement les matières."
    },
    tags: ["Arduino", "Computer Vision", "C++", "Sensors"],
    screenMockup: {
      themeColor: "#10b981",
      previewType: "iot",
      stats: [
        { label: "Hardware", value: "Arduino / ESP32" },
        { label: "Vision Model", value: "Edge CNN" },
        { label: "Accuracy", value: "91%" }
      ]
    }
  },
  {
    id: "campusflow",
    title: "CAMPUSFLOW",
    tagline: "Platform Architecture",
    category: "more",
    typeBadge: "Campus Platform",
    status: "In Progress",
    imageUrl: DEFAULT_MORE_MOCKUP,
    description: {
      en: "A unified digital campus management platform connecting students, delegates, and faculty administration.",
      fr: "Plateforme unifiée pour la vie de campus connectant étudiants, délégués et administration universitaire."
    },
    tags: ["React", "Node.js", "PostgreSQL", "Full-Stack"],
    screenMockup: {
      themeColor: "#6366f1",
      previewType: "dashboard",
      stats: [
        { label: "Modules", value: "Courses / Events / Auth" },
        { label: "Status", value: "Active Dev" }
      ]
    }
  },
  {
    id: "tasktrack",
    title: "TASKTRACK",
    tagline: "Learning Project",
    category: "early",
    typeBadge: "Desktop & Productivity",
    status: "Completed",
    imageUrl: DEFAULT_MORE_MOCKUP,
    description: {
      en: "A simple task-management application built in Java as a foundational learning project.",
      fr: "Une application desktop de gestion de tâches développée en Java avec Swing et SQLite pour asseoir les bases de la POO."
    },
    tags: ["Java", "Swing", "SQLite"],
    screenMockup: {
      themeColor: "#475569",
      previewType: "terminal"
    }
  },
  {
    id: "supphub",
    title: "SUPPHUB",
    tagline: "Community & Collaboration",
    category: "early",
    typeBadge: "Student Community",
    status: "Early Stage",
    imageUrl: DEFAULT_MORE_MOCKUP,
    description: {
      en: "An early-stage platform designed around communication and interaction between SUP'PTIC students.",
      fr: "Projet précurseur axé sur la mise en relation et l'échange de ressources entre étudiants de SUP'PTIC."
    },
    tags: ["Sup'PTIC Community", "Web", "API"],
    screenMockup: {
      themeColor: "#3b82f6",
      previewType: "mobile-app"
    }
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: {
      en: "Software & Web Engineering",
      fr: "Génie Logiciel & Développement Web"
    },
    iconName: "code",
    skills: [
      { name: "Python", tag: "PY", activeDot: true },
      { name: "Django", tag: "DJ", activeDot: true },
      { name: "FastAPI" },
      { name: "React", activeDot: true },
      { name: "React Native" },
      { name: "TypeScript", tag: "TS" },
      { name: "PostgreSQL & SQLite" },
      { name: "Docker" },
      { name: "REST APIs" }
    ]
  },
  {
    title: {
      en: "Networks & Infrastructure",
      fr: "Réseaux & Infrastructures"
    },
    iconName: "network",
    skills: [
      { name: "GNS3 & Packet Tracer" },
      { name: "IPv4 / IPv6" },
      { name: "VLAN & OSPF" },
      { name: "ACL & Routing" },
      { name: "Protocol Architecture" }
    ]
  },
  {
    title: {
      en: "AI, RAG & Data",
      fr: "Intelligence Artificielle & Données"
    },
    iconName: "brain",
    skills: [
      { name: "RAG Architectures", activeDot: true },
      { name: "LLMs & Embeddings" },
      { name: "Scikit-Learn", tag: "SK" },
      { name: "PyTorch", tag: "PT" },
      { name: "OpenCV & ONNX" }
    ]
  },
  {
    title: {
      en: "Systems, IoT & Security",
      fr: "Systèmes, IoT & Cybersécurité"
    },
    iconName: "shield",
    skills: [
      { name: "Wireshark & Nmap" },
      { name: "Linux / Ubuntu" },
      { name: "TLS / SSL" },
      { name: "C/C++ & ESP32" },
      { name: "Arduino & Sensors" }
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
    tag: "Cybersecurity Hackathon",
    description: {
      en: "Participation in a high-intensity cybersecurity hackathon focusing on offensive and defensive strategies, network analysis, and vulnerability mitigation.",
      fr: "Participation à un hackathon intense de cybersécurité centré sur les stratégies offensives et défensives, l'analyse de paquets et la remédiation de failles."
    },
    details: {
      en: "HackVerse 2026 brought together top engineering talents across Central Africa for a 48-hour competitive cybersecurity showdown. Our squad focused on deep packet inspection, identifying server-side misconfigurations, analyzing obfuscated payloads, and designing automated intrusion mitigation scripts.",
      fr: "Le HackVerse 2026 a réuni les meilleurs profils techniques de la sous-région pour 48h d'épreuves intensives d'attaque et défense d'infrastructures. Notre équipe s'est concentrée sur l'inspection approfondie de trames réseau, l'exploitation et la correction de failles d'élévation de privilèges, ainsi que le durcissement d'équipements sous Linux."
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
    tag: "AI & Software Hackathon",
    description: {
      en: "Lead developer for the Lekki project, integrating a hybrid RAG pipeline for sovereign enterprise knowledge management.",
      fr: "Lead développeur sur le projet Lekki, intégrant un pipeline RAG souverain primé pour la recherche sémantique en entreprise."
    },
    details: {
      en: "During the 2026 edition of the J.U.I.N Cursor Hackathon, I architected and built the full pipeline for Lekki. The challenge was to deliver a context-aware enterprise retrieval assistant operating with high semantic precision, zero hallucinations on sensitive documentation, and near-instant latency.",
      fr: "Lors de l'édition 2026 du Hackathon J.U.I.N Cursor, j'ai piloté l'architecture et l'implémentation complète du moteur sémantique Lekki. L'objectif était de concevoir un assistant conversationnel pour entreprise garantissant une recherche vectorielle ultra-rapide et l'élimination des hallucinations grâce à des citations strictes des sources documentaires."
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
    tag: "SUP'PTIC Leadership",
    description: {
      en: "Leading the computer science club at SUP'PTIC, organizing practical workshops in programming, networks, and technical bootcamps for students.",
      fr: "Direction du Club Informatique de SUP'PTIC, organisation d'ateliers pratiques de code, réseau, IoT et sessions de mentorat pour les étudiants."
    },
    details: {
      en: "As Vice-President of the SUP'PTIC Computer Club, I coordinate technical workshops and peer-mentoring programs for over 150 engineering students. We focus on bridging theoretical coursework with practical industry demands: Docker deployments, clean code architecture, network administration, and CTF training.",
      fr: "En tant que Vice-président du Club Informatique de l'École Nationale Supérieure des Postes, Télécommunications et TIC (SUP'PTIC), je pilote les ateliers techniques hebdomadaires pour plus de 150 étudiants. Notre mission est d'ancrer les compétences pratiques : conteneurisation Docker, bonnes pratiques de code, protocoles réseaux et entraînement aux compétitions CTF."
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
