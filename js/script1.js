let products = JSON.parse(localStorage.getItem('products')) || [];

const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortSelect');
const productList = document.getElementById('product-list');

const getCategories = () => {
    const categories = products.map(p => p.category).filter(Boolean);
    return [...new Set(categories)];
}

const renderCategoryOptions = () => {
    if (!categoryFilter) return;
    const categories = getCategories();
    categoryFilter.innerHTML = `<option value="">All Categories</option>`;
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });
}

const renderProducts = () => {
    let filtered = [...products];

    const searchValue = searchInput?.value.toLowerCase() || '';
    if (searchValue) {
        filtered = filtered.filter(p => (p.productName || '').toLowerCase().includes(searchValue));
    }

    const categoryValue = categoryFilter?.value || '';
    if (categoryValue) {
        filtered = filtered.filter(p => p.category === categoryValue);
    }

    const sortValue = sortSelect?.value || '';
    if (sortValue === 'low-high') {
        filtered.sort((a, b) => Number(a.productPrice) - Number(b.productPrice));
    } else if (sortValue === 'high-low') {
        filtered.sort((a, b) => Number(b.productPrice) - Number(a.productPrice));
    }

    if (!productList) return;
    productList.innerHTML = '';
    const row = document.createElement('div');
    row.className = 'row';

    filtered.forEach((product, index) => {
        const col = document.createElement('div');
        col.className = 'col-md-4';
        col.innerHTML = `
            <div class="card mb-3">
                <img src="${product.productImage}" class="card-img-top" alt="Product Image">
                <div class="card-body">
                    <p class="card-text"><strong>Name:</strong> ${product.productName}</p>
                    <p class="card-text"><strong>Price:</strong> Rs:${product.productPrice}</p>
                    <p class="card-text"><strong>Quantity:</strong>
                        <button class="btn btn-sm btn-secondary ms-1" onclick="decreaseQuantity(${index})">-</button> 
                            <span id="qty-${index}">${product.productQuantity}</span>
                        <button class="btn btn-sm btn-secondary me-1" onclick="increaseQuantity(${index})">+</button>  
                    </p>
                    <p class="card-text"><strong>Category:</strong> ${product.category}</p>
                    <button class="btn btn-danger" onclick="deleteProduct(${index})">Delete</button>
                    <button class="btn btn-warning" onclick="editProduct(${index})">Edit</button>
                </div>
            </div>
        `;
        row.appendChild(col);
    });
    productList.appendChild(row);
}

const increaseQuantity = (index) => {
    products[index].productQuantity = Number(products[index].productQuantity) + 1;
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
}
const decreaseQuantity = (index) => {
    if (products[index].productQuantity > 0) {
        products[index].productQuantity = Number(products[index].productQuantity) - 1;
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    }
}

const deleteProduct = (index) => {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderCategoryOptions();
    renderProducts();
}

const editProduct = (index) => {
    const product = products[index];
    const pname = prompt("Product name:", product.productName) || '';
    const productPrice = prompt("Product price:", product.productPrice) || '0';
    const productQuantity = prompt("Product quantity:", product.productQuantity) || '0';
    const productImage = prompt("Product image URL:", product.productImage) || '';
    const category = prompt("Product category:", product.category) || '';
    products[index] = {
        pname: pname.trim(),
        productPrice: Number(productPrice),
        productQuantity: Number(productQuantity),
        productImage: productImage.trim(),
        category: category.trim()
    };
    localStorage.setItem('products', JSON.stringify(products));
    renderCategoryOptions();
    renderProducts();
}

searchInput?.addEventListener('input', renderProducts);
categoryFilter?.addEventListener('change', renderProducts);
sortSelect?.addEventListener('change', renderProducts);

renderCategoryOptions();
renderProducts();