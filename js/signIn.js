import UserData from "./UserData.js";

// Redirect To home page if user is logged in
if (window.location.href.indexOf('/logIn.html') !== -1 && sessionStorage.getItem("UserData") !== null) {
    window.location.href = "./index.html";
}

let validate_email = document.getElementById("validate_email");
let validate_password = document.getElementById("validate_password");

let email_input = document.getElementById("email_input");
let password_input = document.getElementById("password_input");

function validateLogin() {
    //Valid Email Function   
    if (!/\S+@\S+\.\S+/.test(email_input.value)) {
        validate_email.innerHTML = "Please Enter Valid Email.";
        validate_email.style.color = "red";
    } else {
        validate_email.innerHTML = "";
    }

    if (password_input.value.length < 8) {
        validate_password.innerHTML = "Password must be 8 chars at least.";
        validate_password.style.color = "red";
    } else {
        validate_password.innerHTML = "";
    }

    if (validate_email.innerHTML == "" && validate_password.innerHTML == "") {

        // get old user data
        let oldUsers = localStorage.getItem("UserData");

        // Check if no users in local storage
        if (oldUsers === null) {
            alert("This acccount isn't founded")
        }
        else {
            oldUsers = JSON.parse(oldUsers);

            let LoggedUser = checkUserAccount(oldUsers, email_input.value, password_input.value);

            if (LoggedUser) {
                window.location.href = "./index.html"

                LoggedUser = JSON.stringify(LoggedUser);
                sessionStorage.setItem("UserData", LoggedUser);

                document.querySelector('#login-form').reset();
            } else {
                validate_password.innerHTML = "incorrect email or password :(";
                validate_password.style.color = "red";
            }
        }

    }
}

document.getElementById("loginbtn").addEventListener("click", validateLogin);

function checkUserAccount(oldUsers, userEmail, userPassword) {
    for (let index = 0; index < oldUsers.length; index++) {
        if (oldUsers[index].email == userEmail && oldUsers[index].password == userPassword)
            return oldUsers[index]
    }
    return false;
}
