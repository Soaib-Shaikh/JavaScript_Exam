let productName = document.getElementById('pname');
let productPrice = document.getElementById('price');
let productQuantity = document.getElementById('qty');
let productImage = document.getElementById('img_url');
let form = document.getElementById('form');

let products = JSON.parse(localStorage.getItem('products')) || [];

const addProduct = () => {
    form.addEventListener('submit',(e)=>{
    e.preventDefault();

    let product = {
        id: Date.now(),
        productname:pname.value,
        productPrice:price.value,
        productQuantity:qty.value,
        productImage:img_url.value
    };

    products.push(product);
    localStorage.setItem('products',JSON.stringify(products))
    form.reset();
    alert('Product Added Successfully');
    
})
}

addProduct();
