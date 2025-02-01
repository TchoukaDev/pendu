import { genererJeu } from "./module.js";
import { regles } from "./fonctionsAnnexes.js";

const formulaire        = $("form");


formulaire.submit((event)=> {
    event.preventDefault()
    
    const prenomUtilisateur = $("#prenomUtilisateur").val().trim();
    const erreurPrenom           = $("#erreurPrenom");

    if (prenomUtilisateur === "") {
        erreurPrenom.text("Merci de saisir un prénom valide.");
        erreurPrenom.css("color", "red");
    }
    else {              
        const bienvenue = $("#bienvenue")
        const finRegles = $("#finRegles")
        bienvenue.html(`Bonjour ${prenomUtilisateur}. Voici les règles du jeu:`);
        formulaire.remove();
        erreurPrenom.remove();
        regles.css("display", "block");
        finRegles.css("display", "block");
        finRegles.click(() => {
        genererJeu();
        }
        )
    }
})















