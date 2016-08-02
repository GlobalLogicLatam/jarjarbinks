function LoginController(SammyContext){

  let route = {
  	get: function(urlParams) {
  		SammyContext.render('./routes/login/login.template.mustache', { name: 'Seccion de login' })
	      // swap the DOM with the new content
	      .swap();
  	}
  };

  route[SammyContext.verb](SammyContext.params);
}

module.exports = LoginController