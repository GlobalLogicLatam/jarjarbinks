function authenticationService(){
	var self = this;
	
	Object.assign(self, {
		logIn: logIn
	});
	
	return self;

	function logIn(user){
		var $q = $.Deferred(),
		errorMsg = "Usuario / Contraseña invalido.",
		successMsg = "Enviado!";
		
		if(user.username !== "error" && user.password !== "error"){
			return $q.resolve(successMsg);
		} else {
			return $q.reject(errorMsg);
		}
		return $q.promise();
	}	
}

module.exports = authenticationService
