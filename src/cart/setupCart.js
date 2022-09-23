// set up cart info whenever a page loads. This module will be imported by every page so we can persist data

// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from '../utils.js';
import { openCart } from './toggleCart.js';
import { findProduct } from '../store.js';
import addToCartDOM from './addToCartDOM.js';

// set items
const cartItemCount = getElement('.cart-item-count');
const cartItemsDOM = getElement('.cart-items');
const cartTotalDOM = getElement('.cart-total');

let cart = getStorageItem('cart'); // pull cart array from local storage
// console.log(cart);

// find() returns the first element that satisfies the provided testing condition
export const addToCart = (id) => {
  // check if item is already in cart.
  let item = cart.find((cartItem) => cartItem.id === id);
  // console.log(item);
  if (!item) {
    // add it to cart
    let foundItem = findProduct(id); // no need to import store and this still works???
    // console.log(foundItem);
    foundItem = { ...foundItem, amount: 1 }; // make a copy of the item then add property amount to it
    cart = [...cart, foundItem]; // add item to cart array
    // console.log(cart);
    // add item to DOM
    addToCartDOM(foundItem);
    // setStorageItem('cart', cart);
  } else {
    // increase quantity in cart
    const amount = increaseAmount(id);
    const items = cartItemsDOM.querySelectorAll('.cart-item-amount');
    items.forEach((item) => {
      if (item.dataset.id === id) {
        item.textContent = amount;
      }
    });
    // a different solution to update increase quantity in cart
    // const items = [...cartItemsDOM.querySelectorAll('.cart-item-amount')];
    // const foundElement = items.find((item) => item.dataset.id === id);
    // foundElement.textContent = amount;
  }
  // add one to item count
  displayCartItemCount();
  // display cart total
  displayCartTotal();
  // set cart in local storage
  setStorageItem('cart', cart);
  // more stuff coming up
  openCart();
};

// base on item's id to update the quantity of an item in the cart array
function increaseAmount(id) {
  // cart.forEach((item, index) => {
  //   if (item.id === id) {
  //     item.amount += 1;
  //   }
  // });
  // {...item, amount: item.amount+1} => make a copy of item object then update/add property amount
  let newAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      newAmount = item.amount + 1;
      return { ...item, amount: newAmount };
    } else {
      return item;
    }
  });
  return newAmount;
}

function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      newAmount = item.amount - 1;
      return { ...item, amount: newAmount };
    }
    return item;
  });
  return newAmount;
}

// remove item from cart array
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
}

function displayCartItemCount() {
  const amount = cart.reduce((total, currItem) => {
    return (total += currItem.amount);
  }, 0);
  cartItemCount.textContent = amount;
}

function displayCartTotal() {
  // total price in cents:
  const total = cart.reduce((total, currItem) => {
    return (total += currItem.price * currItem.amount);
  }, 0);
  cartTotalDOM.textContent = `Total: ${formatPrice(total)}`;
}

function displayCartItemDOM() {
  cart.forEach((item) => addToCartDOM(item));
}
function setupCartFunctionality() {
  cartItemsDOM.addEventListener('click', (e) => {
    const element = e.target;
    // console.log(element);
    const parent = e.target.parentElement;
    // console.log(parent);
    const id = e.target.dataset.id;
    const parentID = parent.dataset.id;
    // console.log(element);
    // remove
    // console.log(cart);
    if (element.classList.contains('cart-item-remove-btn')) {
      removeItem(id);
      // console.log(cart);
      element.closest('.cart-item').remove();
    }
    // increase
    if (parent.classList.contains('cart-item-increase-btn')) {
      // let quantity = parent.nextElementSibling.textContent;
      // parent.nextElementSibling.textContent = +quantity + 1;
      let newAmount = increaseAmount(parentID);
      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parent.classList.contains('cart-item-decrease-btn')) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount < 1) {
        removeItem(parentID); // remove item from cart array
        parent.closest('.cart-item').remove(); // remove item from the cartDOM
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }

      console.log(cart);
    }

    // we'll run these 3 functions regardless of what element is clicked on
    displayCartItemCount();
    displayCartTotal();
    setStorageItem('cart', cart); // update cart in local storage
  });
}

const init = () => {
  // display number of cart items
  displayCartItemCount();
  // display total
  displayCartTotal();
  // add all cart items to the dom
  displayCartItemDOM();
  // set up cart functionality
  setupCartFunctionality();
};

init();
