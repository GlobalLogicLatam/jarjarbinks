let require_factory = require( 'modules/require-factory' ),
  //detailServices = require_factory( 'modules/services/detail-service' ),
  publisher = require_factory( 'modules/publisher' ),
  adapter = require_factory( 'modules/adapter' );

function DetailController() {
  let self = this,
    subscribed = [];

  Object.assign( self, {
    init: init,
    link: link,
    unlink: unlink
  } )

  return self;

  //function init( sammyContext ) {
  function init() {
    //The back button
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

    let obj = {
        'assingedTo': {
          'id': 23,
          'lastName': 'Rincon',
          'name': 'Mati',
          'username': 'Rod'
        },
        'brand': 'Motorola',
        'currentState': {
          'state': 'estado 1'
        },
        'location': {
          'id': 23,
          'code': 232111,
          'description': 'La plata'
        },
        'model': 'Moto G',
        'operatingSystem': 'Android',
        'osVersion': 23,
        'project': {
          'id': 223,
          'code': 322323312,
          'name': 'BancoLombia'
        },
        'resolution': '720 x 1280',
        'serialNumber': 2129387,
        'size': 23,
        'tag': 'X-XX-XX'
      },
      nav_bar = require_factory( 'components/nav-bar/nav-bar' )( this );
    nav_bar.setTitle( obj.brand + ' ' + obj.model );

    self.data = adapter.formatDetail( obj );

    /*
    return detailServices.get( sammyContext.params ).then( function show_detail( detail ) {
      console.log( detail );
      //self.data = detail;
      self.data = createFormatDetail( detail );
    })*/
  }

  function link() {}

  function unlink() {}

}

module.exports = DetailController;
