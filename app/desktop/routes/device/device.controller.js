let require_factory = require( 'modules/require-factory' ),
  deviceService = require_factory( 'modules/services/device-service' );

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
  function link() {

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

  }
}
module.exports = DeviceController;
