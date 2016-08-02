function LoginController(SammyContext){

  let route = {
  	get: function(urlParams) {
			return { name: 'Value from login controller' };
  	}
  };

  return route;
}

module.exports = LoginController