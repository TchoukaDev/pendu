import { regles, finRegles, bienvenue, formulaire } from "./globales.js";
import { genererMotCache } from "./jeu.js";
import { mots } from "./globales.js";



export let nombreAleatoire;
let indexMot = 0; 

export function afficherRegles(prenom) {
    const erreurPrenom = $("#erreurPrenom");
    bienvenue.html(`Bonjour ${prenom}. Voici les règles du jeu:`);
    formulaire.remove();
    erreurPrenom.remove();
    regles.css("display", "block");
    finRegles.css("display", "block");
}

export function genererNombreAleatoire(max) {
    do {
    nombreAleatoire = Math.floor(Math.random() * Math.floor(max))
    }
    while (nombreAleatoire === indexMot)
    indexMot = nombreAleatoire;
    return nombreAleatoire
}    

export function normaliserLettre(lettre) {
    const mapping = {
        "é": "e", "è": "e", "ê": "e", "ë": "e",
        "à": "a", "â": "a", "ä": "a",
        "ô": "o", "ö": "o",
        "î": "i", "ï": "i",
        "û": "u", "ù": "u", "ü": "u",
        "ç": "c"
    };
    return mapping[lettre] || lettre;
}

export function normaliserMot(mot) {
    return mot.split('').map(normaliserLettre).join(''); // Isoler chaque lettre pour la normaliser puis recréer le mot
}


export function etatPendu(nombre) {
    $("#imagePendu").attr("src", `images/pendu${nombre}.jpg`).attr("alt", `Image du pendu avec ${nombre} tentatives restantes`);
}

export function creerChangerMot() {
    const changerMot = $("<button>Changer de mot</button>")
        .attr("id", "boutonChangerMot")        
        .addClass("bouton")
        .addClass("hover");
    $("#changerMot").append(changerMot);
    changerMot.click(() => {
        $("span").remove();
        genererMotCache(mots);
        })
    }

export function slideRegles() {
    const toggleRegles = $("<button> Afficher les règles </button>").attr("id", "toggleRegles");
    toggleRegles.addClass("bouton");
    toggleRegles.addClass("hover");
    toggleRegles.addClass("toggleRegles");
    $("#containerToggleRegles").append(toggleRegles);
    regles.css("font-size", "0.8em")

    toggleRegles.click(() => {
        if (toggleRegles.text().includes("Afficher")) {
            regles.slideDown();
            toggleRegles.text("Masquer les règles")
           
        }
        else {
            regles.slideUp();
            toggleRegles.text("Afficher les règles");
        }
    })
}

