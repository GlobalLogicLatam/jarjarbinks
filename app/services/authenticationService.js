function authenticationService(){
	var self = this;
	var $q = $.Deferred();
	Object.assign(self, {
		logIn: logIn
	});
	
	return self;

	function logIn(user){
		var errorMsg = "Usuario / Contraseña invalido.",
		successMsg = "Enviado!";

		console.log("username: " + user.username , "password: " + user.password);
		if(user.username !== "error" && user.password !== "error"){
			return $q.resolve(successMsg);
		} else {
			return $q.reject(errorMsg);
		}
	}	
}

module.exports = authenticationService
