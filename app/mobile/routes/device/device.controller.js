let require_factory = require( 'modules/require-factory' ),

  //deviceService = require_factory( 'modules/services/device-service' ),
  publisher = require_factory( 'modules/publisher' );

function DeviceController() {
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
    $( '.js-card' ).deviceCard( {} ).on( 'click', function redirect() {
      //console.log( this.dataset );
      sammyContext.redirect( '#/detail', this.dataset );
    } );
  }
  // To make calls to apis. It may returns a promise.
  function init() {

    subscribed.push( publisher.subscribe( 'button.back', function event_handler() {
      let res = confirm( 'Are you sure you want to go back?' );
      return new Promise( function promise_handler( resolve, reject ) {
        if ( res ) {
          resolve( 'user accept.' );
        } else {
          reject( 'user reject.' );
        }
      } );
    } ) );

    let data = {
      'content': [
        {
          'brand': 'Motorla',
          'id': 2313123,
          'model': 'Moto G',
          'operatingSystem': 'Android',
          'reservedBy': {
            'id': 3223,
            'lastName': 'Rosielo',
            'name': 'juan',
            'username': 'Come la papa'
          }
        }
      ]
    }
    self.list = data.content
    return self.list;

    /*
    return deviceService
      .get()
      .then( function show_devices( devices ) {
        self.list = devices.content;
        console.log(devices);
      } );
*/
  }
  function unlink() {
    // Unsubscribe handlers
    subscribed.map( function unsubscribe( id ) {
      publisher.unsubscribe( id );
    } )
  }
}
module.exports = DeviceController;
