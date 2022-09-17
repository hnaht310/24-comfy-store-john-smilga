import { getElement } from '../utils.js';
import display from '../displayProducts.js';

const setupCompanies = (products) => {
  const companiesDOM = getElement('.companies');
  console.log(products);
  //   Using reduce() to get list of unique companies
  //   let companiesList = products.reduce(
  //     (newArr, currProd) => {
  //       const { company: companyName } = currProd;
  //       if (!newArr.includes(companyName)) {
  //         newArr.push(companyName);
  //       }
  //       return newArr;
  //     },
  //     ['all']
  //   );

  // Use Set to get list of unique companies
  let companiesList = [
    'all',
    ...new Set(products.map((product) => product.company)),
  ];
  console.log(companiesList);
  companiesDOM.innerHTML = companiesList
    .map((company) => {
      return `<button class="company-btn">${company}</button>`;
    })
    .join(' ');

  companiesDOM.addEventListener('click', (e) => {
    const clicked = e.target;
    if (clicked.classList.contains('company-btn')) {
      const selectedCompanyName = clicked.textContent;
      //   let selectedCompany = products.filter((product) => {
      //     return product.company === selectedCompanyName;
      //   });
      //   if (selectedCompanyName === 'all') {
      //     display(products, getElement('.products-container'));
      //   } else {
      //     display(selectedCompany, getElement('.products-container'));
      //   }
      let newProducts = [];
      if (selectedCompanyName === 'all') {
        // make a copy of the products array using spread operator
        newProducts = [...products];
      } else {
        newProducts = products.filter((product) => {
          return product.company === selectedCompanyName;
        });
      }
      display(newProducts, getElement('.products-container'));
    }
  });
};

export default setupCompanies;
