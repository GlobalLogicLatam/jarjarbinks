function noteService() {
  let self = {};

  Object.assign( self, {
    get: get,
    post: post
  } );

  return self;

  function get( params ) {
    return $.get( `/api/notes/${params.id}` );
  }

  function post( note ) {
    return $.ajax( {
      url: '/api/notes',
      type: 'POST',
      data: JSON.stringify( note ),
      dataType: 'json',
      contentType: 'application/json; charset=utf-8'
    } );
  }
}

module.exports = noteService()
