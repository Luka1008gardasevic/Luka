function SaveToLocal(data, dataName)
{
  var myJSON = JSON.stringify(data);
  console.log(myJSON)
  localStorage.setItem(dataName, myJSON);
}

function LoadFromLocalStorage(dataName)
{
  var textData = localStorage.getItem(dataName);
  console.log(textData)
  var data = JSON.parse(textData);
  return data;
}

document.addEventListener("DOMContentLoaded", () => {
  
  console.log(productsData);
  console.log(LoadFromLocalStorage("cart"))
  function displayProducts(products){
    let result = '';
    let resultFemale = '';
    let resultKids = '';

    const productsDOM = document.getElementsByClassName("shop-items");
    const productsDOMfemale = document.getElementsByClassName("shop-items-female");
    const productsDOMkids = document.getElementsByClassName("shop-items-kids");

    products.cartItems.forEach(product => {
      if(product != undefined)
      {
        if(product.model == "muski")
        {
          

          result +=`<div class="shop-item">
           <span class="shop-item-title">${product.name}</span>
           <img class="shop-item-image" src="${product.imageUrl}">
           <div class="shop-item-details">
               <span class="shop-item-price">${product.price}</span>
               <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
           </div>
       </div>`;

        }
        if(product.model == "zenski"){
          resultFemale +=`
          <div class="shop-item">
           <span class="shop-item-title">${product.name}</span>
           <img class="shop-item-image" src="${product.imageUrl}">
           <div class="shop-item-details">
               <span class="shop-item-price">${product.price}</span>
               <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
           </div>
            </div>`;

        }
        if(product.model == "deciji"){
          resultKids +=`
          <div class="shop-item">
           <span class="shop-item-title">${product.name}</span>
           <img class="shop-item-image" src="${product.imageUrl}">
           <div class="shop-item-details">
               <span class="shop-item-price">${product.price}</span>
               <button class="btn btn-primary shop-item-button" type="button">ADD TO CART</button>
           </div>
            </div>`;

        }


        
      }
    });
    productsDOM[0].innerHTML += result;
    productsDOMfemale[0].innerHTML += resultFemale;
    productsDOMkids[0].innerHTML += resultKids;
  }

  displayProducts(productsData);
});
