import { regles, finRegles, bienvenue } from "./globales.js";


export function afficherStyleJeu() {
    let inputSaisies = $("#inputSaisies");
    inputSaisies.removeClass("hidden");
    inputSaisies.addClass("inputSaisiesFlex");
    $("#containerMotCache, #containerSaisir, #containerTentatives, #containerReponses").addClass("containerSecondaire");
    bienvenue.remove()
    regles.css("display", "none");
    finRegles.remove();          
    $("#pendu").removeClass("hidden");
    $("#saisiesTentativesChanger").addClass("saisiesTentativesChanger");
}

export function afficherReponsesEssayees (tableau, div, message) {
    const essais = tableau.join(", ")
    div.text(`${message} ${essais}`);
    div.addClass("saisies");
}

export function afficherPopup(message) {
    $("#popup").removeClass("hidden");
    $("#popup").removeClass("slideup");
    $("#popup").addClass("popup");
    $("#textePopup").text(message);
    $(".container").css("display", "none");
}

export function cacherPopup(image) {
    const popup             = $("#popup");
    popup.addClass("slideup");
    setTimeout(() => {
    popup.removeClass("popup");
    popup.addClass("hidden");
    image.remove();
    $(".container").css("display", "flex");
    }, 600);
    
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
