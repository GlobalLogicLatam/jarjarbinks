let deviceService = require( '../../services/deviceService' );

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
  function link() {
    $( '.js-card' ).deviceCard( {} );
  }

	// To make calls to apis. It may returns a promise.
  function init() {
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
