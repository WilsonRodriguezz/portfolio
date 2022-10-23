//Author: Wilson Rodriguez Arellano
//Student ID: 3012325205
//Date: 2022-10-23
//File name: app.js

const { name } = require("ejs");

//Function to capture data from the contact form
function capture() {
    var firstName = document.getElementById("inputFirstName").value;
    console.log(firstName);
    var lastName = document.getElementById("inputLastName").value;
    console.log(lastName);
    var email = document.getElementById("inputEmail").value;
    console.log(email);
    var phoneNumber = document.getElementById("inputPhoneNumber").value;
    console.log(phoneNumber);
    var city = document.getElementById("inputCity").value;
    console.log(city);
    var state = document.getElementById("inputState").value;
    console.log(state);
    var zip = document.getElementById("inputZip").value;
    console.log(zip);
    var message = document.getElementById("inputMessage").value;
    console.log(message);

    //Alert to confitm the input collection
    alert("Input confirmation");

}