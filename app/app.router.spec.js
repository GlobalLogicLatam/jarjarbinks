var app = require('./app')();

describe('Route', function() {
	var body;
	
	beforeEach(function() {
    body = $('body');
    body.append('<div id="content-wrapper" class="app-wrapper"></div>');
  });

	describe('#/login', function() {
		beforeEach(function(done) {
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
	})
}); 