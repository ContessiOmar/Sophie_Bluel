fetch('http://localhost:5678/api/works', {  // Récupère les données depuis l'API
  headers: {  // Entêtes de la requête
    'Accept': 'application/json'  // Accepte les réponses au format JSON
  }
})
  .then(response => response.json())  // Convertit la réponse en JSON
  .then(data => {
    const données = data;  // Récupère les données
    const galleryElement = document.querySelector('.gallery');  // Sélectionne l'élément de la galerie

    données.forEach(donnée => {
      const imageUrl = donnée.imageUrl;

      // Crée un élément image
      const imageElement = document.createElement('img');
      imageElement.src = imageUrl;

      // Ajoute l'image à la galerie
      galleryElement.appendChild(imageElement);
    });
  })
  .catch(error => {
    console.error(error);
  });


const galleryDiv = document.querySelector('.gallery');  // Sélectionne le div de la galerie
const buttonsDiv = document.querySelector('.filter-buttons');  // Sélectionne le div des boutons de filtre

function createFilterButtons(categories) {
  const showAllButton = document.createElement('button');
  showAllButton.textContent = 'Tous';  // Texte du bouton "Tous"
  showAllButton.addEventListener('click', function() {
    filterImages(0);  // Affiche toutes les images (categoryId = 0)
  });
  buttonsDiv.appendChild(showAllButton);  // Ajoute le bouton "Tous" au div des boutons de filtre

  categories.forEach(category => {
    const button = document.createElement('button');
    button.textContent = category.name;  // Texte du bouton de la catégorie

    button.addEventListener('click', function () {
      filterImages(category.id);  // Filtre les images en fonction de l'ID de la catégorie
    });

    buttonsDiv.appendChild(button);  // Ajoute le bouton au div des boutons de filtre
  });
}

function filterImages(categoryId) {
  fetch('http://localhost:5678/api/works', {
    headers: {  // Entêtes de la requête
      'Accept': 'application/json'  // Accepte les réponses au format JSON
    }
  })
    .then(response => response.json())  // Convertit la réponse en JSON
    .then(data => {
      const images = data;  // Récupère les images depuis les données
      const filteredImages = images.filter(image => image.categoryId === categoryId || categoryId === 0);  // Filtre les images en fonction de l'ID de la catégorie

      galleryDiv.innerHTML = '';  // Vide la galerie

      filteredImages.forEach(image => {
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

fetch('http://localhost:5678/api/categories', {
  headers: {  // Entêtes de la requête
    'Accept': 'application/json'  // Accepte les réponses au format JSON
  }
})
  .then(response => response.json())  // Convertit la réponse en JSON
  .then(data => {
    const categories = data;  // Récupère les catégories depuis les données

    createFilterButtons(categories);  // Crée les boutons de filtre en fonction des catégories

    filterImages(0);  // Applique le filtre initial pour afficher toutes les images
  })
  .catch(error => {
    console.error(error);
  });
