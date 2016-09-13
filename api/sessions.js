function SessionController() {

  return {
    post: post
  }

  function post( req, res ) {
    var data = req.body;

    if ( data.username == 'error' ) {
      res.writeHead( 401, 'Unauthorized', { 'Content-Type': 'application/json' } );
      res.end( JSON.stringify( {
        error_message: 'User or password invalid.'
      } ) );
    } else {
      res.cookies.set( 'token', '0A5d6jl1w8uRy8r2Mi3Q7asgU8PQGR36', { httpOnly: false } );
      res.writeHead( 204, 'No Content' );
      res.end();
    }
  }
}

module.exports = SessionController;
