

function LoginController(urlParams){

	var authenticationService = require("./../../services/authenticationService")();
	
	let self = this, form = "";
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
		$('#loginError').html('');			
		//convert data into json	
		let formData  =  ConvertFormToJSON(form);
		$.when(authenticationService.logIn(formData))
		.then(function success(response){
			console.log(response);
		}, 	function error(error){
			console.log(error);
			$('#loginError').html(error);
		});
	}	

	//Convert formdata to json
	function ConvertFormToJSON(form){
		var array = form.serializeArray();
		var json = {};
		array.forEach(function(item) {
			json[item.name] = item.value;
		});		
		return json;
	}
}

module.exports = LoginController