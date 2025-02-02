import {genererMotCache, saisirValeur} from "./jeu.js";
import {slideRegles, creerChangerMot, afficherRegles} from "./fonctionsAnnexes.js";
import { afficherStyleJeu } from "./interface.js";
import { erreurSaisiePrenom } from "./erreurs.js";
import { finRegles, formulaire, mots } from "./globales.js";

formulaire.submit((event)=> {
    event.preventDefault()
    
    let prenomUtilisateur = $("#prenomUtilisateur").val().trim();

    if (prenomUtilisateur === "") {
        let erreurPrenom = $("#erreurPrenom");
        erreurSaisiePrenom(erreurPrenom);
    }
    else {              
        afficherRegles(prenomUtilisateur);

        finRegles.click(() => {

        afficherStyleJeu();
        genererMotCache(mots);
        saisirValeur();
        creerChangerMot();
        slideRegles();
        }
        )
    }
})















