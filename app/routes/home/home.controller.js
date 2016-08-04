function HomeController(urlParams){
	let self = this;
	
	// Public methods and attributes
	Object.assign(self, {
		link: link,
		init: init
	});

	return self;

	// To bind elements
	function link(){
		
	};

	// To make calls to apis. It may returns a promise.
	function init(){
		return new Promise(function(resolve, reject){
			setTimeout(function() {
        self.name = 'Patrick';
        resolve();
      	}, 5000);
		});
	};
}

module.exports = HomeController;