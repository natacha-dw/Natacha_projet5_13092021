
let basketItems = JSON.parse(localStorage.getItem("basket"));
let productsID = [];

function manageBasket() {
  //Vérifier si le panier possède au moins une caméra :
  if (localStorage.getItem("basket") === null || localStorage.getItem("basket") === "[]") {
    document.querySelector("#basketPage").parentNode.hidden = true;
  } else {
    document.querySelector("#basketPage").parentNode.hidden = false;
  }
}

function basket(){
  manageBasket();
    for(let i = 0; i < basketItems.length;i++) {
    getOneCamera(i);
  }
    totalPrice();
}

function getOneCamera(i) {
  productsID.push(basketItems[i]._id);
  // Création des éléments
  let basket = document.querySelector("#basket"),
  basketItem = document.createElement("div"),
  basketItemBody = document.createElement("div"), 
  price = document.createElement("h4"),
  image = document.createElement("img"),
  selectLense = document.createElement("h4");

  // Remplissage des éléments
  
  image.src = basketItems[i].imageUrl;
  selectLense.appendChild(document.createTextNode(basketItems[i].selectLense));
  price.appendChild(document.createTextNode((basketItems[i].price * basketItems[i].selectQuantity / 100).toLocaleString("fr") + " Euros"));

  //Stylisation des éléments
  basketItem.classList.add("card", "border-light", "text-center", "m-4", "w-50");
  basketItem.setAttribute("data-id", basketItems[i]._id);
  basketItem.setAttribute("data-lense", basketItems[i].selectLense);
  image.classList.add("card-img-top");
  basketItemBody.classList.add("card-body");


  // Placement des éléments de la camera
  basketItemBody.appendChild(price);  
  basketItem.appendChild(selectLense);
  basketItem.appendChild(image);
  basketItem.appendChild(basketItemBody);

  // Placement de la camera 
  basket.appendChild(basketItem);
}

function totalPrice() {
  let total = 0;
  for (let j = 0; j < basketItems.length; j++) {
    total = total + (basketItems[j].price * basketItems[j].selectQuantity);
 
}
  
  document.querySelector("#total").appendChild(document.createTextNode("Total : " + (total / 100).toLocaleString("fr") + " Euros"));
}


basket();

let orderId = localStorage.getItem("orderId");
document.querySelector("strong").appendChild(document.createTextNode(orderId));
localStorage.removeItem("basket");
manageBasket()
localStorage.removeItem("orderId");
