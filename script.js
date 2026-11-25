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

            <h3>${product.name}</h3>

            <p>${product.description}</p>

            <h4>${product.price} บาท</h4>

            <p>คงเหลือ ${product.stock} ชิ้น</p>

            <input 
            type="number" 
            id="${product.sku}" 
            value="1" 
            min="1">

            <br><br>

            <button onclick="addCart('${product.name}', ${product.price}, '${product.sku}')">
                เพิ่มลงตะกร้า
            </button>

        </div>
        `;

    });

})
.catch(error => {

    console.log(error);

    document.getElementById("product-list").innerHTML =
    "โหลดข้อมูลไม่สำเร็จ";

});


function addCart(name, price, sku){

    let qty = Number(document.getElementById(sku).value);

    cart.push({
        name:name,
        price:price,
        qty:qty
    });

    showCart();

}


function showCart(){

    let html="";
    let total=0;


    cart.forEach(item=>{

        html += `
        <p>
        ${item.name} x ${item.qty}
        = ${item.price * item.qty} บาท
        </p>
        `;

        total += item.price * item.qty;

    });


    document.getElementById("cart").innerHTML = html;

    document.getElementById("total").innerHTML =
    "รวมทั้งหมด " + total + " บาท";

}