let require_factory = require( 'modules/require-factory' ),
  deviceService = require_factory( 'modules/services/device-service' ),
  detailServices = require_factory( 'modules/services/detail-service' ),
  details_tmpl = require_factory( 'routes/device/device_details.template.mustache' );

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

    $( '.js-card-detail' )
      .on( 'click', function redirect() {
        let device_id = this.getAttribute( 'data-detail-id' );

        detailServices
          .get( { id: device_id } )
          .then( function( device_detail ){
            let rendered_html = $( Mustache.render( details_tmpl, { title: device_detail[3].data, detail: device_detail } ) );
            $('.js-device-detail').html( rendered_html );
          } )
      } );

  }

  // To make calls to apis. It may returns a promise.
  function init( sammyContext ) {
    // Init nav bar
    require_factory( 'components/nav-bar/nav-bar' )( sammyContext );

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
