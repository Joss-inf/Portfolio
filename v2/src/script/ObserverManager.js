export class ObserverManager {
    constructor(configs) {
        this.targets = new Map();
        this.observer = new IntersectionObserver(this.handleIntersect.bind(this), {
            threshold: this.generateAllThresholds(configs)
        });
        this.init(configs);
    }

    generateAllThresholds(configs) {
        // Collecte tous les thresholds nécessaires, et les trie
        const thresholds = new Set();
        configs.forEach(cfg => {
            thresholds.add(cfg.thresholdIn ?? 0.1);
            thresholds.add(cfg.thresholdOut ?? 0.0);
        });
        return [...thresholds].sort((a, b) => a - b);
    }

    init(configs) {
        configs.forEach(cfg => {
            const elements = cfg.selector.startsWith('#')
                ? [document.querySelector(cfg.selector)]
                : document.querySelectorAll(cfg.selector);

            elements.forEach(el => {
                if (!el) return;
                this.targets.set(el, {
                    onEnter: cfg.onEnter,
                    onExit: cfg.onExit,
                    repeat: cfg.repeat ?? true,
                    thresholdIn: cfg.thresholdIn ?? 0.1,
                    thresholdOut: cfg.thresholdOut ?? 0.0,
                    triggered: false
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
