// ========================================
// JavaScript
// ========================================

// Fetch API

const API_KEY = '33470512-baf6af1551ac4e34a5de80fe8';
let PAGE      = 1; //Current Page Number
let URL       = "https://pixabay.com/api/?key="
                +API_KEY+
                "&image_type='photo'&orientation='horizontal'&min_width=129&min_height=96&safesearch='true'&page="
                +PAGE;
fetch(URL)
	.then(res => res.json())
	.then(data => console.log(data))

let preloadArr = [];

$.getJSON(URL, function(data){
	if (parseInt(data.totalHits) > 0)
	    $.each(data.hits, function(i, hit) {
	    	console.log(hit.previewURL);
	    	preloadArr.push(hit.previewURL);
	    });	
	else
	    console.log('No hits');
	});
console.log(preloadArr);

// Populate Next Array

let nextArr = [];

for (let i = nextArr.length; i < 11; i++) {
	let image = preloadArr.value;
	nextArr.push(image);
}

console.log(nextArr);

// Populate Previous Array

let previousArr = [];

previousArr.unshift(nextArr.pop());

console.log(previousArr);

// Assign Choices to Available Frames

let
	nextOptions  = document.getElementsByClassName('next'),
	currOption   = document.getElementById('current'),
	prevOptions  = document.getElementsByClassName('previous');

// Button Sound effects

let
	saveSound = new Audio('../audio/save.mp3'),
	loadSound = new Audio('../audio/load.mp3'),
	deleteSound = new Audio('../audio/delete.mp3'),
	prevSound = new Audio('../audio/prev.mp3'),
	addSound = new Audio('../audio/add.mp3'),
	nextSound = new Audio('../audio/next.mp3'),
	removeSound = new Audio('../audio/remove.mp3'),
	sendSound = new Audio('../audio/send.mp3');

// Input Form Validation

let formInput	= document.getElementById("form-input"),
	errorInput	= document.getElementsByClassName("input-error"),
	failIcnInput	= document.getElementsByClassName("input-failure");

const errInput	=
	{
	noContent		: "Email is required.",
	isLong			: "Email provided is too long, max 254 characters.",
	notEmail		: "Email provided is not a valid email.",
	allreadyExists  : "Email provided already exists."
};

const regExpEm	= new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

const failInput = (id) => {
    id.style.border = "2px solid red";
    failIcnInput.style.opacity = "1";
};

const validateInput	= (id) => {
	let val = id.value.trim();
	if (val === "" && id !== phone)	{
		errorInput.innerHTML = errInput.noContent;
		failInput(id);
	    return;
	}
	if (!val.match(regExpEm))	{
		errorInput.innerHTML = errInput.notEmail;
	    failInput(id);
	    return;
	}
	if (val.length > 254)	{
		errorInput.innerHTML = errInput.isLong;
	    failInput(id);
	    return;
	}
	errorInput.innerHTML = "";
	id.style.border = "none";
    failIcnInput.style.opacity = "0";
};

// Check If Email Already Exists

const checkExisting = (id) => {
	savedArr.forEach(element => {
		if (element.email === id)   {
			errorInput.innerHTML = errInput.allreadyExists;
			failInput(id);
			return;
		}
	});
};

// Check Array Function

const checkArray = e => {
	validateInput(emailAddress);
	checkExisting(emailAddress);
	createNewArray()
};

// Create New Array

const createNewArray = () => {
	let index = 0;
	if (savedArrays) {
		index = savedArrays.length;
	}
	savedArrays[index] = new SavedArray(emailAddress);
	saveSound.play();
}

// Saved Array Constructor

class SavedArray {
	constructor(emailAddress) {
		this.email = emailAddress;
		this.photos = {};
	}
}

const
	emailAddress = document.getElementById('address'),
	createArrBtn = document.getElementById('save'),
	clearForm    = document.getElementById('clear');

createArrBtn.addEventListener('click', checkArray);

// Array Storage

const
	savedArr    = document.getElementById('addresses'),
	loadArr     = document.getElementById('load'),
	deleteArr   = document.getElementById('delete');

// Image Control

const
	previousBtn = document.getElementById('previous'),
	addImageBtn = document.getElementById('add-image'),
	nextBtn     = document.getElementById('next');




// Contact Form Validation

let form		= document.getElementById("form"),
	firstName	= document.getElementById("name"),
	surname		= document.getElementById("surname"),
	email		= document.getElementById("email"),
	phone		= document.getElementById("phone"),
	subject		= document.getElementById("subject"),
	message		= document.getElementById("message"),
	errorMsg	= document.getElementsByClassName("error"),
	successIcon	= document.getElementsByClassName("success-icon"),
	failureIcon	= document.getElementsByClassName("failure-icon");

const indexMsg	=
	[
 	"First Name",
 	"Last Name",
 	"Email",
 	"Phone Number",
 	"Subject",
 	"Message"
]

const errMsg	=
	{
	noContent		: " is required",
	hasInvalid		: " contains invalid characters",
	nameIsShort		: " is too short, min 2 characters",
	telIsShort		: " is too short, min 11 digits",
	telIsLong		: " is too long, max 11 digits",
	subIsShort		: " is too short, min 4 characters",
	msgIsShort		: " is too short, min 20 characters",
	isLong			: " is too long, max 254 characters",
	notEmail		: " given is not a valid email",
	notTel			: " given is not a valid number"
};

const regExpTx	= new RegExp(/^[a-zA-Z ]*$/),
	  regExpMsg	= new RegExp(/^[a-zA-Z\s]*$/),
	  regExpTel	= new RegExp(/^[0-9]*$/);

const validate	= (id, index) => {
	let val = id.value.trim();
	const fail = () => {
	    id.style.border = "2px solid red";
	    failureIcon[index].style.opacity = "1";
	    successIcon[index].style.opacity = "0";
	};
	if (val === "" && id !== phone)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.noContent;
		fail();
	    return;
	}
	if (!val.match(regExpTx) && id !== email && id !== message && id !== phone)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.hasInvalid;
	    fail();
	    return;
	}
	if (val.length < 2 && id === firstName)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.nameIsShort;
	    fail();
	    return;
	}
	if (val.length < 2 && id === surname)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.nameIsShort;
	    fail();
	    return;
	}
	if (!val.match(regExpEm) && id === email)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.notEmail;
	    fail();
	    return;
	}
	if (!val.match(regExpTel) && id === phone)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.notTel;
	    fail();
	    return;
	}
	if (val.length !== 0 && val.length < 11 && id === phone)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.telIsShort;
	    fail();
	    return;
	}
	if (val.length > 11 && id === phone)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.telIsLong;
	    fail();
	    return;
	}
	if (val.length < 4 && id === subject)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.subIsShort;
	    fail();
	    return;
	}
	if (!val.match(regExpMsg) && id === message)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.hasInvalid;
	    fail();
	    return;
	}
	if (val.length < 20 && id === message)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.msgIsShort;
	    fail();
	    return;
	}
	if (val.length > 254)	{
		errorMsg[index].innerHTML = indexMsg[index] + errMsg.isLong;
	    fail();
	    return;
	}
	errorMsg[index].innerHTML = "";
    id.style.border = "2px solid green";
    failureIcon[index].style.opacity = "0";
    successIcon[index].style.opacity = "1";
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	validate(firstName, 0);
	validate(surname, 1);
	validate(email, 2);
	validate(phone, 3);
	validate(subject, 4);
	validate(message, 5);
});
