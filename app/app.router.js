var navigationHelper = require( './components/navigationHelper/navigationHelper' );

function Router( SammyContext ) {

  let config = [
    {
      url: '#/',
      template: './routes/home/home.template.mustache',
      controller: './routes/home/home.controller',
      controllerAs: 'home'
    },
    {
      url: '#/login',
      template: './routes/login/login.template.mustache',
      controller: './routes/login/login.controller',
      controllerAs: 'login'
    },
    {
      url: '#/devices',
      template: './routes/device/device.template.mustache',
      controller: './routes/device/device.controller',
      controllerAs: 'devices'
    }
  ];

  var rejectPreviousPromise;
  config.forEach( function setUrl( r ) {
    var req = require.context( './', true, /^(\.\/.*\.controller|\.\/.*\.mustache)/ );

    // Fetch template
    SammyContext.get( r.url, function routeHandler( context ) {
      var Ctrl = req( r.controller ),
        ctrl = new Ctrl( context.params ),
        tmpl = req( r.template ),
        renderedHtml;

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
        ctrl.link();

      } ).catch( function errorHandler( err ) {
        //  eslint-disable-next-line no-console
        console.error( 'Fail executing route: ', err );
      } );

    } );
  } );
  SammyContext.around( function navHelper( cb ) {
    navigationHelper( SammyContext, this, cb );
  } );
}

module.exports = Router
