let url = require( 'url' ),
  qs = require( 'querystring' ),
  Cookies = require( 'cookies' );

module.exports = [
  {
    route: '/api',
    handle: function set_cookies( req, res, next ) {
      var cookies = new Cookies( req, res );

      req.cookies = {
        get: cookies.get.bind( cookies )
      };

      res.cookies = {
        set: cookies.set.bind( cookies )
      };

      next();
    }
  },
  {
    route: '/api',
    handle: function handleMethod( req, res, next ) {
      let methods = {
        post: parseBody,
        put: parseBody
      };

      if ( req.method.toLowerCase() in methods ) {
        methods[ req.method.toLowerCase() ]();
      } else {
        next();
      }

      // Handlers

      function parseBody() {
        var body = '';
        req.on( 'data', function parseBody( data ) {
          body += data;
          // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
          if ( body.length > 1e6 ) {
            // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
            req.connection.destroy();
          }
        } );
        req.on( 'end', function addBodyToRequest() {
          let parsers,
            content_type = req.headers[ 'content-type' ].split( ';' )[ 0 ].trim();

          parsers = {
            'application/x-www-form-urlencoded': qs.parse,
            'application/json': JSON.parse
          }

          req.body = parsers[ content_type ]( body );
          next();
        } );
      }

    }
  },
  {
    route: '/api',
    handle: function execute_controller( req, res, next ) {
      let parsedUrl,
        ctrlName,
        Ctrl,
        ctrl;

      // Parsing url
      // Removing query string
      parsedUrl = url.parse( req.url ).path.split( '?' );
      parsedUrl = parsedUrl[ 0 ].split( '/' ).filter( function filter_params( n ) {
        return n != ''
      } );
      ctrlName = parsedUrl[ 0 ];

      // Decorate request with url params
      parsedUrl.shift();
      req.urlParams = parsedUrl;

      // Instantiating controller
      Ctrl = require( './' + ctrlName );
      ctrl = new Ctrl();
      ctrl[ req.method.toLowerCase() ]( req, res, next );

      next();
    }
  }
];
