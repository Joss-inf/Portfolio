document.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    document.querySelectorAll('.step').forEach((step, index) => {
        const depth = parseInt(step.style.transform.match(/translateZ\((-?\d+)px\)/)[1]);
        step.style.transform = `translateZ(${depth}px) translateY(${scrollTop * (index + 1) * 0.1}px)`;
    });
});