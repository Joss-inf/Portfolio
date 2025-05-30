/**
 * A class that manages Intersection Observer configurations for multiple elements.
 * @class
 */

/**
 * @constructor
 * @param {Array<Object>} configs - Array of configuration objects for observers
 * @param {string} configs[].selector - CSS selector for target elements
 * @param {function} [configs[].onEnter] - Callback function when element enters viewport
 * @param {function} [configs[].onExit] - Callback function when element exits viewport
 * @param {boolean} [configs[].repeat=true] - Whether to repeat callbacks on re-entry
 * @param {number} [configs[].thresholdIn=0] - Intersection ratio threshold for entry
 * @param {number} [configs[].thresholdOut=0] - Intersection ratio threshold for exit
 */

/**
 * Calculates unique threshold values from configurations
 * @private
 * @param {Array<Object>} configs - Array of configuration objects
 * @returns {Array<number>} Sorted array of unique threshold values
 */

/**
 * Initializes observers for all configured elements
 * @private
 * @param {Array<Object>} configs - Array of configuration objects
 */

/**
 * Handles intersection events for observed elements
 * @private
 * @param {Array<IntersectionObserverEntry>} entries - Array of intersection entries
 */

/**
 * Destroys the observer manager, disconnecting all observers and clearing targets
 * @public
 */

export class ManagerObs {
    constructor(configs = []) {
        this.targets = new Map();
        this.observer = new IntersectionObserver(
            this.handleIntersect.bind(this),
            {
                threshold: this.getThresholds(configs),
                rootMargin: this.getRootMargin(configs)
            }
        );
        this.init(configs);
    }

    getThresholds(configs) {
        const thresholds = new Set();
        configs.forEach(cfg => {
            thresholds.add(cfg.thresholdIn ?? 0);
            thresholds.add(cfg.thresholdOut ?? 0);
        });
        return [...thresholds].sort();
    }

    getRootMargin(configs) {
        return configs.find(cfg => cfg.rootMargin)?.rootMargin || '0px';
    }

    init(configs) {
        configs.forEach(cfg => {
            const els = cfg.selector.startsWith('#')
                ? [document.querySelector(cfg.selector)]
                : document.querySelectorAll(cfg.selector);

            els.forEach(el => {
                if (!el) return;
                this.targets.set(el, {
                    onEnter: cfg.onEnter,
                    onExit: cfg.onExit,
                    repeat: cfg.repeat ?? true,
                    thresholdIn: cfg.thresholdIn ?? 0,
                    thresholdOut: cfg.thresholdOut ?? 0,
                    rootMargin: cfg.rootMargin ?? '0px',
                    compareTo: cfg.compareTo ?? 'sectionSize', // 'viewport' ou 'sectionSize'
                    triggered: false,
                });
                this.observer.observe(el);
            });
        });
    }

    handleIntersect(entries) {
    const viewportHeight = window.innerHeight;

    entries.forEach(entry => {
            
        const el = entry.target;
        const cfg = this.targets.get(el);
        if (!cfg) return;

        const visibleHeight = entry.intersectionRect.height;
        const ratioViewport = visibleHeight / viewportHeight;
        const ratioSection = entry.intersectionRatio;
        if (cfg.compareTo === 'viewport') {
            if (ratioViewport >= cfg.thresholdIn) {
                if (!cfg.repeat && cfg.triggered) return;
                cfg.onEnter?.(el);
                cfg.triggered = true;
            } else if (ratioViewport <= cfg.thresholdOut) {
                cfg.onExit?.(el);
                if (cfg.repeat) cfg.triggered = false;
            }
            return;
        }

        // default: section size
        if (ratioSection >= cfg.thresholdIn) {
            if (!cfg.repeat && cfg.triggered) return;
            cfg.onEnter?.(el);
            cfg.triggered = true;
        } else if (ratioSection <= cfg.thresholdOut) {
            cfg.onExit?.(el);
            if (cfg.repeat) cfg.triggered = false;
        }
    });
}

    destroy() {
        this.observer.disconnect();
        this.targets.clear();
    }
}
