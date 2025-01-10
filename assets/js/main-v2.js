//get data from Firebase
import {dbRef, get, getAuth, app, GoogleAuthProvider, signInWithPopup} from "./firebase-config.js";

function createProduct(sale, pic, company, name, rate, price) {
    let productWrapper = document.querySelector(".product-grid");
    let productItem = document.createElement("div");
    productItem.classList.add("product");
    if(sale) {
        productItem.innerHTML += `<div class="product-sale">${sale}</div>`
    }
    if(pic) {
        productItem.innerHTML += `<div class="product-image">
            <img src="${pic}" alt="">
        </div>`
    }else{
        productItem.innerHTML += `<div class="product-image">
            <img src="assets/img/icons/empty.png" alt="">
        </div>`
    }
    if(company) {
        productItem.innerHTML += `<div class="product-company">${company}</div>`
    }
    if(name) {
        productItem.innerHTML += `<div class="product-name">${name}</div>`
    }
    if(rate) {
        let rateIcon = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99996 0L4.77994 4.37495L0 5.16906L3.40783 8.66706L2.6738 13.5328L7 11.3197L11.3262 13.5328L10.5922 8.66706L14 5.16906L9.22006 4.37495L6.99996 0Z" fill="#FFD166"/></svg>'
        let rateIconMimus = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.99996 0L4.77994 4.37495L0 5.16906L3.40783 8.66706L2.6738 13.5328L7 11.3197L11.3262 13.5328L10.5922 8.66706L14 5.16906L9.22006 4.37495L6.99996 0Z" fill="#DFDEDC"/></svg>'
        let rateWrapper = document.createElement("div");
        rateWrapper.classList.add("product-rate");

        for(let i = 1; i <= rate; i++) {
            rateWrapper.innerHTML += `${rateIcon}`;
        }

        if(rate<5){
            let minus = 5 - rate;
            for(let i = 1; i <= minus; i++) {
                rateWrapper.innerHTML += `${rateIconMimus}`;
            }
        }
        productItem.append(rateWrapper);

        let bottomWrapper = document.createElement("div");
        bottomWrapper.classList.add("product-bottom");
        productItem.append(bottomWrapper);

        if(price) {
            bottomWrapper.innerHTML += `<div class="product-price">${price}</div>`
        }

        let buttonAdd = document.createElement("div");
        buttonAdd.classList.add("product-add");
        buttonAdd.textContent = "Add  +";
        bottomWrapper.append(buttonAdd);

    }
    productWrapper.append(productItem);

}


//MAP
var map = L.map('map').setView([50.44771846014896, 30.492616380116534], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker = L.marker([50.44771846014896, 30.492616380116534]).addTo(map);

marker.bindPopup("<b>Our Office</b>").openPopup();

//Desktop menu
const header = document.querySelector("header");
window.addEventListener("scroll", function () {
    if(window.scrollY > 0) {
        header.classList.add("active");
    } else {
        header.classList.remove("active");
    }
})

//Mobile menu
const menuBtn = document.querySelector("#mobile-menu");
const menu = document.querySelector("header nav");
menuBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    menu.classList.toggle("open");
})

//Current date
const currentDate = document.querySelector("#current-data");
currentDate.innerHTML = new Date().getFullYear();

//modal auth
const modalBtn = document.querySelector(".modal-auth-btn");
const modalClose = document.querySelector(".modal-close");
const modal = document.querySelector(".modal-auth");

modalBtn.addEventListener("click", function () {
    modal.classList.add("active");
});

modalClose.addEventListener("click", function () {
    modal.classList.remove("active");
})


//Firebase data
function getData() {
    get(dbRef).then((snapshot) => {
        if (snapshot.exists()) {
            const data = snapshot.val();
            for(let item in data) {
                //console.log(data[item].company);
                createProduct(data[item].sale, data[item].pic, data[item].company, data[item].name, data[item].rate, data[item].price)
            }
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

getData();

//Auth with Google
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const authBtn = document.querySelector(".google-auth-button");
const modalContent = document.querySelector(".modal-content");

authBtn.addEventListener("click", function () {
    signInWithPopup(auth, provider)
        .then((result) => {
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            const user = result.user;
            console.log("User Info: ", user);
            console.log("Access Token: ", token);
            modalContent.innerHTML = `<p>Welcome ${user.displayName}</p>`;
            setTimeout(
                () => {
                    modal.classList.remove("active");
                }, 3000
            )

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.error("Error: ", errorMessage);
        });
})
