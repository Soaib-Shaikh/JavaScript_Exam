let products = JSON.parse(localStorage.getItem('products')) || [];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const sortSelect = document.getElementById('sortSelect');
const productList = document.getElementById('product-list');

// Get unique categories
function getCategories() {
    const categories = products.map(p => p.category).filter(Boolean);
    return [...new Set(categories)];
}

// Render category dropdown
function renderCategoryOptions() {
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

// Render all products with search, filter, and sort
function renderProducts() {
    let filtered = [...products];

    // Search by name (across all categories)
    const searchValue = searchInput?.value.toLowerCase() || '';
    if (searchValue) {
        filtered = filtered.filter(p => (p.pname || '').toLowerCase().includes(searchValue));
    }

    // Filter by category
    const categoryValue = categoryFilter?.value || '';
    if (categoryValue) {
        filtered = filtered.filter(p => p.category === categoryValue);
    }

    // Sort by price
    const sortValue = sortSelect?.value || '';
    if (sortValue === 'low-high') {
        filtered.sort((a, b) => Number(a.productPrice) - Number(b.productPrice));
    } else if (sortValue === 'high-low') {
        filtered.sort((a, b) => Number(b.productPrice) - Number(a.productPrice));
    }

    // Render cards
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
                    <p class="card-text"><strong>Price:</strong> $${product.productPrice}</p>
                    <p class="card-text"><strong>Quantity:</strong> 
                        <button class="btn btn-sm btn-secondary me-1" onclick="increaseQuantity(${index})">+</button>
                        <span id="qty-${index}">${product.productQuantity}</span>
                        <button class="btn btn-sm btn-secondary ms-1" onclick="decreaseQuantity(${index})">-</button>
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

// Quantity controls
function increaseQuantity(index) {
    products[index].productQuantity = Number(products[index].productQuantity) + 1;
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
}
function decreaseQuantity(index) {
    if (products[index].productQuantity > 0) {
        products[index].productQuantity = Number(products[index].productQuantity) - 1;
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    }
}

// Delete product
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    renderCategoryOptions();
    renderProducts();
}

// Edit product
function editProduct(index) {
    const product = products[index];
    const pname = prompt("Product name:", product.pname) || '';
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

// Event listeners
searchInput?.addEventListener('input', renderProducts);
categoryFilter?.addEventListener('change', renderProducts);
sortSelect?.addEventListener('change', renderProducts);

// Initial load
renderCategoryOptions();
renderProducts();