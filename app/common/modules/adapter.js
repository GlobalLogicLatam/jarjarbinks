function adapter() {
  let self = {
    formatDetail: formatDetail
  };

  return self;

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
