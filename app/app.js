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

const router = require( './app.router' );

function App() {
  var sammy = Sammy( '#content-wrapper', function appSammyHandler() {
    let navBar = require( './components/navBar/navBar' )( this );

    // Changes element wrapper to avoid show nav element when user is on login view.
    this.around( function checkIfLogin( cb ) {
      cb();
    } );

    // Set routes
    router( this );

    // reset navBar before change the url
    this.before( navBar.reset );

    // set navBar after change the url
    this.after( navBar.render );
  } );

  return sammy;
}

module.exports = App;
