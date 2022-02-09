// load api 
const loadProducts = () => {
  console.log(document.getElementById("search-input").value)
  const url = document.getElementById("search-input").value
  ? `http://localhost:3000/api/products/byMatch/${document.getElementById("search-input").value}`
  : document.getElementById('category').selectedIndex>0
  ? `http://localhost:3000/api/products/bycategory/${document.getElementById('category').selectedIndex}`
  : `http://localhost:3000/api/products`
    fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts((data)))
}
// clean select and input tags
const selectElement = document.querySelector('.category');
selectElement.addEventListener('change', (event) => {
  loadProducts();
  document.getElementById("search-input").value=''
});
const searchElement = document.querySelector('.search');
searchElement.addEventListener('change', (event) => {
  loadProducts();
  document.getElementById("category").value=999
});
// load producsts in first time
loadProducts();
// list categories by id
const ProductsEnum = Object.freeze({
  1:'Bebida energetica',
  2:'Pisco',
  3:'Ron',
  4:'Bebida',
  5:'Snack',
  6:'Cerveza',
  7:'Vodka'
});
// show all product in UI 
const showProducts = (products) => {
    while(document.getElementById("all-products").firstChild){
      document.getElementById("all-products").removeChild(document.getElementById("all-products").firstChild)
    }
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.url_image;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h3 class="fs-6 my-3">${product.name}</h3>
      <p>Category: ${ProductsEnum[product.category]}</p>
      <p>Discount: -%${product.discount}</p>
      <h2 class="fs-5">Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price},${product.discount})" id="addToCart-btn" class="buy-now border-radius btn btn-dark px-4 text-capitalize">add to cart</button>
      <button onclick="loadDetails('${product.id}')" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="border-radius btn btn-outline-dark px-4 text-capitalize">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};

// count selected product
let count = 0;
const addToCart = (id, price,discount) => {
  count = count + 1;
  updatePrice('price', price);
  updateDiscountAndCharge(discount);
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value).toFixed(2);
};

// update delivery charge and total Tax
const updateDiscountAndCharge = (discount) => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 100) {
    setInnerText("delivery-charge", 30);
    setInnerText("discount", priceConverted*discount/100);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("discount", priceConverted*discount/100);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 70);
    setInnerText("discount", priceConverted*discount/100);
  }
  updateTotal()
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") -
    getInputValue("discount");
  console.log(getInputValue("price").toFixed(2), getInputValue("delivery-charge").toFixed(2), getInputValue("discount").toFixed(2), grandTotal);
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};


// load single details 
const loadDetails = (id) => {
  const url = `http://localhost:3000/api/products/${id}`
  console.log(url)
  fetch(url)
    .then(res => res.json())
    .then(data => modalDetails(data))
}
// display details to modal
const modalDetails = (details) => {
  console.log(details[0]);
  document.getElementById('modal-details').innerHTML = `
    <div>
      <img class="h-25 w-50 mb-3" src= ${details[0].url_image} />
    </div>
    <h5>Product Title: ${details[0].name}</h5>
    <h6>Discount: % ${details[0].discount}</h6>
    <h6>Price: $ ${details[0].price}</h6>
  `;
  
}