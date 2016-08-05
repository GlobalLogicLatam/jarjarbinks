function authenticationService(){
	var self = this;
	
	Object.assign(self, {
		logIn: logIn
	});
	
	return self;

	function logIn(user){
		var $q = $.Deferred();		
		$.when($.post( "/api/sessions",{ username: user.username, password: user.password}))
		.then(function success(){
			return $q.resolve();
		},
		function error(error){
			return $q.reject(error.responseJSON);
		});
		return $q.promise();
	}	
}

module.exports = authenticationService
