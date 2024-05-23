const loginForm = document.querySelector('#loginForm');
const registerForm = document.querySelector('#registerForm');
const formLoginResiger = document.querySelector('.form-login_register');

// Lấy giá trị từ các trường input
const full_name = document.getElementById('full_name');
const email = document.getElementById('email');
const user_name = document.getElementById('user_name');
const password = document.getElementById('passwordDki');
const confirmPassword = document.getElementById('confirmPassword');
const vaiTro = document.getElementById("vaiTro");

function validateRegisterForm() {

    // Reset thông báo lỗi
    document.getElementById('fullNameError').innerText = '';
    document.getElementById('emailError').innerText = '';
    document.getElementById('usernameErrorDki').innerText = '';
    document.getElementById('passwordErrorDki').innerText = '';
    document.getElementById('confirmPasswordError').innerText = '';

    let isValid = true;

    // Kiểm tra điều kiện validate và hiển thị thông báo lỗi
    if (full_name.value.trim() === '') {
        document.getElementById('fullNameError').innerText = 'Vui lòng nhập họ và tên.';
        isValid = false;
    }

    if (email.value.trim() === '') {
        document.getElementById('emailError').innerText = 'Vui lòng nhập email.';
        isValid = false;
    }

    if (user_name.value.trim() === '') {
        document.getElementById('usernameErrorDki').innerText = 'Vui lòng nhập tên đăng nhập.';
        isValid = false;
    }

    if (password.value.trim() === '') {
        document.getElementById('passwordErrorDki').innerText = 'Vui lòng nhập mật khẩu.';
        isValid = false;
    }

    if (confirmPassword.value.trim() === '') {
        document.getElementById('confirmPasswordError').innerText = 'Vui lòng nhập lại mật khẩu.';
        isValid = false;
    } else if (password.value.trim() !== confirmPassword.value.trim()) {
        document.getElementById('confirmPasswordError').innerText = 'Mật khẩu không khớp.';
        isValid = false;
    }

    return isValid;
}


// Xử lý sự kiện khi người dùng nhập vào ô input
document.getElementById('full_name').addEventListener('input', function () {
    document.getElementById('fullNameError').innerText = '';
});

document.getElementById('email').addEventListener('input', function () {
    document.getElementById('emailError').innerText = '';
});

document.getElementById('user_name').addEventListener('input', function () {
    document.getElementById('usernameErrorDki').innerText = '';
});

document.getElementById('passwordDki').addEventListener('input', function () {
    document.getElementById('passwordErrorDki').innerText = '';
});

document.getElementById('confirmPassword').addEventListener('input', function () {
    document.getElementById('confirmPasswordError').innerText = '';
});
// Đăng ký tài khoản
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateRegisterForm()) {
        return;
    }
    fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            full_name: full_name.value,
            email: email.value,
            user_name: user_name.value,
            password: password.value,
            vaiTro: vaiTro.value
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw { status: response.status, error: err }; });
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            alert("Đăng ký thành công");

        })
        .catch(error => {
            console.log(error);
            if (error.status === 409) {
                alert("Email đã tồn tại");
            } else {
                alert('Đăng ký thất bại')
            }
        })
    // Xóa các giá trị trên form
    full_name.value = '';
    email.value = '';
    user_name.value = '';
    password.value = '';
    confirmPassword.value = '';
});




//********************************* -------------------  ***************************************/
//********************************* Đăng nhập tài khoản  ***************************************/
//********************************* -------------------  ***************************************/
// Lấy giá trị từ các trường input
const emailLogin = document.getElementById('emailLogin');
const passwordLogin = document.getElementById('passwordLogin');
function validateLoginForm() {


    let isValid = true;

    // Kiểm tra điều kiện validate và hiển thị thông báo lỗi
    if (emailLogin.value.trim() === '') {
        document.getElementById('emailLoginError').innerText = 'Vui lòng nhập email.';
        isValid = false;
    }

    if (passwordLogin.value.trim() === '') {
        document.getElementById('passwordLoginError').innerText = 'Vui lòng nhập mật khẩu đăng nhập.';
        isValid = false;
    }

    return isValid;
}

// Xử lý sự kiện khi người dùng nhập vào ô input
document.getElementById('emailLogin').addEventListener('input', function () {
    document.getElementById('emailLoginError').innerText = '';
});

document.getElementById('passwordLogin').addEventListener('input', function () {
    document.getElementById('passwordLoginError').innerText = '';
});
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validateLoginForm()) {
        return;
    }    

    fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: emailLogin.value,
            password: passwordLogin.value
        })
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            alert('Đăng nhập thành công');
            // Lưu token vào localStorage 
            localStorage.setItem('token', data.token);
            console.log(localStorage.getItem('token'));
            window.location.href = 'index.html';

        })
        .catch(error => {
            console.log(error);
            alert('Đăng nhập thất bại');
        });
        
});

