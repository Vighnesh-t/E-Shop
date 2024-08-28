let form = document.querySelector("form");
let username = document.querySelector("input[name='username']");
let password = document.querySelector("input[name='password']");
let euser = document.querySelectorAll("span.error")[0];
let epass = document.querySelectorAll("span.error")[1];
let eform = document.querySelectorAll("span.error")[2];

function navigateToSignup() {
    window.location.href = './signup.html';
}

let dataFromStorage = JSON.parse(localStorage.getItem("data")) || []; // Ensure we have an array

form.addEventListener("submit", (e) => {
    euser.innerHTML = "";
    epass.innerHTML = "";
    eform.innerHTML = "";
    username.style.borderColor = "white";
    password.style.borderColor = "white";

    // Matching data
    let matchedData = dataFromStorage.find((user) => {
        return (user.phone === username.value && user.pass === password.value) || 
               (user.email === username.value && user.pass === password.value);
    });

    if (username.value === "" && password.value === "") {
        euser.innerHTML = "*Enter email or mobile number";
        epass.innerHTML = "*Enter password";
        username.style.borderColor = "red";
        password.style.borderColor = "red";
        e.preventDefault();
    } else if (username.value === "") {
        euser.innerHTML = "*Enter email or mobile number";
        username.style.borderColor = "red";
        e.preventDefault();
    } else if (password.value === "") {
        epass.innerHTML = "*Enter password";
        password.style.borderColor = "red";
        e.preventDefault();
    } else if (matchedData) {
        alert("Welcome to the page");
        localStorage.setItem("one_user", JSON.stringify(matchedData));
    } else {
        eform.innerHTML = "*Match not found";
        e.preventDefault();
    }
});

let h3 = document.querySelector("h3");
h3.addEventListener("click", () => {
    if (h3.innerHTML === "show") {
        password.type = "text";
        h3.innerHTML = "hide";
    } else {
        h3.innerHTML = "show";
        password.type = "password";
    }
});
