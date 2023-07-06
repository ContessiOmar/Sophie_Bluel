/*
*
On selection toutes les images des projets, et leurs data via l'Api
*/
function galleryImages(categoryId) {
    fetch('http://localhost:5678/api/works', {
        headers: {  // Entêtes de la requête
            'Accept': 'application/json'  // Accepte les réponses au format JSON
        }
    })
        .then(response => response.json())  // Convertit la réponse en JSON
        .then(data => {
            const images = data;  // Récupère les images depuis les données
            const galleryFilteredImages = images.filter(image => image.categoryId === categoryId || categoryId === 0);  // Filtre les images en fonction de l'ID de la catégorie
            const galleryDiv = document.querySelector('.gallery');
            galleryDiv.innerHTML = '';  // Vide la galerie
            galleryFilteredImages.forEach(image => {
                const img = document.createElement('img');
                img.src = image.imageUrl;
                img.alt = image.title;
                galleryDiv.appendChild(img);  // Ajoute les images filtrées à la galerie
            });
        })
        .catch(error => {
            console.error(error);
        });

}
/** 
 * Ici on va créer les boutons et les filtres pour gerer les differents projets
*/

function createFilterButtons(categories) {
    const buttonsDiv = document.querySelector('.filter-buttons');
    const showAllButton = document.createElement('button');
    showAllButton.textContent = 'Tous';  // Texte du bouton "Tous"
    showAllButton.addEventListener('click', function () {
        galleryImages(0);  // Affiche toutes les images (categoryId = 0)
    });
    buttonsDiv.appendChild(showAllButton);  // Ajoute le bouton "Tous" au div des boutons de filtre

    categories.forEach(category => {
        const button = document.createElement('button');
        button.textContent = category.name;  // Texte du bouton de la catégorie

        button.addEventListener('click', function () {
            galleryImages(category.id);  // Filtre les images en fonction de l'ID de la catégorie
        });

        buttonsDiv.appendChild(button);  // Ajoute le bouton au div des boutons de filtre
    });
}

/**
 * 
 */

//const iconDiv = document.querySelector('.icon');
let userToken = localStorage.getItem('userToken');


function setConnectedMode() {
    const iconDiv = document.createElement('div');
    iconDiv.classList.add('icon');
    const iconElement = document.createElement('i');
    iconElement.classList.add("fa-light");
    iconElement.classList.add("fa-pen-to-square");
    const divModal = document.createElement('div');
    divModal.classList.add('modal');
    divModal.id = 'modal';
    iconDiv.appendChild(iconElement);
    iconDiv.appendChild(divModal);
    const sectionPortfolio = document.getElementById('portfolio');
    sectionPortfolio.appendChild(iconDiv);
    const galleryDiv = document.createElement('div');
    galleryDiv.classList.add('gallery');
    sectionPortfolio.appendChild(galleryDiv);

    iconElement.addEventListener('click', function () {
        const modal = document.createElement('div');
        modal.classList.add('modal'); 
        modal.id = 'modal';
        document.body.appendChild(modal);

        const galleryImages = document.querySelectorAll('.gallery img');

        galleryImages.forEach(image => {
            const modalImage = document.createElement('img');
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modal.appendChild(modalImage);
        });

        modal.style.display = 'block';

        window.addEventListener('click', function (event) {
            const modal = document.getElementById('modal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

    });

}

function setDisconnectedMode(categories) {
    const sectionPortfolio = document.getElementById('portfolio');
    const filterDiv = document.createElement('div');
    filterDiv.classList.add('filter-buttons');
    sectionPortfolio.appendChild(filterDiv);
    const galleryDiv = document.createElement('div');
    galleryDiv.classList.add('gallery');
    sectionPortfolio.appendChild(galleryDiv);
    createFilterButtons(categories);
}

fetch('http://localhost:5678/api/categories', {
    headers: {  // Entêtes de la requête
        'Accept': 'application/json'  // Accepte les réponses au format JSON
    }
})
    .then(response => response.json())  // Convertit la réponse en JSON
    .then(data => {
        const categories = data;  // Récupère les catégories depuis les données
        if (userToken) {
            console.log('token!!!!!!!!!!')
            setConnectedMode();

        }
        else {
            console.log('pas de token---------')
            setDisconnectedMode(categories);
            // Crée les boutons de filtre si l'utilisateur n'est pas connecté
        }
        galleryImages(0);  // Applique le filtre initial pour afficher toutes les images
    })
    .catch(error => {
        console.error(error);
    });





/**
 * <font-awesome-icon icon="fa-light fa-pen-to-square" />
 */

