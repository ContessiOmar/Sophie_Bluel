function getAllCredentials() {
    // Récupère l'email entré par l'utilisateur
    const email = document.getElementById('email').value;

    // Récupère le mot de passe
    const password = document.getElementById('password').value;

    // Effectue une requête POST vers le lien de l'Api
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email: email, password: password }),

        // Définit le type de contenu de la requête comme JSON
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
            console.error('Oh non! Une erreur est survenue :', error);
        });
}

// Récupère le bouton de soumission du formulaire dans le document
const submitButton = document.querySelector('.form button');

// écouteur d'événements pour détecter le clic sur le bouton de soumission
submitButton.addEventListener('click', getAllCredentials);
