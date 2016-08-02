function HomeController(){

  let route = {
  	get: function(urlParams) {
	  	return { name: 'Value from home controller' };
	  }
  };

  return route;
}

module.exports = HomeController()