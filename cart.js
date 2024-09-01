
let oneuser = JSON.parse(localStorage.getItem("one_user"));
let data = JSON.parse(localStorage.getItem("data"));
let cartItems = oneuser.cartItems;
let displayItem = document.querySelector("#items");

function display() {
    displayItem.innerHTML = "";
    cartItems.map((e) => {
        displayItem.innerHTML += ` <div id="${e.productId}">
                     <img src="${e.productImageURLs[0]}" alt="">
                     <h3>${e.name}</h3>
                     <h2>Price:${e.price}</h2>
                     <h2>Rating:${e.rating}</h2>
                     <button>Remove From Cart</button>
                    </div>`;

    });
    del(); //* again declaration will begin
    grandTotal(); //*updated price after deleting item
}
display();



//& to delete items
function del() {
    let section = document.querySelector("section");
    let allbtn = section.querySelectorAll("button");
    // console.log(allbtn);

    allbtn.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            let confirmation = confirm("Are you sure you want to remove the product?");
            if (confirmation) {
                // btn.parentElement.remove();//* it will work but after refresh it will appear again
                cartItems = cartItems.filter((e) => {
                    if (btn.parentElement.id != e.productId) {
                        return e;
                    }
                })
                display();

                oneuser.cartItems = cartItems;
                console.log(oneuser);
    
            //& storing data in one local storage
                localStorage.setItem("one_user",JSON.stringify(oneuser))
    
                //* removing  current user data details
                data = data.filter((e)=>{
                    if(e.phone!=oneuser.phone){
                        return e;
                    }
                })
    
                //*  adding current user updated details to data
                data.push(oneuser);
                // console.log(data);
                //* store updated data in local storage
                localStorage.setItem("data",JSON.stringify(data));
            }
        });
    })
}
del();

function grandTotal(){
    let sum=0;
    cartItems.map((e)=>{
        sum = sum+ e.price;

    });
    let total = document.querySelector("#total");
    total.innerHTML = sum;
}
grandTotal();





