var router = require("./app.router");
require("script!jquery");
require("script!jquery_validation");
require("script!validation_additional_methods");
require("script!sammy");
require("script!mustache");
require("./components/serializeObject/serializeObject")(); //convert data into json
require("./components/sammyFormIgnore/formIgnore")(); //Sammy form submit ignore
require("./components/navBar/navBar")();

function App() {
	var sammy = Sammy('#content-wrapper', function(sammyApp) {

	  // Changes element wrapper to avoid show nav element when user is on login view.
	  this.around(function(cb){
	  	NavBar.ignoreBackButton(['#/','#/login']);
        NavBar.hideOn(['#/','#/login']);
	  	cb();
	  });

	  // Set routes
	  router(this);
	});

	return sammy;
}

module.exports = App;