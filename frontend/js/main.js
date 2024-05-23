// Lấy danh sách danh mục và hiển thị lên trang
const categoriesContainer = document.querySelector("#loadCate");
fetch(`http://localhost:3000/api/categories`)
    .then(response => response.json())
    .then(data => {
        data.forEach(cate => {
            categoriesContainer.innerHTML += `
                <div class="col img-category">
                    <a href="./product_cate.html?categoryId=${cate.id}" class="category-link">
                        <img src="http://localhost:3000/images/${cate.image}" width="90" alt="">
                        <p id="cateName">${cate.name}</p>
                    </a>
                </div>`

        });
    })
const prohot = document.querySelector("#prohot")
fetch('http://localhost:3000/api/products/hot', {
    headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
})
    .then(response => response.json())
    .then(data =>
        data.forEach(product => {
            prohot.innerHTML += `
            <div class="col-md-3 oneProduct">
                <a href="./detail.html?id=${product.id}">
                    <div class="product">
                        <div class="product-heart">
                            <button><i class="fa-regular fa-heart"></i></button>
                        </div>
                        <div class="product-addCart">
                            <button "><i class="fa-solid fa-cart-plus"></i></button>
                        </div>
                        <button">
                            <div class="product-img">
                                <img src="http://localhost:3000/images/${product.img}" alt="">
                            </div>
                            <div class="product-content">
                                <div class="product-category">
                                    MacBook
                                </div>
                                <div class="product-name">
                                    ${product.name}
                                </div>
                                <div class="product-price">
                                    ${product.price_sale.toLocaleString('vi-VN')}đ
                                </div>
                                <div class="product-price-sale">
                                    <del class="pps">${product.price.toLocaleString('vi-VN')}đ</del>
                                </div>
                            </div>
                        </button>
                    </div>
                </a>
            </div>
            `;
        })
    );
const catetext = document.querySelector("#cate-text");
fetch(`http://localhost:3000/api/categories`)
    .then(response => response.json())
    .then(data => {
        data.forEach(cate => {
            catetext.innerHTML += `
                    <a href="./product_cate.html?categoryId=${cate.id}" class="category-link">
                        <span id="cateName">${cate.name}</span>
                    </a>`
        });
    })

//Load san pham theo danh muc
let productsContainer = document.querySelector("#loadCateProduct");
const cateId = window.location.href.split('categoryId=')[1];
fetch(`http://localhost:3000/api/products/categoryid/${cateId}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(product => {
            productsContainer.innerHTML += `
                <div class="col-md-3 oneProduct">
                    <a href="./detail.html?id=${product.id}">
                        <div class="product">
                            <div class="product-heart">
                                <button><i class="fa-regular fa-heart"></i></button>
                            </div>
                            <div class="product-addCart">
                                <button><i class="fa-solid fa-cart-plus"></i></button>
                            </div>
                            <button">
                                <div class="product-img">
                                    <img src="http://localhost:3000/images/${product.img}" alt="">
                                </div>
                                <div class="product-content">
                                    <div class="product-category">
                                        ${product.category}
                                    </div>
                                    <div class="product-name">
                                        ${product.name}
                                    </div>
                                    <div class="product-price">
                                        ${product.price_sale.toLocaleString('vi-VN')}đ
                                    </div>
                                    <div class="product-price-sale">
                                        <del class="pps">${product.price.toLocaleString('vi-VN')}đ</del>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </a>
                </div>`;
        });
    });
//Load san pham ra trang chu limit(4)
const fetchDataAndRender = (url, container) => {
    fetch(url)
        .then(response => response.json())
        .then(data =>
            data.forEach(product => {
                container.innerHTML += `
                <div class="col-md-3 oneProduct">
                    <a href="./detail.html?id=${product.id}">
                        <div class="product">
                            <div class="product-heart">
                                <button><i class="fa-regular fa-heart"></i></button>
                            </div>
                            <div class="product-addCart">
                                <button "><i class="fa-solid fa-cart-plus"></i></button>
                            </div>
                            <button">
                                <div class="product-img">
                                    <img src="http://localhost:3000/images/${product.img}" alt="">
                                </div>
                                <div class="product-content">
                                    <div class="product-category">
                                        MacBook
                                    </div>
                                    <div class="product-name">
                                        ${product.name}
                                    </div>
                                    <div class="product-price">
                                        ${product.price_sale.toLocaleString('vi-VN')}đ
                                    </div>
                                    <div class="product-price-sale">
                                        <del class="pps">${product.price.toLocaleString('vi-VN')}đ</del>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </a>
                </div>
                `;
            })
        );
};

// fetchDataAndRender('http://localhost:3000/api/products/hot', document.querySelector("#prohot"));
fetchDataAndRender('http://localhost:3000/api/products/categoryId/litmit/1', document.querySelector("#macbook"));
fetchDataAndRender('http://localhost:3000/api/products/categoryId/litmit/2', document.querySelector("#laptop"));
fetchDataAndRender('http://localhost:3000/api/products/categoryId/litmit/3', document.querySelector("#chuotgaming"));
fetchDataAndRender('http://localhost:3000/api/products/categoryId/litmit/4', document.querySelector("#banphim"));
