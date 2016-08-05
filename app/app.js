var router = require("./app.router");
require("script!jquery");
require("script!jquery_validation");
require("script!validation_additional_methods");
require("script!sammy");
require("script!mustache");
require("script!sammy.mustache");
require("./components/serializeObject/serializeObject")(); //convert data into json
require("./components/sammyFormIgnore/formIgnore")(); //Sammy form submit ignore

function App() {
	var app = Sammy('#content-wrapper', function(sammyApp) {
		var nav_el = $('.js-nav');
	  // Include mustache plugin
	  this.use('Mustache');

	  // Changes element wrapper to avoid show nav element when user is on login view.
	  this.around(function(cb){
	  	if(this.path == '/#/login'){
	  		nav_el.hide();
	  	} else {
	  		nav_el.show();
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