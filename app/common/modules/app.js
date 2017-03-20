let require_factory = require( 'modules/require-factory' ),
  client_detector = require( 'modules/client-detector' );

// Global libraries
require( 'script!jquery' );
require( 'script!jquery_cookie' );
require( 'script!sammy' );
require( 'script!mustache' );

// General components
require_factory( 'components/serialize-object/serialize-object' );
require_factory( 'components/sammy-form-ignore/sammy-form-ignore' );

const router = require_factory( 'modules/router' );

function App() {
  var sammy = Sammy( '#content-wrapper', function appSammyHandler() {
    let nav_bar = require_factory( 'components/nav-bar/nav-bar' )( this ),
      body = $( 'body' );

    // Intercepts ajax call
    require_factory( 'components/jquery-ajax-interceptor/jquery-ajax-interceptor' )( this )

    // Add css class for css based on client type (mobile / desktop)
    if ( client_detector.is_mobile ) {
      body.addClass( 'flex--column' );
    } else {
      body.addClass( 'flex--row' );
    }

    // Set routes
    router( this );

    if ( client_detector.is_mobile ) {

      // Specific components for mobile.
      require_factory( 'components/card/card' )();
      require_factory( 'components/card/note-card' )();
      require_factory( 'components/card/device-card' )();
      require_factory( 'components/custom-events/long-click' )();

      // reset navBar before change the url
      this.before( nav_bar.reset );

      // set navBar after change the url
      this.after( nav_bar.render );
    }

  } );
  return sammy;
}
module.exports = App;
