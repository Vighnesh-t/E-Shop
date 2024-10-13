let form = document.querySelector("form");
let firstName = document.querySelectorAll("input")[0];
let lastName = document.querySelectorAll("input")[1];
let email = document.querySelectorAll("input")[2];
let mobile = document.querySelectorAll("input")[3];
let createPassword = document.querySelectorAll("input")[4];
let confirmPassword = document.querySelectorAll("input")[5];

let efirst = document.querySelectorAll("span")[0];
let elast = document.querySelectorAll("span")[1];
let eemail = document.querySelectorAll("span")[2];
let emobile = document.querySelectorAll("span")[3];
let epass = document.querySelectorAll("span")[4];
let ecpass = document.querySelectorAll("span")[5];

let storage=[];

let dataFromStorage = JSON.parse(localStorage.getItem("data"));



if(dataFromStorage){ // it will check it is null or not then it will get added at index
    storage = dataFromStorage;
}

// console.log(form,firstName,lastName,email,mobile,createPassword,confirmPassword);
// console.log(efirst,elast,eemail,emobile,epass,ecpass)

form.addEventListener("submit", (e) => {

    
    //* '^' to start , '$'- to end , to trigger regular expression -'/ /', user allowed to input -'[]'
    //* '{1,17}'-user length
    let flag = true;

    //& firstName validation
    let regx = /^[a-zA-Z]{1,17}$/;
    if (firstName.value == "") {
        efirst.innerHTML = `*enter first name`;
        flag = false; //* if there is error
        e.preventDefault();
    }
    else if (regx.test(firstName.value)) {
        efirst.innerHTML = "";
    }
    else {
        efirst.innerHTML = ` Invalid first name`;
        flag = false;
        e.preventDefault();
    }

    //& lastName validation

    if (lastName.value == "") {
        elast.innerHTML = `*enter last name`;
        flag = false;
        e.preventDefault();
    }
    else if (regx.test(lastName.value)) {
        elast.innerHTML = "";
    }
    else {
        elast.innerHTML = "Invalid last name"
        flag = false;
        e.preventDefault();
    }

    //&email validation

    let emailCheck = storage.find((e)=>{
        if(e.email==email.value){
            return e;
        }
    })
    if(emailCheck){
        eemail.innerHTML = "email already registered";
        e.preventDefault();
        flag=false;
    }
    else if (email.value == "") {
        eemail.innerHTML = `*enter email`;
        flag = false;
        e.preventDefault();
    }
    else {
        eemail.innerHTML = "";
    }

    //& mobile validation
    let regmo = /^[6-9][0-9]{9}$/; //* first square bracket for firstno and 2nd one for 9 nos
    let mobileCheck = storage.find((e)=>{
        if(e.phone==mobile.value){
            return e;
        }
    })
    
    if(mobileCheck){
        emobile.innerHTML = "mobile no already registered";
        e.preventDefault();
        flag= false;
    }
    else if (mobile.value == "") {
        emobile.innerHTML = `*enter the mobile no`
        flag = false;
        e.preventDefault();
    }
    else if (regmo.test(mobile.value)) {
        emobile.innerHTML = "";
    }
    else {
        emobile.innerHTML = "enter valid mobile no";
        flag = false;
        e.preventDefault();
    }

    //& create password validation
    let regpwd = /^[a-zA-Z0-9@#!]{6,15}$/;
    if (createPassword.value == "") {
        epass.innerHTML = `*enter the password`;
        flag = false;
        e.preventDefault();
    }
    else if (regpwd.test(createPassword.value)) {
        epass.innerHTML = "";
    }
    else {
        epass.innerHTML = "Invalid Password";
        flag = false;
        e.preventDefault();
    }

    //& confirm password validation

    if (confirmPassword == "") {
        ecpass.innerHTML = `*enter the password`;
        e.preventDefault();
    }
    else if (confirmPassword.value == createPassword.value) {
        ecpass.innerHTML = "";
    }
    else {
        ecpass.innerHTML = "*password is not matching"
        e.preventDefault();
    }

    //& store data in local storage
    if (flag) {

        let data = {
            first: firstName.value,
            last: lastName.value,
            email: email.value,
            phone: mobile.value,
            pass: createPassword.value,
            cartItems:null
        }
        storage.push(data) //* to prevent overriden of values

        localStorage.setItem("data",JSON.stringify(storage));
        console.log(data)
    }

})