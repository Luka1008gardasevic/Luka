if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
  } else {
    ready();
  }
  
  function ready() {
    document
      .getElementsByClassName("btn-purchase")[0]
      .addEventListener("click", purchaseClicked);
  
      loadSavedCartData();
  
    var addCartButtons = document.getElementsByClassName("shop-item-button");
    for (var i = 0; i < addCartButtons.length; i++) {
      var button = addCartButtons[i];
      button.addEventListener("click", addCartClicked);
    }
  
    var removeCartItemButtons = document.getElementsByClassName("btn-danger");
    for (var i = 0; i < removeCartItemButtons.length; i++) {
      var button = removeCartItemButtons[i];
      button.addEventListener("click", removeCartItem);
    }
  
    var quantityInputs = document.getElementsByClassName("cart-quantity-input");
    for (var i = 0; i < quantityInputs.length; i++) {
      var quantity = quantityInputs[i];
      quantity.addEventListener("change", quantityChange);
    }
  }
  
  function quantityChange(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
      input.value = 1;
    }
    totalUpdate();
  }
  
  function purchaseClicked() {
    alert("Thank you!");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()) {
      cartItems.removeChild(cartItems.firstChild);
    }
    totalUpdate();
    localStorage.clear();
  }
  
  let cartData = {};
  
  function loadSavedCartData(){
      var data = LoadFromLocalStorage("cart");
      if(data != undefined && data.cartItems != undefined)
      {
          for(var x = 0; x < data.cartItems.length; x++)
          {
            var url = data.cartItems[x].imgSrc.replace("%20", " ");
            addItemToCart(data.cartItems[x].title, data.cartItems[x].price, url); 
              
          }
          cartData = data;
      }
      
      totalUpdate();
  }
  
  function addCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName("shop-item-title")[0].innerText;
    var price = shopItem.getElementsByClassName("shop-item-price")[0].innerText;
    var imageSrc = shopItem.getElementsByClassName("shop-item-image")[0].src;
  
    var cartItem = {
      title: title,
      price: price,
      imgSrc: imageSrc,
    };
    if (cartData.cartItems == undefined) {
      cartData.cartItems = [];
    }
    cartData.cartItems.push(cartItem);
    console.log(cartData);
    SaveToLocal(cartData, "cart");
  
    addItemToCart(title, price, imageSrc);
    totalUpdate();
  }
  
  function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement("div");
    cartRow.classList.add("cart-row");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    var nasloviProvera = cartItems.getElementsByClassName("cart-item-title");
    for (var i = 0; i < nasloviProvera.length; i++) {
      if (nasloviProvera[i].innerText == title) {
        alert(" Product is already in chart!!!");
        return;
      }
    }
    var cartRowContents = `<div class="cart-item cart-column">
      <img class="cart-item-image" src="${imageSrc}"  
      width="100" height="100">
      <span class="cart-item-title">${title}</span>
      </div>
      <span class="cart-price cart-column">${price}</span>
       <div class="cart-quantity cart-column">
       <input class="cart-quantity-input" type="number" value="1">
       <button class="btn btn-danger" type="button">Remove</button>
       </div>`;
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow
      .getElementsByClassName("btn-danger")[0]
      .addEventListener("click", removeCartItem);
    cartRow
      .getElementsByClassName("cart-quantity-input")[0]
      .addEventListener("change", quantityChange);
  }
  
  function removeCartItem(event) {
    var buttClicked = event.target;
  
    var cartItem = buttClicked.parentElement.parentElement;
    console.log(cartItem);
    var title = cartItem.getElementsByClassName("cart-item-title")[0].innerText;
    var price = cartItem.getElementsByClassName("cart-price")[0].innerText;
    var imageSrc = cartItem.getElementsByClassName("cart-item-image")[0].src;
    
    var cartItem = {
      title:title,
      price:price,
      imgSrc:imageSrc
    }
    
    var item = cartData.cartItems.find(e => e.title == title && e.price == price && e.imgSrc == imageSrc);
    const myIndex = cartData.cartItems.indexOf(item)
    myIndex > -1 ? cartData.cartItems.splice(myIndex, 1) : false
    
    SaveToLocal(cartData, "cart");
    
  
    buttClicked.parentElement.parentElement.remove();
    totalUpdate();
  }
  
  function totalUpdate() {
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows = cartItemContainer.getElementsByClassName("cart-row");
    var zbir = 0;
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i];
      var cena = cartRow.getElementsByClassName("cart-price")[0];
      var kolicina = cartRow.getElementsByClassName("cart-quantity-input")[0]
        .value;
      var cenaKonacno = parseFloat(cena.innerText.replace("€", ""));
      zbir = zbir + cenaKonacno * kolicina;
    }
    zbir = Math.round(zbir * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText = "€" + zbir;
  }
  