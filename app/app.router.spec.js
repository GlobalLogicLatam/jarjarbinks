describe( 'Route', function unit_test() {
  const require_factory = require( 'modules/require-factory' ),
    router = require_factory( 'modules/router', 'mobile' );

  let app,
    body;

  beforeEach( function beforeEachRoute() {
    // Iniciate the app.
    body = $j( 'body' ).append( '<div id="content-wrapper" class="app-wrapper"></div>' );
    app = Sammy( '#content-wrapper', function appSammyHandler() {
      router( this );
    } );
  } );
  describe( '#/login', function login_test() {

    beforeEach( function before_each_login_test( done ) {
      app.run( '#/login' );
      setTimeout( function async() {
        done();
      }, 0 );
    } );

    it( 'should has a form', function test( done ) {
      var form = body.find( 'form' );
      expect( form.length ).toBe( 1 );
      done();
    } );

    it( 'should have navigated to /login', function navigatedToLogin( done ) {
      expect( window.location.hash ).toBe( '#/login' );
      done();
    } );
  } );
} );
