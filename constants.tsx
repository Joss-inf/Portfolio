import React from 'react';
import { Profile, AppID, AppDefinition, Project, GalleryImage, EducationEntry, LifeEvent } from './types';
import { Grid, User, Code2, Mail, Image, Settings } from 'lucide-react'; // Import Settings icon

export const APPS: AppDefinition[] = [
  {
    id: AppID.PROJECTS,
    name: 'Projects',
    iconColor: 'bg-gradient-to-br from-blue-400 to-blue-600',
    icon: <Grid className="text-white w-8 h-8" />,
  },
  {
    id: AppID.ABOUT,
    name: 'About',
    iconColor: 'bg-gradient-to-br from-yellow-400 to-orange-500',
    icon: <User className="text-white w-8 h-8" />,
  },
  {
    id: AppID.SKILLS,
    name: 'Skills',
    iconColor: 'bg-gradient-to-br from-purple-400 to-indigo-600',
    icon: <Code2 className="text-white w-8 h-8" />,
  },
  {
    id: AppID.CONTACT,
    name: 'Contact',
    iconColor: 'bg-gradient-to-br from-gray-400 to-gray-600',
    icon: <Mail className="text-white w-8 h-8" />,
  },
  {
    id: AppID.GALLERY, 
    name: 'Gallery',
    iconColor: 'bg-gradient-to-br from-pink-400 to-red-500',
    icon: <Image className="text-white w-8 h-8" />,
  },
  {
    id: AppID.SETTINGS, // New app
    name: 'Settings',
    iconColor: 'bg-gradient-to-br from-gray-500 to-gray-700',
    icon: <Settings className="text-white w-8 h-8" />,
  },
];

const projectFolder = "/portfolio/assets/projects/";

export const PROJECTS: Project[] = [
  {
    id: 1,
    title: "NPM Package Checker",
    category: "Web Application",
    images: [
      projectFolder+"npm.PNG",
    ],
    description: "NPM Package Checker is a web application designed to help developers manage their Node.js projects more efficiently. It allows users to search for any NPM package, view its latest version, track outdated dependencies, and detect potential vulnerabilities. The tool provides a clean and intuitive interface for quickly assessing the health of a project’s dependencies, making it easier to maintain secure and up-to-date applications. Ideal for both personal projects and team environments, it streamlines dependency management and saves time during development.",
    tech: ["React", "Node.js", "Fetch API", "Tailwind CSS"],
    year: 2026,
    role: "Fullstack Developer",
    teamSize: 1,
    projectType: "Personal",
    liveUrl: "https://npmpackagechecker.netlify.app/",
    sourceCodeUrl: "https://github.com/tonpseudo/npm-package-checker"
  },
  {
    id: 2,
    title: "EcoStat",
    category: "Web Application",
    images: [
      projectFolder+"img1.webp",
      projectFolder+"img2.webp",
    ],
    description: "EcoStat is a web application that provides interactive data visualization for various statistical indicators. Users can explore environmental, social, and economic trends with dynamic charts, filters, and responsive layouts, helping to make data-driven decisions more easily. The intuitive interface allows quick access to key metrics and customizable views for different datasets.",
    tech: ["React", "Chart.js (or Recharts)", "JavaScript", "Tailwind CSS"],
    year: 2026,
    role: "FullStack Developer",
    teamSize: 1,
    projectType: "Personal",
    liveUrl: "https://joss.alwaysdata.net/ecostat/www/app/",
    sourceCodeUrl: "https://github.com/Joss-inf/ecostat"
  },
  {
    id: 3,
    title: "VueJS Forum",
    category: "Web Application",
    images: [
      projectFolder+"forum1.png",
      projectFolder+"forum2.png",
      projectFolder+"forum3.png",
      projectFolder+"forum4.png",
    ],
    description: "VueJS Forum is a discussion platform built with Vue.js 3, offering users the ability to browse categories, create topics and interact through replies. The application features a responsive, component‑driven interface with dynamic rendering and client‑side navigation, focused on simplicity and usability. It provides a real‑time feel for discussions and a structured way to participate in community conversations.",
    tech: ["Vue.js 3", "Vue Router", "Pinia / Vuex", "Tailwind CSS", "JavaScript"],
    year: 2026,
    role: "FullStack Developer",
    teamSize: 1,
    projectType: "Personal",
    liveUrl: "https://vuejsforum.netlify.app/",
    sourceCodeUrl: "https://github.com/Joss-inf/forum"
  },
  {
    id: 4,
    title: "PharmaHub",
    category: "Web Application",
    images: [projectFolder+"img11.webp",
      projectFolder+"img12.webp",
      projectFolder+"img10.webp"
    ],
    description: "PharmaHub est un gestionnaire de commandes pour centraliser plusieurs pharmacies sur un même site. Il facilite la coordination des commandes clients et professionnels, simplifie le suivi des stocks et réduit le coût de maintenance par entité. Projet développé pour améliorer l’efficacité opérationnelle dans le secteur pharmaceutique.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
    year: 2025,
    role: "Fullstack Developer",
    teamSize: 3,
    projectType: "Academic",
    liveUrl: null,
    sourceCodeUrl: "https://github.com/Joss-inf/projet_php_pharmacy"
  },
  {
    id: 5,
    title: "TowerRider",
    category: "Mobile Game",
    images: [projectFolder+"img4.webp",
      projectFolder+"img3.webp"
    ],
    description: "TowerRider est un jeu mobile de type platformer inspiré de Subway Surfer. Le joueur doit éviter des obstacles tombants tout en grimpant un immeuble. Le projet inclut génération procédurale des obstacles, optimisation 3D et rendu en temps réel pour mobile.",
    tech: ["React Native", "Three.js", "Blender", "Obj Manipulation", "Procedural Generation"],
    year: 2025,
    role: "Game Developer",
    teamSize: 3,
    projectType: "Academic",
    liveUrl: null,
    sourceCodeUrl: "https://github.com/Joss-inf/labday"
  },
  {
    id: 6,
    title: "Memory",
    category: "Web Game",
    images: [projectFolder+"img17.webp"],
    description: "Memory est un jeu web permettant d’entraîner sa mémoire tout en s’amusant. Il inclut un leaderboard pour suivre les scores des joueurs, avec un objectif pédagogique de stimulation cognitive et prévention des maladies neurologiques.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "SQL"],
    year: 2024,
    role: "Fullstack Developer",
    teamSize: 3,
    projectType: "Academic",
    liveUrl: null,
    sourceCodeUrl: "https://github.com/Ecole-Coding-Factory/projet-flash-pg3"
  },
  {
    id: 7,
    title: "Service Linux Monitoring",
    category: "System Tool",
    images: [projectFolder+"Capture9.PNG"],
    description: "Service Linux Monitoring permet de collecter des métriques (CPU, RAM) entre un serveur central et plusieurs machines agents. Le projet automatise la surveillance de plusieurs VM, simplifie le suivi de performance et offre une solution centralisée pour le monitoring en temps réel.",
    tech: ["Python", "Linux VM Oracle", "Linux Service"],
    year: 2024,
    role: "Backend / System Developer",
    teamSize: 2,
    projectType: "Academic",
    liveUrl: null,
    sourceCodeUrl: "https://github.com/Joss-inf/monitoring"
  },

];

// Helper function to generate a readable caption from an image source path.
const generateCaptionFromSrc = (src: string): string => {
  try {
    const url = new URL(src);
    let pathSegment = url.pathname.split('/').pop() || 'Image';

    // Handle picsum.photos which might end in dimensions like /800/600
    
    
    // Remove file extension
    const filename = pathSegment.includes('.') 
      ? pathSegment.split('.').slice(0, -1).join('.')
      : pathSegment;
    
    // Replace separators and capitalize
    return filename
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase())
      .trim() || 'Gallery Image';

  } catch (e) {
    // Fallback for invalid URLs
    return "Gallery Image";
  }
};

// --- INSTRUCTIONS ---
// 1. The development environment doesn't support local image files in the 'assets' folder directly.
// 2. To use your own gallery images, upload them to an image hosting service (like Imgur, Cloudinary, etc.).
// 3. Paste the public URLs for your images into the `imageSources` array below.
// The caption will be automatically generated from the last part of the URL path.
const imageSources = Array.from(new Set([
  projectFolder + "npm.PNG",
  projectFolder + "img1.webp",
  projectFolder + "img2.webp",
  projectFolder + "forum1.png",
  projectFolder + "forum2.png",
  projectFolder + "forum3.png",
  projectFolder + "forum4.png",
  projectFolder + "img11.webp",
  projectFolder + "img12.webp",
  projectFolder + "img10.webp",
  projectFolder + "img4.webp",
  projectFolder + "img3.webp",
  projectFolder + "img17.webp",
  projectFolder + "Capture9.PNG",
]));

export const GALLERY_IMAGES: GalleryImage[] = imageSources.map(src => ({
  src,
  caption: generateCaptionFromSrc(src),
}));

export const PROFILE:Profile =  {
  avatar: "/portfolio/assets/profile/profile.webp",
  name:'Bessière Josselin',
  job:'Développeur web fullstack',
  introduction:"Je veux construire les projets que j'aime "
} 

export const EDUCATION_BACKGROUNDS: EducationEntry[] = [
  {
    degree: "Bachelor Développeur de Solutions Numériques Sécurisées",
    institution: "ESIEE-IT",
    startYear: 2024,
    endYear: 2027,
    details: "Bachelor (RNCP niveau 6) à ESIEE-IT en développement web et mobile axé sur la conception d’applications sécurisées, couvrant front-end, back-end et bonnes pratiques de cybersécurité. "
  },
  {
    degree: "BTS CRSA",
    institution: "Lycée Jean Jaures",
    startYear: 2019,
    endYear: 2021,
    details: "Le BTS CRSA (Conception et Réalisation de Systèmes Automatiques) est un diplôme Bac+2 formant à la conception, l’intégration et la maintenance de systèmes automatisés industriels (robotique, automatismes, programmation et supervision)."
  },
];

export const LIFE_ROADMAP: LifeEvent[] = [
  {
    year: "2017-2019",
    title: "Bac STI2D",
    description: "Obtention du baccalauréat Sciences et Technologies de l’Industrie et du Développement Durable.",
    type: "education"
  },

  {
    year: "2019-2021",
    title: "BTS CRSA",
    description: "Formation en conception et réalisation de systèmes automatisés (programmation, automatisme, robotique).",
    type: "education"
  },

  {
    year: "2020 (2 mois)",
    title: "Stage chez Thales",
    description: "Stage  axé sur la maintenance et la gestion de serveurs, avec une intervention sur les aspects matériels.",
    type: "work"
  },

  {
    year: "2021-2022",
    title: "Recherche d'emploi et développement personnel",
    description: "Réalisation de missions ponctuelles via France Travail, participation à des travaux de rénovation et apprentissage autodidacte en informatique.",
    type: "work"
  },

  {
    year: "2023-2024 (6 mois)",
    title: "Remise à niveau en développement informatique (ETNA)",
    description: "Formation intensive en développement via des projets pratiques (type 'piscine'), avec apprentissage approfondi des bases de la programmation.",
    type: "education"
  },
  {
    year: "2024-2027",
    title: "ESIEE-IT (coding factory)",
    description: "Formation en développement web (JavaScript, TypeScript, applications web).",
    type: "education"
  },
  {
    year: "2025 ( 2 mois )",
    title: "Stage Afd Tech - Automatisation & IA",
    description: "Développement en Python de systèmes d'automatisation basés sur des agents AutoGen, orchestration multi-agents, et benchmarking de modèles IA (évaluation de performances, qualité et coûts).",
    type: "work"
  }
];