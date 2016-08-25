var url = require('url');
var qs  = require('querystring');
var Cookies = require( "cookies" );

module.exports = [
	{
		route: '/api',
		handle: function(req, res, next){
			var cookies = new Cookies(req, res);

			req.cookies = {
				get: cookies.get.bind(cookies)
			};

			res.cookies = {
				set: cookies.set.bind(cookies)
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
          req.body = qs.parse( body );
          next();
        } );
      }

    }
  },
  {
    route: '/api',
    handle: function( req, res, next ) {
      let parsedUrl,
        ctrlName,
        Ctrl,
        ctrl,
        method;

      // Parsing url
      // Removing query string
      parsedUrl = url.parse( req.url ).path.split( '?' );
      parsedUrl = parsedUrl[ 0 ].split( '/' ).filter( function( n ) { return n != '' } );
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
