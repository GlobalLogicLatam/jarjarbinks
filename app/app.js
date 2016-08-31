var router = require( './app.router' );
require( 'script!jquery' );
require( 'script!jquery_validation' );
require( 'script!validation_additional_methods' );
require( 'script!sammy' );
require( 'script!mustache' );
// Convert data into json
require( './components/serializeObject/serializeObject' )();
// Sammy form submit ignore
require( './components/sammyFormIgnore/formIgnore' )();
// Card behaviour controller
require( './components/card/card' )();
require( './components/card/note_card' )();
require( './components/card/device_card' )();
function App() {
  var sammy = Sammy( '#content-wrapper', function appSammyHandler() {
    var nav_el = $( '.js-nav' );

    // Changes element wrapper to avoid show nav element when user is on login view.
    this.around( function checkIfLogin( cb ) {
      if ( this.path == '/#/login' ) {
        nav_el.hide();
      } else {
        nav_el.show();
      }
      cb();
    } );

    // Set routes
    router( this );
  } );

  return sammy;
}

module.exports = App;
