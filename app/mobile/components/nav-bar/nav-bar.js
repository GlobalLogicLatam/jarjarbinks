let require_factory = require( 'modules/require-factory' ),
  actionsButtons = require_factory( 'components/nav-bar/actions' ),
  tmpl = require_factory( 'components/nav-bar/nav-bar.template.mustache' ),
  navInst = undefined;

function NavBarSingleton( sammyContext ) {
  if ( !navInst ) {
    //console.log("Entrando");
    navInst = NavBar( sammyContext );
  }

  return navInst;
}

/**
 * @returns {NavBar}
 * @constructor
 */
function NavBar( sammyContext ) {

  let self = {},
    config,
    publisher = require_factory( 'modules/publisher' );

  Object.assign( self, {
    render: renderNavbar,
    renderState: renderState,
    setTitle: setTitle,
    reset: reset,
    hide: hide,
    show: show
  } );

  init();
  return self;

  /**
   * Init NavBar
   */
  function init() {
    let nav_el = $( '.js-navbar-holder' ),
      // Rendered menu template
      rendered_html = $( Mustache.render( tmpl ) );

    // Replaced menu container with menu.
    nav_el.replaceWith( rendered_html );

    config = {
      nav: rendered_html,
      navTitle: rendered_html.find( '.js-jjb-navbar__title' ),
      navOptions: {},
      buttons: {},
      buttonsSelector: '.js-navbar__list-'
    };

    // Change navbar state buttons based on number of selected item.
    publisher.subscribe( 'cards.selection', function selection_handler( selected_num ) {
      let states = {
        '0': 'default',
        '1': 'selected',
        'default': 'multipleSelected'
      }

      renderState( states[ selected_num ] || states[ 'default' ] );
    } );

    initButtons();
  }

  function initButtons() {
    for ( let key in actionsButtons ) {
      config.buttons[ key ] = actionsButtons[ key ];
      config.buttons[ key ].html = createButton( key, config.buttons[ key ] );
    }
  }

  function renderNavbar() {
    let current_route;

    // Set navBar configuration according to current route.
    current_route = sammyContext.lookupRoute( 'get', location.hash );
    config.navOptions = current_route.config.navOptions;

    if ( config.navOptions ) {
      renderState( 'default' );
      config.navTitle.html( config.navOptions.title );
      show();
    }
  }

  function setTitle( title ) {
    let current_route;
    // Set navBar configuration according to current route.
    current_route = sammyContext.lookupRoute( 'get', location.hash );
    current_route.config.navOptions.title = title
  }

  function reset() {
    clearButtons();
    hide();
  }

  function clearButtons() {
    config.nav.find( 'li' ).detach();
  }

  function renderState( state_name ) {
    let state_list = config.navOptions.states;

    clearButtons();

    for ( let i = 0; i < state_list[ state_name ].length; i++ ) {
      addButton( config.buttons[ state_list[ state_name ][ i ] ] );
    }
  }

  function addButton( button ) {
    let li = $( '<li class="navbar__button-wrapper"></li>' );
    li.append( button.html );
    $( config.buttonsSelector + ( button.position || 'right' ) ).append( li );
  }

  function createButton( buttonName, actionButtonConfig ) {
    let htmlButton = `<span class="navbar__button glyphicon glyphicon-${actionButtonConfig.icon}"></span>`,
      action;

    action = $( actionButtonConfig.customHtml || htmlButton );

    action.click( () => {
      Promise.all( [ publisher.publish( `button.${buttonName}`, {} ) ] ).then( function success_callback( promise_results ) {
        // eslint-disable-next-line no-console
        console.log( 'Publish success: ', `button.${buttonName}` );
        // eslint-disable-next-line no-console
        console.log( 'promise_results: ', promise_results );

        actionButtonConfig.callback();
      } ).catch( function failure_callback( promise_error ) {
        // eslint-disable-next-line no-console
        console.log( 'Publish error: ', `button.${buttonName}` );
        // eslint-disable-next-line no-console
        console.log( 'promise_error: ', promise_error );
      } );
    } );

    return action;
  }

  /**
   * Hide NavBar
   */
  function hide() {
    config.nav.addClass( 'hidden' );
  }

  /**
   * Show NavBar
   */
  function show() {
    config.nav.removeClass( 'hidden' );
  }
}

module.exports = NavBarSingleton;
