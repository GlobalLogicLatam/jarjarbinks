function HomeController(urlParams){
	var self = this;
	
	self.name = 'John';

	self.totto = function(){
		console.log('click!');
	}

	self.link = function(){
		$('p').on('click', self.totto);
	};

	self.init = function(){
		// Emulate a service call
		return new Promise(function(resolve, reject){
			setTimeout(function() {
        self.name = 'Patrick';
        resolve();
      	}, 5000);
		});
	};
}

module.exports = HomeController;