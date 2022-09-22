import { getStorageItem, setStorageItem } from './utils.js';
// let store = [];
let store = getStorageItem('store'); // this will be empty when we first open the home page because there's nothing saved in local storage yet.
// When calling setupStore, the store variable is assigned with an array we get from mapping a list of products anyway
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      fields: { featured, name, price, company, colors, image: img },
    } = product;
    const image = img[0].thumbnails.large.url;
    // const { url: image } = img[0].thumbnails.large;
    // returns an object with only data that we need
    return { id, featured, name, price, company, colors, image };
  });
  setStorageItem('store', store);
};
// console.log(store); // WHEN we do let store = [], this will be an empty array since we haven't called setupStore() yet. BUT if we get data from localStorage, it won't be empty any more (line 13: let store = getStorageItem('store'); )
// console.log('hello);
// The way modules work, once you import module (regardless, named or default), if you have function invocation - for example console.log('hello') - that code will be automatically executed => this is why line 14 will be invoked as soon as we import the store from store.js to app.js
const findProduct = (id) => {
  let product = store.find((product) => product.id === id);
  return product;
};
export { store, setupStore, findProduct };
