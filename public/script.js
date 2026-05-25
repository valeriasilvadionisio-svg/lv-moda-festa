// how to select the contact form 
let form = document.getElementById("contact-form"); 
// let = create a variable / form= the name of variable / document = is the html page / get..= looks for the element with that id / so this line gets the form and stores in the form variable 

if (form) {
// now i wil to add submit event to the form / this runs when the user clicks the send button 
form.addEventListener("submit", function(event){
    event.preventDefault(); //stop the form from sending automatically, because need to validation informations, to make sure the information its correct, i used instead return false

let name = document.getElementById("name").value.trim(); // get the name input value and remove extra spaces = trim 
let email = document.getElementById("email").value.trim(); // get the email input value 
let phone = document.getElementById("phone").value.trim(); //get the phone value 
let message = document.getElementById("message").value.trim(); // get the message value 
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // if the format is valid for email 

// now how to validate this 
//check if the name field is empty 
if (name === ""){ // "" means empty 
    alert("Please enter your name");
    return;
}

let namePattern = /^[A-Za-zÀ-ÿ\s]+$/; //if the format is valid for name //i also added validation for accents, cause, my name has an accents, so i think thats important. 

if(!namePattern.test(name)){ //check if the name contains letters and spaces only 
    alert("Name must contain letters only");
    return;
}

if (email === ""){
    alert("Please enter your email");
    return;
}

// check if the email format is valid, if is not in the format, so the alert will appear 
if (!emailPattern.test(email)){
    alert("Please enter a valid email");
    return;
}

if(phone == ""){
    alert("Please enter a phone number");
    return;
}

//check if the phone number contains numbers only, as a brief asked 
if(isNaN(phone)){ //isNaN means = is Not a Number
    alert("Phone number must contain numbers only");
    return;
}

// the comand to check if the phone number has 9 or 10 digits 
if(phone.length < 9 || phone.length > 10){
    alert("Phone number must be 9 or 10 digits long");
    return;
}


if (message === ""){
    alert("Please enter your message");
    return;
}
//show success message if all fields are correct 
alert ("Form submitted successfully! Thank you for the message. One of our agents will get in touch with you.");

//clear the form after successful submission, i saw the prompt 
form.reset();

});
}

///////////////////////////////////////////////////
// MY DYNAMIC PRODUCTS FROM DATABASE

// I select the products container from gallery.html.
// This div is empty in the HTML because JavaScript will fill it with products from MySQL.
let productsContainer = document.getElementById("products-container");

// I check if the products container exists before running this code.
// This is important because this script.js file is used on different pages.
if (productsContainer) {

    // I request the products from my Express server.
    // The /products route gets the dresses from the MySQL database.
    fetch("/products")

        // I convert the server response into JSON.
        .then(response => response.json())

        // I receive the list of products from the database.
        .then(products => {

            // I clear the container before adding the products.
            productsContainer.innerHTML = "";

            // I repeat this code for each product in the database.
            products.forEach(product => {

                // I create a div for each product card.
                let productCard = document.createElement("div");

                // I add a CSS class to style this card later.
                productCard.className = "product-card";

                // I create the product card content using database information.
                productCard.innerHTML = `
                    <img src="images/${product.image}" alt="${product.name}">
                    <h2>${product.name}</h2>
                    <p>Colour: ${product.colour}</p>
                    <p>Size: ${product.size}</p>
                    <p>Price: €${product.price}</p>
                    <button onclick="addToCart(${product.product_id}, '${product.name}', ${product.price})">Add to Cart</button>
                `;

                // I add the product card to the page.
                productsContainer.appendChild(productCard);

            });

        })

        // If the products cannot be loaded, I show the error in the console.
        .catch(error => {
            console.log("Error loading products:", error);
        });

}

////////////////////////////////////
// ADD PRODUCT TO CART


// This function runs when the user clicks the Add to Cart button.
// It receives the product id, name and price from the product card.
function addToCart(productId, productName, productPrice) {

    // I get the current cart from localStorage.
    // localStorage saves data in the browser, even if the page refreshes.
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // I create an object with the product information.
    let product = {
        id: productId,
        name: productName,
        price: productPrice
    };

    // I add the selected product to the cart array.
    cart.push(product);

    // I save the updated cart back into localStorage.
    localStorage.setItem("cart", JSON.stringify(cart));

   // I show a simple message to confirm the product was added.
   // I keep the user on the products page so they can continue shopping.
   alert(productName + " added to cart!");
}

///////////////////////////
// DISPLAY CART ITEMS

// I select the cart container from cart.html.
// This is where the products added to the cart will appear.
let cartContainer = document.getElementById("cart-container");

// I select the total price area from cart.html.
let cartTotal = document.getElementById("cart-total");

// I check if the cart page elements exist before running this code.
// This prevents errors on pages that do not have a cart.
if (cartContainer && cartTotal) {

    // I get the cart saved in localStorage.
    // If there is no cart yet, I use an empty array.
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // I start the total price at zero.
    let total = 0;

    // I clear the cart container before displaying items.
    cartContainer.innerHTML = "";

    // If the cart is empty, I show a message to the user.
    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    }

    // I display each product saved in the cart.
    cart.forEach((product, index) => {

        // I add the product price to the total.
        total = total + Number(product.price);

        // I create one div for each cart item.
        let cartItem = document.createElement("div");

        // I add a CSS class so I can style it later.
        cartItem.className = "cart-item";

      // I create the content of each cart item.
      // I also add a remove button.
      // The index helps JavaScript know which item should be removed from the cart.
        cartItem.innerHTML = `
        <h2>${product.name}</h2>
       <p>Price: €${product.price}</p>
       <button onclick="removeFromCart(${index})">Remove</button>
`;

        // I add the cart item to the cart container.
        cartContainer.appendChild(cartItem);
    });

    // I display the final total price.
    cartTotal.textContent = "Total: €" + total.toFixed(2);
}


////////////////////////////////////
// REMOVE PRODUCT FROM CART


// This function removes one product from the cart.
// The index tells JavaScript the position of the product inside the cart array.
function removeFromCart(index) {

    // I get the current cart from localStorage.
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // I remove one item from the cart using its position.
    cart.splice(index, 1);

    // I save the updated cart back into localStorage.
    localStorage.setItem("cart", JSON.stringify(cart));

    // I reload the cart page so the removed item disappears from the screen.
    location.reload();
}

////////////////////////////////////
// CHECKOUT ORDER SUMMARY


// I select the checkout summary area from checkout.html.
let checkoutSummary = document.getElementById("checkout-summary");

// I check if the checkout summary exists before running this code.
if (checkoutSummary) {

    // I get the cart from localStorage.
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // I start the total at zero.
    let total = 0;

    // If the cart is empty, I show a message.
    if (cart.length === 0) {
        checkoutSummary.innerHTML = "<p>Your cart is empty.</p>";
    } else {

        // I create the title for the order summary.
        checkoutSummary.innerHTML = "<h2>Order Summary</h2>";

        // I show each product in the checkout summary.
        cart.forEach(product => {
            total = total + Number(product.price);

            checkoutSummary.innerHTML += `
                <p>${product.name} - €${product.price}</p>
            `;
        });

        // I show the final total.
        checkoutSummary.innerHTML += `<h3>Total: €${total.toFixed(2)}</h3>`;
    }
}

////////////////////////////////////////
// CHECKOUT FORM VALIDATION

// I select the checkout form from checkout.html.
// This form only exists on the checkout page.
let checkoutForm = document.getElementById("checkout-form");

// I check if the checkout form exists before running this code.
// This prevents errors on other pages.
if (checkoutForm) {

    // This event runs when the user clicks Place Order.
    checkoutForm.addEventListener("submit", function(event) {

        // I stop the form from refreshing the page automatically.
        event.preventDefault();

        // I get the values typed by the customer.
        let customerName = document.getElementById("customer-name").value.trim();
        let customerEmail = document.getElementById("customer-email").value.trim();
        let customerAddress = document.getElementById("customer-address").value.trim();

        // I check if the cart has products before allowing checkout.
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        if (cart.length === 0) {
            alert("Your cart is empty. Please add a product before checkout.");
            return;
        }

        // I check if all fields were completed.
        if (customerName === "" || customerEmail === "" || customerAddress === "") {
            alert("Please complete all checkout fields.");
            return;
        }

        // I calculate the total price of the cart before sending the order to the server.
let totalPrice = 0;

cart.forEach(product => {
    totalPrice = totalPrice + Number(product.price);
});

// I send the checkout information to my Express server.
// The server will save this order inside the MySQL orders table.
fetch("/checkout", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        customerName: customerName,
        customerEmail: customerEmail,
        customerAddress: customerAddress,
        totalPrice: totalPrice
    })
})
.then(response => response.json())
.then(data => {

    // If the server confirms the order was saved, I show a success message.
    alert("Order placed successfully! Thank you for shopping with LV Moda Festa.");

    // I clear the cart after the order is saved.
    localStorage.removeItem("cart");

    // I reset the checkout form.
    checkoutForm.reset();

    // I send the user back to the home page.
    window.location.href = "index.html";
})
.catch(error => {
    console.log("Error saving order:", error);
    alert("There was a problem placing your order.");
});
    });
}