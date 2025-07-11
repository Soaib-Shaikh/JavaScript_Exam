let card = document.querySelector('.card');
let products = JSON.parse(localStorage.getItem('products')) || [];


const addProductToList = () => {
    card.addEventListener(()=>{
        products.push({
            name: document.querySelector('#name').value,
            price: document.querySelector('#price').value,
            quantity: document.querySelector('#quantity').value
        })
        localStorage.setItem('products', JSON.stringify(products));
        console.log(products);
    })
}
addProductToList();