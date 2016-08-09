function Router(SammyContext) {

	let config = [
		{
			url: '#/',
			template: './routes/home/home.template.mustache',
			controller: './routes/home/home.controller',
			controllerAs: 'home'
		},
		{
			url: '#/login',
			template: './routes/login/login.template.mustache',
			controller: './routes/login/login.controller',
			controllerAs: 'login'
		},
		{
			url: '#/devices',
			template: './routes/device/device.template.mustache',
			controller: './routes/device/device.controller',
			controllerAs: 'devices'
		}
        ,
        {
            url: '#/note',
            template: './routes/note/note.template.mustache',
            controller: './routes/note/note.controller',
            controllerAs: 'note'
        }
	];

	var rejectPreviousPromise;
  config.forEach(function(r){
  	var req = require.context('./', true, /^(\.\/.*\.controller|\.\/.*\.mustache)/);

  	// Fetch template
  	SammyContext.get(r.url, function(context){
  		var Ctrl = req(r.controller);
  		var ctrl = new Ctrl(context.params);
  		var tmpl = req(r.template);

  		if(rejectPreviousPromise){
				rejectPreviousPromise('Promise was canceled because another route was executed.');
			}
				
			// Running init() to execute async functions
			new Promise(function(resolve, reject){
				// Reject old promise if it was not finish yet.
				rejectPreviousPromise = reject;

				Promise
					.all([ctrl.init(context)])
					.then(function(){
						resolve(ctrl);
					});
			}).then(function(ctrl){
				// Extending context with controller return
				if(r.controllerAs){
					context[r.controllerAs] = {};
					Object.assign(context[r.controllerAs], ctrl);
				} else {
					Object.assign(context, ctrl);
				}

				// Rendering template
				var content = Mustache.render(tmpl, context);
				context.$element().html(content);

				// Call link controller function to bind elements.
				ctrl.link();

			}).catch(function(err){
				console.error('Fail executing route: ', err);
			});

  	});
  });
}

module.exports = Router
