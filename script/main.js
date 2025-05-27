/**
 * Main script file that initializes and configures various UI components and interactions
 * @module main
 * 
 * Initializes:
 * - Toolbox utilities for year display and menu toggle
 * - Parallax scrolling effects
 * - Text reveal animations
 * - Navigation bar highlighting
 * - Project carousel/gallery
 * - Intersection observers for various UI effects
 * 
 * The script sets up multiple intersection observers through ObserverManager to handle:
 * - Parallax effects on scroll
 * - Text reveal animations
 * - Lazy loading of gallery
 * - Navigation highlighting based on scroll position
 * 
 * @requires ./projectData.js
 * @requires ./toolbox.js
 * @requires ./projectCarousel.js
 * @requires ./observerManager.js
 * @requires ./navbagHighlight.js
 * @requires ./parallalax.js
 * @requires ./textRevealer.js
 * @requires ./gallery.js
 */
import { projectsData } from "./config.js"
import { Toolbox } from "./toolbox.js"
import { ProjectCarousel } from "./projectCarousel.js"
import { ManagerObs } from "./managerObs.js"
import { NavbarHighlighter } from "./navbarHighlighter.js"
import { ParallaxEffect } from "./parallalax.js"
import { TextRevealer } from "./textRevealer.js"
import { Gallery } from './gallery.js';
const tools =  new Toolbox()
tools.applyYear()
tools.toggleMenuObs()
const parallaxEffect = new ParallaxEffect(0.5);
const textRevealer = new TextRevealer('visible');
const highlighter = new NavbarHighlighter('#nav-links');

const project = projectsData
new ProjectCarousel({
    containerSelector: ".donut-carousel",
    modalSelector: "#modal",
    projects: project
});
const observerConfigs = [
    {
        selector: '.parallax',
        thresholdIn: 0,
        thresholdOut: 0,
        repeat: true,
        onEnter: el => parallaxEffect.onEnter(el),
        onExit: el => parallaxEffect.onExit(el),
    },
    {
        selector: '.reveal-text',
        thresholdIn: 0.7,
        thresholdOut: 0.3,
        repeat: true,
        onEnter: el => textRevealer.onEnter(el),
        onExit: el => textRevealer.onExit(el),
    },
    {
        selector: '#pictures',
        thresholdIn: 0,
        thresholdOut: 0,
        repeat: false,
        onEnter: async (el) => {
            new Gallery('pictures', './assets/gallery/', 20, 200, 350);
        },
    },
    {
        selector: 'section[id]',
        thresholdIn: 0.7,
        thresholdOut: 0.3,
        repeat: true,
        onEnter: el => {
            const id = el.getAttribute('id');
            highlighter.highlight(id);
        },
        onExit: el => {
            const id = el.getAttribute('id');
            highlighter.removeHighlight(id);
        }
    }
];

new ManagerObs(observerConfigs);