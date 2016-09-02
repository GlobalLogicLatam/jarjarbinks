function deviceService() {
  let self = {};

  Object.assign( self, {
    get: get,
    post: post
  } );

  return self;

  function get() {
    return $.get( '/api/devices' );
  }

  function post( device ) {
    return $.post( '/api/devices', JSON.stringify( device ) );
  }
}

module.exports = deviceService()
