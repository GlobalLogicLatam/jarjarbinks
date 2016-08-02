var router = require("./app.router");
require("script!jquery");
require("script!sammy");
require("script!mustache");
require("script!sammy.mustache");

function App() {
	var app = Sammy('#app-container', function() {
	  // include a plugin
	  this.use('Mustache');

	  // Initialize router
	  router(this);
	});

	// start the application
	app.run('#/');
}

module.exports = App()