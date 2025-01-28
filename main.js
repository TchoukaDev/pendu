const mots = ["console", "manette", "zelda", "mario", "switch", "playstation", "nintendo", "ubisoft", "sony", "microsoft", "minecraft", "sonic", "pokemon", 
              "television", "Konami", "divertissement", "graphisme", "xbox", "tetris", "multijoueur", "gameplay", "debuff", "craft", "jouabilité", "experience",
              "roguelike", "retrogaming", "speedrun", "succes", "videoludique", "fallout", "metroid", "rayman", "warcraft", "capcom", "activision"];
let nombreAleatoire;
const regles            = $("#regles");
const formulaire        = $("form");
let lettreSaisie;
let motSaisi;
let tentativesRestantes = 10;


formulaire.submit((event)=> {
    event.preventDefault()
    
    const prenomUtilisateur = $("#prenomUtilisateur").val().trim();
    console.log.prenomUtilisateur;
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
          afficherJeu();
          genererJeu();
        }
        )
    }
})

function afficherJeu() {
    bienvenue.remove()
    regles.css("display", "none");
    finRegles.remove();
    $("#inputSaisies").css("display", "block");      
    $("#pendu").css("display", "block");
    afficherMasquerRegles();   
}

function genererJeu() {
    erreurSaisie();
    genererMot(mots);
    changerMot();

}

function genererMot(tableau) {
    tentativesRestantes = 10;
    genererNombreAleatoire(mots.length);
    const motEpele = [...tableau[nombreAleatoire]]

    motEpele.forEach ((lettre) => {
        const span = $("<span></span>")
        span.text(lettre)
        span.addClass("hidden");
        $("#motCache").append(span);
        }
    )
}

function afficherMasquerRegles() {
    const toggleRegles = $("<button> Afficher les règles </button>");
    toggleRegles.addClass("toggleRegles");
    regles.before(toggleRegles);

    toggleRegles.click(() => {
        if (toggleRegles.text().includes("Afficher")) {
            regles.slideDown();
            toggleRegles.text("Masquer les règles")
            regles.css("font-size", "1em")
        }
        else {
            regles.slideUp();
            toggleRegles.text("Afficher les règles");
        }
    })
}

function changerMot() {
    const nouveauMot = $("<button>Changer de mot</button>");
    $("#changerMot").append(nouveauMot);
    nouveauMot.click(() => {
        genererNombreAleatoire();
        $("span").remove();
        genererMot(mots)
    })


}

function erreurSaisie() {
    const erreurSaisie = $("#erreurSaisie");

        $("#validerLettre, #validerMot").click(() => {
            motSaisi     = $("#saisirMot").val().trim();
            lettreSaisie = $("#saisirLettre").val().trim();

            if (lettreSaisie === "" && motSaisi === "") {
        erreurSaisie.text("Veuillez saisir une lettre ou un mot");
        erreurSaisie.css("color", "red");
            }
            else {
            erreurSaisie.text("");
         }
        })
     }

     function genererNombreAleatoire(max) {
        nombreAleatoire = Math.floor(Math.random() * Math.floor(max))
        return nombreAleatoire
     }    