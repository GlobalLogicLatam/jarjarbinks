var router = require("./app.router");
require("script!jquery");
require("script!jquery_validation");
require("script!validation_additional_methods");
require("script!sammy");
require("script!mustache");
require("script!sammy.mustache");

function App() {
	var app = Sammy('#content-wrapper', function(sammyApp) {

	  // Include mustache plugin
	  this.use('Mustache');

	  // Changes element wrapper to avoid show nav element when user is on login view.
	  this.around(function(cb){
	  	if(this.path == '/#/login'){
	  		sammyApp.element_selector = '#app-wrapper';
	  	}
	  	cb();
	  });

	  // Set routes
	  router(this);
	});

	// start the application
	app.run('#/');

	return app;
}

module.exports = App()