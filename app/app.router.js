function Router(SammyContext) {

	let config = [
		{
			url: '#/',
			template: './routes/home/home.template.mustache',
			controller: './routes/home/home.controller'
		},
		{
			url: '#/login',
			template: './routes/login/login.template.mustache',
			controller: './routes/login/login.controller'
		},
		{
			url: '#/devices',
			template: './routes/device/device.template.mustache',
			controller: './routes/device/device.controller'
		}
	];

  config.forEach(function(r){
  	let verb = r.verb || 'any';
  	let req = require.context('./', true, /^\.\/.*\.controller$/);
  	
  	// Fetch template
  	SammyContext[verb](r.url, function(context){
  		Promise.all([
  			// Load template
  			context.load(r.template),
  			// Execute controller
  			req(r.controller)[context.verb](context.params)
			]).then(function(res){
				let ctrl = res[1];
				
				// Extending context with controller return
				Object.assign(context, ctrl);

				// Render parcial and show in wrapper.
				context.partial(r.template);
			});
  	});
  });
}

module.exports = Router