describe('Login route', function() { 	
	var app = require('../../app')();
	var body;

	beforeEach(function(done) {
    body = $('body');
    body.append('<div id="content-wrapper" class="app-wrapper"></div>');
    app.run('#/login');
		setTimeout(function() {
      done();
    }, 0);
  });
	
	it('should has a form', function(done) {
		var form = body.find('form');

		expect(form.length).toBe(1);
		done();
	});

	it('should be created', function() {
		expect(true).toBe(true);
	});
}); 