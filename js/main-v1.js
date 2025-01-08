//get data from file
import {product} from "./data.js";

for (let item of product) {
    createProduct(item.sale, item.pic, item.company, item.name, item.rate, item.price);
}

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

//Current data
const currentDate = document.querySelector("#current-data");
currentDate.innerHTML = new Date().getFullYear();
