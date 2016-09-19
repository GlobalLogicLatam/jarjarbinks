let require_factory = require( 'modules/require-factory' ),
  App = require_factory( 'modules/app' );

function Init() {
  // start the application
  var app = App();
  app.run( '#/' );
}

module.exports = Init();
