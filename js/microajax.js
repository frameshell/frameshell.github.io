function microAjax(url, callback) {
	this.bindFunction = function (E, D) {
		return function () {
			return E.apply(D, [D])
		}
	};

	this.stateChange = function (D) {
		if (this.request.readyState == 4) {
			this.callbackFunction(this.request.responseText)
		}
	};
	
	this.getRequest = function () {
		if (window.ActiveXObject) {
			return new ActiveXObject("Microsoft.XMLHTTP")
		} else {
			if (window.XMLHttpRequest) {
				return new XMLHttpRequest()
			}
		}
		return false
	};

	this.postBody = (arguments[2] || "");
	this.callbackFunction = callback;
	this.url = url;
	this.request = this.getRequest();

	if (this.request) {
		var C = this.request;

		C.onreadystatechange = this.bindFunction(this.stateChange, this);

		if (this.postBody !== "") {
			C.open("POST", url, true);
			C.setRequestHeader("X-Requested-With", "XMLHttpRequest");
			C.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			C.setRequestHeader("Connection", "close")
		} else {
			C.open("GET", url, true)
		}

		C.send(this.postBody)
	}
};