let config = require( 'modules/config' );

function jqueryAjaxInterceptor( sammy ) {

  $( document ).ajaxError( function onError( event, jqxhr ) {
    if ( jqxhr.status == 401 ) {
      $.removeCookie( config.cookie_session_name, { path: '/' } );
      sammy.setLocation( '#/login' );
    }
  } );

}

module.exports = jqueryAjaxInterceptor;
