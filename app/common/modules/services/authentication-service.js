function authenticationService() {
  let self = {};

  Object.assign( self, {
    logIn: logIn
  } );

  return self;

  function logIn( user ) {
    var $q = $.Deferred();
    $.post( '/api/login', { username: user.username, password: user.password } )
    .then( function success( user ) {
      return $q.resolve( user );
    },
    function error( error ) {
      return $q.reject( error.responseJSON, error );
    } );
    return $q.promise();
  }
}

module.exports = authenticationService;
