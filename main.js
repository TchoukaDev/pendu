const mots = ["console", "manette", "zelda", "mario", "switch", "playstation", "nintendo", "ubisoft", "sony", "microsoft", "minecraft", "sonic", "pokemon", 
              "television", "konami", "divertissement", "graphisme", "xbox", "tetris", "multijoueur", "gameplay", "fortnite", "jouabilite", "experience",
               "retrogaming", "succes", "videoludique", "fallout", "metroid", "rayman", "warcraft", "capcom", "activision", "mmorpg", "avatar", 
               "design", "arcarde", "cinematique", "framerate", "guilde", "inventaire", "joystick"];
const regles            = $("#regles");
const formulaire        = $("form");
const erreurSaisie      = $("#erreurSaisie")
const popup             = $("#popup");
const boutonsJeu        = $("#validerSaisie, #boutonChangerMot, #toggleRegles");
const inputsJeu         = $("#saisirLettre, #saisirMot");
const lettresSaisies    = $("#lettresSaisies");
const motsSaisis        = $("#motsSaisis");
let nombreAleatoire;
let lettresEssayees;
let motsEssayes;
let tableauLettresEssayees;
let tableauMotsEssayes;
let motCache;
let motEpele;
let lettreSaisie;
let motSaisi;
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
    $("#containerMotCache, #containerSaisir, #containerTentatives, #containerSaisies").addClass("containerSecondaire");
    bienvenue.remove()
    regles.css("display", "none");
    finRegles.remove();          
    $("#pendu").removeClass("hidden");
    $("#saisiesTentativesChanger").addClass("saisiesTentativesChanger");
    slideRegles();
    genererMotCache(mots);
    saisirValeur();
    creerChangerMot();
}

function genererMotCache(tableau) {
    tableauLettresEssayees = [];
    let lettresEssayees = tableauLettresEssayees.join(", ")
    tableauMotsEssayes = [];
    let motsEssayes = tableauMotsEssayes.join(", ");
    tentativesRestantes = 10;
    lettresSaisies.text(`Lettres essayées : ${lettresEssayees}`);
    lettresSaisies.addClass("saisies");
    motsSaisis.text(`Mots essayés: ${motsEssayes}`);
    motsSaisis.addClass("saisies");

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

function genererNombreAleatoire(max) {
    let indexMot = 0; 
    do {
    nombreAleatoire = Math.floor(Math.random() * Math.floor(max))
    }
    while (nombreAleatoire === indexMot)
    indexMot = nombreAleatoire;
    return nombreAleatoire
}    

function slideRegles() {
    const toggleRegles = $("<button> Afficher les règles </button>").attr("id", "toggleRegles");
    toggleRegles.addClass("bouton");
    toggleRegles.addClass("hover");
    toggleRegles.addClass("toggleRegles");
    $("#toggleRegles").append(toggleRegles);

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

function creerChangerMot() {
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


function saisirValeur() {

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
    console.log(lettreSaisie)
    if ((lettreSaisie === "" && motSaisi === "") || (lettreSaisie !== "" && motSaisi !== "")) {
    erreurSaisie.text("Veuillez saisir une lettre ou un mot");
    }
    else {
    erreurSaisie.text("");
    verifier();
    $("#saisirLettre").val("");
    $("#saisirMot").val("");
    }
}

function verifier() {
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

            tableauLettresEssayees.push(lettreSaisie); //faire fonctions
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
                lettreDevoilee.css("color", "midnightblue")
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
        tentativesRestantes --;
        afficherTentatives(tentativesRestantes);
        etatPendu(tentativesRestantes);
    }
    }
} 

function afficherTentatives(nombre) {
    const idTentativesRestantes = $("#tentativesRestantes");
    idTentativesRestantes.text(`Tentatives restantes: ${nombre}`)
    idTentativesRestantes.addClass("tentativesRestantes");
    if (tentativesRestantes >= 8) {
        idTentativesRestantes.css("color", "green");        
    }
    else if (tentativesRestantes === 6 || tentativesRestantes === 7) {
        idTentativesRestantes.css("color", "goldenrod");
    }
    else if (tentativesRestantes <= 5 && tentativesRestantes >= 3) {
        idTentativesRestantes.css("color", "darkorange");
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

function VerificationLettresDevoilees() {
    let compteurLettre = 0
    
    motEpele.forEach((lettre, index) => {
        let spanLettre = $(`#span${lettre}${index}`);
        if ((spanLettre).css("color") === "rgb(25, 25, 112)") {
            compteurLettre ++
        }
    })

    if (compteurLettre === motEpele.length){
        gagnerPartie("Félicitations, vous avez gagné!");
    }
}


function partiePerdue(message) {
    const penduPerdu = $("<img>").attr("src", "images/pendu0.jpg");
    $("#textePopup").before(penduPerdu);
    afficherPopup(message);
    recommencer(penduPerdu);
}

function gagnerPartie(message) {
    const penduGagne = $("<img>").attr("src", "images/pendugagne.jpg");
    $("#textePopup").before(penduGagne);
    afficherPopup(message);
    confettis();
    recommencer(penduGagne);
    
};

function recommencer(image) {
    $("#recommencer").click(() => {
        popup.removeClass("popup");
        popup.addClass("hidden");
        image.remove();
        $("span").remove();
        genererMotCache(mots);
        activerElements(inputsJeu);
        activerElements(boutonsJeu);
        boutonsJeu.addClass("hover");
    })
}

function afficherPopup(message) {
    popup.removeClass("hidden");
    popup.addClass("popup");
    $("#textePopup").text(message)
    desactiverElements(inputsJeu);
    desactiverElements(boutonsJeu);
    boutonsJeu.removeClass("hover");
}

function activerElements(element) {
    element.prop("disabled", false)
}

function desactiverElements(element){
    element.prop("disabled", true)
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
