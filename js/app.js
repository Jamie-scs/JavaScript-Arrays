// ========================================
// JavaScript app.js
// ========================================

// ========================================
// Declare Variables from DOM Elements
// ========================================

const
	nextBtn        = document.getElementById('next'),
	addBtn         = document.getElementById('add-image'),
	previousBtn    = document.getElementById('previous'),
	gallery        = document.getElementById('img-array'),
	galleryFrames  = document.getElementsByClassName('frame'),
	removeImageBtn = document.getElementById('remove'),
	// lightsBtn      = document.getElementById('lights'),
	// cleanBtn       = document.getElementById('clean'),
	deleteImageBtn = document.getElementById('delete-img'),
	formSaved      = document.forms['form-saved'],
	select         = formSaved.select,
	options        = formSaved.select.options,
	loadArrBtn     = document.getElementById('load'),
	deleteArrBtn   = document.getElementById('delete'),
	emailAddress   = document.getElementById('address'),
	createArrBtn   = document.getElementById('save'),
	clearFormBtn   = document.getElementById('clear');

// ========================================
// Button Sound effects
// ========================================

const
	saveSound = new Audio('../audio/save.mp3'),
	loadSound = new Audio('../audio/load.mp3'),
	deleteSound = new Audio('../audio/delete.mp3'),
	prevSound = new Audio('../audio/prev.mp3'),
	addSound = new Audio('../audio/add.mp3'),
	nextSound = new Audio('../audio/next.mp3'),
	removeSound = new Audio('../audio/remove.mp3'),
	sendSound = new Audio('../audio/send.mp3');

// ========================================
// Define Arrays
// ========================================

let preloadImages = []; //Cached Images Array
let	nextImages = [];
let currentImage = [];
let previousImages = [];
let galleryImages = [];
let savedArrays = [];

// ========================================
// Fetch API
// ========================================

// let PAGE      = 1; //Current Page Number
// const API_KEY = '33470512-baf6af1551ac4e34a5de80fe8';
// const URL       = "https://pixabay.com/api/?key="
//                 +API_KEY+
//                 "&image_type='photo'&orientation='horizontal'&min_width=129&min_height=96&safesearch='true'&page="
//                 +PAGE;

// const getImages = new XMLHttpRequest();
// getImages.open('GET', URL);
// getImages.onload = function() {
// 	let dataImages = JSON.parse(getImages.responseText);	
// 	dataImages.hits.map((e)=>{
// 		preloadImages.push(e.previewURL)
// 	})

// }
// getImages.send();



// function fillPreload() {
// 	PAGE++;
// 	getImages.open('GET', URL);
// 	getImages.send();
// 	refillNext();
// }
// console.log(preloadImages);
// console.log(Array.prototype.flatMap.call(preloadImages, (x) => [x, x * 2]));


// ========================================
// Array Population
// ========================================

// Temporary / Testing 'Image' Generator
let img = 0;
function fillPreload() {
	if (preloadImages.length === 0) {
		while (preloadImages.length < 20) {
			preloadImages.push("IMG " + img);
			img++;
		}
	}
}
fillPreload()

// Assign Choices to Available Frames

function refillNext() {
	while (nextImages.length < 10) {
		nextImages.push(preloadImages.shift())
		if (preloadImages.length === 0) {
			fillPreload()
		}
	}
}
refillNext()

currentImage.push(nextImages.shift());

let
	nextFrames    = document.getElementsByClassName('frame-next'),
	currentFrame     = document.getElementById('current'),
	previousFrames    = document.getElementsByClassName('frame-previous');


function fillNext() {
	for (let i = 0; i < nextFrames.length; i++) {
		nextFrames[i].innerHTML = nextImages[i];
	}
}
fillNext()

function fillCurrent() {
	currentFrame.innerHTML = currentImage;
}
fillCurrent()

// ========================================
// Create New Array
// ========================================

// Check Input Function

function checkInput() {
	if(validateInput(emailAddress))	{
		console.log('valid');
		if (checkExisting(emailAddress.value)) {
			console.log('not existing');
			createNewArray(emailAddress.value);
			return;
		}
		console.log('exists');
	}
};

// Input Form Validation

let 
	errorInput	    = document.querySelector(".input-error"),
	failIcnInput	= document.querySelector(".input-failure");

const errInput	=
	{
	noContent		: "Email is required.",
	isLong			: "Email provided is too long, max 254 characters.",
	notEmail		: "Email provided is not a valid email.",
	allreadyExists  : "Email provided already exists."
};

const regExpEm	= new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

function failInput() {
    emailAddress.style.border = "2px solid red";
    failIcnInput.style.opacity = "1";
};

function validateInput(id) {
	let val = id.value.trim();
	if (val === "")	{
		errorInput.innerHTML = errInput.noContent;
		failInput();
	    return;
	}
	if (!val.match(regExpEm))	{
		errorInput.innerHTML = errInput.notEmail;
	    failInput();
	    return;
	}
	if (val.length > 254)	{
		errorInput.innerHTML = errInput.isLong;
	    failInput();
	    return;
	}
	errorInput.innerHTML = "";
	id.style.border = "none";
    failIcnInput.style.opacity = "0";
    return true;
};

// Check If Email Already Exists

function checkExisting(email) {
	for (var i = 0; i < savedArrays.length; i++) {
		if (savedArrays[i].email === email)   {
			errorInput.innerHTML = errInput.allreadyExists;
			failInput();
			return;
		}
	}
	return true;
};

// Create New Option

function insertOption (i) {
	const 
		newOption = document.createElement('option'),
		newOptionValue = document.createTextNode(emailAddress.value);
	newOption.appendChild(newOptionValue);
	newOption.setAttribute('value', i);
	newOption.setAttribute('selected', '');
	select.insertBefore(newOption, select.lastChild);
}

// Create New Array

function createNewArray(email) {
	let i = 0;
	if (savedArrays.length !== undefined) {
		i = savedArrays.length;
	}
	savedArrays.push(new SavedArray(email));
	insertOption(i);
	clearForm();
	saveSound.play();
}

// Saved Array Constructor

class SavedArray {
	constructor(emailAddress) {
		this.email  = emailAddress;
		this.photos = [];
	}
}

createArrBtn.addEventListener('click', checkInput);

// Clear Form Button

clearFormBtn.addEventListener('click', clearForm);

function clearForm() {
	errorInput.innerHTML = "";
	address.style.border = "none";
    failIcnInput.style.opacity = "0";
    emailAddress.value = "";
}

// ========================================
// Saved Array Control
// ========================================

let optionValue = select.value;

select.addEventListener('change', () => {
	optionValue  = select.value;
	console.log(optionValue);
})

loadArrBtn.addEventListener('click', () => {
	if(optionValue === undefined){
		alert("Please select an Array")
		return
	}
	loadArray(optionValue);
	loadSound.play()
})

function loadArray(index) {
	if (savedArrays[index].photos) {
		galleryImages = savedArrays[index].photos;
	}
}

function saveArray(index) {
	savedArrays[index].photos = galleryImages;
}

deleteArrBtn.addEventListener('click', () => {
	if(!select.value){
		alert("Please select an Array")
		return
	}
	select.value.remove()
	// savedArrays[optionValue].remove();
	deleteSound.play()
})

// ========================================
// Image Control
// ========================================

function fillPrevious() {
	if (previousImages.length !== 0) {
		for (let i = 0; i < previousFrames.length; i++) {
			previousFrames[i].innerHTML = previousImages[i];
		}
		return;
	}
	previousFrames[0].innerHTML = "";
}
fillPrevious()

nextBtn.addEventListener('click', () => {
	previousImages.unshift(currentImage.pop());
	currentImage.push(nextImages.shift());
	refillNext()
	fillNext()
	fillCurrent()
	nextSound.play();
	if (previousImages[0] === undefined) {
		previousFrames[0].innerHTML = "";
		return
	}
	fillPrevious()
})

addBtn.addEventListener('click', () => {
	if (currentImage[0] !== undefined) {
		galleryImages.push(currentImage.pop());
		currentImage.push(nextImages.shift());
		fillGallery()
		refillNext()
		fillNext()
		fillCurrent()
		// saveArray()
		addSound.play();
	}
})

previousBtn.addEventListener('click', () => {
	if (currentImage[0] !== undefined) {
		nextImages.unshift(currentImage.pop());
		currentImage.push(previousImages.shift());
		fillNext()
		fillCurrent()
		fillPrevious()
		if (previousImages[0] === undefined) {
			previousFrames[0].innerHTML = "";
			return
		}
		prevSound.play();
	}
})

// ========================================
// Gallery Control
// ========================================

removeImageBtn.addEventListener('click', () => {
	if (galleryImages[0]) {
		if (currentImage[0] !== undefined) {
			nextImages.unshift(currentImage.pop());
			fillNext()
		}
		currentImage.push(galleryImages.shift());
		emptyGallery()
		fillGallery()
		fillCurrent()
		saveArray()
		removeSound.play()
	}
})

function addGalleryItem() {
	gallery.insertAdjacentHTML('beforeend', '<div class="frame-container"><div class="frame"></div><div class="uplighter"><img src="img/uplight.svg" alt="Wall light to highlight picture."></div></div><!-- frame-container -->')
}
function removeGalleryItem() {
	gallery.lastElementChild.remove();
}

function fillGallery() {
	if (galleryImages.length === galleryFrames.length + 1) {
		addGalleryItem();	
	}
	if (galleryImages.length !== 0) {
		for (let i = 0; i < galleryImages.length; i++) {
			galleryFrames[i].innerHTML = galleryImages[i];
		}
	}
	for (let i = galleryImages.length; i < galleryFrames.length; i++) {
		galleryFrames[i].innerHTML = "";
	}
}

function emptyGallery() {
	if (galleryImages.length < galleryFrames.length && galleryFrames.length > 10) {
		removeGalleryItem()
	}
}

// ========================================
// Contact Form Validation
// ========================================

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
    return true;
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	if (
	validate(firstName, 0) &&
	validate(surname, 1) &&
	validate(email, 2) &&
	validate(phone, 3) &&
	validate(subject, 4) &&
	validate(message, 5)	){

	sendSound.play();
	}
});
