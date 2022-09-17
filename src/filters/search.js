import { getElement } from '../utils.js';
import display from '../displayProducts.js';
// const setupSearch = (store) => {
//   const form = getElement('.input-form');
//   const nameInput = getElement('.search-input');
//   form.addEventListener('keyup', (e) => {
//     e.preventDefault();
//     const value = nameInput.value;
//     console.log(value);
//     if (value) {
//       const newStore = store.filter((product) => {
//         let { name } = product;
//         name = name.toLowerCase();
//         if (name.startsWith(value)) {
//           return product;
//         }
//       });
//       //   console.log(newStore);
//       if (newStore.length > 0) {
//         display(newStore, getElement('.products-container'));
//       } else {
//         getElement(
//           '.products-container'
//         ).innerHTML = `<h3 class="filter-error">Sorry, no products matched your search</h3>`;
//       }
//     } else {
//       display(store, getElement('.products-container'));
//     }
//   });
// };

const setupSearch = (productsList) => {
  const form = getElement('.input-form');
  const productsContainer = getElement('.products-container');
  const userInput = getElement('.search-input');
  form.addEventListener('keyup', (e) => {
    // e.preventDefault();
    console.log(e.target);
    // console.log(e.key);
    const value = userInput.value;
    console.log(value);
    if (value) {
      let resultList = productsList.filter((product) => {
        const { name } = product;
        return name.toLowerCase().includes(value.toLowerCase()) === true;
      });
      resultList.length > 0
        ? display(resultList, productsContainer)
        : (productsContainer.innerHTML =
            '<h3 class="filter-error">Sorry, no products matched your search</h3>');
    } else {
      display(productsList, productsContainer);
    }
  });
};

export default setupSearch;
