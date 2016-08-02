function DevicesController(SammyContext){

  let route = {
  	get: function(urlParams) {
  		SammyContext
  			.render('./routes/device/device.template.mustache')
	      .swap();
	  }

  };

  route[SammyContext.verb](SammyContext.params);

  return route;
}

module.exports = DevicesController