//Show trang chi tiet san pham
const chitietsanpham = document.querySelector("#chitietsanpham")
const id = window.location.href.split('id=')[1];
fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(product => {
        console.log("product",product)
        chitietsanpham.innerHTML += `
        <div class="row">
            <div class="col-md-5">
                <div class="row">
                    <div class="img-details">
                        <img src="http://localhost:3000/images/${product.img}" class="mainImg" width="450px" alt="">
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <div class="img-slider">
                            <img src="http://localhost:3000/images/${product.img}" onclick = "changeImg(this.src)" width="55" alt="">
                        </div>
                    </div>
                    <div class="col">
                        <div class="img-slider">
                            <img src="http://localhost:3000/images/${product.image_2}" onclick = "changeImg(this.src)" width="55" alt="">
                        </div>
                    </div>
                    <div class="col">
                        <div class="img-slider">
                            <img src="http://localhost:3000/images/${product.image_3}" onclick = "changeImg(this.src)"  width="55" alt="">
                        </div>
                    </div>
                    <div class="col">
                        <div class="img-slider">
                            <img src="http://localhost:3000/images/${product.image_4}" onclick = "changeImg(this.src)"  width="55" alt="">
                        </div>
                    </div>
                    <div class="col">
                        <div class="img-slider">
                            <img src="http://localhost:3000/images/${product.image_5}" onclick = "changeImg(this.src)"  width="55" alt="">
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    - CPU: Apple M1 <br>
                    - Màn hình: 13.3" (2560 x 1600) Retina <br>
                    - RAM: 8GB / 256GB SSD <br>
                    - Hệ điều hành: macOS <br>
                    - Pin: 50 Wh <br>
                </div>
            </div>
            <div class="col-md-1"></div>
            <div class="col-md-6 information">
                <div class="row information_name">${product.name}</div>
                <div class="row information_brand">Thương hiệu MACBOOK | SKU: 230502463 | Mã vạch: 159194
                </div>
                <div class="row information_sale fw-bold">${product.price_sale.toLocaleString('vi-VN')}đ</div>
                <div class="row align-items-center">
                    <div class="col-2 p-0 fw-bold"><del class="information_price">${((product.price) * 1).toLocaleString('vi-VN')}đ</del></div>
                </div>
                <div class="row mt-5">
                    <div class="col-md-6 p-0 ">
                        <button class="btn btn-primary" onclick="buyNow()">MUA NGAY</button>
                    </div>
                    <div class="col-md-6">
                        <button class="btn btn-outline-primary">THÊM VÀO GIỎ HÀNG</button>
                    </div>
                </div>
            </div>
        </div>
        `;
    });