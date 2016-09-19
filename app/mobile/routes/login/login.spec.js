describe( 'Login controller', function controller_unit_test() {
  var authenticationServiceMock = {
      defaultPromise: Promise.resolve(),
      logIn: function logIn_mock() {
        return this.defaultPromise;
      }
    },
    sammyContext_mock = {
      redirect: function redirect_mock( str ) {
        return str;
      }
    },
    MutationObserverConfig = {
      childList: true,
      attributes: true,
      characterData: true,
      subtree: true
    };
  function authentication_service_mock() {
    return authenticationServiceMock;
  }

  const CtrlInjector = require( 'inject!./login.controller' ),
    Ctrl = CtrlInjector( {
      'modules/require-factory': function require_factory_mock( path ) {
        const mocks = {
          'modules/services/authentication-service': authentication_service_mock
        }
        return mocks[ path ]
      }
    } ),
    template = require( '../../routes/login/login.template.mustache' );

  let rendered_template,
    body,
    app_wrapper;

  beforeEach( function create_app() {
    let ctrl = Ctrl();
    body = $( 'body' ).append( '<div id="content-wrapper" class="app-wrapper"></div>' );
    app_wrapper = body.find( '#content-wrapper' );
    ctrl.init( sammyContext_mock );
    rendered_template = $( Mustache.render( template, ctrl ) );
    app_wrapper.html( rendered_template );
    ctrl.link();
  } );

  it( 'should show error labels because empty form, not submit and not redirect', function test( done ) {

    spyOn( authenticationServiceMock, 'logIn' );
    spyOn( sammyContext_mock, 'redirect' );

    let form = document.querySelector( '.login-form #form' ),
      usernameLabelError,
      passwordLabelError,

      domObserver = new MutationObserver( function on_mutate() {
        usernameLabelError = document.getElementById( 'username-error' );
        passwordLabelError = document.getElementById( 'password-error' );
        //Labels must have the correct messages
        expect( usernameLabelError.innerText ).toBe( 'Debe ingresar un usuario.' );
        expect( passwordLabelError.innerText ).toBe( 'Debe ingresar una contraseña.' );
        //Login service mustn't have been called
        expect( authenticationServiceMock.logIn ).not.toHaveBeenCalled();
        //Must not redirect
        expect( sammyContext_mock.redirect ).not.toHaveBeenCalled();
        done();
      } );

    domObserver.observe( form, MutationObserverConfig );

    $( '#submitBtn' ).click();
  } );
  it( 'should show error message at failed submit and not redirect', function test( done ) {

    authenticationServiceMock.defaultPromise = Promise.reject( { error_message: 'errorOnSubmit' } );
    spyOn( authenticationServiceMock, 'logIn' ).and.callThrough();
    spyOn( sammyContext_mock, 'redirect' );

    let customErrorElement = document.getElementById( 'loginError' ),

      domObserver = new MutationObserver( function on_mutate() {
        //Label must show error from service
        expect( customErrorElement.innerText ).toBe( 'errorOnSubmit' );
        //Login service must have been called
        expect( authenticationServiceMock.logIn ).toHaveBeenCalled();
        //Must not redirect
        expect( sammyContext_mock.redirect ).not.toHaveBeenCalled();
        done();
      } );

    domObserver.observe( customErrorElement, MutationObserverConfig );

    $( 'input[name="username"]' ).val( 'usuario.test' );
    $( 'input[name="password"]' ).val( 'password1234' );
    $( '#submitBtn' ).trigger( 'click' );

  } );
  it( 'should redirect to Home if login success', function test( done ) {

    authenticationServiceMock.defaultPromise = Promise.resolve();
    spyOn( authenticationServiceMock, 'logIn' ).and.callThrough();

    $( 'input[name="username"]' ).val( 'usuario.test' );
    $( 'input[name="password"]' ).val( 'password1234' );
    $( '#submitBtn' ).trigger( 'click' );
    spyOn( sammyContext_mock, 'redirect' ).and.callFake( function on_mutate( resp ) {
      expect( authenticationServiceMock.logIn ).toHaveBeenCalled();
      expect( resp ).toBe( '#/' );
      done();
    } );
  } );
} );
