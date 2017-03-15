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
        let grouped_devices_obj = {},
          grouped_devices_arr = [];

        // Grouping devices by OS
        res.content.reduce( function group( buffer, device ) {
          if ( !buffer[ device.operatingSystem ] ) {
            buffer[ device.operatingSystem ] = [ ];
          }

          buffer[ device.operatingSystem ].push( device );

          return buffer;
        }, grouped_devices_obj );

        // Converting object to array for mustache rendering.
        // eslint-disable-next-line one-var
        for ( let os in grouped_devices_obj ) {
          grouped_devices_arr.push( {
            devices: grouped_devices_obj[ os ],
            os: os
          } )
        }

        return Promise.resolve( grouped_devices_arr );

      } );
  }

}

module.exports = deviceService()
