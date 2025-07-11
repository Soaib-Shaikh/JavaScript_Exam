let productName = document.getElementById('pname');
let productPrice = document.getElementById('price');
let productQuantity = document.getElementById('qty');
let productImage = document.getElementById('img_url');
let form = document.getElementById('form');

let products = JSON.parse(localStorage.getItem('products')) || [];

    form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let product = {
        id: Date.now(),
        productName:productName.value.trim(),
        productPrice:productPrice.value.trim(),
        productQuantity:productQuantity.value.trim(),
        productImage:productImage.value.trim(),
    };

    products.push(product);
    localStorage.setItem('products',JSON.stringify(products))
    form.reset();
    alert('Product Added Successfully');
})


