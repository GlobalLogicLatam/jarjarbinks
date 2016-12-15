let require_factory = require( 'modules/require-factory' ),
  authentication_service = require_factory( 'modules/services/authentication-service' )(),
  modal_factory = require_factory( 'components/modal/modal.factory.js' );

function LoginController() {
  let self = {},
    sammyContext;

	//Public methods and attributes
  Object.assign( self, {
    link: link,
    init: init,
    error: ''
  } );

  return self;

	/*
    PUBLIC FUNCTIONS
  */

	// To bind elements
  function link() {
    var form = $( '.js-login-form' );

    form.on( 'submit', submitForm.bind( this, form ) );
  }

	// To make calls to apis. It may returns a promise.
  function init( context ) {
    sammyContext = context;
  }

	/*
    PRIVATE FUNCTIONS
  */

  // Handle login form validation and user authentication.
  function submitForm( jqForm ) {
    if ( isValidForm( jqForm ) ) {
      authenticate( jqForm )
        .then( function validUser() {
          sammyContext.redirect( '#/' );
        } )
        .catch( function invalidUser( error_msg, error_obj ) {
          var config = {};

          if ( error_obj.status == 401 ) {
            config = {
              message: 'Por favor revise el usuario y contraseña ingresados.',
              title: 'Usuario o contraseña incorrecto'
            };
          } else {
            config = {
              // It is not receiving any error message from backend.
              message: 'Error desconocido'
            };
          }

          modal_factory.alert( config );
        } );
    } else {
      modal_factory.alert( {
        message: 'Debe completar usuario y contraseña.',
        title: 'Valores invalidos'
      } );
    }
  }

  // Check if inputs form have some value.
  function isValidForm( form ) {
    var inputs_el = form.find( 'input' ),
      valid_el;

    valid_el = inputs_el.filter( function filterValidValues() {
      return !!this.value.trim();
    } );

    return inputs_el.length == valid_el.length;
  }

  // Call to api for user authentication.
  function authenticate( form ) {
    var data = form.serializeObject();

    return authentication_service.logIn( data );
  }

}

module.exports = LoginController;
