function LoginController(){
	var self = this;
	self.error = 'Usuario / Contraseña invalido';
	self.clickme = function (){
		console.log("loggggin");
	}
	let route = {
		get: function(urlParams) {
			return { login: self };
		}
	};

	return route;
}

module.exports = LoginController()