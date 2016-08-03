function LoginController(){
var self = this;
self.error = 'Usuario/Contraseña invalido';
  let route = {
  	get: function(urlParams) {
			return { login: self };
  	}
  };

  return route;
}

module.exports = LoginController()