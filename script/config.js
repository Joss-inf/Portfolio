/**
 * @fileoverview Contains project data for portfolio display
 * @module projectData
 * 
 * @typedef {Object} Section
 * @property {string} title - Section title
 * @property {string} content - Section content text
 * @property {string} image - Path to section image
 * @property {string} alt - Alt text for section image
 * 
 * @typedef {Object} Modal
 * @property {Section[]} sections - Array of section objects
 * 
 * @typedef {Object} Project
 * @property {string} title - Project title
 * @property {string} description - Short project description
 * @property {string} image - Path to project preview image
 * @property {string} alt - Alt text for project image
 * @property {Modal} modal - Modal content configuration
 * 
 * @type {Project[]} projectsData
 * @exports projectsData
 * 
 * @description Array containing portfolio project data including titles, descriptions,
 * images and modal content configurations for detailed project information display
 */
export const projectsData = [
    {
        title: "Ecostat",
        description: "Visualiseur de statistiques environnementales",
        image: "./assets/gallery/img1.webp",
        alt: "img1.webp",
        modal: {
            sections: [
                {
                    title: "Qu'est-ce donc ?",
                    content: `Ecostat est mon projet personnel qui permet de consulter la pollution des entreprises en France`,
                    image: "./assets/gallery/img1.webp",
                    alt: 'interro'
                },
                {
                    title: "Pourquoi ?",
                    content: `Le projet vise à améliorer la transparence environnementale en rendant ces données accessibles au grand public.`,
                    image: "./assets/template/pourquoi.webp",
                    alt: 'pourquoi'
                },
                {
                    title: "Technologies",
                    content: `HTML, CSS, PHP, JavaScript, SQL`,
                    image: "./assets/template/techno.webp",
                    alt: 'techno'
                },
                {
                    title: "Organisation",
                    content: `Trello, UserStory, méthode agile`,
                    image: "./assets/template/organisation.webp",
                    alt: 'organisation'
                },
                {
                    title: "Lien",
                    content: 'https://joss.alwaysdata.net/ecostat/www/app/',
                    image: "./assets/template/link.webp",
                    alt: 'link'
                }
            ]
        }
    },
    {
        title: "PharmaHub",
        description: "Gestionnaire de commandes/pharmacies",
        image: "./assets/gallery/img11.webp",
        alt: "img11.webp",
        modal: {
            sections: [
                {
                    title: "Qu'est-ce donc ?",
                    content: `PharmaHub est un gestionnaire de commande client qui permet de regrouper plusieurs pharmacie sur un même site`,
                    image: "./assets/gallery/img11.webp",
                    alt: 'interro'
                },
                {
                    title: "Pourquoi ?",
                    content: `Le projet vise à améliorer la gestion entre plusieurs pharmacie tout en simplifiant la demande client et profesionnel tout en reduisant le coup d'entretien par entité`,
                    image: "./assets/template/pourquoi.webp",
                    alt: 'pourquoi'
                },
                {
                    title: "Technologies",
                    content: `HTML, CSS, PHP, JavaScript, SQL`,
                    image: "./assets/template/techno.webp",
                    alt: 'techno'
                },
                {
                    title: "Organisation",
                    content: `Trello, UserStory, méthode agile`,
                    image: "./assets/gallery/img7.webp",
                    alt: 'organisation'
                },
                {
                    title: "Github",
                    content: 'https://github.com/Joss-inf/projet_php_pharmacy',
                    image: "./assets/template/github.webp",
                    alt: 'github'
                }
            ]
        }
    },
    {
        title: "TowerRider",
        description: "Jeu Platformers sur mobile  ",
        image: "./assets/gallery/img3.webp",
        alt: "img3.webp",
        modal: {
            sections: [
                {
                    title: "Qu'est-ce donc ?",
                    content: ` Jeu mobile subway surfer like, le concept est d'éviter des obstacles tombant du ciel tout en grimpant un immeuble `,
                    image: "./assets/gallery/img3.webp",
                    alt: 'interro'
                },
                {
                    title: "Pourquoi ?",
                    content: `Permet de ce détendre en jouant`,
                    image: "./assets/template/pourquoi.webp",
                    alt: 'pourquoi'
                },
                {
                    title: "Technologies",
                    content: `React Native, ThreeJs, .Obj Manipulation, Blender(optimisation polygon), génération procédurale`,
                    image: "./assets/template/techno.webp",
                    alt: 'techno'
                },
                {
                    title: "Organisation",
                    content: `Trello, UserStory, méthode agile`,
                    image: "./assets/template/organisation.webp",
                    alt: 'organisation'
                },
                {
                    title: "Github",
                    content: 'https://github.com/Joss-inf/labday',
                    image: "./assets/template/github.webp",
                    alt: 'github'
                }
            ]
        }
    },
    {
        title: "Memory",
        description: "Jeu du memory sur le web",
        image: "./assets/gallery/img17.webp",
        alt: "img17.webp",
        modal: {
            sections: [
                {
                    title: "Qu'est-ce donc ?",
                    content: `Memory est un projet web permettant de jouer aux jeu du memory, il contient un leaderboard avec des scores.`,
                    image: "./assets/gallery/img17.webp",
                    alt: 'interro'
                },
                {
                    title: "Pourquoi ?",
                    content: `Permettre d'entrainer sa mémoire pour prévenir les maladies neurologiques.`,
                    image: "./assets/template/pourquoi.webp",
                    alt: 'pourquoi'
                },
                {
                    title: "Technologies",
                    content: `HTML, CSS, PHP, JavaScript, SQL`,
                    image: "./assets/template/techno.webp",
                    alt: 'techno'
                },
                {
                    title: "Organisation",
                    content: `Trello, UserStory, méthode agile`,
                    image: "./assets/template/organisation.webp",
                    alt: 'organisation'
                },
                {
                    title: "Github",
                    content: 'https://github.com/Ecole-Coding-Factory/projet-flash-pg3',
                    image: "./assets/template/github.webp",
                    alt: 'github'
                }
            ]
        }
    },
    {
        title: "Service Linux Monitoring",
        description: "Collecteur de métrique entre VM",
        image: "./assets/gallery/img13.webp",
        alt: "img13.webp",
        modal: {
            sections: [
                {
                    title: "Qu'est-ce donc ?",
                    content: `Le projet  permet de collecter des métriques (ram, cpu) entre un collector(serveur) et plusieurs agent (machine à surveiller)`,
                    image: "./assets/gallery/img13.webp",
                    alt: 'interro'
                },
                {
                    title: "Pourquoi ?",
                    content: `Le projet vise à monitorer plusieurs machine agent via une seul machine collector de façons automatisé.`,
                    image: "./assets/template/pourquoi.webp",
                    alt: 'pourquoi'
                },
                {
                    title: "Technologies",
                    content: `Python, LinuxVM Oracle, Service Linux`,
                    image: "./assets/template/techno.webp",
                    alt: 'techno'
                },
                {
                    title: "Organisation",
                    content: `Trello, UserStory, méthode agile`,
                    image: "./assets/template/organisation.webp",
                    alt: 'organisation'
                },
                {
                    title: "Github",
                    content: 'https://github.com/Joss-inf/monitoring',
                    image: "./assets/template/github.webp",
                    alt: 'github'
                }
            ]
        }
    }
];

