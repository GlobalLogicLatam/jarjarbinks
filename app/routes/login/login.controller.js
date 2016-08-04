

function LoginController(urlParams){

	var exampleService = require("./../../services/exampleService")();
	
	let self = this;
	
	//Public methods and attributes
	Object.assign(self, {
		link: 	link,
		init: 	init
	});

	return self;	

	function logIn(){
		event.preventDefault();
		var formData = $("form").serialize();
		$('form').validate({
			rules:{
				username:{
					required:true
				},
				password:{
					required:true
				}
			}
		});	
		exampleService.showExample("example text");
	}	

	// To bind elements
	function link(){
		$('form').on("submit", logIn);
	};

	// To make calls to apis. It may returns a promise.
	function init(){
		
	};

}

module.exports = LoginController