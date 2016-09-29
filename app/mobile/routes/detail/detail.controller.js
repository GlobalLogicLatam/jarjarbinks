let require_factory = require( 'modules/require-factory' ),
  detailService = require_factory( 'modules/services/device-service' ),
  publisher = require_factory( 'modules/publisher' );

function DetailsController() {
  let self = this,
    subscribed = [];

	//Public methods and attributes
  Object.assign( self, {
    link: link,
    unlink: unlink,
    init: init
  } );
  return self;

	// //PUBLIC FUNCTIONS
	// To bind elements
  function link( sammyContext ) {
    $( '.js-card' )
      .deviceCard( {} )
      .on( 'click', function redirect() {
        sammyContext.redirect( '#/notes' );
      } );
  }
  // To make calls to apis. It may returns a promise.
  function init( sammyContext ) {

    subscribed.push(
      publisher.subscribe( 'button.back', function event_handler( ) {
        let res = confirm( 'Desea salir?' );
        return new Promise( function promise_handler( resolve, reject ) {
          if ( res ) {
            resolve( 'user accept.' );
          } else {
            reject( 'user reject.' );
          }
        } );
      } )
    );

    // Temporary call to create details.
    detailService
      .post( {
        brand: 'Motorola',
        id: '1234',
        model: 'G3',
        status: 'locked',
        tag: 'X-XX-XX',
        serial: '152-225-525-151',
        project: 'BCI006',
        os: 'Android',
        resolution: '1920x1080',
        version: '10'
      } );

    return detailService
      .get(
        sammyContext.params
      )
      .then( function show_details( details ) {
        self.data = details[ 2 ];
      } );
  }
  function unlink() {
    // Unsubscribe handlers
    subscribed.map( function unsubscribe( id ) {
      publisher.unsubscribe( id );
    } )
  }
}
module.exports = DetailsController;
