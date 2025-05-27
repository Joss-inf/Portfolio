/**
 * Class representing a navbar highlighting functionality.
 * @class
 */
    /**
     * Create a navbar highlighter.
     * @param {string} [navSelector='nav'] - The CSS selector for the navigation element.
     */

    /**
     * Highlights a navigation link corresponding to the given ID and updates URL hash.
     * @param {string} id - The ID of the section to highlight.
     */

    /**
     * Removes 'active' class from all navigation links.
     */

    /**
     * Removes highlight from a specific navigation link.
     * @param {string} id - The ID of the section whose highlight should be removed.
     */

export class NavbarHighlighter {
    constructor(navSelector = 'nav') {
        this.nav = document.querySelector(navSelector);
        this.links = this.nav ? this.nav.querySelectorAll('a[href^="#"]') : [];
    }

    highlight(id) {
        this.clear();
        const link = this.nav.querySelector(`a[href="#${id}"]`);
        if (link) {
            link.classList.add('active');
          
            history.replaceState(null, '', `#${id}`);
        }
            
    }

    clear() {
        this.links.forEach(link => link.classList.remove('active'));
    }

    removeHighlight(id) {
        const link = this.nav.querySelector(`a[href="#${id}"]`);
        if (link) link.classList.remove('active');
    }
}