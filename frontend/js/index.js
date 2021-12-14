
function manageBasket() {
  //Gerer la presence ou l'absence d'une caméra dans le panier:
  if (localStorage.getItem("basket") === null || localStorage.getItem("basket") === "[]") {
    document.querySelector("#basketPage").parentNode.hidden = true;//panier caché si panier vide
  } else {
    document.querySelector("#basketPage").parentNode.hidden = false;//panier apparait si panier avec au moins une camera
  }
}

function getCamerasIndex() { //se connecter a l'API
  fetch("http://localhost:3000/api/cameras/") //appel de la méthode fetch (requet de type GET), qui accepte l'URL de l'API comme paramètre .Requete envoyé a l'API
    .then(// ajout de la methode de promess then()
      response => { //fonction anonyme 
        return response.json();
      })
    .then(
      function (data) {
        for(var i= 0; i < data.length; i++){
          getOneCamera(data[i]); // appel de la fonction pour l'affichage de la liste des cameras
                             
        }          
        console.log(data[0]);
        
      }
    )
    .catch((error) => {//methode catch pour gerer le rejet de connection à l'API
      let pcontainer = document.querySelector(".cameras");
      pcontainer.innerHTML =
        "Nous n'avons pas réussi à afficher nos cameras. Avez vous bien lancé le serveur local (Port 3000) ? ";
      productsContainer.style.textAlign = "center";
      productsContainer.style.padding = "30vh ";        
    })    
  }
  
  function getOneCamera(camera) { // fonction d'affichage des camera sur la page d'acceuil
  // créer les elements pr chaque caméra
    let cameras = document.querySelector(".cameras"),
      cameraItem = document.createElement("div"),
      cameraItemBody = document.createElement("div"),  
      name = document.createElement("h3"),
      price = document.createElement("h4"),
      description = document.createElement("p"),
      productPageLink =document.createElement("a"),
      image = document. createElement("img"),
      urlPage ="product.html?id=" + camera._id;
  
    //remplir les elements
    name.appendChild(document.createTextNode(camera.name));
    image.src = camera.imageUrl;
    price.appendChild(document.createTextNode((camera.price / 100).toLocaleString("fr") + " Euros"));
    description.appendChild(document.createTextNode(camera.description));
    productPageLink.appendChild(document.createTextNode("En savoir plus"));
    productPageLink.setAttribute('href',urlPage);  

    //Stylisation des éléments
    productPageLink.classList.add("btn", "btn-secondary");
    productPageLink.setAttribute("role", "button");
    cameraItem.classList.add("card", "text-center", "border-grey","w-80", "m-4", "col-sm-5");
    image.classList.add("card-img-top");
    cameraItemBody.classList.add("card-body");
    name.classList.add("card-title");
    productPageLink.classList.add("card-footer","text-decoration-none");
  
    //placement des elements
    cameraItem.appendChild(name);
    cameraItem.appendChild(image);
    cameraItemBody.appendChild(price);
    cameraItemBody.appendChild(description);
    cameraItem.appendChild(cameraItemBody);
    cameraItem.appendChild(productPageLink);
    //ul
    cameras.appendChild(cameraItem); 
  }
  
  getCamerasIndex();
  manageBasket();