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
		document.getElementById("meetupInfo").value="";
	}
}

function isDeliver() {
	if ( document.getElementById("deliverInfo").classList.contains('d-none') ) {
		document.getElementById("deliverInfo").classList.remove('d-none');
	} else {
		document.getElementById("deliverInfo").classList.add('d-none');
		document.getElementById("deliverInfo").value="";
	}
}

function loadImg(link) {
	if ( document.getElementById("preview").classList.contains('d-none') ) {

	} else {
		document.getElementById("preview").classList.add('d-none');
	}
	if(link) {
		document.getElementById("spinner").classList.remove('d-none');
	} else {
		if ( document.getElementById("spinner").classList.contains('d-none') ) {

		} else {
			document.getElementById("spinner").classList.add('d-none');
		}
	}
	document.getElementById("preview").src = link;
}

function loadFile(event) {
	const file = event.target.files[0];
	if ( document.getElementById("preview").classList.contains('d-none') ) {

	} else {
		document.getElementById("preview").classList.add('d-none');
	}
	if(file) {
		document.getElementById("spinner").classList.remove('d-none');
	} else {
		if ( document.getElementById("spinner").classList.contains('d-none') ) {

		} else {
			document.getElementById("spinner").classList.add('d-none');
		}
	}
	document.getElementById("preview").src = URL.createObjectURL(file);
}

function isLoading() {
	if ( document.getElementById("spinner").classList.contains('d-none') ) {

	} else {
		document.getElementById("spinner").classList.add('d-none');
	}
	document.getElementById("preview").classList.remove('d-none');
}

function uploadOption(option) {
	if(option=="opt1") {
		document.getElementById("formText").disabled = false;
		document.getElementById("formFile").disabled = true;

		document.getElementById("formFile").value = [];
		document.getElementById("preview").src = "";

		if ( document.getElementById("preview").classList.contains('d-none') ) {

		} else {
			document.getElementById("preview").classList.add('d-none');
		}
	}
	if(option=="opt2") {
		document.getElementById("formText").disabled = true;
		document.getElementById("formFile").disabled = false;

		document.getElementById("formText").value = "";
		document.getElementById("preview").src = "";

		if ( document.getElementById("preview").classList.contains('d-none') ) {

		} else {
			document.getElementById("preview").classList.add('d-none');
		}

		if ( document.getElementById("spinner").classList.contains('d-none') ) {

		} else {
			document.getElementById("spinner").classList.add('d-none');
		}
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

	document.getElementById('category').value = category;
	document.getElementById('tag').value = tag;
}