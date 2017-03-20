function detailService() {
  let self = {};
  Object.assign( self, { get: get } );

  return self;

  function get( params ) {
    return $.get( `/api/devices/${params.id}` )
      .then( function adaptData( detail ) {
        let assignedTo = detail.assignedTo || { name: '', lastName: '' },
          project = detail.project || { name: '' };
        return [
          { key: 'Marca', data: detail.brand },
          { key: 'Locación', data: detail.location.description },
          { key: 'Asignado', data: `${assignedTo.name} ${assignedTo.lastName}` || '' },
          { key: 'Modelo', data: detail.model },
          { key: 'Tag', data: detail.tag },
          { key: 'Serial', data: detail.serialNumber },
          { key: 'Proyecto', data: project.name },
          { key: 'Sistema Operativo', data: detail.operatingSystem },
          { key: 'Versión', data: detail.osVersion },
          { key: 'Resolución', data: detail.resolution }
        ];
      } );
  }

}

module.exports = detailService()
