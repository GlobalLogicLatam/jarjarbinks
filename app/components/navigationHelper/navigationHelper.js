function navigationHelper( sammyContext, routeContext, callback ) {
  var nav_el = $( '.js-nav' ),
    default_uri = '#/login';

  // Handler for invalid route
  function routeNotFoundHandler() {
    routeContext.redirect( default_uri );
  }
  // Check if exists a token in cookies
  function isSessionActive() {
    return ( document.cookie.indexOf( 'token=' ) >= 0 );
  }
  // Changes element wrapper to avoid show nav element when user is on login view.
  function checkIfLogin() {
    nav_el.hide();
    if ( routeContext.path != '/#/login' ) {
      // If Session exists redirect to Home, if not to Login
      if ( isSessionActive() ) {
        default_uri = '#/';
        nav_el.show();
      } else {
        routeContext.redirect( '/#/login' );
      }
    }
    callback();
  }
  checkIfLogin();
  sammyContext.notFound = routeNotFoundHandler;

}

module.exports = navigationHelper;
