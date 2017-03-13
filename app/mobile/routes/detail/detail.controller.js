let require_factory = require( 'modules/require-factory' ),
  detailServices = require_factory( 'modules/services/detail-service' ),
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

  function init( sammyContext ) {
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
    let nav_bar = require_factory( 'components/nav-bar/nav-bar' )( this );
    return detailServices.get( sammyContext.params ).then( function show_detail( detail ) {
      nav_bar.setTitle( detail.brand + ' ' + detail.model );
      self.data = adapter.formatDetail( detail );
    } )
  }

  function link() {}

  function unlink() {}

}

module.exports = DetailController;
