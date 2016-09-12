/**
 * Created by gaston on 8/8/16.
 */
var actionsButtons = require( './actions.js' ),
  navInst = undefined;

module.exports = navInst ? navInst : navInst = NavBar();

/**
 * @returns {NavBar}
 * @constructor
 */
function NavBar() {
  let self = this;
  var config;

  Object.assign( self, {
    addRoute: addRoute,
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
    let navEle = $( '.jjb-navbar' );

    config = {
      nav: navEle,
      navTitle: navEle.find( '.jjb-navbar__title' ),
      routes: {},
      buttons: {},
      buttonsSelector: '.jjb-navbar__action-buttons--'
    };

    initButtons();
  }

  function addRoute( route ) {
    if ( !route.navOptions ) {
      return;
    }

    config.routes[ route.url ] = {
      title: route.navOptions.title || '',
      states: route.navOptions.states
    };

  }

  function initButtons() {
    for ( let key in actionsButtons ) {
      config.buttons[ key ] = actionsButtons[ key ];
      config.buttons[ key ].html = createButton( config.buttons[ key ] );
    }
  }

  function renderNavbar() {
    let route = config.routes[ location.hash ];
    if ( route ) {
      renderState( route.states.default );
      config.navTitle.html( route.title );
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
      //actionButton.promise = Promise.all( [ actionButton.callback ] );
      actionButton.callback();
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
