

function LoginController(urlParams){

	var authenticationService = require("./../../services/authenticationService")();		

	let self = this,
	form = "",
	customErrorElement= "";
	//Public methods and attributes
	Object.assign(self, {
		link: 	link,
		init: 	init,
		error: ''
	});

	return self;	

	//PUBLIC FUNCTIONS
	// To bind elements
	function link(){
		form = $('form');
		customErrorElement = $('#loginError');
		form.validate({
			errorClass: "error text-danger",
			errorElement: 'span',
			wrapper: 'p',
			rules:{
				username: "required",
				password: "required"				
			},
			messages:{
				username: "Debe ingresar un usuario.",
				password: "Debe ingresar una contraseña."
			},
			submitHandler: logIn
		});		
	};

	// To make calls to apis. It may returns a promise.
	function init(){
		
	};

	//PRIVATE FUNCTIONS
	function logIn(){
		event.preventDefault();			
		customErrorElement.html('');			
		//convert data into json	
		let formData  =  form.serializeObject();
		$.when(authenticationService.logIn(formData))
		.then(function success(){
			//redirect to main page.
		}, 	function error(error){
			customErrorElement.html(error.error_message);
		});
	}	
}

module.exports = LoginController