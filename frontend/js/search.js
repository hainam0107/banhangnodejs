const formSearch = document.querySelector("#formSearch");
const loadSearchProduct = document.querySelector("#loadSearchProduct");

formSearch.addEventListener("submit", (event) => {
    event.preventDefault();
    const keyword = formSearch.querySelector("input").value;
    try {
        window.location.href = `product_search.html?search=${encodeURIComponent(keyword)}`;
    } catch (error) {
        console.error("Đã xảy ra lỗi:", error);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    
    const urlParams = new URLSearchParams(window.location.search);
    const keyword = urlParams.get("search");
    if (keyword) {
        fetch(`http://localhost:3000/api/products/search/${encodeURIComponent(keyword)}`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    document.querySelector(".keySerach").innerHTML =`<p class="fs-4">Có <strong> ${data.length}</strong>  kết quả tìm kiếm theo từ khóa "<strong>${keyword}</strong>" </p>`
                    data.forEach(product => {
                        loadSearchProduct.innerHTML += `
                        <div class="col-md-3 oneProduct">
                            <a href="./detail.html?id=${product.id}">
                                <div class="product">
                                    <div class="product-heart">
                                        <button><i class="fa-regular fa-heart"></i></button>
                                    </div>
                                    <div class="product-addCart">
                                        <button><i class="fa-solid fa-cart-plus"></i></button>
                                    </div>
                                    <button>
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
                } else {
                    console.log("Không thấy sản phẩm");
                }
            })
            .catch(error => {
                console.error("Đã xảy ra lỗi khi tải sản phẩm:", error);
            });
    }
});

// // Hàm sắp xếp sản phẩm theo giá giảm dần
// function sortProductsDescending(products) {
//     return products.sort((a, b) => b.price_sale - a.price_sale);
// }

// // Xử lý sự kiện khi nhấp vào nút "Giá giảm dần"
// document.getElementById("sortDescendingButton").addEventListener("click", () => {
//     // Lấy danh sách các sản phẩm hiện có
//     const products = Array.from(document.querySelectorAll('.oneProduct'));

//     // Chuyển danh sách các sản phẩm thành mảng các đối tượng sản phẩm
//     const productList = products.map(product => ({
//         id: product.querySelector('a').getAttribute('href').split('=')[1],
//         price_sale: parseInt(product.querySelector('.product-price').innerText.replace('đ', '').replace('.', ''), 10)
//     }));

//     // Sắp xếp sản phẩm theo giá giảm dần
//     const sortedProducts = sortProductsDescending(productList);

//     // Cập nhật nội dung của phần hiển thị sản phẩm sau khi đã sắp xếp
//     loadSearchProduct.innerHTML = "";
//     sortedProducts.forEach(product => {
//         const productElement = products.find(item => item.querySelector('a').getAttribute('href').includes(product.id));
//         loadSearchProduct.appendChild(productElement);
//     });
// });