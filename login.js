let form = document.querySelector("form");
let username  = document.querySelectorAll("input")[0];
let password  = document.querySelectorAll("input")[1];
let euser = document.querySelectorAll("span")[0];
let epass = document.querySelectorAll("span")[1];
let eform = document.querySelectorAll("span")[2];

// console.log(form,username,password,euser,epass,eform)

function navigateToSignup() {
    window.location.href = './signup.html';
  }

let dataFromStorage= JSON.parse(localStorage.getItem("data")); //* getting data from local storage

form.addEventListener("submit",(e)=>{

    euser.innerHTML = "";
    epass.innerHTML = "";
    eform.innerHTML = "";
    username.style.borderColor="white";
    password.style.borderColor="white";

    //*matching data
    let matchedData = dataFromStorage.find((e)=>{
        if((e.phone==username.value && e.pass==password.value) || (e.email==username.value && e.pass==password.value)){
            return e;
        }

    })
    if(username.value=="" && password.value==""){
        euser.innerHTML = "*enter email or mobile number";
        epass.innerHTML = "*enter password";
        username.style.borderColor="red";
        password.style.borderColor="red";
        e.preventDefault();
    }
    else if(username.value==""){
        euser.innerHTML = "*enter email or mobile number";
        username.style.borderColor="red";
        e.preventDefault();
    }
    else if(password.value==""){
        epass.innerHTML = "*enter password";
        password.style.borderColor="red";
        e.preventDefault();

    }
    else if(matchedData){
        alert("welcome to the page")
        localStorage.setItem("one_user",JSON.stringify(matchedData));
    }
    else{
        eform.innerHTML = "*Match not found"
        e.preventDefault();
    }
})
let h3 = document.querySelectorAll("h3")[0];
h3.addEventListener("click",()=>{
    if(h3.innerHTML=="show"){
        password.type = "text";
        h3.innerHTML = "hide";
    }else{
        h3.innerHTML="show";
        password.type="password"
    }
})