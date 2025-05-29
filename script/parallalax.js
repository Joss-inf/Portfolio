export class ParallaxEffect {
    constructor(speed = 0.3) {
        this.speedConfig = speed; // Configuration de la vitesse (nombre ou fonction)
        this.elementsData = new Map(); // Stocke les données pour chaque élément parallax
        this.isUpdateScheduled = false; // Indicateur pour requestAnimationFrame

        // Lier les méthodes pour assurer le contexte 'this'
        this.scrollHandler = this.scrollHandler.bind(this);
        this.performUpdate = this.performUpdate.bind(this);
        this.recalculateOffsets = this.recalculateOffsets.bind(this);

        this.bindEvents();
    }

    /**
     * Ajoute un élément à gérer par l'effet de parallaxe.
     * @param {HTMLElement} el - L'élément à ajouter.
     */
    onEnter(el) {
        if (!el || !el.parentElement) {
            // console.warn('ParallaxEffect: Élément ou son parent est nul.', el);
            return;
        }
        // Si l'élément est déjà suivi, ne rien faire
        if (this.elementsData.has(el)) return;

        // Indication de performance pour le navigateur
        ;

        const parent = el.parentElement;
        // Calcule et met en cache le décalage initial du parent par rapport au document
        const initialDocParentOffsetTop = parent.getBoundingClientRect().top + window.scrollY;
        const currentSpeed = this._getElementSpeed(el);

        this.elementsData.set(el, {
            parent: parent,
            initialDocParentOffsetTop: initialDocParentOffsetTop, // Valeur mise en cache
            currentSpeed: currentSpeed,
        });

        // Demande une mise à jour pour positionner l'élément correctement dès son ajout
        this.requestUpdate();
    }

    /**
     * Supprime un élément de l'effet de parallaxe et réinitialise son style.
     * @param {HTMLElement} el - L'élément à supprimer.
     */
    onExit(el) {
        if (this.elementsData.has(el)) {
            this.elementsData.delete(el);
            el.style.transform = '';
            el.style.willChange = ''; // Réinitialise l'indication
        }
    }

    /**
     * Récupère la vitesse pour un élément spécifique basé sur speedConfig.
     * @private
     * @param {HTMLElement} el - L'élément.
     * @returns {number} La vitesse.
     */
    _getElementSpeed(el) {
        return typeof this.speedConfig === 'function' ? this.speedConfig(el) : this.speedConfig;
    }

    /**
     * Fonction appelée par requestAnimationFrame pour effectuer les mises à jour de style.
     * @private
     */
    performUpdate() {
        this.isUpdateScheduled = false; // Permet de planifier de nouvelles mises à jour

        if (!this.elementsData.size) return; // Aucun élément à mettre à jour

        const currentScrollY = window.scrollY;

        for (const [el, data] of this.elementsData) {
            // Calcule la position actuelle du haut du parent par rapport à la fenêtre (viewport)
            const parentViewportTop = data.initialDocParentOffsetTop - currentScrollY;
            const yPos = parentViewportTop * data.currentSpeed;
            
            // .toFixed(2) peut aider à lisser en évitant les micro-changements de chaîne pour transform
            const newTransform = `translateY(-${yPos.toFixed(2)}px)`;

            // Micro-optimisation : ne met à jour le style que s'il a réellement changé
            // Les navigateurs sont souvent intelligents à ce sujet, mais une vérification explicite peut être utile
            if (el.style.transform !== newTransform) {
                el.style.transform = newTransform;
            }
        }
    }

    /**
     * Gestionnaire d'événement direct pour le défilement.
     * Planifie la mise à jour via requestAnimationFrame.
     * @private
     */
    scrollHandler() {
        if (!this.isUpdateScheduled) {
            this.isUpdateScheduled = true;
            requestAnimationFrame(this.performUpdate);
        }
    }

    /**
     * Recalcule les décalages initiaux pour tous les éléments.
     * Utile lors du redimensionnement de la fenêtre, car la mise en page peut changer.
     * @private
     */
    recalculateOffsets() {
        const currentScrollY = window.scrollY; // Obtenir currentScrollY une seule fois
        for (const [el, data] of this.elementsData) {
            if (el.parentElement) { // Vérifie si l'élément et le parent existent toujours
                data.parent = el.parentElement; // Met à jour la référence du parent
                // Recalcule le décalage initial du parent par rapport au document
                data.initialDocParentOffsetTop = el.parentElement.getBoundingClientRect().top + currentScrollY;
                // Réévalue la vitesse si elle est dynamique
                data.currentSpeed = this._getElementSpeed(el);
            } else {
                // Si l'élément ou le parent a été détaché, le supprime de l'effet
                this.onExit(el); // Assure le nettoyage (style, willChange, suppression de la map)
            }
        }
        // Après le recalcul, demande immédiatement une mise à jour pour refléter les nouvelles positions
        this.requestUpdate();
    }
    
    /**
     * Méthode utilitaire pour demander une mise à jour, centralisant la logique de planification de rAF.
     * @private
     */
    requestUpdate() {
        // Ne planifie une mise à jour que s'il y a des éléments et qu'aucune mise à jour n'est déjà planifiée
        if (!this.isUpdateScheduled && this.elementsData.size > 0) {
            this.isUpdateScheduled = true;
            requestAnimationFrame(this.performUpdate);
        }
    }

    /**
     * Met en place les écouteurs d'événements.
     * @private
     */
    bindEvents() {
        // { passive: true } indique que le listener ne va pas appeler preventDefault(),
        // ce qui peut améliorer les performances de défilement.
        window.addEventListener('scroll', this.scrollHandler, { passive: true });
        window.addEventListener('resize', this.recalculateOffsets, { passive: true });
    }

    /**
     * Nettoie les écouteurs d'événements et les styles des éléments.
     * Appelez cette méthode lorsque l'effet de parallaxe n'est plus nécessaire pour éviter les fuites de mémoire.
     */
    destroy() {
        window.removeEventListener('scroll', this.scrollHandler);
        window.removeEventListener('resize', this.recalculateOffsets);

        // Itérer sur une copie des clés car onExit modifie la Map pendant l'itération
        for (const el of Array.from(this.elementsData.keys())) {
            this.onExit(el); // Réinitialise les styles et supprime de la map
        }
        // this.elementsData.clear(); // Redondant si tous les éléments sont correctement sortis via onExit
    }
}