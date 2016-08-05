function authenticationService(){
	var self = this;
	
	Object.assign(self, {
		logIn: logIn
	});
	
	return self;

	function logIn(user){
		console.log("entre en service", user);
		var $q = $.Deferred();
		var errorMsg = "Usuario / Contraseña invalido.",
		successMsg = "Enviado!",
		prmsg ="este mensaje fue para pr!!!";

		console.log("service","username: " + user.username , "password: " + user.password);
		if(user.username !== "error" && user.password !== "error"){
			return $q.resolve(successMsg);
		} else {
			return $q.reject(errorMsg);
		}
		return $q.promise();
	}	
}

module.exports = authenticationService
