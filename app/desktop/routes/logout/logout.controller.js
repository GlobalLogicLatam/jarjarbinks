let require_factory = require( 'modules/require-factory' ),
  config = require( 'modules/config' ),
  authentication_service = require_factory( 'modules/services/authentication-service' )();

function DeviceController() {
  let self = {};

	//Public methods and attributes
  Object.assign( self, {
    link: link,
    unlink: unlink,
    init: init
  } );

  return self;

	// //PUBLIC FUNCTIONS
	// To bind elements
  function link( sammyContext ) {}

  // To make calls to apis. It may returns a promise.
  function init( sammyContext ) {
    authentication_service
      .logOut()
      .then( function(){
        $.removeCookie( config.cookie_session_name, { path: '/' } );
        $.removeCookie( 'logged_user', { path: '/' } );

        sammyContext.redirect( '#/' );
      } );
  }

  function unlink() {}
}
module.exports = DeviceController;
