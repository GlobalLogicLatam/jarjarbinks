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

const router = require( './app.router' ),
  navBar = require( './components/navBar/navBar' );

function App() {
  var sammy = Sammy( '#content-wrapper', function appSammyHandler() {

    // Changes element wrapper to avoid show nav element when user is on login view.
    this.around( function checkIfLogin( cb ) {
      cb();
    } );

    // reset navBar before change the url
    this.before( navBar.reset );

    // Set routes
    router( this );
  } );

  return sammy;
}

module.exports = App;
