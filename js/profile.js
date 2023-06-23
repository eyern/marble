import UserData, {InvalidPassword, InvalidEmail, InvalidPhoneNumber, WrongPassword} from "./UserData.js";

// All inputs
let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let newPassword = document.getElementById("new-password");
let phoneNumber = document.getElementById("phone-number");
let address = document.getElementById("address");
let birthday = document.getElementById("birthday");
let gender = document.getElementById("gender");

// All error messages
let nameError = document.getElementById("name-validation");
let emailError = document.getElementById("email-validation");
let passwordError = document.getElementById("password-validation");
let phoneNumberError = document.getElementById("phone-number-validation");
let addressError = document.getElementById("address-validation");
let birthdayError = document.getElementById("birthday-validation");

// All buttons
let editButton = document.getElementById("form__edit-button");
let saveButton = document.getElementById("form__save-button");
let cancelButton = document.getElementById("form__cancel-button");

// Get the user data from the session storage.
let userData = sessionStorage.getItem("UserData");

// Display the user's data.
(function displayData(data) {
    if (data === null) {
        return;
    }
    userData = UserData.setObject(JSON.parse(data));
    showData();
})(userData);

editButton.addEventListener("click", editUserData);
cancelButton.addEventListener("click", cancelChanges);
saveButton.addEventListener("click", saveChanges);

// Edit the user data
function editUserData() {
    if (userData === null) {
        alert("Please sign in first.");
        return;
    }

    editButton.disabled  = true;
    saveButton.style.visibility = "visible";
    cancelButton.style.visibility = "visible";
    disableInputs(false);

    showData();
}

// Cancel all the changes
function cancelChanges() {
    cancelButton.style.visibility = "hidden";
    saveButton.style.visibility = "hidden";

    editButton.disabled = false;
    showData();
    password.value = "";
    newPassword.value = "";
    disableInputs(true);
    hideErrorMessages();
}

// Hide all error messages
function hideErrorMessages() {
    nameError.style.display = "none";
    emailError.style.display = "none";
    passwordError.style.display = "none";
    phoneNumberError.style.display = "none";
    addressError.style.display = "none";
    birthdayError.style.display = "none";
}

// Save all changes
function saveChanges() {
    let tempUser = UserData.getCopy(userData);

    if (name.value === "") {
        nameError.style.display = "block";
        return;
    } else {
        nameError.style.display = "none";
        tempUser.setName(name.value);
    }

    try {
        tempUser.setEmail(email.value);
        emailError.style.display = "none";
    } catch (error) {
        emailError.style.display = "block";
        return;
    }

    if (password.value !== "") {
        try {
            tempUser.changePassword(password.value, newPassword);
        } catch (error) {
            passwordError.textContent = error.message;
            passwordError.style.display = "block";
            return;
        }
    }

    try {
        tempUser.setPhoneNumber(phoneNumber.value);
        phoneNumberError.style.display = "none";
    } catch (error) {
        phoneNumberError.style.display = "block";
        return;
    }

    if (address.value === "") {
        addressError.style.display = "block";
        return;
    } else {
        addressError.style.display = "none";
        tempUser.setAddress(address.value);
    }

    if (Date.parse(birthday.value) > Date.now()) {
        birthdayError.style.display = "block";
        return;
    } else {
        birthdayError.style.display = "none";
        tempUser.setBirthday(Date.parse(birthday.value));
    }

    tempUser.setGender(gender.value);

    userData = tempUser;
    sessionStorage.setItem("UserData", JSON.stringify(userData.getObject()));

    editButton.disabled  = false;
    saveButton.style.visibility = "hidden";
    cancelButton.style.visibility = "hidden";
    disableInputs(true);

    showData();
}

// Show data in all the input fields
function showData() {
    name.value = userData.getName();
    email.value = userData.getEmail();
    phoneNumber.value = userData.getPhoneNumber();
    address.value = userData.getAddress();
    gender.value = userData.getGender();

    let date = new Date(userData.getBirthday());

    let day = (date.getDate() < 10 ? "0" : "") + date.getDate();
    let month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    let year = date.getFullYear();

    birthday.value = `${year}-${month}-${day}`;
}

// Change all inputs availability
function disableInputs(disabled) {
    name.disabled = disabled;
    email.disabled = disabled;
    password.disabled = disabled;
    newPassword.disabled = disabled;
    phoneNumber.disabled = disabled;
    address.disabled = disabled;
    birthday.disabled = disabled;
    gender.disabled = disabled;
}
