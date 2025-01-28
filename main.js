const mots = ["console", "manette", "zelda", "mario", "switch", "playstation", "nintendo", "ubisoft", "sony", "microsoft", "minecraft", "sonic", "pokemon", 
              "television", "Konami", "divertissement", "graphisme", "xbox", "tetris", "multijoueur", "gameplay", "debuff", "craft", "jouabilité", "experience",
              "roguelike", "retrogaming", "speedrun", "succes", "videoludique", "fallout", "metroid", "rayman", "warcraft", "capcom", "activision"];
let nombreAleatoire;
const regles            = $("#regles");
const formulaire        = $("form");
let motCache
let motEpele;
let lettreSaisie;
let motSaisi;
let indexMot = -1;
let tentativesRestantes;

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
        genererJeu();
        }
        )
    }
})

function genererJeu() {
    bienvenue.remove()
    regles.css("display", "none");
    finRegles.remove();
    $("#inputSaisies").css("display", "block");      
    $("#pendu").css("display", "block");
    afficherMasquerRegles();
    verifierSaisie();
    genererMotCache(mots);
    creerChangerMot();   
}

function genererMotCache(tableau) {
    tentativesRestantes = 10;
    genererNombreAleatoire(mots.length);
    motCache = tableau[nombreAleatoire].toUpperCase();
    console.log(motCache)
    motEpele = [...motCache];
    console.log(motEpele);

    motEpele.forEach ((lettre, index) => {
        const span   = $("<span></span>")
        span.text(lettre)
        span.addClass("hidden");
        $("#motCache").append(span);
        span.attr("id", `span${lettre}${index}`)
        }
    )
    afficherTentatives(tentativesRestantes);
    etatPendu(tentativesRestantes);
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

function creerChangerMot() {
    const nouveauMot = $("<button>Changer de mot</button>");
    $("#changerMot").append(nouveauMot);
    nouveauMot.click(() => {
        genererNombreAleatoire();
        $("span").remove();
        genererMotCache(mots);
    })
}


function verifierSaisie() {
     $("#validerLettre, #validerMot").click(() => {

        erreurSaisie = $("#erreurSaisie")
        motSaisi     = $("#saisirMot").val().trim();
        lettreSaisie = $("#saisirLettre").val().trim();

        if (lettreSaisie === "" && motSaisi === "") {
        erreurSaisie.text("Veuillez saisir une lettre ou un mot");
        erreurSaisie.css("color", "red");
        }
        else {
        erreurSaisie.text("");
        saisirTentatives();
        $("#saisirLettre").val("");
        $("#saisirMot").val("");
        }
    })
}

function saisirTentatives() {
        if (lettreSaisie === "é" || lettreSaisie === "è" || lettreSaisie === "ê" || lettreSaisie === "ë") {
            lettreSaisie = "e";
        }
        else if (lettreSaisie === "à" || lettreSaisie === "â" || lettreSaisie === "ä") {
            lettreSaisie = "a";
        } 
        else if (lettreSaisie === "ô" || lettreSaisie === "ö") {
            lettreSaisie = "o";
        }
        else if (lettreSaisie === "î" || lettreSaisie === "ï") {
            lettreSaisie = "i";
        }
        else if (lettreSaisie === "û" || lettreSaisie === "ù" || lettreSaisie === "ü") {
            lettreSaisie = "u";
        }
        else if (lettreSaisie === "ç") {
            lettreSaisie = "c";
        }
        lettreSaisie = lettreSaisie.toUpperCase();
        
        let positionsLettre = []

    motEpele.forEach((lettre, index) => {
        if (lettre === lettreSaisie) {
            positionsLettre.push(index);
        }
    })

        if (positionsLettre.length > 0) {
            positionsLettre.forEach((position) => {
            let lettreDevoilee = $(`#span${lettreSaisie}${position}`);
            lettreDevoilee.css("color", "black");
            })
        }
        else {
            tentativesRestantes --;
            afficherTentatives(tentativesRestantes);
            etatPendu(tentativesRestantes);
        }

    $("#validerMot").click(() => {
        motSaisi = motSaisi.toUpperCase();

        if (motSaisi === motCache) {
            // gagnerPartie();
        }
        else {
        tentativesRestantes --
        afficherTentatives(tentativesRestantes);
        etatPendu(tentativesRestantes);
        }
    
    })
     }

function afficherTentatives(nombre) {
    const idTentativesRestantes = $("#tentativesRestantes");
    idTentativesRestantes.text(`Tentatives restantes: ${nombre}`)
    if (tentativesRestantes >= 8) {
        idTentativesRestantes.css("color", "green");        
    }
    else if (tentativesRestantes === 6 || tentativesRestantes === 7) {
        idTentativesRestantes.css("color", "lightgreen");
    }
    else if (tentativesRestantes <= 5 && tentativesRestantes >= 3) {
        idTentativesRestantes.css("color", "orange");
    }
    else if (tentativesRestantes === 1 || tentativesRestantes === 2) {
        idTentativesRestantes.css("color", "red");
    }
    else {
        // PartiePerdue();
    }
}

function etatPendu(nombre) {
    $("#imagePendu").attr("src", `images/pendu${nombre}.jpg`);
    console.log(`Changement de l'image : pendu${nombre}.jpg`);
}

function genererNombreAleatoire(max) {
        do {
        nombreAleatoire = Math.floor(Math.random() * Math.floor(max))
        }
        while (nombreAleatoire === indexMot)
        indexMot = nombreAleatoire;
        return nombreAleatoire
     }    