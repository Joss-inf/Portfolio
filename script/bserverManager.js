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
export class ObserverManager {
    constructor(configs = []) {
        this.targets = new Map();
        this.observer = new IntersectionObserver(
            this.handleIntersect.bind(this),
            { threshold: this.getThresholds(configs) }
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
                    triggered: false,
                });
                this.observer.observe(el);
            });
        });
    }

    handleIntersect(entries) {
        entries.forEach(entry => {
            const el = entry.target;
            const cfg = this.targets.get(el);
            if (!cfg) return;
            const ratio = entry.intersectionRatio;
            if (ratio >= cfg.thresholdIn) {
                if (!cfg.repeat && cfg.triggered) return;
                cfg.onEnter?.(el);
                cfg.triggered = true;
            } else if (ratio <= cfg.thresholdOut) {
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