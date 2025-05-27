/**
 * Class representing a parallax scrolling effect.
 * @class
 */
    /**
     * Create a parallax effect.
     * @param {(number|function)} [speed=0.3] - The speed of the parallax effect or a function that returns the speed for an element.
     */

    /**
     * Add an element to the parallax effect.
     * @param {HTMLElement} el - The element to add parallax effect to.
     */
   

    /**
     * Remove an element from the parallax effect and reset its transform.
     * @param {HTMLElement} el - The element to remove parallax effect from.
     */
   

    /**
     * Get the speed for a specific element.
     * @param {HTMLElement} el - The element to get speed for.
     * @returns {number} The speed value for the element.
     * @private
     */
   

    /**
     * Bind scroll event listener with requestAnimationFrame for smooth performance.
     * Limits update rate to 120 FPS.
     * @private
     */
   

    /**
     * Update positions of elements on scroll.
     * Calculates new position based on parent element's position and speed.
     * @private
     * @async
     */
    

export class ParallaxEffect {
      constructor(speed = 0.3) {
        this.speed = speed;
        this.elements = new Set();
        this.ticking = false;
        this.lastPosY = []
        this.onScroll = this.onScroll.bind(this);
        this.bindScroll();
      }

      onEnter(el) {
        this.elements.add(el);
      }

      onExit(el) {
        this.elements.delete(el);
        el.style.transform = '';
      }

      getSpeed(el) {
        return typeof this.speed === 'function' ? this.speed(el) : this.speed;
      }

      bindScroll() {
        let lastCall = 0;
        const fpsInterval = 1000 / 120;
        let ticking = false;

        window.addEventListener('scroll', () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame((now) => {
              const elapsed = now - lastCall;
              if (elapsed > fpsInterval) {
                lastCall = now;
                this.onScroll();  // ou simplement onScroll()
              }
              ticking = false;
            });
          }
        });
      }

      async onScroll() {
        let i = -1

        for (const el of this.elements) {
          i++
          const speed = this.getSpeed(el);

          const parentRect = await el.parentElement.getBoundingClientRect();
          const yPos = parentRect.top * speed;


          el.style.transform = `translateY(-${Math.round(yPos)}px)`;
        }
      }
    }