///////////////////////////////////// START Handling admin classes /////////////////////////////////////
class Product {
    constructor(id, name, image, brand, describtion, categoryId, piecesInStock, price, rate, reviews, discount = 0) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.brand = brand;
        this.describtion = describtion;
        this.categoryId = categoryId;
        this.piecesInStock = piecesInStock;
        this.price = price;
        this.rate = rate;
        this.review = reviews;
        this.discount = discount;
    }
}

class Category {
    constructor(id, name, image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}

class Notification {
    constructor(id, notificationText) {
        this.id = id;
        this.readStatus = false;
        this.notificationText = notificationText;
        this.date = getCurrentFormatedDate();
    }
}
export default  class Message {
    constructor(id, mailFrom, message) {
        this.id = id;
        this.readStatus = false;
        this.mailFrom = mailFrom;
        this.message = message;
        this.date = getCurrentFormatedDate();
    }
}
///////////////////////////////////// End Handling admin classes /////////////////////////////////////

let adminAccount;

///////////////////////////////////// START Handling the first time for admin /////////////////////////////////////

// if First Time for admin
if (localStorage.getItem('adminAccount') === null) {
    let adminAccountObject = {
        email: "admin@gmail.com",
        password: "0"
    }

    let jsonAdminAcount = JSON.stringify(adminAccountObject);
    localStorage.setItem('adminAccount', jsonAdminAcount);

    localStorage.setItem('adminLogin', false);
    localStorage.setItem('categories', '[]');
    localStorage.setItem('categoryID', 1);
    localStorage.setItem('products', '[]');
    localStorage.setItem('productID', 1);
    localStorage.setItem('notifications', '[]');
    localStorage.setItem('notificationID', 1);

    if(localStorage.getItem('messages') === null) //Check if first time to set messages
	{
		localStorage.setItem('messages','[]');
		localStorage.setItem('messageID', 1);
	}

    adminAccount = adminAccountObject;
}
else {
    adminAccount = JSON.parse(localStorage.getItem('adminAccount'));
}

// Redirect to login page if admin doesn't log in
if (localStorage.getItem('adminLogin') == 'false' && window.location.href.indexOf("/admin-login.html") === -1) {
    window.location.href = '/admin-login.html';
}

// Redirect to home page if admin logged in
if (localStorage.getItem('adminLogin') == 'true' && window.location.href.indexOf("/admin-login.html") !== -1) {
    window.location.href = '/admin-dashboard.html';
}
///////////////////////////////////// END Handling the first time for admin /////////////////////////////////////



///////////////////////////////////// START Handling admin's session (Login/Logout) /////////////////////////////////////

/* Admin Login */
let adminLoginBtn = document.querySelector('#login-btn');
if (adminLoginBtn) {
    let errorResetMessage = "Incorrect email or password",
        successResetMessage = "All is well :)";

    adminLoginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let previousErrorMessage = adminLoginBtn.parentElement.parentElement.querySelector('.alert-danger');
        let previousSuccessMessage = adminLoginBtn.parentElement.parentElement.querySelector('.alert-success');
        // Remove previous error mesage
        if (previousErrorMessage)
            previousErrorMessage.remove();

        if (previousSuccessMessage)
            previousSuccessMessage.remove();

        let message_div = document.createElement('div');

        let adminEmail = document.querySelector('#admin-email').value;
        let adminPassword = document.querySelector('#admin-password').value;
        console.log();
        if (localStorage.getItem('adminLogin') === 'true') {
            message_div.appendChild(document.createTextNode('You already logged in :)'));
            message_div.classList.add('alert-success');
            setTimeout(function () { message_div.remove(); window.location.href = '/admin-dashboard.html'; }, 1000);
        }
        else if (adminAccount.email === adminEmail && adminAccount.password === adminPassword) {
            localStorage.setItem('adminLogin', true);
            message_div.appendChild(document.createTextNode(successResetMessage));
            message_div.classList.add('alert-success');
            setTimeout(function () { message_div.remove(); window.location.href = '/admin-dashboard.html'; }, 1000);
        }
        else {
            message_div.appendChild(document.createTextNode(errorResetMessage));
            message_div.classList.add('alert-danger');
            setTimeout(function () { message_div.remove(); }, 4000);
        }
        adminLoginBtn.parentElement.parentElement.appendChild(message_div);
    })
}

/* Admin Logout */
let adminLogoutBtn = document.querySelector('.logout_btn');
if (adminLogoutBtn) {
    adminLogoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.setItem('adminLogin', false);
        window.location.href = '/admin-login.html';
    })
}
///////////////////////////////////// END Handling admin's session (Login/Logout) /////////////////////////////////////



///////////////////////////////////// START Handling admin reset password /////////////////////////////////////

/* Admin reset password */
let adminResetPasswordInput = document.querySelector('#admin-reset-password');
let adminResetPassword = document.querySelector('#admin-password-form .btn-primary');
if (adminResetPassword) {
    let errorResetMessage = "sorry your new password must be greater than 8 :(",
        successResetMessage = "All is well :)";

    adminResetPassword.addEventListener('click', (e) => {
        e.preventDefault();
        let previousErrorMessage = adminResetPasswordInput.parentElement.parentElement.querySelector('.alert-danger');
        let previousSuccessMessage = adminResetPasswordInput.parentElement.parentElement.querySelector('.alert-success');
        // Remove previous error mesage
        if (previousErrorMessage)
            previousErrorMessage.remove();

        if (previousSuccessMessage)
            previousSuccessMessage.remove();

        let message_div = document.createElement('div');

        if (adminResetPasswordInput.value.length < 8) {
            message_div.appendChild(document.createTextNode(errorResetMessage));
            message_div.classList.add('alert-danger');
            setTimeout(function () { message_div.remove(); }, 4000);
        }
        else {
            message_div.appendChild(document.createTextNode(successResetMessage));
            message_div.classList.add('alert-success');
            setTimeout(function () { message_div.remove(); }, 2000);
            changeAdminPassword(adminResetPasswordInput.value);
            localStorage.setItem('adminLogin', false);
            window.location.href = '/admin-login.html';
        }
        adminResetPasswordInput.parentElement.parentElement.appendChild(message_div);
    })
}

function changeAdminPassword(newPassword) {
    let adminAccountObject = {
        email: "admin@gmail.com",
        password: newPassword
    }
    let jsonAdminAcount = JSON.stringify(adminAccountObject);
    localStorage.setItem('adminAccount', jsonAdminAcount);
    adminAccount = adminAccountObject;
    console.log(adminAccount);

    // Add Notification

}
///////////////////////////////////// END Handling admin reset password /////////////////////////////////////



///////////////////////////////////// START Handling admin sidebar /////////////////////////////////////

// Hanle Click on category To show sub category in Admin Dashboard (sidebar)
let categoryListContainer = document.querySelector('#category-list-container');
if (categoryListContainer) {
    categoryListContainer.addEventListener('click', _ => {
        let categoryList = document.querySelector('#category-list');
        categoryList.classList.toggle('hide');

        // Change Arrow status
        let categoryListArrow = categoryListContainer.querySelector('span > i');
        if (categoryListArrow.classList.contains('fa-angle-right'))
            categoryListArrow.classList.replace('fa-angle-right', 'fa-angle-down');
        else if (categoryListArrow.classList.contains('fa-angle-down'))
            categoryListArrow.classList.replace('fa-angle-down', 'fa-angle-right');

    });
}

// Hanle Click on product To show sub product in Admin Dashboard (sidebar)
let productListContainer = document.querySelector('#product-list-container');
if (productListContainer) {
    productListContainer.addEventListener('click', _ => {
        let productList = document.querySelector('#product-list');
        productList.classList.toggle('hide');

        // Change Arrow status
        let productListArrow = productListContainer.querySelector('span > i');
        if (productListArrow.classList.contains('fa-angle-right'))
            productListArrow.classList.replace('fa-angle-right', 'fa-angle-down');
        else if (productListArrow.classList.contains('fa-angle-down'))
            productListArrow.classList.replace('fa-angle-down', 'fa-angle-right');
    });
}
///////////////////////////////////// END Handling admin sidebar /////////////////////////////////////


///////////////////////////////////// START Handling admin category /////////////////////////////////////

// Add Category
let addCategorybtn = document.querySelector('#admin-add-category .btn');
if (addCategorybtn) {
    addCategorybtn.addEventListener('click', addCategory);
}

// Search in category 
function findCategory(categoryName, oldCategories, id = 0) {
    for (let index = 0; index < oldCategories.length; index++) {
        if (oldCategories[index].name === categoryName && oldCategories[index].id != id) {
            return true;
        }
    }
    return false;
}


function addCategoryToDB(categoryName, CategoryImage, e) {
    let oldCategories = localStorage.getItem('categories');
    oldCategories = JSON.parse(oldCategories);

    // Check if new category founded
    let founded = findCategory(categoryName, oldCategories);
    if (founded) {
        responseMessage(`New Category "${categoryName}" didn\'t add as it is recorded in system before :(`, 'error', e.path[1]);

        // Add Notification
        addNotificationToDB(`Try to add "${categoryName}" but it is founded in system`);
        return;
    }
    else {
        let currentId = localStorage.getItem('categoryID');
        currentId = JSON.parse(currentId);

        let newCategory = new Category(currentId++, categoryName, CategoryImage);

        localStorage.setItem('categoryID', currentId);

        oldCategories.push(newCategory);

        oldCategories = JSON.stringify(oldCategories);
        localStorage.setItem('categories', oldCategories);


        // Add Notification
        addNotificationToDB(`Add New Category "${categoryName}"`);

        responseMessage(`New Category "${categoryName}" added :)`, 'success', e.path[1]);

        e.path[1].reset();
    }
}

// Add category
function addCategory(e) {
    e.preventDefault();
    var categoryName = document.querySelector('#add-category-name');
    var uploadImageFile = document.querySelector('#upload-image-file');
    var errorMsg = "";
    var uploadImageFileName = uploadImageFile.value.substr(uploadImageFile.value.lastIndexOf('\\') + 1);

    if (categoryName.value.length < 3) { // Validate name
        errorMsg += `* New Category "${categoryName.value}" didn\'t add because its length less than 3 characters :(`;
    }
    let _validFileExtensions = [".jpg", ".jpeg", ".png"];
    if (uploadImageFile.type == 'file') {//Validate Image
        let extensionValid = false;
        if (uploadImageFile.value.length > 0) {
            for (let j = 0; j < _validFileExtensions.length; j++) {
                if (uploadImageFile.value.substr(uploadImageFile.value.length - _validFileExtensions[j].length, _validFileExtensions[j].length).toLowerCase() == _validFileExtensions[j].toLowerCase()) {
                    extensionValid = true;
                    break;
                }
            }

            if (!extensionValid) {
                if (errorMsg)
                    errorMsg += '<br><br>';
                errorMsg += "* Sorry, \"" + uploadImageFileName + "\" is invalid, allowed extensions are: " + _validFileExtensions.join(", ");
            }
        }
        else {
            if (errorMsg)
                errorMsg += '<br><br>';
            errorMsg += '* Please select an image';
        }
    }
    if (errorMsg)
        responseMessage(errorMsg, 'error', e.path[1]);
    else
        addCategoryToDB(categoryName.value, uploadImageFileName, e);
}

// Delete Category
if (window.location.href.indexOf('/admin-delete-category.html') !== -1) {

    // Remove Category Frm DB
    function removeCategoryFromDB(id) {
        let oldCategories = localStorage.getItem('categories');
        oldCategories = JSON.parse(oldCategories);

        oldCategories.forEach((element, index) => {
            if (element.id == id) {
                oldCategories.splice(index, 1);

                // Add Notification 
                addNotificationToDB(`Delete Category "${element.name}" from system`);
            }
        });

        oldCategories = JSON.stringify(oldCategories);
        localStorage.setItem('categories', oldCategories);

    }

    // Remove category
    (function removeCategory() {
        showCategories('delete');

        let deleteBtn = document.querySelector('button.btn-danger');
        let selectedCategory = document.querySelector('#delete-category-select');
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (document.querySelector('#delete-category-select').value == 'Choose a category') {
                alert('select the category');
                return;
            }
            let categoryId = selectedCategory.options[selectedCategory.selectedIndex];

            removeCategoryFromDB(categoryId.getAttribute('data-id'));

            categoryId.remove();
        });
    }());

}

// Edit category
if (window.location.href.indexOf('/admin-edit-category.html') !== -1) {

    function createCategoryEditForm(categoryId) {

        let oldCategories = localStorage.getItem('categories');
        oldCategories = JSON.parse(oldCategories);

        let form = document.createElement('form');
        form.setAttribute('id', 'admin-update-category');

        let formGroup = document.createElement('div');
        formGroup.classList.add('form-group');

        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'update-category-name');
        input.setAttribute('id', 'update-category-name');
        input.setAttribute('placeholder', 'Update Category Name');

        formGroup.appendChild(input);

        form.appendChild(formGroup);

        let previewContainer = document.createElement('div');
        previewContainer.classList.add('preview-container');

        let jsImagePreview = document.createElement('div');
        jsImagePreview.classList.add('js--image-preview');
        jsImagePreview.innerHTML = `<i class="far fa-image"></i>`;

        previewContainer.appendChild(jsImagePreview);

        let uploadOptions = document.createElement('div');
        uploadOptions.classList.add('upload-options');

        let label = document.createElement('label');

        let imageFile = document.createElement('input');
        imageFile.setAttribute('type', 'file');
        imageFile.setAttribute('accept', 'image/*');
        imageFile.classList.add('image-upload');

        label.appendChild(imageFile);
        label.innerHTML += `<i class="fas fa-plus"></i>`;

        uploadOptions.appendChild(label);

        previewContainer.appendChild(uploadOptions);
        form.appendChild(previewContainer);

        input = document.createElement('button');
        input.classList.add('btn', 'btn-warning');
        input.style.color = 'var(--primary-text-color)';
        input.innerHTML = 'Update Category';
        input.setAttribute('data-updatedId', categoryId);

        input.addEventListener('click', (e) => {
            e.preventDefault();
            checkUpdateCategory(e);
        });

        form.appendChild(input);

        return form;
    }

    (function editCategory() {
        showCategories('edit');
        let deleteBtn = document.querySelector('button.btn-warning');
        let selectedCategory = document.querySelector('#edit-category-select');
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let categoryId = selectedCategory.options[selectedCategory.selectedIndex];
            if (document.querySelector('#edit-category-select').value == 'Choose a category') {
                alert('select the category');
                return;
            }
            viewUpdate(categoryId.getAttribute('data-id'));
        });
    }());

    function viewUpdate(categoryId) {

        let oldCategories = localStorage.getItem('categories');
        oldCategories = JSON.parse(oldCategories);

        let updatedCategory;
        for (let index = 0; index < oldCategories.length; index++) {
            if (oldCategories[index].id == categoryId) {
                updatedCategory = oldCategories[index];
                break;
            }
        }

        let categoryEditContainer = document.querySelector('#categories-container');
        categoryEditContainer.innerHTML = '';
        categoryEditContainer.appendChild(createCategoryEditForm(categoryId));

        let categoryName = document.querySelector('#update-category-name');
        categoryName.value = updatedCategory.name;

        let previewOldImage = document.querySelector('#admin-update-category .js--image-preview');
        previewOldImage.innerHTML = '';
        previewOldImage.style.backgroundImage = 'url("../images/admin/' + updatedCategory.image + '")';
    }


    function setUpdateCategoryToDB(categoryName, uploadImageFileName, categoryId, e) {
        let oldCategories = localStorage.getItem('categories');
        oldCategories = JSON.parse(oldCategories);

        // Check if new category founded
        let founded = findCategory(categoryName, oldCategories, categoryId);
        if (founded) {
            responseMessage(`New Category "${categoryName}" didn\'t add as it is recorded in system before :(`, 'error', e.path[1]);

            // Add Notification
            addNotificationToDB(`Try to add "${categoryName}" but it is founded in system`);
            return;
        }
        else {
            let currentId = localStorage.getItem('categoryID');
            currentId = JSON.parse(currentId);

            for (let index = 0; index < oldCategories.length; index++) {
                console.log(oldCategories[index]);
                if (oldCategories[index].id == categoryId) {
                    oldCategories[index].name = categoryName;
                    oldCategories[index].image = uploadImageFileName;
                    break;
                }
            }
            oldCategories = JSON.stringify(oldCategories);
            localStorage.setItem('categories', oldCategories);


            // Add Notification
            addNotificationToDB(`Update Category "${categoryName}" with id = ${categoryId}`);

            responseMessage(`Category "${categoryName}" updated :)`, 'success', e.path[1]);
        }
    }


    function checkUpdateCategory(e) {
        e.preventDefault();

        let categoryName = document.querySelector('#update-category-name');
        let uploadImageFile = document.querySelector('.preview-container .image-upload')
        var errorMsg = "";
        var uploadImageFileName = uploadImageFile.value.substr(uploadImageFile.value.lastIndexOf('\\') + 1);

        if (categoryName.value.length < 3) { // Validate name
            errorMsg += `* New Category "${categoryName.value}" didn\'t add because its length less than 3 characters :(`;
        }
        let _validFileExtensions = [".jpg", ".jpeg", ".png"];
        if (uploadImageFile.type == 'file') {//Validate Image
            let extensionValid = false;
            if (uploadImageFile.value.length > 0) {
                for (let j = 0; j < _validFileExtensions.length; j++) {
                    if (uploadImageFile.value.substr(uploadImageFile.value.length - _validFileExtensions[j].length, _validFileExtensions[j].length).toLowerCase() == _validFileExtensions[j].toLowerCase()) {
                        extensionValid = true;
                        break;
                    }
                }

                if (!extensionValid) {
                    if (errorMsg)
                        errorMsg += '<br><br>';
                    errorMsg += "* Sorry, \"" + uploadImageFileName + "\" is invalid, allowed extensions are: " + _validFileExtensions.join(", ");
                }
            }
            else {
                if (errorMsg)
                    errorMsg += '<br><br>';
                errorMsg += '* Please select an image';
            }
        }
        if (errorMsg)
            responseMessage(errorMsg, 'error', e.path[1]);
        else
            setUpdateCategoryToDB(categoryName.value, uploadImageFileName, e.target.getAttribute('data-updatedid'), e);
    }

}

// Show categories From DB
function showCategories(deleteOrEdit) {

    let oldCategories = localStorage.getItem('categories');
    oldCategories = JSON.parse(oldCategories);

    let categoriesContainer = document.querySelector('#categories-container'),
        form = document.createElement('form');
    form.setAttribute('id', deleteOrEdit == 'delete' ? 'admin-delete-product' : 'admin-edit-product');

    let formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    let selectCategories = document.createElement('select');
    selectCategories.setAttribute('id', deleteOrEdit == 'delete' ? 'delete-category-select' : 'edit-category-select');

    let selectCategoriesOptions = document.createElement('option');
    if (oldCategories.length !== 0) {
        selectCategoriesOptions.innerHTML = 'Choose a category';
    }
    else {
        selectCategoriesOptions.innerHTML = 'There is no category yet';
    }

    selectCategories.appendChild(selectCategoriesOptions);

    oldCategories.forEach(element => {
        selectCategoriesOptions = document.createElement('option');
        selectCategoriesOptions.innerHTML = element.name;
        selectCategoriesOptions.setAttribute('data-id', element.id);

        selectCategories.appendChild(selectCategoriesOptions);
    });

    formGroup.appendChild(selectCategories);
    form.appendChild(formGroup);

    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('type', 'submit');

    if (deleteOrEdit == 'edit')
        deleteBtn.style.color = "var(--primary-text-color)";
    deleteBtn.classList.add('btn', deleteOrEdit === 'delete' ? 'btn-danger' : 'btn-warning');
    deleteBtn.innerHTML = deleteOrEdit === 'delete' ? 'Delete Category' : 'Edit Category';

    form.appendChild(deleteBtn);

    categoriesContainer.appendChild(form);
}
///////////////////////////////////// END Handling admin category /////////////////////////////////////



///////////////////////////////////// START Handling admin product /////////////////////////////////////

function showProducts(deleteOrEdit) {

    let oldProducts = localStorage.getItem('products');
    oldProducts = JSON.parse(oldProducts);

    let categoriesContainer = document.querySelector('#products-container'),
        form = document.createElement('form');
    form.setAttribute('id', deleteOrEdit == 'delete' ? 'admin-delete-product' : 'admin-edit-product');

    let formGroup = document.createElement('div');
    formGroup.classList.add('form-group');

    let selectCategories = document.createElement('select');
    selectCategories.setAttribute('id', deleteOrEdit == 'delete' ? 'delete-product-select' : 'edit-oriduct-select');

    let selectCategoriesOptions = document.createElement('option');
    if (oldProducts.length !== 0) {
        selectCategoriesOptions.innerHTML = 'Choose a product';
    }
    else {
        selectCategoriesOptions.innerHTML = 'There is no product yet';
    }

    selectCategories.appendChild(selectCategoriesOptions);

    oldProducts.forEach(element => {
        selectCategoriesOptions = document.createElement('option');
        selectCategoriesOptions.innerHTML = element.name;
        selectCategoriesOptions.setAttribute('data-id', element.id);

        selectCategories.appendChild(selectCategoriesOptions);
    });

    formGroup.appendChild(selectCategories);
    form.appendChild(formGroup);

    let deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('type', 'submit');

    if (deleteOrEdit == 'edit')
        deleteBtn.style.color = "var(--primary-text-color)";
    deleteBtn.classList.add('btn', deleteOrEdit === 'delete' ? 'btn-danger' : 'btn-warning');
    deleteBtn.innerHTML = deleteOrEdit === 'delete' ? 'Delete Category' : 'Edit Category';

    form.appendChild(deleteBtn);

    categoriesContainer.appendChild(form);
}

// Add product
function addProducts(productName) {

    // Add Notification

}

// Delete Product
if (window.location.href.indexOf('/admin-delete-product.html') !== -1) {

    // Remove Product Frm DB
    function removeProductFromDB(id) {
        let oldProducts = localStorage.getItem('products');
        oldProducts = JSON.parse(oldProducts);

        oldProducts.forEach((element, index) => {
            if (element.id == id) {
                oldProducts.splice(index, 1);

                // Add Notification 
                addNotificationToDB(`Delete Product "${element.name}" from system`);
            }
        });

        oldProducts = JSON.stringify(oldProducts);
        localStorage.setItem('products', oldProducts);

    }

    // Remove product
    (function removeProducts() {
        showProducts('delete');

        let deleteBtn = document.querySelector('button.btn-danger');
        let selectedProduct = document.querySelector('#delete-product-select');
        deleteBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (document.querySelector('#delete-product-select').value == 'Choose a product') {
                alert('select the product');
                return;
            }
            let productId = selectedProduct.options[selectedProduct.selectedIndex];

            removeProductFromDB(productId.getAttribute('data-id'));

            productId.remove();
        });
    }());

}

function editProducts(productId) {

    // Add Notification

}
///////////////////////////////////// END Handling admin product /////////////////////////////////////


///////////////////////////////////// START Handling admin Notification & Messages /////////////////////////////////////

// Notification Page
if (window.location.href.indexOf('/admin-notifications.html') !== -1 || window.location.href.indexOf('/admin-messages.html') !== -1) {

    let currentPageNotification = true; // Variable to indicate what is current page either notification or message

    let old;

    if (window.location.href.indexOf('/admin-notifications.html') !== -1) {//Notification
        old = localStorage.getItem('notifications');
    }
    else {//Message
        old = localStorage.getItem('messages');
        currentPageNotification = false;
    }
    old = JSON.parse(old);
    if (old.length >= 1) {
        if (currentPageNotification) {//Notification
            drawNotificationTable('notification');
        }
        else {//Message
            drawNotificationTable('message');
        }
    }
    else {
        let emptyNotification = document.createElement('h3');
        emptyNotification.innerHTML = "There is no notification";
        emptyNotification.style.color = 'gray';
        emptyNotification.style.textAlign = 'center'
        if (currentPageNotification) {//Notification
            document.querySelector('.admin-notification-container').appendChild(emptyNotification);
        }
        else {//Message
            document.querySelector('.admin-message-container').appendChild(emptyNotification);
        }
    }

    function drawNotificationTable(messageOrNotification) {
        let table = document.createElement('table'),
            tableHead = document.createElement('thead'),
            tableBody = document.createElement('tbody'),
            tableHeadRow = document.createElement('th'),
            tableRow,
            icon, removeIcon = '<i class="fas fa-trash"></i>';

        table.setAttribute('id', `admin-${messageOrNotification}`);

        // Notification Icon Column
        tableHead.appendChild(tableHeadRow);

        // Column From for messages Only
        if (!currentPageNotification) {//Message
            // From Column
            tableHeadRow = document.createElement('th');
            tableHeadRow.innerHTML = "From";
            tableHead.appendChild(tableHeadRow);
        }

        // Content Column
        tableHeadRow = document.createElement('th');
        tableHeadRow.innerHTML = "Content";
        tableHead.appendChild(tableHeadRow);

        // Date Column
        tableHeadRow = document.createElement('th');
        tableHeadRow.innerHTML = "Date";
        tableHead.appendChild(tableHeadRow);

        // delete Icon
        tableHeadRow = document.createElement('th');
        tableHead.appendChild(tableHeadRow);

        // Append Table Head
        table.appendChild(tableHead);

        // Show all notifications Data


        old.forEach(element => {

            if (element.readStatus) {
                icon = currentPageNotification ? '<i class="fas fa-bell"></i>' : '<i class="fas fa-eye"></i>';
            }
            else {
                icon = currentPageNotification ? '<i class="far fa-bell"></i>' : '<i class="fas fa-eye-slash"></i>';
            }
            if (currentPageNotification) {
                tableRow = createTableRow(currentPageNotification ? 4 : 5, [icon, element[`${currentPageNotification ? 'notificationText' : 'message'}`], element.date, removeIcon], element.id, [0, 3], 'notification');
                tableBody.appendChild(tableRow);
            }
            else {
                tableRow = createTableRow(currentPageNotification ? 4 : 5, [icon, element.mailFrom, element[`${currentPageNotification ? 'notificationText' : 'message'}`], element.date, removeIcon], element.id, [0, 4], 'message');
                tableBody.appendChild(tableRow);
            }
        });

        // Append Table Head
        table.appendChild(tableBody);
        document.querySelector(`.admin-${messageOrNotification}-container`).appendChild(table);
    }
}

// Add Notification
function addNotificationToDB(notificationMessage) {

    let oldNotifications = localStorage.getItem('notifications');
    oldNotifications = JSON.parse(oldNotifications);

    let currentId = localStorage.getItem('notificationID');
    currentId = JSON.parse(currentId);

    let newNotification = new Notification(currentId++, notificationMessage);

    localStorage.setItem('notificationID', currentId);

    oldNotifications.push(newNotification);

    oldNotifications = JSON.stringify(oldNotifications);
    localStorage.setItem('notifications', oldNotifications);
}

// Delete notification and message
function deleteNotificationOrMessageFromDB(id, messageOrNotification) {
    let old = localStorage.getItem(messageOrNotification);
    old = JSON.parse(old);
    old.forEach((element, index) => {
        if (element.id == id)
            old.splice(index, 1);
    });

    old = JSON.stringify(old);
    localStorage.setItem(messageOrNotification === 'notifications' ? 'notifications' : 'messages', old);
}

// Edit view status of notification and message
function editNotificationOrMessageViewStatus(id, messageOrNotification) {
    let old = localStorage.getItem(messageOrNotification);
    old = JSON.parse(old);
    old.forEach(element => {
        if (element.id == id)
            element.readStatus = !element.readStatus;
    });

    old = JSON.stringify(old);
    localStorage.setItem(messageOrNotification === 'notifications' ? 'notifications' : 'messages', old);
}

function createTableRow(numberofColumns, columnsData, id, idIndices, notificationOrmessage) {
    let row = document.createElement('tr');
    for (let index = 0; index < numberofColumns; index++) {
        let td = document.createElement('td');
        if (idIndices.indexOf(0) != -1 && index == 0) // view status
        {
            td.setAttribute('data-id', id);

            td.addEventListener('click', (e) => {
                let td;
                if (e.path[0].tagName == 'TD') {
                    td = e.path[0];
                }
                else if (e.path[0].tagName == 'I') {
                    td = e.path[1];
                }
                // Edit view status

                if (notificationOrmessage === 'notification') {
                    if (td.childNodes[0].classList.contains('far')) {
                        td.childNodes[0].classList.replace('far', 'fas');
                    }

                    else if (td.childNodes[0].classList.contains('fas')) {
                        td.childNodes[0].classList.replace('fas', 'far');
                    }
                    editNotificationOrMessageViewStatus(td.getAttribute('data-id'), 'notifications');
                }
                else if (notificationOrmessage === 'message') {
                    if (td.childNodes[0].classList.contains('fa-eye-slash')) {
                        td.childNodes[0].classList.replace('fa-eye-slash', 'fa-eye');
                    }

                    else if (td.childNodes[0].classList.contains('fa-eye')) {
                        td.childNodes[0].classList.replace('fa-eye', 'fa-eye-slash');
                    }
                    editNotificationOrMessageViewStatus(td.getAttribute('data-id'), 'messages');
                }
            });


        }
        else if (idIndices.indexOf(3) != -1 && index == 3 || idIndices.indexOf(4) != -1 && index == 4) { // Delete
            td.setAttribute('data-id', id);

            td.addEventListener('click', (e) => {
                let td;

                if (e.path[0].tagName == 'TD') {
                    td = e.path[0];
                }
                else if (e.path[0].tagName == 'I') {
                    td = e.path[1];
                }
                // Delete
                td.parentElement.remove();
                if (notificationOrmessage === 'notification') {

                    deleteNotificationOrMessageFromDB(td.getAttribute('data-id'), 'notifications');
                }
                else if (notificationOrmessage === 'message') {
                    deleteNotificationOrMessageFromDB(td.getAttribute('data-id'), 'messages');
                }
            });
        }

        td.innerHTML = columnsData[index];

        row.appendChild(td);
    }
    return row;
}
///////////////////////////////////// END Handling admin Notification & Messages /////////////////////////////////////


///////////////////////////////////// START Handling admin Global Functions /////////////////////////////////////

// Get current date as string
function getCurrentFormatedDate() {
    let d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours(),
        minute = d.getMinutes(),
        second = d.getSeconds(),
        status;
    if (minute >= 12) {
        minute -= 12;
        status = "PM";
    }
    else
        status = "AM";

    if (hour < 10) {
        hour = '0' + String(hour);
    }
    if (minute < 10) {
        minute = '0' + String(minute);
    }
    if (second < 10) {
        second = '0' + String(second);
    }
    return `${day}-${month}-${year} ${hour}:${minute}:${second} ${status}`;
}

// Response message as error message or success message
function responseMessage(message, status, formObject, redirectStatus = false, redirectURL = "") {

    let previousErrorMessage = formObject.querySelector('.alert-danger');
    let previousSuccessMessage = formObject.querySelector('.alert-success');
    // Remove previous error mesage
    if (previousErrorMessage)
        previousErrorMessage.remove();

    if (previousSuccessMessage)
        previousSuccessMessage.remove();

    let message_div = document.createElement('div');
    message_div.innerHTML = message;

    if (status === 'error') {
        message_div.classList.add('alert-danger');
    }
    else if (status === 'success') {
        message_div.classList.add('alert-success');
    }

    if (redirectStatus) {
        setTimeout(function () { message_div.remove(); window.location.href = redirectURL; }, 1000);
    }
    else {
        setTimeout(function () { message_div.remove(); }, 2000);
    }

    formObject.appendChild(message_div);
}
///////////////////////////////////// END Handling admin Global Functions /////////////////////////////////////
