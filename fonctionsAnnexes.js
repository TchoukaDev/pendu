export const regles     = $("#regles");
export const boutonsJeu = $("#validerSaisie, #boutonChangerMot, #toggleRegles");
export let nombreAleatoire;

export function genererNombreAleatoire(max) {
    let indexMot = 0; 
    do {
    nombreAleatoire = Math.floor(Math.random() * Math.floor(max))
    }
    while (nombreAleatoire === indexMot)
    indexMot = nombreAleatoire;
    return nombreAleatoire
}    


export function etatPendu(nombre) {
    $("#imagePendu").attr("src", `images/pendu${nombre}.jpg`);
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

export function afficherPopup(message) {
    $("#popup").removeClass("hidden");
    $("#popup").addClass("popup");
    $("#textePopup").text(message);
    boutonsJeu.removeClass("hover");
}


export function confettis(){
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