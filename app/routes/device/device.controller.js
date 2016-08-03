function DevicesController(){

  let route = {
  	get: function(urlParams) {
  		return { name: 'Value from device controller' };
	  }
  };

  return route;
}

module.exports = DevicesController()