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

let userToken = sessionStorage.getItem('userToken');
let previousModal = null;

/**
 * Ici on configure le mode connecté
 */
function setConnectedMode() {
    // Création de l'icône et du conteneur de modal
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
    // Ajout de l'icône et de la galerie dans la section du portfolio
    const sectionPortfolio = document.getElementById('portfolio');
    sectionPortfolio.appendChild(iconDiv);
    const galleryDiv = document.createElement('div');
    galleryDiv.classList.add('gallery');
    sectionPortfolio.appendChild(galleryDiv);
    // Écouteur d'événement pour l'ouverture de la modal
    iconElement.addEventListener('click', function () {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.id = 'modal';
        document.body.appendChild(modal);
        const galleryImages = document.querySelectorAll('.gallery img');
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('buttonContainer');
        // Bouton d'ajout d'une photo
        const btnAddPic = document.createElement('button');
        btnAddPic.textContent = 'Ajouter une photo';
        buttonContainer.appendChild(btnAddPic);
        // Bouton x supprimer une photo
        const btnDltPic = document.createElement('button');
        btnDltPic.textContent = 'Supprimer une photo';
        buttonContainer.appendChild(btnDltPic);
        modal.appendChild(buttonContainer);
        buttonContainer.classList.add('button-container');
        // Affichage des images dans la modal
        galleryImages.forEach(image => {
            const modalImage = document.createElement('img');
            modalImage.src = image.src;
            modalImage.alt = image.alt;
            modal.appendChild(modalImage);
        });
        modal.style.display = 'block';
        // Ouverture de la 2éme modal pour ajouter une photo
        btnAddPic.addEventListener('click', function openAddPicModal() {
            if (previousModal) {
                previousModal.remove();
            }
            const addPicModal = document.createElement('div');
            addPicModal.classList.add('add-pic-modal');
            document.body.appendChild(addPicModal);

            const backArrow = document.createElement('i');
            backArrow.classList.add('fas', 'fa-arrow-left', 'back-arrow');
            addPicModal.appendChild(backArrow);
            backArrow.addEventListener('click', function () {
                addPicModal.style.display = 'none';
            });
            const formContainer = document.createElement('div');
            formContainer.classList.add('form-container');
            addPicModal.appendChild(formContainer);

            const imageForm = document.createElement('form');
            imageForm.classList.add('image-form');
            formContainer.appendChild(imageForm);

            const imageInput = document.createElement('input');
            imageInput.type = 'file';
            imageInput.name = 'image';
            imageForm.appendChild(imageInput);

            const titleForm = document.createElement('form');
            titleForm.classList.add('title-form');
            formContainer.appendChild(titleForm);

            const titleInput = document.createElement('input');
            titleInput.type = 'text';
            titleInput.name = 'title';
            titleInput.placeholder = 'Titolo dell\'immagine';
            titleForm.appendChild(titleInput);

            const categoryForm = document.createElement('form');
            categoryForm.classList.add('category-form');
            formContainer.appendChild(categoryForm);

            const categoryInput = document.createElement('input');
            categoryInput.type = 'text';
            categoryInput.name = 'category';
            categoryInput.placeholder = 'Categoria dell\'immagine';
            categoryForm.appendChild(categoryInput);

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Carica foto';
            formContainer.appendChild(submitButton);

            const galleryDiv = document.createElement('div');
            galleryDiv.classList.add('gallery');
            sectionPortfolio.appendChild(galleryDiv);

            submitButton.addEventListener('click', function () {
                const selectedImage = imageInput.files[0];
                const title = titleInput.value;
                const category = categoryInput.value;

                const imageContainer = document.createElement('div');
                imageContainer.classList.add('gallery-image');

                const galleryImage = document.createElement('img');
                galleryImage.src = URL.createObjectURL(selectedImage);
                galleryImage.alt = title;

                imageContainer.appendChild(galleryImage);

                galleryDiv.appendChild(imageContainer);

                addPicModal.style.display = 'none';
            });

            addPicModal.style.display = 'block';
        });
    });
}
/**
 * Ici on configure le mode déconnecté
 */
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
    .then(response => response.json())  // Converti la réponse en JSON
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











