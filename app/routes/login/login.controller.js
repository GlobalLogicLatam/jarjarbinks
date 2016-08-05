

function LoginController(urlParams){

	var authenticationService = require("./../../services/authenticationService")();
	
	let self = this;
	
	//Public methods and attributes
	Object.assign(self, {
		link: 	link,
		init: 	init,
		error: ''
	});

	return self;	

	function logIn(){
		let form = $('form');
		$('#loginError').html('');
		event.preventDefault();		
		let formData  =  ConvertFormToJSON(form);
		form.validate({
			errorClass: "error text-danger",
			errorElement: 'span',
			wrapper: 'p',
			rules:{
				username: "required",
				password: "required"				
			},
			messages:{
				username: "Debe ingresar un uaasdsuario.",
				password: "Debe ingresar una contraseña."
			},
			submitHandler: function() {
				$.when(authenticationService.logIn(formData))
				.then(function success(response){
						console.log(response);
					}, 	function error(error){
						console.log(error);
						$('#loginError').html(error);
				});
			}
		});			
	}	

	//Convert formdata to json
	function ConvertFormToJSON(form){
		var array = jQuery(form).serializeArray();
		var json = {};
		jQuery.each(array, function() {
			json[this.name] = this.value || '';
		});
		return json;
	}

	// To bind elements
	function link(){
		$('form').on("submit", logIn);
		self.error = "";
	};

	// To make calls to apis. It may returns a promise.
	function init(){
		
	};

}

module.exports = LoginController