export default class UserData {
    #name;
    #email;
    #password;
    #phoneNumber;
    #address;
    #birthday;
    #gender;
    #image;

    constructor(name, email, password) {
        this.setName(name);
        this.setEmail(email);
        this.#setPassword(password);
        this.#image = "images/user/default.png";
        this.#address = "";
        this.#phoneNumber = "01111111111";
        this.#birthday = "";
        this.#gender = "";
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        if (typeof name === "undefined" || name === ""){
            throw new InvalidName();
        }
        this.#name = name;
            
    }

    getEmail() {
        return this.#email;
    }

    setEmail(email) {
        const regex =
            /^[a-zA-Z0-9.+-=*/~!#$%^&{}|'`_?]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)+$/;

        if (typeof email === "undefined" || !regex.test(email)) {
            throw new InvalidEmail();
        }
        this.#email = email;
    }

    #setPassword(password) {
        if (typeof password === "undefined" || password.length < 8) {
            throw new InvalidPassword();
        }
        this.#password = password;
    }

    changePassword(oldPassword, newPassword) {
        if (oldPassword !== this.#password) {
            throw new WrongPassword();
        }
        this.#setPassword(newPassword);
    }

    getPhoneNumber() {
        return this.#phoneNumber;
    }

    setPhoneNumber(phoneNumber) {
        const regex = /^\d{11}$/;

        if (!regex.test(phoneNumber)) {
            throw new InvalidPhoneNumber();
        } else {
            this.#phoneNumber = phoneNumber;
        }
    }

    getAddress() {
        return this.#address;
    }

    setAddress(address) {
        this.#address = address;
    }

    getBirthday() {
        return this.#birthday;
    }

    // The input value is preferred to be the numeric value of the date.
    setBirthday(birthday) {
        this.#birthday = birthday;
    }

    getGender() {
        return this.#gender;
    }

    setGender(gender) {
        this.#gender = gender;
    }

    getImage() {
        return this.#image;
    }

    setImage(image) {
        this.#image = image;
    }

    // Returns another object with the same data
    static getCopy(object) {
        return UserData.setObject(object.getObject());
    }

    // Returns the object representation of the UserData class to use it in json
    getObject() {
        return {
            name: this.#name,
            email: this.#email,
            password: this.#password,
            phoneNumber: this.#phoneNumber,
            address: this.#address,
            birthday: this.#birthday,
            gender: this.#gender,
            image: this.#image
        };
    }

    // Takes the object representation of the UserData class and returns an actual object.
    static setObject(object) {
        let newObject = new UserData(object["name"], object["email"], object["password"]);
        newObject.setPhoneNumber(object["phoneNumber"]);
        newObject.setAddress(object["address"]);
        newObject.setBirthday(object["birthday"]);
        newObject.setGender(object["gender"]);
        newObject.setImage(object["image"]);

        return newObject;
    }
}

export class InvalidName extends Error {
    constructor() {
        super("Invalid name , name mustn't be empty.");
    }
}

export class InvalidEmail extends Error {
    constructor() {
        super("Invalid email");
    }
}

export class InvalidPassword extends Error {
    constructor() {
        super("Invalid password, password must be 8 characters or more.");
    }
}

export class WrongPassword extends Error {
    constructor() {
        super("Wrong password, check your password and try again.");
    }
}

export class InvalidPhoneNumber extends Error {
    constructor() {
        super("Invalid phone number, phone number must be 11 digits.");
    }
}
