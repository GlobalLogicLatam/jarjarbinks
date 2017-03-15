let require_factory = require( 'modules/require-factory' ),
  deviceService = require_factory( 'modules/services/device-service' ),
  publisher = require_factory( 'modules/publisher' );

function DeviceController() {
  let self = this,
    subscribed = [];

  Object.assign( self, {
    link: link,
    unlink: unlink,
    init: init,
    unlocked: 'Desbloqueado',
    locked: 'Bloqueado'
  } );
  return self;

  function link( sammyContext ) {
    $( '.js-card' )
      .deviceCard( { } );

    $( '.js-card-note' )
      .deviceCard( { } )
      .on( 'click', function redirect() {
        sammyContext.redirect( `#/notes/${this.dataset.cardId}` );
      } );

    $( '.js-card-detail' )
      .deviceCard( { } )
      .on( 'click', function redirect() {
        sammyContext.redirect( `#/detail/${this.dataset.detailId}` );
      } );
  }

  // To make calls to apis. It may returns a promise.
  function init() {
    subscribed.push(
      publisher.subscribe( 'button.back', function event_handler( ) {
        let res = confirm( 'Are you sure you want to go back?' );
        return new Promise( function promise_handler( resolve, reject ) {
          if ( res ) {
            resolve( 'user accept.' );
          } else {
            reject( 'user reject.' );
          }
        } );
      } )
    );
    let nav_bar = require_factory( 'components/nav-bar/nav-bar' )( this );
    nav_bar.setTitle( 'Dispositivos' );
    return deviceService
      .getDevicesByOS()
      .then( function show_devices( devices ) {
        self.os_list = devices;
      } );
  }

  function unlink() {
      // Unsubscribe handlers
    subscribed.map( function unsubscribe( id ) {
      publisher.unsubscribe( id );
    } )
  }
}

module.exports = DeviceController;
