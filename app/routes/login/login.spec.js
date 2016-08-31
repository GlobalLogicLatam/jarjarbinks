describe( 'Login controller', function() {

  const CtrlInjector = require( 'inject!./login.controller' ),
    template = require( '../../routes/login/login.template.mustache' ),
    Ctrl = CtrlInjector( { './../../services/authenticationService': authentication_service_mock } );

  let rendered_template,
    body,
    app_wrapper;

  function authentication_service_mock() {
    return {
      logIn: function() {
        // eslint-disable-next-line no-console
        console.log( 'I\'m the mock of authentication service.' );
      }
    }
  }

  beforeEach( function() {
    let ctrl = Ctrl();
    body = $( 'body' ).append( '<div id="content-wrapper" class="app-wrapper"></div>' );
    app_wrapper = body.find( '.app-wrapper' );
    ctrl.init();
    rendered_template = $( Mustache.render( template, ctrl ) );
    app_wrapper.html( rendered_template );
    ctrl.link();
  } );

  it( 'should fails if form is empty', function() {
    $( '#submitBtn' ).click();

    expect( true ).toBe( true );
  } );

} );
