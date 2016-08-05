function DevicesController() {

	return {
		get: get
	}
	
	function get(urlParams, req, res, next){
		response.writeHead(200, {"Content-Type": "application/json"});

		var json = JSON.stringify({});
		response.end(json);
	}
}

module.exports = DevicesController;