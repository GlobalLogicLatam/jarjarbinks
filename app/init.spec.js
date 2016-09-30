const require_factory = require( 'modules/require-factory' ),
  context = require.context( './', true, /.spec\.js$/ );

context.keys().forEach( context );

require( 'script!jquery' );
require( 'script!jquery_validation' );
require( 'script!validation_additional_methods' );
require( 'script!sammy' );
require( 'script!mustache' );
require_factory( 'components/serialize-object/serialize-object' );
