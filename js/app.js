import Message from "./admin.js"
if(localStorage.getItem('messages') === null) //Check if first time to set messages
	{
		localStorage.setItem('messages','[]');
		localStorage.setItem('messageID', 1);
	}


function userLogout() {
	sessionStorage.removeItem('UserData');
}

let sendMessageBtn = document.querySelector('#contact-submit');
sendMessageBtn.addEventListener('click',saveMessageFromUserToDB)
function saveMessageFromUserToDB(e) {
	e.preventDefault();
	let contactMail = document.querySelector('#contact-mail').value, valid = true,
	contactMessage = document.querySelector('#contact-message').value;

	console.log(contactMail);
	console.log(contactMessage);

	const emailRegex =
            /^[a-zA-Z0-9.+-=*/~!#$%^&{}|'`_?]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z-]+)+$/;

		// Validate email
        if (contactMail === "") {
			alert('Please enter an email');
			valid = false;
		}
		else if(!emailRegex.test(contactMail)){
			alert('Invalid email');
			valid = false;
		}

		// Validate message
        if (contactMessage === "") {
			alert('Please enter a message');
			valid = false;
		}

		if(valid){
			let oldMessages = localStorage.getItem('messages');
			oldMessages = JSON.parse(oldMessages);

			let currentId = localStorage.getItem('messageID');
			currentId = JSON.parse(currentId);

			let newMessage = new Message(currentId++, contactMail, contactMessage);

			localStorage.setItem('messageID', currentId);

			oldMessages.push(newMessage);

			oldMessages = JSON.stringify(oldMessages);
			localStorage.setItem('messages', oldMessages);
		}


	
}
