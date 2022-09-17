import { getElement } from '../utils.js';
import display from '../displayProducts.js';

// const setupPrice = (products) => {
//   const priceInput = getElement('.price-filter');
//   const selectedValue = getElement('.price-value');

//   //   set up filter
//   let maxPrice = products.map((product) => {
//     return product.price;
//   });
//   maxPrice = Math.max(...maxPrice);
//   //   round up the price
//   maxPrice = Math.ceil(maxPrice / 100);
//   priceInput.value = maxPrice;
//   priceInput.max = maxPrice;
//   priceInput.min = 0;
//   selectedValue.textContent = `Value: $${maxPrice}`;

//   //   INPUT EVENT: fires when the value of <input> has been changed
//   priceInput.addEventListener('input', () => {
//     const value = parseInt(priceInput.value);
//     // console.log(value);
//     selectedValue.textContent = `Value: $${value}`;
//     let newProducts = products.filter(
//       (product) => product.price / 100 <= value
//     );
//     display(newProducts, getElement('.products-container'));

//     if (newProducts.length < 1) {
//       getElement(
//         '.products-container'
//       ).innerHTML = `<h3 class="filter-error">Sorry, no products matched your search</h3>`;
//     }
//   });
// };

const setupPrice = (products) => {
  const priceInput = getElement('.price-filter');
  const selectedValue = getElement('.price-value');
  // add max price to the range slider/sliding bar
  let maxPrice = products.map((product) => product.price);
  maxPrice = Math.ceil(Math.max(...maxPrice) / 100); //   round up maxPrice
  priceInput.max = maxPrice;
  priceInput.min = 0;
  priceInput.value = maxPrice; // Once the page is loaded, the slider button will be set based on this value
  selectedValue.textContent = `Value: $${maxPrice}`;

  priceInput.addEventListener('input', () => {
    // display price when user slides bar
    const value = parseInt(priceInput.value); // get the value from the slider
    selectedValue.textContent = `Value: $${value}`;
    // add filtering functionality and display products when user slides bar
    let newProducts = products.filter(
      (product) => product.price / 100 <= value
    );
    if (newProducts.length > 0) {
      display(newProducts, getElement('.products-container'));
    } else {
      getElement(
        '.products-container'
      ).innerHTML = `<h3 class="filter-error">Sorry, no products matched your search</h3>`;
    }
  });
};

export default setupPrice;
