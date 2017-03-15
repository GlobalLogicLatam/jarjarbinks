function deviceService() {
  let self = {};

  Object.assign( self, {
    get: get,
    post: post,
    getDevicesByOS: getDevicesByOS
  } );

  return self;

  /**
   * PUBLIC FUNCTIONS
   */

  // Get all devices
  function get() {
    return $.get( '/api/devices' );
  }

  function post( device ) {
    // return $.postJSON( '/api/devices', JSON.stringify( device ) );
    return $.ajax( { url: '/api/devices', type: 'POST', data: JSON.stringify( device ), dataType: 'json', contentType: 'application/json; charset=utf-8' } );
  }

  // Get all devices and group them based on OS.
  // TODO: Ask backedend guys return 'os' attribute.
  function getDevicesByOS() {
    return self
      .get()
      .then( function groupByOS( res ) {
        let grouped_devices = {};
        res.content.reduce( function group( buffer, device ) {

          if ( !buffer[ device.operatingSystem ] ) {
            buffer[ device.operatingSystem ] = [ ];
          }

          buffer[ device.operatingSystem ].push( device );

          return buffer;

        }, grouped_devices );

        return Promise.resolve( grouped_devices );

      } );
  }

}

module.exports = deviceService()
