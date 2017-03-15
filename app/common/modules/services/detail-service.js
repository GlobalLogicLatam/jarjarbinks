function detailService() {
  let self = {};
  Object.assign( self, { get: get } );

  return self;

  function get( params ) {
    return $.get( `/api/devices/${params.id}` )
  }

}

module.exports = detailService()
