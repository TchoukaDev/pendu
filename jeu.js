import { etatPendu, genererNombreAleatoire, nombreAleatoire, normaliserLettre, normaliserMot} from "./fonctionsAnnexes.js";
import { erreurSaisieIncorrecte } from "./erreurs.js";
import { afficherPopup, cacherPopup, activerElements, desactiverElements, confettis, afficherReponsesEssayees } from "./interface.js"
import { boutonsJeu, inputsJeu, mots, erreurSaisie, lettresSaisies, motsSaisis } from "./globales.js";

let motEpele;
let tableauLettresEssayees
let tableauMotsEssayes
let tentativesRestantes;
let motCache;
let lettreSaisie;
let motSaisi;


export function genererMotCache(tableau) {
    // Initialisation
    tableauLettresEssayees = [];   
    tableauMotsEssayes = [];
    tentativesRestantes = 10;
    afficherReponsesEssayees(tableauLettresEssayees, lettresSaisies, "Lettres essayées:");
    afficherReponsesEssayees (tableauMotsEssayes, motsSaisis, "Mots essayés:");

    genererNombreAleatoire(mots.length);
    
    motCache = tableau[nombreAleatoire].toUpperCase();
    motEpele = [...motCache];

    // création de span pour cacher et identifier chaque lettre
    motEpele.forEach ((lettre, index) => {
        const span   = $("<span></span>")
        span.text(lettre)
        span.addClass("transparent");
        $("#motCache").append(span);
        span.attr("id", `span${lettre}${index}`)
        }
    )
    afficherTentatives(tentativesRestantes);
    etatPendu(tentativesRestantes);
}


export function saisirValeur() {

    $("#saisirLettre, #saisirMot").keyup(function(event) {
        if(event.key === "Enter") {
            analyserSaisie()
        }
    })

     $("#validerSaisie").click(() => {
        analyserSaisie();       
    })
}

function analyserSaisie() {
    motSaisi     = $("#saisirMot").val().trim();
    lettreSaisie = $("#saisirLettre").val().trim();

    if ((lettreSaisie === "" && motSaisi === "") || (lettreSaisie !== "" && motSaisi !== "")) {
        erreurSaisieIncorrecte(erreurSaisie, "Veuillez saisir une lettre ou un mot");
    }
    else {
        erreurSaisieIncorrecte(erreurSaisie, "");
        verifier();
    }
}

function verifier() {
    // Réinitialisation des cases et erreur
    $("#saisirLettre").val("");
    $("#saisirMot").val("");
    erreurSaisie.text("");
    
    $("#containerSaisies").css("display", "block");

    // Transformer lettres spéciales en lettres simples, puis en majuscules
    if (lettreSaisie !== "") {
        lettreSaisie = lettreSaisie.toLowerCase();
        lettreSaisie = normaliserLettre(lettreSaisie).toUpperCase();

        
        if (!tableauLettresEssayees.includes(lettreSaisie)) {
            tableauLettresEssayees.push(lettreSaisie);
            afficherReponsesEssayees(tableauLettresEssayees, lettresSaisies, "Lettres essayées:");

           
            let positionsLettre = [];

            motEpele.forEach((lettre, index) => {
                if (lettre === lettreSaisie) {
                    positionsLettre.push(index);
                }
            });
            // Associer lettre saisie à sa position dans le mot pour l'identifier et la dévoiler
            if (positionsLettre.length > 0) {
                positionsLettre.forEach((position) => {
                    let lettreDevoilee = $(`#span${lettreSaisie}${position}`);
                    lettreDevoilee.css("color", "midnightblue");
                });
                VerificationLettresDevoilees();
            } else {
                tentativesRestantes--;
                afficherTentatives(tentativesRestantes, motCache);
                etatPendu(tentativesRestantes);
            }
        } else {
            erreurSaisie.text("Vous avez déjà essayé cette lettre.");
        }
        // idem que pour les lettres
    } else if (motSaisi !== "") {
        motSaisi = motSaisi.toLowerCase();
        motSaisi = normaliserMot(motSaisi).toUpperCase();

        if (motSaisi === motCache) {
            partieGagnee("Félicitations, vous avez gagné!");
        } else if (tableauMotsEssayes.includes(motSaisi)) {
            erreurSaisie.text("Vous avez déjà essayé ce mot");
        } else {
            tableauMotsEssayes.push(motSaisi);
            afficherReponsesEssayees (tableauMotsEssayes, motsSaisis, "Mots essayés:");
            tentativesRestantes--;
            afficherTentatives(tentativesRestantes, motCache);
            etatPendu(tentativesRestantes);
        }
    }
}


function VerificationLettresDevoilees() {
    let compteurLettre = 0

    //Gagner partie si toutes les lettres sont dévoilées
    motEpele.forEach((lettre, index) => {
        let spanLettre = $(`#span${lettre}${index}`);
        if ((spanLettre).css("color") === "rgb(25, 25, 112)") {
            compteurLettre ++
        }
    })

    if (compteurLettre === motEpele.length){
        partieGagnee("Félicitations, vous avez gagné!");
    }
}

function afficherTentatives(nombre, mot) {
 
    let idTentativesRestantes = $("#tentativesRestantes");
    idTentativesRestantes.text(`Tentatives restantes: ${nombre}`)
    idTentativesRestantes.addClass("tentativesRestantes");
    if (nombre >= 8) {
        idTentativesRestantes.css("color", "green");        
    }
    else if (nombre === 6 || nombre === 7) {
        idTentativesRestantes.css("color", "goldenrod");
    }
    else if (nombre <= 5 && nombre >= 3) {
        idTentativesRestantes.css("color", "coral");
    }
    else if (nombre === 1 || nombre === 2) {
        idTentativesRestantes.css("color", "red");
    }
    else {
        partiePerdue(`Dommage, vous avez perdu! Le mot secret était "${mot}".`);
    }
}

function partiePerdue(message) {
    const penduPerdu = $("<img>").attr("src", "images/pendu0.jpg");
    $("#textePopup").before(penduPerdu);
    afficherPopup(message);
    recommencer(penduPerdu);
}

function partieGagnee(message) {
    const penduGagne = $("<img>").attr("src", "images/penduGagne.jpg");
    $("#textePopup").before(penduGagne);
    desactiverElements(inputsJeu);
    desactiverElements(boutonsJeu);
    afficherPopup(message);
    confettis();
    recommencer(penduGagne);
    
};

function recommencer(image) {

    $("#recommencer").off("click");
    $("#recommencer").click(() => {
        $("span").remove();
        cacherPopup(image);     
        genererMotCache(mots);
        activerElements(inputsJeu);
        activerElements(boutonsJeu);
        boutonsJeu.addClass("hover");
    })
}


