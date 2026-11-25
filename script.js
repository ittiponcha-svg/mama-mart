```javascript
const API = "https://script.google.com/macros/s/AKfycbxqLsOBouK_DctfQBsP1eDfCovGlYltWnlm887DppWUtWCKxfvCowxT-gv7BEGqZZE/exec";

let cart = [];

fetch(API)
  .then(response => response.json())
  .then(products => {

    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach(product => {

      productList.innerHTML += `
        <div class="card">
          <img src="${product.image}" alt="${product.name}" onerror="this.style.display='none'">

          <h3>${product.name}</h3>

          <p>${product.description}</p>

          <h4>${product.price} บาท</h4>

          <label>จำนวน</label><br>
          <input type="number" id="${product.sku}" value="1" min="1">

          <br><br>

          <button onclick="addCart('${product.name}', ${product.price}, '${product.sku}')">
            เพิ่มลงตะกร้า
          </button>
        </div>
      `;
    });

  })
  .catch(() => {
    document.getElementById("product-list").innerHTML =
      "<p>ไม่สามารถโหลดข้อมูลสินค้าได้</p>";
  });

function addCart(name, price, sku) {

  const qty = Number(document.getElementById(sku).value);

  cart.push({
    name,
    price,
    qty
  });

  renderCart();
}

function renderCart() {

  const cartDiv = document.getElementById("cart