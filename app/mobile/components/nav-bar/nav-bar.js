let require_factory = require( 'modules/require-factory' );

/**
 * Created by gaston on 8/8/16.
 */
var actionsButtons = require_factory( 'components/nav-bar/actions' ),
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
  let self = {},
    config,
    publisher = require_factory( 'modules/publisher' );

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
      navOptions: {},
      buttons: {},
      buttonsSelector: '.js-jjb-navbar__action-buttons-'
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

  function reset() {
    clearButtons();
    hide();
  }

  function clearButtons() {
    $( '.js-jjb-navbar__items' ).find( 'li' ).detach();
  }

  function renderState( state_name ) {
    let state_list = config.navOptions.states;

    clearButtons();

    for ( let i = 0; i < state_list[ state_name ].length; i++ ) {
      addButton( config.buttons[ state_list[ state_name ][ i ] ] );
    }
  }

  function addButton( button ) {
    let li = $( '<li></li>' );
    li.append( button.html );
    $( config.buttonsSelector + ( button.position || 'right' ) ).append( li );
  }


  function createButton( buttonName, actionButtonConfig ) {
    let htmlButton = `<a><span class="glyphicon glyphicon-${actionButtonConfig.icon}"></span></a>`,
      action;

    action = $( actionButtonConfig.customHtml || htmlButton );

    action.click( () => {
      Promise.all( [ publisher.publish( `button.${buttonName}`, {} ) ] )
        .then( function success_callback( promise_results ) {
          // eslint-disable-next-line no-console
          console.log( 'Publish success: ', `button.${buttonName}` );
          // eslint-disable-next-line no-console
          console.log( 'promise_results: ', promise_results );

          actionButtonConfig.callback();
        } )
        .catch( function failure_callback( promise_error ) {
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
