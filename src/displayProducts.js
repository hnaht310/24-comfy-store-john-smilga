import { formatPrice } from './utils.js';
import { addToCart } from './cart/setupCart.js';
const display = (productsList, element) => {
  element.innerHTML = productsList
    .map((product) => {
      const { id, name, price, image } = product;
      return ` <article class='product'>
                <div class='product-container'>
                    <img src=${image} alt=${name} class='product-img img' />
                    <div class='product-icons'>
                        <a href='product.html?id=${id}' class='product-icon'>
                        <i class='fas fa-search'></i>
                        </a>
                        <button class='product-cart-btn product-icon' data-id=${id}>
                        <i class='fas fa-shopping-cart'></i>
                        </button>
                    </div>
                </div>
                <footer>
                <p class='product-name'>${product.name}</p>
                <h4 class='product-price'>$${formatPrice(product.price)}</h4>
                </footer>
            </article>`;
    })
    .join('');
};

export default display;