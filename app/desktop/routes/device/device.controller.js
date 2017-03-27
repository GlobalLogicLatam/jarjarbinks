let require_factory = require( 'modules/require-factory' ),
  deviceService = require_factory( 'modules/services/device-service' );

function DeviceController() {
  let self = {};

	//Public methods and attributes
  Object.assign( self, {
    link: link,
    unlink: unlink,
    init: init,
    unlocked: 'Desbloqueado',
    locked: 'Bloqueado'
  } );
  return self;

	// //PUBLIC FUNCTIONS
	// To bind elements
  function link() {

  }

  // To make calls to apis. It may returns a promise.
  function init() {
    // Init nav bar
    require_factory( 'components/nav-bar/nav-bar' )();

    return deviceService
      .getDevicesByOS()
      .then( function show_devices( devices ) {
        self.os_list = devices;
      } );
  }

  function unlink() {

  }
}
module.exports = DeviceController;
