import UserData from "./UserData.js";

if( window.location.href.indexOf('/signUp.html') !== -1  && sessionStorage.getItem("UserData") !== null ){
    window.location.href ="./index.html";
}
let validateName = document.getElementById("validate-name");
let validateMail = document.getElementById("validate-email");
let validatePasword = document.getElementById("validate-password");
let validateRepeatPassword = document.getElementById("validate-repeat-password");

let nameInput = document.getElementById("name_input");
let emailInput = document.getElementById("email_input");
let passwordInput = document.getElementById("password_input");
let passwordRepeatInput = document.getElementById("password-repeat-input");

function createUser() {
    try {
        let user = new UserData(nameInput.value,emailInput.value, passwordInput.value);

        validateName.innerHTML = validateMail.innerHTML = validatePasword.innerHTML = "";

        if (passwordInput.value != passwordRepeatInput.value) {
            validateRepeatPassword.innerHTML = "Password must be same";
            validateRepeatPassword.style.color = "red";
        } else {
            validateRepeatPassword.innerHTML = "";

            if (localStorage.getItem("UserData") === null) { //Handle adding first user (No local storage set before)
                localStorage.setItem("UserData", '[]');
            }

            // get old user data
            let oldUsers = localStorage.getItem("UserData");
            oldUsers = JSON.parse(oldUsers);

            if (!checkFoundedEmail(oldUsers, emailInput.value)) {
                oldUsers.push(user.getObject());
                let newUsers = JSON.stringify(oldUsers);
                localStorage.setItem("UserData", newUsers);
                document.querySelector('#signUp-form').reset();
            }
            else {
                validateMail.innerHTML = `This email (${emailInput.value}) is founded in our system`;
                validateMail.style.color = "red";
            }
        }
    } catch (error) {
        validateName.innerHTML = validateMail.innerHTML = validatePasword.innerHTML = "";
        if (error.message === "Invalid name , name mustn't be empty.") {
            validateName.innerHTML = error.message;
            validateName.style.color = "red";
        }
        else if (error.message === "Invalid email") {
            validateMail.innerHTML = error.message;
            validateMail.style.color = "red";
        }
        else if (error.message === "Invalid password, password must be 8 characters or more.") {
            validatePasword.innerHTML = error.message;
            validatePasword.style.color = "red";
        }
    }
}
document.getElementById("signup-btn").addEventListener("click", function () {
    createUser();
});

function checkFoundedEmail(oldUsers, newEmail) {
    for (let index = 0; index < oldUsers.length; index++) {
        if (oldUsers[index].email == newEmail)
            return true
    }
    return false;
}
