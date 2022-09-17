// global imports
import '../toggleSidebar.js';
import '../cart/toggleCart.js';
import '../cart/setupCart.js';

//  filter imports
import setupSearch from '../filters/search.js';
import setupCompanies from '../filters/companies.js';
import setupPrice from '../filters/price.js';

// specific imports
import { store } from '../store.js';
import display from '../displayProducts.js';
import { getElement } from '../utils.js';

// const loading = getElement('.page-loading');

// // get list of products from local storage => when we import store variable, we can get the product list right away
// // display all products
// display(store, getElement('.products-container'));
// // search functionality
// setupSearch(store);
// // hide loading div once we have our data and filters
// loading.style.display = 'none';

const loading = getElement('.page-loading');

// get product list from localStorage -> the data is automatically pulled as soon as we import store variable from store.js
// so now we just need to display them
display(store, getElement('.products-container'));
setupSearch(store);
setupCompanies(store);
setupPrice(store);
// hide the loading div after the display() and setupSearch() are invoked
loading.style.display = 'none';
