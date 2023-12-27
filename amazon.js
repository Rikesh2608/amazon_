import { products } from "./products.js";

let cart_products=[];
let productsHTML = '';

products.forEach((product,index) => {
  productsHTML += `
  <div class="product-details">
  <div class="product-img">
      <img src="${product.image}" class="product-image">
  </div>
  <div class="product-bottom">
      <div class="product-name">
          ${product.name}
      </div>
      <div class="reviews">
          <img src="rating-${product.rating}.png" class="ratings">   
          <div style="color:rgb(1, 124, 182)"> ${product.reviews}</div>
      </div>
      <div class="product-cost">
          $${product.price/100}
      </div>
      <select class="quantity">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
      </select>
      <div class="added${product.id} added"></div>
      <div class="add-button-flex">
          <button 
          class="add-cart" data-id="${product.id}" data-index="${index}">Add to Cart</button>
      </div>
  </div>
</div>
  `;
});

document.querySelector('.js-products').innerHTML = productsHTML;
cart_products= JSON.parse(localStorage.getItem('cart'))||[];

let cart_quantity=Number(localStorage.getItem('cart-quantity')) || Number(0);
document.querySelector('.cart-num')
.innerHTML = cart_quantity;

document.querySelectorAll('.add-cart')
    .forEach((button) => {
        button.addEventListener('click', () => {
            let index = button.dataset.index
            let productid = button.dataset.id;
            let productquantity = parseInt(document.querySelectorAll('.quantity')[index].value);
            let missing = '';
            let a=1;
            document.querySelector(`.added${productid}`).innerHTML='<span>✓ </span>Added';
            let added=setInterval(()=>{
                if(a===1){
                    a=0;
                    document.querySelector(`.added${productid}`).innerHTML='';
                }
                else{
                    clearInterval(added);
                }
            },1000);
            cart_products.forEach((item) => {
                if (item.id === productid) {
                    missing = item;
                }
            });
            if (missing) {
                missing.quantity += productquantity;
            } else {
                cart_products.push({
                    id: productid,
                    quantity: productquantity
                });
            }
            cart_quantity += productquantity;
            document.querySelector('.cart-num')
                .innerHTML = cart_quantity;

            localStorage.setItem('cart',JSON.stringify(cart_products));
            localStorage.setItem('cart-quantity',cart_quantity);
        });
    });
