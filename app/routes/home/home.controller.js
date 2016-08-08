function HomeController(urlParams) {
    let navbar = require("./../../components/navBar/navBar")();
    let self = this;

    // Public methods and attributes
    Object.assign(self, {
        link: link,
        init: init
    });

    return self;

    // To bind elements
    function link() {

    };

	// To make calls to apis. It may returns a promise.
	function init(){
		//Emulate a service call
		return new Promise(function(resolve, reject){
			setTimeout(function() {
        self.name = 'Patrick';
        resolve();
      	}, 1500);
		});
	};
}

module.exports = HomeController;