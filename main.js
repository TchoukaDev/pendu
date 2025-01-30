const mots = ["console", "manette", "zelda", "mario", "switch", "playstation", "nintendo", "ubisoft", "sony", "microsoft", "minecraft", "sonic", "pokemon", 
              "television", "Konami", "divertissement", "graphisme", "xbox", "tetris", "multijoueur", "gameplay", "debuff", "craft", "jouabilité", "experience",
              "roguelike", "retrogaming", "speedrun", "succes", "videoludique", "fallout", "metroid", "rayman", "warcraft", "capcom", "activision"];
let nombreAleatoire;
const regles            = $("#regles");
const formulaire        = $("form");
const popup = $("#popup");
let motCache;
let motEpele;
let lettreSaisie;
const lettresSaisies = $("#lettresSaisies");
const motsSaisis = $("#motsSaisis");
let tableauLettresEssayees;
let tableauMotsEssayes;
let motsEssayes;
let lettresEssayees;
let motSaisi;
let indexMot            = 0;
let tentativesRestantes;

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

function genererJeu() {

    let inputSaisies = $("#inputSaisies");
    inputSaisies.removeClass("hidden");
    inputSaisies.addClass("inputSaisiesFlex");
    bienvenue.remove()
    regles.css("display", "none");
    finRegles.remove();          
    $("#pendu").removeClass("hidden");
    afficherMasquerRegles();
    saisirValeur();
    genererMotCache(mots);
    creerChangerMot();   
}

function genererMotCache(tableau) {
    // Réinitialiser tout//
    tentativesRestantes = 10;
    tableauLettresEssayees = [];
    lettresEssayees = tableauLettresEssayees.join(", ")
    lettresSaisies.text(`Lettres essayées : ${lettresEssayees}`);
    tableauMotsEssayes = [];
    motsEssayes = tableauMotsEssayes.join(", ");
    motsSaisis.text(`Mots essayés: ${motsEssayes}`);

    genererNombreAleatoire(mots.length);
    motCache = tableau[nombreAleatoire].toUpperCase();
    motEpele = [...motCache];

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

function afficherMasquerRegles() {
    const toggleRegles = $("<button> Afficher les règles </button>").attr("id", "toggleRegles");
    toggleRegles.addClass("bouton");
    toggleRegles.addClass("toggleRegles");
    regles.before(toggleRegles);

    regles.css("font-size", "0.8em")
    let hauteurRegles = regles.outerHeight();

    toggleRegles.click(() => {
        if (toggleRegles.text().includes("Afficher")) {
            regles.css("height", hauteurRegles).slideDown();
            toggleRegles.text("Masquer les règles")
           
        }
        else {
            regles.slideUp();
            toggleRegles.text("Afficher les règles");
        }
    })
}

function creerChangerMot() {
    const changerMot = $("<button>Changer de mot</button>")
        .attr("id", "boutonChangerMot")
        .addClass("bouton");
    $("#changerMot").append(changerMot);
    changerMot.click(() => {
        nouveauMot();
    })
}

function nouveauMot() {
    genererNombreAleatoire(mots.length);
    $("span").remove();
    genererMotCache(mots);
}

function saisirValeur() {

     $("#validerSaisie").click(() => {

        erreurSaisie = $("#erreurSaisie")
        motSaisi     = $("#saisirMot").val().trim();
        lettreSaisie = $("#saisirLettre").val().trim();

        if ((lettreSaisie === "" && motSaisi === "") || (lettreSaisie !== "" && motSaisi !== "")) {
        erreurSaisie.text("Veuillez saisir une lettre ou un mot");
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
    erreurSaisie.text("");

    if(lettreSaisie !== "") {
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

        if(!tableauLettresEssayees.includes(lettreSaisie)) {

            tableauLettresEssayees.push(lettreSaisie);
            lettresEssayees = tableauLettresEssayees.join(", ")
            lettresSaisies.text(`Lettres essayées : ${lettresEssayees}`);
            
            let positionsLettre = []

        

            motEpele.forEach((lettre, index) => {
                if (lettre === lettreSaisie) {
                    positionsLettre.push(index);
                }
            })

            if (positionsLettre.length > 0) {
                positionsLettre.forEach((position) => {
                let lettreDevoilee = $(`#span${lettreSaisie}${position}`);
                lettreDevoilee.css("color", "black")
                VerificationLettresDevoilees();
                })
            }
            else {
                tentativesRestantes --;
                afficherTentatives(tentativesRestantes);
                etatPendu(tentativesRestantes);
                }
            }
        
        else {
            erreurSaisie.text("Vous avez déjà essayé cette lettre.");
        }
    }
    else if(motSaisi != "") {
        motSaisi = motSaisi.toUpperCase();
        if (motSaisi === motCache) {
            gagnerPartie("Félicitations, vous avez gagné!");
        }
        else if (tableauMotsEssayes.includes(motSaisi)) {
            erreurSaisie.text("Vous avez déjà essayé ce mot");
        }
        else {
        tableauMotsEssayes.push(motSaisi);
        motsEssayes = tableauMotsEssayes.join(", ");
        motsSaisis.text(`Mots essayés: ${motsEssayes}`);
        tentativesRestantes --;
        afficherTentatives(tentativesRestantes);
        etatPendu(tentativesRestantes);
    }
    }
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
        partiePerdue(`Dommage, vous avez perdu! Le mot secret était ${motCache}.`);
    }
}

function etatPendu(nombre) {
    $("#imagePendu").attr("src", `images/pendu${nombre}.jpg`);
}

function genererNombreAleatoire(max) {
        do {
        nombreAleatoire = Math.floor(Math.random() * Math.floor(max))
        }
        while (nombreAleatoire === indexMot)
        indexMot = nombreAleatoire;
        return nombreAleatoire
     }    

function partiePerdue(message) {
    const penduPerdu = $("<img>").attr("src", "images/pendu0.jpg");
    $("#textePopup").before(penduPerdu);
    popup.removeClass("hidden");
    popup.addClass("popup");
    $("#textePopup").text(message)
    $("#saisirLettre, #saisirMot, #validerSaisie, #boutonChangerMot, #toggleRegles").prop("disabled", true);

    $("#recommencer").click(() => {
        popup.css("display", "none");
        nouveauMot();
        $("#saisirLettre, #saisirMot,.bouton").prop("disabled", false);
    })
}

function gagnerPartie(message) {
    const penduGagne = $("<img>").attr("src", "images/pendugagne.jpg");
    $("#textePopup").before(penduGagne);
    popup.removeClass("hidden");
    popup.addClass("popup");
    $("#textePopup").text(message)
    $("#saisirLettre, #saisirMot, #validerSaisie, #boutonChangerMot, #toggleRegles").prop("disabled", true);
    confettis()

    $("#recommencer").click(() => {
        popup.css("display", "none");
        nouveauMot();
        $("#saisirLettre, #saisirMot,.bouton").prop("disabled", false);
    })
    
};

function VerificationLettresDevoilees() {
    let compteurLettre = 0
    
    motEpele.forEach((lettre, index) => {
        let spanLettre = $(`#span${lettre}${index}`);
        if ((spanLettre).css("color") === "rgb(0, 0, 0)") {
            compteurLettre ++
        }
    })

    if (compteurLettre === motEpele.length){
        gagnerPartie("Félicitations, vous avez gagné!");
    }
}


function confettis(){
    var end = Date.now() + (5 * 1000);
    var colors = ['#bb0000', '#ffffff'];

    (function frame() {
    confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
    });
    confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
    });

    if (Date.now() < end) {
        requestAnimationFrame(frame);
    }
    }())
}
