// Funzione per gestire l'invio del form
function getAllCredentials() {
    // Récupère l'email entré par l'utilisateur
    const email = document.getElementById('email').value;

    // Récupère le mot de passe
    const password = document.getElementById('password').value;

    // Effectue une requête POST vers le lien de l'Api
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            // Affiche les données renvoyées par l'api dans la console
            console.log(data);
            // Vérifie si un token est renvoyé dans la réponse
            if (data.token) {
                sessionStorage.setItem('userToken', data.token);
                // Redirige l'utilisateur vers la page principale
                window.location.href = 'index.html';
            } else {
                // Alerte indiquant que les identifiants sont incorrects
                alert('Oops! Identifiants incorrects. Veuillez réessayer.');
            }
        })
        .catch(error => {
            // Affiche une erreur dans la console en cas de problème avec la requête
            alert('Oh non! Une erreur est survenue :', error);
        });
}

// Récupère les éléments du formulaire et du bouton de soumission
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const submitButton = document.querySelector('.form button');

// Fonction pour vérifier la validité du formulaire
function checkFormValidity() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue !== '' && passwordValue !== '') {
        // Activer le bouton de soumission si les champs sont remplis
        submitButton.removeAttribute('disabled');
    } else {
        // Désactiver le bouton de soumission si les champs ne sont pas remplis
        submitButton.setAttribute('disabled', 'disabled');
    }
}

// Écouteurs d'événements pour vérifier la validité du formulaire lors de la saisie dans les champs
emailInput.addEventListener('input', checkFormValidity);
passwordInput.addEventListener('input', checkFormValidity);

// Écouteur d'événement pour gérer l'envoi du formulaire lors du clic sur le bouton
submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    // Vérifier si les champs sont remplis avant d'appeler getAllCredentials()
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue !== '' && passwordValue !== '') {
        getAllCredentials();
    } else {
        alert('Veuillez remplir tous les champs du formulaire.');
    }
});
