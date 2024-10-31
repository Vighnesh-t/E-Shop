let cartItems = [];
let data = JSON.parse(localStorage.getItem("data"));
let user = JSON.parse(localStorage.getItem("one_user"));
let count = document.querySelector("#count");

console.log(data, user);

if (user) {
  if (user.cartItems) {
    count.innerHTML = user.cartItems.length;
    cartItems = user.cartItems;
  }
}

function loginLogout() {
  //getting oneUser data from local storage
  let login = document.querySelector("#right");
  let oneUserData = JSON.parse(localStorage.getItem("one_user"));
  //console.log(oneUserData);

  //user information
  if (oneUserData) {
    //providing info inside div
    login.innerHTML = `<span>${oneUserData.first}</span> <a href="./main.html"><button id=logout>Logout</button></a>`;

    //accessing logout button
    let logout = document.querySelector("#logout");

    //logout event
    logout.addEventListener("click", () => {
      //removing one user local storage
      localStorage.removeItem("one_user");
    });
  }
}
loginLogout();

//fetching data from server
async function allProductsData() {
  //response object
  let dataFromServer = await fetch(
    "https://www.shoppersstack.com/shopping/products/alpha"
  );
  console.log(dataFromServer);

  //dataobject in js format
  let convertedData = await dataFromServer.json();

  //only datd property
  let allData = convertedData.data;
  console.log(allData);

  //filter data for men
  let menData = allData.filter((v) => {
    if (v.category == "men") {
      return v;
    }
  });
  //filter data for women
  let womenData = allData.filter((v) => {
    if (v.category == "women") {
      return v;
    }
  });
  //filter data for kids
  let kidData = allData.filter((v) => {
    if (v.category == "kids") {
      return v;
    }
  });
  //filter data for electronics
  let electronicsData = allData.filter((v) => {
    if (v.category == "electronics") {
      return v;
    }
  });

  console.log(menData);
  console.log(womenData);
  console.log(kidData);
  console.log(electronicsData);

  //male data output
  let menCont = document.querySelector("#menCont");
  menData.map((e) => {
    menCont.innerHTML += `
                <div id="${e.productId}">
                <img src="${e.productImageURLs[0]}" alt="">
                <h3>${e.name}</h3>
                <h2>Price ${e.price}</h2>
                <h2>Rating ${e.rating}</h2>
                <button>Add to Cart</button>
            </div>
        `;
  });

  //female data output
  let womenCont = document.querySelector("#womenCont");
  womenData.map((e) => {
    womenCont.innerHTML += `
        <div id="${e.productId}">
                <img src="${e.productImageURLs[0]}" alt="">
                <h3>${e.name}</h3>
                <h2>Price:-${e.price}</h2>
                <h2>Rating:-${e.rating}</h2>
                <button>Add to Cart</button>
            </div>`;
  });

  let kidCont = document.querySelector("#kidCont");
  kidData.map((e) => {
    kidCont.innerHTML += `
        <div id="${e.productId}">
                <img src="${e.productImageURLs[0]}" alt="">
                <h3>${e.name}</h3>
                <h2>Price:-${e.price}</h2>
                <h2>Rating:-${e.rating}</h2>
                <button>Add to Cart</button>
            </div>`;
  });

  let electronicsCont = document.querySelector("#kidCont");
  electronicsData.map((e) => {
    electronicsCont.innerHTML += `
        <div id="${e.productId}">
                <img src="${e.productImageURLs[0]}" alt="">
                <h3>${e.name}</h3>
                <h2>Price:-${e.price}</h2>
                <h2>Rating:-${e.rating}</h2>
                <button>Add to Cart</button>
            </div>`;
  });

  let input = document.querySelector("input");
  let searchBtn = document.querySelector("#searchBtn");
  let searchResult = document.querySelector("#searchResult");

  searchBtn.addEventListener("click", (e) => {
    searchResult.innerHTML = "";

    allData.map((e) => {
      if (
        e.name
          .toLocaleLowerCase()
          .includes(input.value.trim().toLocaleLowerCase())
      ) {
        searchResult.innerHTML += `<div>
            <img src="${e.productImageURLs[0]}" alt="">
            <h3>${e.name}</h3>
            <h2>Price:-${e.price}</h2>
            <h2>Rating:-${e.rating}</h2>
            <button>Add to Cart</button>
        </div>`;
      }
    });
  });

  //accessing all cart button if we use document the search,signin,signout will also get affected
  //sot to avoid this give a specific area

  let main = document.querySelector("main"); //all cart button in main
  let allBtn = main.querySelectorAll("button");
  console.log(document.querySelectorAll("button"));
  console.log(allBtn);

  //iterating all button
  allBtn.forEach((btn) => {
    //adding eventlistner to each button
    btn.addEventListener("click", () => {
      console.log(btn.parentElement);
      if (user) {
        cartItems = cartItems.filter((e) => {
          if (e.productId != btn.parentElement.id) {
            return e;
          }
        });

        //to find clicked product
        let product = allData.find((e) => {
          if (e.productId == btn.parentElement.id) {
            return e;
          }
        });
        console.log(product);
        //clicke product added to cart
        cartItems.push(product);
        console.log(cartItems);
        user.cartItems = cartItems;
        console.log(user);

        //storing new data in local storage as we cant update
        localStorage.setItem("one_user", JSON.stringify(user));
        data = data.filter((e) => {
          //removing current user data details
          if (e.phone != user.phone) {
            return e;
          }
        });

        //adding new user details
        data.push(user);
        console.log(data);
        localStorage.setItem("data", JSON.stringify(data));
        count.innerHTML = user.cartItems.length;
      } else {
        alert("login first");
        window.location.href = "./index.html";
      }
    });
  });
}

allProductsData();
