import { products } from "./products.js";

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total_price;
let tax;
let deliverycost = Number(0);

function renderCart() {
    let cartHTML = '';
    let invoiceHTML = '';
    total_price = Number(0);
    tax = 0;
    let total_items = Number(0);

    cart.forEach((product, index) => {
        let id = product.id;
        let matching;

        products.forEach((value)=>{
            if(value.id==id){
                matching=value;
            }
        });

        if (matching) {
            cartHTML += `
            <div class="product-container">
                <div class="cart">
                    <div class="cart-header">
                        <span>Delivery Date: Tuesday, January 2</span>
                    </div> 
                    <div class="cart-container">
                        <section class="cart-leftsection">
                            <div class="product-img-container">
                                <img class="product-img" src="${matching.image}" >
                            </div>
                            <div class="product-details">
                                <div class="product-name">
                                    ${matching.name}
                                </div>
                                <div class="product-price">
                                    $${((matching.price) / 100).toFixed(2)}
                                </div>
                                <div class="quantity-container">
                                        Quantity: ${product.quantity} <span style="color:rgb(1, 124, 182); cursor:pointer;">
                                        <span class="update${index} update" data-index="${index}">Update</span>
                                        <span class="delete" data-index="${index}">Delete</span>
                                    </span>
                                </div>
                            </div>
                        </section>
                        <section class="delivery-container">
                            <div style="font-weight: bold;">Choose a delivery option:</div>        
                            <div class="delivery-options">
                                <input type="radio" class="radio${index}" value="0" name="delivery${index}">
                                <div class="delivery">
                                    <div>
                                        Tuesday, January 2
                                    </div>
                                    <div class="delivery-date">FREE Shipping</div>
                                </div>
                            </div>
                            <div class="delivery-options">
                                <input type="radio" class="radio${index}" value="4.99" name="delivery${index}">
                                <div class="delivery">
                                    Wednesday, December 27
                                    <div class="delivery-date">$4.99 - Shipping</div>
                                </div>
                            </div>
                            <div class="delivery-options">
                                <input type="radio" class="radio${index}" value="9.99" name="delivery${index}">
                                <div class="delivery">
                                    Monday, December 25
                                    <div class="delivery-date">$9.99 - Shipping</div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
            `;

            total_price += Number(((matching.price * product.quantity) / 100).toFixed(2));
            tax = Number(((total_price * 10) / 100).toFixed(2));

            invoiceHTML = `
                <div>
                    $${total_price}
                </div>
                <div>
                    $${deliverycost}
                </div>
                <hr>
                <div>
                    $${total_price}
                </div>
                <div>
                    $${tax}
                </div>
            `;
        }
        add_delivery(index);
        total_items++;
    });

    document.querySelector('.cart-summary').innerHTML = cartHTML;
    document.querySelector('.header-middlesection span').innerHTML = `${total_items} Items`;
    document.querySelector('.invoice-items').innerHTML = `Items (${total_items}):`;
    document.querySelector('.invoice-upper-right').innerHTML = invoiceHTML;
    document.querySelector('.invoice-middle-right h2').innerHTML = `$${((total_price + tax).toFixed(2))}`;
}

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('update')) {
        let index = parseInt(event.target.dataset.index);
        update(index);
    }

    if (event.target.classList.contains('delete')) {
        let index = parseInt(event.target.dataset.index);
        deleteProduct(index);
    }
});

function add_delivery(index) {
    document.querySelectorAll(`.radio${index}[name="delivery${index}"]`).forEach((button) => {
        button.addEventListener('change', (event) => {
            deliverycost = event.target.value;
            console.log(deliverycost);
        });
    });
}

function update(index) {
    const updateContainer=document.querySelector('.quantity-container');
    updateContainer.innerHTML=`
    Quantity:<span style="color:rgb(1, 124, 182); cursor:pointer;">
        <span class="update${index} update" data-index="${index}">
        <input type="number" min="1" value="${cart[index].quantity}" style="width: 40px;"> <span style="cursor:pointer" class="save">Save</span>
        </span>
        <span class="delete" data-index="${index}">Delete</span>
    </span>
    `;
    const saveButton = updateContainer.querySelector('.save');
    saveButton.addEventListener('click', () => {
        let updatedQuantity = parseInt(updateContainer.querySelector('input').value, 10);

        if ((updatedQuantity) ) {
            cart[index].quantity = updatedQuantity;
            updatecartquantity(); 
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    });
}

function deleteProduct(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updatecartquantity();
}

function updatecartquantity() {
    let cart_quantity = 0;
    cart.forEach((value) => {
        cart_quantity += value.quantity;
    });
    localStorage.setItem('cart-quantity', cart_quantity);
    renderCart();
}

renderCart(); 