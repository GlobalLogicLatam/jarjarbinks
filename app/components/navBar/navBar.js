/**
 * Created by gaston on 8/8/16.
 */
//var actionsButtons = require( './actions.js' ),
var navInst = undefined;

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


    addBackAction: addBackAction,
    addOptionButton: addOptionButton,
    setTitle: setTitle,
    hide: hide,
    show: show,
    addActionButton: addActions,
    open: open,
    reset: resetNavBar
  } );

  init();
  return self;

  /**
   * Init NavBar
   */
  function init() {
    config = {
      routes: {}
    }
  }

  function addRoute( route ) {

    if ( !route.navOperations || !route.navOperations.states ) {
      return;
    }

    //TODO create the buttons
    config.routes[ route.url ] = route.navOperations.states;
  }

  function renderNavbar() {
    config.routes[ location.hash ]
  }

  function createButton( actionButton ) {
    let htmlButton = `<a><span class="glyphicon glyphicon-${actionButton.icon}"></span></a>`,
      action;
    if ( !actionButton.customHtml ) {
      htmlButton = actionButton.customHtml;
    }
    action = $( htmlButton );
    if ( actionButton.callback ) {
      actionButton.callback = () => {};
    }

    action.click( () => {
      actionButton.promise = Promise.all( [ actionButton.callback ] );
    } );

    return action;
  }

  /** ==============================================================
   * */
  /**
   * Init NavBar
   */
  /*function init() {

    let navEle = $( '.jjb-navbar' );

    config = {
      nav: navEle,
      navHeader: navEle.find( '.navbar-header' ),
      actionsButtonsContainer: navEle.find( '.jjb-navbar__action-buttons' ),
      actionsButtons: [],
      actionsOptions: null,
      backButton: {
        icon: 'glyphicon-arrow-left',
        action: onBack
      }
    };

    hide();
  }*/

  /**
   * Open NavBar
   * @param options with config for buttons
   */
  function open( options ) {
    resetNavBar();
    if ( options && options.title ) {
      setTitle( options.title );
    }
    if ( options && options.optionButton ) {
      addOptionButton( options.optionButton );
    } else {
      addOptionButton( config.backButton );
    }
    if ( options && options.backAction ) {
      addBackAction( options.backAction );
    }
    if ( options && options.actionButtons ) {
      addActions( options.actionButtons );
    }
    show();
  }

  /**
   * Add an action button to the left in the nav.
   * Only one button can be on the left, if you add more than one, the last will be replace.
   * @param menuButton
   */
  function addOptionButton( menuButton ) {
    let optionButton;
    config.navHeader.find( '.jjb-navbar__option' ).remove();
    optionButton = $(
      `<button class="jjb-navbar__option">
        <span class="glyphicon ${menuButton.icon}" aria-hidden="true"></span>
      </button>` );
    optionButton.click( menuButton.action );
    config.navHeader.prepend( optionButton );
  }

  /**
   * Add an action button or an array of actions to insert nav bar.
   * You can pass a object like {icon:'icon', action: function},
   * or an array of the same object like [{icon:'icon', action: function},...]
   * @param actions
   */
  function addActions( actions ) {
    if ( Array.isArray( actions ) ) {
      actions.forEach( addActionButton );
    } else {
      addActionButton( actions );
    }

  }

  /**
   * Add an action button to nav bar
   * @param actionButton
   */
  function addActionButton( actionButton ) {
    let li = $( '<li></li>' ),
      button = createButton( actionButton );
    li.append( button );
    config.actionsButtonsContainer.append( li );
    config.actionsButtons.push( actionButton );
  }

  /**
   * Create a new action button
   * @param actionButton
   * @returns {*|jQuery|HTMLElement}
   */
  /*function createButton( actionButton ) {
    let action = $(
      `<a>
        <span class="glyphicon  ${actionButton.icon}"></span>
       </a>` );
    action.click( actionButton.action );
    return action;
  }*/

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

  /**
   * Set the title on the navbar
   * @param title
   */
  function setTitle( title ) {
    $( '.jjb-navbar__title' ).html( title );
  }

  /**
   * Add a promise that will execute before back last page
   * @param fn or promise to add
   * @returns {Promise}
   */
  function addBackAction( fn ) {
    if ( !$.isFunction( fn ) ) {
      config.back = wrapPromiseInFunction( fn );
    } else {
      config.back = fn;
    }
    return config.back;
  }

  /**
   * Function for back button
   * @returns {Promise}
   */
  /*function onBack() {
    return config.back().then( function backPage() {
      window.history.back();
    } ).then( resetNavBar );
  }*/

  /**
   * Function without operation
   */
  function noop() {
    return Promise.resolve();
  }

  /**
   * Wrap a promise into a function
   * @param promise
   * @returns {Function}
   */
  function wrapPromiseInFunction( promise ) {
    return function wrapPromise() {
      return promise;
    }
  }

  /**
   * Reset nav bar to clean added promises and actions buttons
   */
  function resetNavBar() {
    hide();
    config.back = noop;
    config.actionsButtonsContainer.empty();
    config.navHeader.find( '.jjb-navbar__option' ).remove();
    config.actionsButtons = [];
    config.actionsOptions = null;
  }
}

