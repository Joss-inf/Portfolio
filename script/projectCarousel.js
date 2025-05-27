/**
 * @class ProjectCarousel
 * @description A class that creates and manages a 3D carousel of projects with modal functionality
 * 
 * @property {HTMLElement} container - The main container element for the carousel
 * @property {HTMLElement} modal - The modal element for displaying project details
 * @property {HTMLElement} modalTitle - The title element in the modal
 * @property {HTMLElement} modalDesc - The description element in the modal
 * @property {HTMLElement} modalClose - The close button element in the modal
 * @property {Array} projects - Array of project data objects
 * @property {Array} slides - Array of slide elements
 * @property {number} angle - Current rotation angle of the carousel
 * @property {number} current - Current slide index
 * @property {boolean} isRotating - Flag to prevent multiple simultaneous rotations
 * @property {Audio} audio - Audio object for click sound effects
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.containerSelector - CSS selector for the carousel container
 * @param {string} options.modalSelector - CSS selector for the modal
 * @param {Array} options.projects - Array of project data objects
 * 
 * @example
 * const carousel = new ProjectCarousel({
 *   containerSelector: '#carousel-container',
 *   modalSelector: '#modal',
 *   projects: projectsData
 * });
 */

/**
 * @method init
 * @description Initializes the carousel by loading projects, updating the display, and attaching event listeners
 */

/**
 * @method restartAudio
 * @description Plays the click sound effect, with error handling for browsers that block autoplay
 */

/**
 * @method loadProjects
 * @description Loads all projects into the carousel container and sets up initial parameters
 */

/**
 * @method createProjectElement
 * @description Creates a DOM element for a project with image and description
 * @param {Object} projectData - Project data object
 * @param {string} projectData.title - Project title
 * @param {string} projectData.description - Project description
 * @param {string} projectData.image - Project image URL
 * @param {string} projectData.alt - Image alt text
 * @returns {HTMLElement} The created project element
 */

/**
 * @method escapeHTML
 * @description Escapes HTML special characters to prevent XSS
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */

/**
 * @method getRadius
 * @description Calculates the radius needed for the carousel based on length and number of sides
 * @param {number} length - Length parameter for radius calculation
 * @param {number} sides - Number of sides in the carousel
 * @returns {number} Calculated radius
 */

/**
 * @method updateCarousel
 * @description Updates the position and rotation of all slides in the carousel
 */

/**
 * @method rotate
 * @description Rotates the carousel in the specified direction
 * @param {number} [dir=1] - Direction of rotation (1 for left, -1 for right)
 */

/**
 * @method attachEvents
 * @description Attaches all necessary event listeners for carousel interaction
 */

/**
 * @method popup
 * @description Displays the modal with project details and handles section navigation
 * @param {Object} projectData - Project data to display in the modal
 */
export class ProjectCarousel {
    constructor({ containerSelector, modalSelector, projects }) {
        this.container = document.querySelector(containerSelector);
        this.modal = document.querySelector(modalSelector);
        this.modalTitle = this.modal.querySelector('#modal-title');
        this.modalDesc = this.modal.querySelector('#modal-desc');
        this.modalClose = this.modal.querySelector('.close');
        this.projects = projects;
        this.slides = [];
        this.angle = 0;
        this.current = 0;
        this.isRotating = false;
        this.audio = new Audio('./assets/audio/click.mp3')
        this.init();
    }

    init() {
        this.loadProjects();
        this.updateCarousel();
        this.attachEvents();
    }
    ;

    restartAudio() {
      
        this.audio.play().catch(e => {
            // Gestion d'erreur, par ex. si play est bloqué par navigateur
            console.log('Erreur play:', e);
        });
    }
    loadProjects() {
        this.container.innerHTML = '';
        this.projects.forEach(data => {
            const el = this.createProjectElement(data);
            this.container.appendChild(el);
        });
        this.slides = Array.from(this.container.querySelectorAll('.project'));
        this.radius = this.getRadius(300 + window.innerWidth / 2, this.slides.length);
        this.total = this.slides.length;
    }

    createProjectElement({ title, description, image, alt }) {
        const div = document.createElement('div');
        const img = document.createElement('img');
        const windowDiv = document.createElement('div');
        const h3 = document.createElement('h3');
        const p = document.createElement('p');
        div.className = 'project';

        img.src = encodeURI(image);
        img.alt = this.escapeHTML(alt);
        img.loading = "lazy";
        img.decoding = 'async';
        windowDiv.className = 'window';

        h3.textContent = this.escapeHTML(title);
        p.textContent = this.escapeHTML(description);

        // Assemble la structure
        windowDiv.appendChild(h3);
        windowDiv.appendChild(p);
        div.appendChild(img);
        div.appendChild(windowDiv);

        return div;
    }

    escapeHTML(str) {
        return str.replace(/[&<>"']/g, match => {
            const escapeChars = { '&': "&amp;", '<': "&lt;", '>': "&gt;", '"': "&quot;", "'": "&#39;" };
            return escapeChars[match];
        });
    }

    getRadius(length, sides) {
        return length / (2 * Math.sin(Math.PI / sides));
    }

    updateCarousel() {
        if (this.isRotating) return;
        this.isRotating = true;

        this.slides.forEach((slide, i) => {
            const theta = (2 * Math.PI / this.total) * i + this.angle;
            const x = Math.sin(theta) * this.radius;
            const z = Math.cos(theta) * this.radius - this.radius;

            slide.style.transition = 'transform 0.3s ease';
            slide.style.transform = `translateX(${x}px) translateZ(${z}px) translateY(${z / 3}px) rotateY(${theta}rad)`;
            slide.style.zIndex = Math.round(z);
        });

        setTimeout(() => {
            this.isRotating = false;
        }, 150);
    }

    rotate(dir = 1) {
        if (this.isRotating) return;
        this.current += dir;

        this.angle = -(2 * Math.PI / this.total) * this.current
        this.updateCarousel();
    }

    attachEvents() {
        document.getElementById('carousel-left')?.addEventListener('click', () => {
            
                this.restartAudio();
                this.rotate(1);
           
        })

        document.getElementById('carousel-right')?.addEventListener('click', () => {
           
                this.restartAudio();
                this.rotate(-1);
        })




        this.container.addEventListener('click', (e) => {
            const slide = e.target.closest('.project');
            if (!slide) return;

            const z = parseInt(slide.style.zIndex);
            const maxZ = Math.max(...this.slides.map(s => parseInt(s.style.zIndex)));
            if (z !== maxZ) return;

            slide.style.transform += " rotateY(180deg)";

            setTimeout(() => this.popup(projectsData[((this.current % this.total) + this.total) % this.total]
            ), 40);
        });

        this.modalClose.addEventListener('click', () => {
            this.modal.classList.add('hidden');
            setTimeout(() => this.modal.classList.add('back'), 100);
            this.updateCarousel();
        });
    }
    popup(projectData) {
        const modal = document.getElementById('modal');
        const modalContent = modal.querySelector('.content');
        const modalImg = modal.querySelector('img');
        const valueDisplay = document.getElementById("value");
        const slider = document.getElementById('slider');
        const sections = projectData.modal?.sections || [];

        slider.min = 0;
        slider.max = sections.length - 1;
        slider.value = 0;
        valueDisplay.textContent = 0;

        while (modalContent.firstChild) {
            modalContent.removeChild(modalContent.firstChild);
        }

        // Créer le conteneur de section
        const sectionContainer = document.createElement('div');
        sectionContainer.className = 'text fade show';
        sectionContainer.id = 'section-container';
        modalContent.appendChild(sectionContainer);

        // Fonction pour mettre à jour l'affichage d'une section
        function renderSection(index) {
            const section = sections[index];

            // Transition out
            sectionContainer.classList.remove("show");
            modalImg.style.opacity = 0;
            modalImg.loading = 'lazy'
            modalImg.decoding = 'async'
            setTimeout(() => {
                // Nettoyage
                sectionContainer.textContent = '';

                if (section) {
                    const h2 = document.createElement('h2');
                    h2.textContent = section.title;

                    const p = document.createElement('p');
                    p.textContent = section.content;

                    sectionContainer.appendChild(h2);
                    sectionContainer.appendChild(p);

                    modalImg.src = section.image;
                    modalImg.style.opacity = 1;
                } else {
                    const p = document.createElement('p');
                    p.textContent = 'Aucune section à afficher.';
                    sectionContainer.appendChild(p);
                }

                // Transition in
                sectionContainer.classList.add("show");
            }, 300); // correspond à la durée de la transition CSS
        }

        // Premier affichage
        renderSection(0);

        // Slider input
        slider.addEventListener("input", () => {
            const index = parseInt(slider.value);
            valueDisplay.textContent = index;
            renderSection(index);
        });

        modal.classList.remove('hidden');
        modal.classList.remove('back');
    }
}