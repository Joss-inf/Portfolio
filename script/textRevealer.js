/**
 * A class that handles text reveal animations by toggling CSS classes.
 * @class
 */

    /**
     * Creates a new TextRevealer instance.
     * @param {string} [visibleClass='visible'] - The CSS class name to toggle visibility.
     */

    /**
     * Adds the visible class to an element.
     * @param {HTMLElement} el - The DOM element to show.
     */

    /**
     * Removes the visible class from an element.
     * @param {HTMLElement} el - The DOM element to hide.
     */

export class TextRevealer {
    constructor(visibleClass = 'visible') {
        this.visibleClass = visibleClass;
    }

    onEnter(el) {
        el.classList.add(this.visibleClass);
    }

    onExit(el) {
        el.classList.remove(this.visibleClass);
    }
}