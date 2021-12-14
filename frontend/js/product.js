function manageBasket() {
  //Gerer la presence ou l'absence d'une caméra dans le panier:
  if (localStorage.getItem("basket") === null || localStorage.getItem("basket") === "[]") {
    document.querySelector("#basketPage").parentNode.hidden = true;//panier caché si panier vide
  } else {
    document.querySelector("#basketPage").parentNode.hidden = false;//panier apparait si panier avec au moins une camera
  }
}


  function showCamera(data) { //fonction d'affichage de la carte produit
    // Création des éléments
    let name = document.querySelector("#name"),//id name
      price = document.querySelector("#price"),
      description = document.querySelector("#description"),
      image = document.querySelector("#image"),
      selectLenses = document.querySelector("select");//balise select
  
    // Remplissage des éléments
    name.appendChild(document.createTextNode(data.name));
    image.src = data.imageUrl;
    price.appendChild(document.createTextNode((data.price / 100).toLocaleString("fr") + " Euros")); // convertion de l'affichage du prix
    description.appendChild(document.createTextNode(data.description));
    for (i = 0; i < data.lenses.length; i++) { //parcourir les datas lentilles
      let option = document.createElement("option");//declaration option
      option.textContent = data.lenses[i];
      selectLenses.appendChild(option);
     
    }
  }
  
  function getCamera(id) {//recuperer l'id des cameras pour afficher la page camera)
    fetch("http://localhost:3000/api/cameras/" + id)
      .then(response => response.json())
      .then(data => {
        showCamera(data);
        // Au click sur le bouton la fonction doit ajouter les elements au panier .
        let addItemToBasket = document.querySelector("#addToBasket");//on annonce la variable addItemToBasquet ou on va inclure les elements ajouté au panier, selection du bouton dans le DOM
        addItemToBasket.addEventListener('click', function (){addToBasket(data)}, false);//target.addEventListener(type, listener (=invoque a function once the element is clicked] with anonymous function,booleen)...au click on veut ajouter les elements (data au panier)
        
    })
  } 

function addToBasket(data) {
//creer panier dans le localStorage
  if(typeof localStorage.getItem("basket") !== "string"){
    let basket = [];
    localStorage.setItem("basket", JSON.stringify(basket));
  }

// recupération infos des caméras
  data.selectLense = document.querySelector("option:checked").innerText;
  data.selectQuantity = document.querySelector("input").value;
  
  let basket = JSON.parse(localStorage.getItem("basket"));
// vérification: si la camera existe déjà dans le panier
  let camExist = false;
  let existingItem;
  for(let i=0; i<basket.length;i++){
    if(data._id == basket[i]._id && data.price == basket[i].price && data.selectLense == basket[i].selectLense){
    camExist = true;
    existingItem = basket[i];
  }
} 
//ajout de la caméra de le panier
if(camExist === false){
  basket.push(data);
  localStorage.setItem("basket",JSON.stringify(basket))
}
else {
  existingItem.selectQuantity = parseInt(existingItem.selectQuantity, 10) + parseInt(data.selectQuantity, 10);//parse jason en javascript, 10 + base 10 //ajout des cameras existantes avec les camera ajoutée
  localStorage.setItem("basket",JSON.stringify(basket));
  } 
  manageBasket(); 
}

let params = (new URL(document.location)).searchParams;
let id = params.get("id");
getCamera(id);
manageBasket();