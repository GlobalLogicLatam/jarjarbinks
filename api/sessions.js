function SessionController() {

	return {
		post: post
	}
	
	function post(req, res, next){
		var data = req.body;
		
		if(data.username == 'error'){
			res.writeHead(401, 'Unauthorized', {"Content-Type": "application/json"});
			res.end(JSON.stringify({
				error_message: 'User or password invalid.'
			}));
		} else {
			res.writeHead(204, 'No Content');
			res.end();
		}
	}
}

module.exports = SessionController;