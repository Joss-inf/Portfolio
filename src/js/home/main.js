function scrollToSection(sectionId) {
    const audio = document.getElementById('audio');
    audio.play();
    const section = document.getElementById(sectionId)
    section.scrollIntoView({
        behavior: 'smooth', // Défilement fluide
        block: 'start' // Fait défiler jusqu'au début de la section
    });
}
