/**
 * Created by gaston on 8/8/16.
 */
var actionsButtons = require( './actions.js' ),
  navInst = undefined;

function NavBarSingleton( sammyContext ) {
  if ( !navInst ) {
    navInst = NavBar( sammyContext );
  }

  return navInst;
}

/**
 * @returns {NavBar}
 * @constructor
 */
function NavBar( sammyContext ) {
  let self = this,
    config,
    publisher = require( '../../components/publisher/publisher' );

  Object.assign( self, {
    render: renderNavbar,
    renderState: renderState,
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
    let navEle = $( '.js-jjb-navbar' );

    config = {
      nav: navEle,
      navTitle: navEle.find( '.js-jjb-navbar__title' ),
      routes: {},
      buttons: {},
      buttonsSelector: '.js-jjb-navbar__action-buttons-'
    };

    initButtons();
  }

  function initButtons() {
    for ( let key in actionsButtons ) {
      config.buttons[ key ] = actionsButtons[ key ];
      config.buttons[ key ].html = createButton( config.buttons[ key ] );
    }
  }

  function renderNavbar() {
    let current_route,
      navOptions;

    current_route = sammyContext.lookupRoute( 'get', location.hash );
    navOptions = current_route.config.navOptions;

    if ( navOptions ) {
      renderState( navOptions.states.default );
      config.navTitle.html( navOptions.title );
      show();
    }
  }

  function reset() {
    clearButtons();
    hide();
  }

  function clearButtons() {
    $( '.js-jjb-navbar__items' ).find( 'li' ).detach();
  }

  function renderState( state ) {
    clearButtons();
    for ( let i = 0; i < state.length; i++ ) {
      addButton( config.buttons[ state[ i ] ] );
    }
  }

  function addButton( button ) {
    let li = $( '<li></li>' );
    li.append( button.html );
    $( config.buttonsSelector + ( button.position || 'right' ) ).append( li );
  }


  function createButton( actionButton ) {
    let htmlButton = `<a><span class="glyphicon glyphicon-${actionButton.icon}"></span></a>`,
      action;

    action = $( actionButton.customHtml || htmlButton );

    action.click( () => {
      publisher.publish( 'button.back', 'Totto',
        function success_callback( promise_results ) {
          // eslint-disable-next-line no-console
          console.log( 'Publish success: ', promise_results );

          actionButton.callback();
        }, function failure_callback( promise_error ) {
          // eslint-disable-next-line no-console
          console.log( 'Publish error: ', promise_error );
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
