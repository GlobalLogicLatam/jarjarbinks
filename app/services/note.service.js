function noteService() {
  let self = {};

  Object.assign( self, {
    get: get,
    post: post
  } );

  return self;

  function get() {
    return $.get( '/api/notes' );
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
