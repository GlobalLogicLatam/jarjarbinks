function HomeController(SammyContext){

  let route = {
  	get: function(urlParams) {
  		SammyContext.render('./routes/home/home.template.mustache', { name: 'Seccion de home' })
	      .swap();
  	}
  };

  route[SammyContext.verb](SammyContext.params);

  return route;
}

module.exports = HomeController