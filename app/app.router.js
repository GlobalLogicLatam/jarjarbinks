var navigationHelper = require( './components/navigationHelper/navigationHelper' );

function Router( SammyContext ) {

  const config = require( './app.router.config' ),
    req = require.context( './', true, /^(\.\/.*\.controller|\.\/.*\.mustache)/ );

  let rejectPreviousPromise,
    previous_controller = {},
    current_route;

  config.forEach( function setUrl( r ) {

    // Fetch template
    SammyContext.get( r.url, function routeHandler( context ) {

      let Ctrl = req( r.controller ),
        tmpl = req( r.template ),
        renderedHtml,
        ctrl;

      ctrl = new Ctrl( );
      previous_controller = ctrl;

      if ( rejectPreviousPromise ) {
        rejectPreviousPromise( 'Promise was canceled because another route was executed.' );
      }
      // Running init() to execute async functions
      new Promise( function handler1( resolve, reject ) {
        // Reject old promise if it was not finish yet.
        rejectPreviousPromise = reject;

        Promise
          .all( [ ctrl.init( context ) ] )
          .then( function handler2() {
            resolve( ctrl );
          } );
      } ).then( function handler3( ctrl ) {

        // Extending context with controller return
        if ( r.controllerAs ) {
          context[ r.controllerAs ] = {};
          Object.assign( context[ r.controllerAs ], ctrl );
        } else {
          Object.assign( context, ctrl );
        }

        // Rendering template
        renderedHtml = Mustache.render( tmpl, context );
        context.$element().html( renderedHtml );

        // Call link controller function to bind elements.
        ctrl.link( context );

      } ).catch( function errorHandler( err ) {
        // eslint-disable-next-line no-console
        console.error( 'Fail executing route: ', err );
      } );

    } );

    // Decorate sammy route with custom configuration.
    current_route = SammyContext.lookupRoute( 'get', r.url );
    current_route.config = r;

    // Execute unlink before change to the new route.
    SammyContext.before( r.url, function unlink() {
      if ( previous_controller.unlink ) {
        previous_controller.unlink();
      }
    } );

  } );
  SammyContext.around( function navHelper( cb ) {
    navigationHelper( SammyContext, this, cb );
  } );
}

module.exports = Router
