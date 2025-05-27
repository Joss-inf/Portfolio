/**
 * A class that creates and manages an image gallery with lightbox functionality.
 * @class
 * @classdesc Creates a responsive image gallery with random image sizes and lightbox viewing capability.
 * 
 * @param {string} containerId - The ID of the HTML element that will contain the gallery.
 * @param {string} folder - The path to the folder containing the images.
 * @param {number} imageCount - The total number of images to display in the gallery.
 * @param {number} minWidth - The minimum width (in pixels) for the gallery images.
 * @param {number} maxWidth - The maximum width (in pixels) for the gallery images.
 * 
 * @property {HTMLElement} container - The gallery container element.
 * @property {string} folder - The path to the images folder.
 * @property {number} imageCount - The total number of images.
 * @property {number} minWidth - Minimum image width.
 * @property {number} maxWidth - Maximum image width.
 * @property {HTMLElement} lightbox - The lightbox element for full-size image viewing.
 * @property {HTMLElement} lightboxImg - The image element within the lightbox.
 * @property {HTMLElement} closeBtn - The close button element for the lightbox.
 * 
 * @example
 * const gallery = new Gallery('gallery-container', '/images/', 10, 200, 400);
 */
export class Gallery {
    constructor(containerId, folder, imageCount, minWidth, maxWidth) {
        this.container = document.getElementById(containerId);
        this.folder = folder;
        this.imageCount = imageCount;
        this.minWidth = minWidth;
        this.maxWidth = maxWidth;
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImg = this.lightbox.querySelector('.lightbox-img');
        this.closeBtn = this.lightbox.querySelector('.close');
        this._init();
    }

    _init() {
        this._generateImages();
        this._addListeners();
    }

    _generateImages() {
        for (let i = 1; i <= this.imageCount; i++) {
            const img = document.createElement('img');
            img.src = `${this.folder}img${i}.webp`;
            img.alt = `Image ${i}`;
            img.loading = 'lazy';
            img.decoding = 'async';
            img.classList.add('gallery-img'); // pour le style
            img.style.maxWidth = `${this._randomBetween(this.minWidth, this.maxWidth)}px`
            this.container.appendChild(img);
        }
    }

    _addListeners() {
        // Ouvrir lightbox
        this.container.addEventListener('click', e => {
            if (e.target.tagName === 'IMG') {
                this._openLightbox(e.target.src);
            }
        });

        // Fermer lightbox clic fond ou croix
        this.lightbox.addEventListener('click', e => {
            if (e.target === this.lightbox || e.target === this.closeBtn) {
                this._closeLightbox();
            }
        });
    }

    _openLightbox(src) {
        this.lightboxImg.src = src;
        this.lightbox.classList.remove('hidden');
    }

    _closeLightbox() {
        this.lightbox.classList.add('hidden');
        this.lightboxImg.src = '';
    }

    _randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}