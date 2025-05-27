/**
 * @class toolbox
 * @description A utility class for handling UI interactions and dynamic content updates
 */

/**
 * @method toggleMenuObs
 * @description Sets up an event listener for the menu button to toggle navigation
 */

/**
 * @method toggleMenu
 * @description Toggles the navigation menu's visibility and updates the burger icon
 */

/**
 * @method applyYear
 * @description Updates the year element with the current year
 */
export class toolbox {
    constructor() {

    }
    toggleMenuObs() {
        const menu = document.getElementById('menu')
        menu.addEventListener('click', () => {
            this.toggleMenu()
        })
    }
    toggleMenu() {
        const navlist = document.getElementById('nav-links');
        const burger = document.querySelector('.burger');
        navlist.classList.toggle('open');
        burger.textContent = navlist.classList.contains('open') ? '✕' : '☰';
    }
    applyYear() {
        document.getElementById('current-year').textContent = new Date().getFullYear();
    }
}