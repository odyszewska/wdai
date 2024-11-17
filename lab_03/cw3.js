const dataTable = document.getElementById('dataTable');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const sortSelect = document.getElementById('sort');
  
let products = [];
async function fetchData() {
    const response = await fetch('https://dummyjson.com/products');
    const data = await response.json();
    products = data.products.slice(0, 30);
    renderTable(products);
}
  
function renderTable(data) {
  dataTable.innerHTML = data
    .map(
      (product) => `
      <tr>
        <td><img src="${product.thumbnail}" alt="${product.title}"></td>
        <td>${product.title}</td>
        <td>${product.description}</td>
      </tr>`
    )
    .join('');
}
  
searchButton.addEventListener('click',filter)

function filter(){
    const phrase = searchInput.value.toLowerCase().trim();
    let filteredProducts;
  
    if (phrase === '') {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter(
        (product) =>
          product.title.toLowerCase().includes(phrase)
      );
    }
    sortAndRender(filteredProducts); 
  };

  


sortSelect.addEventListener('change', () => {
    if (searchInput != ''){filter();}
    else {sortAndRender([...products]);}
});
function sortAndRender(data) {
    const sortOption = sortSelect.value;
  
    if (sortOption === 'asc') {
      data.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'desc') {
      data.sort((a, b) => b.title.localeCompare(a.title));
    }
    renderTable(data);
  }

fetchData();
  