// global imports
import './src/toggleSidebar.js';
import './src/cart/toggleCart.js';
import './src/cart/setupCart.js';
// specific imports
import fetchProducts from './src/fetchProducts.js';
import { setupStore, store } from './src/store.js';
import display from './src/displayProducts.js';
import { getElement } from './src/utils.js';

const init = async () => {
  const products = await fetchProducts();
  //   console.log(products);
  //   if product is not undefined or null
  if (products) {
    setupStore(products);
    console.log(store); // If in store.js we set store variable = [], since this is logged after setupStore() is called, it will always show all products. (setupStore(products) make changes to the store variable. Store variable will no longer be empty. It doesn't return anything though)
  }
  const featured = store.filter((product) => {
    return product.featured === true;
  });
  // console.log(featured);
  display(featured, getElement('.featured-center'));
};
window.addEventListener('DOMContentLoaded', init);
