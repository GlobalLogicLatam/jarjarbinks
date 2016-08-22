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

function App() {
  var sammy = Sammy( '#content-wrapper', function appSammyHandler() {
    // Set routes
    router( this );
  } );


  return sammy;
}

module.exports = App;
