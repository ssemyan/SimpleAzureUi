AZ.Documents = (function (ko) {
	"use strict";

	var docViewModel = {
		documents: ko.observableArray(),
		emailAdd: ko.observable()
	};

	var apiUrl = "";

	function getApiData() {

		// Get list of Documents
		AZ.Ajax.MakeAjaxCall("GET",
			apiUrl,
			null,
			function (data) {

				for (var i = 0; i < data.length; i++) {
					docViewModel.documents = ko.observableArray(data);
				}

				// Set up binding
				ko.applyBindings(docViewModel);
			});
	}

	// Do this on start
	$(document).ready(function () {

		// Set the URL based in whether we are running locally or not
		// The URL locations are set in the 
		// This is a hack and is better solved via a build process
		if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
			apiUrl = localUrl;
		} else {
			apiUrl = remoteUrl;
		}

		// Now get the data
		getApiData();
	});

	return {
		model: docViewModel,

		SendEmail: function () {
			var xhr = new XMLHttpRequest();
			xhr.open('GET', apiUrl + "/" + docViewModel.emailAdd(), true);
			xhr.send();
			xhr.onreadystatechange = processRequest;

			function processRequest(e) {
				if (xhr.readyState == 4 && xhr.status == 200) {
					alert(xhr.responseText);
					
				}
			}
		}
	}
}(ko));