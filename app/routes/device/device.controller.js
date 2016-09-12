let deviceService = require( '../../services/device.service' ),
  publisher = require( '../../components/publisher/publisher' );

function DeviceController() {
  let self = this;
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
  function init() {

    publisher.subscribe( 'button.back', function event_handler( ) {
      let res = confirm( 'Are you sure you want to go back?' );
      return new Promise( function promise_handler( resolve, reject ) {
        if ( res ) {
          resolve( 'user accept.' );
        } else {
          reject( 'user reject.' );
        }
      } );
    } );

    // Temporary call to create devices.
    deviceService
      .post( {
        brand: 'Motorola',
        id: '1234',
        model: 'G3',
        status: 'locked',
        reservedBy: {
          id: '992',
          lastName: 'Smith',
          name: 'John',
          username: 'jsmith'
        }
      } );

    return deviceService
      .get()
      .then( function show_devices( devices ) {
        self.list = devices;
      } );
  }
  function unlink() {
    // eslint-disable-next-line no-console
    console.log( 'Unlink device!!' );
  }
}
module.exports = DeviceController;
