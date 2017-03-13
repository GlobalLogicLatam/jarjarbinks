function adapter() {
  let self = {
    formatDetail: formatDetail,
    formatDevicesByOS: formatDevicesByOS
  };

  return self;

  function formatDevicesByOS( devices ) {
    let result = { os: [ ], data: [ ] }

    for ( let [ k, v ] of Object.entries( devices ) ) {
      if ( !result.os.includes( k ) ) {
        result.os.push( k )
        result.data.push( { os: k, devices: v } );
      }
    }
    delete result[ 'os' ];
    return result;
  }

  function formatDetail( detail ) {

    let result = [],
      keys = {
        'brand': 'Marca',
        'location': 'Locación',
        'assingedTo': 'Asignado',
        'model': 'Modelo',
        'tag': 'Tag',
        'serialNumber': 'Serial',
        'project': 'Proyecto',
        'operatingSystem': 'Sistema operativo',
        'osVersion': 'Versión',
        'resolution': 'Resolución'
      }

    for ( let prop in detail ) {
      if ( detail.hasOwnProperty( prop ) ) {

        if ( keys[ prop ] != undefined ) {

          if ( typeof detail[ prop ] == 'object' ) {

            if ( !prop == 'assingedTo' || !prop == 'location' ) {

              result.push( { key: keys[ prop ], data: detail[ prop ].name } )
            } else {
              if ( prop == 'location' ) {

                result.push( { key: keys[ prop ], data: detail[ prop ].description } )
              }
              if ( prop == 'assingedTo' ) {

                result.push( { key: keys[ prop ], data: detail[ prop ].name + ' ' + detail[ prop ].lastName } )
              }
            }
          } else {
            result.push( { key: keys[ prop ], data: detail[ prop ] } )
          }
        }
      }
    }
    return result
  }
}

module.exports = adapter()
