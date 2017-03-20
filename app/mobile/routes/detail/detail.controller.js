let require_factory = require( 'modules/require-factory' ),
  detailServices = require_factory( 'modules/services/detail-service' );
  // publisher = require_factory( 'modules/publisher' );

function DetailController() {
  let self = this;
    // subscribed = [];

  Object.assign( self, {
    init: init,
    link: link,
    unlink: unlink
  } )

  return self;

  function init( sammyContext ) {
    let nav_bar = require_factory( 'components/nav-bar/nav-bar' )( this );
    return detailServices.get( sammyContext.params ).then( function show_detail( detail ) {
      nav_bar.setTitle( detail.brand + ' ' + detail.model );
      self.data = detail;
    } )
  }

  function link() {}

  function unlink() {}

}

module.exports = DetailController;
