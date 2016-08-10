var router = require('./app.router');
require('script!jquery');
require('script!jquery_validation');
require('script!validation_additional_methods');
require('script!sammy');
require('script!mustache');
require('./components/serializeObject/serializeObject')(); //convert data into json
require('./components/sammyFormIgnore/formIgnore')(); //Sammy form submit ignore

function App() {
	var sammy = Sammy('#content-wrapper', function() {
		var nav_el = $('.js-nav');

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

	return sammy;
}

module.exports = App;