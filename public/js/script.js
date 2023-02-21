function showPassword() {
	var x = document.getElementById("showPass");
	if (x.type === "password") {
	x.type = "text";
	} else {
	x.type = "password";
	}
}

function isMeetup() {
	if ( document.getElementById("meetupInfo").classList.contains('d-none') ) {
		document.getElementById("meetupInfo").classList.remove('d-none');
	} else {
		document.getElementById("meetupInfo").classList.add('d-none');
	}
}

function isDeliver() {
	if ( document.getElementById("deliverInfo").classList.contains('d-none') ) {
		document.getElementById("deliverInfo").classList.remove('d-none');
	} else {
		document.getElementById("deliverInfo").classList.add('d-none');
	}
}

function loadImg(link) {
	if ( document.getElementById("preview").classList.contains('d-none') ) {
		console.log('Preview is already hidden');
	} else {
		document.getElementById("preview").classList.add('d-none');
	}
	if(link) {
		document.getElementById("spinner").classList.remove('d-none');
	} else {
		if ( document.getElementById("spinner").classList.contains('d-none') ) {
			console.log('No link input');
		} else {
			document.getElementById("spinner").classList.add('d-none');
		}
	}
	document.getElementById("preview").src = link;
}

function isLoading() {
	if ( document.getElementById("spinner").classList.contains('d-none') ) {
		console.log('Error in class, d-none is existing, cause of reloading the page');
	} else {
		document.getElementById("spinner").classList.add('d-none');
	}
	document.getElementById("preview").classList.remove('d-none');
}

function uploadOption(option) {
	if(option=="opt1") {
		document.getElementById("formText").disabled = false;
		document.getElementById("formFile").disabled = true;
	}
	if(option=="opt2") {
		document.getElementById("formText").disabled = true;
		document.getElementById("formFile").disabled = false;
	}
}

function pickCategory(category, tag, accordionNumber) {
	document.getElementById('chosenCategory').innerText = category+" > "+tag;

	const categoryBtn = new bootstrap.Dropdown("#category-dropdown");
	const accordionHeader = "btn-flush-collapse"+accordionNumber;
	const accordionBody = "flush-collapse"+accordionNumber;

	document.getElementById(accordionHeader).classList.add('collapsed');
	document.getElementById(accordionBody).classList.remove('show');
	categoryBtn.hide();
}