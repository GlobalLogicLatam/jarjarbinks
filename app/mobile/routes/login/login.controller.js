let require_factory = require( 'modules/require-factory' ),
  authentication_service = require_factory( 'modules/services/authentication-service' )(),
  modal_factory = require_factory( 'components/modal/modal.factory.js' );

function LoginController() {
  let self = {},
    form = '',
    sammyContext;

	//Public methods and attributes
  Object.assign( self, {
    link: link,
    init: init,
    error: ''
  } );

  return self;

	//PUBLIC FUNCTIONS
	// To bind elements
  function link() {
    form = $( 'form' );

    form.validate( {
      errorClass: 'error text-danger',
      errorElement: 'span',
      wrapper: 'p',
      rules: {
        username: 'required',
        password: 'required'
      },
      messages: {
        username: 'Debe ingresar un usuario.',
        password: 'Debe ingresar una contraseña.'
      },
      onkeyup: false,
      invalidHandler: invalidForm,
      submitHandler: logIn
    } );
  }

	// To make calls to apis. It may returns a promise.
  function init( context ) {
    sammyContext = context;
  }

	//PRIVATE FUNCTIONS
  function logIn() {
    event.preventDefault();
    //convert data into json
    let formData = form.serializeObject();
    $.when( authentication_service.logIn( formData ) )
    .then( function success() {
      sammyContext.redirect( '#/' );
    }, 	function error( error ) {
      modal_factory.confirm( { content: error } )
        .then( function success() {
          //console.log('resolved');
        } )
        .catch( function error() {
          //console.log('rejected');
        } );
    } );
  }

  function invalidForm() {
    modal_factory.destroy();
  }
}

module.exports = LoginController
