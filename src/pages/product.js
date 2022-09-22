// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';
// specific
import { addToCart } from '../cart/setupCart.js';
import { singleProductUrl, getElement, formatPrice } from '../utils.js';

// selections
const loading = getElement('.page-loading');
const centerDOM = getElement('.single-product-center');
const pageTitleDOM = getElement('.page-hero-title');
const imgDOM = getElement('.single-product-img');
const titleDOM = getElement('.single-product-title');
const companyDOM = getElement('.single-product-company');
const priceDOM = getElement('.single-product-price');
const colorsDOM = getElement('.single-product-colors');
const descDOM = getElement('.single-product-desc');
const cartBtn = getElement('.addToCartBtn');

// Cart product
let productID;

// // get the id
// const params = new URLSearchParams(window.location.search);
// const id = params.get('id');
// console.log(id);

// for response after fetch: if RESPONSE.STATUS from 200 to 299=> success. Other than that => error
// catch block can only catch network error. It can't catch errors if product doesn't exist or the url is incorrect
// show products when page loads
window.addEventListener('DOMContentLoaded', fetchProduct);
async function fetchProduct() {
  try {
    const response = await fetch(
      `${singleProductUrl}${window.location.search}`
    );
    // console.log(response); // response.ok (false), response.status: 404 if there's an error.
    // OPTION1: check RESPONSE.OK to handle any non-network errors
    // if (!response.ok) {
    //   console.log(response.status, response.statusText);
    // centerDOM.innerHTML = `<div><h3 class="error">sorry, something went wrong</h3>
    // <a href="index.html" class="btn">back to home page</a></div>`;
    // throw new Error('Something went wrong');
    // }
    // const product = await response.json();
    // console.log(product);

    // OPTION2: Check RESPONSE.STATUS to handle any non-network errors
    if (response.status >= 200 && response.status <= 299) {
      const product = await response.json();
      // console.log(product);
      const {
        id,
        fields: { name, company, description, image, price, colors },
      } = product;
      productID = id; // assign cart productID to id
      // console.log(image);
      const imageURL = image[0].thumbnails.large.url;
      document.title = name.toLowerCase();
      pageTitleDOM.textContent = `Home / ${name}`;
      imgDOM.src = imageURL;
      titleDOM.textContent = name;
      companyDOM.textContent = `by ${company}`;
      priceDOM.textContent = formatPrice(price);
      descDOM.textContent = description;
      console.log(colors);
      colors.forEach((color) => {
        const span = document.createElement('span');
        span.classList.add('product-color');
        span.style.backgroundColor = `${color}`;
        colorsDOM.appendChild(span);
      });

      // A different approach:
      // const imageURL = image[0].thumbnails.large.url;
      // let colorsList = colors
      //   .map((color) => {
      //     return `<span class="product-color" style="color: ${color}"></span>`;
      //   })
      //   .join('');
      // centerDOM.innerHTML = `<img
      //   src=${imageURL}
      //   class="single-product-img img"
      //   alt=""
      // />
      // <article class="single-product-info">
      //   <div>
      //     <h2 class="single-product-title">${name}</h2>
      //     <p class="single-product-company text-slanted">by ${company}</p>
      //     <p class="single-product-price">${formatPrice(price)}</p>
      //     <div class="single-product-colors">${colorsList}</div>
      //     <p class="single-product-desc">
      //       ${description}
      //     </p>
      //     <button class="addToCartBtn btn" data-id=${id}>Add to cart</button>
      //   </div>
      // </article>`;
    } else {
      console.log(response.status, response.statusText);
      centerDOM.innerHTML = `<div><h3 class="error">sorry, something went wrong</h3>
        <a href="index.html" class="btn">back to home page</a></div>`;
    }
  } catch (error) {
    // catch block can only catch network error. It can't catch errors if product doesn't exist or the url is incorrect
    console.log(error);
  }

  // hide loading
  loading.style.display = 'none';
}

// console.log(productID); // prints UNDEFINED because this will run before the event listener -> no value yet
// There's another way to get the id directly from the URL:
// const id = new URLSearchParams(window.location.search).get('id');
// console.log(id);

// ADD EVENT LISTENER to CART BUTTON
cartBtn.addEventListener('click', () => {
  console.log(productID); // productID will have a value AFTER the page loads
  addToCart(productID);
});
