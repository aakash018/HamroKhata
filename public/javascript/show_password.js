function showPassword() {
    const password_field = document.getElementById("password_login");
    if (password_field.type === "password") {
        password_field.type = "text"
    } else {
        password_field.type = "password"
    }
}

function showPassword_new_icon() {
    const new_password = document.getElementById("password");
    const eye = document.querySelector(".circle_new")
    eye.classList.toggle("circle_active")
    if (new_password.type === "password") {
        new_password.type = "text"
    } else {
        new_password.type = "password"
    }
}

function showPassword_confirm_icon() {
    const confirm_password = document.getElementById("confirm_password");
    const eye = document.querySelector(".circle_confirm")
    eye.classList.toggle("circle_active")
    if (confirm_password.type === "password") {
        confirm_password.type = "text"
    } else {
        confirm_password.type = "password"
    }
}

function showPassword_old_icon() {
    const old_password = document.getElementById("old_password");
    const eye = document.querySelector(".circle_old")
    eye.classList.toggle("circle_active")
    if (old_password.type === "password") {
        old_password.type = "text"
    } else {
        old_password.type = "password"
    }
}