function LoginController(urlParams){
	let self = this;
	
	//Public methods and attributes
	Object.assign(self, {
		link: 	link,
		init: 	init,
		error:  'Usuario / Contraseña invalido.'
	});

	return self;	

	function logIn(){
		event.preventDefault();
		var formData = $("form").serialize();
		console.log(formData);
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