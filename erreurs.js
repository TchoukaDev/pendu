export function erreurSaisiePrenom(div) {
div.text("Merci de saisir un prénom valide.");
div.css("color", "red");
}

export function erreurSaisieIncorrecte(div, message) {
    div.text(message);
}