function debounce(func, wait = 100) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export class NavbarHighlighter {
    constructor(navSelector = 'nav') {
        this.nav = document.querySelector(navSelector);
        this.links = this.nav ? this.nav.querySelectorAll('a[href^="#"]') : [];
        this.sections = [];
        this.lastLink = null;

        this.initSections();
        this.listenToScroll();
    }

    initSections() {
        this.sections = Array.from(this.links)
            .map(link => {
                const id = link.getAttribute('href').replace('#', '');
                const section = document.getElementById(id);
                return section ? { id, element: section } : null;
            })
            .filter(Boolean);
    }

    listenToScroll() {
        const debouncedHighlight = debounce(() => this.highlightCurrent(), 20);
        window.addEventListener('scroll', debouncedHighlight);
        window.addEventListener('load', () => this.highlightCurrent());
    }

    highlightCurrent() {
        const scrollMiddle = window.scrollY + window.innerHeight / 2;

        for (const section of this.sections) {
            const top = section.element.offsetTop;
            const bottom = top + section.element.offsetHeight;

            if (scrollMiddle >= top && scrollMiddle < bottom) {
                this.highlight(section.id);
                return;
            }
        }

        this.clear();
    }

    highlight(id) {
        if (this.lastLink) {
            this.lastLink.classList.remove('active');
        }

        const link = this.nav.querySelector(`a[href="#${id}"]`);
        if (link) {
            link.classList.add('active');
            this.lastLink = link;

            const currentHash = window.location.hash.replace('#', '');
            if (currentHash !== id) {
                history.replaceState(null, '', `#${id}`);
            }
        }
    }

    clear() {
        this.links.forEach(link => link.classList.remove('active'));
        this.lastLink = null;
    }

    removeHighlight(id) {
        const link = this.nav.querySelector(`a[href="#${id}"]`);
        if (link) link.classList.remove('active');
    }
}
