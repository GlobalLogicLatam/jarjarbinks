let modules = {
    common: require.context( '../../common/', true, /^(?!.*\.less$)[/\w\.-]+$/ ),
    mobile: require.context( '../../mobile/', true, /^(?!.*\.less$)[/\w\.-]+$/ ),
    desktop: require.context( '../../desktop/', true, /^(?!.*\.less$)[/\w\.-]+$/ )
  },
  client_detector = require( 'modules/client-detector' );

// Look for modules according to the client (mobile or desktop) or common modules.
function Require_Init() {
  let client_type = client_detector.is_mobile ? 'mobile' : 'desktop';

  return function require_factory( path, force_client_type ) {
    let module_path = './' + path,
      module_index,
      req;

    client_type = force_client_type || client_type;

    // Check if module exists according to client_type.
    module_index = modules[ client_type ].keys().indexOf( module_path );

    // Set require function based on client_type of common.
    if ( module_index === -1 ) {
      req = modules.common
    } else {
      req = modules[ client_type ]
    }

    return req( module_path );
  }
}

module.exports = Require_Init();
