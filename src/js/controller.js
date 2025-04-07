const htmlPath = "./views/"

const cssFolderPath = "./css/theme_1/"
const jsFolderPath = "./js/"

const jsfile = "main.js"


const rooter = [
    {
        name: "home",
        html: htmlPath+"home.html", 
        css: cssFolderPath+"home.css", 
        script: jsFolderPath+"home/"+jsfile
    },
    {
        name: "project",
        html: htmlPath+"project.html", 
        css: cssFolderPath+"project.css", 
        script: jsFolderPath+"project/"+jsfile
    },
    {
        name: "about",
        html: htmlPath+"about.html", 
        css: cssFolderPath+"about.css", 
        script: jsFolderPath+"about/"+jsfile
    },
    {
        name: "ressources",
        html: htmlPath+"ressources.html", 
        css: cssFolderPath+"about.css", 
        script: jsFolderPath+"ressources/"+jsfile
    }
];

// Initialiser la page home a la  page index par défaut


    initLoad();


// Sélectionner les boutons de navigation
const navigations = document.querySelectorAll('.nav-btn');

// Ajouter un écouteur d'événement pour chaque bouton
const iframe = document.getElementById('iframe');
const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
navigations.forEach(nav => {
    nav.addEventListener('click', function() {
        const nav = document.querySelector('.nav-links');
        nav.classList.toggle('nav-active');
        const buttonId = this.getAttribute('data-id');
        const content = rooter[buttonId];
        loadHTML(content.html,iframeDocument)
            .then(() => loadCSS(content.css,iframeDocument))
            .then(() => loadJS(content.script,))    
            .then(() => {
                console.log('HTML, CSS, et JavaScript ont été chargés avec succès');
    })
    .catch(error => {
        console.error('Une erreur est survenue', error);
    });
    });
});


function loadHTML(file) {
    return new Promise((resolve, reject) => {
        const iframe = document.getElementById('iframe');
        const iframeDocument = iframe.contentDocument ;
  
        fetch(file)
            .then(response => response.text())
            .then(html => {
                
                iframeDocument.open();
                iframeDocument.write(html);
                iframeDocument.close();
                console.log('HTML chargé avec succès');
                resolve(); // Résolution de la promesse après avoir chargé le HTML
            })
            .catch(error => {
                console.error('Erreur lors du chargement du HTML:', error);
                reject(error); // Rejet de la promesse en cas d'erreur
            });
    });
}

function loadCSS(file) {
    return new Promise((resolve, reject) => {
        const iframe = document.getElementById('iframe');
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        const link = iframeDocument.createElement('link');
        link.rel = 'stylesheet';
        link.href = file;

        link.onload = () => {
            console.log(`CSS chargé avec succès : ${file}`);
            resolve(); // Résolution de la promesse lorsque le CSS est chargé
        };

        link.onerror = (error) => {
            console.error(`Erreur lors du chargement du CSS : ${file}`, error);
            reject(error); // Rejet de la promesse en cas d'erreur
        };

        iframeDocument.head.appendChild(link);
    });
}

function loadJS(file) {
    return new Promise((resolve, reject) => {
        const iframe = document.getElementById('iframe');
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;

        const script = iframeDocument.createElement('script');
        script.src = file;
        script.async = true
        script.onload = () => {
            console.log(`JavaScript chargé avec succès : ${file}`);
            resolve(); // Résolution de la promesse lorsque le JavaScript est chargé
        };

        script.onerror = (error) => {
            console.error(`Erreur lors du chargement du JavaScript : ${file}`, error);
            reject(error); // Rejet de la promesse en cas d'erreur
        };
        iframeDocument.head.appendChild(script);
    });
}


function initLoad() {
    const defaultContent = rooter[0]; 
    loadHTML(defaultContent.html)
            .then(() => loadCSS(defaultContent.css))
            .then(() => loadJS(defaultContent.script))    
            .then(() => {
                console.log('HTML, CSS, et JavaScript ont été chargés avec succès');
    })
    .catch(error => {
        console.error('Une erreur est survenue', error);
    });
}