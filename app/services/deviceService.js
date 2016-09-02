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
    // return $.postJSON( '/api/devices', JSON.stringify( device ) );
    return $.ajax( {
      url: '/api/devices',
      type: 'POST',
      data: JSON.stringify( device ),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8'
    } );
  }
}

module.exports = deviceService()
