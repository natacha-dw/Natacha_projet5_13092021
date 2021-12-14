let basketItems = JSON.parse(localStorage.getItem("basket"));
let productsID = [];

function manageBasket() {
  //Gerer la presence ou l'absence d'une caméra dans le panier:
  if (localStorage.getItem("basket") === null || localStorage.getItem("basket") === "[]") {
    document.querySelector("#basketPage").parentNode.hidden = true; //panier caché si panier vide
  } else {
    document.querySelector("#basketPage").parentNode.hidden = false; //panier apparait si panier avec au moins une camera
  }
}

function returnHomePageEmptyBasket() {
  if (localStorage.getItem("basket") === null || localStorage.getItem("basket") === "[]") {
    window.location.href = "index.html";
  }
}

function getBasketItem(i) {
  productsID.push(basketItems[i]._id);// on ajoute l'id du produit dans le tableau products
  // Création des éléments
  let basket = document.querySelector("#basket"),//selection de l'element HTML par son id
      basketItem = document.createElement("div"),
      basketItemBody = document.createElement("div"),
      name = document.createElement("h3"),
      price = document.createElement("h4"),
      image = document.createElement("img"),
      productPageLink = document.createElement("a"),
      urlPage = "product.html?id=" + basketItems[i]._id,
      selectLense = document.createElement("h4"),
      quantity = document.createElement("div"),
      selectQuantity = document.createElement("input"),
      modifyQuantityButton = document.createElement("button"),
      deleteItemButton = document.createElement("button");

  // Remplissage des éléments
  name.appendChild(document.createTextNode(basketItems[i].name));
  image.src = basketItems[i].imageUrl;
  productPageLink.appendChild(document.createTextNode("Voir la page du produit"));
  productPageLink.setAttribute('href', urlPage);
  selectLense.appendChild(document.createTextNode(basketItems[i].selectLense));
  modifyQuantityButton.appendChild(document.createTextNode("Modifier la quantité"));
  deleteItemButton.appendChild(document.createTextNode("Supprimer"));
  price.appendChild(document.createTextNode((basketItems[i].price * basketItems[i].selectQuantity / 100).toLocaleString("fr") + " Euros"));
 
  //Stylisation des éléments
  productPageLink.classList.add("btn", "btn-secondary");//
  productPageLink.setAttribute("role", "button");//
  basketItem.classList.add("card", "border-light", "text-center","w-25","m-5");
  basketItem.setAttribute("data-id", basketItems[i]._id);
  basketItem.setAttribute("data-lense", basketItems[i].selectLense);
  image.classList.add("card-img-top");
  basketItemBody.classList.add("card-body");
  name.classList.add("card-title");
  productPageLink.classList.add("card-footer");
  quantity.classList.add("d-flex", "flex-row");
  selectQuantity.classList.add("form-control", "w-25");
  selectQuantity.setAttribute("value", basketItems[i].selectQuantity);  
  modifyQuantityButton.classList.add("modifyQuantity", "btn", "btn-light", "w-75");
  modifyQuantityButton.addEventListener("click", modifyQuantity, false);
  deleteItemButton.classList.add("deleteItem", "btn", "btn-danger", "m-2");
  deleteItemButton.addEventListener("click", deleteItem, false);  

  // Placement des éléments de la camera
  basketItemBody.appendChild(price);
  basketItemBody.appendChild(quantity);
  quantity.appendChild(selectQuantity);
  quantity.appendChild(modifyQuantityButton);
  basketItem.appendChild(name);
  basketItem.appendChild(selectLense);
  basketItem.appendChild(image);
  basketItem.appendChild(basketItemBody);
  basketItem.appendChild(deleteItemButton);
  basketItem.appendChild(productPageLink);

  // Placement de la camera 
  basket.appendChild(basketItem);
}

function basket() {
  for (let i = 0; i < basketItems.length; i++) {
    getBasketItem(i);
  }
  totalPrice();
}

function totalPrice() {//
  let total = 0;
  for (let j = 0; j < basketItems.length; j++) {
    total = total + (basketItems[j].price * basketItems[j].selectQuantity);
  }
  document.querySelector("#total").appendChild(document.createTextNode("Total : " + (total / 100).toLocaleString("fr") + " Euros"));
}

function modifyQuantity(){
  //Sélectionner le bouton puis la carte à laquelle il appartient
  let itemCard = event.target.parentNode.parentNode.parentNode;
  //Identifier l'item associé dans le local storage
  let itemId = itemCard.getAttribute("data-id");  
  let itemLense = itemCard.getAttribute("data-lense");
  let basketItemIndex;
  for (let i = 0; i < basketItems.length; i++) {
    if (itemId === basketItems[i]._id && itemLense === basketItems[i].selectLense) {
      basketItemIndex = i;
    }
  }
  // modifier la quantité dans le local
  basketItems[basketItemIndex].selectQuantity = event.target.previousSibling.value;
  localStorage.setItem("basket", (JSON.stringify(basketItems))); 
  window.location.reload(true);
  //alert("Quantité modifiée !");
  //window.alert("Quantité modifiée !");  
}

function deleteItem(){
  //Sélectionner le bouton puis la carte à laquelle il appartient
  let itemCard = event.target.parentNode.parentNode;
  //Identifier l'item associé dans le local storage
  let itemId = itemCard.getAttribute("data-id");
  let itemLense = itemCard.getAttribute("data-lense");
  let basketItemIndex;
  for (let i = 0; i < basketItems.length; i++) {
    if (itemId === basketItems[i]._id && itemLense === basketItems[i].selectLense) {
      basketItemIndex = i;
    }
  }
  //Supprimer l'item dans le local storage
  basketItems.splice(basketItemIndex, 1);
  localStorage.setItem("basket", (JSON.stringify(basketItems)));
  window.location.reload(true);
  //alert("Item supprimé !");
  //window.alert("Item supprimé !");
  returnHomePageEmptyBasket()
}

function checkIfFieldIsValid(input, regExp) {
  return input.value.match(regExp) !== null;
}

function submitPayment(){
  //Si la fonction a déjà été utilisée on réinitialise le formulaire
  //suppr div
  //suppr is-valid/is-invalid
  let inputs = document.querySelectorAll("input");
  for (let i = 0; i < inputs.length ; i++) {
    inputs[i].classList.remove("is-invalid");
    inputs[i].classList.remove("is-valid");
  }


  let alertMessages = document.querySelectorAll(".alertMessages");
  for (let i = 0; i < alertMessages.length ; i++) {
    alertMessages[i].remove();
  };

  //Récupérer les informations du formulaire
  var firstName = document.querySelector("#firstName"),
      lastName = document.querySelector("#lastName"),
      address = document.querySelector("#address"),
      city = document.querySelector("#city"),
      email = document.querySelector("#email");

  //Définition des expressions régulières pour la vérification de la validité des champs
  let stringRegExp = /([A-Za-z0-9_\s\-'\u00C0-\u024F]+)/;
  emailRegExp = /^([\w\-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;

  //Vérification de la validité des champs
  let isfirstNameValid = checkIfFieldIsValid(firstName, stringRegExp),
      isLastNameValid = checkIfFieldIsValid(lastName, stringRegExp);
  isAddressValid = checkIfFieldIsValid(address, stringRegExp);
  isCityValid = checkIfFieldIsValid(city, stringRegExp);
  isEmailValid = checkIfFieldIsValid(email, emailRegExp);


  //Alerter l'utilisateur s'il a mal rempli le formulaire
  let fields = [firstName, lastName, address, city, email],
      fieldsValidity = [isfirstNameValid, isLastNameValid, isAddressValid, isCityValid, isEmailValid],
      isAFieldInvalid = false;

  for (let i = 0; i < fields.length; i++) {
    if (!fieldsValidity[i]) { //si un champ n'est pas valide
      isAFieldInvalid = true; //un champ au moins est incorrect, sera utilisé plus loin pour empêcher la requête POST à l'API

      //Création du message à envoyer à l'utilisateur
      let message;
      if (fields[i] === document.querySelector("#firstName")) {
        message = "Le prénom est incorrect !";
      } else if (fields[i] === document.querySelector("#lastName")) {
        message = "Le nom est incorrect !";
      } else if (fields[i] === document.querySelector("#address")) {
        message = "L'adresse postale est incorrecte !";
      } else if (fields[i] === document.querySelector("#city")) {
        message = "La ville est incorrecte !";
      } else {
        message = "L'adresse mail est incorrecte !";
      }

      //Création et stylisation de l'alerte
      let alert = document.createElement("div");
      alert.appendChild(document.createTextNode(message));
      fields[i].classList.add("is-invalid");
      alert.classList.add("alertMessages", "invalid-feedback");
      fields[i].parentElement.appendChild(alert);

    } else {
      fields[i].classList.add("is-valid");
    }
  }
  //Si l'un des champs a été vidé ...
  if (isAFieldInvalid) return; //la fonction s'arrête
  //sinon on continue


  //Récupérer les informations du formulaire
  var firstName = document.querySelector("#firstName"),
      lastName = document.querySelector("#lastName"),
      address = document.querySelector("#address"),
      city = document.querySelector("#city"),
      email = document.querySelector("#email");
  //Les entrer dans un objet
  //Les entrer dans un objetI
  let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value
      },
      products = productsID;
  //Récupérer l'orderId
  fetch('http://localhost:3000/api/cameras/order', {
    method: 'post',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({//convertion du JSON en chaine de caractère
      contact: contact,
      products: products
    })
  })
      .then(response => response.json())
      .then(order => {
        localStorage.setItem("orderId", order.orderId);
        window.location.href = "order.html";
      })
      .catch(error => alert("Un des champ du formulaire n'est pas correct !"));
}



manageBasket();
basket();
document.querySelector("#submitPayment").addEventListener("click", submitPayment, false);