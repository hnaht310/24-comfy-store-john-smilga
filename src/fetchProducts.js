import { allProductsUrl } from './utils.js';

const fetchProducts = async () => {
  try {
    const response = await fetch(allProductsUrl);
    if (!response.ok) {
      throw new Error(`There was an error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
  //  -------------- John's approach
  // const response = await fetch(allProductsUrl).catch((err) => console.log(err));
  // if (response) {
  //   return response.json();
  // }
  // return response;
};

export default fetchProducts;
