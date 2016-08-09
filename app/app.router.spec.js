describe('Route', function() {
	var app = require('./app.js')();
	var body;

	beforeEach(function(done) {
    body = $('body');
    body.append('<div id="content-wrapper" class="app-wrapper"></div>');
    app.run('#/login');
		setTimeout(function() {
      done();
    }, 0);
  });
	
	describe('#/login', function() { 
		it('should has a form', function(done) {
			var form = body.find('form');

			expect(form.length).toBe(1);
			done();
		});
	})
}); 