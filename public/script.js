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
                    <button>Add to Cart</button>
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
